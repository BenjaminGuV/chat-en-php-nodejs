var socket = io.connect("http://chat:8888/");

$(document).ready(function() {

	if ( io ) {

		var datosUsuario = new Array();

		datosUsuario['nombre'] = $('#nombre').val();
		datosUsuario['key'] = $('#id').val();

		console.log(datosUsuario);

		socket.emit('sendUsuarioConectado', $('#nombre').val(), $('#id').val() );

		usuariosConectados('Yo');

		socket.on( 'getUsuarioConectado', function (data) {
			console.log( 'si llego' );
			console.log( data );

			$.each(data, function (key, value) {
				usuariosConectados(value, key);
			});
			
			//usuariosConectados(msg);

		} );

		socket.on('getMensaje', function (data) {
			console.log("mensaje del socket");
			console.log(data);
		});
	};

	function usuariosConectados ( nombre, key ) {
		var msj = $('</p>').html( nombre ).attr('id', 'uid' + key);

		if ( $('#uid' + key ).length == 0 ) {
			$('#divUsuario').append(msj);
		};


		//socket.emit('sendUsuarioConectado', nombre);

	}

	$('#enviarMensaje').click( function () {


		console.log("tesd");

		var mensaje = $('#mensaje').val();

		socket.emit('sendMensaje', "usuario: " + mensaje );

		mensaje = $('</p>').html( 'yo: ' + mensaje );

		$('#divMensajes').append( mensaje );

		$('#mensaje').val('');

	} );

	$('#nombre').focus(function() {
		$(this).val('');
	});

});