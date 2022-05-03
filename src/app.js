const express = require('express')
const productosRouter = require('./routes/productsRouter');
const cartRouter = require('./routes/cartRouter')

const app = express();

const PORT = process.env.PORT||8080;

const server = app.listen(PORT, () => console.log((`Listening on PORT ${PORT}`)));

server.on("error", error => console.log(`Error en servidor ${error}`));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

app.use('/api/productos',productosRouter);
app.use('/api/carrito',cartRouter);

