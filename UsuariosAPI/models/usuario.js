const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google:{
        type: Boolean,
        required: false
    }
});

UsuarioSchema.method('toJSON', function(){
    const { __v, id, ...Object } = this.Object();
    Object.uid = _id
    return Object;
})

module.exports = model ('Usuario', UsuarioSchema);