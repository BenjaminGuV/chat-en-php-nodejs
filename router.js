function route ( handle, pathname) {
	console.log( "A punto de rutear " + pathname );

	if ( typeof handle[pathname] === 'function' ) {
		return handle[pathname]();
	} else{
		console.log( "No se encontro manipulador para " + pathname );
		return "404 no encontrado";
	}

}

exports.route = route;