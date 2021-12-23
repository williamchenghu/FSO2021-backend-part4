const logger = require('./logger');

const requestLogger = (req, res, next) => {
  logger.log(`Method: ${req.method}`);
  logger.log(`Path:   ${req.path}`);
  logger.log(`Body:   ${JSON.stringify(req.body)}`);
  logger.log('---');
  next();
};

const tokenExtractor = (req, res, next) => {
  const authorizationHeader = req.get('authorization');
  if (
    authorizationHeader &&
    authorizationHeader.toLowerCase().startsWith('bearer ')
  ) {
    req.token = authorizationHeader.substring(7);
    next();
    return;
  }
  req.token = null;
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).send({ error: 'invalid token' });
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).send({ error: 'token expired' });
  }

  return next(err);
};

module.exports = {
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
  errorHandler,
};
