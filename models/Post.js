const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'blog must have title'],
  },
  body: {
    type: String,
    required: [true, 'blog must have content'],
  },
});

const Post = mongoose.model('Posts', postSchema);
module.exports = Post;
