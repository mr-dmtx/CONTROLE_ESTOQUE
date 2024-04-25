const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require("body-parser"); 
const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const regional = require('./routes/regional');
const login = require('./routes/login');
const passport = require('passport');
const posto = require('./routes/posto');

require("./config/auth")(passport);
//#####configs#####

app.use(session({
  secret: "estoque",
  resave: true,
  saveUninitialized: true
}))


app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
//middleware
app.use((req,res,next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

//bodyparser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//handlebars
app.engine('handlebars', engine());
app.set('views', __dirname + '/views');

app.set('view engine', 'handlebars');
//public
app.use(express.static(path.join(__dirname,'public')));

//rotas

app.use('/', login);
app.use('/regional', regional);
app.use('/posto', posto);

app.listen(process.env.port || 3000);