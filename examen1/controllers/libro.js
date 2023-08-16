const { response } = require('express');
const Libro = require('../models/libro');
const { validationResult } = require('express-validator');

// CRUD para Libros

// Obtener todos los libros
const getLibros = async (req, res = response) => {
  try {
    const libros = await Libro.find();
    res.json({
      ok: true,
      libros,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener los libros',
    });
  }
};

// Crear un nuevo libro
const crearLibro = async (req, res = response) => {
  const { nombreLibro, cantidad, usuario, sucursal } = req.body;
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      errors: errores.array(),
    });
  }

  try {
    const nuevoLibro = new Libro({ nombreLibro, cantidad, usuario, sucursal });
    await nuevoLibro.save();

    res.status(201).json({
      ok: true,
      libro: nuevoLibro,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error al crear el libro',
    });
  }
};

// Actualizar un libro por ID
const actualizarLibro = async (req, res = response) => {
  const { id } = req.params;
  const { nombreLibro, cantidad } = req.body;

  try {
    const libro = await Libro.findByIdAndUpdate(
      id,
      { nombreLibro, cantidad },
      { new: true }
    );
    res.json({
      ok: true,
      libro,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Error al actualizar el libro',
    });
  }
};

// Eliminar un libro por ID
const eliminarLibro = async (req, res = response) => {
  const { id } = req.params;

  try {
    await Libro.findByIdAndDelete(id);
    res.json({
      ok: true,
      msg: 'Libro eliminado correctamente',
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Error al eliminar el libro',
    });
  }
};

module.exports = {
  getLibros,
  crearLibro,
  actualizarLibro,
  eliminarLibro
}