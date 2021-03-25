var express = require('express');
var router = express.Router();

//incluimos el paquete bd con la conexion a la tabla sql
var bd=require('./bd');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//Requerimos el módulo 'fs' para la copia de archivos
var fs = require('fs');

//Requerimos el módulo 'multer' y llamamos a la función multer pasando como dato el directorio donde se suben los archivos
var multer = require('multer');
var upload = multer({dest: './uploads/'});


//Alta de registros
//Capturamos la ruta del alta y mostramos la plantilla correspondiente 
router.get('/alta/:id_usuario', function(req, res, next) {
    res.render('altaFolders',{id_usuario:req.params.id_usuario});
  });

//Cuando se presiona el botón submit procedemos a capturar dicha ruta donde procedemos a cargar los datos en la tabla de la base de datos
router.post('/alta/',  urlencodedParser, upload.single("imagen"), function(req, res, next) {
    console.log(req.file.filename);
    console.log(req.body.nombre);
    console.log(req.body.id_usuario);

    v_hecho =false;

     var registro={
         nombre:req.body.nombre,
         id_usuario:req.body.id_usuario,
       };

      bd.query('insert into folders set ?',registro, function (error,resultado){
          if (error){
              console.log(error);
              return;
          }
        });//query insert

          consulta = "select * from folders WHERE id_usuario=" + req.body.id_usuario 
          console.log (consulta);
        
          bd.query(consulta, function(error,filas){
                    if (error) {            
                        console.log('error en la consulta SELECT de folders');
                        return;
                    }
                    if (filas.length>0) {
                        res.render('verFolders',{folders:filas});
                    } 

      });    //query select
  }); //router post


router.get('/listadoFolders/:id_usuario', function(req, res, next) {
  console.log('va a hacer select de folders');
  console.log('id_usuario ' + req.params.id_usuario);
  
  consulta = "select folders.nombre, usuarios.usuario, usuarios.id_usuario, folders.id_folder from folders INNER JOIN USUARIOS ON folders.id_usuario=usuarios.id_usuario WHERE folders.id_usuario= " + req.params.id_usuario 
  console.log (consulta);

  bd.query(consulta, function(error,filas){
            if (error) {            
                console.log('error en la consulta SELECT de folders');
                return;
            }
            if (filas.length>0) {
                res.render('verFolders',{folders:filas});
            } 
            else {
              console.log('hace render sin rows y pasa id usuario ....')

                  res.render('verFolders1',{id_usuario:req.params.id_usuario});
            
            
              //  res.render('mensajeitems',{mensaje:'No existe el codigo de item ingresado'});
            }    
        });
});


router.get('/baja/:id_folder/:id_usuario',  urlencodedParser, function(req, res, next) {
    var id_folder = req.params.id_folder;
    var v_id_usuario= req.params.id_usuario;

    var consulta  ="delete FROM folders where id_folder =" + id_folder;
    bd.query(consulta, function(error,filas){
              if (error) {            
                  console.log('error en delete');
                  console.log(error);
                  return;
              }
          });
    
    consulta = "select * from folders WHERE id_usuario=" + v_id_usuario 
    console.log (consulta);
        
          bd.query(consulta, function(error,filas){
                    if (error) {            
                        console.log('error en la consulta SELECT de folders');
                        return;
                    }
                    if (filas.length>0) {
                        res.render('verFolders',{folders:filas});
                    } 
                    else {
                      console.log('hace render sin rows y pasa id usuario ....')
        
                          res.render('verFolders1',{id_usuario:v_id_usuario});
                    
                    
                      //  res.render('mensajeitems',{mensaje:'No existe el codigo de item ingresado'});
                    }    
                });
  
});



module.exports = router;
