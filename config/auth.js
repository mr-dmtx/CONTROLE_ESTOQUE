const localStrategy = require('passport-local').Strategy;
const Regional = require("../models/regional");
const Posto = require("../models/Posto");

module.exports = function(passport){
  passport.use(new localStrategy({usernameField: 'txtLogin', passwordField: 'txtSenha'}, (id, senha, done) => {
    Regional.findOne({id: id}).then((usuario) => {
      if(!usuario){
        return done(null, false, {message: "Essa conta não existe!"});
      }

      if(senha == usuario.senha){
        return done(null, usuario);
      }
      else{
        return done(null, false, {message: "Senha incorreta"})
      }

    })
  }))

passport.serializeUser((usuario, done) => {
  done(null, usuario.id)
})

/*passport.SerializeUser((id, done) =>{
  Regional.findByPk(id, (err, usuario) => {
    done(err, usuario)
  })
})*/

}