const config = require('./../config')
const ContenedorArchivo = require('../containers/ContenedorArchivo')

const archivo = new ContenedorArchivo(config.fileSystem.path + 'mensajes.txt')

module.exports = archivo