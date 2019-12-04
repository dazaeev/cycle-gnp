/*
 * @autor Nazario Dazaeev Gonzalez Herrera
 * Controller 
 * Pagina de consulta Empleados todos
 */
var ID_EMPLOYEE_DEMOGRAFICS = 0;
// Cargando sistema
$(document).ready(function($) {
	startingSystemMenu();
	//Llenar tabla empleados
	initTable();
	//
	$('#btn-cancel-employee').on('click', function () {
		ID_EMPLOYEE_DEMOGRAFICS = 0;
		cleanForm();
	    hideAddEmployee();
	});
	
	$('#btn-save-employee').on('click', function () {
        console.log('Guardar empleado');
        $("#form-add-employee").submit();
    });
	//
	$("#form-add-employee").validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {
			console.log('Formulario invalido');
			showDivMessage('Favor de completar campos obligatorios', 'alert-danger', 2000);
		} else {
			saveEmployee();
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
	sendPostAction(EMPLOYEE_GRAL_CONTROLLER + 'findEmployeeDemographics', null, respFindAll);
}

function respFindAll(data){
	// $('body').toggleClass('open');
	if(data){
		var tableEmployee =	  ' <table id="bootstrap-data-table"				'
							+ ' 	class="table mb-0">							'
							+ ' <thead>                                         '
							+ ' 	<tr>                                        '
							+ ' 		<th>Acciones												</th>                          '
							
							+ ' 		<th>Nombre Completo 										</th>                          '
							
							+ ' 		<th>Calle Numero			                                </th>                          '
							+ ' 		<th>Colonia    				                                </th>                          '
							+ ' 		<th>Delegacion Municipio									</th>                          '
							+ ' 		<th>Codigo Postal    		                                </th>                          '
							+ ' 		<th>Estado    				                                </th>                          '
							
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
				'<i class="fa fa-pencil btn btn-warning" title="Editar" onclick="editEmployee(\'' 	+ rowEmployee.id 										+ '\',' 
																									+ '\'' + rowEmployee.name + ' '+ rowEmployee.lastName  	+ '\',' 
																									+ '\'' + rowEmployee.streetNumber   				   	+ '\',' 
																									+ '\'' + rowEmployee.colony			 					+ '\',' 
																									+ '\'' + rowEmployee.delegationMunicipality				+ '\',' 
																									+ '\'' + rowEmployee.postalCode 						+ '\',' 
																									+ '\'' + rowEmployee.state 								+ '\'' 
																									+ ')" style="cursor: pointer"></i>';

			
			var tr = '<tr id="employee_' + rowEmployee.id + '">';
			tr += '<td align="center">'+ actions +'</td>';
			tr += '<td>'+ rowEmployee.name + ' ' + rowEmployee.lastName +'</td>';
			
			tr += '<td>'+ rowEmployee.streetNumber                  +'</td>';
			tr += '<td>'+ rowEmployee.colony                        +'</td>';
			tr += '<td>'+ rowEmployee.delegationMunicipality        +'</td>';
			tr += '<td>'+ rowEmployee.postalCode                    +'</td>';
			tr += '<td>'+ rowEmployee.state                         +'</td>';
			
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

function editEmployee(id, name, streetNumber, colony, delegationMunicipality, postalCode, state) {
	$('#add-mod-employee').text('Información de ' + name);
	//
	ID_EMPLOYEE_DEMOGRAFICS = id;
	cleanForm();
	$('#name').val(name);
	$('#streetNumber').val(streetNumber);
	$('#colony').val(colony);
	$('#delegationMunicipality').val(delegationMunicipality);
	$('#postalCode').val(postalCode);
	$('#state').val(state);
	//
	showAddEmployee();
}

function confirmDeleteEmployee(name, id, active) {
    $.jAlert({
        'type': 'confirm',
        'title': 'Confirmación',
        'confirmQuestion': '¿ Seguro de eliminar información demográfica a </br>' + name + ' ?',
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
	sendPostAction(EMPLOYEE_GRAL_CONTROLLER + 'enabledUserEmployeeDemographic/' + id + '/' + active, null, respActiveEmployeeDemographic);
}

function respActiveEmployeeDemographic(data) {
	if(data && data[1] == 'Ok'){
		showDivMessage(data[2], 'alert-info', 2000);
		// $('#bootstrap-data-table tr#employee_' + data[3]).remove();
		// window.location = '/adm/employees-gral.html';
		initTable();
	} else {
		showDivMessage(data[2], 'alert-danger', 5000);
	}
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

function saveEmployee() {
	var user = new User();
	user.id										= ID_EMPLOYEE_DEMOGRAFICS;
	user.email									= sessionStorage.getItem("email");
	// Llenar Empleado
	var employeegral = new employeeGral();
	var employeedemographics = new employeeDemographics();
	employeedemographics.streetNumber           	 	= '' + $('#streetNumber').val();
	employeedemographics.colony                         = '' + $('#colony').val();
	employeedemographics.delegationMunicipality         = '' + $('#delegationMunicipality').val();
	employeedemographics.postalCode                     = '' + $('#postalCode').val();
	employeedemographics.state                    	   	= '' + $('#state').val();
	employeedemographics.active             		   	= 1;
	
	// Setear Empleado
	employeegral.employeeDemographics = employeedemographics;
	user.employee = employeegral;
	
	console.log(user);
	//
	sendPostAction(EMPLOYEE_GRAL_CONTROLLER + 'saveUserEmployeeDemographics', user, respSaveEmployeeDemographics);
}

function respSaveEmployeeDemographics(data) {
	// cleanGeneralVariables();
	ID_EMPLOYEE_DEMOGRAFICS = 0;
	if(data && data[1] == 'Ok'){
		showDivMessage(data[2], 'alert-info', 3000);
		initTable();
	} else {
		showDivMessage(data[2], 'alert-danger', 5000);
	}
}

function cleanForm() {
	$("#form-add-employee")[0].reset();
}