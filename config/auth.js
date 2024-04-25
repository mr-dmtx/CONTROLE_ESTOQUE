const localStrategy = require('passport-local').Strategy;
const Regional = require("../models/regional");
const Posto = require("../models/Posto");
const Usuario = require("../models/Usuario");

module.exports = function(passport){
  passport.use(new localStrategy({usernameField: 'txtLogin', passwordField: 'txtSenha'}, (login, senha, done) => {
    
    Usuario.findOne({where: {usuario_login: login}}).then((usuario) => {
      if(!usuario){
        return done(null, false, {message: "Usuário incorreto!"});
      }
      if(senha == usuario.usuario_hash_senha){
        return done(null, usuario);
      }
      else{
        return done(null, false, {message: "Senha inválida!"});
      }

    })
  }))

passport.serializeUser((usuario, done) => {
  done(null, usuario)
})

passport.deserializeUser((usuario, done) =>{
    done(null, usuario)
})

}