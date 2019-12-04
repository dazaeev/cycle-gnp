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
	$('#btn-cancel').on('click', function () {
		$('#div-response').css('display', 'none');
		$('#div-table-request').css('display', 'block');
		$("#frm-response")[0].reset();
		// validar check
    });
});

function reponseRequest(id){
	$('#div-response').css('display', 'block');
	$('#div-table-request').css('display', 'none');
}