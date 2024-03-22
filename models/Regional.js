const db = require('./db');

const Regional = db.sequelize.define('regional', {
  id_regional: {
    type: db.Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nm_regional: {
    type: db.Sequelize.DataTypes.STRING
  },
  cd_regional: {
    type: db.Sequelize.DataTypes.STRING
  },
  cd_senha: {
    type: db.Sequelize.DataTypes.STRING
  }
},{
  freezeTableName: true,
  timestamps: false
})
Regional.sync({ force: false });
module.exports = Regional;