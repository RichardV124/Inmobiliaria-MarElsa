
/*
 * GET users listing.
 */
exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM persona',function(err,rows)
        {
            
            if(err)
             res.send('{"id": 404,"msj": "Hubo un error al listar las personas"}');
     
            res.send({data:rows});
           
         });
         
         console.log(query.sql);
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

exports.edit = function(req,res){
    
    console.log(req.body);
    var input = JSON.parse(JSON.stringify(req.body));

    console.log(input);
    
    req.getConnection(function (err, connection) {
        
        var personal = {
            
            cedula : input.cedula,
            nombre    : input.nombre,
            apellido : input.apellido,
            fecha_nacimiento : input.fecha_nacimiento,
            experiencia : input.experiencia,
          //  tipo_id : input.tipo_id.tipo_id,
            formacion   : input.formacion,
            direccion : input.direccion,
          //  login_username : input.login_username
//            rol : input.rol      
        };

      var query = connection.query("UPDATE personal set ? WHERE cedula = ? ",[personal,personal.cedula], function(err, rows)
        {
  
          if (err)
          res.send('{"id": 404,"msj": "Hubo un error al editar el personal"}');

          res.send('{"id": 505,"msj": "Se edito correctamente"}');
         // res.redirect('/customers');
          
        });

        console.log(query.sql); //get raw query
    
    });
};


exports.delete = function(req,res){
          
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input);

    var personal = {
            
        cedula : input.cedula,
        login_username : input.login.username,

    };
    
     req.getConnection(function (err, connection) {
        
       var query = connection.query("DELETE FROM personal  WHERE cedula = ? ",[personal.cedula], function(err, rows)
        {
            
             if(err)
                 res.send('{"id": 404,"msj": "Hubo un error al eliminar el personal"}');
            
              //   res.send('{"id": 505,"msj": "Se elimino correctamente"}');
             
        });

        var query2= connection.query("DELETE FROM login  WHERE username = ? ",[personal.login_username], function(err, rows)
        {
             if(err){
                 connection.rollback();
                 res.send('{"id": 404,"msj": "Hubo un error al eliminar el login"}');
                }
            
                 res.send('{"id": 505,"msj": "Se elimino correctamente"}');
             
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
        
        var personal = {
            
            cedula : input.cedula,
            nombre    : input.nombre,
            apellido : input.apellido,
            fecha_nacimiento : input.fecha_nacimiento,
            experiencia : input.experiencia,
            tipo_id : input.tipo_id.id,
            formacion   : input.formacion,
            direccion : input.direccion,
            login_username : input.login.username,
            rol_id : input.rol.id
        
        };

        var login = {
            
            username    : input.login.username,
            contrasenia : input.login.contrasenia
        
        };

        console.log(login);
        
        var query = connection.query("INSERT INTO login set ? ",login, function(err, rows)
        {
            if (err)
            res.send('{"id": 404,"msj": "Hubo un error al insertar el login"}');
       
        //res.send('{"id": 505,"msj": "Se registro correctamente"}');
        
      });

        var query2 = connection.query("INSERT INTO personal set ? ",personal, function(err, rows)
        {
  
          if (err)
          connection.
          res.send('{"id": 404,"msj": "Hubo un error al insertar el personal"}');
         
          res.send('{"id": 505,"msj": "Se registro correctamente el personal"}');
          
        });
        
        console.log(query.sql); //get raw query
        console.log(query2.sql);
    
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