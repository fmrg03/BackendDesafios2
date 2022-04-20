const config = require('../config')
const ContenedorFirebase = require('../containers/ContenedorFirebase')

const firebaseUsuarios = new ContenedorFirebase(config.firebase.collectionUsuarios)

module.exports = firebaseUsuarios