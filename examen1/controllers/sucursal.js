const { response } = require('express');
const Sucursal = require('../models/sucursal');
const { validationResult } = require('express-validator');

// CRUD para Sucursales

// Obtener todas las sucursales
const getSucursales = async (req, res = response) => {
  try {
    const sucursales = await Sucursal.find();
    res.json({
      ok: true,
      sucursales,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener las sucursales',
    });
  }
};

// Crear una nueva sucursal
const crearSucursal = async (req, res = response) => {
  const { nombre, usuario } = req.body;
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      errors: errores.array(),
    });
  }

  try {
    const nuevaSucursal = new Sucursal({ nombre, usuario });
    await nuevaSucursal.save();

    res.status(201).json({
      ok: true,
      sucursal: nuevaSucursal,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error al crear la sucursal',
    });
  }
};

// Actualizar una sucursal por ID
const actualizarSucursal = async (req, res = response) => {
  const { id } = req.params;
  const { nombre } = req.body;

  try {
    const sucursal = await Sucursal.findByIdAndUpdate(
      id,
      { nombre },
      { new: true }
    );
    res.json({
      ok: true,
      sucursal,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Error al actualizar la sucursal',
    });
  }
};

// Eliminar una sucursal por ID
const eliminarSucursal = async (req, res = response) => {
  const { id } = req.params;

  try {
    await Sucursal.findByIdAndDelete(id);
    res.json({
      ok: true,
      msg: 'Sucursal eliminada correctamente',
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Error al eliminar la sucursal',
    });
  }
};

module.exports = {
  getSucursales,
  crearSucursal,
  actualizarSucursal,
  eliminarSucursal
}