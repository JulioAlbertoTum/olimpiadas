(function(){
'use strict';

angular.module('olimpiadas')
.controller('DefaultController',DefaultController);

DefaultController.$inject = ['$auth','$location','SessionService'];
function DefaultController($auth,$location,SessionService){
	var $ctrl = this;
	
	// if(localStorageService.isSupported){
	// 	$ctrl.titulo = "Bienvenido a la aplicacion de Evaluaciones soportan localStorage";	
	// 	// localStorageService.set("session",{username:'gato',email:"gato@gmail.com"});
	// 	alert(localStorageService.get("session").username);
	// }
	
	$ctrl.viewLogin = function(){
		$('#viewLogin').modal();
	}

	$ctrl.viewRegister = function(){
		$('#viewRegister').modal();
	}

	$ctrl.registerUser = function(user){
		$('#viewRegister').modal('hide');
		SessionService.signup(user);

	}

	$ctrl.loginUser = function(credentials){
		$('#viewLogin').modal('hide');
		SessionService.login(credentials);
	}
}

})();