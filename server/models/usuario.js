const mongoose = require('mongoose'); 
const uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;

let rolesValidados = { //Definimos una enumeracion con los posibles valores del rol
    values:['ADMIN_ROLE', 'USER_ROLE'],
    message:'{VALUE} no es un rol valido'
};

let usuarioSchema = new Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es necesario']
    },
    email:{
        type: String,
        unique:true,
        required:[true, 'El email es unico']
    },
    password:{
        type: String,
        required:[true, 'La password es necesaria']
    },
    imagen:{
        type: String,
    },
    role:{
        type:String,
        default:'USER_ROLE',//valor por defecto
        enum: rolesValidados
    },
    estado:{
        type: Boolean,
        default:true
    },
    google:{
        type: Boolean,
        default:false
    },
});

//#region para agregar un mensaje mas amigable del error de email unico 
usuarioSchema.plugin(uniqueValidator, {message:'{PATH} debe ser unico'});

//Aca estamos exportando / publicando el modelo con un nombre que definamos nosotros 
module.exports = mongoose.model('Usuario', usuarioSchema);