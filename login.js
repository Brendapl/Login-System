var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

//conectamos a la base de datos
var connection = mysql.createConnection({
	host     : 'localhost',
	port : 3306,
	user     : 'root',
	password : 'pasword',
	database : 'nodelogin'
});

//Si la conexión fue exitosa vamos a avisar a consola y desplegamos
//el contenido de la base de datos
connection.connect(function(err) {
  if (err) throw err;
  connection.query("SELECT * FROM accounts", function (err, result, fields) {
    if (err) throw err;
		console.log("Conexión Exitosa!");
    console.log(result);
  });
});
/*connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
*/
var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
//Cuando nos conectemos mostraremos LogInView
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/LogInView.html'));
});

//Autenticar
app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		//connection.query('SELECT username and pasword FROM accounts WHERE username = ? AND pasword = ?', [username, password],
		connection.query('SELECT * FROM accounts WHERE username = ?', [username],
		function(error, results, fields) {
			if (results.length > 0) {
				if(password==results[0].password){
					request.session.username = username;
					request.session.loggedin = true;
					response.send('Identificación Exitosa!');
					console.log('Identificación Exitosa!');
					response.redirect('/home');
				}
			}
			else {
				response.send('Nombre y usuario incorrecto!');
			}
			response.end();
		});
	} else {
		response.send('Por favor ingresa los datos!');
		response.end();
	}
});

//Una vez autenticado se muestra Bienvenido al usuario con su nombre
app.get('/home', function(request, response) {
	if (request.session.loggedin == true) {
		response.send('Bienvenido, ' + request.session.username + '!');
	} else {
		response.send('Por favor registrate para ver esta página!');
	}
	response.end();
});

//puerto que usamos
app.listen(8080);
