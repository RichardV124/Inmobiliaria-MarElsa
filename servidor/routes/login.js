
exports.search = function(req, res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var username = input.username;
    var contrasenia = input.contrasenia;
    console.log('USER:' + username);
    console.log('PASS:' + contrasenia);
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT p.* FROM login l JOIN personal p ON p.login_username=l.username WHERE l.username = ? AND l.contrasenia = ?',[username,contrasenia],function(err,rows)
        {
            
            if(err)
            res.send('{"id": 404,"msj": "Hubo un error al ejecutar la query"}');
     
            console.log(query.sql);
            console.log({data:rows[0]});
            res.send({data:rows[0]});
                
         });
         
         //console.log(query.sql);
    }); 
};