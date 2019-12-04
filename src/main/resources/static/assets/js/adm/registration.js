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
	$('#btn-cancel-employee').on('click', function () {
		ID_EMPLOYEE_GRAL = 0;
		cleanForm();
	    hideAddEmployee();
	});
	//
	$('#btn-save-employee').on('click', function () {
        console.log('Guardar Usuario');
        $("#form-add-user").submit();
    });
	//
	$('#btn-add-employee').on('click', function () {
		$('#add-mod-employee').text('Registrar terminal');
        cleanForm();
        showAddEmployee();
    });
	//
	$("#form-add-user").validator().on('submit', function (e) {
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
	$("#seccion-table-employee").empty();
	// Llenar tabla empleados
	sendPostAction(COMPANY_CONTROLLER + 'findCompany', null, respFindAll);
}

function respFindAll(data){
	// $('body').toggleClass('open');
	if(data){
		var tableEmployee =	  ' <table id="bootstrap-data-table"				'
							+ ' 	class="table mb-0">							'
							+ ' <thead>                                         '
							+ ' 	<tr>                                        '
							+ ' 		<th>Acciones    											</th>                          '

							+ ' 		<th>Nombre Completo											</th>                          '
							+ ' 		<th>Correo													</th>                          '
							+ ' 		<th>Compañia												</th>                          '
							+ ' 		<th>Dirección				                                </th>                          '
							+ ' 		<th>Llave de encriptación									</th>                          '
							
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
				enabledDelete = '<i class="fa fa-trash-o btn btn-danger" title="Eliminar" onclick="confirmDeleteEmployee(\'' + rowEmployee.name + ' ' + rowEmployee.lastName + '\',' + rowEmployee.id + ',' + 0 + ')" style="cursor: pointer"></i>';
			}
			var actions =
				enabledDelete + 
				'<i class="fa fa-pencil btn btn-warning" title="Editar" onclick="editEmployee(\'' 
				+ rowEmployee.id + '\',' 
				+ '\'' + rowEmployee.name + '\',' 
				+'\'' + rowEmployee.lastName + '\',' 
				
				+'\'' + rowEmployee.email 			+ '\',' 
				+'\'' + rowEmployee.name_company 	+ '\',' 
				+'\'' + rowEmployee.address_company	+ '\',' 
				+'\'' + rowEmployee.rol 			+ '\')" style="cursor: pointer"></i>';
			
			var tr = '<tr id="employee_' + rowEmployee.id + '">';

			tr += '<td align="center">'+ actions +'</td>';
			tr += '<td>'+ rowEmployee.name + ' ' + rowEmployee.lastName +'</td>';
			tr += '<td>'+ rowEmployee.email								+'</td>';
			
			tr += '<td>'+ rowEmployee.name_company						+'</td>';
			tr += '<td>'+ rowEmployee.address_company					+'</td>';
			tr += '<td>'+ rowEmployee.keyBase_company                   +'</td>';
			
			tr += '</tr>';
			tableEmployee += tr;
		}
		tableEmployee += '</tbody>'
						+ ' </table>';
	}
	
	var wrapper = $("#seccion-table-employee");
	$(wrapper).append(tableEmployee); // add html
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
    $("#btn-cancel-employee").show();
	$("#btn-save-employee").show();
}

function hideAddEmployee() {
	$('#info-employee').css('display', 'block');
    $('#add-employee').css('display', 'none');
    $("#btn-cancel-employee").hide();
	$("#btn-save-employee").hide();
}

function saveUser() {
	var user = new User();
	user.id										= ID_EMPLOYEE_GRAL;
	user.email									= '' + $('#email').val();
	user.password								= '' + $('#pass').val();
	user.name									= '' + $('#name_user').val();
	
	// Llenar Role
	var role = new Role();
	role.role 									= '' + $('#rol').val();
	user.roles 									= [role];
	
	// Llenar Company
	var compania = new company();
	compania.name       						= '' + $('#name_company').val();
	compania.address    						= '' + $('#address_company').val();
	compania.active     						= 1;
	user.company								= compania;
	//
	if(ID_EMPLOYEE_GRAL > 0) {
		sendPostAction(COMPANY_CONTROLLER + 'saveUserCompany/edit', user, respSaveCompany);
	} else {
		sendPostAction(COMPANY_CONTROLLER + 'saveUserCompany/save', user, respSaveCompany);
	}
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

function confirmDeleteEmployee(name, id, active) {
    $.jAlert({
        'type': 'confirm',
        'title': 'Confirmación',
        'confirmQuestion': '¿ Seguro de eliminar información basica a </br>' + name + ' ?',
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
	sendPostAction(COMPANY_CONTROLLER + 'enabledUserCompany/' + id + '/' + active, null, respActiveEmployeeGral);
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

function editEmployee(id, name, lastName, email, name_company, address_company, rol) {
	$('#add-mod-employee').text('Información de ' + name_company);
	//
	ID_EMPLOYEE_GRAL = id;
	cleanForm();
	$('#email').val(email);
	$('#pass').val('CONFIDENTIAL');
	$('#name_user').val(name + ' '  + lastName);
	$('#name_company').val(name_company);
	$('#address_company').val(address_company);
	$('#rol').val(rol);
	//
	showAddEmployee();
}

function cleanForm() {
	$("#form-add-user")[0].reset();
}