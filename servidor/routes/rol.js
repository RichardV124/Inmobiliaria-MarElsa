/**
 * Lista de roles
 */
exports.listar = function(req, res){
    req.getConnection(function(err,connection){
          var query = connection.query('SELECT * FROM rol',function(err,rows)
          {
              if(err)
              res.send('{"id": 404,"msj": "Hubo un error al listar los roles"}');    

            res.send({data:rows});  
                
           });
      });
};

/**
 * Buscar rol por id
 */
exports.rolById = function(req, res){
      var id = req.params.id;
      req.getConnection(function(err,connection){
          var query = connection.query('SELECT * FROM rol WHERE id = ?',[id],function(err,rows)
          {
              if(err)
                 res.send('{"id": 404,"msj": "Hubo un error al buscar el rol"}');   

               res.send({data:rows[0]});
           });

           console.log(query.sql);

      });
  };

  /**
 * Buscar rol por id
 */
exports.accesoById = function(req, res){
    var id = req.params.id;
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM acceso WHERE id = ?',[id],function(err,rows)
        {
            if(err)
               res.send('{"id": 404,"msj": "Hubo un error al buscar el acceso"}');   

             res.send({data:rows[0]});
         });

         console.log(query.sql);

    });
};

/**
 * Lista de Accesos
 */
exports.listarAccesos = function(req, res){
    req.getConnection(function(err,connection){
          var query = connection.query('SELECT * FROM acceso',function(err,rows)
          {
                if(err)
                   res.send('{"id": 404,"msj": "Hubo un error al listar los accesos"}');   
  
                   res.send({data:rows});  
             });
  
             console.log(query.sql);
            });
        };

/**
 * Lista de Rol Accesos
 */
exports.listarRolAccesos = function(req, res){
    req.getConnection(function(err,connection){
          var query = connection.query('SELECT * FROM acceso_rol',function(err,rows)
          {
                if(err)
                   res.send('{"id": 404,"msj": "Hubo un error al listar los roles de los accesos"}');   
  
                   res.send({data:rows});  
             });
  
             console.log(query.sql);
            });
        };

/**
 * Lista de Accesos por Rol
 */
exports.accesosPorRol = function(req, res){
    // Obtenemos los parametro
    var rol = req.params.rol;
    req.getConnection(function(err,connection){
          var query = connection.query('SELECT a.* FROM acceso_rol ar JOIN acceso a ON a.id = ar.acceso_id WHERE ar.rol_id = ?',[rol],function(err,rows)
          {
                 if(err)
                   res.send('{"id": 404,"msj": "Hubo un error al listar los accesos por rol"}');   

                 res.send({data:rows});  
            });

      console.log(query.sql);
     });
 };

 /*Asigna un acceso a un rol*/
exports.saveAccesoRol = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input);

    req.getConnection(function (err, connection) {

        var acceso_rol = {

            rol_id : input.rol.id,
            acceso_id : input.acceso.id
        
        };
        console.log(acceso_rol);
        
        var query = connection.query("INSERT INTO acceso_rol set ? ",acceso_rol, function(err, rows)
        {
            if (err)
            res.send('{"id": 404,"msj": "Hubo un error al asignar el acceso"}');
       
        res.send('{"id": 505,"msj": "Se asigno correctamente el acceso"}');
        
      });

        console.log(query.sql); //get raw query
    
    });
};

 /*Elimina un acceso a un rol*/
 exports.deleteAccesoRol = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input);

    req.getConnection(function (err, connection) {

        var query= connection.query("DELETE FROM acceso_rol  WHERE acceso_id = ? AND rol_id = ? ",[input.rol_id,input.acceso_id], 
        function(err, rows)
        {
            if (err)
            res.send('{"id": 404,"msj": "Hubo un error al eliminar el acceso"}');
       
        res.send('{"id": 505,"msj": "Se elimino correctamente el acceso al rol"}');
        
      });

        console.log(query.sql); //get raw query
    
    });
};


 /*Buscar un acceso a un rol*/
 exports.searchAccesoRol = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {

        var acceso_rol = {

            rol_id : input.rol_id,
            acceso_id : input.acceso_id
        
        };
        console.log(acceso_rol);
        
        var query= connection.query("SELECT * FROM acceso_rol  WHERE acceso_id = ? AND rol_id = ? ",[acceso_rol.acceso_id,acceso_rol.rol_id], 
        function(err, rows)
        {
            if (err)
            res.send('{"id": 404,"msj": "Hubo un error al buscar el acceso"}');
       
            res.send({data:rows[0]});  
        
      });

        console.log(query.sql); //get raw query
    
    });
};