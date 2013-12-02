$(document).ready( function () {

	console.log( io );

	if( io ){

		var websocket = io.connect("http://chat:8888");

		//agregar elemento

		websocket.on("sendEvent", function(data)
	    {
	        var agregarUsuario = $("#agregarUsuario");

	        agregarUsuario.append("<li>" + data + "</li>")

	    });

	    function iniciar () {
	    	var fechaActual = new Date();

	    	

	    	var stringFechaActual = fechaActual.getDate() + "-" + fechaActual.getMonth()
	    		+ "-" + fechaActual.getFullYear() + " " + fechaActual.getHours() + ":"
	    		+ fechaActual.getMinutes() + ":" + fechaActual.getSeconds(); 

	        websocket.emit("newMessage", stringFechaActual );
	    }

	    iniciar();


	}else{
		console.log("No inicio io");
	}
});