/*
 * @autor Nazario Dazaeev Gonzalez Herrera
 * Controller 
 * Pagina de control de Empleados
 */

// Variables globales
var FILEPROOFSTUDIES = '';
var FILEBIRTHCERTIFICATE = '';
var FILETITLEPROFECIONALCEDULA = '';
var FILECURP = '';
var FILEIMSS = '';
var FILEINFONAVIT = '';
var FILEIDENTIFICATION = '';
var FILEPASSPORTVISA = '';
var FILENONCRIMINALBACKGROUND = '';
var FILEPROOFADDRESS = '';
var FILEPERSONALREFERENCES = '';
var FILEPROFESSIONALCV = '';
var FILEPSYCHOMETRICTESTS = '';
var FILEPHOTO = '';
//
var TYPEDOCUMENT = '';

// Cargando sistema
$(document).ready(function($) {
	startingSystemMenu();
	// Llenar tabla empleados
	sendPostAction(EMPLOYEE_CONTROLLER + 'findUserAll', null, respFindAll);
	//
	$('.selectBMC').select2();
	$('#area').on('change', function () {
		var selectArea = $('#area').val();
	    if(selectArea != '') {
	    	$('#error-area').css('display', 'none');
	    }
	});
	//
	$("#form-add-employee").validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {
			var selectArea = $('#area').val();
		    if(selectArea == '') {
		    	$('#error-area').css('display', 'block');
		    } else {
		    	$('#error-area').css('display', 'none');
		    }
			console.log('Formulario invalido');
			showDivMessage('Favor de completar campos obligatorios', 'alert-danger', 2000);
		} else {
			saveEmployee();
			//
			cleanForm();
	        hideAddEmployee();
	        return false;
		}
	});
	//
	$('#btn-add-employee').on('click', function () {
		$('#add-mod-employee').text('Registrar empleado');
        cleanForm();
        showAddEmployee();
    });
	$('#btn-cancel-employee').on('click', function () {
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
	$("#theader_document").on('click','tr',function(e){
	    e.preventDefault();
	    var selectDocument = this.innerText;
	    $('#lTypeDocument').text('' + selectDocument);
	    TYPEDOCUMENT = selectDocument;
	});
});

function respFindAll(data){
	if(data){
		var tableEmployee =	  ' <table id="bootstrap-data-table"				'
							+ ' 	class="table mb-0">        					'
							+ ' <thead>                                         '
							+ ' 	<tr>                                        '
							+ ' 		<th>Acción</th>                         '
							+ ' 		<th>Clave</th>                          '
							+ ' 		<th>Nombre</th>                         '
							+ ' 		<th>Área</th>                           '
							+ ' 		<th>Puesto</th>                         '
							+ ' 		<th>Salario</th>                        '
							+ ' 	</tr>                                       '
							+ ' </thead>                                        '
							+ ' <tbody>                                         ';
		for (var i = 0; i < data.length; i++){
			var rowEmployee = data[i];
			var actions = 	'<i class="fa fa-trash-o btn btn-danger" title="Eliminar" onclick="confirmDeleteEmployee(\'' + rowEmployee.nombre + '\',' + rowEmployee.id + ',' + 0 + ')" style="cursor: pointer"></i>' + 
							'<i class="fa fa-pencil btn btn-warning" title="Editar" onclick="editEmployee(\'' + rowEmployee.nombre + '\',' + rowEmployee.id + ')" style="cursor: pointer"></i>' +
							'<i class="fa fa-book btn btn-info" title="Documentación" onclick="viewDocEmployee(\'' + rowEmployee.nombre + '\',' + rowEmployee.id + ')" style="cursor: pointer"></i>';
			var tr = '<tr id="employee_' + rowEmployee.id + '">';
			tr += '<td align="center">'+ actions +'</td>';
			tr += '<td>'+ rowEmployee.clave +'</td>';
			tr += '<td>'+ rowEmployee.nombre +'</td>';
			tr += '<td>'+ rowEmployee.area +'</td>';
			tr += '<td>'+ rowEmployee.puesto +'</td>';
			tr += '<td class="money" align="right">'+ formatter.format(rowEmployee.salario) +'</td>';
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
				{extend: 'excelHtml5', text: '<i class="fa fa-file-excel-o" style="font-size:20px;color:green"></i>', titleAttr: 'Exportar a Excel'},
				{extend: 'pdfHtml5', text: '<i class="fa fa-file-pdf-o" style="font-size:20px;color:red"></i>', titleAttr: 'Exportar a Pdf'}
			]);
	reloadTable('bootstrap-data-table');
}

