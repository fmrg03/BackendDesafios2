const socket = io.connect()

const producto = document.querySelector('#producto')
const precio = document.querySelector('#precio')
const imagen = document.querySelector('#image')
const nombre = document.querySelector('#nombre')
const apellido = document.querySelector('#apellido')
const edad = document.querySelector('#edad')
const alias = document.querySelector('#alias')
const email = document.querySelector('#email')
const avatar = document.querySelector('#avatar')
const mensaje = document.querySelector('#mensaje')

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

document.querySelector('#btnProductos').addEventListener('click', (e) => {
    e.preventDefault()
    if (producto.value && precio.value && imagen.value) {
        socket.emit('producto', { producto: producto.value, precio: precio.value, imagen: imagen.value })
    }
})

socket.on('productos', productos => {
    fetch(`productos.hbs`)
        .then(res => res.text())
        .then(data => {
            const template = Handlebars.compile(data)
            const objetoProductos = {
                productos: productos,
                cantidad: productos.length
            }
            const html = template(objetoProductos)
            document.querySelector('#productos').innerHTML = html
        })
        .catch(err => console.log(err))
})