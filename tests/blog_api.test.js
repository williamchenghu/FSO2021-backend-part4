const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./blog_api_helper');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObj = new Blog(helper.initialBlogs[0]);
  await blogObj.save();
  blogObj = new Blog(helper.initialBlogs[1]);
  await blogObj.save();
});

describe('blog list test', () => {
  test('blogs data returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('blogs data has id filed', async () => {
    const blogs = await helper.blogsInDb();
    expect(blogs).toBeDefined();
  });

  test('blog creation via post', async () => {
    const testBlog = {
      title: 'test blog [soon removed]',
      author: 'test author [soon removed]',
      url: 'testURL_[soon_removed]',
      likes: 0,
    };
    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogSaveResponse = await helper.blogsInDb();
    expect(blogSaveResponse).toHaveLength(helper.initialBlogs.length + 1);
  });

  test('likes to 0 if existent', async () => {
    const testBlogWithoutLikes = {
      title: 'test blog [soon removed]',
      author: 'test author [soon removed]',
      url: 'testURL_[soon_removed]',
    };
    await api.post('/api/blogs').send(testBlogWithoutLikes);

    const blogSaveResponse = await helper.blogsInDb();
    const blogLookUp = blogSaveResponse.find(
      (e) => e.title === testBlogWithoutLikes.title
    );
    expect(blogLookUp.likes).toBe(0);
  });

  test('Bad request without title and url', async () => {
    const testBlogWithoutTitleAndUrl = {
      author: 'test author [soon removed]',
      likes: 7,
    };
    await api.post('/api/blogs').send(testBlogWithoutTitleAndUrl).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
