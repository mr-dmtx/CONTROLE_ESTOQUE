const db = require('./db');

const Usuarios = db.sequelize.define('Usuario', {
  usuario_id: {
    type: db.Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuario_login: {
    type: db.Sequelize.DataTypes.STRING
  },
  usuario_hash_senha: {
    type: db.Sequelize.DataTypes.STRING
  },
  usuario_cargo: {
    type: db.Sequelize.DataTypes.STRING
  }
},{
  freezeTableName: true,
  timestamps: false
})
Usuarios.sync({ force: false });
module.exports = Usuarios;