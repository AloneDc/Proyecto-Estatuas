const { Estatua } = require("../models");

// Obtener todas las estatuas
exports.getEstatuas = async (req, res) => {
  try {
    const estatuas = await Estatua.findAll();
    res.json(estatuas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las estatuas" });
  }
};

// Obtener una estatua por ID
exports.getEstatuaById = async (req, res) => {
  try {
    const estatua = await Estatua.findByPk(req.params.id);
    if (!estatua)
      return res.status(404).json({ error: "Estatua no encontrada" });
    res.json(estatua);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la estatua" });
  }
};

// Crear una nueva estatua
exports.createEstatua = async (req, res) => {
  try {
    const nuevaEstatua = await Estatua.create(req.body);
    res.status(201).json(nuevaEstatua);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la estatua" });
  }
};

// Actualizar una estatua
exports.updateEstatua = async (req, res) => {
  try {
    const estatua = await Estatua.findByPk(req.params.id);
    if (!estatua)
      return res.status(404).json({ error: "Estatua no encontrada" });

    await estatua.update(req.body);
    res.json(estatua);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la estatua" });
  }
};

// Eliminar una estatua
exports.deleteEstatua = async (req, res) => {
  try {
    const estatua = await Estatua.findByPk(req.params.id);
    if (!estatua)
      return res.status(404).json({ error: "Estatua no encontrada" });

    await estatua.destroy();
    res.json({ message: "Estatua eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la estatua" });
  }
};
