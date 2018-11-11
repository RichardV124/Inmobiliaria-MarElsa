/**
 * Lista de una tabla determinada
 */
exports.listar = function(req, res){
    // Objetenmos los datos enviados desde el cliente
    var data = JSON.parse(JSON.stringify(req.body));
    // Tabla donde va a ir a consultar
    var tabla = data.tabla;
    // Objeto con los parametros a filtrar
    var parametros = data.objeto;
    // La consulta a ejecutar
    var sql = "SELECT * FROM "+tabla;
    if(parametros != null){
      sql += " WHERE ";
      var sum = 0;
      // cantidad de parametros en el objeto
      var size = Object.keys(parametros).length;
      for (var key in parametros) {
          if(sum != 0 && sum != size){
                sql += " AND ";
          }
          sql += key+" = "+parametros[key];
          sum++;
      }
    }
    // Ejecutamos la consulta y retornamos
    req.getConnection(function(err,connection){
          var query = connection.query(sql,function(err,rows){
              if(err){
                  res.send({data:err.code});
                  console.log("Error Selecting : %s ",err );
              }else{
                  res.send({data:rows});
              }
           });
      });
};