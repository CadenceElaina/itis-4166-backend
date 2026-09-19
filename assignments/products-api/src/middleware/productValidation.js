import { body, param, query, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

// Validate route parameter id for GET, PUT, and DELETE /api/products/:id
export const validateProductId = [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  handleValidationErrors,
];

// Validate payload in request for POST /api/products
// isString runs before trim() because trim() would coerce a number to a string.
// escape() runs last so the length checks see what the client typed, not the
// longer HTML-escaped text.
export const validateCreateProduct = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .bail()
    .isLength({ min: 5 })
    .withMessage('Name Must be at least 5 characters long')
    .escape(),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be a positive number')
    .toFloat(),
  body('inStock')
    .isBoolean()
    .withMessage('inStock must be a boolean')
    .toBoolean(true),
  handleValidationErrors,
];

// Validate payload in request for PUT /api/products/:id
export const validateUpdateProduct = [
  oneOf(
    [body('name').exists(), body('price').exists(), body('inStock').exists()],
    {
      message: 'At least one field (name, price, or inStock) must be provided',
    },
  ),
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be at least 5 characters long')
    .bail()
    .trim()
    .isLength({ min: 5 })
    .withMessage('Name must be at least 5 characters long')
    .escape(),
  body('price')
    .optional()
    .isFloat({ gt: 0 })
    .withMessage('Price must be a positive number')
    .toFloat(),
  body('inStock')
    .optional()
    .isBoolean()
    .withMessage('inStock must be a boolean')
    .toBoolean(true),
  handleValidationErrors,
];

// Validate query parameters for GET /api/products
// Express 5 re-parses req.query on every access, so sanitizers on query
// values do not persist. Only validate here; the controller does the casting.
export const validateProductQuery = [
  query('search').optional().isString().withMessage('search must be a string'),
  query('inStock')
    .optional()
    .isIn(['true', 'false'])
    .withMessage('inStock must be a boolean'),
  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('minPrice must be a non-negative number'),
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('maxPrice must be a non-negative number'),
  query('sortBy')
    .optional()
    .isIn(['id', 'name', 'price'])
    .withMessage('sortBy must be one of: id, name, price'),
  query('order')
    .optional()
    .toLowerCase()
    .isIn(['asc', 'desc'])
    .withMessage('order must be either asc or desc'),
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('offset must be a non-negative integer'),
  query('limit')
    .optional()
    .isInt({ min: 1 })
    .withMessage('limit must be an integer greater than 0'),
  handleValidationErrors,
];
