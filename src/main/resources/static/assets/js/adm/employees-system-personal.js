/*
 * @autor Nazario Dazaeev Gonzalez Herrera
 * Controller 
 * Pagina de control "employee_legal"
 */

// Variables Globales
var ID_EMPLOYEE_GRAL = 0;
var ID_EMPLOYEE_FILES_SYSTEM_PERSONAL = 0;

var NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROOFSTUDIES             = '';
var NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_BIRTHCERTIFICATE         = '';
var NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_TITLEPROFESSIONALLICENSE = '';
var NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_CURP                     = '';
var NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_IMSS                     = '';
var NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_INFONAVIT                = '';
var NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_OFFICIALIDENTIFICATION   = '';
var NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PASSPORTVISA             = '';
var NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_NOCRIMINALRECORD         = '';
var NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROOFADDRESS             = '';
var NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PERSONALREFERENCES       = '';
var NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROFESSIONALCURRICULUM   = '';
var NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PHOTO                    = '';
var NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_CERTIFICATIONS           = '';

var FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROOFSTUDIES             = '';
var FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_BIRTHCERTIFICATE         = '';
var FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_TITLEPROFESSIONALLICENSE = '';
var FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_CURP                     = '';
var FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_IMSS                     = '';
var FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_INFONAVIT                = '';
var FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_OFFICIALIDENTIFICATION   = '';
var FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PASSPORTVISA             = '';
var FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_NOCRIMINALRECORD         = '';
var FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROOFADDRESS             = '';
var FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PERSONALREFERENCES       = '';
var FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROFESSIONALCURRICULUM   = '';
var FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PHOTO                    = '';
var FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_CERTIFICATIONS           = '';

var NAME_FILE_DOWNLOAD = '';

