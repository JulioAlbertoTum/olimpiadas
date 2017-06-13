(function(){
'use strict';

angular.module('olimpiadas')
.controller('HomeController', HomeController);

function HomeController(){
	var $ctrl = this;
	$ctrl.titulo ="Home";
	$ctrl.descripcion ="Esta es la pagina principal";

	$ctrl.verLogin = function(){
		console.log("gatos en la oscuridad");
		$('#verLogin').modal();
	}
}

})();