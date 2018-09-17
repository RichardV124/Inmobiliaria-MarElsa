/*
 * GET users listing.
 */

exports.list = function(req, res){

    req.getConnection(function(err,connection){
         
          var query = connection.query('SELECT * FROM cliente',function(err,rows)
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
         
          var query = connection.query('SELECT * FROM cliente WHERE cedula = ?',[cedula],function(err,rows)
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
          
          connection.query("UPDATE cliente set ? WHERE cedula = ? ",[data,cedula], function(err, rows)
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
          
          connection.query("DELETE FROM cliente  WHERE cedula = ? ",[cedula], function(err, rows)
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
          
          var cliente = {
              
              nombre    : input.nombre,
              apellido : input.apellido,
              fecha_nacimiento : input.fecha_nacimiento,
              cedula : input.cedula,
              direccion : input.direccion,
              telefono : input.telefono,
              correo   : input.correo,
              login_username : input.login_username.username
          
          };
  
          var login = {
              
              username    : input.login_username.username,
              contrasenia : input.login_username.contrasenia
          
          };
          console.log(login);
          
          var query = connection.query("INSERT INTO login set ? ",login, function(err, rows)
          {
              if (err)
              console.log("Error inserting : %s ",err );
         
          //res.send('{"id": 505,"msj": "Se registro correctamente"}');
          
        });
  
          var query2 = connection.query("INSERT INTO cliente set ? ",cliente, function(err, rows)
          {
    
            if (err)
                console.log("Error inserting : %s ",err );
           
            res.send('{"id": 505,"msj": "Se registró correctamente el cliente"}');
            
          });
          
          console.log(query.sql); //get raw query
          console.log(query2.sql);
      });
  };