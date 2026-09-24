Building on the layered API built in Part 1, this assignment extends the Products API with robust input validation and query parameter processing (filtering, sorting, pagination).

Prerequisite: You must have a working submission for Assignment 4 (Part 1) before starting this assignment.
Section 1: Input Validation & Sanitization

Add input validation and sanitization using express-validator to ensure all incoming route parameters and request bodies are valid before reaching the controller layer.

Important Setup Requirement: Before completing the validation steps below, ensure you updated your centralized error handler in server.js as described in Section 4.11. Your default error handler should wrap single error messages in an errors array (res.status(err.status).json({ errors: [err.message] })) to maintain a consistent API response structure across all endpoints.

1. Install express-validator in your project root:

2. Create a new middleware/ directory inside src/ to hold your validation logic:

src/
├── middleware/
│ ├── handleValidationErrors.js <-- Create this file
│ └── productValidation.js <-- Create this file

3. Copy the exact validation handling function covered in the lecture video into src/middleware/handleValidationErrors.js

import { validationResult } from 'express-validator';

export function handleValidationErrors(req, res, next) {
const errors = validationResult(req);
if (!errors.isEmpty()) {
return res
.status(400)
.json({ errors: errors.array().map((err) => err.msg) });
}
next();
}

4. Copy the starter template into src/middleware/productValidation.js. Complete the validation chains according to the rules below. Every active chain must append handleValidationErrors as its final item.

