/**
 * Iniciar sesion en la aplicacion
 */
exports.login = function(req, res){
    // Obtenemos los parametro
    var username = req.params.username;
    var contrasenia = req.params.contrasenia
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM login WHERE username = ? and contrasenia = ?',[username,contrasenia],function(err,rows){
            if(err)
                console.log("Error Selecting : %s ",err );
                res.send({data:rows[0]});
         });

         console.log(query.sql);
    });
};

/**
 * Buscar login por persona
 */
exports.loginByPersona = function(req, res){
    var persona = req.params.persona;
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM login WHERE persona_cedula = ?',[persona],function(err,rows){
            if(err)
                console.log("Error Selecting : %s ",err );
                res.send({data:rows[0]});
         });
    });
};

/**
 * Lista de login
 */
exports.listar = function(req, res){
    req.getConnection(function(err,connection){
          var query = connection.query('SELECT * FROM login',function(err,rows){
                if(err)
                    console.log("Error Selecting : %s ",err );
                    res.send({data:rows});  
                    console.log(rows);
           });
      });
};

/**
 * Buscar persona por cedula
 */
exports.personaByCedula = function(req, res){
    var cedula = req.params.cedula;
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM persona WHERE cedula = ?',[cedula],function(err,rows){
            if(err)
                console.log("Error Selecting : %s ",err );
                res.send({data:rows[0]});
         });
    });
};

/**
 * Lista de personas
 */
exports.listarPersonas = function(req, res){
    req.getConnection(function(err,connection){
          var query = connection.query('SELECT * FROM persona',function(err,rows){
                if(err)
                    console.log("Error Selecting : %s ",err );
                    res.send({data:rows});  
           });
      });
};
  