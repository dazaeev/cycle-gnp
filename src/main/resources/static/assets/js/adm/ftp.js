/*
 * @autor Nazario Dazaeev Gonzalez Herrera
 * Controller 
 * Pagina de control "ftp"
 */

// Variables Globales
var NAME_FOLDER = '';
var A_VERSION = '';
var MODEL = '';
var BRAND = '';
var NAME_FILE_DOWNLOAD = '';

// Cargando sistema
$(document).ready(function($) {
	startingSystemMenu();
	//
	var searchParams = new URLSearchParams(window.location.search);
	var param = searchParams.get('serial');
	console.log(param);
	NAME_FOLDER = param;
	param = searchParams.get('aversion');
	console.log(param);
	A_VERSION = param;
	param = searchParams.get('model');
	console.log(param);
	MODEL = param;
	param = searchParams.get('brand');
	console.log(param);
	BRAND = param;
	//
	$('#info').text('Control *');
	//
	initTable();
	//
	$('#btn-cancel-view-employee').on('click', function () {
        hideViewDocEmployee();
    });
	$('#btn-download-view-employee').on('click', function () {
		download(NAME_FILE_DOWNLOAD, null, null);
    });
	//
	$('#btn-cancel-cron-employee').on('click', function () {
        hideViewCronEmployee();
    });
	$("#form-add-cron").validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {
			console.log('Formulario invalido');
			showDivMessage('Favor de completar campos obligatorios', 'alert-danger', 2000);
		} else {
			console.log('Formulario correcto');
			// showPreloader(true);
			// saveEmployee();
			// cleanForm();
			//
			// hideAddEmployee();
	        return false;
		}
	});
	$('#btn-save-cron').on('click', function () {
        console.log('Guardar cron');
        $("#form-add-cron").submit();
    });
	// -----------------
	$('#cron-start').cronBuilder({
        selectorLabel: "Seleccionar período:  ",
        onChange: function(expression) {
            $('#cron-start-result').text(expression);
        }
    });
	$('#cron-end').cronBuilder({
        selectorLabel: "Seleccionar período:  ",
        onChange: function(expression) {
            $('#cron-end-result').text(expression);
        }
    });
});

function initTable() {
	// iniciar contenido tabla
	$("#seccion-table-chanel").empty();
	// Llenar tabla
	var data = {
			name : '',
			folder : '' + NAME_FOLDER
	}
	sendPostAction(FTP_CONTROLLER + 'findFtp/' + sessionStorage.getItem('email') + '/0', data, respFindAll);
}

