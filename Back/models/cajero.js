const mongoose = require('mongoose');

const cajeroSchema = new mongoose.Schema({
  nombres: String,
  apellidos: String,
  turno: String,
  sucursal: {type: mongoose.Schema.ObjectId, ref: 'sucursal'}
});

module.exports = mongoose.model('Cajero', cajeroSchema);