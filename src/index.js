const express = require('express');
const morgan = require ('morgan'); 
const  {engine} = require('express-handlebars');
const path = require('path');
const {helpers} = require('handlebars');
const bp = require('body-parser');

const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const { database } = require('./keys');

const passport = require('passport');


//inicializacion
const app = express();
require('./lib/passport');


//configuracion
app.set('port', process.env.PORT || 4000);
app.set('views',path.join(__dirname, 'views'));

app.engine('.hbs',  engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname:'.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');


//middlewares

app.use(session({
    secret: "changeit",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore( database )
}));
app.use(flash());
app.use(morgan('dev'));
app.get(express.urlencoded({extended: false}));
app.use(express.json());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

//variables G.
app.use((req, res, next) => {
  app.locals.success =  req.flash('success');
  app.locals.message =  req.flash('message');
next();
});


//rutas
app.use(require('./routes/index'));
app.use(require('./routes/autentication'));
app.use('/links',require('./routes/links'));


//public
app.use(express.static(path.join(__dirname, 'public')));




//inicio del server

app.listen(app.get('port'), ()=> {
console.log('server on port', app.get('port'))
});
