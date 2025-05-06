const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: String,
    creditos: Number
});

module.exports = mongoose.model('Usuarios', usuarioSchema);