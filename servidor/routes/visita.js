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