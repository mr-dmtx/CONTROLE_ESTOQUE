const Posto = require('./Posto');
const db = require('./db');

const Regional = db.sequelize.define('regional', {
  regional_id: {
    type: db.Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  regional_nome: {
    type: db.Sequelize.DataTypes.STRING
  },
  usuario_usuario_id: {
    type: db.Sequelize.DataTypes.INTEGER,
    references: {
      model: "usuario",
      key: "usuario_id"
    }
  }

},{
  freezeTableName: true,
  timestamps: false
})
Regional.sync({ force: false });
module.exports = Regional;