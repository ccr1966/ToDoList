/** Module dependencies.  */
/* entrega de Claudia Cecilia Rossi */

var express = require('express');
var mysql = require("mysql");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var http = require('http');

var session = require('express-session')
var bodyParser = require('body-parser');

var ccr = express();

var cliente = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Esme1966Pasquini',
  database: 'basefinalnode'
});


cliente.database = 'basefinalnode';

  //-----------------------------------------------  
//path de login
var usuarios = require('./routes/usuarios'); 
var routes = require('./routes/index');
var items = require('./routes/items');
var folders = require('./routes/folders');

// view engine setup
ccr.set('views', path.join(__dirname, 'views'));
ccr.set('view engine', 'hbs');

//especificamos el subdirectorio donde se encuentran las páginas estáticas
ccr.use(express.static(__dirname + '/public'));
ccr.use('/', routes);
ccr.use('/usuarios', usuarios);
ccr.use('/items', items);
ccr.use('/folders', folders);

ccr.use(session({secret: '123456', resave: true, saveUninitialized: true}));

ccr.use(logger('dev'));
ccr.use(bodyParser.json());
ccr.use(bodyParser.urlencoded({ extended: false }));
ccr.use(cookieParser());

ccr.set('port', process.env.PORT || 4300);

http.createServer(ccr).listen(ccr.get('port'), function(){
  console.log('el servidor EXPRESS en puerto ' + ccr.get('port'));
});
module.exports=cliente;