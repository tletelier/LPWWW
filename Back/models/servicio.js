const mongoose = require('mongoose');

const servicioSchema = new mongoose.Schema({
  nombre: String,
  horarioInicio: String,
  horarioFin: String,
  valor: Number,
  maxValesTurno: Number
});

module.exports = mongoose.model('Servicio', servicioSchema);