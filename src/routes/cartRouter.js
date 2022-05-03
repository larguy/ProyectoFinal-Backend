const express = require('express');
const cartManager = require('../managers/cartManager')


const carts = new cartManager('carts');

const router = express.Router();

router.post('/', (req,res) => {
    const cart = carts.save().then((data) => res.send(data));
})

router.delete('/:id', (req,res) => {
    let id= req.params;
    id = parseInt(id.id)
    const cart = carts.deleteById(id).then((data) => res.send(data));
})

router.get('/:id/products', (req,res) =>{
    let id= req.params;
    id = parseInt(id.id);
    const allProductsInCart = carts.getProductsByCartId(id).then((data) => res.send(data));
})

router.post('/:id/products', (req,res) => {
    let producto = req.body;
    producto = parseInt(producto.product);
    let id= req.params;
    id = parseInt(id.id);
    const addProductToCartById = carts.addProductToCartById(id,producto).then((data) => res.send(data));
})

router.delete('/:id/products/:idProd', (req,res) => {
    let cart = req.params.id;
    let product = req.params.idProd;
    cart = parseInt(cart);
    product = parseInt(product);
    const deleteProductInCartById = carts.deleteProductInCartById(cart,product).then((data) => res.send(data));
})

module.exports = router;