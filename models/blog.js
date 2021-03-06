const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  likes: { type: Number },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
blogSchema.plugin(uniqueValidator);

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const formattedReturnedObject = {
      id: returnedObject._id.toString(),
      ...returnedObject,
    };
    delete formattedReturnedObject._id;
    delete formattedReturnedObject.__v;
    return formattedReturnedObject;
  },
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
