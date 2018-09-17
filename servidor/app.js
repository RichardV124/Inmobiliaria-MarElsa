
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

// ------ SERVICIOS ------ //

//cargamos el route de customers
var customers = require('./routes/customers'); 
//cargamos el route de personal
var personal = require('./routes/personal');
//cargamos el route de login
var login = require('./routes/login');
//cargamos el route de personal
var cliente = require('./routes/cliente');
//Cargamos el route de inmuebles
var inmueble = require('./routes/inmueble');
//Cargamos el route de roles
var roles = require('./routes/rol');

// ------ SERVICIOS ------ //

var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
    
    connection(mysql,{
        
        host: 'localhost', //'localhost',
        user: 'root',
        password : '1234',
        port : 3306, //port mysql
        database:'inmobiliaria'

    },'pool') //or single

);



app.get('/', routes.index);

// ------- Servicios de customer ------- //
app.get('/customers', customers.list);
app.post('/customers/add', customers.save);
app.post('/customers/addlogin', customers.savelogin);
app.get('/customers/delete/:id', customers.delete_customer);
app.get('/customers/search/:id', customers.search);
app.post('/customers/edit/',customers.save_edit);

// ------- Servicios de personal ------- //
app.get('/personal', personal.list);
app.get('/personal/search/:cedula', personal.search);
app.post('/personal/edit/',personal.edit);
app.post('/personal/delete/', personal.delete);
app.post('/personal/save', personal.save);
app.get('/tipopersonal', personal.listTipoPersonal);

// ------- Servicios de login ------- //
app.post('/login/login', login.login);
app.get('/login/personal-by-login/:username', login.personalByLogin);
app.get('/login/cliente-by-login/:username', login.clienteByLogin);
app.get('/login/search2/:username', login.search2);

// ------- Servicios de cliente ------- //
app.get('/cliente', cliente.list);
app.get('/cliente/search/:cedula', cliente.search);
app.post('/cliente/edit/',cliente.edit);
app.post('/cliente/delete/', cliente.delete);
app.post('/cliente/save', cliente.save);

// ------- Servicios de inmuebles ------- //
app.get('/inmueble', inmueble.list);
app.get('/inmueble/search/:id', inmueble.search);
app.get('/tipoinmueble', inmueble.listTipoInmueble);
app.post('/inmueble/add', inmueble.save);
app.post('/inmueble/delete/:id', inmueble.delete_inmueble);
app.post('/inmueble/edit/:id', inmueble.save_edit);

// ------- Servicios de roles y accesos ------- //
app.get('/rol/listar', roles.listar);
app.get('/rol-accesos/listar', roles.listarRolAccesos);
app.get('/rol/rol-by-id/:id', roles.rolById);
app.get('/acceso/listar', roles.listarAccesos);
app.get('/acceso/por-rol/:rol', roles.accesosPorRol);



app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
