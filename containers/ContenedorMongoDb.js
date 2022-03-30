const mongoose = require('mongoose')

class ContenedorMongoDb {

    constructor(url, db, collection) {
        this.url = url
        this.db = db
        this.collection = collection

        this.connect()
    }

    async connect() {
        try {
            await mongoose.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true })
            console.log(`Conectado a MongoDB: ${this.url}`)
        } catch (error) {
            throw new Error(`Error al conectar a MongoDB: ${error}`)
        }
    }

    async guardar(obj) {
        const ObjetoNuevo = { ...obj }
        try {
            const DataSaveModel = new this.collection(ObjetoNuevo)
            const save = await DataSaveModel.save()
            return save
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }
}

module.exports = ContenedorMongoDb