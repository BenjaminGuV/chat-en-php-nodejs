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
		var msj = $('</p>').addClass('userCon').html( nombre ).attr('id', 'uid' + key);

		if ( $('#uid' + key ).length == 0 ) {
			$('#divUsuario').append(msj);
		};


		//socket.emit('sendUsuarioConectado', nombre);

	}

	function imprimirMensaje (msj) {
		this.msj = msj;
		var nombre = $('#nombre').val();

		this.msj = this.msj.replace( nombre, 'yo' );

		this.mensaje = $('</p>').html( this.msj );

		$('#divMensajes').append( this.mensaje );

		//$('html, body').animate({scrollTop: $elem.height()}, 800);

		var posicion = $('#divMensajes p').length * $('#divMensajes p').outerHeight(true);

		$('#divMensajes').animate( { scrollTop: posicion } );

	}

	$('#enviarMensaje').click( function () {

		var mensaje = $('#mensaje').val();
		var nombre = $('#nombre').val();

		if ( mensaje != '' ) {
			socket.emit('sendMensaje', nombre + ": " + mensaje );
		};


		$('#mensaje').val('');
		$('#mensaje').focus();

	} );

	$('#mensaje').keypress(function(e) {
	    if(e.which == 13) {
	        $('#enviarMensaje').trigger('click');
	        return false;
	    }
	});

	$('#nombre').focus(function() {
		$(this).val('');
	});

	$('#divUsuario').on( "click", '.userCon', function (event) {
		event.preventDefault();
		console.log("test");
		$('.userCon').removeClass('seleccionPrivada');
		$(this).addClass('seleccionPrivada');

		var nombre    = $(this).html();
		var idPrivado = $(this).attr('id');

		$('#nombre_priv').val( nombre );
		$('#id_priv').val( idPrivado );

	});

});