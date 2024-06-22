
var citasModel = {}

const mongoose = require("mongoose");

const Schema = mongoose.Schema

const citaSchema = new Schema({
    id_ciudad: {
        type: Schema.Types.ObjectId,
        ref: 'Ciudad',
        required: true
    },
    id_depto: {
        type: Schema.Types.ObjectId,
        ref: 'Departamento',
        required: true
    },
    id_usuarioCliente: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    id_tratamiento: {
        type: Schema.Types.ObjectId,
        ref: 'Tratamiento',
        required: true
    },
    fechayhora: {
        type: Date,
        required: true
    }
});




const myModel = mongoose.model('citas',citaSchema)


citasModel.crear = function(post, callback) {
    const instancia = new myModel
    instancia.id_ciudad=post.id_ciudad
    instancia.id_depto=post.id_depto
    instancia.id_usuarioCliente=post.id_usuarioCliente
    instancia.id_tratamiento=post.id_tratamiento
    instancia.fechayhora=post.fechayhora

    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({state : true})
    }).catch((error)=>{
        console.log(error)
        return callback({state: false, mensaje: error})
    })
}


citasModel.buscarCitasCliente = function(post, callback) { //validar tambien cedula y correo

    myModel.find({id_usuarioCliente:post.id_usuarioCliente},{_id:1}).then(
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

citasModel.list = function(post, callback){
    myModel.find({},{}).then((respuesta) => {
        return callback({state:true, data:respuesta})
    })
}

citasModel.listRefurbished = function(post, callback){
    myModel.find({})
        .populate('id_ciudad', 'nombre_ciudad')
        .populate('id_depto', 'nombre_depto')
        .then((respuesta) => {
            // Transformar la respuesta para incluir solo los nombres
            const citasTransformadas = respuesta.map(cita => {
                return {
                    ...cita.toObject(),
                    nombre_ciudad: cita.id_ciudad.nombre_ciudad,
                    nombre_depto: cita.id_depto.nombre_depto
                };
            });
            return callback({state: true, data: citasTransformadas});
        })
        .catch(error => {
            return callback({state: false, error: error.message});
        });
}

citasModel.listId = function(post, callback){
    myModel.find({_id:post._id},{}).then((respuesta) => {
        return callback({ state: true, data: respuesta })
    })
}



citasModel.update = function(post, callback){
    console.log("---------------------update-------------")
    myModel.updateOne({_id:post._id},{
        id_ciudad:post.id_ciudad,
        id_depto:post.id_depto,
        id_usuarioCliente:post.id_usuarioCliente,
        id_tratamiento:post.id_tratamiento,
        fechayhora:post.fechayhora,

    }).then((respuesta) => {
        console.log(respuesta)
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false, mensaje: error })
    })
}



citasModel.delete = function(post, callback){
    console.log("---------------------delete-------------")
    myModel.deleteOne({_id:post._id}).then((respuesta) => {
        console.log(respuesta)
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false, mensaje: error })
    })
}


module.exports.citasModel = citasModel