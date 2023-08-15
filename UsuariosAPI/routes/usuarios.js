const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios, crearUsuario } = require('../controllers/usuarios');

const router = Router();

router.get('/', getUsuarios);
router.post('/', [
    check('nombre', 'Este campo es obligatorio').not().isEmpty(),
    check('password', 'Este campo es obligatorio').not().isEmpty(),
    check('email', 'Este campo es obligatorio').not().isEmpty()
],
crearUsuario);

module.exports = router;