const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  nombres: String,
  apellidos: String,
  codigoAdmin: Number,
  pass: String,
  token: String
});

module.exports = mongoose.model('Admin', adminSchema);