const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
require('express-async-errors');
const User = require('../models/user');

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    author: 1,
    title: 1,
    id: 1,
  });
  const usersParsed = users.map((e) => e.toJSON());
  res.json(usersParsed);
});

userRouter.post('/', async (req, res) => {
  if (!req.body.password || req.body.password.length <= 3) {
    res
      .status(400)
      .send({ error: 'password is missing or less than 3 digits' });
    return;
  }
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

userRouter.delete('/:id', async (req, res) => {
  await User.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

module.exports = userRouter;
