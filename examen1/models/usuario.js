const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true,
      },
    email: {
        type: String,
        required: true,
        unique: true,
      },
    password: {
        type: String,
        required: true,
      },
    imagen: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        required: true,
        default: 'usuario',
        enum: ['admin', 'usuario'],
      },
});

UsuarioSchema.plugin(uniqueValidator);

module.exports = model ('Usuario', UsuarioSchema);