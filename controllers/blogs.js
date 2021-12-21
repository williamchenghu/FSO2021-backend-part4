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

const getTokenFromHeader = (req) => {
  const authorizationHeader = req.get('authorization');
  if (
    authorizationHeader &&
    authorizationHeader.toLowerCase().startsWith('bearer ')
  ) {
    return authorizationHeader.substring(7);
  }
  return null;
};

blogRouter.post('/', async (req, res) => {
  const token = getTokenFromHeader(req);
  const decodedToken = jwt.verify(token, config.SECRET);
  if (!token || !decodedToken.id) {
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
  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
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
