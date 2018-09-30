
/*
 * GET users listing.
 */

exports.list = function(req, res){

    req.getConnection(function(err,connection){
         
          var query = connection.query
          ('SELECT p.*,l.*,tp.id tipo_id,tp.descripcion descripcion_tipo,m.nombre nombre_municipio FROM persona p JOIN empleado e ON e.persona_cedula=cedula JOIN login l ON p.cedula=l.persona_cedula JOIN tipo_personal tp ON e.tipo_id=tp.id JOIN municipio m ON m.id=p.municipio_id WHERE rol_id=2 AND l.activo = 1;',function(err,rows)
          {
              
              if(err)
                  console.log("Error Selecting : %s ",err );
       
              res.send({data:rows});
                  
             
           });
           
           //console.log(query.sql);
      });
    
  };

/**
 * Busca una persona por su cedula
 */
exports.search = function(req, res){
    
    var cedula = req.params.cedula;
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM persona WHERE cedula = ?',[cedula],function(err,rows)
        {
            
            if(err)
            res.send('{"id": 404,"msj": "Hubo un error al buscar la persona"}');
     
            console.log({data:rows[0]});
            res.send({data:rows[0]});
                
           
         });
         
         console.log(query.sql);
    }); 
};


/**
 * Busca un empleado por su cedula
 */
exports.searchEmpleado = function(req, res){
    
    var cedula = req.params.cedula;
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT p.*,l.*,tp.id tipo_id,tp.descripcion descripcion_tipo,m.nombre nombre_municipio FROM persona p JOIN empleado e ON e.persona_cedula=cedula JOIN login l ON p.cedula=l.persona_cedula JOIN tipo_personal tp ON e.tipo_id=tp.id JOIN municipio m ON m.id=p.municipio_id WHERE cedula = ?',[cedula],function(err,rows)
        {
            
            if(err)
            res.send('{"id": 404,"msj": "Hubo un error al buscar el empleado"}');
     
            console.log({data:rows[0]});
            res.send({data:rows[0]});
                
           
         });
         
         console.log(query.sql);
    }); 
};

 /*Save the login empleado*/
 exports.save = function(req,res){
      
    var input = JSON.parse(JSON.stringify(req.body));
    
console.log(input);

    req.getConnection(function (err, connection) {

      var persona = {
            
          nombre    : input.nombre,
          apellido : input.apellido,
          fecha_nacimiento : input.fecha_nacimiento,
          cedula : input.cedula,
          direccion : input.direccion,
          telefono : input.telefono,
          correo   : input.correo,              
          rol_id : input.rol_id,
          municipio_id : input.municipio_id,
          genero : input.genero
      };

      var login = {
            
            username    : input.username,
            contrasenia : input.contrasenia,
            persona_cedula : input.cedula
        
        };

        var empleado = {
            
            tipo_id    : input.tipo_id,
            persona_cedula : input.cedula
        
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
       
       // res.send('{"id": 505,"msj": "Se registró correctamente"}');
        
      });

      var query3 = connection.query("INSERT INTO empleado set ? ",empleado, function(err, rows)
      {
          if (err)
          console.log("Error inserting : %s ",err );
     
      res.send('{"id": 505,"msj": "Se registró correctamente"}');
      
    });
     
        console.log(query.sql); //get raw query
        console.log(query2.sql);
        console.log(query3.sql);
    });
};

exports.listTipoPersonal = function(req, res){

    req.getConnection(function(err,connection){
         
          var query = connection.query('SELECT * FROM tipo_personal',function(err,rows)
          {
              
              if(err)
              res.send('{"id": 404,"msj": "Hubo un error al listar el tipo personal"}');
       
              res.send({data:rows});
                  
             
           });
           
           console.log(query.sql);
      });
    
  };

  exports.edit = function(req,res){
    
    console.log(req.body);
    var input = JSON.parse(JSON.stringify(req.body));

    console.log(input);
    
    req.getConnection(function (err, connection) {
        
        var persona = {
            
            nombre    : input.nombre,
            apellido : input.apellido,
            fecha_nacimiento : input.fecha_nacimiento,
            cedula : input.cedula,
            direccion : input.direccion,
            telefono : input.telefono,
            correo   : input.correo,              
            rol_id : input.rol_id,
            municipio_id : input.municipio_id,
            genero : input.genero
        };
  
          var empleado = {
              
              tipo_id    : input.tipo_id,
              persona_cedula : input.cedula
          
          };   

      var query = connection.query("UPDATE persona set ? WHERE cedula = ? ",[persona,persona.cedula], function(err, rows)
        {
  
          if (err)
          res.send('{"id": 404,"msj": "Hubo un error al editar el personal"}');

       //   res.send('{"id": 505,"msj": "Se edito correctamente"}');
         // res.redirect('/customers');
          
        });

        var query2 = connection.query("UPDATE empleado set ? WHERE persona_cedula = ? ",[empleado,persona.cedula], function(err, rows)
        {
  
          if (err)
          res.send('{"id": 404,"msj": "Hubo un error al editar el personal"}');

          res.send('{"id": 505,"msj": "Se edito correctamente"}');
         // res.redirect('/customers');
          
        });

        console.log(query.sql); //get raw query
        console.log(query2.sql);
    });
};


exports.delete = function(req,res){
    
    console.log(req.body);
    var input = JSON.parse(JSON.stringify(req.body));

    console.log(input);
    
    req.getConnection(function (err, connection) {
        
        var persona = {
            
            persona_cedula    : input.cedula,
            activo : 0
        };

      var query = connection.query("UPDATE login set ? WHERE persona_cedula = ? ",[persona,persona.persona_cedula], function(err, rows)
        {
  
            if (err)
            res.send('{"id": 404,"msj": "Hubo un error al editar el personal"}');
  
            res.send('{"id": 505,"msj": "Se elimino correctamente"}');
           // res.redirect('/customers');
            
          });

        console.log(query.sql); //get raw query
    });
};
