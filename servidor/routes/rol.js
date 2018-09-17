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
          var query = connection.query('SELECT * FROM rol_acceso',function(err,rows)
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
          var query = connection.query('SELECT a.* FROM rol_acceso ra JOIN accesos a ON a.id = ra.acceso WHERE rol = ?',[rol],function(err,rows)
          {
                 if(err)
                   res.send('{"id": 404,"msj": "Hubo un error al listar los accesos por rol"}');   

                 res.send({data:rows});  
            });

      console.log(query.sql);
     });
 };