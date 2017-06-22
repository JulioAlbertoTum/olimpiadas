(function(){
'use strict';

angular.module('olimpiadas')
.controller('UserController',UserController);

function UserController(){
	var $ctrl = this;
	$ctrl.titulo = "Usuarios del sistema";
}	
})();