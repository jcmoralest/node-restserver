const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');
let rolesValidos={
    values: ['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}
let Schema = mongoose.Schema;
let usuarioSchema = new Schema({
    nombre:{
        type: String,
        required:[true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required:[true, 'El Correo es necesario']
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img:{
        type: String
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }

});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin( uniquevalidator, { message: '{PATH} debe de ser unico.'});

module.exports = mongoose.model('Usuarios', usuarioSchema);