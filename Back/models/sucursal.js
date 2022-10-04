const mongoose = require('mongoose');

const sucursalSchema = new mongoose.Schema({
  direccion: String,
  codigoSucursal: Number,
  cajero: {type: mongoose.Schema.ObjectId, ref: 'cajero'}
});

module.exports = mongoose.model('Sucursal', sucursalSchema);