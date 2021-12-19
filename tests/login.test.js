const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const helper = require('./api_test_helper');
const app = require('../app');

const api = supertest(app);
const User = require('../models/user');

beforeEach(async () => {
  await User.deleteMany({});
  const users = await Promise.all(
    helper.initialUsers.map(async (e) => {
      const passwordHash = await bcrypt.hash(e.password, 10);
      const eachUser = { ...e, passwordHash };
      delete eachUser.password;
      return eachUser;
    })
  );
  await User.insertMany(users);
});

describe('user login', () => {
  test('login fail if user not exist in DB', async () => {
    const existingUsers = await helper.usersInDb();
    const loginReqUser = { username: 'nonExistingUser' };
    await api.post('/api/login').send(loginReqUser).expect(401);
    // test if user login failure have changed the dataset in DB
    const usersInDbAfterSave = await helper.usersInDb();
    expect(usersInDbAfterSave).toHaveLength(existingUsers.length);
  });

  test('login fail if wrong password is provided', async () => {
    const existingUsers = await helper.usersInDb();
    const loginReqWrongPass = { password: 'wrongPassword' };
    await api.post('/api/login').send(loginReqWrongPass).expect(401);
    // test if user login failure have changed the dataset in DB
    const usersInDbAfterSave = await helper.usersInDb();
    expect(usersInDbAfterSave).toHaveLength(existingUsers.length);
  });

  test('token generation (with exisiting user in DB)', async () => {
    await api.post('/api/login').send(helper.initialUsers[0]).expect(200);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
