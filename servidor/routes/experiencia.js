 /*Registra una experiencia de un empleado en la base de datos*/
 exports.saveExperiencia = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input);

    req.getConnection(function (err, connection) {

        var experiencia = {

            fecha_inicio : input.fecha_inicio,
            fecha_fin : input.fecha_fin,
            cargo : input.cargo,
            nom_empresa : input.nom_empresa,
            persona_cedula : input.persona_cedula.cedula,
            nombre_certificado : input.nombre_certificado,
            telefono : input.telefono,
            direccion : input.direccion
        
        };
        console.log(experiencia);
        
        var query = connection.query("INSERT INTO experiencia set ? ",experiencia, function(err, rows)
        {
            if (err)
            res.send('{"id": 600,"msj": "Hubo un error al registrar la experiencia"}');
       
        res.send('{"id": 505,"msj": "Se registro correctamente la experiencia"}');
        
      });

        console.log(query.sql); //get raw query
    
    });
};

/**
 * Lista de experiencias por persona
 */
exports.listarExperiencias = function(req, res){
    // Obtenemos los parametro
    var cedula = req.params.cedula;
    req.getConnection(function(err,connection){
          var query = connection.query('SELECT * FROM experiencia WHERE persona_cedula = ?',[cedula],function(err,rows)
          {
                 if(err)
                   res.send('{"id": 404,"msj": "Hubo un error al listar las experiencias de la persona"}');   

                 res.send({data:rows});  
            });

      console.log(query.sql);
     });
 };

 /**
 * Buscar experiencia por id
 */
exports.searchExperiencia = function(req, res){
    // Obtenemos los parametro
    var id = req.params.id;
    req.getConnection(function(err,connection){
          var query = connection.query('SELECT * FROM experiencia WHERE id = ?',[id],function(err,rows)
          {
                 if(err)
                   res.send('{"id": 404,"msj": "Hubo un error al buscar la experiencia"}');   

                 res.send({data:rows[0]});  
            });

      console.log(query.sql);
     });
 };