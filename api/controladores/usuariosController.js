var usuariosModel = require('../modelos/usuariosModel').usuariosModel;
var usuariosController = {}

usuariosController.save = function(req,res){

    const pass = sha256(req.body.clave + config.passsha256)
    var post = {
        usuario:req.body.usuario,
        clave: pass,
        nombre:req.body.nombre,
        apellidos:req.body.apellidos,
        cedula:req.body.cedula,
        correo:req.body.correo,
        telefono:req.body.telefono,
        estado:req.body.estado,
        rol:req.body.rol,
    };


    const camposObligatorios = ["usuario", "clave", "nombre", "apellidos", "cedula", "correo", "telefono"];

    validarObligatorios(camposObligatorios,post,res)


    usuariosModel.buscarUsuario(post, function(resultado){
            
        if(resultado.posicion == -1){


            usuariosModel.crear(post, function(resultado){
                if(resultado.state){
                    console.log(resultado)
                    res.json({state:true,mensaje:"Usuario creado correctamente"});
                } else{
                    console.log(resultado)
                    res.json({state:false,mensaje:"Error al registrar el usuario"});
                }
        
            })
            
        }else {
            res.json({ state:false,mensaje: 'El usuario ya existe, no se puede volver a registrar' });
            return false;
        }
        
        
    });


}


usuariosController.list = function(req,res){
    usuariosModel.list(null, function(respuesta){
        res.json(respuesta)
    })
}

usuariosController.listId = function(req,res){


    var post = {
        _id: req.body._id
    }

    if(post._id == undefined || post._id == null || post.id == ""){
        res.json({state:false, mensaje:"el campo id del usuario es obligatorio", campo:"_id"})
    }

    usuariosModel.listId(post,function(respuesta){
        res.json(respuesta)
    })

}



usuariosController.update = function(req,res){

    var post = {
        _id:req.body._id,
        clave:req.body.clave,
        nombre:req.body.nombre,
        apellidos:req.body.apellidos,
        telefono:req.body.telefono,
        estado:req.body.estado,
        rol:req.body.rol,
    };


    const camposObligatorios = ["_id"];

    validarObligatorios(camposObligatorios,post,res)

    usuariosModel.update(post, function(respuesta){
        if(respuesta.state){
            res.json({state:true,mensaje:"Usuario actualizado correctamente"});
        } else{
            res.json({state:false,mensaje:"Error al actualizar el usuario"});
        }
    })
}

usuariosController.delete = function(req,res){

    var post = {
        _id:req.body._id,
    };

    const camposObligatorios = ["_id"];

    validarObligatorios(camposObligatorios,post,res)

    usuariosModel.buscarId(post, function(resultado){
            
        if(resultado.posicion != -1){


            usuariosModel.delete(post, function(respuesta){
                if(respuesta.state){
                    res.json({state:true,mensaje:"Usuario eliminado correctamente"});
                } else{
                    res.json({state:false,mensaje:"Error al eliminar el usuario"});
                }
            })
            
        }else {
            res.json({ state:false,mensaje: 'El _id de usuario no existe' });
            return false;
        }

        console.log(respuesta)
        
        
    });


    
}

usuariosController.login = function(req,res){


    var post = {
        usuario: req.body.usuario,
        clave: req.body.clave,
    }

    const camposObligatorios = ["usuario","clave"];

    validarObligatorios(camposObligatorios,post,res)

    usuariosModel.login(post,function(respuesta){

        if(respuesta.state == true) {
            if(respuesta.data.length == 0){
                res.json({state: false, mensaje:"Error en las Credenciales de Acceso"})
            }else{
                
                req.session.nombre = respuesta.data[0].nombre
                req.session.rol = respuesta.data[0].rol
                res.json({state: true, mensaje:"Bienvenido " + respuesta.data[0].nombre})
            }
        }
    })

}


validarObligatorios = function(camposObligatorios,post,res){
    for (let campo of camposObligatorios) {
        if (post[campo] === undefined || post[campo] === null || post[campo] === '') {
            res.json({ state: false, mensaje: `El campo ${campo} es obligatorio` });
            return false;
        }
    }
}


    


module.exports.usuariosController = usuariosController;