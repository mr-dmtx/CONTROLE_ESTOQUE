const express = require('express');
const router = express.Router();
const Posto = require("../models/Posto");
const Funcionario = require('../models/Funcionario');
const authorize = require("../helpers/acess_control.js");

router.get('/', authorize("p"), async (req,res)=>{
  const posto = await Posto.findOne({
    where: { usuario_usuario_id: req.user.usuario_id}
  });

  const funcionarios = await Funcionario.findAll({
    where: { posto_posto_id: posto.dataValues.posto_id}
  });

  res.render('posto/index', {funcionarios});
});

router.get('/adicionar/funcionario', authorize("p"), async (req,res) =>{

  res.render('posto/adicionarfuncionario');

});

router.post('/adicionar/funcionario', async (req,res) =>{
  let erros = [];
    
    if(req.body.nome.length < 1) erros.push({msg: "Nome inválido!"});
    if(req.body.sexo.length != 1) erros.push({msg:"Nome inválido!"});
    console.log(erros.length);
    if(erros.length > 0){
      console.log(req.body.sexo.length);
      res.render('posto/adicionarfuncionario', {error: erros});
      return;
    }

    const posto = await Posto.findOne({
      where: { usuario_usuario_id: req.user.usuario_id}
    });


    await Funcionario.create({
      funcionario_nome: req.body.nome,
      funcionario_sexo: req.body.sexo,
      posto_posto_id: posto.dataValues.posto_id
    });


    res.render('posto/adicionarfuncionario', {sucesso: "Funcionario adicionado com sucesso!"});
});

router.get('/editar/funcionario/:id', authorize("p"), async(req,res)=>{
  const funcionario = await Funcionario.findOne({
    where: { funcionario_id: req.params.id}
  });

  res.render('posto/editarfuncionario', {funcionario});


});

router.post('/editar/funcionario/:id', authorize("p"), async(req,res)=>{
  await Funcionario.update({funcionario_nome: req.body.nome, 
                                                funcionario_sexo: req.body.sexo},
                                                {where: {funcionario_id: req.params.id}})
                      .then(funcionario => res.render('posto/editarfuncionario',  {funcionario, sucesso: "Alterações salvas com sucesso!"}))
                      .catch(err => res.render('posto/editarfuncionario', {erros: "Erro ao salvar alterações tente novamente!"}));


});

router.get('/deletar/funcionario/:id', authorize("p"), async(req,res)=>{
  console.log('qqwe:'+ req.params.id);
 await Funcionario.destroy({
  where: {funcionario_id: req.params.id}
 }).then(() => { res.redirect('/')})
 .catch((error => {console.log(error)}));
});

module.exports = router;