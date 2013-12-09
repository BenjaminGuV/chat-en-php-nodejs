<?php 
	/*ini_set('session_save_path', '/Users/benjamin/tmp');
	session_name('benjamin');
	if(@session_start() == false){session_destroy();session_start();}*/
	session_start();

	$id_unico = sha1( $_POST["nombre"] . session_id() );

	$_SESSION["alias"] = $_POST["nombre"];
	$_SESSION["id_unico"] = $id_unico;

	$nombre = $_POST["nombre"];

	echo "<pre>";
	echo var_dump( $_SESSION );
	echo "</pre>";

?>
<html>
<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="css/estilos.css">
	<script src="http://chat:8888/socket.io/socket.io.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="js/inicio.js"></script>
</head>
<body>
	<div id="contenedorMensajes">
		<div id="divMensajes">

		</div>
		
		<div id="divUsuario">

		</div>
	</div>
	
	<div class="clear"></div>

	<div class="form">
		<input type="text" id="nombre" value="<?php echo $nombre; ?>" disabled>
		<input type="hidden" id="id" value="<?php echo $id_unico; ?>">
		<br>
		<textarea id="mensaje"></textarea>
		<br>
		<input type="button" id="enviarMensaje" value="enviar">
	</div>
	<div>
		<p><a href="logout.php">Salir</a></p>
	</div>
</body>
</html>