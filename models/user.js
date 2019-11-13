const mongoose = require('mongoose');
const { urlcheck } = require('../modules/urlcheck');

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30
  },
  about: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30
  },
  avatar: {
    required: true,
    type: String
  }
});

userSchema.path('avatar').validate(urlcheck, 'Invalid Link');

module.exports = mongoose.model('user', userSchema);
