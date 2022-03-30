const express = require('express')
const app = express()
require('dotenv').config()
const handlerbars = require('express-handlebars')
const { Server: IOServer } = require('socket.io')
const { Server: HttpServer } = require('http')
const server = new HttpServer(app)
const io = new IOServer(server)
const session = require('express-session')
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const cookieParser = require('cookie-parser')

const mensajeria = process.env.DB === 'mongodb' ? require('./daos/DaosMongo') :
    process.env.DB === 'firebase' ? require('./daos/DaosFirebase') :
        require('./daos/DaosArchivo')

const mensajes = []
let usuario


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://froilan:fjmca.03@session.nfyy8.mongodb.net/session?retryWrites=true&w=majority',
        mongoOptions: advancedOptions
    }),
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
}))

app.engine(
    'hbs',
    handlerbars.engine({
        extname: 'hbs',
        defaultLayout: 'index.hbs',
    })
)

app.set('view engine', 'hbs')
app.set('views', 'views')

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/logout', (req, res) => {
    const usuarioFinal = { ...req.session.usuario, logout: true }
    req.session.destroy()
    usuario = undefined
    res.render('logout', usuarioFinal)
})

app.get('/', (req, res) => {
    console.log(req.sessionID)
    if (!req.session.usuario && usuario !== undefined) {
        req.session.usuario = usuario
    }
    res.render('main', req.session.usuario)
})

io.on('connection', (socket) => {
    io.sockets.emit('mensajes', mensajes)
    socket.on('mensaje', data => {
        const hoy = new Date()
        const fecha = `${hoy.getDate()}/${hoy.getMonth() + 1}/${hoy.getFullYear()}`
        const hora = `${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`
        const mensaje = { ...data, fecha, hora }
        mensajes.push(mensaje)
        io.sockets.emit('mensajes', mensajes)
        mensajeria.guardar(mensaje)
    })
    socket.on('usuario', data => {
        usuario = data
    })
})

const PORT = 3000 || process.env.PORT
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`)
})
server.on("error", (error) => console.log(error))