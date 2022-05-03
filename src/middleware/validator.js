const isAdmin = (admin) => {
    return (req, res, next) => {
        if(admin === true){
            next();
        }else{
            res.send({status:"error",error: `ruta /api/productos${req.url} método ${req.method} no autorizado`})
        }
    }
}

module.exports = isAdmin