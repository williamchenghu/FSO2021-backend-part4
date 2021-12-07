const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');

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
  {
    title: 'test blog 2',
    author: 'test author 2',
    url: 'testURL_2',
    likes: 7,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObj = new Blog(initialBlogs[0]);
  await blogObj.save();
  blogObj = new Blog(initialBlogs[1]);
  await blogObj.save();
});

describe('blog test', () => {
  test('blogs data get as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
