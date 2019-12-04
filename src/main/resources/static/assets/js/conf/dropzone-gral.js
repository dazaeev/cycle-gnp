var currentFile = null;
var nameImageDrop;
Dropzone.prototype.defaultOptions.dictFallbackText = "Utilice el siguiente formulario alternativo para cargar sus archivos como en los viejos tiempos.";
Dropzone.prototype.defaultOptions.dictFileTooBig = "El archivo es demasiado grande ({{tamaño de archivo}} MiB). Max tamaño de archivo: {{maxFilesize}} MiB.";
Dropzone.prototype.defaultOptions.dictInvalidFileType = "No puede cargar archivos de este tipo.";
Dropzone.prototype.defaultOptions.dictResponseError = "El servidor respondió con el código {{statusCode}}.";
Dropzone.prototype.defaultOptions.dictCancelUpload = "Cancelar carga";
Dropzone.prototype.defaultOptions.dictCancelUploadConfirmation = "¿Seguro que quieres cancelar esta carga?";
Dropzone.prototype.defaultOptions.dictRemoveFile = "Eliminar archivo";
Dropzone.prototype.defaultOptions.dictMaxFilesExceeded = "No puede cargar más archivos.";
Dropzone.prototype.submitRequest = function(xhr, formData, files) {
	nameImageDrop = files[0].name;
	DATA_FILE = files[0].dataURL;
	return xhr.send(formData);
};

var currentFileCdf = null;
Dropzone.options.uploadWidget = {
		paramName : 'file',
		maxFilesize : 5, // MB
		maxFiles : 1,
		headers : {
			'x-csrf-token' : document.querySelectorAll('meta[name=csrf-token]')[0].getAttributeNode('content').value,
		},
		acceptedFiles: '.jpg, .xml, .xsd, .txt',
		init : function() {
			this.on('success', function(file, resp) {
				console.log(file);
				console.log(resp);
				sessionStorage.setItem("params-name-cfd", file.name);
			});
			this.on("addedfile", function(file) {
				if (currentFileCdf) {
					this.removeFile(currentFileCdf);
				}
				currentFileCdf = file;
			});
			this.on('error', function(file, response) {
				console.log(response.message);
				showDivMessage('Error: ' + response.message, 'alert-danger', 8000);
			});
		}
};