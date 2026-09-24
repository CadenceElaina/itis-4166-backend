import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../services/postService.js';

export function getAllPostsHandler(req, res) {
  let posts = getAllPosts();
  res.json(posts); // status not necessary 200 by default
}

export function getPostByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const post = getPostById(id);

  if (post) {
    return res.status(200).json(post);
  } else {
    res.status(404).json({ error: `Post ${id} not found` });
  }
}

export function createPostHandler(req, res) {
  const { title, content } = req.body;
  const newPost = createPost({ title, content });
  res.status(201).json(newPost);
}

export function updatePostHandler(req, res) {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  const updatedPost = updatePost(id, { title, content });
  if (updatedPost) {
    return res.status(200).json(updatedPost);
  } else {
    res.status(404).json({ error: `Post ${id} not found` });
  }
}

export function deletePostHandler(req, res) {
  const id = parseInt(req.params.id);
  const deletedPost = deletePost(id);
  if (deletedPost) {
    return res.status(200).json(deletedPost);
  } else {
    res.status(404).json({ error: `Failed to delete post ${id}` });
  }
}
