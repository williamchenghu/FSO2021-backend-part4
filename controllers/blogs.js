const blogRouter = require('express').Router();
require('express-async-errors');
const Blog = require('../models/blog');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogRouter.post('/', async (req, res) => {
  let reqBody;
  if (req.body > 0) {
    reqBody = req.body;
  } else {
    reqBody = { ...req.body, likes: 0 };
  }
  const blog = new Blog(reqBody);
  const result = await blog.save();
  res.status(201).json(result);
});

module.exports = blogRouter;
