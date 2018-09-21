/**
 * Lista de municipios por departamentos
 */
exports.list = function(req, res){
    var depto = req.params.id;
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM municipio WHERE departamento_id = ?',[depto],function(err,rows)
        {
            
            if(err)
            res.send('{"id": 404,"msj": "Hubo un error al buscar el departamento"}');
     
            res.send({data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
};

exports.search = function(req, res){
      
    var id = req.params.id;
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM municipio WHERE id = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.send({data:rows[0]});
                
           
         });
         
         console.log(query.sql);
    }); 
};
