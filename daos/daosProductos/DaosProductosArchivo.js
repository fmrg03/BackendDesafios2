const config = require('../../config')
const ContenedorArchivo = require('../../containers/ContenedorArchivo')

const archivoProductos = new ContenedorArchivo(config.fileSystem.path + 'productos.txt')

module.exports = archivoProductos