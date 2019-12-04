/*
 * @autor Nazario Dazaeev Gonzalez Herrera
 * Controller 
 * Pagina de control "file"
 */
var DATA_FILE = "";
Dropzone.prototype.defaultOptions.dictDefaultMessage = "Arrastre ...";

// Variables Globales

// Cargando sistema
$(document).ready(function($) {
	startingSystemMenu('home');
	//
	$('#btn-cancel-file').on('click', function () {
		DATA_FILE = [];
		cleanForm();
	});
	//
	$('#btn-save-file').on('click', function () {
        console.log('Guardar Archivo\'s');
    });
	//
	$('#input-id-0').fileinput({
		uploadUrl: "/adm/company/fileInsFile/" + sessionStorage.getItem('email-format') + "/e/0",
		minFileCount: 1,
        theme: 'fa',
        showCancel: false,
        showUpload: true,
        showCaption: false,
        uploadAsync: false,
        browseClass: "btn btn-primary btn-lg",
        fileType: "any",
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
        overwriteInitial: false,
        initialPreviewAsData: true
    }).on('filebatchuploadsuccess', function(event, data) {
		successSend(data, null);
    }).on('fileuploaded', function(event, data, previewId, index) {
    	successSend(data, index);
	});
	$('#input-id-1').fileinput({
		uploadUrl: "/adm/company/fileInsFile/" + sessionStorage.getItem('email-format') + "/e/1",
		minFileCount: 1,
        theme: 'fa',
        showCancel: false,
        showUpload: true,
        showCaption: false,
        uploadAsync: false,
        browseClass: "btn btn-primary btn-lg",
        fileType: "any",
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
        overwriteInitial: false,
        initialPreviewAsData: true
    }).on('filebatchuploadsuccess', function(event, data) {
    	successSend(data, null);
	}).on('fileuploaded', function(event, data, previewId, index) {
		successSend(data, index);
	});
	// Por default
	downloadZip();
	//
	$("#downloadZip").change(function() {
		downloadZip();
	});
	$("#sendChanel").change(function() {
		sendChanel();
	});
});

function downloadZip() {
	$('#lblTitle').text('Encriptar archivo\'s (descarga)');
	$('#fileLoading-e').css('display', 'none');
	$('#fileLoading-d').css('display', 'block');
}

function sendChanel() {
	$('#lblTitle').text('Encriptar archivo\'s (envío)');
	$('#fileLoading-e').css('display', 'block');
	$('#fileLoading-d').css('display', 'none');
}

function successSend(data, index) {
	var files = data.files;
	var nameFiles = '</br>';
	if(index) {
		nameFiles = nameFiles + files[index].name + '</br>';
	} else {
		for (i = 0; i < files.length; i++) { 
			nameFiles = nameFiles + files[i].name + '</br>';
		}
	}
	var response = data.response;
	// Descarga
	if(response.status == 'Ok') {
		if(response.type == '0') {
			// Descargar
			showDivMessage("<strong>Archivo's cargado's:</strong> " + nameFiles + "<strong>Estatus de envio: Correcto</strong>", 'alert-info', 10000);
			var dataUri = response.base64Document;
			var link = document.createElement("a");
			link.setAttribute("target","_blank");
			link.setAttribute("href",dataUri);
			link.setAttribute("download","Encrypt-" + response.company + getExtention('application/zip'));
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
		if(response.type == '1') {
			showDivMessage("<strong>Archivo's enviado's:</strong> " + nameFiles + "<strong>Estatus de envio: Correcto</strong>", 'alert-info', 10000);
		}
	} else {
		showDivMessage("<strong>Archivo's cargado's:</strong> " + nameFiles + "<strong>Estatus de envio: </strong>" + response.error, 'alert-danger', 10000);
	}
}

function cleanForm() {
	window.location = '/encrypt';
}