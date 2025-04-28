const express = require("express");
const router = express.Router();
const muralController = require("../controllers/muralController");

// Obtener todos los murales
router.get("/", muralController.getMurales);

// Obtener un mural por ID
router.get("/:id", muralController.getMuralById);

// Crear un nuevo mural
router.post("/", muralController.createMural);

// Actualizar un mural
router.put("/:id", muralController.updateMural);

// Eliminar un mural
router.delete("/:id", muralController.deleteMural);

module.exports = router;
