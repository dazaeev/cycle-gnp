/*
 * @autor Nazario Dazaeev Gonzalez Herrera
 * Controller 
 * Utilerias comunes
 */

var PAGE_HOME = '/view/index.html';

// Armando Componentes de inicio
function startingSystemMenu(index){
	// Recargando Menu
	$('#left-panel').empty();
	$('#header').empty();
	//
	$('#left-panel').load('/templates/menu_bmc.html', function() {
		console.log('Levantando Menu');
		var user = new User();
		user.email = sessionStorage.getItem('email');
		sendPostAction('/home/menu/createMenu/' + index, user, respCreateMenu);
	});
	// Recargando Header
	$('#header').load('/templates/header_bmc.html', function() {
		console.log('Levantando Header');
		var nip = sessionStorage.getItem('email').split('@');
		if(nip.length == 2) {
			$('#lblEmail').text(nip[0]);
		}
		// ###### Messages for user, do not remove ######
		// Arrancar main.js
		runMain();
	});
}

// Respuesta de Controller
function respCreateMenu(data){
	if (data){
		if(data[1] == 'Ok'){
			var valueHtmlMenu = data[2];
			var wrapper = $(".main-menu");
			$(wrapper).append(valueHtmlMenu); // add html
		} else {
			showDivMessage("Error al crear menu", "alert-danger", 5000);
		}
	} else {
		showDivMessage("Valores vacios en Kardex", "alert-danger", 5000);
	}
}

// Romper session
function callLogout(){
	try{
		sessionStorage.clear();
		window.location.href = "/logout";
	} catch (e) {
		showDivMessage("Error al cerrar sesion: " + e, "alert-danger", 5000);
	}
}

// Mostrar mensaje
function showDivMessage(message, divclass, time) {
	var div_message = $('#div-message');
	$('#message-content').html(message);
	div_message.addClass(divclass);
	div_message.css('display', 'block');
	setTimeout(function() {
		div_message.css('display', 'none');
	}, time);
}

//Ejecuta POST
function sendPostAction(url, model, callBackFunctionJquery) {
	$.ajax(url, {
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		'type' : 'POST',
		'data' : JSON.stringify(model),
		'dataType' : 'json',
		'success' : callBackFunctionJquery,
		'error' : function(data) {
			var msj = "Error sin mensaje";
			if (data.responseJSON != null) {
				msj = data.responseJSON['status'];
				msj = msj + ' - ' + data.responseJSON['message'];
			}
			showDivMessage(msj, 'alert-danger', 4000);
		}
	});
}

// Exportar Tabla
function exportTable(name, type) {
	$("#" + name).DataTable({
        dom: 'lBfrtip',
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
        buttons: [
        	type
        ]
    });
}

// Iniciando tabla
function reloadTable(name) {
	$("#" + name).DataTable();
	// Desactivar componentes de la TABLA
	$("#" + name + "_length").hide();
	$("#" + name + "_info").hide();
}

// Union de nombre archivo y tipo archivo
function castNameFileToTypeFile(input) {
	var result = '';
	try {
		var castFile = $('#' + input)[0].files[0];
		result = castFile.name + '____' + castFile.type;
	} catch (e) {
		result = '';
	}
	return result;
}

// Formato de Pesos
var formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2,
	// the default value for minimumFractionDigits depends on the currency
	// and is usually already 2
});

//Mostrar Loader
function showPreloader(status) {
	if(status) {
		$('#preloader-process').css('display','block');
	} else {
		$('#preloader-process').css('display','none');
	}
}

//Validar objeto
function validateObj(data) {
	if(data == null || data == 'null' || data == 'undefined') {
		return '';
	} else {
		return data;
	}
}

// Variables Globales
var EMPLOYEE_CONTROLLER = '/adm/employee/';
var EMPLOYEE_ALL_CONTROLLER = '/adm/employee-all/';
var EMPLOYEE_GRAL_CONTROLLER = '/adm/employee-gral/';

var COMPANY_CONTROLLER = '/adm/company/';
var SEND_CONTROLLER = '/adm/send/';

// Test FTP
var FTP_CONTROLLER = '/adm/ftp/';

// Cicle
var CICLE_CONTROLLER = '/adm/cicle/';