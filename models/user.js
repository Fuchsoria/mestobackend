const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    unique: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    required: true,
    type: String,
  },
});

userSchema.path('email').validate(validator.isEmail, 'Invalid Email');
userSchema.path('avatar').validate(validator.isURL, 'Invalid Link');

module.exports = mongoose.model('user', userSchema);
