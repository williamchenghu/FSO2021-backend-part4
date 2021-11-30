// const http = require('http');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');

const config = require('./utils/config');
const blogRouter = require('./controllers/blogs');

console.log(`connecting to`, config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log(`connected to MongoDB`))
  .catch((err) => console.error(`error connecting to MongoDB:`, err.message));

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogRouter);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
