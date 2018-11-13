

exports.save = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {

        if (input.visita_id === undefined) {

            var data = {
                inmueble_id: input.inmueble_id.id,
                cliente_cedula: input.cliente_cedula,
                empleado_cedula: input.empleado_cedula,
                visita_id: null,
                activo: 1
            };

        } else {

            var data = {
                inmueble_id: input.inmueble_id.id,
                cliente_cedula: input.cliente_cedula,
                empleado_cedula: input.empleado_cedula,
                visita_id: input.visita_id.id,
                activo: 1
            };

        }

        

        var query = connection.query("INSERT INTO arriendo set ? ", data, function (err, rows) {

            if (err)
            res.send('{"id": 404,"msj": "El registro ha fallado"}');
             
       console.log(query.sql);
        res.send('{"id": 505,"msj": "Registro exitoso"}');

        });

    });
};

exports.search = function (req, res) { 

    var arriendo_id = req.params.arriendo_id;
    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT * FROM arriendo WHERE id = ? ORDER BY id desc',[arriendo_id], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.send({
                data: rows[0]
            });

        });
    });
};




exports.activar = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {

        connection.query("UPDATE arriendo SET activo = 1 WHERE id = ? ", [input.id], function (err, rows) {

            if (err)
            res.send('{"id": 404,"msj": "Hubo un error al activar"}');
       
        res.send('{"id": 505,"msj": "Se activó correctamente"}');

        });

    });
};

exports.delete = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {

        connection.query("UPDATE arriendo SET activo = 0 WHERE id = ? ", [input.id], function (err, rows) {

            if (err)
            res.send('{"id": 404,"msj": "Hubo un error al eliminar"}');
       
        res.send('{"id": 505,"msj": "Se eliminó correctamente"}');

        });

    });
};

exports.save_update = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {

        var data = {
            id: input.id,
            inmueble_id: input.inmueble_id,
            cliente_cedula: input.cliente_cedula,
            empleado_cedula: input.empleado_cedula,
            visita_id: input.visita_id,
            activo: 1
        };
        
        connection.query("UPDATE arriendo SET ? WHERE id = ? ", [data, input.id], function (err, rows) {
            console.log(err);
            if (err)
            res.send('{"id": 404,"msj": "Hubo un error al editar el arriendo"}');
       
        res.send('{"id": 505,"msj": "Se edito correctamente el arriendo"}');

        });

    });
};

exports.list_inmueble_arriendo = function (req, res) {

    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT * FROM INMUEBLE WHERE activo = 1 AND publicacion = 1 OR publicacion = 3', function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.send({data:rows    
            });
            


        });
    });

};

exports.list = function (req, res) {

    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT * FROM arriendo WHERE activo = 1', function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.send({data:rows});

        });
    });

};

exports.searchI = function (req, res) { 

    var inmueble_id = req.params.inmueble_id;
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM arriendo WHERE inmueble_id = ? ORDER BY id desc',[inmueble_id], function (err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);

            res.send({
                data: rows[0]
            });

        });
    });
};




exports.searchVisita = function (req, res) {

    var cliente_cedula = req.params.cliente_cedula;
    var inmueble_id = req.params.inmueble_id;
    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT * FROM visita WHERE cliente_cedula = ? AND inmueble_id = ? ',[cliente_cedula,inmueble_id],function (err, rows) 
        {
            if (err)
            res.send('{"id": 404,"msj": "Hubo un error al listar las visitas"}');

            res.send({data:rows[0]});
        });
    });
};

exports.searchPrueba = function (req, res) {

    var id = req.params.id;
    console.log(id);
    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT a.id, a.empleado_cedula, a.cliente_cedula, i.matricula, v.fecha, v.hora, i.id AS inmueble_id, v.id AS visita_id   FROM inmueble i JOIN arriendo a ON i.id = a.inmueble_id LEFT JOIN visita v ON a.visita_id = v.id WHERE a.id = ?', [id], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);


            console.log(rows);
            res.send({
                data: rows[0]
            });


        });
    });
};


exports.buscarVisita = function (req, res) {

    var id = req.params.id;
    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT * FROM visita v WHERE v.id = ?', [id], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.send({
                data: rows[0]
            });


        });
    });
};

exports.searchCliente = function (req, res) { 

    var cedula = req.params.cedula;
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM persona p WHERE p.rol_id = 3 AND p.cedula = ?',[cedula], function (err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);

            res.send({
                data: rows[0]
            });

        });
    });
};

exports.searchInmuebleId = function (req, res) { 

    var id = req.params.id;
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM inmueble WHERE id = ?',[id], function (err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);

            res.send({
                data: rows[0]
            });

        });
    });
};

exports.searchInmuebleVendido= function (req, res) { 

    var inmueble_id = req.params.inmueble_id;
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM venta WHERE inmueble_id = ?',[inmueble_id], function (err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);

            res.send({
                data: rows[0]
            });

        });
    });
};


exports.listarUltimoArriendo = function(req, res){
    req.getConnection(function(err,connection){
          var query = connection.query('select * from arriendo order by id desc limit 1;',function(err,rows)
          {
              if(err)
              res.send('{"id": 404,"msj": "Hubo un error al listar los arriendos"}');    

            res.send({data:rows[0]});  
                
           });
      });
};

exports.listarContratos = function(req, res){
    req.getConnection(function(err,connection){
          var query = connection.query('SELECT * FROM contrato WHERE arriendo_id IS NOT NULL AND activo =1;',function(err,rows)
          {
              if(err)
              res.send('{"id": 404,"msj": "Hubo un error al listar los arriendos"}');    

            res.send({data:rows[0]});  
                
           });
      });
};

exports.deleteContrato = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {

        connection.query("UPDATE contrato SET activo = 0 WHERE id = ? ", [input.id], function (err, rows) {

            if (err)
            res.send('{"id": 404,"msj": "Hubo un error al eliminar"}');
       
        res.send('{"id": 505,"msj": "Se eliminó correctamente"}');

        });

    });
};

exports.searchContrato= function (req, res) { 

    var arriendo_id = req.params.arriendo_id;
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM contrato WHERE arriendo_id = ?',[arriendo_id], function (err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);

            res.send({
                data: rows[0]
            });

        });
    });
};

exports.editarContrato = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {

        var data = {
            id: input.id,
            descripcion: input.descripcion,
            contrato: input.contrato,
            arriendo_id: input.arriendo_id,
            venta_id: null,
            precio: input.precio,
            fecha: input.fecha,
            activo: 1

        };
        
        connection.query("UPDATE contrato SET ? WHERE id = ? ", [data, input.id], function (err, rows) {
            console.log(err);
            if (err)
            res.send('{"id": 404,"msj": "Hubo un error al editar el contrato"}');
       
        res.send('{"id": 505,"msj": "Se edito correctamente el contrato"}');

        });

    });
};











    


