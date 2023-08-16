const { Schema, model } = require('mongoose');

const SucursalSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    imagen: {
        type: String,
        required: false,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
});

module.exports = model ('Sucursal', SucursalSchema);