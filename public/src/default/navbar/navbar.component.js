(function(){
'use strict';

angular.module('olimpiadas')
.component('navbar',{
	templateUrl:'src/default/navbar/navbar.html',
	controller : NavbarController,
	bindings:{
		onView :'&',
		onRegister:'&'
	}
});

function NavbarController(){
	var $ctrl = this;

	$ctrl.viewLogin = function(){
		$ctrl.onView();
	}

	$ctrl.viewRegister = function(){
		$ctrl.onRegister();
	}
}

})();