const mongoose = require('mongoose');
const schema = require('./schema/index');

module.exports = {
  user: mongoose.model('user', schema.user),
  todolists: mongoose.model('todolists', schema.todolists)
}