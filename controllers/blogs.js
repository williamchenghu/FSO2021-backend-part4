const jwt = require('jsonwebtoken');
const blogRouter = require('express').Router();
require('express-async-errors');
const config = require('../utils/config');
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });
  const blogsParsed = blogs.map((e) => e.toJSON());
  res.json(blogsParsed);
});

blogRouter.post('/', async (req, res) => {
  const decodedToken = jwt.verify(req.token, config.SECRET);
  if (!req.token || !decodedToken.id) {
    res.status(401).json({ error: 'token missing or invalid' });
    return;
  }
  const user = await User.findById(decodedToken.id);
  let reqBody;
  if (req.body.likes > 0) {
    reqBody = { ...req.body, user: user._id };
  } else {
    reqBody = { ...req.body, user: user._id, likes: 0 };
  }
  const blog = new Blog(reqBody);
  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.updateOne({ blogs: user.blogs });
  res.status(201).json(result);
});

blogRouter.delete('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, config.SECRET);
  const blogToDelete = await Blog.findById(req.params.id);
  if (!blogToDelete) {
    res.status(400).json({ error: 'cannot find blog to delete' });
    return;
  }
  if (!req.token || !decodedToken.id) {
    res.status(401).json({ error: 'token missing or invalid' });
    return;
  }
  if (decodedToken.id === blogToDelete.user.toString()) {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
    return;
  }
  res
    .status(401)
    .json({ error: 'non-creator cannot delete blog belongs to others ' });
});

blogRouter.put('/:id', async (req, res) => {
  const updatedResult = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: 'query',
  });
  res.status(200).json(updatedResult);
});

module.exports = blogRouter;
