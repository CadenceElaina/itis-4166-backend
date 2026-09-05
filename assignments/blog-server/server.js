// server.js
// This module sets up an Express server and defines HTTP routes for blog management.

import express from 'express';
import { resetPosts } from './blogService.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// ------------------- Routes -------------------

/**
 * Resets posts.json to its initial state.
 * Response (200 OK): { message: "All posts have been cleared" }
 */
app.post('/reset', async (req, res) => {
  await resetPosts();
  res.json({ message: 'All posts have been cleared' });
});

// TODO: Implement the following routes:
/**
 * POST /posts
 * Creates a new blog post with a unique ID, timestamp, and views initialized to 0.
 * Expected Request Body: { title: string, content: string }
 * Success Response (201 Created): Newly created post object as JSON
 * Error Response (400 Bad Request): { message: "Title and content are required" } if title or content is missing
 */

/**
 * GET /posts/:id
 * Retrieves a single post by ID (and increments its view count).
 * Success Response (200 OK): Post object as JSON if found
 * Error Response (404 Not Found): { message: "Post #<id> not found" } if ID does not exist
 */

/**
 * PUT /posts/:id
 * Updates an existing post's title and/or content.
 * Expected Request Body: { title?: string, content?: string }
 * Success Response (200 OK): { message: "Post #<id> updated" }
 * Error Response (400 Bad Request): { message: "Must provide title or content to update" } if both fields are missing
 * Error Response (404 Not Found): { message: "Post #<id> not found" } if ID does not exist
 */

/**
 * DELETE /posts/:id
 * Deletes a post by ID.
 * Success Response (200 OK): { message: "Post #<id> deleted" }
 * Error Response (404 Not Found): { message: "Post #<id> not found" } if ID does not exist
 */

/**
 * GET /posts
 * Retrieves all blog posts.
 * Success Response (200 OK): Array of post objects as JSON
 */

/**
 * ===============================
 * IMPORTANT – DO NOT MODIFY
 * ===============================
 *
 * Runs automatically when executing `npm start`.
 * Automatically bypassed during testing in gradescope.
 */

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default app;
