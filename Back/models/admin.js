const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  nombres: String,
  apellidos: String,
  codigoAdmin: Number,
  password: String,
});

module.exports = mongoose.model('Admin', adminSchema);