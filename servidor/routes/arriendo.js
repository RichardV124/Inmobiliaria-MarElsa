

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
            visita_id: input.visita_id.id,
            activo: 1
        };

        connection.query("UPDATE arriendo SET ? WHERE id = ? ", [data, input.id], function (err, rows) {
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

exports.searchVendido = function (req, res) { 

    var inmueble_id = req.params.inmueble_id;
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM venta WHERE inmueble_id = ? ORDER BY id desc',[inmueble_id], function (err, rows) {
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



    


