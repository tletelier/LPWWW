const mongoose = require('mongoose');

const perfilSchema = new mongoose.Schema({
  nombre: String,
  cantidadTurno: Number,
  valor: Number,
});

module.exports = mongoose.model('Perfil', perfilSchema);