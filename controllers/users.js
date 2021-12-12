const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
require('express-async-errors');
const User = require('../models/user');

userRouter.get('/', async (req, res) => {
  const users = await User.find({});
  const usersParsed = users.map((e) => e.toJSON());
  res.json(usersParsed);
});

userRouter.post('/', async (req, res) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
  const user = new User({
    username: req.body.username,
    name: req.body.name,
    passwordHash,
  });
  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

module.exports = userRouter;
