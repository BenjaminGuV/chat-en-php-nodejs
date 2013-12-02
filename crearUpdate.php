<?php 
	// 6 en total
	$numeros = array(1, 5, 7, 11, 13);
	$test = array(4);
	$aux = 4;

	$bandera = true;
	$bandera2 = true;
	for ($i=1; $i <= 180; $i++) { 
		if ( $bandera ) {
			$aux = $aux + 6;
			array_push($test, $aux);
			$bandera = false;
		} else {
			$aux = $aux + 6;
			array_push($test, $aux);
			$bandera = true;
		}
	}

	$sql = "( ";

	foreach ($test as $key => $value) {
		$sql .= "gps_tarifas.id_gps_temporadas = " . $value . " OR ";
	}

	echo "<pre>";
	echo var_dump($sql);
	echo "</pre>";


/*1 - 1
2 - 1
3 - 1
4 - 1
5 - 1
6 - 1
1 - 2 = 7 = (6 * (2 - 1)) + 1
2 - 2 = 8 = (6 * (2 - 1)) + 2
3 - 2 = 9 = (6 * (2 - 1)) + 3
4 - 2 = 10 = (6 * (2 - 1)) + 4
5 - 2 = 11 = (6 * (2 - 1)) + 5
6 - 2 = 12 = (6 * (2 - 1)) + 6
1 - 3 = 13 = (6 * (3 - 1)) + 1
2 - 3 = 14 = (6 * (3 - 1)) + 2
3 - 3 = 15 = (6 * (3 - 1)) + 3
4 - 3 = 16 = (6 * (3 - 1)) + 4
5 - 3 = 17 = (6 * (3 - 1)) + 5
6 - 3 = 18 = (6 * (3 - 1)) + 6*/

SELECT gpa_tarifas.*, gps_categorias.categoria, directorio.*, 
	( ( 6 * (directorio.id_gps_grupos - 1) ) + gpa_tarifas.id_gps_temporadas ) as nuevo
FROM gpa_tarifas
INNER JOIN gps_categorias ON gps_categorias.id = gpa_tarifas.id_gps_categorias
INNER JOIN directorio ON directorio.id = gpa_tarifas.id_destino
WHERE gpa_tarifas.id_proveedor = 1
ORDER BY gpa_tarifas.id_destino ASC, gps_categorias.categoria ASC, gpa_tarifas.id_gps_temporadas ASC;


?>