
var usuariosModel = {}

const mongoose = require("mongoose");

const Schema = mongoose.Schema

const usuariosSchema = new Schema({
    usuario: {
        type: String,
        required: true
    },
    clave: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String
    },
    cedula: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    telefono: {
        type: String
    },
    direccion: {
        type: String
    },
    imagen: {
        type: String
    },
    estado: {
        type: Number
    },
    codigoact: {
        type: String
    },
    rol: {
        type: Number
    }
});

const myModel = mongoose.model('usuarios',usuariosSchema)

usuariosModel.buscarUsuario = function(post, callback) { //validar tambien cedula y correo

    myModel.find({usuario:post.usuario},{usuario:1,_id:0}).then(
        (respuesta) => {
        console.log("find: ",respuesta)

        if(respuesta.length == 0){
            return callback({state: true,posicion : -1});
        }else {
            return callback({state: true,posicion : respuesta.length});

        }
    }).catch((err) => {
        return callback({state: false, mensaje: err,posicion : 0 });

    })
    
}

usuariosModel.buscarCorreo = function(post, callback) { //validar tambien cedula y correo
console.log(post)
    myModel.find({correo:post.correo},{correo:1,_id:0}).then(
        (respuesta) => {
        console.log("findCorreo: ",respuesta)

        if(respuesta.length == 0){
            return callback({state: true,posicion : -1});
        }else {
            return callback({state: true,posicion : respuesta.length});

        }
    }).catch((err) => {
        return callback({state: false, mensaje: err,posicion : 0 });

    })
    
}

usuariosModel.login = function(post, callback) { 

    myModel.find({usuario:post.usuario,clave:post.clave},{ nombre:1, rol:1, estado:1 }).then(
        (respuesta) => {
        console.log("find: ",respuesta)
        return callback({state: true,data: respuesta});

    }).catch((err) => {
        return callback({state: false, mensaje: err });

    })
    
}

usuariosModel.buscarId = function(post, callback) { 

    myModel.find({_id:post._id},{usuario:1,_id:0}).then(
        (respuesta) => {
        console.log("find: ",respuesta)

        if(respuesta.length == 0){
            return callback({state: true,posicion : -1});
        }else {
            return callback({state: true,posicion : respuesta.length});

        }
    }).catch((err) => {
        return callback({state: false, mensaje: err,posicion : 0 });

    })
    
}


usuariosModel.list = function(post, callback){
    myModel.find({},{}).then((respuesta) => {
        return callback({state:true, data:respuesta})
    })
}

usuariosModel.listId = function(post, callback){
    myModel.find({_id:post._id},{}).then((respuesta) => {
        return callback({ state: true, data: respuesta })
    })
}

usuariosModel.crear = function(post, callback) {
    const instancia = new myModel
    instancia.usuario=post.usuario
    instancia.clave=post.clave
    instancia.nombre=post.nombre
    instancia.apellidos=post.apellidos
    instancia.cedula=post.cedula
    instancia.correo=post.correo
    instancia.telefono=post.telefono
    instancia.estado=0
    instancia.codigoact=post.azar
    instancia.rol=post.rol
    instancia.direccion=post.direccion
    instancia.imagen=post.imagen
   
    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({state : true})
    }).catch((error)=>{
        console.log(error)
        return callback({state: false, mensaje: error})
    })
}

usuariosModel.update = function(post, callback){
    console.log("---------------------update-------------")
    myModel.updateOne({_id:post._id},{
        nombre:post.nombre,
        apellidos:post.apellidos,
        correo:post.correo,
        telefono:post.telefono,
        clave:post.clave,
        estado:post.estado,
        rol:post.rol,
    }).then((respuesta) => {
        console.log(respuesta)
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false, mensaje: error })
    })
}

usuariosModel.activar = function(post, callback){
    console.log("---------------------activar-------------")
    myModel.updateOne({correo:post.correo,codigoact:post.codigoact},{
        estado:1,
    }).then((respuesta) => {
        return callback({ state: true, respuesta:respuesta })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false, mensaje: error })
    })
}


usuariosModel.delete = function(post, callback){
    console.log("---------------------delete-------------")
    myModel.deleteOne({_id:post._id}).then((respuesta) => {
        console.log(respuesta)
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false, mensaje: error })
    })
}


module.exports.usuariosModel = usuariosModel