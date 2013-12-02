<html>
<head>
	<title></title>
	<script src="http://chat:8888/socket.io/socket.io.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script type="text/javascript">
		var test = io.connect("http://chat:8888/");

		test.on("data", function (data) {
			console.log( data );
		});

		test.on("error", function (reason) {
			console.error( "No se conecto el socket io" );
		});

		test.on("connect", function (reason) {
			console.info( "se conecto el socket io" );
		});

	</script>
</head>
<body>
	<p>abre las consola</p>
</body>
</html>