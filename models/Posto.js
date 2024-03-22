const db = require('./db');
const Regional = require('./regional');

const Posto = db.sequelize.define('posto', {
  id_posto: {
    type: db.Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nm_posto: {
    type: db.Sequelize.DataTypes.STRING
  },
  cd_posto: {
    type: db.Sequelize.DataTypes.STRING
  },
  cd_senha: {
    type: db.Sequelize.DataTypes.STRING
  },
  regional_id_regional: {
    type: db.Sequelize.DataTypes.INTEGER,
    references: {
      model: "regional",
      key: "id_regional"
    }
  }

},{
  freezeTableName: true,
  timestamps: false
})
Posto.belongsTo(Regional);
Posto.sync({ force: false });
module.exports = Posto;