const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { check } = require("express-validator");

// POST /api/auth/register
router.post(
  "/register",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Ingresa un email válido").isEmail(),
    check("password", "Mínimo 6 caracteres").isLength({ min: 6 }),
  ],
  authController.register
);

// POST /api/auth/login
router.post(
  "/login",
  [
    check("email", "Ingresa un email válido").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
  ],
  authController.login
);

module.exports = router;
