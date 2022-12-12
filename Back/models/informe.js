const mongoose = require('mongoose');

const informeSchema = new mongoose.Schema({
  fecha: Date,
  cantidadValesUsados: Number,
  cantidadValesNoUsados: Number,
  autor: {type: mongoose.Schema.ObjectId, ref: 'Admin'},
  vale: [{type: mongoose.Schema.ObjectId, ref: 'Vale', default: []}],
});

module.exports = mongoose.model('Informe', informeSchema);