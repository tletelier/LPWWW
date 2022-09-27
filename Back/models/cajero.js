const mongoose = require('mongoose');

const cajeroSchema = new mongoose.Schema({
  codigoCajero: Number,
  pass: String,
  nombres: String,
  apellidos: String,
  sucursal: {type: mongoose.Schema.ObjectId, ref: 'sucursal'}
});

module.exports = mongoose.model('Cajero', cajeroSchema);