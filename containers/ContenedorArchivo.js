const { promises: fs } = require('fs')

class ContenedorArchivo {

    constructor(ruta) {
        this.ruta = ruta
    }

    async leer(id) {
        let data = await fs.readFile(this.ruta, { encoding: 'utf-8', flag: 'as+' })
        if (data == "") {
            data = []
        } else {
            data = JSON.parse(data)
        }
        return data
        // if (id != undefined) {
        //     const dataBuscada = data.find(obj => obj.id == id)
        //     return dataBuscada
        // } else { return data }
    }

    async guardar(obj) {
        const data = await this.leer()
        // let idNuevo
        // if (data.length == 0) {
        //     idNuevo = 1
        // } else {
        //     idNuevo = data[data.length - 1].id + 1
        // }
        const ObjetoNuevo = { ...obj}
        data.push(ObjetoNuevo)
        await this.soloGuardar(data)
        return ObjetoNuevo
    }

    async soloGuardar(data) {
        try {
            await fs.writeFile(this.ruta, JSON.stringify(data, null, 2))
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

}

module.exports = ContenedorArchivo