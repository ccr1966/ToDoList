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

var app = express();
/*
var cliente = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Esme1966Pasquini',
  database: 'basefinalnode'
});


cliente.database = 'basefinalnode';
*/


var cliente = mysql.createConnection({
  host     : 'us-cdbr-east-03.cleardb.com',
  user     : 'bce33da1515f55',
  password : 'd6c9f036',
  port : 3306,
  database : 'heroku_b9f56a6726ed889'
});

cliente.database = 'heroku_b9f56a6726ed889';


  //-----------------------------------------------  
//path de login
var usuarios = require('./routes/usuarios'); 
var routes = require('./routes/index');
var items = require('./routes/items');
var folders = require('./routes/folders');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//especificamos el subdirectorio donde se encuentran las páginas estáticas
app.use(express.static(__dirname + '/public'));
app.use('/', routes);
app.use('/usuarios', usuarios);
app.use('/items', items);
app.use('/folders', folders);

app.use(session({secret: '123456', resave: true, saveUninitialized: true}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('port', process.env.PORT || 4300);

http.createServer(ccr).listen(ccr.get('port'), function(){
  console.log('el servidor EXPRESS en puerto ' + app.get('port'));
});
module.exports=cliente;