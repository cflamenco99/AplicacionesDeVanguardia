const { Schema, model } = require('mongoose');

const LibroSchema = Schema({
    nombreLibro: {
        type: String,
        required: true,
    },
    imagen: {
        type: String,
        required: false,
    },
    cantidad: {
        type: Number,
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    sucursal: {
        type: Schema.Types.ObjectId,
        ref: 'Sucursal',
        required: true,
    },
});

module.exports = model ('Libro', LibroSchema);