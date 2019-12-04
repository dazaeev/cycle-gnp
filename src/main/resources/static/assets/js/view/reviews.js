/*
 * @autor Brian César Rodríguez Castro
 * Controller 
 * Pagina de control de catalogo de actividades
 */

// Cargando sistema
$(document).ready(function($) {
	startingSystemMenu();
	// Desactivar componentes de la TABLA
	$("#bootstrap-data-table_length").hide();
	$("#bootstrap-data-table_info").hide();
	
	$("#btn-edit").on('click', function () {
		$('#div-table').css('display', 'none');
	    $('#div-info').css('display', 'block');
	});
	
	$("#btn-erase").on('click', function () {
		$('#div-table').css('display', 'block');
	    $('#div-info').css('display', 'none');
	});
});