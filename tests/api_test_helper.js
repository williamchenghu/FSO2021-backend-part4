const jwt = require('jsonwebtoken');
const config = require('../utils/config');
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

const initialUsers = [
  {
    username: 'preUser1',
    name: 'Pre User 1',
    password: 'preSecret1',
  },
  {
    username: 'preUser2',
    name: 'Pre User 2',
    password: 'preSecret2',
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

const tokenForTest = async () => {
  const testUser = await User.findOne({ username: initialUsers[0].username });
  const testUserForToken = {
    username: testUser.username,
    id: testUser._id,
  };
  const authenScheme = 'Bearer ';
  return authenScheme.concat(
    jwt.sign(testUserForToken, config.SECRET, {
      expiresIn: '5m',
    })
  );
};

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDb,
  usersInDb,
  tokenForTest,
};
