const Posto = require('./Posto');
const db = require('./db');

const Funcionario = db.sequelize.define('funcionario', {
  id_funcionario: {
    type: db.Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cd_ponto: {
    type: db.Sequelize.DataTypes.STRING
  },
  nm_funcionario: {
    type: db.Sequelize.DataTypes.STRING
  },
  cd_sexo: {
    type: db.Sequelize.DataTypes.STRING
  },
  tm_camisa: {
    type: db.Sequelize.DataTypes.STRING
  },
  tm_calca: {
    type: db.Sequelize.DataTypes.STRING
  },
  posto_id_posto: {
    type: db.Sequelize.DataTypes.INTEGER,
    references: {
      model: "posto",
      key: "id_posto"
    }
  }
},{
  freezeTableName: true,
  timestamps: false
})

Funcionario.belongsTo(Posto);
Funcionario.sync({ force: false });
module.exports = Funcionario;