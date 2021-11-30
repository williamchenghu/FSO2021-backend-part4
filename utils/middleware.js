const logger = require('./logger');

const requestLogger = (req, res, next) => {
  logger.log('Method:', req.method);
  logger.log('Path:  ', req.path);
  logger.log('Body:  ', req.body);
  logger.log('---');
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ err: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === 'CastError') {
    return res.status(400).send({ err: 'malformatted id' });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ err: err.message });
  }

  return next(err);
};

module.exports = { requestLogger, unknownEndpoint, errorHandler };
