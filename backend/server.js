const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const { sequelize } = require("./models");

// Importar rutas
const authRoutes = require("./routes/authRoutes");
const estatuasRoutes = require("./routes/estatuas");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/estatuas", estatuasRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log("📌 Base de datos conectada");
    });
  })
  .catch((error) => {
    console.error("❌ Error al conectar con la base de datos:", error);
  });
