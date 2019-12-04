/*
 * @autor Nazario Dazaeev Gonzalez Herrera
 * Controller 
 * Pagina de control "company"
 */

// Variables Globales
var ID_EMPLOYEE_GRAL = 0;

// Cargando sistema
$(document).ready(function($) {
	startingSystemMenu();
	//
	initTable();
	//
	$('#btn-cancel-chanel').on('click', function () {
		ID_EMPLOYEE_GRAL = 0;
		cleanForm();
	    hideAddEmployee();
	});
	//
	$('#btn-save-chanel').on('click', function () {
        console.log('Guardar Usuario');
        $("#form-add-chanel").submit();
    });
	//
	$("#form-add-chanel").validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {
			console.log('Formulario invalido');
			showDivMessage('Favor de completar campos obligatorios', 'alert-danger', 2000);
		} else {
			saveUser();
			cleanForm();
			//
	        hideAddEmployee();
	        return false;
		}
	});
});

function initTable() {
	// iniciar contenido tabla
	$("#seccion-table-chanel").empty();
	// Llenar tabla empleados
	sendPostAction(SEND_CONTROLLER + 'findSend/' + sessionStorage.getItem('email-format'), null, respFindAll);
}

function respFindAll(data){
	// $('body').toggleClass('open');
	if(data){
		var tableSend =	  ' <table id="bootstrap-data-table"				'
							+ ' 	class="table mb-0">							'
							+ ' <thead>                                         '
							+ ' 	<tr>                                        '
							+ ' 		<th>Acciones    											</th>                          '

							+ ' 		<th>Nombre Completo											</th>                          '
							+ ' 		<th>Usuario													</th>                          '
							+ ' 		<th>Credencial												</th>                          '
							+ ' 		<th>Hos				                                		</th>                          '
							+ ' 		<th>Puerto													</th>                          '
							+ ' 		<th>Ruta de destino											</th>                          '
							+ ' 		<th>Ruta de origen											</th>                          '
							+ ' 		<th>Canal													</th>                          '
							
							+ ' 	</tr>                                       '
							+ ' </thead>                                        '
							+ ' <tbody>                                         ';
		for (var i = 0; i < data.length; i++){
			var rowEmployee = data[i];
			// Validar botones
			var enabledDelete = '';
			if(rowEmployee.enabled) {
				// enabled = 'style="display: none;"';
				enabledDelete = '<i class="fa fa-trash-o btn btn-secondary" title="No existe información Básica"></i>';
			} else {
				enabledDelete = '<i class="fa fa-trash-o btn btn-danger" title="Eliminar" onclick="confirmDeleteSend(\'' + rowEmployee.name + ' ' + rowEmployee.lastName + '\',' + rowEmployee.id + ',' + 0 + ')" style="cursor: pointer"></i>';
			}
			var actions =
				enabledDelete + 
				'<i class="fa fa-pencil btn btn-warning" title="Editar" onclick="editSend(\'' 
				+ rowEmployee.id + '\',' 
				+ '\'' + rowEmployee.name + '\',' 
				+'\'' + rowEmployee.lastName + '\',' 
				
				+'\'' + rowEmployee.username 			+ '\',' 
				+'\'' + rowEmployee.password 			+ '\',' 
				+'\'' + rowEmployee.serverAddress		+ '\',' 
				+'\'' + rowEmployee.serverPort			+ '\',' 
				+'\'' + rowEmployee.destinationPath		+ '\',' 
				+'\'' + rowEmployee.originPath			+ '\',' 
				+'\'' + rowEmployee.chanel	 			+ '\')" style="cursor: pointer"></i>';
			
			var tr = '<tr id="employee_' + rowEmployee.id + '">';

			tr += '<td align="center">'+ actions +'</td>';
			tr += '<td>'+ rowEmployee.name + ' ' + rowEmployee.lastName +'</td>';
			tr += '<td>'+ rowEmployee.username							+'</td>';
			
			tr += '<td>'+ rowEmployee.password							+'</td>';
			tr += '<td>'+ rowEmployee.serverAddress						+'</td>';
			tr += '<td>'+ rowEmployee.serverPort						+'</td>';
			tr += '<td>'+ rowEmployee.destinationPath					+'</td>';
			tr += '<td>'+ rowEmployee.originPath						+'</td>';
			tr += '<td>'+ rowEmployee.chanel							+'</td>';
			
			tr += '</tr>';
			tableSend += tr;
		}
		tableSend += '</tbody>'
						+ ' </table>';
	}
	
	var wrapper = $("#seccion-table-chanel");
	$(wrapper).append(tableSend); // add html
	//
	exportTable('bootstrap-data-table', 
			[
				{extend: 'excelHtml5', text: '<i class="fa fa-file-excel-o" style="font-size:20px;color:green"></i>', titleAttr: 'Exportar a Excel'}
			]);
	reloadTable('bootstrap-data-table');
}

