function authorize(cargo) {
  return function (req, res, next) {
    console.log(req.user);
    if (req.isAuthenticated() && req.user.usuario_cargo === cargo) {
      return next();
    }
    req.flash("error_msg", "Você não tem permissão para acessar!");
    res.redirect("/");
  };
}

module.exports = authorize;