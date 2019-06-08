const mongoose = require('mongoose');

const todolists = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  leader: {
    required: true,
    type: String
  },
  members: {
    required: true,
    type: Number,
  }
});

module.exports = todolists;