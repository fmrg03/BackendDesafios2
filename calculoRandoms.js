process.on('message', (data) => {
    const existeNum = (numero, obj) => {
        numero = numero.toString()
        if (Object.keys(obj).find(item => item === numero)) {
            return true
        } else {
            return false
        }
    }
    let objetoNumero = {}
    for (let i = 0; i < data; i++) {
        var num = Math.floor(Math.random() * ((1000 + 1) - 1) + 1)
        if (existeNum(num, objetoNumero) === true) {
            objetoNumero[num] = objetoNumero[num] + 1
        } else {
            objetoNumero[num] = 1
        }
    }
    process.send(objetoNumero)
})