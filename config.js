require('dotenv').config()

const config = {
    PORT: process.env.PORT || 8080,
    mongoDb: {
        client: 'mongodb',
        cnxStr: process.env.MONGODB_CONN,
        dbMensajeria: 'mensajeria',
        dbProductos: 'productos',
        dbUsuarios: 'usuarios'
    },
    firebase: {
        client: 'fibrebase',
        collectionMensajeria: 'mensajeria',
        collectionProductos: 'productos',
        collectionUsuarios: 'usuarios'
    },
    fileSystem: {
        path: './outputs/'
    }
}

module.exports = config