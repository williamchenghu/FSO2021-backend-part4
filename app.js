const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const blogRouter = require('./controllers/blogs');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

logger.log('connecting to MongoDB');
mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.log('connected to MongoDB'))
  .catch((err) => logger.error('error connecting to MongoDB:', err.message));

app.use(cors());
app.use(express.json());
// app.use(middleware.requestLogger);
app.use('/api/blogs', blogRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
