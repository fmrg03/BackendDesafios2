require('dotenv').config()

const config = {
    PORT: process.env.PORT || 8080,
    mongoDb: {
        client: 'mongodb',
        cnxStr: process.env.MONGODB_CONN,
        db: 'mensajeria',

    },
    firebase: {
        client: 'fibrebase',
        collection: 'mensajeria'
    },
    fileSystem: {
        path: './outputs/'
    }
}

module.exports = config