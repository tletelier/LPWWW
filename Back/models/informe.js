const mongoose = require('mongoose');

const informeSchema = new mongoose.Schema({
  fecha: Date,
  cantidadValesUsados: Number,
  cantidadValesNoUsados: Number,
  autor: {type: mongoose.Schema.ObjectId, ref: 'admin'},
  vale: [{type: mongoose.Schema.ObjectId, ref: 'vale'}],
});

module.exports = mongoose.model('Informe', informeSchema);