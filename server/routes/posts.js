import express from 'express';

import { getPosts, getPostsBySearch, getPostsByCreator, getPost, createPost, updatePost, likePost, commentPost, deletePost } from '../controllers/posts.js';
import auth from "../middleware/auth.js";
// config router
const router = express.Router();

// fetching routers

// get post by creator 
router.get('/creator', getPostsByCreator);
// get post by search
router.get('/search', getPostsBySearch);
// get all posts
router.get('/', getPosts);
// get single post
router.get('/:id', getPost);

// Create Update, Delete, routes, like and comment  with auth middle ware

// create post 
router.post('/', auth, createPost);
// update post 
router.patch('/:id', auth, updatePost);
// delete post 
router.delete('/:id', auth, deletePost);
// Like button 
router.patch('/:id/likePost', auth, likePost);
// comment route
router.post('/:id/commentPost', commentPost);

export default router;