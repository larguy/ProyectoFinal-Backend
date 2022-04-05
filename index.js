const fs = require('fs');
const express = require('express')
const PORT = 8080
const { Server : IOServer } = require('socket.io')
const {Server: HTTPServer} = require('http')

const app = express()
const httpServer = new HTTPServer(app)

const productsRouter = require('./routes/routerProduct');
const cartRouter = require('./routes/routerCart');
app.use('/api/productos', productsRouter)
app.use('/api/carrito', cartRouter)

app.use(express.static('public'))

httpServer.listen(PORT, () => console.log  ('servidor corriendo en el puerto 8080'))

module.exports = app