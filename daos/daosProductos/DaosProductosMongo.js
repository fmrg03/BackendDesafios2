const config = require('../../config')
const ContenedorMongo = require('../../containers/ContenedorMongoDb')
const producto = require('../../models/producto')

const mongoProductos = new ContenedorMongo(config.mongoDb.cnxStr, config.mongoDb.collectionProductos, producto)

module.exports = mongoProductos