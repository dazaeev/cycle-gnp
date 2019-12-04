/*
 * @autor Nazario Dazaeev Gonzalez Herrera
 * Controller 
 * Pagina de control "employee_labor"
 */

// Variables Globales
var ID_EMPLOYEE_GRAL = 0;
var ID_EMPLOYEE_LABOR = 0;

// Cargando sistema
$(document).ready(function($) {
	startingSystemMenu();
	//
	initTable();
	//
	$('#btn-cancel-employee').on('click', function () {
		ID_EMPLOYEE_GRAL = 0;
		ID_EMPLOYEE_LABOR = 0;
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
	sendPostAction(EMPLOYEE_GRAL_CONTROLLER + 'findEmployeeLabor', null, respFindAll);
}

function respFindAll(data){
	// $('body').toggleClass('open');
	if(data){
		var tableEmployee =	  ' <table id="bootstrap-data-table"				'
							+ ' 	class="table mb-0">							'
							+ ' <thead>                                         '
							+ ' 	<tr>                                        '
							
							+ ' 		<th style="min-width: 90px;!important;">Acciones			</th>                          '
							
							+ ' 		<th>Nombre Completo											</th>                          '
							
							+ ' 		<th>Fecha Ingreso											</th>                          '
							+ ' 		<th>Area                                                    </th>                          '
							+ ' 		<th>Puesto                                                  </th>                          '
							+ ' 		<th>Historial Puesto										</th>                          '
							+ ' 		<th>Jefe Inmediato                                          </th>                          '
							+ ' 		<th>Vacaciones Tomadas(dias)                           		</th>                          '
							+ ' 		<th>Vacaciones Pendientes(dias)	                        	</th>                          '
							+ ' 		<th>SGMM #Poliza											</th>                          '
							+ ' 		<th>Numero Empleado											</th>                          '
							+ ' 		<th>Email                                                   </th>                          '
							
							+ ' 	</tr>                                       '
							+ ' </thead>                                        '
							+ ' <tbody>                                         ';
		for (var i = 0; i < data.length; i++){
			var rowEmployee = data[i];
			// Validar botones
			var enabledDelete = '';
			if(rowEmployee.enabled) {
				// enabled = 'style="display: none;"';
				enabledDelete = '<i class="fa fa-trash-o btn btn-secondary" title="No existe Datos Laborales"></i>';
			} else {
				enabledDelete = '<i class="fa fa-trash-o btn btn-danger" title="Eliminar" onclick="confirmDeleteEmployee(\'' 
										+ rowEmployee.name + ' ' + rowEmployee.lastName + '\',' 
										+ '\'' + rowEmployee.id + '\','
										+ 0 + ')" style="cursor: pointer"></i>';
			}
			var addRow = 
				'<i class="fa fa-save btn btn-info" title="Agregar" onclick="addEmployee(\'' 
										+ rowEmployee.id + '\','
										+ '\'' + rowEmployee.name + ' ' + rowEmployee.lastName + '\''
										+ ')" style="cursor: pointer"></i>';
			var actions =
				addRow + 
				enabledDelete + 
				'<i class="fa fa-pencil btn btn-warning" title="Editar" onclick="editEmployee(\'' 
										+ rowEmployee.id + '\','
										+ '\'' + rowEmployee.name + ' ' + rowEmployee.lastName + '\','
										+ '\'' + rowEmployee.dateAdmission       + '\','
										+ '\'' + rowEmployee.area                + '\','
										+ '\'' + rowEmployee.marketStall         + '\','
										+ '\'' + rowEmployee.jobHistory          + '\','
										+ '\'' + rowEmployee.immediateBoss       + '\','
										+ '\'' + rowEmployee.holidaysDaysTaken   + '\','
										+ '\'' + rowEmployee.holidaysDaysPending + '\','
										+ '\'' + rowEmployee.sgmm                + '\','
										+ '\'' + rowEmployee.employeeNumber      + '\','
										+ '\'' + rowEmployee.email               + '\''
										
										+ ')" style="cursor: pointer"></i>';
			
			var tr = '<tr id="employee_' + rowEmployee.id + '">';
			
			tr += '<td align="center">'+ actions +'</td>';
			tr += '<td>'+ rowEmployee.name + ' ' + rowEmployee.lastName +'</td>';
			
			tr += '<td>'+ rowEmployee.dateAdmission                 +'</td>';
			tr += '<td>'+ rowEmployee.area                          +'</td>';
			tr += '<td>'+ rowEmployee.marketStall                   +'</td>';
			tr += '<td>'+ rowEmployee.jobHistory                    +'</td>';
			tr += '<td>'+ rowEmployee.immediateBoss                 +'</td>';
			tr += '<td>'+ rowEmployee.holidaysDaysTaken             +'</td>';
			tr += '<td>'+ rowEmployee.holidaysDaysPending           +'</td>';
			tr += '<td>'+ rowEmployee.sgmm                          +'</td>';
			tr += '<td>'+ rowEmployee.employeeNumber                +'</td>';
			tr += '<td>'+ rowEmployee.email                         +'</td>';
			
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

function saveEmployee() {
	var user = new User();
	user.id										= ID_EMPLOYEE_GRAL;
	user.email									= sessionStorage.getItem("email");
	// Llenar Empleado
	var employeegral = new employeeGral();
	var employeelabor = new employeeLabor();
	employeelabor.dateAdmission			= '' + $('#dateAdmission').val();            
	employeelabor.area                  = '' + $('#area').val();                              
	employeelabor.marketStall           = '' + $('#marketStall').val();                
	employeelabor.jobHistory            = '' + $('#jobHistory').val();                  
	employeelabor.immediateBoss         = '' + $('#immediateBoss').val();            
	employeelabor.holidaysDaysTaken     = '' + $('#holidaysDaysTaken').val();    
	employeelabor.holidaysDaysPending   = '' + $('#holidaysDaysPending').val();
	employeelabor.sgmm                  = '' + $('#sgmm').val();                              
	employeelabor.employeeNumber        = '' + $('#employeeNumber').val();          
	employeelabor.email                 = '' + $('#email').val();
	employeelabor.active				= 1;
	// Setear Empleado Laboral
	employeegral.employeeLabor = [employeelabor];
	// Setear Empleado General
	user.employee = employeegral;
	console.log(user);
	//
	sendPostAction(EMPLOYEE_GRAL_CONTROLLER + 'saveUserEmployeeLabor/' + ID_EMPLOYEE_LABOR, user, respSaveEmployeeGral);
}

function respSaveEmployeeGral(data) {
	// cleanGeneralVariables();
	ID_EMPLOYEE_GRAL = 0;
	ID_EMPLOYEE_LABOR = 0;
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
	var splitId = id.split('_');
	var idEmployee = 0;
	if(splitId.length == 2) {
		idEmployee = splitId[1];
	}
	sendPostAction(EMPLOYEE_GRAL_CONTROLLER + 'enabledUserEmployeeLabor/' + idEmployee + '/' + active, null, respActiveEmployeeLabor);
}

function respActiveEmployeeLabor(data) {
	if(data && data[1] == 'Ok'){
		showDivMessage(data[2], 'alert-info', 2000);
		initTable();
	} else {
		showDivMessage(data[2], 'alert-danger', 5000);
	}
}

function addEmployee(id, name) {
	$('#add-mod-employee').text('Agregando a ' + name);
	//
	var splitId = id.split('_');
	if(splitId.length == 2) {
		ID_EMPLOYEE_GRAL = splitId[0];
	} else {
		ID_EMPLOYEE_GRAL = id;
	}
	ID_EMPLOYEE_LABOR = 0;
	
	cleanForm();
	//
	showAddEmployee();
}

function editEmployee(id, name, dateAdmission, area, marketStall, jobHistory, immediateBoss, holidaysDaysTaken, holidaysDaysPending, sgmm, employeeNumber, email) {
	$('#add-mod-employee').text('Información de ' + name);
	//
	var splitId = id.split('_');
	if(splitId.length == 2) {
		ID_EMPLOYEE_GRAL = splitId[0];
		ID_EMPLOYEE_LABOR = splitId[1];
	} else {
		ID_EMPLOYEE_GRAL = id;
		ID_EMPLOYEE_LABOR = 0;
	}
	cleanForm();
	$('#dateAdmission').val(dateAdmission);
	$('#area').val(area);
	$('#marketStall').val(marketStall);
	$('#jobHistory').val(jobHistory);
	$('#immediateBoss').val(immediateBoss);
	$('#holidaysDaysTaken').val(holidaysDaysTaken);
	$('#holidaysDaysPending').val(holidaysDaysPending);
	$('#sgmm').val(sgmm);
	$('#employeeNumber').val(employeeNumber);
	$('#email').val(email);
	//
	showAddEmployee();
}

function cleanForm() {
	$("#form-add-employee")[0].reset();
}