const Sequelize = require('sequelize');

//teste
/*
const sequelize = new Sequelize('controle_estoque', 'root', 'root', {
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      // Desativar a pluralização global
      freezeTableName: true
  }
});
*/
//producao
const sequelize = new Sequelize('sql10693318', 'sql10693318', 'rQl6agvMWu', {
  host: "sql10.freemysqlhosting.net",
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
