const express = require('express');
const morgan = require ('morgan'); 
const  {engine} = require('express-handlebars');
const path = require('path');
const {helpers} = require('handlebars');
const bp = require('body-parser');


//inicializacion
const app = express();
 

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


//peticiones


app.use(morgan('dev'));
app.get(express.urlencoded({extended: false}));
app.use(express.json());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));


//variables G.
app.use((req, res, next) => {
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
