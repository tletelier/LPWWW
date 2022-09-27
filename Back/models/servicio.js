const mongoose = require('mongoose');

const servicioSchema = new mongoose.Schema({
  tipo: String,
  horario: String,
  valor: Number,
  perfil: [{type: mongoose.Schema.ObjectId, ref: 'perfil'}],
});

module.exports = mongoose.model('Servicio', servicioSchema);