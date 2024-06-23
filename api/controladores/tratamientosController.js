var tratamientosModel = require('../modelos/tratamientosModel').tratamientosModel;
var tratamientosController = {}

tratamientosController.save = function(req,res){


    var post = {
        codigo:req.body.codigo,
        nombre:req.body.nombre,
        descripcion:req.body.descripcion,
        precio:req.body.precio

    };


    const camposObligatorios = ["codigo","nombre", "descripcion", "precio"];

    if(!validarObligatorios(camposObligatorios,post,res)) return false

    tratamientosModel.crear(post, function(resultado){
        if(resultado.state){
            console.log(resultado)
            res.json({state:true,mensaje:"Tratamiento creado correctamente"});
        } else{
            console.log(resultado)
            res.json({state:false,mensaje:"Error al registrar el tratamiento"});
        }

    })

}



tratamientosController.list = function(req,res){
    tratamientosModel.list(null, function(respuesta){
        res.json(respuesta)
    })
}

tratamientosController.listId = function(req,res){

    if(post._id == undefined || post._id == null || post.id == ""){
        res.json({state:false, mensaje:"el identificador es obligatorio", campo:"_id"})
    }

    var post = {
        _id: req.body._id
    }

    tratamientosModel.listId(post,function(respuesta){
        res.json(respuesta)
    })

}



tratamientosController.update = function(req,res){

    var post = {
        _id:req.body._id,
        codigo:post.codigo,
        nombre:post.nombre,
        descripcion:post.descripcion,
        precio:post.precio,
    };


    const camposObligatorios = ["_id"];

    if(!validarObligatorios(camposObligatorios,post,res)) return false

    tratamientosModel.update(post, function(respuesta){
        if(respuesta.state){
            res.json({state:true,mensaje:"Tratamiento actualizado correctamente"});
        } else{
            res.json({state:false,mensaje:"Error al actualizar la tratamiento"});
        }
    })
}

tratamientosController.delete = function(req,res){

    var post = {
        _id:req.body._id,
    };

    const camposObligatorios = ["_id"];

    if(!validarObligatorios(camposObligatorios,post,res)) return false

    tratamientosModel.listId(post, function(resultado){
            
        if(resultado.posicion != -1){


            tratamientosModel.delete(post, function(respuesta){
                if(respuesta.state){
                    res.json({state:true,mensaje:"Tratamiento eliminada correctamente"});
                } else{
                    res.json({state:false,mensaje:"Error al eliminar el tratamiento"});
                }
            })
            
        }else {
            res.json({ state:false,mensaje: 'El _id del tratamiento no es válido' });
            return false;
        }

        console.log(respuesta)
        
        
    });


    
}


validarObligatorios = function(camposObligatorios,post,res){
    for (let campo of camposObligatorios) {
        if (post[campo] === undefined || post[campo] === null || post[campo] === '') {
            res.json({ state: false, mensaje: `El campo ${campo} es obligatorio` });
            return false;
        }
    }
    return true;
}


    


module.exports.tratamientosController = tratamientosController;