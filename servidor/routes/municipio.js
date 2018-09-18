/**
 * Lista de municipios por departamentos
 */
exports.list = function(req, res){
    var depto = req.params.departmento;
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
