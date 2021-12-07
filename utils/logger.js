require('dotenv').config();

const log = (info) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(info);
  }
};

const error = (err) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(err);
  }
};

module.exports = { log, error };