function saveEmployee() {
	var user = new User();
	user.email 								= '' + $('#email').val();
	user.password                           = '' + $('#password').val();
	user.name                               = '' + $('#first_name').val();
	user.lastName                           = '' + $('#father_last_name').val() + ' ' + $('#mother_last_name').val();
	user.active 							= 1;
	// Llenar Empleado
	var employee = new Employee();
	employee.cveEmployee 					= '' + $('#cve_employee').val();
	employee.birthdate 						= '' + $('#birthdate').val();
	employee.sex                            = '' + $('#sex').val();
	employee.civilStatus                    = '' + $('#civil_status').val();
	employee.nationality                    = '' + $('#nationality').val();
	employee.imss                           = '' + $('#imss').val();
	employee.state                          = '' + $('#state').val();
	employee.delegationMunicipality         = '' + $('#delegation_municipality').val();
	employee.colony                         = '' + $('#colony').val();
	employee.postalCode                     = '' + $('#postal_code').val();
	employee.streetNumber                   = '' + $('#street_number').val();
	employee.militaryPrimer                 = '' + $('#military_primer').val();
	employee.phone                          = '' + $('#phone').val();
	employee.cellPhone                      = '' + $('#cell_phone').val();
	employee.emergencyPhone                 = '' + $('#emergency_phone').val();
	employee.rfc                            = '' + $('#rfc').val();
	employee.curp                           = '' + $('#curp').val();
	employee.institute                      = '' + $('#institute').val();
	employee.educationalLevel               = '' + $('#educational_level').val();
	employee.statusTitle                    = '' + $('#status_title_r1').val();
	// unir nombre y tipo de archivo
	employee.nameProofStudies               = castNameFileToTypeFile('name_proof_studies');
	employee.nameBirthCertificate           = castNameFileToTypeFile('name_birth_certificate');
	employee.nameTitleProfecionalCedula     = castNameFileToTypeFile('name_title_profecional_cedula');
	employee.nameCurp                       = castNameFileToTypeFile('name_curp');
	employee.nameImss                       = castNameFileToTypeFile('name_imss');
	employee.nameInfonavit                  = castNameFileToTypeFile('name_infonavit');
	employee.nameIdentification             = castNameFileToTypeFile('name_identification');
	employee.namePassportVisa               = castNameFileToTypeFile('name_passport_visa');
	employee.nameNoncriminalBackground      = castNameFileToTypeFile('name_noncriminal_background');
	employee.nameProofAddress               = castNameFileToTypeFile('name_proof_address');
	employee.namePersonalReferences         = castNameFileToTypeFile('name_personal_references');
	employee.nameProfessionalCv             = castNameFileToTypeFile('name_professional_cv');
	employee.namePsychometricTests          = castNameFileToTypeFile('name_psychometric_tests');
	employee.namePhoto                      = castNameFileToTypeFile('name_photo');
	// Contenido de Archivo
	employee.fileProofStudies =				FILEPROOFSTUDIES;
	employee.fileBirthCertificate =         FILEBIRTHCERTIFICATE;
	employee.fileTitleProfecionalCedula =   FILETITLEPROFECIONALCEDULA;
	employee.fileCurp =                     FILECURP;
	employee.fileImss =                     FILEIMSS;
	employee.fileInfonavit =                FILEINFONAVIT;
	employee.fileIdentification =           FILEIDENTIFICATION;
	employee.filePassportVisa =             FILEPASSPORTVISA;
	employee.fileNoncriminalBackground =    FILENONCRIMINALBACKGROUND;
	employee.fileProofAddress =             FILEPROOFADDRESS;
	employee.filePersonalReferences =       FILEPERSONALREFERENCES;
	employee.fileProfessionalCv =           FILEPROFESSIONALCV;
	employee.filePsychometricTests =        FILEPSYCHOMETRICTESTS;
	employee.filePhoto =                    FILEPHOTO;
	//
	var jobPlace = new JobPlace();
	jobPlace.id								= '' + $('#market_stall').val();
	var area = new Area();
	area.id									= '' + $('#area').val();
	jobPlace.area							= area;
	employee.jobPlace						= jobPlace;
	//
	employee.boss		                    = '' + $('#boss').val();
	employee.salary                         = '' + $('#salary').val();
	// Setear Empleado
	user.employee = employee;
	console.log(user);
	//
	sendPostAction(EMPLOYEE_CONTROLLER + 'saveUserEmployee', user, respSaveEmployee);
}

