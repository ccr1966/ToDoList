
const mysql = require('mysql');

/* 
var cliente = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Esme1966Pasquini',
    port : 3306,
    database : 'basetodolist'
 });
  
 cliente.database = 'basetodolist';
 
/* cadena HEROKU
   mysql://bce33da1515f55
   :
   d6c9f036
   @
   us-cdbr-east-03.cleardb.com
   /heroku_b9f56a6726ed889
   ?reconnect=true
*/
   var cliente = mysql.createConnection({
    host     : 'us-cdbr-east-03.cleardb.com',
    user     : 'bce33da1515f55',
    password : 'd6c9f036',
    port : 3306,
    database : 'heroku_b9f56a6726ed889'
  });


  cliente.query("CREATE TABLE IF NOT EXISTS usuarios (`id_usuario` int(100) NOT NULL AUTO_INCREMENT,`usuario` varchar(20) NOT NULL,      `clave` varchar(20) NOT NULL,`nombre` varchar(50) NOT NULL,      `apellido` varchar(50) NOT NULL,      `email` varchar(50) NOT NULL,      `sitio_web` varchar(50) DEFAULT NULL,      PRIMARY KEY (`id_usuario`)    ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ", function (err, result) {  
    if (err) throw err;  
    console.log("query de creacion de tabla USUARIOS ok. Si no existe se crea. ");  
	
    console.log("va a insertar USUARIOS si no hay... ");  
    cliente.query("INSERT IGNORE INTO `usuarios` (`id_usuario`, `usuario`, `clave`, `nombre`, `apellido`, `email`, `sitio_web`) VALUES (1, 'soledad', 'balboa', 'María Soledad', 'Balboa', 'hr@ensolvers.com', 'www.ensolvers.com'),  (2, 'claudia', 'rossi', 'Claudia Cecilia', 'Rossi', 'claudiarossi0707@gmail.com', 'www.claudiaceciliarossi.com.ar')", function (err, result) {  
      if (err) throw err;  
      console.log("paso por inserts de usuarios.");  
    }); //insert
   });  //create
  
  cliente.query("CREATE TABLE IF NOT EXISTS folders (`id_folder` int(100) NOT NULL AUTO_INCREMENT,id_usuario int(100), `nombre` varchar(255) NOT NULL, PRIMARY KEY (`id_folder`)    ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ", function (err, result) {  
    if (err) throw err;  
    console.log("query de creacion de tabla FOLDERS ok. Si no existe se crea.");  
  });

   cliente.query("CREATE TABLE IF NOT EXISTS items (`id_item` int(100) NOT NULL AUTO_INCREMENT,id_folder int(100), `descripcion` varchar(255) NOT NULL,  `hecho` boolean ,  PRIMARY KEY (`id_item`)    ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ", function (err, result) {  
    if (err) throw err;  
    console.log("query de creacion de tabla ITEMS ok. Si no existe se crea.");  
    });

console.log('este module.export=cliente le da eror cuando pasa dos veces pr aca?????')
module.exports=cliente;
