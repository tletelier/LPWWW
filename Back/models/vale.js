const mongoose = require('mongoose');

const valeSchema = new mongoose.Schema({
  fecha: Date,
  saldo: Number,
  estado: Number,
  funcionario: {type: mongoose.Schema.ObjectId, ref: 'Funcionario'},
  cajero: {type: mongoose.Schema.ObjectId, ref: 'Cajero'},
  sucursal: {type: mongoose.Schema.ObjectId, ref: 'Sucursal'},
  perfilName: String,
  servicioName: String
});

module.exports = mongoose.model('Vale', valeSchema);