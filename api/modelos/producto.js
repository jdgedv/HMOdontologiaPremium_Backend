// cod_cat existente, 
// cod_producto: max 15, unico
// nombre: máxima es de 50 y mínima de 4

var productoModel = {}

productoModel.validaParams = function(post, callback) {
    console.log("productoModel post.cod_cat ",post.cod_cat)

    var existeCat = categorias.findIndex((item) => item.cod_cat == post.cod_cat)
    
                  
    var existeCod_producto = productos.findIndex((item) => item.cod_producto == post.cod_producto)
    if(!post.cod_cat){
        return callback({state: false, mensaje: 'el campo cod_cat es obligatorio', campo: "cod_cat",campo: "cod_cat"});
    }

    if(existeCat== -1){
        return callback({state: false, mensaje: 'el campo cod_cat es debe existir en las categorias',campo: "cod_cat"})
    }

    if(existeCod_producto != -1){
        return callback({state: false, mensaje: 'El cod_producto debe ser unico', campo: "cod_producto"});
    }

    


    if(!post.cod_producto){
        return callback({state: false, mensaje: 'el campo cod_producto es obligatorio', campo: "cod_producto"});
    }
    if(post.cod_producto && (post.cod_producto.length>15)){
        return callback({state: false, mensaje: 'el campo cod_producto debe tener minimo 15 caracteres', campo: "cod_producto"});
    }
    // if(post.cod_producto && (post.cod_producto.length<1)){
    //     return callback({state: false, mensaje: 'El código de producto tiene un máximo de 15 caracteres'});
    // }
    const regex = new RegExp(/^[a-zA-Z0-9 ]+$/);

    // Texto a validar
    const texto = post.cod_producto; // Aquí debes colocar el texto que deseas validar
console.log(texto);
    // Validar si el texto contiene solo números
    const esValido = regex.test(texto);

    if (!esValido) {
        return callback({state: false, mensaje: 'el campo cod_producto no acepta caracteres especiales', campo: "cod_producto"});
    } 
    
    if(!post.nombre){
        return callback({state: false, mensaje: 'el campo nombre es obligatorio', campo: "nombre"});
    }

    if(post.nombre.length>50){
        return callback({state: false, mensaje: 'el campo nombre debe contener maximo 50 caracteres', campo: "nombre"});
    }

    if(post.nombre.length<4){
        return callback({state: false, mensaje: 'el campo nombre debe contener minimo 4 caracteres', campo: "nombre"})
    }


    
    

    

   

    

        

    

    
    return callback({state: true});
    
}

productoModel.existeProducto = function(post, callback) {
    var existe = productos.findIndex((item) => item.nombre == post.nombre)
    if(existe== -1){
        return callback({state: false})
    }else{
        return callback({state: true})
    }

}

module.exports.productos = productoModel
