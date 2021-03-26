var express = require('express');
var router = express.Router();

//incluimos el paquete bd con la conexion a la tabla sql
var bd=require('./bd');


router.use(express.urlencoded({ extended: false }));

//Alta de registros
//Capturamos la ruta del alta y mostramos la plantilla correspondiente 
router.get('/alta/:id_usuario', function(req, res, next) {
    res.render('altaFolders',{id_usuario:req.params.id_usuario});
  });

//Cuando se presiona el botón submit procedemos a capturar dicha ruta donde procedemos a cargar los datos en la tabla de la base de datos
router.post('/alta', function(req, res, next) {

    console.log('en ALTA POST folders  nombre y usuario');
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

          consulta = "select folders.nombre, folders.id_folder, usuarios.id_usuario, usuarios.usuario from folders INNER JOIN usuarios ON usuarios.id_usuario=folders.id_usuario WHERE folders.id_usuario=" + req.body.id_usuario +" order by folders.nombre"
          console.log ('en ALTA POST'+consulta);
        
          bd.query(consulta, function(error,filas){
                    if (error) {            
                        console.log('ALTA POST folders error en la consulta SELECT de folders');
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
  
  consulta = "select folders.nombre, usuarios.usuario, usuarios.id_usuario, folders.id_folder from folders INNER JOIN USUARIOS ON folders.id_usuario=usuarios.id_usuario WHERE folders.id_usuario= " + req.params.id_usuario +" order by folders.nombre"
  console.log (consulta);
 
 
  bd.query(consulta, function(error,filas){
            if (error) {            
                console.log('error en la consulta SELECT de folders');
                return;
            }
            if (filas.length>0) {
                res.render('verFolders',{folders:filas});
            } 
            else{
                    //entra aca cuando no hay folders... busco usuario en otro lado
                    // select usuario cuando no quedan folders
                    console.log('ENTRA POR VACIO hace render sin rows y pasa id usuario ....')
                    consulta = "select usuarios.usuario, usuarios.id_usuario FROM usuarios where id_usuario =" + req.params.id_usuario;
                    bd.query(consulta, function(error,filas){
                    if (error) {            
                                    console.log('EN LISTADOFOLDER error en select usuario');
                                    console.log(error);
                                    return;
                            }
                        res.render('verFolders1',{folders:filas});
                    });// select folders cuando no hay
                            
            }
        });
   
});


router.get('/baja/:id_folder/:id_usuario',  function(req, res, next) {
    var id_folder = req.params.id_folder;
    var v_id_usuario= req.params.id_usuario;
 
    var consulta  ="delete FROM items where id_folder =" + id_folder;
    bd.query(consulta, function(error,filas){
              if (error) {            
                  console.log('error en delete');
                  console.log(error);
                  return;
              }
          });

    var consulta  ="delete FROM folders where id_folder =" + id_folder;
    bd.query(consulta, function(error,filas){
              if (error) {            
                  console.log('error en delete');
                  console.log(error);
                  return;
              }
          });
    
     consulta = "SELECT usuarios.id_usuario, usuarios.usuario, folders.nombre, folders.id_folder from folders INNER JOIN usuarios ON usuarios.id_usuario = folders.id_usuario WHERE folders.id_usuario=" + v_id_usuario +" order by folders.nombre"
     console.log (consulta);
        
          bd.query(consulta, function(error,filas){
                    if (error) {            
                        console.log('error en la consulta SELECT de folders');
                        return;
                    }
                    if (filas.length>0) {
                        res.render('verFolders',{folders:filas});
                    } 
                    else{
                        // select usuario cuando no quedan folders
                        console.log('BAJA hace render sin rows a buscar usuario ....')
                        consulta = "select usuarios.usuario, usuarios.id_usuario FROM usuarios where id_usuario =" + v_id_usuario;
                        console.log(consulta);

                        bd.query(consulta, function(error,filas){
                        if (error) {            
                                    console.log('EN BAJA FOLDER error en select usuario');
                                    console.log(error);
                                    return;
                            }
                            res.render('verFolders1',{folders:filas});
                        });// select folders cuando no hay

                    }
                });// select folders cuando todavia quedan

 
    
});



module.exports = router;
