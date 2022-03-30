const config = require('./../config')
const ContenedorMongo = require('../containers/ContenedorMongoDb')
const mensaje = require('../models/mensaje')

const mongo = new ContenedorMongo(config.mongoDb.cnxStr, config.mongoDb.db, mensaje)

module.exports = mongo