function editEmployee(name, id) {
	$('#add-mod-employee').text('Editar empleado');
	//
	cleanForm();
	$('#email').val								('NADA');
	$('#password').val                          ('NADA');
	$('#first_name').val                        ('NADA');
	$('#father_last_name').val					('NADA');
	$('#mother_last_name').val                  ('NADA');
	$('#cve_employee').val                      ('NADA');
	$('#birthdate').val                         ('NADA');
	$('#sex').val                               ('1').change();
	$('#civil_status').val                      ('1').change();
	$('#nationality').val                       ('NADA');
	$('#imss').val                              ('NADA');
	$('#state').val                             ('1').change();
	$('#delegation_municipality').val           ('1').change();
	$('#colony').val                            ('1').change();
	$('#postal_code').val                       ('1').change();
	$('#street_number').val                     ('NADA');
	$('#military_primer').val                   ('NADA');
	$('#phone').val                             ('NADA');
	$('#cell_phone').val                        ('NADA');
	$('#emergency_phone').val                   ('NADA');
	$('#rfc').val                               ('NADA');
	$('#curp').val                              ('NADA');
	$('#institute').val                         ('1').change();
	$('#educational_level').val                 ('1').change();
	// $('#status_title_r1').val                   ('NADA');
	// $('#name_proof_studies').val                ('NADA');
	// $('#name_birth_certificate').val            ('NADA');
	// $('#name_title_profecional_cedula').val     ('NADA');
	// $('#name_curp').val                         ('NADA');
	// $('#name_imss').val                         ('NADA');
	// $('#name_infonavit').val                    ('NADA');
	// $('#name_identification').val               ('NADA');
	// $('#name_passport_visa').val                ('NADA');
	// $('#name_noncriminal_background').val       ('NADA');
	// $('#name_proof_address').val                ('NADA');
	// $('#name_personal_references').val          ('NADA');
	// $('#name_professional_cv').val              ('NADA');
	// $('#name_psychometric_tests').val           ('NADA');
	// $('#name_photo').val                        ('NADA');
	$('#area').val                              ('1').change();
	$('#market_stall').val                      ('1').change();
	$('#boss').val                              ('1').change();
	$('#salary').val                            ('NADA');
	//
	showAddEmployee();
}

function viewDocEmployee(name, id) {
	$("#contentDocEmployee").empty();
	$('#lTypeDocument').empty();
	// Obtener datos
	sendPostAction(EMPLOYEE_CONTROLLER + 'viewDocEmployee/' + id, null, respViewDocEmployee);
}