function respFindAll(data){
	// $('body').toggleClass('open');
	if(data){
		var tableSend =	  	' <table id="bootstrap-data-table"				'
							+ ' 	class="table mb-0">						'
							+ ' <thead>										'
							+ ' 	<tr>									'
							+ ' 		<th>Acciones			</th>		'
							
							+ ' 		<th>Archivo				</th>       '
							+ ' 		<th>Tamaño				</th>       '
							+ ' 		<th>Fecha de creación	</th>       '
							
							+ ' 	</tr>									'
							+ ' </thead>									'
							+ ' <tbody>										';
		for (var i = 0; i < data.length; i++){
			var rowEmployee = data[i];
			
			var tr = '<tr id="employee_' + rowEmployee.name + '">';
			
			var viewDocument = '<i class="fa fa-search btn btn-success" title="Ver" onclick="viewDocument(\'' 
				+ rowEmployee.name 			+ '\',' 
				+ '\'' + rowEmployee.size	+ '\',' 
				+'\'' + rowEmployee.date	+ '\')" style="cursor: pointer"></i>';
			var download = '<i class="fa fa-download btn btn-info" title="Descargar" onclick="download(\'' 
				+ rowEmployee.name 			+ '\',' 
				+ '\'' + rowEmployee.size	+ '\',' 
				+'\'' + rowEmployee.date	+ '\')" style="cursor: pointer"></i>';
			
			var extFile = '';
			var callCron = '';
			extFile = splitFile(rowEmployee.name, '.');
			if(extFile[extFile.length - 1] == 'sh' || extFile[extFile.length - 1] == 'ksh') {
				callCron += '<i class="fa fa-clock-o btn btn-warning" title="Asignar tarea" onclick="cron(\'' 
					+ rowEmployee.name 			+ '\',' 
					+ '\'' + rowEmployee.size	+ '\',' 
					+'\'' + rowEmployee.date	+ '\')" style="cursor: pointer"></i>';
			} else {
				callCron += '<i class="fa fa-clock-o btn btn-secondary" title="No es de tipo script"></i>';
			}
			var call = '';
			extFile = splitFile(rowEmployee.name, '.');
			if(extFile[extFile.length - 1] == 'sh' || extFile[extFile.length - 1] == 'ksh') {
				call += '<i class="fa fa-arrow-right btn btn-danger" title="Ejecutar" onclick="run(\'' 
					+ rowEmployee.name 			+ '\',' 
					+ '\'' + rowEmployee.size	+ '\',' 
					+'\'' + rowEmployee.date	+ '\')" style="cursor: pointer"></i>';
			} else {
				call += '<i class="fa fa-arrow-right btn btn-secondary" title="No es de tipo script"></i>';
			}
			
			var actions = viewDocument + download + callCron + call;
				
			tr += '<td align="center">'+ actions +'</td>';
			
			tr += '<td>'+ rowEmployee.name								+'</td>';
			tr += '<td>'+ rowEmployee.size								+' bytes</td>';
			tr += '<td>'+ rowEmployee.date								+'</td>';
			
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

function download(name, size, date) {
	//
	if(name) {
		console.log('Descargar archivo: ' + name);
		var data = {
				name 	: name,
				folder	: '' + NAME_FOLDER
		}
		sendPostAction(FTP_CONTROLLER + 'findFtp/' + sessionStorage.getItem('email') + '/1', data, respDownloadFile);
	} else {
		//
		console.log('Descargar textarea');
		var map = new Object();
		map["base64Document"] = btoa($("#areaText").val());
		var d = new Date();
		map["name"] = "output-" + (d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + '-s' + d.getSeconds()) +".txt";
		var data = [map];
		respDownloadFile(data);
	}
}

function respDownloadFile(data) {
	if(data) {
		var dataUri = data[0].base64Document;
		var link = document.createElement("a");
		link.setAttribute("target","_blank");
		link.setAttribute("href",'data:' + getData(data[0].name) + ';base64,' + dataUri);
		link.setAttribute("download",data[0].name);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		console.log(data);
	}
}

function viewDocument(name, size, date) {
	//
	console.log('Ver archivo: ' + name);
	NAME_FILE_DOWNLOAD = name;
	var data = {
			name 	: name,
			folder	: '' + NAME_FOLDER
	}
	sendPostAction(FTP_CONTROLLER + 'findFtp/' + sessionStorage.getItem('email') + '/1', data, respViewFile);
}

function respViewFile(data) {
	$('#lTypeDocument').empty();
	if(data) {
		// Ver documento
		showViewDocEmployee();
		$('#lTypeDocument').text(data[0].name);
		//
		$("#contentDocEmployee").empty();
		//
		var dataUri = data[0].base64Document;
		if (getData(data[0].name).includes('application/xml') || 
				getData(data[0].name).includes('text/xml') || 
				getData(data[0].name).includes('text/plain') || 
				getData(data[0].name).includes('application/javascript') ||
				getData(data[0].name).includes('application/json') ||
				getData(data[0].name).includes('text/css') ||
				getData(data[0].name).includes('text/csv') ||
				getData(data[0].name).includes('application/x-sh')
		) {
			$.ajax({
				url : 'data:' + getData(data[0].name) + ';base64,' + dataUri,
				dataType : "text",
				success : function(data) {
					$("#contentDocEmployee").append('<textarea id="areaText" class="form-control rounded-0" style="overflow:hidden" rows="30"></textarea>');
					$("#areaText").text(data);
				}
			});
		} else {
		    var viewDoc = '<object style="width: 100%;height: 1000px;" class="w100" data="' 
		    	+ 'data:' + getData(data[0].name) + ';base64,' + dataUri 
		    	+ '"></object>';
		    $("#contentDocEmployee").append(viewDoc);
		}
		
	}
}

function run(name, size, date) {
	//
	console.log('Ejecutar archivo: ' + name);
	var extFile = splitFile(name, '.');
	if(extFile[extFile.length - 1] == 'sh' || extFile[extFile.length - 1] == 'ksh') {
		showPreloader(true);
		var data = {
				name 	: name,
				folder	: '' + NAME_FOLDER,
				email	: sessionStorage.getItem('email')
		}
		sendPostAction(FTP_CONTROLLER + 'callSftp', data, respRunFile);
	} else {
		showDivMessage('El archivo no es de tipo script [' + name + ']', 'alert-danger', 6000);
	}
}

function respRunFile(data) {
	if(data) {
		NAME_FILE_DOWNLOAD = '';
		if(data[0].status == 'Ok') {
			if(data[0].exit == '0') {
				showDivMessage("Ejecución del script correcta</br>Codigo de error: " + data[0].exit, 'alert-info', 6000);
				console.log(data[0].output);
			} else {
				showDivMessage("Error en la ejecución del script</br>Codigo de error: " + data[0].exit, 'alert-danger', 6000);
				console.log(data[0].output);
			}
			respViewOutput(data);
		} else {
			showDivMessage(data[0].error, 'alert-danger', 6000);
		}
	}
	showPreloader(false);
}

function respViewOutput(data) {
	$('#lTypeDocument').empty();
	if(data) {
		// Ver documento
		showViewDocEmployee();
		$('#lTypeDocument').text(data[0].name + " [" + data[0].exit + "]");
		//
		var color = '';
		if(data[0].exit == '0') {
			color = '#1d2124';
		} else {
			color = '#dc3646';
		}
		var styleTextArea = 'style="background-color: #ffffff; border: 1px solid #ffffff; color: ' + color + '; padding: 8px; font-family: courier new;"'
		$("#contentDocEmployee").empty();
		$("#contentDocEmployee").append('<textarea id="areaText" class="form-control rounded-0" rows="30"' + styleTextArea + '></textarea>');
		$("#areaText").text(data[0].output);
	}
}

function cron(name, size, date) {
	//
	console.log('Configurando cron para: ' + name);
	var extFile = splitFile(name, '.');
	if(extFile[extFile.length - 1] == 'sh' || extFile[extFile.length - 1] == 'ksh') {
		$('#lTypeCron').empty();
		$('#lTypeCron').text(name);
		showViewCronEmployee();
	} else {
		showDivMessage('El archivo no es de tipo script [' + name + ']', 'alert-danger', 6000);
	}
}

function splitFile(value, separator) {
	return value.split(separator);
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

function showViewCronEmployee() {
	$('#info-employee').css('display', 'none');
    $('#cron-employee').css('display', 'block');
    $("#btn-cancel-cron-employee").show();
    $("#btn-save-cron").show();
}

function hideViewCronEmployee() {
	$('#info-employee').css('display', 'block');
    $('#cron-employee').css('display', 'none');
    $("#btn-cancel-cron-employee").hide();
    $("#btn-save-cron").hide();
}