const config = require('../../config')
const ContenedorArchivo = require('../../containers/ContenedorArchivo')

const archivoUsuarios = new ContenedorArchivo(config.fileSystem.path + 'usuarios.txt')

module.exports = archivoUsuarios