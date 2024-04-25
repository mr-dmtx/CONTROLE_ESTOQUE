const express = require('express');
const router = express.Router();
const Posto = require("../models/Posto");
const Usuario = require("../models/Usuario");
const authorize = require("../helpers/acess_control.js");

//pagina inicial regional
router.get('/', authorize("r"), (req,res)=>{
  console.log(req.user.usuario_id);
  Posto.count({
    where: {
      regional_regional_id: req.user.usuario_id
    }
  }).then(count => {
    res.render('regional/index', { qtPostos: count });
  }).catch(error => {
    res.render("regional/index", {erros: error});
  })
});

//exibir postos
router.get('/postos', authorize("r"), (req,res)=>{
  Posto.findAll({
    include: [{
        model: Usuario,
        required: true
    }],
    attributes: ['posto_id', 'posto_nome',]
  }).then(postos => {
    res.render('regional/postos', { postos });
  }).catch(error => {
    console.log(error);
    res.render('regional/postos', {erros: error});
  })
  
  
});

//add posto
router.get('/adicionarposto', authorize("r"), (req,res)=>{
  res.render('regional/adicionarposto')
});

router.post('/adicionarposto', authorize("r"), async (req,res)=>{
  let erros = [];
  if(req.body.nome.length < 3){
    erros.push({msg: "Nome inválido! Deve ter mais de 3 caracteres!"});
  }
  if(req.body.login.length < 4){
    erros.push({msg: "Login inválido! Deve ter mais de 3 caracteres!"});
  }
  if(req.body.senha < 6){
    erros.push({msg: "A senha deve ter mais 3 caracteres!"});
  }
  if(req.body.senha != req.body.confirmarSenha){
      erros.push({msg: "As senhas devem ser iguais!"});
  }

  if(erros.length > 0){
    res.render("regional/adicionarposto", {erros: erros});
  }
  else{

    const existeUsuario = await Usuario.findOne({
      where: { usuario_login: req.body.login}
    });

    if(existeUsuario === null){
      await Usuario.create({
        usuario_login: req.body.login,
        usuario_hash_senha: req.body.senha,
        usuario_cargo: "p"
      });
      const usuario = await Usuario.findOne({
        where: { usuario_login: req.body.login}
      });

      await Posto.create({
        posto_nome: req.body.nome,
        usuario_usuario_id: usuario.usuario_id,
        regional_regional_id: req.user.usuario_id
      });
      res.render("regional/adicionarposto", {sucesso: "Posto adicionado com sucesso!"});
    }
      else{
        erros.push({msg: "Já existe um posto com esse login!"});
        res.render("regional/adicionarposto", {erros: erros});
      }
    
  }


});

module.exports = router;