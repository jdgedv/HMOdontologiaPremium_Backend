productoModel = require('../modelos/producto').productos;
var productosController = {}

productosController.getProductos = function(res){
    res.json({ resultado: productos });
}

productosController.saveProducto = function(req,res){

    const producto = {'cod_prod':req.body.cod_producto,'estado':req.body.estado,'nombre':req.body.nombre};

    


    
    productoModel.validaParams(producto, function(result){
        if(result.state){
        productoModel.buscarCodigo(producto, function(resultado){
            
                if(resultado.state){
                    {
                        if(resultado.posicion != -1){
                            res.json({ mensaje: 'El producto ya existe, no se puede volver a registrar' });
                            return false;
                        }else{
                            //productos.push(producto);
                            productoModel.crear(producto, function(resultado){
                                if(resultado.state){
                                    console.log(resultado)
                                    res.json({ mensaje:resultado.mensaje });
                                } 
                        
                            })
                            return false;
                        }
                        
                    }
                }else {
                    res.json({ mensaje:resultado.mensaje });
                    return false;
                }
                
                
            });
        }else {
            res.json({ mensaje:result.mensaje });
            return false;
        }
    });
}



module.exports.productos = productosController;