const mongoose = require('mongoose');

const sucursalSchema = new mongoose.Schema({
  direccion: String,
  codigoSucursal: Number,
});

module.exports = mongoose.model('Sucursal', sucursalSchema);