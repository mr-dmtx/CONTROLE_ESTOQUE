const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require("body-parser"); 
const app = express();
const path = require('path');
const regional = require('./routes/regional');
const login = require('./routes/login');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const { error } = require('console');

require("./config/auth")(passport);
//#####configs#####

app.use(session({
  secret: "estoque",
  resave: true,
  saveUninitialized: true
}))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//bodyparser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
//public
app.use(express.static(path.join(__dirname,'public')));

//rotas

app.use('/', login);
app.use('/regional', regional);

app.listen(process.env.port || 3000);