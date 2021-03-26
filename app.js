/** Module dependencies.  */
/* entrega de Claudia Cecilia Rossi */

var  express = require('express');
var  path = require('path');
var  http = require('http');

//routes de cada tema
var usuarios = require('./routes/usuarios'); 
var routes = require('./routes/index');
var items = require('./routes/items');
var folders = require('./routes/folders');
const { __express } = require('hbs');

var app = express();

// all environments
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use('/', routes);
app.use('/usuarios', usuarios);
app.use('/items', items);
app.use('/folders', folders);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('port', process.env.PORT || 4300);

http.createServer(app).listen(app.get('port'), function(){
  console.log('el servidor EXPRESS en puerto ' + app.get('port'));
});

