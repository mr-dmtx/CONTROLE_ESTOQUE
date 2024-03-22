const Sequelize = require('sequelize');

const sequelize = new Sequelize('controle_estoque', 'root', 'root', {
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      // Desativar a pluralização global
      freezeTableName: true
  }
});

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}
