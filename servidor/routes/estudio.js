 /*Registra un estudio de un empleado en la base de datos*/
 exports.saveEstudio = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input);

    req.getConnection(function (err, connection) {

        var estudio = {

            descripcion : input.descripcion,
            institucion : input.institucion,
            persona_cedula : input.persona_cedula.cedula,
            nombre_certificado : input.nombre_certificado,
            telefono : input.telefono,
            direccion : input.direccion
        
        };
        console.log(estudio);
        
        var query = connection.query("INSERT INTO estudio set ? ",estudio, function(err, rows)
        {
            if (err)
            res.send('{"id": 600,"msj": "Hubo un error al registrar el estudio"}');
       
        res.send('{"id": 505,"msj": "Se registro correctamente el estudio"}');
        
      });

        console.log(query.sql); //get raw query
    
    });
};

 /**
 * Lista de estudios por persona
 */
exports.listarEstudios = function(req, res){
    // Obtenemos los parametro
    var cedula = req.params.cedula;
    req.getConnection(function(err,connection){
          var query = connection.query('SELECT * FROM estudio WHERE persona_cedula = ?',[cedula],function(err,rows)
          {
                 if(err)
                   res.send('{"id": 404,"msj": "Hubo un error al listar los estudios de la persona"}');   

                 res.send({data:rows});  
            });

      console.log(query.sql);
     });
 };

  /**
 * Buscar estudio por id
 */
exports.searchEstudio = function(req, res){
    // Obtenemos los parametro
    var id = req.params.id;
    req.getConnection(function(err,connection){
          var query = connection.query('SELECT * FROM estudio WHERE id = ?',[id],function(err,rows)
          {
                 if(err)
                   res.send('{"id": 404,"msj": "Hubo un error al buscar el estudio"}');   

                 res.send({data:rows[0]});  
            });

      console.log(query.sql);
     });
 };