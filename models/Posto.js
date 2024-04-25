const Usuarios = require('./Usuario');
const db = require('./db');
const Regional = require('./regional');

const Posto = db.sequelize.define('posto', {
  posto_id: {
    type: db.Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  posto_nome: {
    type: db.Sequelize.DataTypes.STRING
  },
  usuario_usuario_id: {
    type: db.Sequelize.DataTypes.INTEGER,
    references: {
      model: "usuario",
      key: "usuario_id"
    }
  },
  regional_regional_id: {
    type: db.Sequelize.DataTypes.INTEGER,
    references: {
      model: "regional",
      key: "regional_id"
    }
  }
  
},{
  freezeTableName: true,
  timestamps: false
})
Posto.sync({ force: false });
module.exports = Posto;