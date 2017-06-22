(function(){
'use strict';

angular.module('olimpiadas')
.component('login',{
	templateUrl:'src/default/login/login.html',
	controller: LoginController,
	bindings:{
		onLogin: '&'
	}
});

function LoginController(){
	var $ctrl = this;
	
	$ctrl.login = function(){
		$ctrl.onLogin({credentials:$ctrl.credentials});
	}
}
})();