var io = require("socket.io");
var express = require("express");
var app = express();
var port = 8888;

app.configure( function(){
	app.use( express.cookieParser() );
	app.use( express.session({ secret: 'secret', key: 'express.sid' }) );
	app.use( function (req, res) {
		res.end( '<h2>Hola, tu session es ' + req.sessionID + '</h2>' );
	} );
} );

app.listen( port );
var sio = io.listen( app );

sio.sockets.on('connection', function (socket) {
	console.log('Socket conectado');
});