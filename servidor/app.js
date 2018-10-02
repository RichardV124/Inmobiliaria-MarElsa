
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
//cargamos el route de persona
var empleado = require('./routes/empleado');
//cargamos el route de login
var login = require('./routes/login');
//cargamos el route de personal
var cliente = require('./routes/cliente');
//Cargamos el route de inmuebles
var inmueble = require('./routes/inmueble');
//Cargamos el route de roles
var roles = require('./routes/rol');
//Cargamos el route de municipio
var municipio = require('./routes/municipio');
//Cargamos el route de departamento
var departamento = require('./routes/departamento');
//Cargamos el route de experiencias
var experiencia = require('./routes/experiencia');
//Cargamos el route de estudio
var estudio = require('./routes/estudio');
//Cargamos el route de arriendo
var arriendo = require('./routes/arriendo');
//Cargamos el route de ventas
var venta = require('./routes/venta');

// ------ SERVICIOS ------ //

var fileRoutes = require('./routes/file');

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

app.use('/file', fileRoutes);
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Permitimos acceso al cliente por el puerto 4200 y a Karma por el puerto 9876
 */
app.use(function (req, res, next) {
    /**
     * Lista de dominios permitidos
     */
    var allowedOrigins = ['http://localhost:4200', 'http://localhost:9876'];
    // obtenemos el origin
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        // permitimos el acceso del origin, siempre y cuando este en el array allowedOrigins
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
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

// ------- Servicios de empleado ------- //
app.get('/persona/search/:cedula', empleado.search);
app.post('/empleado/save', empleado.save);
app.post('/empleado/edit', empleado.edit);
app.post('/empleado/delete', empleado.delete);
app.get('/empleado/listar', empleado.list);
app.get('/empleado/search/:cedula', empleado.searchEmpleado);
app.get('/tipopersonal/listar', empleado.listTipoPersonal);

// ------- Servicios de experiencias y estudios ------- //
app.post('/experiencia/save', experiencia.saveExperiencia);
app.post('/estudio/save', estudio.saveEstudio);
app.get('/experiencia/listar/:cedula', experiencia.listarExperiencias);
app.get('/estudio/listar/:cedula', estudio.listarEstudios);
app.get('/experiencia/search/:id', experiencia.searchExperiencia);
app.get('/estudio/search/:id', estudio.searchEstudio);
app.post('/experiencia/delete', experiencia.deleteExperiencia);
app.post('/estudio/delete', estudio.deleteEstudio);

// ------- Servicios de login ------- //
app.get('/login/login/:username/:contrasenia', login.login);
app.get('/login/usuario-by-persona/:persona', login.loginByPersona);
app.get('/login/listar', login.listar);

// ------- Servicios de cliente ------- //
app.get('/cliente', cliente.list);
app.get('/cliente/search/:cedula', cliente.search);
app.post('/cliente/edit/',cliente.edit);
app.post('/cliente/delete/', cliente.delete);
app.post('/cliente/save', cliente.save);

// ------- Servicios de inmuebles ------- //
app.get('/inmueble', inmueble.list);
app.get('/inmueble/search/:matricula', inmueble.search);
app.get('/tipoinmueble', inmueble.listTipoInmueble);
app.post('/inmueble/add', inmueble.save);
app.post('/inmueble/delete/', inmueble.delete_inmueble);
app.post('/inmueble/edit/', inmueble.save_edit);
app.get('/tipoinmueble/search/:id', inmueble.searchTipoInmubeleId);
app.post('/file/add', inmueble.saveFile);
app.get('/file/search/:inmueble_id', inmueble.searchFile);

// ------------ Arriendos ----------------//
app.post('/arriendo/add', arriendo.save);
app.get('/arriendo/search/:inmueble_id', arriendo.buscarPorInmuebleId);
app.post('/arriendo/delete/', arriendo.delete);

// ------------ Ventas --------------- //
app.post('/venta/add', venta.save);
app.get('/venta/search/:inmueble_id', venta.buscarPorInmuebleId);
app.post('/venta/delete/', venta.delete);

// ------- Servicios de roles y accesos ------- //
app.get('/rol/listar', roles.listar);
app.get('/rol-accesos/listar', roles.listarRolAccesos);
app.get('/rol/rol-by-id/:id', roles.rolById);
app.get('/acceso/acceso-by-id/:id', roles.accesoById);
app.get('/acceso/listar', roles.listarAccesos);
app.get('/acceso/por-rol/:rol', roles.accesosPorRol);
app.post('/acceso-rol/save', roles.saveAccesoRol);
app.post('/acceso-rol/delete', roles.deleteAccesoRol);
app.post('/acceso-rol/search/:rol_id/:acceso_id', roles.searchAccesoRol);

// ------- Servicios de departamento y municipio ------- //
app.get('/departamento/list', departamento.list);
app.get('/municipio/list/:id', municipio.list);
app.get('/municipio/search/:id', municipio.search);
app.get('/departamento/search/:id', departamento.search);


app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
