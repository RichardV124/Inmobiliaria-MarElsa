/**
 * Lista de departamentos
 */
exports.list = function(req, res){
    req.getConnection(function(err,connection){
          var query = connection.query('SELECT * FROM departamento',function(err,rows)
          {
              if(err)
              res.send('{"id": 404,"msj": "Hubo un error al listar los departamentos"}');    

            res.send({data:rows});  
                
           });
      });
};
