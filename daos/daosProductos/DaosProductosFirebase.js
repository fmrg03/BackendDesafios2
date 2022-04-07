const config = require('../config')
const ContenedorFirebase = require('../containers/ContenedorFirebase')

const firebaseProductos = new ContenedorFirebase(config.firebase.collectionProductos)

module.exports = firebaseProductos