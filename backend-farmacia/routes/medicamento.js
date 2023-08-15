const { Router } = require('express');
const { check } = require('express-validator');

const { getMedicamentos, actualizarMedicamento, crearMedicamento, eliminarMedicamento } = require('../controllers/medicamento');

const router = Router();

router.get('/medicamentos', getMedicamentos);

router.post('/medicamentos', [
    check('nombre', 'Este campo es obligatorio').not().isEmpty(),
    check('cantidad', 'Este campo es obligatorio').not().isEmpty()
],
crearMedicamento);

router.put('/medicamentos/:id', [
    check('id', 'Este campo es obligatorio').not().isEmpty()
],
actualizarMedicamento);

router.delete('/medicamentos/:id', [
    check('id', 'Este campo es obligatorio').not().isEmpty()
],
eliminarMedicamento);

module.exports = router;