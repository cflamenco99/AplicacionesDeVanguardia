const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// CRUD para Usuarios

// Obtener todos los usuarios
const getUsuarios = async (req, res = response) => {
  try {
    const usuarios = await Usuario.find({}, 'nombre email role');
    res.json({
      ok: true,
      usuarios,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener los usuarios',
    });
  }
};

// Crear un nuevo usuario
const crearUsuario = async (req, res = response) => {
  const { nombre, email, password, role } = req.body;
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      errors: errores.array(),
    });
  }

  try {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'Email ya registrado',
      });
    }

    const usuario = new Usuario({ nombre, email, password, role });

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    res.status(201).json({
      ok: true,
      usuario,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error al crear el usuario',
    });
  }
};

// Actualizar un usuario por ID
const actualizarUsuario = async (req, res = response) => {
  const { id } = req.params;
  const { nombre, email, role } = req.body;

  try {
    const usuario = await Usuario.findByIdAndUpdate(
      id,
      { nombre, email, role },
      { new: true }
    );
    res.json({
      ok: true,
      usuario,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Error al actualizar el usuario',
    });
  }
};

// Eliminar un usuario por ID
const eliminarUsuario = async (req, res = response) => {
  const { id } = req.params;

  try {
    await Usuario.findByIdAndDelete(id);
    res.json({
      ok: true,
      msg: 'Usuario eliminado correctamente',
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Error al eliminar el usuario',
    });
  }
};

module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
}