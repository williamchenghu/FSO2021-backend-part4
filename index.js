// const http = require('http');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');

const config = require('./utils/config');
const Blog = require('./models/blog');

console.log(`connecting to`, config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log(`connected to MongoDB`))
  .catch((err) => console.error(`error connecting to MongoDB:`, err.message));

app.use(cors());
app.use(express.json());

app.get('/api/blogs', (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

app.post('/api/blogs', (req, res, next) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => next(err));
});

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
