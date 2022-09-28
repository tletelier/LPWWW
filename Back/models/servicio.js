const mongoose = require('mongoose');

const servicioSchema = new mongoose.Schema({
  nombre: String,
  horarioInicio: String,
  horarioFin: String,
  perfil: [{type: mongoose.Schema.ObjectId, ref: 'perfil', default: []}],
});

module.exports = mongoose.model('Servicio', servicioSchema);