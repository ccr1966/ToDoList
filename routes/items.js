
var express = require('express');
var router = express.Router();

//incluimos el paquete bd con la conexion a la tabla sql
var bd=require('./bd');

router.use(express.urlencoded({ extended: false }));
var v_hecho;

//Alta de registros
//Capturamos la ruta del alta y mostramos la plantilla correspondiente 
router.get('/alta/:id_folder', function(req, res, next) {

    res.render('altaItems',{id_folder:req.params.id_folder});
  });

//Cuando se presiona el botón submit procedemos a capturar dicha ruta donde procedemos a cargar los datos en la tabla de la base de datos
router.post('/alta',  function(req, res, next) {
    
    console.log(req.body.descripcion);
    console.log(req.body.id_folder);

    v_hecho =false;

     var registro={
         descripcion:req.body.descripcion,
         hecho:v_hecho,
         id_folder:req.body.id_folder
       }; 

      bd.query('insert into items set ?',registro, function (error,resultado){
          if (error){
              console.log(error);
              return;
          }
      });    //query insert

      consulta = "select items.hecho, items.descripcion, items.id_item, folders.nombre,folders.id_folder, usuarios.id_usuario, usuarios.usuario from items INNER JOIN folders ON folders.id_folder=items.id_folder INNER JOIN usuarios ON usuarios.id_usuario=folders.id_usuario WHERE items.id_folder = "  + req.body.id_folder +" order by item.descripcion";
      console.log (consulta);
    
      bd.query(consulta, function(error,filas){
                if (error) {            
                    console.log('error en la consulta SELECT de items');
                    return;
                }
                if (filas.length>0) {
                    res.render('verItems',{items:filas});
                } 

  });    //query select

  }); //router


router.get('/listadoItems/:id_folder/:id_usuario', function(req, res, next) {


    var v_id_usuario = req.params.id_usuario;
    var v_id_folder = req.params.id_folder;
    console.log('v-id-usuario'+ v_id_usuario);
    console.log('v-id-folder'+ v_id_folder);
    

  console.log('LISTADO ITEMS  hace select de items')
  consulta = "select items.hecho, items.descripcion, items.id_item, folders.nombre,folders.id_folder, usuarios.id_usuario, usuarios.usuario from items INNER JOIN folders ON folders.id_folder=items.id_folder INNER JOIN usuarios ON usuarios.id_usuario=folders.id_usuario WHERE items.id_folder = " + v_id_folder + " order by item.descripcion";

    console.log(consulta);

    bd.query(consulta, function(error,filas){
            if (error) {            
                console.log('error en la consulta SELECT de items');
                return;
            }
            if (filas.length>0) {
                res.render('verItems',{items:filas});
            } 
            else{
                consulta = "select folders.nombre, usuarios.usuario, usuarios.id_usuario, folders.id_folder from folders INNER JOIN USUARIOS ON folders.id_usuario=usuarios.id_usuario WHERE folders.id_folder= " + v_id_folder; 
                console.log ('LISTADO ITEMS  segundo select  items ');
                console.log (consulta);
                bd.query(consulta, function(error,filas){
                    if (error) {            
                        console.log('error en la consulta SELECT de items');
                        return;
                    }
                    if (filas.length>0) {
                        res.render('verItems1',{items:filas});
                    }
                    else
                    {
                        res.render('MensajesAlUsuario',{mensaje:'Something wrong happens.. Sorry'});
                    } 

                });//query select 2 de items
    
            } //else filas es cero

        });//query select items
    
});


router.get('/modificar/:id_item/:id_folder', function(req, res, next) {
  var id_item= req.params.id_item;
  var id_folder= req.params.id_folder;
  
  var consulta  ="select  * from items where id_item =" + id_item;
console.log(consulta);

  bd.query(consulta, function(error,filas){
            if (error) {            
                console.log('error en la modificacion');
                return;
            }
            if (filas.length>0) {
                res.render('modificarItems',{items:filas});
            } else {
                res.render('MensajesAlUsuario',{mensaje:'Sorry, the item does not exist'});
            }    
        });
});


