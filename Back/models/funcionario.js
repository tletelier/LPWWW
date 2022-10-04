const mongoose = require('mongoose');

const funcionarioSchema = new mongoose.Schema({
  nombres: String,
  apellidos: String,
  codigoFuncionario: Number,
  correo: String,
  password: String,
  perfil: {type: mongoose.Schema.ObjectId, ref: 'perfil'},
  valesDisponibles: Number,
  valesUtilizados: Number,
  valesNoUtilizados: Number,
});

module.exports = mongoose.model('Funcionario', funcionarioSchema);
