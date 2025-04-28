const { Mural } = require("../models");

// Obtener todos los murales
exports.getMurales = async (req, res) => {
  try {
    const murales = await Mural.findAll();
    res.json(murales);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los murales" });
  }
};

// Obtener un mural por ID
exports.getMuralById = async (req, res) => {
  try {
    const mural = await Mural.findByPk(req.params.id);
    if (!mural) return res.status(404).json({ error: "Mural no encontrado" });
    res.json(mural);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el mural" });
  }
};

// Crear un nuevo mural
exports.createMural = async (req, res) => {
  try {
    const nuevoMural = await Mural.create(req.body);
    res.status(201).json(nuevoMural);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el mural" });
  }
};

// Actualizar un mural
exports.updateMural = async (req, res) => {
  try {
    const mural = await Mural.findByPk(req.params.id);
    if (!mural) return res.status(404).json({ error: "Mural no encontrado" });

    await mural.update(req.body);
    res.json(mural);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el mural" });
  }
};

// Eliminar un mural
exports.deleteMural = async (req, res) => {
  try {
    const mural = await Mural.findByPk(req.params.id);
    if (!mural) return res.status(404).json({ error: "Mural no encontrado" });

    await mural.destroy();
    res.json({ message: "Mural eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el mural" });
  }
};
