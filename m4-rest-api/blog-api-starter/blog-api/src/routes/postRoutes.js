import express from 'express';
import {
  getAllPostsHandler,
  getPostByIdHandler,
  createPostHandler,
  updatePostHandler,
  deletePostHandler,
} from '../controllers/postController.js';

const router = express.Router();

//router.get('/api/posts', getAllPostsHandler);
router.get('/', getAllPostsHandler);
router.get('/:id', getPostByIdHandler);
router.post('/', createPostHandler);
router.put('/:id', updatePostHandler);
router.delete('/:id', deletePostHandler);

export default router;
