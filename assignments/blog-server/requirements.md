Once you finish the requirements delete this file.

In this assignment, you will transition your blog logic into a web server using Node.js and Express. Your server will respond to incoming HTTP requests to perform CRUD (Create, Read, Update, Delete) operations on blog posts, persisting data to posts.json and sending back JSON responses.

1. Download and Setup the Starter Code

   Download starter codeDownload starter code, unzip it, and open the folder in VS Code.
   Open your terminal and run npm install to install all dependencies.

   The starter code has the following file structure:

blog-server/
├── blogService.js # CRUD logic & data persistence
├── server.js # Express server and routes
├── posts.json # JSON file storage for blog posts
├── test.sh # Bash test script (macOS/Linux)
├── test.bat # Command Prompt test script (Windows)
├── package.json # Project dependencies and scripts
└── eslint.config.js # Code style configuration

All blog data is stored in posts.json. The initial state of posts.json is pre-populated as follows:

{
"nextId": 1,
"posts": []
}

    nextId: An auto-incrementing integer tracking the ID to assign to the next created post.
    posts: An array containing all active blog post objects.

Each post object inside the posts array must follow this schema:

    id : Number (auto-incremented ID)

    title : String

    content : String

    views : Number (initialized to 0 upon creation)

    createdAt : String, date string formatted as y-M-d h:m aaa (e.g., 2026-8-17 10:30 AM).

Date Formatting Tip: Use the date-fns library's format() function to generate the createdAt string.

2. Implement Blog Logic (blogService.js)

Implement all core data operations inside blogService.js. Ensure posts read from and write to posts.json.

Note: The interface for blogService.js is identical to Assignment 2. If you completed Assignment 2 successfully, you may copy over your implementation.

3. Implement Express Server Routes (server.js)

In server.js, an Express instance is pre-configured and the POST /reset route is already implemented for you. Implement the remaining routes so your server can handle incoming requests:

    POST /reset (Pre-implemented)

        Request Body: None

        Behavior: Resets posts.json to its initial state.

        Response (Status 200): { "message": "All posts have been cleared" }

    POST /posts

        Request Body: { "title": "My Post", "content": "Hello world" }

        Behavior: Creates a new post with a unique ID, timestamp, and views initialized to 0.

        Success Response (Status 201): Newly created post object as JSON.

        Error Response (Status 400): If title or content is missing, return { "message": "Title and content are required" }.

    GET /posts/:id

        Request Body: None

        Behavior: Retrieves a single post by ID (and increments its views count).

        Success Response (Status 200): Post object as JSON if found.

        Error Response (Status 404): If ID does not exist, return { "message": "Post #<id> not found" } (e.g., { "message": "Post #5 not found" }).

    PUT /posts/:id

        Request Body: { "title": "Updated title", "content": "Updated content" } (one or both fields may be provided)

        Behavior: Updates the post title, content, or both if found.

        Success Response (Status 200): { "message": "Post #<id> updated" }

        Validation Error (Status 400): If both title and content are missing, return { "message": "Must provide title or content to update" }.

        Not Found Error (Status 404): If ID does not exist, return { "message": "Post #<id> not found" }.

    DELETE /posts/:id

        Request Body: None

        Behavior: Deletes the post by ID if found.

        Success Response (Status 200): { "message": "Post #<id> deleted" }

        Error Response (Status 404): If ID does not exist, return { "message": "Post #<id> not found" }.

    GET /posts

        Request Body: None

        Behavior: Retrieves all blog posts.

        Success Response (Status 200): Array of post objects as JSON.

4. Local Testing

    In the terminal, run:  npm start to start the server. The server runs on port 3000.

    Execute test scripts: Leave the server running in one terminal, open a second terminal window, and execute the test script for your OS:

        macOS / Linux: bash test.sh

        Windows (Command Prompt / PowerShell): test.bat
        The scripts use curl to send requests and display both the status code and response body in the terminal.  curl is a command-line tool that allows you to make HTTP requests from your terminal, so you can test your server without needing additional software like Postman. Make sure your server is running before executing the scripts.

    Expected output:

RESET POSTS
{"message":"All posts have been cleared"}
Status: 200

CREATE POST (valid)
{"id":1,"title":"Hello","content":"World","views":0,"createdAt":"2026-8-17 1:16 pm"}
Status: 201

CREATE POST (missing data, error)
{"message":"Title and content are required"}
Status: 400

LIST ALL POSTS
[{"id":1,"title":"Hello","content":"World","views":0,"createdAt":"2026-8-17 1:16 pm"}]
Status: 200

READ POST (exists)
{"id":1,"title":"Hello","content":"World","views":1,"createdAt":"2026-8-17 1:16 pm"}
Status: 200

READ POST (not found)
{"message":"Post #999 not found"}
Status: 404

UPDATE POST (valid)
{"message":"Post #1 updated"}
Status: 200

UPDATE POST (empty title & content)
{"message":"Must provide title or content to update"}
Status: 400

UPDATE POST (not found)
{"message":"Post #999 not found"}
Status: 404

DELETE POST (valid)
{"message":"Post #1 deleted"}
Status: 200

DELETE POST (not found)
{"message":"Post #999 not found"}
Status: 404

LIST ALL POSTS (after deletion)
[]
Status: 200

Notes:

    You can open the scripts to see the request examples and modify them to test additional scenarios.
    The createdAt timestamp in your output will be set to the time when you run the program.

5. Submission Guidelines

    Submit only the following three files to Gradescope:

        blogService.js

        server.js

        package.json
    Make sure all file names are exactly correct. Incorrect file names may cause the autograder to fail.

    Automated Cooldown: Gradescope enforces a mandatory 5-minute cooldown window between consecutive submissions. Submissions attempted during an active cooldown will be blocked by the system.
