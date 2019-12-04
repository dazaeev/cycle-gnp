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
        //
    });
	//
	$("#input-id").fileinput({
		uploadUrl: "/adm/company/fileInsFile/" + sessionStorage.getItem('email-format') + "/d/0",
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
    });
	$('#input-id').on('filebatchuploadsuccess', function(event, data) {
		var files = data.files;
		var nameFiles = '</br>';
		for (i = 0; i < files.length; i++) { 
			nameFiles = nameFiles + files[i].name + '</br>';
		}
		var response = data.response;
		// Descarga
		if(response.status == 'Ok') {
			showDivMessage("<strong>Archivo's cargado's:</strong> " + nameFiles + "<strong>Estatus de envio: Correcto</strong>", 'alert-info', 10000);
			var dataUri = response.base64Document;
			var link = document.createElement("a");
			link.setAttribute("target","_blank");
			link.setAttribute("href",dataUri);
			link.setAttribute("download","Decrypt-" + response.company + getExtention('application/zip'));
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} else {
			showDivMessage("<strong>Archivo's cargado's:</strong> " + nameFiles + "<strong>Estatus de envio: </strong>" + response.error, 'alert-danger', 10000);
		}
	});
});

function cleanForm() {
	window.location = '/decrypt';
}