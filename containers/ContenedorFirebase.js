const firebase = require('firebase-admin')
const serviceAccount = require('./../DB/Firebase/mensajeria-e5c23-firebase-adminsdk-dz90u-bbde31854c.json')

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
})

class ContenedorFirebase {
    constructor(collection) {
        this.collection = collection
        this.db = firebase.firestore()

        this.connect()
    }

    async connect() {
        try {
            await firebase.firestore()
            console.log('Conectado a Firebase')
        } catch (error) {
            throw new Error(`Error al conectar a Firebase: ${error}`)
        }
    }

    async guardar(obj) {
        const ObjetoNuevo = { ...obj }
        const datos = await this.db.collection(this.collection).get()
        let docs = datos.docs
        let idNuevo = 1
        if (docs.length == 0) {
            idNuevo = 1
        }
        else {
            idNuevo = parseInt(docs[docs.length - 1].id) + 1
        }
        try {
            const doc = this.db.collection(this.collection).doc(`${idNuevo}`)
            const save = await doc.create(ObjetoNuevo)
            return save
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }


}

module.exports = ContenedorFirebase