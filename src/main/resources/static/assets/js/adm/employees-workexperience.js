/*
 * @autor Nazario Dazaeev Gonzalez Herrera
 * Controller 
 * Pagina de consulta Empleados todos
 */
var ID_EMPLOYEE_WORKEXPERIENCE = 0;

// Cargando sistema
$(document).ready(function($) {
	startingSystemMenu();
	//Llenar tabla empleados
	initTable();
	//
	$('#btn-cancel-employee').on('click', function () {
		ID_EMPLOYEE_WORKEXPERIENCE = 0;
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
	sendPostAction(EMPLOYEE_GRAL_CONTROLLER + 'findEmployeeWorkexperience', null, respFindAll);
}

function respFindAll(data){
	// $('body').toggleClass('open');
	if(data){
		var tableEmployee =	  ' <table id="bootstrap-data-table"				'
							+ ' 	class="table mb-0">							'
							+ ' <thead>                                         '
							+ ' 	<tr>                                        '
							+ ' 		<th>Acciones												</th>                          '
							
							+ ' 		<th>Nombre Completo											</th>                          '
							
							+ ' 		<th>1er Empleo                                              </th>                          '
							+ ' 		<th>2do Empleo                                              </th>                          '
							+ ' 		<th>3er Empleo                                              </th>                          '
							
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
																									+ '\'' + rowEmployee.employmentA						+ '\',' 
																									+ '\'' + rowEmployee.employmentB 						+ '\',' 
																									+ '\'' + rowEmployee.employmentC						+ '\'' 
																									+ ')" style="cursor: pointer"></i>';

			
			
			var tr = '<tr id="employee_' + rowEmployee.id + '">';
			tr += '<td align="center">'+ actions +'</td>';
			
			tr += '<td>'+ rowEmployee.name +' ' + rowEmployee.lastName +'</td>';
			
			tr += '<td>'+ rowEmployee.employmentA                   +'</td>';
			tr += '<td>'+ rowEmployee.employmentB                   +'</td>';
			tr += '<td>'+ rowEmployee.employmentC                   +'</td>';
			
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

function editEmployee(id, name, employmentA, employmentB, employmentC) {
	$('#add-mod-employee').text('Información de ' + name);
	//
	ID_EMPLOYEE_WORKEXPERIENCE = id;
	cleanForm();
	$('#employmentA').val(employmentA);
	$('#employmentB').val(employmentB);
	$('#employmentC').val(employmentC);
	//
	showAddEmployee();
}

function confirmDeleteEmployee(name, id, active) {
    $.jAlert({
        'type': 'confirm',
        'title': 'Confirmación',
        'confirmQuestion': '¿ Seguro de eliminar información laboral a </br>' + name + ' ?',
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
	sendPostAction(EMPLOYEE_GRAL_CONTROLLER + 'enabledUserEmployeeWorkExperience/' + id + '/' + active, null, respActiveEmployeeWorkExperience);
}

function respActiveEmployeeWorkExperience(data) {
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
	user.id										= ID_EMPLOYEE_WORKEXPERIENCE;
	user.email									= sessionStorage.getItem("email");
	// Llenar Empleado
	var employeegral = new employeeGral();
	var employeeworkexperience = new employeeWorkExperience();
	employeeworkexperience.employmentA					= '' + $('#employmentA').val();
	employeeworkexperience.employmentB					= '' + $('#employmentB').val();
	employeeworkexperience.employmentC					= '' + $('#employmentC').val();
	employeeworkexperience.active             		   	= 1;
	
	// Setear Empleado
	employeegral.employeeWorkExperience = employeeworkexperience;
	user.employee = employeegral;
	
	console.log(user);
	//
	sendPostAction(EMPLOYEE_GRAL_CONTROLLER + 'saveUserEmployeeWorkExperience', user, respSaveEmployeeWorkExperience);
}

function respSaveEmployeeWorkExperience(data) {
	// cleanGeneralVariables();
	ID_EMPLOYEE_WORKEXPERIENCE = 0;
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