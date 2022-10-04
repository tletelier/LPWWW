const mongoose = require('mongoose');

const cajeroSchema = new mongoose.Schema({
  nombres: String,
  apellidos: String,
  password: String,
  codigoCajero: Number,
  sucursal: {type: mongoose.Schema.ObjectId, ref: 'sucursal'}
});

module.exports = mongoose.model('Cajero', cajeroSchema);