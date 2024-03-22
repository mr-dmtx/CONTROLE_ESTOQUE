//import RegionalController from '../controller/RegionalController';
const express = require('express');
const router = express.Router();
const Postos = require("../models/Posto");

//pagina inicial regional
router.get('/', (req,res)=>{
  Postos.count({
    where: {
      regional_id_regional: 1
    }
  }).then(count => {
    res.render('regional/index', { qtPostos: count });
  }).catch(error => {
    res.render("regional/index", {erros: error});
  })
});

//exibir postos
router.get('/postos', (req,res)=>{
  Postos.findAll({
    where:{
      regional_id_regional: 1
    },
    attributes: ['id_posto', 'nm_posto', 'cd_posto']
  }).then(postos => {
    res.render('regional/postos', { postos });
  }).catch(error => {
    console.log(error);
    res.render('regional/postos', {erros: error});
  })
  
  
});

//add posto
router.get('/adicionarposto', (req,res)=>{
  res.render('regional/adicionarposto')
});

router.post('/adicionarposto', (req,res)=>{
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
    Postos.create({
      nm_posto: req.body.nome,
      cd_posto: req.body.login,
      cd_senha: req.body.senha,
      regional_id_regional: 1
    }).then(function(){
      res.render("regional/adicionarposto", {sucesso: req.body.nome + " foi adicionado com sucesso!"});
    }).catch(function(error){
      console.log(error);
      erros.push({msg: "Erro ao adicionar posto tente novamente! " + error});
      res.render("regional/adicionarposto", {erros: erros});
    })
    
  }

});

module.exports = router;