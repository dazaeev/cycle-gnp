/*
 * @autor Brian César Rodríguez Castro
 * Controller 
 * Pagina de control de catalogo de actividades
 */

// Cargando sistema
$(document).ready(function($) {
	startingSystemMenu();
	$('.selectBMC').select2();
	$(".selectBMC").change(function() {
		var str = "";
		$(".selectBMC option:selected").each(function() {
			str += $(this).text() + " ";
			if ($(this).val() == 1) {
				$("#textarea-input").attr("placeholder", "Ejemplo: Cursos, Capacitaciones, Certificaciones").blur();
			} else if ($(this).val() == 2) {
				$("#textarea-input").attr("placeholder", "Ejemplo: Vacaciones, Permisos, Personal, Contrataciones").blur();
			} else if ($(this).val() == 0) {
				$("#textarea-input").attr("placeholder", "").blur();
			}
		});
	});
});