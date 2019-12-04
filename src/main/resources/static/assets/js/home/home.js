/*
 * @autor Nazario Dazaeev Gonzalez Herrera
 * @autor Brian César Rodríguez Castro
 * Controller 
 * Pagina de inicio
 */

// Cargando sistema
jQuery(document).ready(function(jQuery) {
	startingSystemMenu('home');
	//
	$('a[href="#yammer"]').click(function(){
		$("#contentHome").empty();
		//
		viewContent('Yammer');
		//
		yam.connect.embedFeed({ 
			container: '#contentHome',
			network: 'www.yammer.com/buromc.com', // network permalink (see below)
			"config": {
				"use_sso": false,
			    "header": true,
			    "footer": true,
			    "showOpenGraphPreview": false,
			    "defaultToCanonical": false,
			    "hideNetworkName": true,
			    "theme": "dark"
			}
		});
	});
	//
	$('a[href="#record"]').click(function(){
		$("#contentHome").empty();
		//
		viewContent('Recorrido');
		//
		var viewDoc = '<object style="width: 100%;height: 500px;" class="w100" data="' + 'https://sway.office.com/s/yu7c89bVoodCGDa1/embed' + '"></object>';
	    $("#contentHome").append(viewDoc);
	});
	//
	$('a[href="#powerbi"]').click(function(){
		$("#contentHome").empty();
		//
		viewContent('Tablero');
		//
		var viewDoc = '<object style="width: 100%;height: 700px;" data="' + 'https://app.powerbi.com/view?r=eyJrIjoiOGQ2ODA0ZDEtNmM2Ni00ODE2LThjNzItMTU3ZmZkNDkwZjBlIiwidCI6IjA5ZmMyNTJmLWI3ODktNDkwOS04ODNiLTUzMzJkY2FhOTk0OSIsImMiOjR9' + '"></object>';
		$("#contentHome").css("height", "700px");
		$("#contentHome").append(viewDoc);
	});
});

function viewContent(message) {
	$('#content-dashboard').css('display', 'block');
	$('#main-content').css('display', 'none');
	$('#title-image').text(message);
}