function iniciar() {
	console.log( "Manipuladores de peticion iniciar" );

	function sleep (milliSeconds) {
		var startTime = new Date().getTime();
		while( new Date().getTime() < startTime + milliSeconds );
	}

	sleep( 10000 );

	return "Hola iniciar";
}

function subir() {
	console.log( "Manipuladores de peticion subir" );
	return "Hola subir";
}

exports.iniciar = iniciar;
exports.subir = subir;