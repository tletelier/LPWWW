const mongoose = require('mongoose');

// CHANGE from 1.x: need to pass in mongoose instance
var deepPopulate = require('mongoose-deep-populate')(mongoose);


const perfilSchema = new mongoose.Schema({
  nombre: String,
  servicios: [{type: mongoose.Schema.ObjectId, ref: 'Servicio', default: []}],
});

perfilSchema.plugin(deepPopulate);

module.exports = mongoose.model('Perfil', perfilSchema);