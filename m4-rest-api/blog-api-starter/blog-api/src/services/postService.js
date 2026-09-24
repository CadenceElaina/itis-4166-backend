import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../repositories/postRepo.js';

export function getAllPosts() {
  return getAll();
}

export function getPostById(id) {
  return getById(id);
}

export function createPost(postData) {
  return create(postData);
}

export function updatePost(id, postData) {
  return update(id, postData);
}

export function deletePost(id) {
  return remove(id);
}
