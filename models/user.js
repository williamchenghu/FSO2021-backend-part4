const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const formattedReturnedObject = {
      id: returnedObject._id.toString(),
      ...returnedObject,
    };
    delete formattedReturnedObject._id;
    delete formattedReturnedObject.__v;
    // the passwordHash should not be revealed
    delete formattedReturnedObject.passwordHash;
    return formattedReturnedObject;
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
