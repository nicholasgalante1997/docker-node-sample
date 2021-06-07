const express = require('express');
const postController = require('../controller/posts');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(postController.getAllPosts)
  // protecting the post route from unauthorized users
  .post(protect, postController.createPost);

router.route('/:id')
  .get(postController.getOnePosts)
  .patch(protect, postController.updatePost)
  .delete(protect, postController.deletePost);

module.exports = router;
