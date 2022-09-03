const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  correo: String,
  pass: String
});

module.exports = mongoose.model('User', userSchema);
