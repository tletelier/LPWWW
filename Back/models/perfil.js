const mongoose = require('mongoose');

const perfilSchema = new mongoose.Schema({
  nombre: String,
  servicios: [{type: mongoose.Schema.ObjectId, ref: 'servicio', default: []}],
});

module.exports = mongoose.model('Perfil', perfilSchema);