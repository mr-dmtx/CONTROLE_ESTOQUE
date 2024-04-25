const express = require('express');
const router = express.Router();
const Posto = require("../models/Posto");
const Funcionario = require('../models/Funcionario');

router.get('/', async (req,res)=>{
  const posto = await Posto.findOne({
    where: { usuario_usuario_id: req.user.usuario_id}
  });

  const funcionarios = await Funcionario.findAll({
    where: { posto_posto_id: posto.dataValues.posto_id }
  });
  console.log(funcionarios);
  res.render('posto/index', {posto, funcionarios});
});

router.get('/adicionar/funcionario', async (req,res) =>{

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

module.exports = router;