
/*
 * GET property listing.
 */

exports.list = function(req, res){

    req.getConnection(function(err,connection){
         
          var query = connection.query('SELECT * FROM inmueble',function(err,rows)
          {
              
              if(err)
                  console.log("Error Selecting : %s ",err );
       
              res.send({data:rows});
                  
             
           });
           
           //console.log(query.sql);
      });
    
  };

  /*
 * GET type property listing.
 */

exports.listTipoInmueble = function(req, res){

    req.getConnection(function(err,connection){
         
          var query = connection.query('SELECT * FROM tipo_inmueble',function(err,rows)
          {
              
              if(err)
                  console.log("Error Selecting : %s ",err );
       
              res.send({data:rows});
                  
             
           });
           
           console.log(query.sql);
      });
    
  };
  
  exports.search = function(req, res){
      
      var id = req.params.id;
      req.getConnection(function(err,connection){
         
          var query = connection.query('SELECT * FROM inmueble WHERE id = ?',[id],function(err,rows)
          {
              
              if(err)
                  console.log("Error Selecting : %s ",err );
       
                  console.log(query.sql);
                  console.log({data:rows[0]})
              res.send({data:rows[0]});
                  
             
           });
           
           //console.log(query.sql);
      }); 
  };
  
  /*Save the property*/
  exports.save = function(req,res){
      
      var input = JSON.parse(JSON.stringify(req.body));
      
      req.getConnection(function (err, connection) {
          
          var data = {
              
              direccion : input.direccion,
              area : input.area,
              tipo_inmueble_id : input.tipo_inmueble_id,
              valor : input.valor,
              promocion : input.promocion,
              numeroHabitaciones : input.numeroHabitaciones,
              numeroBanios : input.numeroBanios,
              pisos : input.pisos               
          
          };
          
          var query = connection.query("INSERT INTO inmueble set ? ",data, function(err, rows)
          {
    
            if (err)
                console.log("Error inserting : %s ",err );
           
            res.send('{"id": 505,"msj": "Se registro correctamente"}');
            
          });
          
          console.log(query.sql); //get raw query
      
      });
  };
  
  exports.save_edit = function(req,res){
      
      console.log(req.body);
      var input = JSON.parse(JSON.stringify(req.body));
      var id = req.params.id;
      
      req.getConnection(function (err, connection) {
          
          var data = {
            direccion : input.direccion,
            area : input.area,
            tipo_inmueble_id : input.tipo_inmueble_id,
            valor : input.valor,
            promocion : input.promocion,
            num_habitaciones : input.num_habitaciones,
            num_banios : input.num_banios,
            pisos : input.pisos 
          
          };
          
          connection.query("UPDATE inmueble set ? WHERE id = ? ",[data,input.id], function(err, rows)
          {
    
            if (err)
                console.log("Error Updating : %s ",err );
           res.send('Se edito correctamente');
           // res.redirect('/customers');
            
          });
      
      });
  };
  
  
  exports.delete_inmueble = function(req,res){
            
       var id = req.params.id;
      
       req.getConnection(function (err, connection) {
          
          connection.query("DELETE FROM inmueble  WHERE id = ? ",[id], function(err, rows)
          {
              
               if(err)
                   console.log("Error deleting : %s ",err );
              
                   res.send('{"id": 505,"msj": "Se elimino correctamente"}');
               
          });
          
       });
  };