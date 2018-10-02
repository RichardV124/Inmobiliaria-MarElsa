exports.save = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    // console.log(input);

    req.getConnection(function (err, connection) {

        var data = {
            descripcion: input.descripcion,
            inmueble_id: input.inmueble_id.id,
            cliente_cedula: input.cliente_cedula.cedula,
            empleado_cedula: input.empleado_cedula.cedula
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

exports.delete = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {

        connection.query("DELETE FROM venta WHERE id = ? ", [input.id], function (err, rows) {

            if (err)
            res.send('{"id": 404,"msj": "Hubo un error al eliminar"}');
       
        res.send('{"id": 505,"msj": "Se eliminó correctamente"}');

        });

    });
};
