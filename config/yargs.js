const argv = require('yargs')
    .option('p', {
        alias: 'port',
        type: 'number',
        default: 8080,
        describe: 'El puerto donde se desea correr la app'
    })
    .check((argv, options) => {
        if (isNaN(argv.p)) {
            throw new Error(`El valor introducido no es un numero`)
        }
        return true
    })
    .argv

module.exports = argv