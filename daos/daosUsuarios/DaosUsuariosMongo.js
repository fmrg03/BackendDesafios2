const config = require('../../config')
const ContenedorMongo = require('../../containers/ContenedorMongoDb')
const usuario = require('../../models/usuario')

const mongoUsuarios = new ContenedorMongo(config.mongoDb.cnxStr, config.mongoDb.collectionUsuarios, usuario)

module.exports = mongoUsuarios