const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'test blog 0',
    author: 'test author 0',
    url: 'testURL_0',
    likes: 2,
  },
  {
    title: 'test blog 1',
    author: 'test author 1',
    url: 'testURL_1',
    likes: 4,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((e) => e.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((e) => e.toJSON());
};

module.exports = { initialBlogs, blogsInDb, usersInDb };
