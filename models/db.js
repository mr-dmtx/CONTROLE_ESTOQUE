const Sequelize = require('sequelize');

if(process.env.PRODUCTION == "prd"){
  const sequelize = new Sequelize('sql10707221', 'sql10707221', '7ry6kg1X9N', {
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
  
}
else{
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

}
