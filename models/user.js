const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = mongoose.Schema({

  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator(v) {
        return isEmail(v);
      },
      message: 'Please enter a valid email address',
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

});

module.exports = mongoose.model('user', userSchema);
