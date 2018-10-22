exports.save = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    // console.log(input);

    req.getConnection(function (err, connection) {

        var data = {
            descripcion: input.descripcion,
            inmueble_id: input.inmueble_id.id,
            cliente_cedula: input.cliente_cedula.cedula,
            empleado_cedula: input.empleado_cedula.cedula,
            activo: 1
        };

        var query = connection.query("INSERT INTO venta set ? ", data, function (err, rows) {

            if (err)
            res.send('{"id": 404,"msj": "El registro ha fallado"}');
       
        res.send('{"id": 505,"msj": "Registro exitoso"}');

        });

    });
};

exports.saveVenta = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {

        var data = {
            inmueble_id: input.inmueble_id.id,
            cliente_cedula: input.cliente_cedula.cedula,
            empleado_cedula: input.empleado_cedula.cedula,
            visita_id: input.visita_id.id, 
            activo: 1
        };
       
        var query = connection.query("INSERT INTO venta set ? ", data, function (err, rows) {

            if (err)
            res.send('{"id": 404,"msj": "El registro ha fallado"}');
       
        res.send('{"id": 505,"msj": "Registro exitoso"}');

        });

    });
};





exports.buscarPorInmuebleId = function (req, res) {

    var id = req.params.inmueble_id;
    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT * FROM venta WHERE inmueble_id = ?', [id], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.send({
                data: rows[0]
            });

        });

        //console.log(query.sql);
    });
};

exports.activar = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {

        connection.query("UPDATE venta SET activo = 1 WHERE id = ? ", [input.id], function (err, rows) {

            if (err)
            res.send('{"id": 404,"msj": "Hubo un error al activar"}');
       
        res.send('{"id": 505,"msj": "Se activó correctamente"}');

        });

    });
};

exports.delete = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {

        connection.query("UPDATE venta SET activo = 0 WHERE id = ? ", [input.id], function (err, rows) {

            if (err)
            res.send('{"id": 404,"msj": "Hubo un error al eliminar"}');
       
        res.send('{"id": 505,"msj": "Se eliminó correctamente"}');

        });

    });

};


exports.buscarPorInmbuebleyCedula = function (req, res) {

    var cliente_cedula = req.params.cliente_cedula;
    var inmueble_id = req.params.inmueble_id;
    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT * FROM visita WHERE cliente_cedula = ? AND inmueble_id = ?;',[cliente_cedula,inmueble_id],function (err, rows) 
        {
            if (err)
            res.send('{"id": 404,"msj": "Hubo un error al listar las visitas"}');

            res.send({data:rows[0]});

        });

        //console.log(query.sql);
    });
};

/**
 * Lista de departamentos
 */
exports.listVentas = function(req, res){
    req.getConnection(function(err,connection){
          var query = connection.query('select v.*, i.matricula  from venta v join inmueble i on v.inmueble_id = i.id;',function(err,rows)
          {
              if(err)
              res.send('{"id": 404,"msj": "Hubo un error al listar las ventas"}');    

            res.send({data:rows});  
                
           });
      });
};

exports.listVentasPorId = function(req, res){

    var id = req.params.id;
    req.getConnection(function(err,connection){
        var query = connection.query('select * from venta where id = ?;',[id],function(err,rows)
        {
            if(err)
            res.send('{"id": 404,"msj": "Hubo un error al listar las ventas"}');    

          res.send({data:rows[0]});  
              
         });
    });
}