module.exports = (sequelize, DataTypes) => {
  const Estatua = sequelize.define(
    "Estatua",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imagen: {
        type: DataTypes.STRING, // URL de la imagen
        allowNull: true,
      },
      codigoQR: {
        type: DataTypes.STRING, // URL del QR generado
        allowNull: true,
      },
      // Coordenadas en la Plaza de Armas
      latitudPlaza: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false, // Obligatorio
      },
      longitudPlaza: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: false, // Obligatorio
      },
      // Coordenadas reales
      latitudReal: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false,
      },
      longitudReal: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: false,
      },
    },
    {
      tableName: "Estatuas",
      timestamps: true,
    }
  );

  return Estatua;
};
