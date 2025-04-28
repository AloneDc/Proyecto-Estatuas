const { Sequelize } = require("sequelize");
const { sequelize } = require("../config/database");
const Estatua = require("./Estatua")(sequelize, Sequelize);

const Usuario = require("./Usuario")(sequelize, Sequelize);

const db = {
  sequelize,
  Sequelize,
  Usuario,
};

module.exports = { sequelize, Usuario, Estatua };
