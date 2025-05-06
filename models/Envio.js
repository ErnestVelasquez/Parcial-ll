const mongoose = require('mongoose');

const envioSchema = new mongoose.Schema({
    Usuarios_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios' },
    nombre: String,
    direccion: String,
    telefono: String,
    referencia: String,
    descripcion: String,
    peso: Number,
    fecha_entrega: Date,
    costo_extra: Number
});

module.exports = mongoose.model('Envio', envioSchema);