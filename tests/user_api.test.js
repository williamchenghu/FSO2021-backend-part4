const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const helper = require('./api_test_helper');
const app = require('../app');

const api = supertest(app);
const User = require('../models/user');

beforeEach(async () => {
  await User.deleteMany({});
});

describe('user list test', () => {
  test('user data returned as JSON', async () => {
    await api
      .get('/api/users/')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

describe('user creation test (with exisiting user in DB)', () => {
  beforeEach(async () => {
    const passwordHash = await bcrypt.hash('preSecret', 10);
    const user = new User({ username: 'preUser', passwordHash });
    await user.save();
  });
  test('creation via post', async () => {
    // test if user creation was completed with right status report
    const existingUsers = await helper.usersInDb();
    const newUser = {
      username: 'newUserCreationTest',
      name: 'New User',
      password: 'newUserTopSecret',
    };
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    // test if user creation have changed the dataset in DB
    const usersInDbAfterSave = await helper.usersInDb();
    expect(usersInDbAfterSave).toHaveLength(existingUsers.length + 1);
    // test if user name exists in the dataset after creation
    const usernameArray = usersInDbAfterSave.map((e) => e.username);
    expect(usernameArray).toContain(newUser.username);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
