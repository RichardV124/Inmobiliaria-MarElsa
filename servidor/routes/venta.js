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


exports.buscarVisitaId = function (req, res) {

    var id = req.params.visita_id;
    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT * FROM visita WHERE id = ?', [id], function (err, rows) {

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
 * Lista de ventas
 */
exports.listVentas = function(req, res){
    req.getConnection(function(err,connection){
          var query = connection.query('select v.*, i.matricula, i.id as inmueble_id, vi.fecha, vi.hora  from venta v join inmueble i on v.inmueble_id = i.id left join visita vi on v.visita_id = vi.id where v.activo = 1;',function(err,rows)
          {
              if(err)
              res.send('{"id": 404,"msj": "Hubo un error al listar las ventas"}');    

            res.send({data:rows});  
                
           });
      });
};

exports.save_update = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {

        var data = {
            id: input.id,
            cliente_cedula: input.cliente_cedula.cedula,
            empleado_cedula: input.empleado_cedula.cedula,
            visita_id: input.visita_id.id,
            inmueble_id: input.inmueble_id.id,
            activo: 1
        };

        connection.query("UPDATE venta SET ? WHERE id = ? ", [data, input.id], function (err, rows) {
            if (err)
            res.send('{"id": 404,"msj": "Hubo un error al editar la venta"}');
       
        res.send('{"id": 505,"msj": "Se edito correctamente la venta"}');

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


exports.buscarVisitaIdInmueble = function (req, res) {

    var id = req.params.visita_id;
    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT * FROM visita WHERE inmueble_id = ?', [id], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.send({
                data: rows[0]
            });

        });

        //console.log(query.sql);
    });
};

/**
 * Lista el ultimo registro de la venta
 */
exports.listUltimaVenta = function(req, res){
    req.getConnection(function(err,connection){
          var query = connection.query('select * from venta order by id desc limit 1;',function(err,rows)
          {
              if(err)
              res.send('{"id": 404,"msj": "Hubo un error al listar las ventas"}');    

            res.send({data:rows[0]});  
                
           });
      });
};
/**-------------------------contrato----------- */
exports.saveContrato = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {

        var data = {
            descripcion: input.descripcion,
            contrato: input.contrato,
            venta_id: input.venta_id.id, 
            precio: input.precio,
            fecha: input.fecha,
            activo: input.activo
        };
       
        var query = connection.query("INSERT INTO contrato set ? ", data, function (err, rows) {

            if (err)
            res.send('{"id": 404,"msj": "El registro ha fallado"}');
       
        res.send('{"id": 505,"msj": "Registro exitoso"}');

        });

    });
};

/**
 * Lista de contratos
 */
exports.listContratos = function(req, res){
    req.getConnection(function(err,connection){
          var query = connection.query('SELECT id,descripcion, contrato, venta_id, precio, substring(fecha,1) as fecha FROM contrato where activo = 1;',function(err,rows)
          {
              if(err)
              res.send('{"id": 404,"msj": "Hubo un error al listar las ventas"}');    

            res.send({data:rows});  
                
           });
      });
};

exports.update_contrato = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {

    console.log(input.id);
    console.log(input.descripcion);
    console.log(input.precio);
    console.log(input.fecha);


        var data = {
            id: input.id,
            descripcion: input.descripcion,
            precio: input.precio,
            fecha: input.fecha,
            activo: 1
        };

        connection.query("UPDATE contrato SET ? WHERE id = ? ", [data, input.id], function (err, rows) {
            if (err)
            res.send('{"id": 404,"msj": "Hubo un error al editar el contrato"}');
       
        res.send('{"id": 505,"msj": "Se edito correctamente el contrato"}');

        });

    });
};

exports.delete_contrato = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {

        connection.query("UPDATE contrato SET activo = 0 WHERE id = ? ", [input.id], function (err, rows) {

            if (err)
            res.send('{"id": 404,"msj": "Hubo un error al eliminar"}');
       
        res.send('{"id": 505,"msj": "Se eliminó correctamente"}');

        });

    });

};