const { Sequelize } = require("sequelize");
require("dotenv").config();

// Crear instancia de Sequelize con configuración de PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT || 5432,
    logging: false,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión establecida con PostgreSQL");
  } catch (error) {
    console.error("❌ Error al conectar con PostgreSQL:", error);
  }
})();

module.exports = { sequelize };
