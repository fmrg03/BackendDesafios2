const config = require('../../config')
const ContenedorMongo = require('../../containers/ContenedorMongoDb')
const mensaje = require('../../models/mensaje')

const mongoMensajes = new ContenedorMongo(config.mongoDb.cnxStr, config.mongoDb.dbMensajeria, mensaje)

module.exports = mongoMensajes