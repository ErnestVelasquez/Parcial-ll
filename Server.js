const express = require('express');
require('./App.js'); 

const Usuarios = require('./models/Usuarios.js');
const Envio = require('./models/Envio.js');

const app = express();
app.use(express.json());

// Obtener créditos de un usuario
const mongoose = require('mongoose');

app.get('/creditos/:usuario_id', async (req, res) => {
    try {
        const id = req.params.usuario_id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID de usuario no válido." });
        }

        const usuario = await Usuarios.findById(id);
        if (!usuario) return res.status(404).json({ error: "Usuario no encontrado." });

        res.json({ creditos: usuario.creditos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al consultar créditos." });
    }
});

// Registrar usuario
app.post('/crear-usuario', async (req, res) => {
    try {
        const { nombre, creditos } = req.body;

        const nuevoUsuario = new Usuarios({
            nombre,
            creditos
        });

        await nuevoUsuario.save();

        res.json({ mensaje: "Usuario creado correctamente", usuario: nuevoUsuario });
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ error: "Error al crear usuario" });
    }
});


// Registrar un envío
app.post('/envio', async (req, res) => {
    try {
        const { usuario_id, nombre, direccion, telefono, referencia, descripcion, peso, fecha_entrega } = req.body;

        const usuario = await Usuarios.findById(usuario_id);
        if (!usuario) return res.status(404).json({ error: "Usuario no encontrado." });
        if (usuario.creditos <= 0) return res.status(400).json({ error: "Créditos insuficientes." });

        let costo_extra = 0;
        if (peso > 3) costo_extra = Math.ceil(peso / 3) * 135;

        const envio = await Envio.create({
            usuario_id,
            nombre,
            direccion,
            telefono,
            referencia,
            descripcion,
            peso,
            fecha_entrega,
            costo_extra
        });

        await Usuarios.findByIdAndUpdate(usuario_id, { $inc: { creditos: -1 } });

        res.json({ mensaje: "Envío registrado con éxito", envio });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al registrar envío." });
    }
});

// Consultar envíos por usuario
app.get('/envios/:usuario_id', async (req, res) => {
    try {
        const envios = await Envio.find({ usuario_id: req.params.usuario_id });
        res.json(envios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al consultar envíos." });
    }
});

// Eliminar envío y reembolsar crédito
app.delete('/envio/:envio_id', async (req, res) => {
    try {
        const envio = await Envio.findById(req.params.envio_id);
        if (!envio) return res.status(404).json({ error: "Envío no encontrado." });

        await Envio.findByIdAndDelete(req.params.envio_id);
        await Usuarios.findByIdAndUpdate(envio.usuario_id, { $inc: { creditos: 1 } });

        res.json({ mensaje: "Envío eliminado y crédito reembolsado." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar envío." });
    }
});

// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});