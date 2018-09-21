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

exports.search = function(req, res){
      
    var id = req.params.id;
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM departamento WHERE id = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.send({data:rows[0]});
                
           
         });
         
         console.log(query.sql);
    }); 
};
