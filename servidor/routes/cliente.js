/*
 * GET users listing.
 */

exports.list = function(req, res){

    req.getConnection(function(err,connection){
         
          var query = connection.query('SELECT * FROM persona WHERE rol_id=2;',function(err,rows)
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
         
          var query = connection.query('SELECT * FROM persona WHERE cedula = ?',[cedula],function(err,rows)
          {
              
              if(err)
                  console.log("Error Selecting : %s ",err );
       
              res.send({data:rows[0]});
                  
             
           });
           
           console.log(query.sql);
      }); 
  };
  
  exports.edit = function(req,res){
      
      console.log(req.body);
      var input = JSON.parse(JSON.stringify(req.body));
      var cedula = req.params.cedula;
      
      req.getConnection(function (err, connection) {
          
          var data = {
              nombre    : input.nombre,
              apellido : input.apellido,
              fechaNacimiento : input.fechaNacimiento,
              direccion : input.direccion,
              telefono : input.telefono,
              correo   : input.correo,
          
          };
          
          connection.query("UPDATE persona set ? WHERE cedula = ? ",[data,cedula], function(err, rows)
          {
    
            if (err)
                console.log("Error Updating : %s ",err );
           res.send('Se edito correctamente');
           // res.redirect('/customers');
            
          });
      
      });
  };
  
  
  exports.delete = function(req,res){
            
       var cedula = req.params.cedula;
      
       req.getConnection(function (err, connection) {
          
          connection.query("DELETE FROM persona  WHERE cedula = ? ",[cedula], function(err, rows)
          {
              
               if(err)
                   console.log("Error deleting : %s ",err );
              
                   res.send('{"id": 505,"msj": "Se elimino correctamente"}');
               
          });
          
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
            genero : input.persona_cedula.genero
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