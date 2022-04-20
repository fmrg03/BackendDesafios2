const { Router } = require('express')
const { fork } = require('child_process')

const randoms = new Router()

randoms.get('/', (req, res) => {
    let cant
    if (req.query.cant) {
        cant = req.query.cant
    } else {
        cant = '100000000'
    }
    console.log(cant)
    const calculo = fork('./calculoRandoms.js')
    calculo.send(cant)
    calculo.on('message', (data) => {
        res.send(data)
    })
})


module.exports = randoms