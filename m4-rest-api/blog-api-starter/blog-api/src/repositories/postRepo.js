import { posts, getNextId } from '../db/posts.js';

export function getAll() {
  return posts;
}

export function getById(id) {
  return posts.find((p) => p.id === id);
}

export function create(postData) {
  const newPost = {
    id: getNextId(),
    title: postData.title,
    content: postData.content,
    createdAt: new Date().toISOString(),
  };

  posts.push(newPost);
  return newPost;
}

export function update(id, updatedData) {
  const post = posts.find((p) => p.id === id);
  if (!post) return undefined;
  if (updatedData.title) post.title = updatedData.title;
  if (updatedData.content) post.content = updatedData.content;

  return post;
}

export function remove(id) {
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return false;

  // splice(index, 1) does two things: it deletes 1 post from posts in place,
  // and it RETURNS the deleted posts as an array, e.g. [{ id: 2, ... }].
  // const [removed] = thatArray is shorthand for removed = thatArray[0],
  // so `removed` ends up as the post object itself, not an array holding it.
  const [removed] = posts.splice(index, 1);
  return removed;
}