function showAddEmployee() {
	$('#info-employee').css('display', 'none');
    $('#add-employee').css('display', 'block');
    $("#btn-cancel-chanel").show();
	$("#btn-save-chanel").show();
}

function hideAddEmployee() {
	$('#info-employee').css('display', 'block');
    $('#add-employee').css('display', 'none');
    $("#btn-cancel-chanel").hide();
	$("#btn-save-chanel").hide();
}

function saveUser() {
	var user = new User();
	user.id										= ID_EMPLOYEE_GRAL;
	user.email									= sessionStorage.getItem("email");
	// Llenar Send
	var envio = new send();
	envio.username = 		'' + $('#username').val();
	envio.password = 		'' + $('#password').val();
	envio.serverAddress = 	'' + $('#serverAddress').val();
	envio.serverPort = 		'' + $('#serverPort').val();
	envio.destinationPath = '' + $('#destinationPath').val();
	envio.originPath = 		'' + $('#originPath').val();
	envio.chanel =	 		'' + $('#chanel').val();
	envio.active = 1;
	// Setear 
	user.send = envio;
	console.log(user);
	//
	sendPostAction(SEND_CONTROLLER + 'saveUserSend', user, respSaveCompany);
}

function respSaveCompany(data) {
	ID_EMPLOYEE_GRAL = 0;
	if(data && data[1] == 'Ok'){
		showDivMessage(data[2], 'alert-info', 3000);
		initTable();
	} else {
		showDivMessage(data[2], 'alert-danger', 5000);
	}
}

function confirmDeleteSend(name, id, active) {
    $.jAlert({
        'type': 'confirm',
        'title': 'Confirmación',
        'confirmQuestion': '¿ Seguro de eliminar información a </br>' + name + ' ?',
        'confirmBtnText': 'Si',
        'denyBtnText': 'No estoy seguro',
        'theme': 'tBeIt',
        'size': 'sm',
        'showAnimation': 'fadeInUp',
        'hideAnimation': 'fadeOutDown',
        'onConfirm': function (e, btn) {
        	activeEmployee(id, active);
        }
    });
}

function activeEmployee(id, active) {
	sendPostAction(SEND_CONTROLLER + 'enabledUserSend/' + id + '/' + active, null, respActiveEmployeeGral);
}

function respActiveEmployeeGral(data) {
	if(data && data[1] == 'Ok'){
		showDivMessage(data[2], 'alert-info', 2000);
		// $('#bootstrap-data-table tr#employee_' + data[3]).remove();
		// window.location = '/adm/employees-gral.html';
		initTable();
	} else {
		showDivMessage(data[2], 'alert-danger', 5000);
	}
}

function editSend(id, name, lastName, username, password, serverAddress, serverPort, destinationPath, originPath, chanel) {
	$('#add-mod-chanel').html('Información de ' + name + '</br>Canal: ' + username + '@' + serverAddress);
	//
	ID_EMPLOYEE_GRAL = id;
	cleanForm();
	$('#username').val(username);
	$('#password').val(password);
	$('#serverAddress').val(serverAddress);
	$('#serverPort').val(serverPort);
	$('#destinationPath').val(destinationPath);
	$('#originPath').val(originPath);
	$('#chanel').val(chanel);
	//
	showAddEmployee();
}

function cleanForm() {
	$("#form-add-chanel")[0].reset();
}