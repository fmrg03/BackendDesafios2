const config = require('../config')
const ContenedorFirebase = require('../containers/ContenedorFirebase')

const firebase = new ContenedorFirebase(config.firebase.collection)

module.exports = firebase