const mongoose = require('mongoose');

const perfilSchema = new mongoose.Schema({
  nombre: String,
  servicios: [{type: mongoose.Schema.ObjectId, ref: 'Servicio', default: []}],
});

module.exports = mongoose.model('Perfil', perfilSchema);