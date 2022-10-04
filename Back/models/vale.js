const mongoose = require('mongoose');

const valeSchema = new mongoose.Schema({
  fecha: Date,
  saldo: Number,
  estado: Number,
  servicio: {type: mongoose.Schema.ObjectId, ref: 'servicio'},
  funcionario: {type: mongoose.Schema.ObjectId, ref: 'funcionario'},
  cajero: {type: mongoose.Schema.ObjectId, ref: 'cajero'},
  sucursal: {type: mongoose.Schema.ObjectId, ref: 'sucursal'},
  perfilName: String,
  servicioName: String
});

module.exports = mongoose.model('Vale', valeSchema);