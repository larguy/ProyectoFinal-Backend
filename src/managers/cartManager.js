const fs = require('fs');
/*
    producto = {
        title : String (required),
        timestamp : Date.now(), 
        price : Number (required),
        thumbnail : String (required)
    }
*/

class CartManager {
    constructor(cart) {
        this.filename = `./src/public/files/${cart}.json`
    }
    readCarts = async () =>{
        let data = await fs.promises.readFile(this.filename,'utf-8');
        let carts = JSON.parse(data);
        return carts;
    }

    save = async () =>
        {
        try{
            if(fs.existsSync(this.filename)){//El archivo existe
                let carts = await this.readCarts();
                let id = carts[carts.length-1].id+1;
                let cart = {
                    "id" : id,
                    "timestamp" : Date.now(),
                    "products" : []
                };
                carts.push(cart);
                await fs.promises.writeFile(this.filename,JSON.stringify(carts,null,2))
                return {status:"success",message: `Cart created. Cart ID : ${cart.id}`}
            }else{//El archivo no existe.
                let cart = {
                    "id" : 1,
                    "timestamp" : Date.now()
                };
                await fs.promises.writeFile(this.filename,JSON.stringify([cart],null,2));
                return {status:"success",message: `Cart created. Cart ID : ${cart.id}`}
            }
        }catch(error){
            return {status:"error",message:error}
        }
        
    }

    getAll = async () => {
        if(fs.existsSync(this.filename)){
            let products = await this.readProducts();
            return {status:"success",products:products}
        }
    }

    getById = async (id) => {
        if(!id) return {status:"error", error:"ID needed"}
        if(fs.existsSync(this.filename)){
           let carts = await this.readCarts();
           let cart = carts.find(p => p.id === id);
           if(cart) return {status:"success",cart:cart}
           else return {status:"error", error:"Product not found"}
        }
    }

    getProductsByCartId = async (id) => {
        if(!id) return {status:"error", error:"ID needed"}
        if(fs.existsSync(this.filename)){
           let carts = await this.readCarts();
           let cart = carts.find(p => p.id === id);
           if(cart) return {status:"success",products:cart.products}
           else return {status:"error", error:"Cart not found"}
        }
    }

    addProductToCartById = async (id,product) => {
        if(!id || !product) return {status:"error", error:"missing field"}
        if(fs.existsSync(this.filename)){
           let carts = await this.readCarts();
           let cart = carts.findIndex(p => p.id === id);
           carts[cart].products.push(product);
           await fs.promises.writeFile(this.filename,JSON.stringify(carts,null,2))
           return {status:"success",message: `product added to Cart ID ${carts[cart].id}`}
        }
    }

    deleteById = async (id) => {
        if(!id) return {status:"error", error:"ID needed"}
        if(fs.existsSync(this.filename)){
            let carts = await this.readCarts();
            let cart = carts.findIndex(p => p.id === id);
            cart = cart + 1;
            if(cart) {
                carts.splice(cart-1,1);
                await fs.promises.writeFile(this.filename,JSON.stringify(carts,null,2))
                return {status:"success",message:"Cart deleted"}
            }
            else return {status:"error", error:"Cart not found"}
        }
    }

    deleteProductInCartById = async (cart,product) => {
        if(!product || !cart) return {status:"error", error:"missing field"}
        if(fs.existsSync(this.filename)){
            let carts = await this.readCarts();
            let cartIndex = carts.findIndex(c => c.id === cart);
            let productIndex = carts[cartIndex].products.findIndex(p => p === product);
            if(cartIndex >= 0 || productIndex >= 0)
            {
                carts[cartIndex].products.splice(productIndex,1);
                await fs.promises.writeFile(this.filename,JSON.stringify(carts,null,2))
                return {status:"success",message:`Product ${product} inside cart ${cart} deleted`}
            }
            else return {status:"error", error:"Cart/Product not found"}
        }
    }

    deleteAll = async () => {
        await fs.promises.writeFile(this.filename,JSON.stringify([],null,2))
        return {status:"success",message:"All products deleted"}
    }
}

module.exports = CartManager;
