const mongoose = require('mongoose');

const valeSchema = new mongoose.Schema({
  correo: String,
  pass: String
});

module.exports = mongoose.model('Vale', valeSchema);
