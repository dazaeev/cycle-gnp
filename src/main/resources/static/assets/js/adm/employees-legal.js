/*
 * @autor Nazario Dazaeev Gonzalez Herrera
 * Controller 
 * Pagina de control "employee_legal"
 */

// Variables Globales
var ID_EMPLOYEE_GRAL = 0;
var ID_EMPLOYEE_LEGAL = 0;

var NAME_ADMINISTRATIVEACTASATTENTION = '';
var FILE_ADMINISTRATIVEACTASATTENTION = '';

// Cargando sistema
$(document).ready(function($) {
	startingSystemMenu();
	//
	initTable();
	//
	$('#btn-cancel-employee').on('click', function () {
		NAME_ADMINISTRATIVEACTASATTENTION = '';
		ID_EMPLOYEE_GRAL = 0;
		ID_EMPLOYEE_LEGAL = 0;
		cleanForm();
	    hideAddEmployee();
	});
	$('#btn-save-employee').on('click', function () {
        console.log('Guardar empleado');
        $("#form-add-employee").submit();
    });
	$('#btn-cancel-view-employee').on('click', function () {
        cleanForm();
        hideViewDocEmployee();
    });
	$('#btn-download-view-employee').on('click', function () {
        cleanForm();
        viewDocActa(0, name, 'download', 'download');
    });
	$('#btn-view-acta').on('click', function () {
		cleanForm();
	    viewDocActa(0, name, 'download', 'download');
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
	sendPostAction(EMPLOYEE_GRAL_CONTROLLER + 'findEmployeeLegal', null, respFindAll);
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
							
							+ ' 		<th>Actas Administrativas									</th>                          '
							+ ' 		<th>Fecha Baja												</th>                          '
							+ ' 		<th>Motivo Baja												</th>                          '
							+ ' 		<th>Password RRHH											</th>                          '
							+ ' 		<th>Pagares Capacitación									</th>                          '
							
							+ ' 	</tr>                                       '
							+ ' </thead>                                        '
							+ ' <tbody>                                         ';
		for (var i = 0; i < data.length; i++){
			var rowEmployee = data[i];
			// Validar boton para Ver o descargar documento
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
										+ '\'' + rowEmployee.name + ' ' + rowEmployee.lastName 	+ '\','
										+ '\'' + rowEmployee.administrativeActasAttention       + '\','
										+ '\'' + rowEmployee.dischargeDate                		+ '\','
										+ '\'' + rowEmployee.reasonLow         					+ '\','
										+ '\'' + rowEmployee.passwordGeneratedRrhh          	+ '\','
										+ '\'' + rowEmployee.trainingPromissoryNotes       		+ '\''
										
										+ ')" style="cursor: pointer"></i>';
			
			var tr = '<tr id="employee_' + rowEmployee.id + '">';
			
			tr += '<td align="center">'+ actions +'</td>';
			tr += '<td>'+ rowEmployee.name + ' ' + rowEmployee.lastName +'</td>';
			if(rowEmployee.administrativeActasAttention) {
				tr += '<td>' 
						+ '<i class="fa fa-download btn btn-info" title="Ver o descargar documento" onclick="viewDocActa(\'' 
								+ rowEmployee.id + '\','
								+ '\'' + rowEmployee.name + ' ' + rowEmployee.lastName 	+ '\','
								+ '\'' + rowEmployee.administrativeActasAttention + '\','
								+ '\'view\''
								+ ')" style="cursor: pointer"></i>'  
					+'</td>';
			} else {
				tr += '<td>'+ rowEmployee.administrativeActasAttention  +'</td>';
			}
			tr += '<td>'+ rowEmployee.dischargeDate                 +'</td>';
			tr += '<td>'+ rowEmployee.reasonLow                     +'</td>';
			tr += '<td>'+ rowEmployee.passwordGeneratedRrhh         +'</td>';
			tr += '<td>'+ rowEmployee.trainingPromissoryNotes       +'</td>';
			
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
	$("#btn-download-view-employee").hide();
}

function hideAddEmployee() {
	$('#info-employee').css('display', 'block');
    $('#add-employee').css('display', 'none');
    $("#btn-cancel-employee").hide();
	$("#btn-save-employee").hide();
	$("#btn-download-view-employee").hide();
}

function showViewDocEmployee() {
	$('#info-employee').css('display', 'none');
    $('#view-employee').css('display', 'block');
    $("#btn-cancel-view-employee").show();
    $("#btn-download-view-employee").show();
}

function hideViewDocEmployee() {
	$('#info-employee').css('display', 'block');
    $('#view-employee').css('display', 'none');
    $("#btn-cancel-view-employee").hide();
    $("#btn-download-view-employee").hide();
}

function saveEmployee() {
	var user = new User();
	user.id										= ID_EMPLOYEE_GRAL;
	user.email									= sessionStorage.getItem("email");
	// Llenar Empleado
	var employeegral = new employeeGral();
	var employeelegal = new employeeLegal();
	
	if(NAME_ADMINISTRATIVEACTASATTENTION) {
		// Editar
		if(castNameFileToTypeFile('administrativeActasAttention')) {
			employeelegal.administrativeActasAttention	= castNameFileToTypeFile('administrativeActasAttention');
		} else {
			employeelegal.administrativeActasAttention	= NAME_ADMINISTRATIVEACTASATTENTION;
		}
	} else {
		// Guardar
		employeelegal.administrativeActasAttention	= castNameFileToTypeFile('administrativeActasAttention');
	}
	employeelegal.fileAdministrativeActasAttention	= FILE_ADMINISTRATIVEACTASATTENTION;
	
	employeelegal.dischargeDate					= '' + $('#dischargeDate').val();
	employeelegal.reasonLow						= '' + $('#reasonLow').val();
	employeelegal.passwordGeneratedRrhh			= '' + $('#passwordGeneratedRrhh').val();
	employeelegal.trainingPromissoryNotes		= '' + $('#trainingPromissoryNotes').val();
	employeelegal.active						= 1;
	// Setear Empleado Laboral
	employeegral.employeeLegal = [employeelegal];
	// Setear Empleado General
	user.employee = employeegral;
	console.log(user);
	//
	sendPostAction(EMPLOYEE_GRAL_CONTROLLER + 'saveUserEmployeeLegal/' + ID_EMPLOYEE_LEGAL, user, respSaveEmployeeGral);
}

function respSaveEmployeeGral(data) {
	// cleanGeneralVariables();
	NAME_ADMINISTRATIVEACTASATTENTION = '';
	FILE_ADMINISTRATIVEACTASATTENTION = '';
	ID_EMPLOYEE_GRAL = 0;
	ID_EMPLOYEE_LEGAL = 0;
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
	sendPostAction(EMPLOYEE_GRAL_CONTROLLER + 'enabledUserEmployeeLegal/' + idEmployee + '/' + active, null, respActiveEmployeeLegal);
}

function respActiveEmployeeLegal(data) {
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
	$('#btn-view-acta').css('display', 'none');
	//
	var splitId = id.split('_');
	if(splitId.length == 2) {
		ID_EMPLOYEE_GRAL = splitId[0];
	} else {
		ID_EMPLOYEE_GRAL = id;
	}
	ID_EMPLOYEE_LEGAL = 0;
	
	cleanForm();
	//
	showAddEmployee();
}

function editEmployee(id, name, administrativeActasAttention, dischargeDate, reasonLow, passwordGeneratedRrhh, trainingPromissoryNotes) {
	$('#add-mod-employee').text('Información de ' + name);
	//
	NAME_ADMINISTRATIVEACTASATTENTION = administrativeActasAttention;
	var splitId = id.split('_');
	if(splitId.length == 2) {
		ID_EMPLOYEE_GRAL = splitId[0];
		ID_EMPLOYEE_LEGAL = splitId[1];
	} else {
		ID_EMPLOYEE_GRAL = id;
		ID_EMPLOYEE_LEGAL = 0;
	}
	cleanForm();
	// validar si contiene archivo Ver o descargar documento
	if(administrativeActasAttention) {
		$('#btn-view-acta').css('display', 'block');
	} else {
		$('#btn-view-acta').css('display', 'none');
	}
	$('#administrativeActasAttention').attr('value', administrativeActasAttention);
	$('#dischargeDate').val(dischargeDate);
	$('#reasonLow').val(reasonLow);
	$('#passwordGeneratedRrhh').val(passwordGeneratedRrhh);
	$('#immediateBoss').val(trainingPromissoryNotes);
	//
	showAddEmployee();
}

function cleanForm() {
	$("#form-add-employee")[0].reset();
}

function setValueFile(inputFile) {
	if (inputFile == 'administrativeActasAttention') {
		var localAdministrativeActasAttention = $('#' + inputFile)[0].files[0];
		var readerAdministrativeActasAttention = new FileReader();
		readerAdministrativeActasAttention.onloadend = function() {
			FILE_ADMINISTRATIVEACTASATTENTION = readerAdministrativeActasAttention.result;
		}
		if (localAdministrativeActasAttention) {
			readerAdministrativeActasAttention.readAsDataURL(localAdministrativeActasAttention);
		} else {
			FILE_ADMINISTRATIVEACTASATTENTION = '';
		}
	}
}

function viewDocActa(id, name, administrativeActasAttention, action) {
	// Ver o descargar documento
	$('#lTypeDocument').empty();
	if(action == 'view') {
		// Ver documento
		var splitName = administrativeActasAttention.split('____');
		if(splitName.length == 2) {
			$('#lTypeDocument').text(name + ' (' + splitName[0] + ')');
		} else {
			$('#lTypeDocument').text(name + ' (' + splitName[1] + ')');
		}
		//
		console.log('Ver o descargar documento: ' + administrativeActasAttention);
		//
		$("#contentDocEmployee").empty();
		var splitId = id.split('_');
		if(splitId.length == 2) {
			ID_EMPLOYEE_GRAL = splitId[0];
			ID_EMPLOYEE_LEGAL = splitId[1];
			sendPostAction(EMPLOYEE_GRAL_CONTROLLER + 'viewActaEmployeeLegal/' + ID_EMPLOYEE_GRAL + '/' + ID_EMPLOYEE_LEGAL, null, respActaEmployeeLegal);
		} else {
			showDivMessage('Error en visualizar archivo', 'alert-danger', 4000);
		}
	}
	if(action == 'download') {
		// Descargar documento
		sendPostAction(EMPLOYEE_GRAL_CONTROLLER + 'viewActaEmployeeLegal/' + ID_EMPLOYEE_GRAL + '/' + ID_EMPLOYEE_LEGAL, null, respDownloadActaEmployeeLegal);
	}
}

function respActaEmployeeLegal(data) {
	if(data) {
		showViewDocEmployee();
		if(data.status == 'Ok') {
			$("#contentDocEmployee").empty();
			var dataUri = data.base64Document;
			if (dataUri.includes('application/xml') || 
					dataUri.includes('text/xml') || 
					dataUri.includes('text/plain') || 
					dataUri.includes('application/javascript') ||
					dataUri.includes('application/json') ||
					dataUri.includes('text/css') ||
					dataUri.includes('text/csv')) {
				$.ajax({
					url : dataUri,
					dataType : "text",
					success : function(data) {
						$("#contentDocEmployee").append('<textarea id="areaText" class="form-control rounded-0" style="overflow:hidden" rows="30"></textarea>');
						$("#areaText").text(data);
					}
				});
			} else {
			    var viewDoc = '<object style="width: 100%;height: 1000px;" class="w100" data="' + dataUri + '"></object>';
			    $("#contentDocEmployee").append(viewDoc);
			}
		} else {
			showDivMessage(data.error, 'alert-danger', 4000);
		}
	} else {
		showDivMessage('Valores vacios', 'alert-danger', 3000);
	}
}

function respDownloadActaEmployeeLegal(data) {
	if(data) {
		if(data.status == 'Ok') {
			$("#contentDocEmployee").empty();
			var dataUri = data.base64Document;
			var link = document.createElement("a");
			link.setAttribute("target","_blank");
			link.setAttribute("href",dataUri);
			link.setAttribute("download","DocumentBeIT " + data.email + getExtention(data.typedocument));
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} else {
			showDivMessage(data.error, 'alert-danger', 4000);
		}
	} else {
		showDivMessage('Valores vacios', 'alert-danger', 3000);
	}
}