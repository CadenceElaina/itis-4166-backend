// blogService.js
// This module handles blog post CRUD operations

import fs from 'fs/promises';
import { join } from 'path';
import { format } from 'date-fns';

// Filepath for posts.json. Use this for reading/writing posts.
const postsFile = join(process.cwd(), 'posts.json');

/**
 * Read the whole data file.
 * @returns {Promise<{nextId: number, posts: Array<object>}>}
 */
async function readData() {
  const raw = await fs.readFile(postsFile, 'utf-8');
  return JSON.parse(raw);
}

/**
 * Persist the whole data file.
 * @param {{nextId: number, posts: Array<object>}} data
 */
async function writeData(data) {
  await fs.writeFile(postsFile, JSON.stringify(data, null, 2));
}

/**
 * Reset posts.json: clear all posts and set nextId back to 1.
 */
export async function resetPosts() {
  await writeData({ nextId: 1, posts: [] });
}

/**
 * Add a new post with a unique ID and timestamp.
 * @param {string} title - Post title
 * @param {string} content - Post content
 * @returns {object} The newly created post object (with views: 0)
 */
export async function createPost(title, content) {
  const data = await readData();

  const post = {
    id: data.nextId,
    title,
    content,
    views: 0,
    createdAt: format(new Date(), 'y-M-d h:m aaa'),
  };

  data.posts.push(post);
  data.nextId += 1;
  await writeData(data);

  return post;
}

/**
 * Retrieves a post by its ID, recording a view. Returns the updated post object, or undefined if not found.
 * @param {number} id - Post ID
 * @returns {object|undefined} The updated post if found, otherwise undefined
 */
export async function readPost(id) {
  const data = await readData();
  const post = data.posts.find((p) => p.id === Number(id));

  if (!post) return undefined;

  post.views += 1;
  await writeData(data);

  return post;
}

/**
 * Update a post's title and/or content.
 * @param {number} id - Post ID
 * @param {string} newTitle - New title (optional)
 * @param {string} newContent - New content (optional)
 * @returns {boolean} True if updated successfully, false if post not found
 */
export async function updatePost(id, newTitle, newContent) {
  const data = await readData();
  const post = data.posts.find((p) => p.id === Number(id));

  if (!post) return false;

  if (newTitle) post.title = newTitle;
  if (newContent) post.content = newContent;
  await writeData(data);

  return true;
}

/**
 * Delete a post by its ID.
 * @param {number} id - Post ID
 * @returns {boolean} True if deleted successfully, false if post not found
 */
export async function deletePost(id) {
  const data = await readData();
  const index = data.posts.findIndex((p) => p.id === Number(id));

  if (index === -1) return false;

  data.posts.splice(index, 1);
  await writeData(data);

  return true;
}

/**
 * Return all posts as an array of objects.
 * @returns {Array<object>} Array of all post objects
 */
export async function listPosts() {
  const data = await readData();
  return data.posts;
}
