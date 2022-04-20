const mongoose = require('mongoose')

const productoCollection = 'productos'

const productoSchema = new mongoose.Schema({
    producto: { type: String, required: true },
    precio: { type: Number, required: true },
    imagen: { type: String, required: true }
})

module.exports = mongoose.model(productoCollection, productoSchema)