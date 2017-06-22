(function(){
'use strict';

angular.module('olimpiadas')
.component('register',{
	templateUrl : 'src/default/register/register.html',
	controller: RegisterController,
	bindings:{
		onRegister:'&'
	}
});

function RegisterController(){
	var $ctrl = this;
	$ctrl.user ={
		rol: 'estudiante'
	}
	$ctrl.register = function(){
		$ctrl.onRegister({user:$ctrl.user});
	}
}	
})();