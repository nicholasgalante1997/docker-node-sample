const Post = require('../models/Post');

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200);
    res.json({
      status: 'success',
      data: posts,
      results: posts.length,
    });
  } catch (e) {
    res.status(400);
    res.json({
      status: 'fail',
    });
  }
};

exports.getOnePosts = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.status(200);
    res.json({
      status: 'success',
      data: post,
    });
  } catch (e) {
    res.status(400);
    res.json({
      status: 'fail',
    });
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.status(200);
    res.json({
      status: 'success',
      data: post,
    });
  } catch (e) {
    res.status(400);
    res.json({
      status: 'fail',
    });
  }
};

exports.updatePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200);
    res.json({
      status: 'success',
      data: post,
    });
  } catch (e) {
    res.status(400);
    res.json({
      status: 'fail',
    });
  }
};

exports.deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndDelete(id);
    res.status(200);
    res.json({
      status: 'success',
      data: `deleted post with and id of ${id}`,
    });
  } catch (e) {
    res.status(400);
    res.json({
      status: 'fail',
    });
  }
};
