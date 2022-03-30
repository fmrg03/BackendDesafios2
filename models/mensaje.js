const mongoose = require('mongoose')

const mensajeCollection = 'mensajeria'

const mensajeSchema = new mongoose.Schema({
    author: {
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        edad: { type: Number, required: true },
        alias: { type: String, required: true },
        avatar: { type: String, required: true }
    },
    mensaje: { type: String, required: true },
    fecha: { type: String, required: true },
    hora: { type: String, required: true },
})



module.exports = mongoose.model(mensajeCollection, mensajeSchema)