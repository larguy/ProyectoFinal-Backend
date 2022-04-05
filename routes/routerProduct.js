const express = require('express')
const app = require('../index')
const productosRouter = express.Router()

const productos = []

productosRouter.use(express.urlencoded({ extended: true }))
productosRouter.use(express.json())


// Aspectos a incluir en el entregable: 
// El router base '/api/productos' implementará cuatro funcionalidades:
// GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
// POST: '/' - Para incorporar productos al listado (disponible para administradores)
// PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
// DELETE: '/:id' - Borra un producto por su id (disponible para administradores)



productosRouter.get('/:id', (req, res) => {

    if(isNaN(req.params.id)){
        res.json({error : 'producto no encontrado' })
    }
    else if( req.params.id > productos.length) {
        res.json({error : 'producto no existe' })
    }
    else{
        res.json(productos[req.params.id - 1])
    }    
})

productosRouter.put('/:id', (req, res) => {
    if(isNaN(req.params.id)){
        res.json({error : 'producto no encontrado' })
    }
    else if( req.params.id > productos.length) {
        res.json({error : 'producto no existe' })
    }
    else{
        productos.splice(req.params.id -1, 1,req.body)
        res.json({
            message: 'se moficico el productos'
        })
    }
})
    
productosRouter.post('/', (req, res) => {
        productos.push(req.body)
        aux = productos.length
        productos[aux-1].id = aux
        res.json({message: 'se agrego el nuevo producto'})
})

productosRouter.delete('/:id', (req, res) => {
    productos.splice(req.params.id -1, 1)
    res.send( 'se borro el productos ')
})

productosRouter.get('/', (req,res) => {
    res.render('datos',productos)   
})


module.exports = productosRouter