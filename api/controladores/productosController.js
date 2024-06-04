productoModel = require('../modelos/producto').productos;
var productosController = {}

productosController.getProductos = function(res){
    res.json({ state:true,data: productos });
}

productosController.saveProducto = function(req,res){

    const producto = {'cod_cat':req.body.cod_cat,'cod_producto':req.body.cod_producto,'nombre':req.body.nombre};


    productoModel.existeProducto(producto, function(resultado){

        productoModel.validaParams(producto, function(result){
            if(!result.state) {
                res.json(result);
                return false;
            }else{
                producto.cod_cat = Number(producto.cod_cat);
                productos.push(producto);
                
                res.json({ state: true, mensaje:"El Producto se almaceno correctamente" });
                return false;
            }
            
        });
        
    });


}


module.exports.productos = productosController;