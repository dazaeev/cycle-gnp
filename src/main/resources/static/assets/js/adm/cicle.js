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
//
let initCycle = null;
let endCycle = null;
//
var element = $("#form-detail"); // global variable
var getCanvas; // global variable
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
	//
	$('#btn-print-detail').on('click', function () {
		html2canvas(element, {
			onrendered: function (canvas) {
				$("#previewImage").append(canvas);
				getCanvas = canvas;
			}
		});
		//
		confirmDownloadDetail();
	});
    //
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
	initCycle = new Date();
	showPreloader(true);
	var data = {
			name : name,
			id : id
	}
	sendPostAction(CICLE_CONTROLLER + 'initCicleGral' , data, respCicleGral);
}

function respCicleGral(data) {
	if(data) {
		endCycle = new Date();
		let finalDate = endCycle.getTime() - initCycle.getTime();
		//
		console.log(data);
		console.log(millisToMinutesAndSeconds(finalDate));
		if(data[0].status == 'Ok') {
			showDivMessage('Proceso completado en ' + millisToMinutesAndSeconds(finalDate) + ', ver reporte.', 'alert-info', 12000);
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
	if(data) {
		console.log("Empezar proceso mainframe");
		var data = {
				table	: "mainframe",
				user_id : ID_USER,
				file_id : ID_FILE
		}
		sendPostAction(CICLE_CONTROLLER + 'viewCicleDetail' , data, respViewCicleMainframe);
	}
}

function respViewCicleMainframe(data) {
	MAINFRAME = data;
	//
	showViewDetail();
	//
	if(data) {
		console.log(BRIDGE);
		console.log(GSTORAGE);
		console.log(GCLOUD_JOBS);
		console.log(MAINFRAME);
		// iniciar proceso
		$("#lFileId").text(ID_FILE);
		$('html, body').animate({ scrollTop: $('#left-panel').offset().top }, 'slow');
		// -- MAINFRAME --
		var lMainframeGl = 
		'	<div class="timeline-icon"><i class="fa fa-power-off"></i></div>' + 
		'	<span class="year">MAINFRAME</span>                             ' + 
		'	<div class="timeline-content">                                  ' + 
		'		<h5 class="title">___main_ts_gl___</h5>                     ' + 
		'		<p class="description">                                     ' + 
		'			<strong>Archivo:</strong> ___main_file___               ' + 
		'			<br>                                                    ' + 
		'			<strong>Estatus:</strong> 0                             ' + 
		'		</p>                                                        ' + 
		'	</div>                                                          ';
		var lMainframeRec = lMainframeGl;
		if(MAINFRAME.length > 1) {
			$("#mainframe-gl").css("opacity", "1");
			$("#mainframe-rec").css("opacity", "1");
			for (var i = 0; i < MAINFRAME.length; i++){
				var row = MAINFRAME[i];
				if(row.main_type == 'GL') {
					lMainframeGl = lMainframeGl.replace('___main_ts_gl___', MAINFRAME[i].main_ts_gl);
					lMainframeGl = lMainframeGl.replace('___main_file___', row.main_file);
				} else if(row.main_type == 'REC') {
					lMainframeRec = lMainframeRec.replace('___main_ts_gl___', MAINFRAME[i].main_ts_gl);
					lMainframeRec = lMainframeRec.replace('___main_file___', row.main_file);
				}
			}
			$("#mainframe-gl").empty();
			var wrapperGl = $("#mainframe-gl");
			$(wrapperGl).append(lMainframeGl); // add html
			$("#mainframe-rec").empty();
			var wrapperRec = $("#mainframe-rec");
			$(wrapperRec).append(lMainframeRec); // add html
		}
		// -- BRIDGE --
		var lBridgeGlCtrl = 
		'	<div class="timeline-icon"><i class="fa fa-rocket"></i></div>' +
		'	<span class="year">SFTP</span>                               ' +
		'	<div class="timeline-content">                               ' +
		'		<h5 class="title">___117_date___</h5>                    ' +
		'		<p class="description">                                  ' +
		'			                                                     ' +
		'			___b_file_date___                                    ' +
		'			                                                     ' +
		'		</p>                                                     ' +
		'	</div>                                                       ';
		var lBridgeRec = lBridgeGlCtrl;
		if(BRIDGE.length > 1) {
			var bFileDateGlCtrl = '';
			var bFileDateRec = '';
			for (var i = 0; i < BRIDGE.length; i++){
				var row = BRIDGE[i];
				if(row.b_117_file.includes('CTRL_')) {
					lBridgeGlCtrl = lBridgeGlCtrl.replace('___117_date___', row.b_117_date.split(' ')[0]);
					bFileDateGlCtrl = bFileDateGlCtrl + 
					'<strong>Archivo:</strong> ' + row.b_117_file +
					'<br>'+
					'- <strong>Fecha:</strong> ' + row.b_117_date +
					'<br>'+
					'- <strong>Folder:</strong> ' + row.b_117_folder +
					'<br>';
				} else if(row.b_117_file.includes('GL_')) {
					lBridgeGlCtrl = lBridgeGlCtrl.replace('___117_date___', row.b_117_date.split(' ')[0]);
					bFileDateGlCtrl = bFileDateGlCtrl + 
					'<strong>Archivo:</strong> ' + row.b_117_file +
					'<br>'+
					'- <strong>Fecha:</strong> ' + row.b_117_date +
					'<br>'+
					'- <strong>Folder:</strong> ' + row.b_117_folder +
					'<br>';
				}
				if(row.b_117_file.includes('REC_')) {
					lBridgeRec = lBridgeRec.replace('___117_date___', row.b_117_date.split(' ')[0]);
					bFileDateRec = bFileDateRec + 
					'<strong>Archivo:</strong> ' + row.b_117_file +
					'<br>'+
					'- <strong>Fecha:</strong> ' + row.b_117_date +
					'<br>'+
					'- <strong>Folder:</strong> ' + row.b_117_folder +
					'<br>';
				}
			}
			lBridgeGlCtrl = lBridgeGlCtrl.replace('___b_file_date___', bFileDateGlCtrl);
			$("#bridge-gl-ctrl").empty();
			var wrapperBridgeGlCtrl = $("#bridge-gl-ctrl");
			$(wrapperBridgeGlCtrl).append(lBridgeGlCtrl); // add html
			//
			lBridgeRec = lBridgeRec.replace('___b_file_date___', bFileDateRec);
			$("#bridge-rec").empty();
			var wrapperBridgeRec = $("#bridge-rec");
			$(wrapperBridgeRec).append(lBridgeRec); // add html
		}
		// -- GSTORAGE --
		var lGstorageGlCtrl = 
		'	<div class="timeline-icon"><i class="fa fa-briefcase"></i></div>' +
		'	<span class="year">GSTORAGE</span>                              ' +
		'	<div class="timeline-content">                                  ' +
		'		<h5 class="title">___gs_date___</h5>                        ' +
		'		<p class="description">                                     ' +
		'			                                                        ' +
		'			___gs_file_folder_date___                               ' +
		'			                                                        ' +
		'		</p>                                                        ' +
		'	</div>                                                          ';
		if(GSTORAGE.length > 1) {
			lGstorageGlCtrl = lGstorageGlCtrl.replace('___gs_date___', GSTORAGE[0].gs_date.split(' ')[0]);
			lBodyGstorage = '';
			for (var i = 0; i < GSTORAGE.length; i++){
				var row = GSTORAGE[i];
				lBodyGstorage = lBodyGstorage + '<strong>Archivo:</strong> ' + row.gs_file + '<br>';
				lBodyGstorage = lBodyGstorage + '- <strong>Fecha:</strong> ' + row.gs_date + '<br>';
				var gsFolder = row.gs_folder.split('/');
				if(gsFolder.length > 3) {
					lBodyGstorage = lBodyGstorage + '- <strong>Folder:</strong> ' + '/' + (gsFolder[gsFolder.length - 3] + '/' + gsFolder[gsFolder.length - 2]) + '<br>';
				} else {
					lBodyGstorage = lBodyGstorage + '- <strong>Folder:</strong> ' + row.gs_folder + '<br>';
				}
			}
			lGstorageGlCtrl = lGstorageGlCtrl.replace('___gs_file_folder_date___', lBodyGstorage);
			$("#gstorage-gl-ctrl").empty();
			var wrapperGstorageGl = $("#gstorage-gl-ctrl");
			$(wrapperGstorageGl).append(lGstorageGlCtrl); // add html
		}
		// -- GCLOUD --
		var lGcloudJob = 
		'	<div class="timeline-icon"><i class="fa fa-google"></i></div>' +
		'	<span class="year">GCLOUD JOBS (SQL)</span>                        ' +
		'	<div class="timeline-content">                               ' +
		'		<h5 class="title">JOB ___id_job___</h5>                  ' +
		'		<p class="description">                                  ' +
		'			                                                     ' +
		'			___gc_name_date_status___                            ' +
		'			                                                     ' +
		'			<br>                                                 ' +
		'			<br>                                                 ' +
		'			<br>                                                 ' +
		'			                                                     ' +
		'		</p>                                                     ' +
		'	</div>                                                       ';
		if(GCLOUD_JOBS.length > 0) {
			lGcloudJob = lGcloudJob.replace('___id_job___', GCLOUD_JOBS[0].gc_id_job);
			lBodyGcloud = '';
			for (var i = 0; i < GCLOUD_JOBS.length; i++){
				var row = GCLOUD_JOBS[i];
				lBodyGcloud = lBodyGcloud + '<strong>Nombre:</strong> ' + row.gc_name_job + '<br>';
				lBodyGcloud = lBodyGcloud + '- <strong>Fecha:</strong> ' + row.gc_date + '<br>';
				lBodyGcloud = lBodyGcloud + '- <strong>Estatus:</strong> ' + row.gc_status + '<br>';
			}
			lGcloudJob = lGcloudJob.replace('___gc_name_date_status___', lBodyGcloud);
			$("#gcloud-pre").empty();
			var wrapperGcloud = $("#gcloud-pre");
			$(wrapperGcloud).append(lGcloudJob); // add html
		}
	}
	showPreloader(false);
}
//--> Termina proceso

function millisToMinutesAndSeconds(millis) { 
	var minutes = Math.floor(millis / 60000); 
	var seconds = ((millis % 60000) / 1000).toFixed(0); 
	return minutes + "min " + (seconds < 10 ? '0' : '') + seconds + ' sec'; 
}

function confirmDownloadDetail() {
    $.jAlert({
        'type': 'confirm',
        'title': 'Confirmación',
        'confirmQuestion': '¿ Descargar linea de tiempo ? <br> ' + $("#lFileId").text(),
        'confirmBtnText': 'Si',
        'denyBtnText': 'No estoy seguro',
        'theme': 'tBeIt',
        'size': 'sm',
        'showAnimation': 'fadeInUp',
        'hideAnimation': 'fadeOutDown',
        'onConfirm': function (e, btn) {
        	printDetail();
        }
    });
}

function printDetail() {
	// form-detail
	element = $("#form-detail")
	var imgageData = getCanvas.toDataURL("image/png");
    // Now browser starts downloading it instead of just showing it
    var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
    //
    var link = document.createElement("a");
	link.setAttribute("target","_blank");
	link.setAttribute("href",newData);
	link.setAttribute("download",$("#lFileId").text() + "-timeline.png");
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

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