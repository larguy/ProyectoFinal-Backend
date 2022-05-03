const fs = require('fs');

/*
    producto = {
        title : String (required),
        timestamp : Date.now(), 
        price : Number (required),
        thumbnail : String (required)
    }
*/

class ProductManager {
    constructor(product) {
        this.filename = `./src/public/files/${product}.json`
    }
    readProducts = async () => {
        let data = await fs.promises.readFile(this.filename,'utf-8');
        let products = JSON.parse(data);
        return products;
    }

    save = async (producto) => {
        // Valido que el producto venga con todos los campos.
        if(!producto.title || !producto.description || !producto.code || !producto.stock || !producto.price || !producto.thumbnail) return {status:"error", error:"missing field"}
        try{
            if(fs.existsSync(this.filename)){//El archivo existe
                let products = await this.readProducts();
                let id = products[products.length-1].id+1;
                producto.id = id;
                producto.timestamp = Date.now();
                products.push(producto);
                await fs.promises.writeFile(this.filename,JSON.stringify(products,null,2))
                return {status:"success",message:"Product created"}
            }else{//El archivo no existe.
                producto.id = 1;
                await fs.promises.writeFile(this.filename,JSON.stringify([producto],null,2));
                return {status:"success",message:"Product created"}
            }
        }catch(error){
            return {status:"error",message:error}
        }
        
    }

    getAll = async () => {
        if(fs.existsSync(this.filename)){
            let products = await this.readProducts();
            return {status:"success",products:products}
        }else{
            return {status:"Error",error:"File does not exist."}
        }
    }

    getById = async (id) => {
        if(!id) return {status:"error", error:"ID needed"}
        if(fs.existsSync(this.filename)){
           let products = await this.readProducts();
           let product = products.find(p => p.id === id);
           if(product) return {status:"success",product:product}
           else return {status:"error", error:"Product not found"}
        }
    }

    deleteById = async (id) => {
        if(!id) return {status:"error", error:"ID needed"}
        if(fs.existsSync(this.filename)){
            let products = await this.readProducts();
            let product = products.find(p => p.id === id);
            if(product) {
                products.splice(product.id-1,1);
                await fs.promises.writeFile(this.filename,JSON.stringify(products,null,2))
                return {status:"success",message:"Product deleted"}
            }
            else return {status:"error", error:"Product not found"}
        }
    }

    updateById = async (id,producto) => {
        if(!producto.title || !producto.description || !producto.code || !producto.stock || !producto.price || !producto.thumbnail) return {status:"error", error:"missing field"}
        if(fs.existsSync(this.filename)){
            let products = await this.readProducts();
            let product = products.findIndex(p => p.id === id);
            if(product) {
                products[product].title = producto.title;
                products[product].price = producto.price;
                products[product].code = producto.code;
                products[product].description = producto.description;
                products[product].stock = producto.stock;
                products[product].thumbnail = producto.thumbnail;
                await fs.promises.writeFile(this.filename,JSON.stringify(products,null,2))
                return {status:"success",message:"Product Modified"}
            }
            else return {status:"error", error:"Product not found"}
        }
    }
}

module.exports = ProductManager;
