/*
 * @autor Nazario Dazaeev Gonzalez Herrera
 * Controller 
 * Pagina de control "employee_gral"
 */

// Variables Globales
var ID_EMPLOYEE_GRAL = 0;
var ID_USER = 0;
var ID_FILE = 0;
var BRIDGE = null;
var GSTORAGE = null;
var GCLOUD_JOBS = null;
var MAINFRAME = null;
var MANUALS = null;
// Cargando sistema
$(document).ready(function($) {
	startingSystemMenu();
	//
	initTable();
	//
	initializeVariables();
	//
	$('#btn-cancel-view-employee').on('click', function () {
	    hideViewEmployee();
	});
	$('#btn-save-employee').on('click', function () {
        console.log('Guardar empleado');
    });
	//
	$('#btn-cancel-view-detail').on('click', function () {
	    hideViewDetail();
	});
});

function initTable() {
	// iniciar contenido tabla
	$("#seccion-table-employee").empty();
	// Llenar tabla empleados
	sendPostAction(CICLE_CONTROLLER + 'findCicle', null, respFindAll);
}

function respFindAll(data){
	if(data){
		var tableEmployee =	  ' <table id="bootstrap-data-table"				'
							+ ' 	class="table mb-0">							'
							+ ' <thead>                                         '
							+ ' 	<tr>                                        '
							+ ' 		<th>Acciones				</th>		'

							+ ' 		<th>Nombre Completo			</th>		'
							
							+ ' 		<th>Fecha Nacimiento		</th>		'
							+ ' 		<th>Sexo					</th>		'
							+ ' 		<th>Estado Civil			</th>		'
							+ ' 		<th>Nacionalidad			</th>		'
							
							+ ' 	</tr>                                       '
							+ ' </thead>                                        '
							+ ' <tbody>                                         ';
		for (var i = 0; i < data.length; i++){
			var rowEmployee = data[i];
			// Validar botones
			var enabledRun = '';
			if(rowEmployee.enabled) {
				// enabled = 'style="display: none;"';
				enabledRun = '<i class="fa fa-trash-o btn btn-secondary" title="No existe información Básica"></i>';
			} else {
				enabledRun = '<i class="fa fa-arrow-right btn btn-info" title="Ver estatus" onclick="confirmRun(\'' + rowEmployee.name + ' ' + rowEmployee.lastName + '\',' + rowEmployee.id + ',' + 0 + ')" style="cursor: pointer"></i>';
			}
			var actions =
				'<i class="fa fa-search btn btn-success" title="Ver" onclick="view(\'' + rowEmployee.name + ' ' + rowEmployee.lastName + '\',' + rowEmployee.id + ',' + 0 + ')" style="cursor: pointer"></i>'
					+ enabledRun;
			
			var tr = '<tr id="employee_' + rowEmployee.id + '">';

			tr += '<td align="center">'+ actions +'</td>';
			tr += '<td>'+ rowEmployee.name + ' ' + rowEmployee.lastName +'</td>';
			
			tr += '<td>'+ rowEmployee.birthdate						+'</td>';
			tr += '<td>'+ rowEmployee.sex                           +'</td>';
			tr += '<td>'+ rowEmployee.civilStatus                   +'</td>';
			tr += '<td>'+ rowEmployee.nationality                   +'</td>';
			
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

function confirmRun(name, id, active) {
    $.jAlert({
        'type': 'confirm',
        'title': 'Confirmación',
        'confirmQuestion': '¿ Seguro de iniciar proceso GCLOUD - KAIZEN </br>' + name + ' ?',
        'confirmBtnText': 'Si',
        'denyBtnText': 'No estoy seguro',
        'theme': 'tBeIt',
        'size': 'sm',
        'showAnimation': 'fadeInUp',
        'hideAnimation': 'fadeOutDown',
        'onConfirm': function (e, btn) {
        	initCicle(name, id);
        }
    });
}

function initCicle(name, id) {
	console.log("Inicialdo proceso kaizen");
	showPreloader(true);
	var data = {
			name : name,
			id : id
	}
	sendPostAction(CICLE_CONTROLLER + 'initCicleGral' , data, respCicleGral);
}

function respCicleGral(data) {
	if(data) {
		console.log(data);
		if(data[0].status == 'Ok') {
			showDivMessage('Proceso completado, ver reporte.', 'alert-info', 6000);
		} else {
			showDivMessage(data[0].error, 'alert-danger', 6000);
		}
	}
	showPreloader(false);
}

function view(name, id, active) {
	showPreloader(true);
	console.log("Ver proceso kaizen");
	// iniciar contenido tabla
	$("#seccion-table-view-employee").empty();
	// Llenar tabla reporte
	var data = {
			name : name,
			id : id
	}
	sendPostAction(CICLE_CONTROLLER + 'viewCicleGral' , data, respViewCicleGral);
}

function respViewCicleGral(data) {
	showViewEmployee();
	if(data){
		var tableEmployee =	  ' <table id="bootstrap-data-table-view"	'
							+ ' 	class="table mb-0">					'
							+ ' <thead>                                 '
							+ ' 	<tr>                                '
							
							+ ' 		<th>Acciones				</th>		'
							
							+ ' 		<th>HR INICIO</th>						'
							+ ' 		<th>ARCHIVO</th>				'
							+ ' 		<th>FECHA GL</th>				'
							+ ' 		<th>ARCHIVO</th>				'
							+ ' 		<th>FECHA REC</th>				'
							+ ' 		<th>TIEMPO</th>           		'
							
							+ ' 	</tr>                                       '
							+ ' </thead>                                        '
							+ ' <tbody>                                         ';
		for (var i = 0; i < data.length; i++){
			var rowEmployee = data[i];
			
			var status = '';
			var icons = '';
			var actionCtrl = '';
			if(validateObj(rowEmployee.file_rec		) == "") {
				icons = 'fa-search-plus';
				status = 'outline-danger';
				actionCtrl = 'viewDetailFail';
				
			} else {
				icons = 'fa-search';
				status = 'outline-success';
				actionCtrl = 'viewDetail';
			}
			var actions =
				'<i class="fa ' + icons + ' btn btn-' + status + '" title="Ver detalle" onclick="' + actionCtrl + '(\'' + rowEmployee.user_id + '\',' + '\'' + rowEmployee.file_id + '\'' + ')" style="cursor: pointer"></i>';
			
			var tr = '<tr id="employee_' + rowEmployee.id + '">';
			
			tr += '<td align="center">'+ actions +'</td>';
			
			tr += '<td>'+ validateObj(rowEmployee.concurrent	) + '</td>';
			tr += '<td>'+ validateObj(rowEmployee.file_gl		) + '</td>';
			tr += '<td>'+ validateObj(rowEmployee.ts_gl			) + '</td>';
			
			if(validateObj(rowEmployee.file_rec		) == "") {
				tr += '<td><img src="https://vive-tpvbooking.netdna-ssl.com/img/point-loader.gif" alt="" border=3 height=20 width=100></img></td>';
			} else {
				tr += '<td>'+ validateObj(rowEmployee.file_rec		) + '</td>';
			}
			if(validateObj(rowEmployee.ts_rec		) == "") {
				tr += '<td><img src="https://vive-tpvbooking.netdna-ssl.com/img/point-loader.gif" alt="" border=3 height=20 width=100></img></td>';
			} else {
				tr += '<td>'+ validateObj(rowEmployee.ts_rec		) + '</td>';
			}
			if(validateObj(rowEmployee.file_rec		) == "") {
				tr += '<td id="' + rowEmployee.file_id + '"style="color: red;">' + validateObj(rowEmployee.time			) + '</td>';
			} else {
				tr += '<td>'+ validateObj(rowEmployee.time			) + '</td>';
			}
			
			tr += '</tr>';
			tableEmployee += tr;
		}
		tableEmployee += '</tbody>'
						+ ' </table>';
	}
	
	var wrapper = $("#seccion-table-view-employee");
	$(wrapper).append(tableEmployee); // add html
	//
	exportTable('bootstrap-data-table-view', 
			[
				{extend: 'excelHtml5', text: '<i class="fa fa-file-excel-o" style="font-size:20px;color:green"></i>', titleAttr: 'Exportar a Excel'},
				{extend: 'pdfHtml5', text: '<i class="fa fa-file-pdf-o" style="font-size:20px;color:red"></i>', titleAttr: 'Exportar a PDF',
					orientation: 'landscape',
					customize: function(doc) {
						doc.defaultStyle.fontSize = 10;
					}
				}
			]);
	reloadTable('bootstrap-data-table-view');
	showPreloader(false);
}

// --> Inicia proceso
// ################## ############### ##################
// ################## PROCESO DETALLE ##################
// ################## ############### ##################
function viewDetail(user_id, file_id) {
	showPreloader(true);
	console.log("Ver proceso detalle kaizen");
	// iniciar contenido tabla
	// $("#seccion-table-view-employee").empty();
	// Llenar tabla reporte
	initializeVariables();
	console.log("Empezar proceso bridge");
	ID_USER = user_id;
	ID_FILE = file_id;
	var data = {
			table	: "bridge",
			user_id : ID_USER,
			file_id : ID_FILE
	}
	sendPostAction(CICLE_CONTROLLER + 'viewCicleDetail' , data, respViewCicleBridge);
}

function respViewCicleBridge(data) {
	BRIDGE = data;
	if(data) {
		console.log("Empezar proceso gstorage");
		var data = {
				table	: "gstorage",
				user_id : ID_USER,
				file_id : ID_FILE
		}
		sendPostAction(CICLE_CONTROLLER + 'viewCicleDetail' , data, respViewCicleGstorage);
	}
}

function respViewCicleGstorage(data) {
	GSTORAGE = data;
	if(data) {
		console.log("Empezar proceso gcloud_jobs");
		var data = {
				table	: "gcloud_jobs",
				user_id : ID_USER,
				file_id : ID_FILE
		}
		sendPostAction(CICLE_CONTROLLER + 'viewCicleDetail' , data, respViewCicleGcloudJobs);
	}
}

function respViewCicleGcloudJobs(data) {
	GCLOUD_JOBS = data;
	//
	showViewDetail();
	//
	if(data) {
		console.log(BRIDGE);
		console.log(GSTORAGE);
		console.log(GCLOUD_JOBS);
	}
	showPreloader(false);
}
//--> Termina proceso

function showViewEmployee() {
	$('#info-employee').css('display', 'none');
	$('#info-view-employee').css('display', 'block');
    $("#btn-cancel-view-employee").show();
	// $("#btn-save-employee").show();
}

function hideViewEmployee() {
	$('#info-employee').css('display', 'block');
	$('#info-view-employee').css('display', 'none');
	$("#btn-cancel-view-employee").hide();
	// $("#btn-save-employee").hide();
}

function showViewDetail() {
	$('#info-view-employee').css('display', 'none');
	$("#btn-cancel-view-employee").hide();
	//
	$('#add-line').css('display', 'block');
    $("#btn-cancel-view-detail").show();
	// $("#btn-save-employee").show();
}

function hideViewDetail() {
	$('#info-view-employee').css('display', 'block');
	$("#btn-cancel-view-employee").show();
	//
	$('#add-line').css('display', 'none');
	$("#btn-cancel-view-detail").hide();
	// $("#btn-save-employee").hide();
}

function initializeVariables(value) {
	ID_USER = 0;
	ID_FILE = 0;
	BRIDGE = null;
	GSTORAGE = null;
	GCLOUD_JOBS = null;
	MAINFRAME = null;
	MANUALS = null;
}