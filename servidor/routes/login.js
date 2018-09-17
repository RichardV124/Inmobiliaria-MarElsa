
exports.login = function(req, res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var username = input.username;
    var contrasenia = input.contrasenia;
    console.log('USER:' + username);
    console.log('PASS:' + contrasenia);
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM login l WHERE l.username = ? AND l.contrasenia = ?',[username,contrasenia],function(err,rows)
        {
            
            if(err)
            res.send('{"id": 404,"msj": "Hubo un error al logearse"}');
     
            console.log(query.sql);
            console.log({data:rows[0]});
            res.send({data:rows[0]});
                
         });
         
         console.log(query.sql);
    }); 
};

/**
 * Buscar personal por login
 */
exports.personalByLogin = function(req, res){
    var username = req.params.username;
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM personal WHERE login_username = ?',[username],function(err,rows){
            if(err)
            res.send('{"id": 404,"msj": "Hubo un error al logearse"}');
                res.send({data:rows[0]});
         });

         console.log(query.sql);
    });
};

/**
 * Buscar cliente por login
 */
exports.clienteByLogin = function(req, res){
    var username = req.params.username;
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM cliente WHERE login_username = ?',[username],function(err,rows){
            if(err)
            res.send('{"id": 404,"msj": "Hubo un error al logearse"}');
                res.send({data:rows[0]});
         });

         console.log(query.sql);
    });
};