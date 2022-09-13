const mongoose = require('mongoose');

const funcionarioSchema = new mongoose.Schema({
  nombres: String,
  apellidos: String,
  codigoFuncionario: Number,
  correo: String,
  pass: String,
  perfil: String,
  valesDisponibles: Number,
  valesUtilizados: Number,
  valesNoUtilizados: Number,
  sucursal: {type: mongoose.Schema.ObjectId, ref: 'sucursal'}
});

module.exports = mongoose.model('Funcionario', funcionarioSchema);