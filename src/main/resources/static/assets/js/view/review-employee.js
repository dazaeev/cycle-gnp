/*
 * @autor Brian César Rodriguez Castro
 * Controller 
 * Pagina de control de Review Empleados
 */

// Cargando sistema
$(document).ready(function($) {
	startingSystemMenu();

	// Desactivar componentes de la TABLA
	$("#bootstrap-data-table_length").hide();
	$("#bootstrap-data-table_info").hide();
	$("#bootstrap-data-table2_length").hide();
	$("#bootstrap-data-table2_info").hide();
	$("#bootstrap-data-table3_length").hide();
	$("#bootstrap-data-table3_info").hide();
	$("#bootstrap-data-table4_length").hide();
	$("#bootstrap-data-table4_info").hide();
	$("#bootstrap-data-table5_length").hide();
	$("#bootstrap-data-table5_info").hide();
	
	
	$('#btn-employee').on('click', function () {
		$('#div-personal-table').css('display', 'none');
		$('#div-courses-table').css('display', 'block');
		$('#div-certs-table').css('display', 'block');
		$('#div-reports-table').css('display', 'block');
		$('#div-places-table').css('display', 'block');
    });
});
$('#bootstrap-data-table2').DataTable({
    lengthMenu: [[10, 20, 50, -1], [10, 20, 50, "All"]],
});
$('#bootstrap-data-table3').DataTable({
    lengthMenu: [[10, 20, 50, -1], [10, 20, 50, "All"]],
});

$('#bootstrap-data-table4').DataTable({
    lengthMenu: [[10, 20, 50, -1], [10, 20, 50, "All"]],
});

$('#bootstrap-data-table5').DataTable({
    lengthMenu: [[10, 20, 50, -1], [10, 20, 50, "All"]],
});