const { response } = require('express');
const Medicamento = require('../models/medicamento');
const { validationResult } = require('express-validator');

// Obtener todos los medicamentos
const getMedicamentos = async (req, res = response) => {
    try {
      const medicamentos = await Medicamento.find();
      res.json({
        ok: true,
        medicamentos,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: 'Error al obtener los medicamentos',
      });
    }
};

// Crear un nuevo medicamento
const crearMedicamento = async (req, res = response) => {
    const { nombre, cantidad } = req.body;
    const errores = validationResult(req);
  
    if (!errores.isEmpty()) {
      return res.status(400).json({
        errors: errores.array(),
      });
    }
  
    try {
      const nuevoMedicamento = new Medicamento({ nombre, cantidad });
      await nuevoMedicamento.save();
  
      res.status(201).json({
        ok: true,
        medicamento: nuevoMedicamento,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: 'Error al crear el medicamento',
      });
    }
};

// Actualizar un medicamento por ID
const actualizarMedicamento = async (req, res = response) => {
    const { id } = req.params;
    const { nombre, cantidad } = req.body;
  
    try {
      const medicamento = await Medicamento.findByIdAndUpdate(
        id,
        { nombre, cantidad },
        { new: true }
      );
      res.json({
        ok: true,
        medicamento,
      });
    } catch (error) {
      res.status(400).json({
        ok: false,
        msg: 'Error al actualizar el medicamento',
      });
    }
  };
  
  // Eliminar un medicamento por ID
  const eliminarMedicamento = async (req, res = response) => {
    const { id } = req.params;
  
    try {
      await Medicamento.findByIdAndDelete(id);
      res.json({
        ok: true,
        msg: 'Medicamento eliminado correctamente',
      });
    } catch (error) {
      res.status(400).json({
        ok: false,
        msg: 'Error al eliminar el medicamento',
      });
    }
  };

module.exports = {
    getMedicamentos,
    crearMedicamento,
    actualizarMedicamento,
    eliminarMedicamento
}