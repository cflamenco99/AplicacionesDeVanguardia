const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();



//RUTAS DE USUARIOS
const { getUsuarios, actualizarUsuario, crearUsuario, eliminarUsuario } = require('../controllers/usuario');

router.get('/usuarios', getUsuarios);
router.post('/usuarios', [
    check('nombre', 'Este campo es obligatorio').not().isEmpty(),
    check('email', 'Este campo es obligatorio').not().isEmpty(),
    check('password', 'Este campo es obligatorio').not().isEmpty(),
    check('role', 'Este campo es obligatorio').not().isEmpty()
],
crearUsuario);
router.put('/usuarios/:id', [
    check('id', 'Este campo es obligatorio').not().isEmpty()
],
actualizarUsuario);
router.delete('/usuarios/:id', [
    check('id', 'Este campo es obligatorio').not().isEmpty()
],
eliminarUsuario);



//RUTAS DE LIBROS
const { getLibros, actualizarLibro, crearLibro, eliminarLibro } = require('../controllers/libro');

router.get('/libros', getLibros);
router.post('/libros', [
    check('nombreLibro', 'Este campo es obligatorio').not().isEmpty(),
    check('cantidad', 'Este campo es obligatorio').not().isEmpty(),
    check('usuario', 'Este campo es obligatorio').not().isEmpty(),
    check('sucursal', 'Este campo es obligatorio').not().isEmpty()
],
crearLibro);
router.put('/libros/:id', [
    check('id', 'Este campo es obligatorio').not().isEmpty()
],
actualizarLibro);
router.delete('/libros/:id', [
    check('id', 'Este campo es obligatorio').not().isEmpty()
],
eliminarLibro);


//RUTAS DE SUCURSALES
const { getSucursales, crearSucursal, actualizarSucursal, eliminarSucursal } = require('../controllers/sucursal');

router.get('/sucursales', getSucursales);
router.post('/sucursales', [
    check('nombre', 'Este campo es obligatorio').not().isEmpty(),
    check('usuario', 'Este campo es obligatorio').not().isEmpty()
],
crearSucursal);
router.put('/sucursales/:id', [
    check('id', 'Este campo es obligatorio').not().isEmpty()
],
actualizarSucursal);
router.delete('/sucursales/:id', [
    check('id', 'Este campo es obligatorio').not().isEmpty()
],
eliminarSucursal);



module.exports = router;