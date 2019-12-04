/*
 * @autor Nazario Dazaeev Gonzalez Herrera
 * Controller 
 * Acceso
 */

function init() {
	console.log('Iniciando Crypto');
	console.log('Bienvenido: ' + jQuery('#email').val());
	sessionStorage.setItem("email", $('#email').val());
	var emailsFormat = $('#email').val();
	var emailfFormat = emailsFormat.replace('@', '____');
	emailfFormat = emailfFormat.replace('.', '-point-');
	emailfFormat = emailfFormat.replace('.', '-point-');
	emailfFormat = emailfFormat.replace('.', '-point-');
	sessionStorage.setItem("email-format", emailfFormat);
}

// Cargando acceso
$(document).ready(function($) {
	$('#sign_in').on('submit', function() {
		init();
		return true;
	});
});