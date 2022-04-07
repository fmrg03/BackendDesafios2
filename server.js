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
const mongoose = require('mongoose')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const cookieParser = require('cookie-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/usuario')
const bcrypt = require('bcrypt')

const messages = process.env.DB === 'mongodb' ? require('./daos/daosMensajes/DaosMensajesMongo') :
    process.env.DB === 'firebase' ? require('./daos/daosMensajes/DaosMensajesFirebase') :
        require('./daos/daosMensajes/DaosMensajesArchivo')

const products = process.env.DB === 'mongodb' ? require('./daos/daosProductos/DaosProductosMongo') :
    process.env.DB === 'firebase' ? require('./daos/daosProductos/DaosProductosFirebase') :
        require('./daos/daosProductos/DaosProductosArchivo')

const mensajes = []
const productos = []
let usuario
connect()
async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_CONN, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log(`Conectado a MongoDB: ${process.env.MONGODB_CONN}`)
    } catch (error) {
        throw new Error(`Error al conectar a MongoDB: ${error}`)
    }
}

// PASSPORT
passport.use('login', new LocalStrategy(
    (username, password, done) => {
        User.findOne({ 'username': username }, (err, user) => {
            if (err) {
                return done(err)
            }
            if (!user) {
                console.log('Usuario no encontrado')
                return done(null, false, { message: 'Incorrect username.' })
            }
            if (!isValidPassword(user, password)) {
                console.log('Contraseña incorrecta')
                return done(null, false, { message: 'Incorrect password.' })
            }
            return done(null, user)
        })
    }
))

passport.use('register', new LocalStrategy({
    passReqToCallback: true
},
    (req, username, password, done) => {
        User.findOne({ 'username': username }, (err, user) => {
            if (err) {
                console.log("error register", err)
                return done(err)
            }
            if (user) {
                console.log('Usuario ya existe')
                return done(null, false, { message: 'User already exists.' })
            }
            const newUser = {
                username: username,
                password: createHash(password)
            }
            User.create(newUser, (err, userWithId) => {
                if (err) {
                    console.log("error crear usuario", err)
                    return done(err)
                }
                console.log('Usuario creado')
                return done(null, userWithId)
            })
        })

    }
))

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, done)
})

// PASSWORD ENCRYPTION

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// PASSWORD VALIDATION

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

// MIDDLEWARE
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
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 600000
    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.engine(
    'hbs',
    handlerbars.engine({
        extname: 'hbs',
        defaultLayout: 'index.hbs',
    })
)

app.set('view engine', 'hbs')
app.set('views', 'views')

const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}

///// END POINTS
// LOGIN
app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', passport.authenticate('login', { failureRedirect: '/fail-login' }), (req, res) => {
    const { username } = req.body
    req.session.usuario = username
    res.redirect('/')
})

app.get('/fail-login', (req, res) => {
    res.render('fail-login')
})

// LOGOUT
app.get('/logout', (req, res) => {
    const usuarioFinal = { username: req.session.usuario, logout: true }
    req.session.destroy()
    usuario = undefined
    res.render('logout', usuarioFinal)
})

// REGISTRO - SINGUP
app.get('/registro', (req, res) => {
    res.render('registro')
})
app.post('/registro', passport.authenticate('register', { failureRedirect: '/fail-register', successRedirect: '/login' }), (req, res) => {
    console.log(req.body)
})

app.get('/fail-register', (req, res) => {
    res.render('fail-register')
})

// GENERAL
app.get('/datos', isAuth, (req, res) => {
    const cantidad = productos.length
    res.render('main', { productos, cantidad, username: req.session.usuario })
})

app.get('/', isAuth, (req, res) => {
    res.redirect('/datos')
})

// SOCKET

io.on('connection', (socket) => {
    io.sockets.emit('mensajes', mensajes)
    socket.on('mensaje', data => {
        const hoy = new Date()
        const fecha = `${hoy.getDate()}/${hoy.getMonth() + 1}/${hoy.getFullYear()}`
        const hora = `${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`
        const mensaje = { ...data, fecha, hora }
        mensajes.push(mensaje)
        io.sockets.emit('mensajes', mensajes)
        messages.guardar(mensaje)
    })

    socket.on('producto', data => {
        productos.push(data)
        products.guardar(data)
        io.sockets.emit('productos', productos)
    })
})

const PORT = 3000 || process.env.PORT
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`)
})
server.on("error", (error) => console.log(error))