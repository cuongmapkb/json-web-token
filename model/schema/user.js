const mongoose = require('mongoose');

const user = new mongoose.Schema({
  username: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String,
  }
});

module.exports = user;