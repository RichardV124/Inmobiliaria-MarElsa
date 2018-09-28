/*
 * GET property listing.
 */

exports.list = function (req, res) {

    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT i.*, m.nombre as municipio, d.id as dpto_id, ' 
        + ' d.nombre as depto FROM inmueble i JOIN municipio m ON m.id = i.municipio_id ' 
        + ' JOIN departamento d ON d.id = m.departamento_id', function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.send({
                data: rows
            });


        });

        //console.log(query.sql);
    });

};

exports.saveFile = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    // console.log(input);

    req.getConnection(function (err, connection) {

        var data = {
            // id: input.id,
            nombre: input.nombre,
            inmueble_id: input.inmueble_id.id,
            archivo: input.archivo
            
        };

        var query = connection.query("INSERT INTO archivo set ? ", data, function (err, rows) {

            if (err)
            res.send('{"id": 404,"msj": "Hubo un error al registrar los archivos"}');
       
        res.send('{"id": 505,"msj": "Registro exitoso"}');

        });

    });
};

exports.searchFile = function (req, res) {

    var id = req.params.inmueble_id;
    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT * FROM archivo WHERE inmueble_id = ?', [id], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.send({
                data: rows
            });

        });

        //console.log(query.sql);
    });
};

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};
  
    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }
  
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
  
    return response;
  };

/*
 * GET type property listing.
 */

exports.listTipoInmueble = function (req, res) {

    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT * FROM tipo_inmueble', function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.send({
                data: rows
            });

        });

    });

};

exports.searchTipoInmubeleId = function (req, res) {

    var id = req.params.id;
    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT * FROM tipo_inmueble WHERE id = ?', [id], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.send({
                data: rows[0]
            });


        });

        //console.log(query.sql);
    });
};

exports.search = function (req, res) {

    var matricula = req.params.matricula;
    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT i.*, ti.descripcion, d.id as id_depto ' 
        + ' FROM inmueble i JOIN tipo_inmueble ti ' 
        + ' ON i.tipo_inmueble_id = ti.id JOIN municipio m ON m.id = i.municipio_id '
        + ' JOIN departamento d ON d.id = m.departamento_id ' 
        + ' WHERE i.matricula = ?', [matricula], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.send({
                data: rows[0]
            });


        });

        //console.log(query.sql);
    });
};

/*Save the property*/
exports.save = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    // console.log(input);

    req.getConnection(function (err, connection) {

        var data = {
            // id: input.id,
            direccion: input.direccion,
            area: input.area,
            tipo_inmueble_id: input.tipo_inmueble_id.id,
            valor: input.valor,
            promocion: input.promocion,
            num_habitaciones: input.num_habitaciones,
            num_banios: input.num_banios,
            pisos: input.pisos,
            seguridad: input.seguridad,
            zonas_verdes: input.zonas_verdes,
            garaje: input.garaje,
            salon_comunal: input.salon_comunal,
            conjunto_cerrado: input.conjunto_cerrado,
            cocina_integral: input.cocina_integral,
            gas: input.gas,
            alarma: input.alarma,
            zona_para_ninios: input.zona_para_ninios,
            terraza: input.terraza,
            gimnasio: input.gimnasio,
            piscina: input.piscina,
            balcon: input.balcon,
            num_closets: input.num_closets,
            municipio_id: input.municipio_id.id,
            num_cocinas: input.num_cocinas,
            zona: input.zona,
            alcantarillado: input.alcantarillado,
            sauna: input.sauna,
            energia: input.energia,
            zonabbq: input.zonabbq,
            persona_cedula: input.persona_cedula.persona_cedula.cedula,
            cliente_cedula:input.cliente_cedula.cedula,
            matricula: input.matricula,
            precio_negociable: input.precio_negociable
        };

        var query = connection.query("INSERT INTO inmueble set ? ", data, function (err, rows) {

            if (err)
            res.send('{"id": 404,"msj": "Hubo un error al registrar el inmueble"}');
       
        res.send('{"id": 505,"msj": "Registro exitoso"}');

        });

    });
};

exports.save_edit = function (req, res) {

    console.log(req.body);
    var input = JSON.parse(JSON.stringify(req.body));
    // console.log(input);
    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var data = {
            direccion: input.direccion,
            area: input.area,
            tipo_inmueble_id: input.tipo_inmueble_id.id,
            valor: input.valor,
            promocion: input.promocion,
            num_habitaciones: input.num_habitaciones,
            num_banios: input.num_banios,
            pisos: input.pisos,
            seguridad: input.seguridad,
            zonas_verdes: input.zonas_verdes,
            garaje: input.garaje,
            salon_comunal: input.salon_comunal,
            conjunto_cerrado: input.conjunto_cerrado,
            cocina_integral: input.cocina_integral,
            gas: input.gas,
            alarma: input.alarma,
            zona_para_ninios: input.zona_para_ninios,
            terraza: input.terraza,
            gimnasio: input.gimnasio,
            piscina: input.piscina,
            balcon: input.balcon,
            num_closets: input.num_closets,
            municipio_id: input.municipio_id.id,
            num_cocinas: input.num_cocinas,
            zona: input.zona,
            alcantarillado: input.alcantarillado,
            sauna: input.sauna,
            energia: input.energia,
            zonabbq: input.zonabbq,
            persona_cedula: input.persona_cedula.persona_cedula.cedula,
            cliente_cedula:input.cliente_cedula.cedula,
            matricula: input.matricula,
            precio_negociable: input.precio_negociable

        };

        connection.query("UPDATE inmueble set ? WHERE id = ? ", [data, input.id], function (err, rows) {

            if (err)
            res.send('{"id": 404,"msj": "Hubo un error al editar"}');
       
        res.send('{"id": 505,"msj": "Se editó correctamente"}');

        });

    });
};

exports.delete_inmueble = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {

        connection.query("DELETE FROM inmueble WHERE id = ? ", [input.id], function (err, rows) {

            if (err)
            res.send('{"id": 404,"msj": "Hubo un error al eliminar"}');
       
        res.send('{"id": 505,"msj": "Se eliminó correctamente"}');

        });

    });
};