// Cargando sistema
$(document).ready(function($) {
	startingSystemMenu();
	//
	cleanGeneralVariables();
	//
	initTable();
	//
	$('#btn-cancel-employee').on('click', function () {
		cleanGeneralVariables();
		//
		ID_EMPLOYEE_GRAL = 0;
		ID_EMPLOYEE_FILES_SYSTEM_PERSONAL = 0;
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
	$('#btn-view-proofStudies').on('click', function () {
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

function cleanGeneralVariables() {
	NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROOFSTUDIES             = '';
	NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_BIRTHCERTIFICATE         = '';
	NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_TITLEPROFESSIONALLICENSE = '';
	NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_CURP                     = '';
	NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_IMSS                     = '';
	NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_INFONAVIT                = '';
	NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_OFFICIALIDENTIFICATION   = '';
	NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PASSPORTVISA             = '';
	NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_NOCRIMINALRECORD         = '';
	NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROOFADDRESS             = '';
	NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PERSONALREFERENCES       = '';
	NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROFESSIONALCURRICULUM   = '';
	NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PHOTO                    = '';
	NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_CERTIFICATIONS           = '';
	
	FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROOFSTUDIES             = '';
	FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_BIRTHCERTIFICATE         = '';
	FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_TITLEPROFESSIONALLICENSE = '';
	FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_CURP                     = '';
	FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_IMSS                     = '';
	FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_INFONAVIT                = '';
	FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_OFFICIALIDENTIFICATION   = '';
	FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PASSPORTVISA             = '';
	FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_NOCRIMINALRECORD         = '';
	FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROOFADDRESS             = '';
	FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PERSONALREFERENCES       = '';
	FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROFESSIONALCURRICULUM   = '';
	FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PHOTO                    = '';
	FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_CERTIFICATIONS           = '';
	
	NAME_FILE_DOWNLOAD = '';
}

function initTable() {
	// iniciar contenido tabla
	$("#seccion-table-employee").empty();
	// Llenar tabla empleados
	sendPostAction(EMPLOYEE_GRAL_CONTROLLER + 'findFilesSystemPersonal', null, respFindAll);
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
							
							+ ' 		<th>Comprobante de estudios		                            </th>                          '
							+ ' 		<th>Acta de nacimiento                                      </th>                          '
							+ ' 		<th>Titulo/Cedula profesional                             	</th>                          '
							+ ' 		<th>Curp                                                    </th>                          '
							+ ' 		<th>Imss                                                    </th>                          '
							+ ' 		<th>Infonavit                                               </th>                          '
							+ ' 		<th>Identificaciòn                                          </th>                          '
							+ ' 		<th>Pasaporte y visa                                        </th>                          '
							+ ' 		<th>Antecedentes no penales                                 </th>                          '
							+ ' 		<th>Comprobante domicilio                                   </th>                          '
							+ ' 		<th>Referencias personales                                  </th>                          '
							+ ' 		<th>Curriculum profesional                                  </th>                          '
							+ ' 		<th>Foto                                                    </th>                          '
							+ ' 		<th>Certificaciones                                         </th>                          '
							
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
										
										+ '\'' + rowEmployee.proofStudies				+ '\','
										+ '\'' + rowEmployee.birthCertificate           + '\','
										+ '\'' + rowEmployee.titleProfessionalLicense   + '\','
										+ '\'' + rowEmployee.curp                       + '\','
										+ '\'' + rowEmployee.imss                       + '\','
										+ '\'' + rowEmployee.infonavit                  + '\','
										+ '\'' + rowEmployee.officialIdentification     + '\','
										+ '\'' + rowEmployee.passportVisa               + '\','
										+ '\'' + rowEmployee.noCriminalRecord           + '\','
										+ '\'' + rowEmployee.proofAddress               + '\','
										+ '\'' + rowEmployee.personalReferences         + '\','
										+ '\'' + rowEmployee.professionalCurriculum     + '\','
										+ '\'' + rowEmployee.photo                      + '\','
										+ '\'' + rowEmployee.certifications             + '\''
										
										+ ')" style="cursor: pointer"></i>';
			
			var tr = '<tr id="employee_' + rowEmployee.id + '">';
			
			tr += '<td align="center">'+ actions +'</td>';
			tr += '<td>'+ rowEmployee.name + ' ' + rowEmployee.lastName +'</td>';
			// -----------------------------------------------------------
			// ---------- Validar existencia de archivos -----------------
			// -----------------------------------------------------------
			if(rowEmployee.proofStudies) {
				tr += '<td>' 
						+ '<i class="fa fa-download btn btn-info" title="Ver o descargar documento" onclick="viewDocActa(\'' 
								+ rowEmployee.id + '\','
								+ '\'' + rowEmployee.name + ' ' + rowEmployee.lastName 	+ '\','
								+ '\'' + rowEmployee.proofStudies + '\','
								+ '\'view\''
								+ ')" style="cursor: pointer"></i>'  
					+'</td>';
			} else {
				tr += '<td>'+ rowEmployee.proofStudies  +'</td>';
			}
			// -----------------------------------------------------------
			if(rowEmployee.birthCertificate) {
				tr += '<td>' 
						+ '<i class="fa fa-download btn btn-info" title="Ver o descargar documento" onclick="viewDocActa(\'' 
								+ rowEmployee.id + '\','
								+ '\'' + rowEmployee.name + ' ' + rowEmployee.lastName 	+ '\','
								+ '\'' + rowEmployee.birthCertificate + '\','
								+ '\'view\''
								+ ')" style="cursor: pointer"></i>'  
					+'</td>';
			} else {
				tr += '<td>'+ rowEmployee.birthCertificate  +'</td>';
			}
			// -----------------------------------------------------------
			if(rowEmployee.titleProfessionalLicense) {
				tr += '<td>' 
						+ '<i class="fa fa-download btn btn-info" title="Ver o descargar documento" onclick="viewDocActa(\'' 
								+ rowEmployee.id + '\','
								+ '\'' + rowEmployee.name + ' ' + rowEmployee.lastName 	+ '\','
								+ '\'' + rowEmployee.titleProfessionalLicense + '\','
								+ '\'view\''
								+ ')" style="cursor: pointer"></i>'  
					+'</td>';
			} else {
				tr += '<td>'+ rowEmployee.titleProfessionalLicense  +'</td>';
			}
			// -----------------------------------------------------------
			if(rowEmployee.curp) {
				tr += '<td>' 
						+ '<i class="fa fa-download btn btn-info" title="Ver o descargar documento" onclick="viewDocActa(\'' 
								+ rowEmployee.id + '\','
								+ '\'' + rowEmployee.name + ' ' + rowEmployee.lastName 	+ '\','
								+ '\'' + rowEmployee.curp + '\','
								+ '\'view\''
								+ ')" style="cursor: pointer"></i>'  
					+'</td>';
			} else {
				tr += '<td>'+ rowEmployee.curp  +'</td>';
			}
			// -----------------------------------------------------------
			if(rowEmployee.imss) {
				tr += '<td>' 
						+ '<i class="fa fa-download btn btn-info" title="Ver o descargar documento" onclick="viewDocActa(\'' 
								+ rowEmployee.id + '\','
								+ '\'' + rowEmployee.name + ' ' + rowEmployee.lastName 	+ '\','
								+ '\'' + rowEmployee.imss + '\','
								+ '\'view\''
								+ ')" style="cursor: pointer"></i>'  
					+'</td>';
			} else {
				tr += '<td>'+ rowEmployee.imss  +'</td>';
			}
			// -----------------------------------------------------------
			if(rowEmployee.infonavit) {
				tr += '<td>' 
						+ '<i class="fa fa-download btn btn-info" title="Ver o descargar documento" onclick="viewDocActa(\'' 
								+ rowEmployee.id + '\','
								+ '\'' + rowEmployee.name + ' ' + rowEmployee.lastName 	+ '\','
								+ '\'' + rowEmployee.infonavit + '\','
								+ '\'view\''
								+ ')" style="cursor: pointer"></i>'  
					+'</td>';
			} else {
				tr += '<td>'+ rowEmployee.infonavit  +'</td>';
			}
			// -----------------------------------------------------------
			if(rowEmployee.officialIdentification) {
				tr += '<td>' 
						+ '<i class="fa fa-download btn btn-info" title="Ver o descargar documento" onclick="viewDocActa(\'' 
								+ rowEmployee.id + '\','
								+ '\'' + rowEmployee.name + ' ' + rowEmployee.lastName 	+ '\','
								+ '\'' + rowEmployee.officialIdentification + '\','
								+ '\'view\''
								+ ')" style="cursor: pointer"></i>'  
					+'</td>';
			} else {
				tr += '<td>'+ rowEmployee.officialIdentification  +'</td>';
			}
			// -----------------------------------------------------------
			if(rowEmployee.passportVisa) {
				tr += '<td>' 
						+ '<i class="fa fa-download btn btn-info" title="Ver o descargar documento" onclick="viewDocActa(\'' 
								+ rowEmployee.id + '\','
								+ '\'' + rowEmployee.name + ' ' + rowEmployee.lastName 	+ '\','
								+ '\'' + rowEmployee.passportVisa + '\','
								+ '\'view\''
								+ ')" style="cursor: pointer"></i>'  
					+'</td>';
			} else {
				tr += '<td>'+ rowEmployee.passportVisa  +'</td>';
			}
			// -----------------------------------------------------------
			if(rowEmployee.noCriminalRecord) {
				tr += '<td>' 
						+ '<i class="fa fa-download btn btn-info" title="Ver o descargar documento" onclick="viewDocActa(\'' 
								+ rowEmployee.id + '\','
								+ '\'' + rowEmployee.name + ' ' + rowEmployee.lastName 	+ '\','
								+ '\'' + rowEmployee.noCriminalRecord + '\','
								+ '\'view\''
								+ ')" style="cursor: pointer"></i>'  
					+'</td>';
			} else {
				tr += '<td>'+ rowEmployee.noCriminalRecord  +'</td>';
			}
			// -----------------------------------------------------------
			if(rowEmployee.proofAddress) {
				tr += '<td>' 
						+ '<i class="fa fa-download btn btn-info" title="Ver o descargar documento" onclick="viewDocActa(\'' 
								+ rowEmployee.id + '\','
								+ '\'' + rowEmployee.name + ' ' + rowEmployee.lastName 	+ '\','
								+ '\'' + rowEmployee.proofAddress + '\','
								+ '\'view\''
								+ ')" style="cursor: pointer"></i>'  
					+'</td>';
			} else {
				tr += '<td>'+ rowEmployee.proofAddress  +'</td>';
			}
			// -----------------------------------------------------------
			if(rowEmployee.personalReferences) {
				tr += '<td>' 
						+ '<i class="fa fa-download btn btn-info" title="Ver o descargar documento" onclick="viewDocActa(\'' 
								+ rowEmployee.id + '\','
								+ '\'' + rowEmployee.name + ' ' + rowEmployee.lastName 	+ '\','
								+ '\'' + rowEmployee.personalReferences + '\','
								+ '\'view\''
								+ ')" style="cursor: pointer"></i>'  
					+'</td>';
			} else {
				tr += '<td>'+ rowEmployee.personalReferences  +'</td>';
			}
			// -----------------------------------------------------------
			if(rowEmployee.professionalCurriculum) {
				tr += '<td>' 
						+ '<i class="fa fa-download btn btn-info" title="Ver o descargar documento" onclick="viewDocActa(\'' 
								+ rowEmployee.id + '\','
								+ '\'' + rowEmployee.name + ' ' + rowEmployee.lastName 	+ '\','
								+ '\'' + rowEmployee.professionalCurriculum + '\','
								+ '\'view\''
								+ ')" style="cursor: pointer"></i>'  
					+'</td>';
			} else {
				tr += '<td>'+ rowEmployee.professionalCurriculum  +'</td>';
			}
			// -----------------------------------------------------------
			if(rowEmployee.photo) {
				tr += '<td>' 
						+ '<i class="fa fa-download btn btn-info" title="Ver o descargar documento" onclick="viewDocActa(\'' 
								+ rowEmployee.id + '\','
								+ '\'' + rowEmployee.name + ' ' + rowEmployee.lastName 	+ '\','
								+ '\'' + rowEmployee.photo + '\','
								+ '\'view\''
								+ ')" style="cursor: pointer"></i>'  
					+'</td>';
			} else {
				tr += '<td>'+ rowEmployee.photo  +'</td>';
			}
			// -----------------------------------------------------------
			if(rowEmployee.certifications) {
				tr += '<td>' 
						+ '<i class="fa fa-download btn btn-info" title="Ver o descargar documento" onclick="viewDocActa(\'' 
								+ rowEmployee.id + '\','
								+ '\'' + rowEmployee.name + ' ' + rowEmployee.lastName 	+ '\','
								+ '\'' + rowEmployee.certifications + '\','
								+ '\'view\''
								+ ')" style="cursor: pointer"></i>'  
					+'</td>';
			} else {
				tr += '<td>'+ rowEmployee.certifications  +'</td>';
			}
			// -----------------------------------------------------------
			
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

function hideViewAddEmployee() {
	$('#btn-view-proofStudies').css('display', 'none');
	$('#btn-view-birthCertificate').css('display', 'none');
	$('#btn-view-titleProfessionalLicense').css('display', 'none');
	$('#btn-view-curp').css('display', 'none');
	$('#btn-view-imss').css('display', 'none');
	$('#btn-view-infonavit').css('display', 'none');
	$('#btn-view-officialIdentification').css('display', 'none');
	$('#btn-view-passportVisa').css('display', 'none');
	$('#btn-view-noCriminalRecord').css('display', 'none');
	$('#btn-view-proofAddress').css('display', 'none');
	$('#btn-view-personalReferences').css('display', 'none');
	$('#btn-view-professionalCurriculum').css('display', 'none');
	$('#btn-view-photo').css('display', 'none');
	$('#btn-view-certifications').css('display', 'none');
}

function saveEmployee() {
	var user = new User();
	user.id										= ID_EMPLOYEE_GRAL;
	user.email									= sessionStorage.getItem("email");
	// Llenar Empleado
	var employeegral = new employeeGral();
	var employeefilessystempersonal = new employeeFilesSystemPersonal();
	// -----------------------------------------------------------------------------------------------------------
	if(NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROOFSTUDIES) {
		// Editar
		if(castNameFileToTypeFile('proofStudies')) {
			employeefilessystempersonal.proofStudies	= castNameFileToTypeFile('proofStudies');
		} else {
			employeefilessystempersonal.proofStudies	= NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROOFSTUDIES;
		}
	} else {
		// Guardar
		employeefilessystempersonal.proofStudies	= castNameFileToTypeFile('proofStudies');
	}
	employeefilessystempersonal.fileProofStudies	= FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROOFSTUDIES;
	//
	if(NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_BIRTHCERTIFICATE) {
		// Editar
		if(castNameFileToTypeFile('birthCertificate')) {
			employeefilessystempersonal.birthCertificate	= castNameFileToTypeFile('birthCertificate');
		} else {
			employeefilessystempersonal.birthCertificate	= NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_BIRTHCERTIFICATE;
		}
	} else {
		// Guardar
		employeefilessystempersonal.birthCertificate	= castNameFileToTypeFile('birthCertificate');
	}
	employeefilessystempersonal.fileBirthCertificate	= FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_BIRTHCERTIFICATE;
	//
	if(NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_TITLEPROFESSIONALLICENSE) {
		// Editar
		if(castNameFileToTypeFile('titleProfessionalLicense')) {
			employeefilessystempersonal.titleProfessionalLicense	= castNameFileToTypeFile('titleProfessionalLicense');
		} else {
			employeefilessystempersonal.titleProfessionalLicense	= NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_TITLEPROFESSIONALLICENSE;
		}
	} else {
		// Guardar
		employeefilessystempersonal.titleProfessionalLicense	= castNameFileToTypeFile('titleProfessionalLicense');
	}
	employeefilessystempersonal.fileTitleProfessionalLicense	= FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_TITLEPROFESSIONALLICENSE;
	//
	if(NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_CURP) {
		// Editar
		if(castNameFileToTypeFile('curp')) {
			employeefilessystempersonal.curp	= castNameFileToTypeFile('curp');
		} else {
			employeefilessystempersonal.curp	= NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_CURP;
		}
	} else {
		// Guardar
		employeefilessystempersonal.curp	= castNameFileToTypeFile('curp');
	}
	employeefilessystempersonal.fileCurp	= FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_CURP;
	//
	if(NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_IMSS) {
		// Editar
		if(castNameFileToTypeFile('imss')) {
			employeefilessystempersonal.imss	= castNameFileToTypeFile('imss');
		} else {
			employeefilessystempersonal.imss	= NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_IMSS;
		}
	} else {
		// Guardar
		employeefilessystempersonal.imss	= castNameFileToTypeFile('imss');
	}
	employeefilessystempersonal.fileImss	= FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_IMSS;
	//
	if(NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_INFONAVIT) {
		// Editar
		if(castNameFileToTypeFile('infonavit')) {
			employeefilessystempersonal.infonavit	= castNameFileToTypeFile('infonavit');
		} else {
			employeefilessystempersonal.infonavit	= NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_INFONAVIT;
		}
	} else {
		// Guardar
		employeefilessystempersonal.infonavit	= castNameFileToTypeFile('infonavit');
	}
	employeefilessystempersonal.fileInfonavit	= FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_INFONAVIT;
	//
	if(NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_OFFICIALIDENTIFICATION) {
		// Editar
		if(castNameFileToTypeFile('officialIdentification')) {
			employeefilessystempersonal.officialIdentification	= castNameFileToTypeFile('officialIdentification');
		} else {
			employeefilessystempersonal.officialIdentification	= NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_OFFICIALIDENTIFICATION;
		}
	} else {
		// Guardar
		employeefilessystempersonal.officialIdentification	= castNameFileToTypeFile('officialIdentification');
	}
	employeefilessystempersonal.fileOfficialIdentification	= FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_OFFICIALIDENTIFICATION;
	//
	if(NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PASSPORTVISA) {
		// Editar
		if(castNameFileToTypeFile('passportVisa')) {
			employeefilessystempersonal.passportVisa	= castNameFileToTypeFile('passportVisa');
		} else {
			employeefilessystempersonal.passportVisa	= NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PASSPORTVISA;
		}
	} else {
		// Guardar
		employeefilessystempersonal.passportVisa	= castNameFileToTypeFile('passportVisa');
	}
	employeefilessystempersonal.filePassportVisa	= FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PASSPORTVISA;
	//
	if(NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_NOCRIMINALRECORD) {
		// Editar
		if(castNameFileToTypeFile('noCriminalRecord')) {
			employeefilessystempersonal.noCriminalRecord	= castNameFileToTypeFile('noCriminalRecord');
		} else {
			employeefilessystempersonal.noCriminalRecord	= NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_NOCRIMINALRECORD;
		}
	} else {
		// Guardar
		employeefilessystempersonal.noCriminalRecord	= castNameFileToTypeFile('noCriminalRecord');
	}
	employeefilessystempersonal.fileNoCriminalRecord	= FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_NOCRIMINALRECORD;
	//
	if(NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROOFADDRESS) {
		// Editar
		if(castNameFileToTypeFile('proofAddress')) {
			employeefilessystempersonal.proofAddress	= castNameFileToTypeFile('proofAddress');
		} else {
			employeefilessystempersonal.proofAddress	= NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROOFADDRESS;
		}
	} else {
		// Guardar
		employeefilessystempersonal.proofAddress	= castNameFileToTypeFile('proofAddress');
	}
	employeefilessystempersonal.fileProofAddress	= FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROOFADDRESS;
	//
	if(NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PERSONALREFERENCES) {
		// Editar
		if(castNameFileToTypeFile('personalReferences')) {
			employeefilessystempersonal.personalReferences	= castNameFileToTypeFile('personalReferences');
		} else {
			employeefilessystempersonal.personalReferences	= NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PERSONALREFERENCES;
		}
	} else {
		// Guardar
		employeefilessystempersonal.personalReferences	= castNameFileToTypeFile('personalReferences');
	}
	employeefilessystempersonal.filePersonalReferences	= FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PERSONALREFERENCES;
	//
	if(NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROFESSIONALCURRICULUM) {
		// Editar
		if(castNameFileToTypeFile('professionalCurriculum')) {
			employeefilessystempersonal.professionalCurriculum	= castNameFileToTypeFile('professionalCurriculum');
		} else {
			employeefilessystempersonal.professionalCurriculum	= NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROFESSIONALCURRICULUM;
		}
	} else {
		// Guardar
		employeefilessystempersonal.professionalCurriculum	= castNameFileToTypeFile('professionalCurriculum');
	}
	employeefilessystempersonal.fileProfessionalCurriculum	= FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROFESSIONALCURRICULUM;
	//
	if(NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PHOTO) {
		// Editar
		if(castNameFileToTypeFile('photo')) {
			employeefilessystempersonal.photo	= castNameFileToTypeFile('photo');
		} else {
			employeefilessystempersonal.photo	= NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PHOTO;
		}
	} else {
		// Guardar
		employeefilessystempersonal.photo	= castNameFileToTypeFile('photo');
	}
	employeefilessystempersonal.filePhoto	= FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PHOTO;
	//
	if(NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_CERTIFICATIONS) {
		// Editar
		if(castNameFileToTypeFile('certifications')) {
			employeefilessystempersonal.certifications	= castNameFileToTypeFile('certifications');
		} else {
			employeefilessystempersonal.certifications	= NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_CERTIFICATIONS;
		}
	} else {
		// Guardar
		employeefilessystempersonal.certifications	= castNameFileToTypeFile('certifications');
	}
	employeefilessystempersonal.fileCertifications	= FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_CERTIFICATIONS;
	//
	// -----------------------------------------------------------------------------------------------------------
	//
	employeefilessystempersonal.active = 1;
	// Setear Empleado Laboral
	employeegral.employeeFilesSystemPersonal = [employeefilessystempersonal];
	// Setear Empleado General
	user.employee = employeegral;
	console.log(user);
	//
	sendPostAction(EMPLOYEE_GRAL_CONTROLLER + 'saveUserEmployeeFilesSystemPersonal/' + ID_EMPLOYEE_FILES_SYSTEM_PERSONAL, user, respSaveEmployeeGral);
}

function respSaveEmployeeGral(data) {
	cleanGeneralVariables();
	//
	ID_EMPLOYEE_GRAL = 0;
	ID_EMPLOYEE_FILES_SYSTEM_PERSONAL = 0;
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
	// Ocultar Botones en Agregar Empleado
	hideViewAddEmployee();
	//
	var splitId = id.split('_');
	if(splitId.length == 2) {
		ID_EMPLOYEE_GRAL = splitId[0];
	} else {
		ID_EMPLOYEE_GRAL = id;
	}
	ID_EMPLOYEE_FILES_SYSTEM_PERSONAL = 0;
	
	cleanForm();
	//
	showAddEmployee();
}

function editEmployee(id, name, 
			proofStudies, 
			birthCertificate, 
			titleProfessionalLicense, 
			curp, 
			imss, 
			infonavit, 
			officialIdentification, 
			passportVisa, 
			noCriminalRecord, 
			proofAddress,            
			personalReferences,      
			professionalCurriculum,  
			photo,                   
			certifications) {
	$('#add-mod-employee').text('Información de ' + name);
	// -----------------------------------------------------------------------------
	NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROOFSTUDIES			= proofStudies;
	NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_BIRTHCERTIFICATE        = birthCertificate;
	NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_TITLEPROFESSIONALLICENSE= titleProfessionalLicense;
	NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_CURP                    = curp;
	NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_IMSS                    = imss;
	NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_INFONAVIT               = infonavit;
	NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_OFFICIALIDENTIFICATION  = officialIdentification;
	NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PASSPORTVISA            = passportVisa;
	NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_NOCRIMINALRECORD        = noCriminalRecord;
	NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROOFADDRESS            = proofAddress;
	NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PERSONALREFERENCES      = personalReferences;
	NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROFESSIONALCURRICULUM  = professionalCurriculum;
	NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_PHOTO                   = photo;
	NAME_EMPLOYEE_FILES_SYSTEM_PERSONAL_CERTIFICATIONS          = certifications;
	//
	var splitId = id.split('_');
	if(splitId.length == 2) {
		ID_EMPLOYEE_GRAL = splitId[0];
		ID_EMPLOYEE_FILES_SYSTEM_PERSONAL = splitId[1];
	} else {
		ID_EMPLOYEE_GRAL = id;
		ID_EMPLOYEE_FILES_SYSTEM_PERSONAL = 0;
	}
	cleanForm();
	// validar si contiene archivo Ver o descargar documento
	if (proofStudies) {
		$('#btn-view-proofStudies').css('display', 'block');
	} else {
		$('#btn-view-proofStudies').css('display', 'none');
	}
	if (birthCertificate) {
		$('#btn-view-birthCertificate').css('display', 'block');
	} else {
		$('#btn-view-birthCertificate').css('display', 'none');
	}
	if (titleProfessionalLicense) {
		$('#btn-view-titleProfessionalLicense').css('display', 'block');
	} else {
		$('#btn-view-titleProfessionalLicense').css('display', 'none');
	}
	if (curp) {
		$('#btn-view-curp').css('display', 'block');
	} else {
		$('#btn-view-curp').css('display', 'none');
	}
	if (imss) {
		$('#btn-view-imss').css('display', 'block');
	} else {
		$('#btn-view-imss').css('display', 'none');
	}
	if (infonavit) {
		$('#btn-view-infonavit').css('display', 'block');
	} else {
		$('#btn-view-infonavit').css('display', 'none');
	}
	if (officialIdentification) {
		$('#btn-view-officialIdentification').css('display', 'block');
	} else {
		$('#btn-view-officialIdentification').css('display', 'none');
	}
	if (passportVisa) {
		$('#btn-view-passportVisa').css('display', 'block');
	} else {
		$('#btn-view-passportVisa').css('display', 'none');
	}
	if (noCriminalRecord) {
		$('#btn-view-noCriminalRecord').css('display', 'block');
	} else {
		$('#btn-view-noCriminalRecord').css('display', 'none');
	}
	if (proofAddress) {
		$('#btn-view-proofAddress').css('display', 'block');
	} else {
		$('#btn-view-proofAddress').css('display', 'none');
	}
	if (personalReferences) {
		$('#btn-view-personalReferences').css('display', 'block');
	} else {
		$('#btn-view-personalReferences').css('display', 'none');
	}
	if (professionalCurriculum) {
		$('#btn-view-professionalCurriculum').css('display', 'block');
	} else {
		$('#btn-view-professionalCurriculum').css('display', 'none');
	}
	if (photo) {
		$('#btn-view-photo').css('display', 'block');
	} else {
		$('#btn-view-photo').css('display', 'none');
	}
	if (certifications) {
		$('#btn-view-certifications').css('display', 'block');
	} else {
		$('#btn-view-certifications').css('display', 'none');
	}
	// $('#proofStudies').attr('value', proofStudies);
	//
	showAddEmployee();
}

function cleanForm() {
	$("#form-add-employee")[0].reset();
}

function setValueFile(inputFile) {
	// ----------------------------------------------------------------------------------------
	if (inputFile == 'proofStudies') {
		var local = $('#' + inputFile)[0].files[0];
		var readerFiles = new FileReader();
		readerFiles.onloadend = function() {
			FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROOFSTUDIES = readerFiles.result;
		}
		if (local) {
			readerFiles.readAsDataURL(local);
		} else {
			FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROOFSTUDIES = '';
		}
	}
	if (inputFile == 'birthCertificate') {
		var local = $('#' + inputFile)[0].files[0];
		var readerFiles = new FileReader();
		readerFiles.onloadend = function() {
			FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_BIRTHCERTIFICATE = readerFiles.result;
		}
		if (local) {
			readerFiles.readAsDataURL(local);
		} else {
			FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_BIRTHCERTIFICATE = '';
		}
	}
	if (inputFile == 'titleProfessionalLicense') {
		var local = $('#' + inputFile)[0].files[0];
		var readerFiles = new FileReader();
		readerFiles.onloadend = function() {
			FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_TITLEPROFESSIONALLICENSE = readerFiles.result;
		}
		if (local) {
			readerFiles.readAsDataURL(local);
		} else {
			FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_TITLEPROFESSIONALLICENSE = '';
		}
	}
	if (inputFile == 'curp') {
		var local = $('#' + inputFile)[0].files[0];
		var readerFiles = new FileReader();
		readerFiles.onloadend = function() {
			FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_CURP = readerFiles.result;
		}
		if (local) {
			readerFiles.readAsDataURL(local);
		} else {
			FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_CURP = '';
		}
	}
	if (inputFile == 'imss') {
		var local = $('#' + inputFile)[0].files[0];
		var readerFiles = new FileReader();
		readerFiles.onloadend = function() {
			FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_IMSS = readerFiles.result;
		}
		if (local) {
			readerFiles.readAsDataURL(local);
		} else {
			FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_IMSS = '';
		}
	}
	if (inputFile == 'infonavit') {
		var local = $('#' + inputFile)[0].files[0];
		var readerFiles = new FileReader();
		readerFiles.onloadend = function() {
			FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_INFONAVIT = readerFiles.result;
		}
		if (local) {
			readerFiles.readAsDataURL(local);
		} else {
			FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_INFONAVIT = '';
		}
	}
	if (inputFile == 'officialIdentification') {
		var local = $('#' + inputFile)[0].files[0];
		var readerFiles = new FileReader();
		readerFiles.onloadend = function() {
			FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_OFFICIALIDENTIFICATION = readerFiles.result;
		}
		if (local) {
			readerFiles.readAsDataURL(local);
		} else {
			FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_OFFICIALIDENTIFICATION = '';
		}
	}
	if (inputFile == 'passportVisa') {
		var local = $('#' + inputFile)[0].files[0];
		var readerFiles = new FileReader();
		readerFiles.onloadend = function() {
			FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PASSPORTVISA = readerFiles.result;
		}
		if (local) {
			readerFiles.readAsDataURL(local);
		} else {
			FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PASSPORTVISA = '';
		}
	}
	if (inputFile == 'noCriminalRecord') {
		var local = $('#' + inputFile)[0].files[0];
		var readerFiles = new FileReader();
		readerFiles.onloadend = function() {
			FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_NOCRIMINALRECORD = readerFiles.result;
		}
		if (local) {
			readerFiles.readAsDataURL(local);
		} else {
			FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_NOCRIMINALRECORD = '';
		}
	}
	if (inputFile == 'proofAddress') {
		var local = $('#' + inputFile)[0].files[0];
		var readerFiles = new FileReader();
		readerFiles.onloadend = function() {
			FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROOFADDRESS = readerFiles.result;
		}
		if (local) {
			readerFiles.readAsDataURL(local);
		} else {
			FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROOFADDRESS = '';
		}
	}
	if (inputFile == 'personalReferences') {
		var local = $('#' + inputFile)[0].files[0];
		var readerFiles = new FileReader();
		readerFiles.onloadend = function() {
			FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PERSONALREFERENCES = readerFiles.result;
		}
		if (local) {
			readerFiles.readAsDataURL(local);
		} else {
			FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PERSONALREFERENCES = '';
		}
	}
	if (inputFile == 'professionalCurriculum') {
		var local = $('#' + inputFile)[0].files[0];
		var readerFiles = new FileReader();
		readerFiles.onloadend = function() {
			FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROFESSIONALCURRICULUM = readerFiles.result;
		}
		if (local) {
			readerFiles.readAsDataURL(local);
		} else {
			FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PROFESSIONALCURRICULUM = '';
		}
	}
	if (inputFile == 'photo') {
		var local = $('#' + inputFile)[0].files[0];
		var readerFiles = new FileReader();
		readerFiles.onloadend = function() {
			FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PHOTO = readerFiles.result;
		}
		if (local) {
			readerFiles.readAsDataURL(local);
		} else {
			FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_PHOTO = '';
		}
	}
	if (inputFile == 'certifications') {
		var local = $('#' + inputFile)[0].files[0];
		var readerFiles = new FileReader();
		readerFiles.onloadend = function() {
			FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_CERTIFICATIONS = readerFiles.result;
		}
		if (local) {
			readerFiles.readAsDataURL(local);
		} else {
			FILE_EMPLOYEE_FILES_SYSTEM_PERSONAL_CERTIFICATIONS = '';
		}
	}
	// ----------------------------------------------------------------------------------------
}

function viewDocActa(id, name, administrativeActasAttention, action) {
	// Ver o descargar documento
	$('#lTypeDocument').empty();
	//
	if(action == 'view') {
		NAME_FILE_DOWNLOAD = administrativeActasAttention;
		// Ver documento
		var splitName = administrativeActasAttention.split('____');
		var nameFile = '';
		if(splitName.length == 2) {
			nameFile = splitName[0];
		} else {
			nameFile = splitName[1];
		}
		$('#lTypeDocument').text(name + ' (' + nameFile + ')');
		//
		console.log('Ver o descargar documento: ' + administrativeActasAttention);
		//
		$("#contentDocEmployee").empty();
		var splitId = id.split('_');
		if(splitId.length == 2) {
			ID_EMPLOYEE_GRAL = splitId[0];
			ID_EMPLOYEE_FILES_SYSTEM_PERSONAL = splitId[1];
			var model = {
					nameFile: administrativeActasAttention,
					idUser: ID_EMPLOYEE_GRAL,
					idEmployeeFilesSystemPersonal: ID_EMPLOYEE_FILES_SYSTEM_PERSONAL
			}
			sendPostAction(EMPLOYEE_GRAL_CONTROLLER + 'viewEmployeeFilesSystemPersonal', model, respFilesSystemPersonal);
		} else {
			showDivMessage('Error en visualizar archivo', 'alert-danger', 4000);
		}
	}
	if(action == 'download') {
		// Descargar documento
		var model = {
				nameFile: NAME_FILE_DOWNLOAD,
				idUser: ID_EMPLOYEE_GRAL,
				idEmployeeFilesSystemPersonal: ID_EMPLOYEE_FILES_SYSTEM_PERSONAL
		}
		sendPostAction(EMPLOYEE_GRAL_CONTROLLER + 'viewEmployeeFilesSystemPersonal', model, respDownloadFilesSystemPersonal);
	}
}

function respFilesSystemPersonal(data) {
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

function respDownloadFilesSystemPersonal(data) {
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