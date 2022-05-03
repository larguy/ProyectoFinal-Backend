const express = require('express');
const productManager = require('../managers/ProductManager')
const isAdmin = require('../middleware/validator')

const products = new productManager('products');

const router = express.Router();

const admin = true;

router.get('/', (req,res) =>{
    const allProducts = products.getAll().then((data) => res.send(data));
})

router.get('/:id', (req,res) =>{
    let params = req.params;
    params = parseInt(params.id)
    const allProducts = products.getById(params).then((data) => res.send(data));
})

router.post('/', isAdmin(admin), (req,res) => {
    const producto = req.body;
    const product = products.save(producto).then((data) => res.send(data));
})

router.put('/:id', isAdmin(admin), (req,res) => {
    const producto = req.body;
    let id= req.params;
    id = parseInt(id.id)
    const updateProduct = products.updateById(id,producto).then((data) => res.send(data));
})

router.delete('/:id', isAdmin(admin), (req,res) => {
    let params = req.params;
    params = parseInt(params.id)
    const allProducts = products.deleteById(params).then((data) => res.send(data));
})

module.exports = router;