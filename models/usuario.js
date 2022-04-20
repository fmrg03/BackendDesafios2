const mongoose = require('mongoose')

const usuarioCollection = 'usuarios'

const usuarioSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: false },
})

module.exports = mongoose.model(usuarioCollection, usuarioSchema)