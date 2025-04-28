// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Acceso denegado. No token proporcionado." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), "secreto"); // ⚠️ Usa variable de entorno
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};

// Solo para rutas protegidas por rol
exports.requireAdmin = (req, res, next) => {
  if (req.usuario?.rol !== "admin") {
    return res
      .status(403)
      .json({ error: "No tienes permisos de administrador" });
  }
  next();
};
