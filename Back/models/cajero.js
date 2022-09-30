const mongoose = require('mongoose');

const cajeroSchema = new mongoose.Schema({
  nombres: String,
  apellidos: String,
  correo: String,
  pass: String,
  codigoCajero: Number,
  turno: String,
  sucursal: {type: mongoose.Schema.ObjectId, ref: 'sucursal'}
});

module.exports = mongoose.model('Cajero', cajeroSchema);