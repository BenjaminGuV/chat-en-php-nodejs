var socket = io.connect("http://chat:8888/");

$(document).ready(function() {

	if ( io ) {

		var datosUsuario = new Array();

		datosUsuario['nombre'] = $('#nombre').val();
		datosUsuario['key'] = $('#id').val();

		console.log(datosUsuario);

		socket.emit('sendUsuarioConectado', $('#nombre').val(), $('#id').val() );

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

			imprimirMensaje(data);

		});


		socket.on('eliUsuariosconectados', function (data) {
			console.log("eliminando");
			console.log(data);
			if ( $('#uid' + data ).length != 0 ) {
				$('#uid' + data ).remove();
			};
		});

	};

	function usuariosConectados ( nombre, key ) {
		var msj = $('</p>').html( nombre ).attr('id', 'uid' + key);

		if ( $('#uid' + key ).length == 0 ) {
			$('#divUsuario').append(msj);
		};


		//socket.emit('sendUsuarioConectado', nombre);

	}

	function imprimirMensaje (msj) {
		this.msj = msj;

		this.mensaje = $('</p>').html( this.msj );

		$('#divMensajes').append( this.mensaje );

		//$('html, body').animate({scrollTop: $elem.height()}, 800);

		console.log( $('#divMensajes').height() );

		$('#divMensajes').animate( { scrollTop: $('#divMensajes').height() } );

	}

	$('#enviarMensaje').click( function () {

		console.log("tesd");

		var mensaje = $('#mensaje').val();
		var nombre = $('#nombre').val();

		console.log(mensaje);
		console.log(typeof mensaje);
		console.log(mensaje.length);

		if ( mensaje != '' ) {
			socket.emit('sendMensaje', nombre + ": " + mensaje );

			mensaje = $('</p>').html( 'yo: ' + mensaje );

			$('#divMensajes').append( mensaje );
		};


		$('#mensaje').val('');

		$('#mensaje').focus();

	} );

	$('#mensaje').keypress(function(e) {
	    if(e.which == 13) {
	        $('#enviarMensaje').trigger('click');
	    }
	});

	$('#nombre').focus(function() {
		$(this).val('');
	});

});