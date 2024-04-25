const Posto = require('./Posto');
const db = require('./db');

const Funcionario = db.sequelize.define('funcionario', {
  funcionario_id: {
    type: db.Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  funcionario_nome: {
    type: db.Sequelize.DataTypes.STRING
  },
  funcionario_sexo: {
    type: db.Sequelize.DataTypes.STRING
  },
  posto_posto_id: {
    type: db.Sequelize.DataTypes.INTEGER,
    references: {
      model: "posto",
      key: "posto_id"
    }
  }
},{
  freezeTableName: true,
  timestamps: false
})

Funcionario.sync({ force: false });
module.exports = Funcionario;