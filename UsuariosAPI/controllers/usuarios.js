const { response } = require('express');
const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');

const getUsuarios = async (req, res = response) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.status(200).json({
        ok: true,
        usuarios
    })
}

const crearUsuario = async (req, res = response) => {

    const { email, password, nombre } = req.body
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({
            errors: errores.mapped()
        });
    }

    try {
        const existeEmail = await Usuario.findOne({ email });
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'Email ya registrado!!!'
            });
        }

        const usuario = new Usuario(req.body);
        await usuario.save();

        res.status(200).json({
            ok: true,
            usuario
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'error al registrar usuario'
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario
}