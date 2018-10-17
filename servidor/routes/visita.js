/*
 * Lista las visitas por su estado
 */
exports.listarPorEstado = function(req, res){

    var estado = req.params.estado;
    req.getConnection(function(err,connection){
         
          var query = connection.query
          ('SELECT * FROM visita v WHERE v.estado = ?;',[estado],function(err,rows)
          {
              
              if(err)
              res.send('{"id": 404,"msj": "Hubo un error al listar las visitas"}');
       
              res.send({data:rows});
                  
             
           });
           
           //console.log(query.sql);
      });
    
  };

/*
 * Asigna una visita a un empleado, en un horario disponible
 */
  exports.asignarVisita = function(req,res){
    
    console.log(req.body);
    var input = JSON.parse(JSON.stringify(req.body));

    console.log(input);
    
    req.getConnection(function (err, connection) {
        
        var visita = {
            
            id: input.id,
            empleado_cedula    : input.empleado_cedula.persona_cedula.cedula,
            // Cambiamos el estado por atendido
            estado: 3

        };

        var query = connection.query("UPDATE visita v set ? WHERE v.id = ? ",[visita,visita.id], function(err, rows)
        {
  
          if (err)
          res.send('{"id": 600,"msj": "Hubo un error al asignar la visita"}');

          res.send('{"id": 505,"msj": "Se asigno correctamente la visita"}');
         // res.redirect('/customers');
          
        });

        console.log(query.sql); //get raw query

    });
  };

  /*Guarda una visita*/
  exports.saveVisitaCliente = function(req,res){
      
    var input = JSON.parse(JSON.stringify(req.body));
    
console.log(input);

    req.getConnection(function (err, connection) {

      var visita = {
          cliente_cedula : input.cliente_cedula.cedula,
          tipo_visita : input.tipo_visita,
          descripcion : input.descripcion,
          estado : input.estado,
          fecha : input.fecha,
          hora : input.hora
      };

        var query = connection.query("INSERT INTO visita set ? ",visita, function(err, rows)
        {
  
          if (err)
              res.send('{"id": 404,"msj": "Error al registrar la visita"}');    
              
        res.send('{"id": 505,"msj": "Registro exitoso"}');       
              });
        console.log(query.sql);
    });                                 
};

/*
 * Lista las visitas de un cliente por su estado
 */
exports.listarPorClienteAndEstado = function(req, res){

    var estado = req.params.estado;
    var cliente = req.params.cliente;
    req.getConnection(function(err,connection){
         
          var query = connection.query('SELECT * FROM visita WHERE cliente_cedula = ? AND estado = ?;',[cliente,estado],function(err,rows)
          {
              
              if(err)
                  console.log("Error Selecting : %s ",err );
       
              res.send({data:rows});
                  
             
           });
           
           //console.log(query.sql);
      });
    
  };

exports.delete = function(req,res){
          
    var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        var query= connection.query("DELETE FROM visita  WHERE id = ? ",[id], function(err, rows)
        {
             if(err)
                 res.send('{"id": 404,"msj": "Hubo un error al eliminar la visita"}');
            
        res.send('{"id": 505,"msj": "Se eliminó correctamente"}');
             
        });

        console.log(query.sql); //get raw query   
           
     });
};