const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const config = require('../utils/config');
const User = require('../models/user');

loginRouter.post('/', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(req.body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    res.status(401).json({
      error: 'invalid username or password',
    });
    return;
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, config.SECRET, { expiresIn: '1h' });
  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
