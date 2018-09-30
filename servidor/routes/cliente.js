/*
 * GET users listing.
 */

exports.list = function(req, res){

    req.getConnection(function(err,connection){
         
          var query = connection.query('SELECT * FROM persona WHERE rol_id=3 AND activo=1;',function(err,rows)
          {
              
              if(err)
                  console.log("Error Selecting : %s ",err );
       
              res.send({data:rows});
                  
             
           });
           
           //console.log(query.sql);
      });
    
  };
  
  exports.search = function(req, res){
      
      var cedula = req.params.cedula;
      req.getConnection(function(err,connection){
         
          var query = connection.query('SELECT * FROM persona WHERE cedula = ? AND rol_id=3 AND activo=1;',[cedula],function(err,rows)
          {
              
              if(err)
                  console.log("Error Selecting : %s ",err );
       
              res.send({data:rows[0]});
                  
             
           });
           
           console.log(query.sql);
      }); 
  };
  
  exports.edit = function(req,res){
      
    var input = JSON.parse(JSON.stringify(req.body));
      
    console.log(input);
    
        req.getConnection(function (err, connection) {
    
          var persona = {
                
              nombre    : input.persona_cedula.nombre,
              apellido : input.persona_cedula.apellido,
              fecha_nacimiento : input.persona_cedula.fecha_nacimiento,
              cedula : input.persona_cedula.cedula,
              direccion : input.persona_cedula.direccion,
              telefono : input.persona_cedula.telefono,
              correo   : input.persona_cedula.correo,              
              rol_id : input.persona_cedula.rol_id.id,
              municipio_id : input.persona_cedula.municipio_id.id,
              genero : input.persona_cedula.genero,
              activo : input.persona_cedula.activo
          };
  
          var login = {
                
                username    : input.username,
                contrasenia : input.contrasenia,
                persona_cedula : input.persona_cedula.cedula
            
            };
            console.log(login);
  
            var query = connection.query("UPDATE persona set ? WHERE cedula = ?",[persona,persona.cedula], function(err, rows)
            {
      
              if (err)
                  console.log("Error inserting : %s ",err );                
             
              //res.send('{"id": 505,"msj": "Se registró correctamente el cliente"}');
              
            });
  
            var query2 = connection.query("UPDATE login set ? WHERE = ?",[login,login.username], function(err, rows)
            {
                if (err)
                console.log("Error inserting : %s ",err );
           
            res.send('{"id": 505,"msj": "Se Editó correctamente"}');
            
          });
         
            console.log(query.sql); //get raw query
            console.log(query2.sql);
        });
    };
  
  
//   exports.delete = function(req,res){
          
//     var input = JSON.parse(JSON.stringify(req.body));
//     console.log(input);
    
//      req.getConnection(function (err, connection) {
        
//         var query= connection.query("DELETE FROM login  WHERE username = ? ",[input.username], function(err, rows)
//         {
//              if(err){
//                  connection.rollback();
//                  res.send('{"id": 404,"msj": "Hubo un error al eliminar el login"}');
//                 }
            
//                  res.send('{"id": 505,"msj": "Se elimino correctamente"}');
             
//         });

//        var query2 = connection.query("DELETE FROM persona  WHERE cedula = ? ",[input.persona_cedula.cedula], function(err, rows)
//         {
            
//              if(err)
//                  res.send('{"id": 404,"msj": "Hubo un error al eliminar el cliente"}');
            
//               //   res.send('{"id": 505,"msj": "Se elimino correctamente"}');
             
//         });

//         console.log(query.sql); //get raw query   
//         console.log(query2.sql);
           
//      });
// };

  exports.delete = function(req,res){
          
    var input = JSON.parse(JSON.stringify(req.body));
      
    console.log(input);
    
        req.getConnection(function (err, connection) {
    
          var persona = {               
              cedula : input.cedula,
              activo : input.activo
          };
  
          var login = {
                persona_cedula : input.cedula,
                activo : input.activo
            
            };
            console.log(login);
  
            var query = connection.query("UPDATE persona set ? WHERE cedula = ?",[persona,persona.cedula], function(err, rows)
            {
      
              if (err)
                  console.log("Error inserting : %s ",err );                
             
              //res.send('{"id": 505,"msj": "Se registró correctamente el cliente"}');
              
            });
  
            var query2 = connection.query("UPDATE login set ? WHERE = ?",[login,login.username], function(err, rows)
            {
                if (err)
                console.log("Error inserting : %s ",err );
           
            res.send('{"id": 505,"msj": "Se Eliminó correctamente"}');
            
          });
         
            console.log(query.sql); //get raw query
            console.log(query2.sql);
        });
    };
  
  /*Save the login customer*/
  exports.save = function(req,res){
      
      var input = JSON.parse(JSON.stringify(req.body));
      
  console.log(input);
  
      req.getConnection(function (err, connection) {
  
        var persona = {
              
            nombre    : input.persona_cedula.nombre,
            apellido : input.persona_cedula.apellido,
            fecha_nacimiento : input.persona_cedula.fecha_nacimiento,
            cedula : input.persona_cedula.cedula,
            direccion : input.persona_cedula.direccion,
            telefono : input.persona_cedula.telefono,
            correo   : input.persona_cedula.correo,              
            rol_id : input.persona_cedula.rol_id.id,
            municipio_id : input.persona_cedula.municipio_id.id,
            genero : input.persona_cedula.genero,
            activo : input.persona_cedula.activo
        };

        var login = {
              
              username    : input.username,
              contrasenia : input.contrasenia,
              persona_cedula : input.persona_cedula.cedula
          
          };
          console.log(login);

          var query = connection.query("INSERT INTO persona set ? ",persona, function(err, rows)
          {
    
            if (err)
                console.log("Error inserting : %s ",err );                
           
            //res.send('{"id": 505,"msj": "Se registró correctamente el cliente"}');
            
          });

          var query2 = connection.query("INSERT INTO login set ? ",login, function(err, rows)
          {
              if (err)
              console.log("Error inserting : %s ",err );
         
          res.send('{"id": 505,"msj": "Se registró correctamente"}');
          
        });
       
          console.log(query.sql); //get raw query
          console.log(query2.sql);
      });
  };