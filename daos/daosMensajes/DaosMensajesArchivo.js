const config = require('../../config')
const ContenedorArchivo = require('../../containers/ContenedorArchivo')

const archivoMensajes = new ContenedorArchivo(config.fileSystem.path + 'mensajes.txt')

module.exports = archivoMensajes