import { body, param, query, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

// TODO (Section 1): Validate route parameter id for GET, PUT, and DELETE /api/products/:id
export const validateProductId = [
// Add rules here...

handleValidationErrors,
];

// TODO (Section 1): Validate payload in request for POST /api/products
export const validateCreateProduct = [
// Add rules here...
handleValidationErrors,
];

// TODO (Section 1): Validate payload in request for PUT /api/products/:id
export const validateUpdateProduct = [
// Add rules here...
handleValidationErrors,
];

//TODO (Section 2): Validate query parameters for GET /api/products
export const validateProductQuery = [
// Add rules here...
handleValidationErrors,
];

Validation Rules & Specs:

    validateProductId

        id: Must be an integer with a minimum value of 1.

        Error message: "ID must be a positive integer"
    validateCreateProduct

        name:

            Must be a string. Error Message: "Name must be a string"

            Required (cannot be empty after trimming).  Error Message: "Name is required"

            Must be at least 5 characters long.  Error Message: "Name Must be at least 5 characters long"
            Sanitization: Automatically trim leading/trailing whitespace and sanitize HTML characters

        price: Required positive number (> 0).

        Error message: "Price must be a positive number"

        inStock: Required boolean (true or false).

        Error message: "inStock must be a boolean"
    validateUpdateProduct

        Use oneOf to ensure at least one updatable field is present

Error message: "At least one field (name, price, or inStock) must be provided"

        name: Optional. If provided, trim whitespace, ensure string type, and require a minimum length of 5 characters.

        Error message: "Name must be at least 5 characters long"

        price: Optional. If provided, must be a positive number (> 0).

        Error message: "Price must be a positive number"

        inStock: Optional. If provided, must be a boolean (true or false).

        Error message: "inStock must be a boolean"

5. Route Attachment

In src/routes/productRoutes.js, import and attach the validation middleware chains to their corresponding routes.
Section 2: Searching, Filtering, Sorting & Pagination

Extend GET /api/products to accept query parameters that allow clients to search, filter, sort, and paginate the product catalog.

1. Supported Query Parameters & Validation Rules

All query parameters are optional. Any request containing invalid query values (e.g., negative prices, unsupported sort fields) must be rejected with a 400 Bad Request status by validateProductQuery.

    search (String)

    Case-insensitive substring match on the name field.

    Default: undefined (If omitted, no text filtering is applied.)

    inStock (Boolean)

    Filter by stock status

    Default: undefined (If omitted, returns both in-stock and out-of-stock items.)

    Validation: Must be a boolean value ("true" or "false").

    minPrice (Number)

    Filter for products with price greater than or equal to value (>=).

    Default: undefined (If omitted, no lower price limit is set.)

    Validation: Must be a non-negative number (>=0).

    maxPrice (Number)

    Filter for products with price less than or equal to value (<=).

    Default: undefined (If omitted, no upper price limit is set.)

    Validation: Must be a non-negative number (>=0).

    sortBy (String)

    Field to sort by ("id", "name", or "price").

    Default: "id" (If omitted, sort by the id field.)

    Validation: Must be one of: "id", "name", or "price".

    order (String)

    Case-insensitive sort direction ("asc" or "desc").

    Default: "asc" (If omitted, sort in ascending order.)

    Validation: Case-insensitive; must be either "asc" or "desc".

    offset (Integer)

    Number of items to skip before starting to collect the result set.

    Default: 0 (If omitted, no items are skipped.)

    Validation: Must be a non-negative integer (>=0).

    limit (Integer, Optional)

    Number of items to return per request.

    Default: 10 (If omitted, 10 items are returned.)

    Validation: Must be an integer greater than 0.

2. Layered Architecture

To maintain clean separation of concerns, your query logic must be divided across middleware, controller, service, and repository as demonstrated in the videos.

    Validation Middleware (productValidator.js)

        Enforces rules for all supported query parameters via validateProductQuery

    Controller Layer

        Extract & Default: Read query parameters and assign default values (sortBy = 'id', order = 'asc', offset = 0, limit = 10).

        Type Casting: Express extracts all query values as strings. Convert parameters into native JavaScript primitives before building the options object:

                inStock: Convert "true" / "false" to Boolean true / false (or undefined if omitted).

                minPrice / maxPrice: Convert using parseFloat() (or undefined if omitted).

                offset / limit: Convert using parseInt() or Number().

        Delegate: Pass the strongly-typed options object to the Service layer.

    Service Layer

        Acts as a pass-through function that receives the options object from the Controller and delegates directly to the Repository layer.

    Repository Layer

        Perform array operations on the product dataset in the following sequential order:

            Filter: Apply search, inStock, minPrice, and maxPrice constraints.

            Sort: Order the filtered array using sortBy and order.

            Paginate: Slice the sorted array using offset and limit.

        Return the processed product array back to the Service layer.

Testing & Submission

1. Use Postman to thoroughly test both happy paths (valid requests) and alternate/failure paths (invalid requests or missing resources) for all endpoints before submitting.

Below are sample Postman requests demonstrating expected behavior for common alternate paths:

1.GET /api/products/-1
Status: 400 Bad Request
Response Body:
{
"errors": [
"ID must be a positive integer",
]
}

2. POST /api/products
   Request Body Sent:
   { "name": "Desk", "price": -5, "inStock": "yes"}
   Status: 400 Bad Request
   Response Body:
   {
   "errors": [
   "Name Must be at least 5 characters long",
   "Price must be a positive number",
   "inStock must be a boolean"
   ]
   }

3. PUT /api/products/1
   Request Body Sent: {}
   Status: 400 Bad Request
   Response Body:
   {
   "errors": [
   "At least one field (name, price, or inStock) must be provided"
   ]
   }

4. GET /api/products?minPrice=-10
   Status: 400 Bad Request
   Response Body:
   {
   "errors": [
   "minPrice must be a non-negative number",
   ]
   }

5. Submit a single .zip file. The top level of the archive must contain only the src folder (do not include extra parent folders, extra files, or nested archives).

Important Notes:

    DO NOT include node_modules in your .zip file. Including node_modules causes submission timeouts and autograder failures.

    DO NOT place src  inside a parent folder before compressing. When we unzip your file, src must be visible at the root level.

    Automated Cooldown: Gradescope enforces a mandatory 5-minute cooldown window between consecutive submissions. Submissions attempted during an active cooldown will be blocked by the system.

    Submit Early: Running out of time due to active cooldown windows will not be accepted as a reason for extensions or late submissions.
