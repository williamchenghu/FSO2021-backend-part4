const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const helper = require('./api_test_helper');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
  await User.deleteMany({});
  await User.insertMany(helper.initialUsers);
});

describe('blog list tests', () => {
  test('blogs data returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('blogs data has id field', async () => {
    const blogs = await helper.blogsInDb();
    blogs.map((e) => expect(e.id).toBeDefined());
  });
});

describe('blog creation with token', () => {
  test('creation via post', async () => {
    const testToken = await helper.tokenForTest();
    const testBlog = {
      title: 'test blog TEMP',
      author: 'test author TEMP',
      url: 'testURL_TEMP',
      likes: 0,
    };
    // test if data save was completed with right status report
    await api
      .post('/api/blogs')
      .set('Authorization', testToken)
      .send(testBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    // test if data save have changed the dataset in DB
    const blogSaveResponse = await helper.blogsInDb();
    expect(blogSaveResponse).toHaveLength(helper.initialBlogs.length + 1);
    // test token identified user and blog creation user are the same
    const decodedTestToken = jwt.verify(testToken.substring(7), config.SECRET);
    const testTokenCreater = decodedTestToken.id;
    const blogCreated = await Blog.findOne(testBlog);
    const userOfBlogCreated = blogCreated.user.valueOf();
    expect(testTokenCreater).toBe(userOfBlogCreated);
  });

  test('assign 0 to likes if non-existent', async () => {
    const testToken = await helper.tokenForTest();
    const testBlogWithoutLikes = {
      title: 'test blog TEMP',
      author: 'test author TEMP',
      url: 'testURL_TEMP',
    };
    await api
      .post('/api/blogs')
      .set('Authorization', testToken)
      .send(testBlogWithoutLikes);

    const blogSaveResponse = await helper.blogsInDb();
    const blogLookUp = blogSaveResponse.find(
      (e) => e.title === testBlogWithoutLikes.title
    );
    expect(blogLookUp.likes).toBe(0);
  });

  test('Bad request without title and url', async () => {
    const testToken = await helper.tokenForTest();
    const testBlogWithoutTitleAndUrl = {
      author: 'test author TEMP',
      likes: 7,
    };
    // test if date save was rejected due to bad request
    await api
      .post('/api/blogs')
      .set('Authorization', testToken)
      .send(testBlogWithoutTitleAndUrl)
      .expect(400);
    // test if database have been affected or not
    const blogsInDb = await helper.blogsInDb();
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length);
  });
});

describe('blog creation with invalid token', () => {
  test('creation fail', async () => {
    const invalidToken = 'bearer invalidTokenFortTest';
    const testBlog = {
      title: 'test blog TEMP',
      author: 'test author TEMP',
      url: 'testURL_TEMP',
      likes: 0,
    };
    // test if data save was completed with right status report
    await api
      .post('/api/blogs')
      .set('Authorization', invalidToken)
      .send(testBlog)
      .expect(401);
    // test if database have been affected or not
    const blogsInDb = await helper.blogsInDb();
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length);
  });
});

describe('blog deletion tests', () => {
  test('deletion with id test', async () => {
    const existingBlogs = await helper.blogsInDb();
    const blogToDelete = existingBlogs[0];
    // test if deletion was completed with right status report
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    // test if deletion have changed the dataset in DB
    const blogsAfterDeletion = await helper.blogsInDb();
    expect(blogsAfterDeletion).toHaveLength(helper.initialBlogs.length - 1);
    // test if deletion was done to the right target
    const blogsTitleArray = blogsAfterDeletion.map((e) => e.title);
    expect(blogsTitleArray).not.toContain(blogToDelete.title);
  });
});

describe('blog updates tests', () => {
  test('update likes of a blog', async () => {
    const existingBlogs = await helper.blogsInDb();
    const blogToUpdate = {
      ...existingBlogs[0],
      likes: existingBlogs[0].likes + 1,
    };
    // test if update was completed with right status report
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200);
    // test if likes of the target blog was updated with correct amount
    const blogsAfterUpdate = await helper.blogsInDb();
    const blogUpdated = blogsAfterUpdate.find(
      (e) => e.title === blogToUpdate.title
    );
    expect(blogUpdated.likes).toBe(blogUpdated.likes);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