function respViewDocEmployee(data) {
	if(data) {
		if(data.status == 'Ok') {
			var status = false;
			// Obtener Info
			$("#vCve").text(data.cve);
			$("#vName").text(data.name);			
			$("#vArea").text(data.area);
			$("#vJobPlace").text(data.jobPlace);
			// Body table
			$('#tbody_document').empty();
			//
			if(data.proofstudies && data.proofstudies.includes('____')) {
				status = true;
				var actions = '<i class="fa fa-search btn btn-info" title="Ver" onclick="viewNameDocEmployee(' + data.id + ',\'' + data.proofstudies + '\')" style="cursor: pointer"></i>'
					+ '<i class="fa fa-download btn btn-success" title="Descargar" onclick="downloadNameDocEmployee(' + data.id + ',\'' + data.proofstudies + '\')" style="cursor: pointer"></i>';
				var tr = '<tr>' +
		            '<td>' + actions + '</td>' +
		            '<td>Comprobante de estudios</td>';
		        $('#tbody_document').append(tr);
			}
	        //
			if(data.birthcertificate && data.birthcertificate.includes('____')) {
				status = true;
				actions = '<i class="fa fa-search btn btn-info" title="Ver" onclick="viewNameDocEmployee(' + data.id + ',\'' + data.birthcertificate + '\')" style="cursor: pointer"></i>'
					+ '<i class="fa fa-download btn btn-success" title="Descargar" onclick="downloadNameDocEmployee(' + data.id + ',\'' + data.birthcertificate + '\')" style="cursor: pointer"></i>';
				tr = '<tr>' +
		            '<td>' + actions + '</td>' +
		            '<td>Acta de nacimiento</td>';
		        $('#tbody_document').append(tr);
			}
			//
			if(data.titleprofecionalcedula && data.titleprofecionalcedula.includes('____')) {
				status = true;
				actions = '<i class="fa fa-search btn btn-info" title="Ver" onclick="viewNameDocEmployee(' + data.id + ',\'' + data.titleprofecionalcedula + '\')" style="cursor: pointer"></i>'
					+ '<i class="fa fa-download btn btn-success" title="Descargar" onclick="downloadNameDocEmployee(' + data.id + ',\'' + data.titleprofecionalcedula + '\')" style="cursor: pointer"></i>';
		        tr = '<tr>' +
		            '<td>' + actions + '</td>' +
		            '<td>Titulo y Cédula</td>';
		        $('#tbody_document').append(tr);
			}
			//
			if(data.curp && data.curp.includes('____')) {
				status = true;
				actions = '<i class="fa fa-search btn btn-info" title="Ver" onclick="viewNameDocEmployee(' + data.id + ',\'' + data.curp + '\')" style="cursor: pointer"></i>'
					+ '<i class="fa fa-download btn btn-success" title="Descargar" onclick="downloadNameDocEmployee(' + data.id + ',\'' + data.curp + '\')" style="cursor: pointer"></i>';
		        tr = '<tr>' +
		            '<td>' + actions + '</td>' +
		            '<td>CURP</td>';
		        $('#tbody_document').append(tr);
			}
			//
			if(data.imss && data.imss.includes('____')) {
				status = true;
				actions = '<i class="fa fa-search btn btn-info" title="Ver" onclick="viewNameDocEmployee(' + data.id + ',\'' + data.imss + '\')" style="cursor: pointer"></i>'
					+ '<i class="fa fa-download btn btn-success" title="Descargar" onclick="downloadNameDocEmployee(' + data.id + ',\'' + data.imss + '\')" style="cursor: pointer"></i>';
		        tr = '<tr>' +
		            '<td>' + actions + '</td>' +
		            '<td>IMSS</td>';
		        $('#tbody_document').append(tr);
			}
			//
			if(data.infonavit && data.infonavit.includes('____')) {
				status = true;
				actions = '<i class="fa fa-search btn btn-info" title="Ver" onclick="viewNameDocEmployee(' + data.id + ',\'' + data.infonavit + '\')" style="cursor: pointer"></i>'
					+ '<i class="fa fa-download btn btn-success" title="Descargar" onclick="downloadNameDocEmployee(' + data.id + ',\'' + data.infonavit + '\')" style="cursor: pointer"></i>';
				tr = '<tr>' +
		            '<td>' + actions + '</td>' +
		            '<td>Infonavit</td>';
		        $('#tbody_document').append(tr);
			}
			//
			if(data.identification && data.identification.includes('____')) {
				status = true;
				actions = '<i class="fa fa-search btn btn-info" title="Ver" onclick="viewNameDocEmployee(' + data.id + ',\'' + data.identification + '\')" style="cursor: pointer"></i>'
					+ '<i class="fa fa-download btn btn-success" title="Descargar" onclick="downloadNameDocEmployee(' + data.id + ',\'' + data.identification + '\')" style="cursor: pointer"></i>';
				tr = '<tr>' +
		            '<td>' + actions + '</td>' +
		            '<td>Identificación</td>';
		        $('#tbody_document').append(tr);
			}
			//
			if(data.passportvisa && data.passportvisa.includes('____')) {
				status = true;
				actions = '<i class="fa fa-search btn btn-info" title="Ver" onclick="viewNameDocEmployee(' + data.id + ',\'' + data.passportvisa + '\')" style="cursor: pointer"></i>'
					+ '<i class="fa fa-download btn btn-success" title="Descargar" onclick="downloadNameDocEmployee(' + data.id + ',\'' + data.passportvisa + '\')" style="cursor: pointer"></i>';
				tr = '<tr>' +
		            '<td>' + actions + '</td>' +
		            '<td>Pasaporte y Visa</td>';
		        $('#tbody_document').append(tr);
			}
			//
			if(data.noncriminalbackground && data.noncriminalbackground.includes('____')) {
				status = true;
				actions = '<i class="fa fa-search btn btn-info" title="Ver" onclick="viewNameDocEmployee(' + data.id + ',\'' + data.noncriminalbackground + '\')" style="cursor: pointer"></i>'
					+ '<i class="fa fa-download btn btn-success" title="Descargar" onclick="downloadNameDocEmployee(' + data.id + ',\'' + data.noncriminalbackground + '\')" style="cursor: pointer"></i>';
				tr = '<tr>' +
		            '<td>' + actions + '</td>' +
		            '<td>Antecedentes no penales</td>';
		        $('#tbody_document').append(tr);
			}
			//
			if(data.proofaddress && data.proofaddress.includes('____')) {
				status = true;
				actions = '<i class="fa fa-search btn btn-info" title="Ver" onclick="viewNameDocEmployee(' + data.id + ',\'' + data.proofaddress + '\')" style="cursor: pointer"></i>'
					+ '<i class="fa fa-download btn btn-success" title="Descargar" onclick="downloadNameDocEmployee(' + data.id + ',\'' + data.proofaddress + '\')" style="cursor: pointer"></i>';
				tr = '<tr>' +
		            '<td>' + actions + '</td>' +
		            '<td>Comprobante de domicilio</td>';
		        $('#tbody_document').append(tr);
			}
			//
			if(data.personalreferences && data.personalreferences.includes('____')) {
				status = true;
				actions = '<i class="fa fa-search btn btn-info" title="Ver" onclick="viewNameDocEmployee(' + data.id + ',\'' + data.personalreferences + '\')" style="cursor: pointer"></i>'
					+ '<i class="fa fa-download btn btn-success" title="Descargar" onclick="downloadNameDocEmployee(' + data.id + ',\'' + data.personalreferences + '\')" style="cursor: pointer"></i>';
				tr = '<tr>' +
		            '<td>' + actions + '</td>' +
		            '<td>Referencias</td>';
		        $('#tbody_document').append(tr);
			}
			//
			if(data.professionalcv && data.professionalcv.includes('____')) {
				status = true;
				actions = '<i class="fa fa-search btn btn-info" title="Ver" onclick="viewNameDocEmployee(' + data.id + ',\'' + data.professionalcv + '\')" style="cursor: pointer"></i>' 
					+ '<i class="fa fa-download btn btn-success" title="Descargar" onclick="downloadNameDocEmployee(' + data.id + ',\'' + data.professionalcv + '\')" style="cursor: pointer"></i>';
		        tr = '<tr>' +
		            '<td>' + actions + '</td>' +
		            '<td>Curriculum Vitae</td>';
		        $('#tbody_document').append(tr);
			}
			//
			if(data.psychometrictests && data.psychometrictests.includes('____')) {
				status = true;
				actions = '<i class="fa fa-search btn btn-info" title="Ver" onclick="viewNameDocEmployee(' + data.id + ',\'' + data.psychometrictests + '\')" style="cursor: pointer"></i>'
					+ '<i class="fa fa-download btn btn-success" title="Descargar" onclick="downloadNameDocEmployee(' + data.id + ',\'' + data.psychometrictests + '\')" style="cursor: pointer"></i>';
				tr = '<tr>' +
		            '<td>' + actions + '</td>' +
		            '<td>Pruebas psicometricas</td>';
		        $('#tbody_document').append(tr);
			}
			//
			if(data.photo && data.photo.includes('____')) {
				status = true;
				actions = '<i class="fa fa-search btn btn-info" title="Ver" onclick="viewNameDocEmployee(' + data.id + ',\'' + data.photo + '\')" style="cursor: pointer"></i>'
					+ '<i class="fa fa-download btn btn-success" title="Descargar" onclick="downloadNameDocEmployee(' + data.id + ',\'' + data.photo + '\')" style="cursor: pointer"></i>';
				tr = '<tr>' +
		            '<td>' + actions + '</td>' +
		            '<td>Foto</td>';
		        $('#tbody_document').append(tr);
			}
	        
			if(!status) {
				showDivMessage('No existen documentos del usuario: ' + data.name + ' (' + data.email + ')', 'alert-danger', 7000);
			}
			showViewDocEmployee();
		} else {
			showDivMessage(data.error, 'alert-danger', 4000);
		}
	} else {
		showDivMessage('Valores vacios', 'alert-danger', 3000);
	}
}

