var express = require('express');
var router = express.Router();

var bd=require('./bd');

router.use(express.urlencoded({ extended: false }));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/chequearLogin',  function(req, res, next) {
  
  //console.log(req.body.usuario);
  var consulta = "select id_usuario, usuario, clave, nombre, apellido from usuarios where usuarios.usuario= '"+ req.body.usuario + "' and usuarios.clave = '" + req.body.clave + "'"
console.log(consulta);

  bd.query(consulta, function(error,filas){
            if (error) {            
                console.log('error en la consulta');
             res.render('MensajesDeLogin',{mensaje:'Ops..we have a problem.'});
	   return;
            }
            if (filas.length>0) {
              console.log('encontro usuario y clave');
              console.log({usuarios:filas});
              res.render('paginaBienvenida',{usuarios:filas});
            } 
            else {
              console.log('HAY QUE PONER PAGINA DE USUARIO INEXISTENTE');
                res.render('MensajesDeLogin',{mensaje:'You aure not a user or you put a incorrect password.'});
            }    
        });
});

module.exports = router;