router.post('/confirmarModificacion',  function(req, res, next) {

    if ((req.body.hecho==1) || (req.body.hecho==true)|| (req.body.hecho=="on")){
        v_hecho=true;
    }
    else{
        v_hecho=false;
    }
    console.log(req.body.id_item);
    console.log(req.body.descripcion);
console.log(req.body.hecho);
console.log(req.body.id_folder);
console.log(v_hecho);

     var registro={
        descripcion:req.body.descripcion,
        hecho:req.body.hecho,
      };
      console.log("cargo variable registro");

      consulta ="UPDATE items SET descripcion= '" + req.body.descripcion  +"' , hecho= " + v_hecho +  " WHERE id_item = " + req.body.id_item
      console.log(consulta);

    bd.query(consulta, function(error,filas){
    console.log('consulta');
    if (error) {            
        console.log('error en UPDATE');
        console.log(error);
        return;
    }
    else{
        console.log('en CONFIRMAR MODIFICACION va a hacer select de items')
        consulta = "select items.hecho, items.descripcion, items.id_item, folders.nombre,folders.id_folder, usuarios.id_usuario, usuarios.usuario from items INNER JOIN folders ON folders.id_folder=items.id_folder INNER JOIN usuarios ON usuarios.id_usuario=folders.id_usuario WHERE items.id_folder = " + req.body.id_folder +" order by item.descripcion";
      
          console.log(consulta);
      
          bd.query(consulta, function(error,filas){
                  if (error) {            
                      console.log('error en CONFIRMAR MODIFICACIONla consulta SELECT de items 2');
                      return;
                  }
                  if (filas.length>0) {
                      res.render('verItems',{items:filas});
                  } 
              });//query select items

    }

});//query de UPDATE


});


router.get('/baja/:id_item/:id_folder',  function(req, res, next) {
    var id_item = req.params.id_item;
    var id_folder = req.params.id_folder;

    var consulta  ="delete FROM items where id_item =" + id_item;
    bd.query(consulta, function(error,filas){
              if (error) {            
                  console.log('error en delete');
                  console.log(error);
                  return;
              }
          }); //query delete
          

          console.log('en BAJA va a hacer select de items')
          consulta = "select items.hecho, items.descripcion, items.id_item, folders.nombre,folders.id_folder, usuarios.id_usuario, usuarios.usuario from items INNER JOIN folders ON folders.id_folder=items.id_folder INNER JOIN usuarios ON usuarios.id_usuario=folders.id_usuario WHERE items.id_folder = " + id_folder +" order by item.descripcion";
        
            console.log(consulta);
        
            bd.query(consulta, function(error,filas){
                    if (error) {            
                        console.log('error en la consulta SELECT de items');
                        return;
                    }
                    if (filas.length>0) {
                        res.render('verItems',{items:filas});
                    } 
                    else{
                        // si viene por aca, no quedaron items y hay que llamar a verItems1
                        consulta = "select folders.nombre, usuarios.usuario, usuarios.id_usuario, folders.id_folder from folders INNER JOIN USUARIOS ON folders.id_usuario=usuarios.id_usuario WHERE folders.id_folder= " + id_folder; 
                        
                        console.log ('segundo select  items ');
                        console.log (consulta);
                        bd.query(consulta, function(error,filas){
                                if (error) {            
                                    console.log('error en la consulta SELECT de items');
                                    return;
                                }
                                if (filas.length>0) {
                                    res.render('verItems1',{items:filas});
                                }
                                else
                                {
                                    res.render('MensajesAlUsuario',{mensaje:'Something wrong happens.. Sorry'});
                                } 

                            });//query select 2 de items
                    }
                });//query select items
  });

  module.exports = router;
