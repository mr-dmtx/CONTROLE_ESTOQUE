const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req,res)=>{
  if(req.user == null){
    res.render('login/index')
    
  }
  else{
    
    if(req.user.usuario_cargo == "r"){
      res.redirect('/regional');
    }
    else if(req.user.usuario_cargo == "p"){
      res.redirect('/posto');
    }
  }
  
});

router.post("/login", (req, res, next) => {

  passport.authenticate("local", {
    successRedirect: req.body.txtPerfil == "r" ? "/regional" : "/posto",
    failureRedirect: "/",
  })(req, res, next)
})

router.get("/logout", (req, res, next) => {
  req.logout(req.user, err =>{
    if(err) return next(err);
    res.render('login/index');
  });
});

module.exports = router;