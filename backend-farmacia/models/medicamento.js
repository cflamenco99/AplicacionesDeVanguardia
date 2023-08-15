const { Schema, model } = require('mongoose');

const MedicamentoSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    cantidad:{
        type: Number,
        required: true
    }
});

MedicamentoSchema.method('toJSON', function(){
    const { __v, id, ...Object } = this.Object();
    Object.uid = _id
    return Object;
})

module.exports = model ('Medicamento', MedicamentoSchema);