function viewNameDocEmployee(id, nameFile) {
	// Obtener documento
	var model = {
			id: '' + id,
			nameFile: nameFile
	};
	sendPostAction(EMPLOYEE_CONTROLLER + 'getDocEmployee', model, respGetDocEmployee);
}

function downloadNameDocEmployee(id, nameFile) {
	// Obtener documento
	var model = {
			id: '' + id,
			nameFile: nameFile
	};
	sendPostAction(EMPLOYEE_CONTROLLER + 'getDocEmployee', model, respGetDownloadDocEmployee);
}

function respGetDocEmployee(data) {
	if(data) {
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

function respGetDownloadDocEmployee(data) {
	if(data) {
		if(data.status == 'Ok') {
			$("#contentDocEmployee").empty();
			var dataUri = data.base64Document;
			var link = document.createElement("a");
			link.setAttribute("target","_blank");
			link.setAttribute("href",dataUri);
			link.setAttribute("download","DocumentBeIT " + data.nameUser + " " + TYPEDOCUMENT + getExtention(data.base64Document));
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

function confirmDeleteEmployee(name, id, active) {
    $.jAlert({
        'type': 'confirm',
        'title': 'Confirmación',
        'confirmQuestion': '¿ Seguro de eliminar Empleado: ' + name + ' ?',
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
	sendPostAction(EMPLOYEE_CONTROLLER + 'enabledUserEmployee/' + id + '/' + active, null, respActiveEmployee);
}

function respSaveEmployee(data) {
	cleanGeneralVariables();
	if(data && data[1] == 'Ok'){
		showDivMessage(data[2], 'alert-info', 3000);
		// iniciar contenido tabla
		$("#seccion-table-employee").empty();
		sendPostAction(EMPLOYEE_CONTROLLER + 'findUserAll', null, respFindAll);
	} else {
		showDivMessage(data[2], 'alert-danger', 5000);
	}
}

function respActiveEmployee(data) {
	if(data && data[1] == 'Ok'){
		showDivMessage(data[2], 'alert-info', 2000);
		$('#bootstrap-data-table tr#employee_' + data[3]).remove();
		window.location = '/adm/employees.html';
	} else {
		showDivMessage(data[2], 'alert-danger', 5000);
	}
}

function setValueFile(inputFile) {
	if (inputFile == 'name_proof_studies') {
		var localFileproofstudies = $('#' + inputFile)[0].files[0];
		var readerFileproofstudies = new FileReader();
		readerFileproofstudies.onloadend = function() {
			FILEPROOFSTUDIES = readerFileproofstudies.result;
		}
		if (localFileproofstudies) {
			readerFileproofstudies.readAsDataURL(localFileproofstudies);
		} else {
			FILEPROOFSTUDIES = '';
		}
	}
	if (inputFile == 'name_birth_certificate') {
		var localFilebirthcertificate = $('#' + inputFile)[0].files[0];
		var readerFilebirthcertificate = new FileReader();
		readerFilebirthcertificate.onloadend = function() {
			FILEBIRTHCERTIFICATE = readerFilebirthcertificate.result;
		}
		if (localFilebirthcertificate) {
			readerFilebirthcertificate.readAsDataURL(localFilebirthcertificate);
		} else {
			FILEBIRTHCERTIFICATE = '';
		}
	}
	if (inputFile == 'name_title_profecional_cedula') {
		var localFiletitleprofecionalcedula = $('#' + inputFile)[0].files[0];
		var readerFiletitleprofecionalcedula = new FileReader();
		readerFiletitleprofecionalcedula.onloadend = function() {
			FILETITLEPROFECIONALCEDULA = readerFiletitleprofecionalcedula.result;
		}
		if (localFiletitleprofecionalcedula) {
			readerFiletitleprofecionalcedula
					.readAsDataURL(localFiletitleprofecionalcedula);
		} else {
			FILETITLEPROFECIONALCEDULA = '';
		}
	}
	if (inputFile == 'name_curp') {
		var localFilecurp = $('#' + inputFile)[0].files[0];
		var readerFilecurp = new FileReader();
		readerFilecurp.onloadend = function() {
			FILECURP = readerFilecurp.result;
		}
		if (localFilecurp) {
			readerFilecurp.readAsDataURL(localFilecurp);
		} else {
			FILECURP = '';
		}
	}
	if (inputFile == 'name_imss') {
		var localFileimss = $('#' + inputFile)[0].files[0];
		var readerFileimss = new FileReader();
		readerFileimss.onloadend = function() {
			FILEIMSS = readerFileimss.result;
		}
		if (localFileimss) {
			readerFileimss.readAsDataURL(localFileimss);
		} else {
			FILEIMSS = '';
		}
	}
	if (inputFile == 'name_infonavit') {
		var localFileinfonavit = $('#' + inputFile)[0].files[0];
		var readerFileinfonavit = new FileReader();
		readerFileinfonavit.onloadend = function() {
			FILEINFONAVIT = readerFileinfonavit.result;
		}
		if (localFileinfonavit) {
			readerFileinfonavit.readAsDataURL(localFileinfonavit);
		} else {
			FILEINFONAVIT = '';
		}
	}
	if (inputFile == 'name_identification') {
		var localFileidentification = $('#' + inputFile)[0].files[0];
		var readerFileidentification = new FileReader();
		readerFileidentification.onloadend = function() {
			FILEIDENTIFICATION = readerFileidentification.result;
		}
		if (localFileidentification) {
			readerFileidentification.readAsDataURL(localFileidentification);
		} else {
			FILEIDENTIFICATION = '';
		}
	}
	if (inputFile == 'name_passport_visa') {
		var localFilepassportvisa = $('#' + inputFile)[0].files[0];
		var readerFilepassportvisa = new FileReader();
		readerFilepassportvisa.onloadend = function() {
			FILEPASSPORTVISA = readerFilepassportvisa.result;
		}
		if (localFilepassportvisa) {
			readerFilepassportvisa.readAsDataURL(localFilepassportvisa);
		} else {
			FILEPASSPORTVISA = '';
		}
	}
	if (inputFile == 'name_noncriminal_background') {
		var localFilenoncriminalbackground = $('#' + inputFile)[0].files[0];
		var readerFilenoncriminalbackground = new FileReader();
		readerFilenoncriminalbackground.onloadend = function() {
			FILENONCRIMINALBACKGROUND = readerFilenoncriminalbackground.result;
		}
		if (localFilenoncriminalbackground) {
			readerFilenoncriminalbackground
					.readAsDataURL(localFilenoncriminalbackground);
		} else {
			FILENONCRIMINALBACKGROUND = '';
		}
	}
	if (inputFile == 'name_proof_address') {
		var localFileproofaddress = $('#' + inputFile)[0].files[0];
		var readerFileproofaddress = new FileReader();
		readerFileproofaddress.onloadend = function() {
			FILEPROOFADDRESS = readerFileproofaddress.result;
		}
		if (localFileproofaddress) {
			readerFileproofaddress.readAsDataURL(localFileproofaddress);
		} else {
			FILEPROOFADDRESS = '';
		}
	}
	if (inputFile == 'name_personal_references') {
		var localFilepersonalreferences = $('#' + inputFile)[0].files[0];
		var readerFilepersonalreferences = new FileReader();
		readerFilepersonalreferences.onloadend = function() {
			FILEPERSONALREFERENCES = readerFilepersonalreferences.result;
		}
		if (localFilepersonalreferences) {
			readerFilepersonalreferences
					.readAsDataURL(localFilepersonalreferences);
		} else {
			FILEPERSONALREFERENCES = '';
		}
	}
	if (inputFile == 'name_professional_cv') {
		var localFileprofessionalcv = $('#' + inputFile)[0].files[0];
		var readerFileprofessionalcv = new FileReader();
		readerFileprofessionalcv.onloadend = function() {
			FILEPROFESSIONALCV = readerFileprofessionalcv.result;
		}
		if (localFileprofessionalcv) {
			readerFileprofessionalcv.readAsDataURL(localFileprofessionalcv);
		} else {
			FILEPROFESSIONALCV = '';
		}
	}
	if (inputFile == 'name_psychometric_tests') {
		var localFilepsychometrictests = $('#' + inputFile)[0].files[0];
		var readerFilepsychometrictests = new FileReader();
		readerFilepsychometrictests.onloadend = function() {
			FILEPSYCHOMETRICTESTS = readerFilepsychometrictests.result;
		}
		if (localFilepsychometrictests) {
			readerFilepsychometrictests
					.readAsDataURL(localFilepsychometrictests);
		} else {
			FILEPSYCHOMETRICTESTS = '';
		}
	}
	if (inputFile == 'name_photo') {
		var localFilephoto = $('#' + inputFile)[0].files[0];
		var readerFilephoto = new FileReader();
		readerFilephoto.onloadend = function() {
			FILEPHOTO = readerFilephoto.result;
		}
		if (localFilephoto) {
			readerFilephoto.readAsDataURL(localFilephoto);
		} else {
			FILEPHOTO = '';
		}
	}
}

function cleanForm() {
	// Limpiar elementos
	cleanGeneralVariables();
    // $('#emp-name').val('');
	$("#form-add-employee")[0].reset();
	$('#sex').trigger('change');
	$('#civil_status').trigger('change');
	$('#state').trigger('change');
	$('#delegation_municipality').trigger('change');
	$('#colony').trigger('change');
	$('#postal_code').trigger('change');
	$('#institute').trigger('change');
	$('#educational_level').trigger('change');
	$('#area').trigger('change');
	$('#market_stall').trigger('change');
	$('#boss').trigger('change');
}

function cleanGeneralVariables() {
	FILEPROOFSTUDIES = '';
	FILEBIRTHCERTIFICATE = '';
	FILETITLEPROFECIONALCEDULA = '';
	FILECURP = '';
	FILEIMSS = '';
	FILEINFONAVIT = '';
	FILEIDENTIFICATION = '';
	FILEPASSPORTVISA = '';
	FILENONCRIMINALBACKGROUND = '';
	FILEPROOFADDRESS = '';
	FILEPERSONALREFERENCES = '';
	FILEPROFESSIONALCV = '';
	FILEPSYCHOMETRICTESTS = '';
	FILEPHOTO = '';
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

function showViewDocEmployee() {
	$('#info-employee').css('display', 'none');
    $('#view-employee').css('display', 'block');
    $("#btn-cancel-view-employee").show();
}

function hideViewDocEmployee() {
	$('#info-employee').css('display', 'block');
    $('#view-employee').css('display', 'none');
    $("#btn-cancel-view-employee").hide();
}