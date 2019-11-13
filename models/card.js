const mongoose = require('mongoose');
const { urlcheck } = require('../modules/urlcheck');

const cardSchema = mongoose.Schema({
  name: {
    required: true,
    minlength: 2,
    maxlength: 30,
    type: String
  },
  link: {
    required: true,
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

cardSchema.path('link').validate(urlcheck, 'Invalid Link');

module.exports = mongoose.model('card', cardSchema);
