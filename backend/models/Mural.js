const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Mural = sequelize.define("Mural", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imagen: {
    type: DataTypes.STRING, // URL de la imagen del mural
    allowNull: false,
  },
  artista: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ganador: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Mural;
