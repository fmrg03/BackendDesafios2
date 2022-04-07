const config = require('../config')
const ContenedorFirebase = require('../containers/ContenedorFirebase')

const firebaseMensajes = new ContenedorFirebase(config.firebase.collectionMensajeria)

module.exports = firebaseMensajes