const mongoose = require('mongoose');

const servicioSchema = new mongoose.Schema({
  tipo: String,
  horario: String,
  valor: Number,
  perfil: String,
});

module.exports = mongoose.model('Servicio', servicioSchema);