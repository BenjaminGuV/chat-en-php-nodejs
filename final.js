var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var sessionGlobal = '';

var nomUsuarios = {};
var numero = 1;

server.listen(8888);


app.configure( function(){
	app.use( express.cookieParser() );
	app.use( express.session({ secret: 'secret', key: 'express.sid' }) );
	app.use( function (req, res) {
		sessionGlobal = req.sessionID;
		console.log( 'session' );
		console.log( sessionGlobal );
	});
});

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index4.php');
});

io.sockets.on('connection', function (socket) {
	console.log("conectado");

	var idG = null;

	socket.on('sendUsuarioConectado', function (data, id) {
		if ( typeof data == 'undefined' || typeof data == 'undefined' ) {
			console.log('fallo');
		}else{
			nomUsuarios[ id ] = data;
			idG = id;
		}

		console.log( 'nomUsuarios' );
		console.log( nomUsuarios );

		io.sockets.emit('getUsuarioConectado', nomUsuarios);

	});

	socket.on('sendMensaje', function (data) {
		console.log(data);
		io.sockets.emit('getMensaje', data);
	});

	/* socket desconectado */
	socket.on( 'disconnect', function(){

		console.log( 'temp id' );
		console.log( idG );

		//delete nomUsuarios[ cookie ];

		io.sockets.emit("El usuario se desconecto");

		io.sockets.emit('eliUsuariosconectados', idG);


	});

});