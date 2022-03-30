const socket = io.connect()

const nombre = document.querySelector('#nombre')
const apellido = document.querySelector('#apellido')
const edad = document.querySelector('#edad')
const alias = document.querySelector('#alias')
const email = document.querySelector('#email')
const avatar = document.querySelector('#avatar')
const mensaje = document.querySelector('#mensaje')
const user = document.querySelector('#login')

if (document.querySelector('#btnChat')) {
    document.querySelector('#btnChat').addEventListener('click', () => {
        if ((nombre.value && apellido.value && edad.value && alias.value && avatar.value && email.value && mensaje.value) !== '') {
            socket.emit('mensaje', {
                author: {
                    id: email.value,
                    nombre: nombre.value,
                    apellido: apellido.value,
                    edad: edad.value,
                    alias: alias.value,
                    avatar: avatar.value
                },
                mensaje: mensaje.value
            })
        }
    })

    socket.on('mensajes', msjs => {
        const mensajesHTML = msjs
            .map(msj => `<li><span class="emailText">${msj.author.id}</span> <span class="dateText">[${msj.fecha} ${msj.hora}] </span> <span class="messageText">: ${msj.mensaje}</span> </span><span class="messageText"> <img src="${msj.author.avatar}" width="50x50" class="img-fluid" /></span></li>`)
            .join('<br>')
        document.querySelector('#parrafoChat').innerHTML = mensajesHTML
    })
}
if (document.querySelector('#btnLogin')) {
    document.querySelector('#btnLogin').addEventListener('click', () => {
        if (user.value) {
            socket.emit('usuario', {
                usuario: user.value
            })
        }
    })
}