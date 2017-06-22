(function(){
'use strict';

angular.module('olimpiadas')
.controller('HomeController', HomeController);

HomeController.$inject = ['$auth','$location','SessionService'];
function HomeController($auth,$location,SessionService){
	var $ctrl = this;
	$ctrl.user = SessionService.getUser();
	$ctrl.titulo ="Home";
	$ctrl.descripcion ="Bienvenido "+$ctrl.user.username+"";

	$ctrl.logoutUser = function(){
		SessionService.logout();
	}
}

})();