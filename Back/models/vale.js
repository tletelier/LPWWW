const mongoose = require('mongoose');

const valeSchema = new mongoose.Schema({
  fecha: Date,
  saldo: Number,
  estado: Number,
  funcionario: {type: mongoose.Schema.ObjectId, ref: 'Funcionario'},
  cajero: {type: mongoose.Schema.ObjectId, ref: 'Cajero'},
  sucursal: {type: mongoose.Schema.ObjectId, ref: 'Sucursal'},
  perfil: {type: mongoose.Schema.ObjectId, ref: 'Perfil'},
  servicio: {type: mongoose.Schema.ObjectId, ref: 'Servicio'}
});

module.exports = mongoose.model('Vale', valeSchema);