(function(){
'use strict';

angular.module('olimpiadas')
.component('navMain',{
	templateUrl:'src/home/nav-main/nav-main.html',
	controller : NavMainController,
	bindings:{
		onLogout:'&'
	}
});

NavMainController.$inject = ['SessionService']
function NavMainController(SessionService){
	var $ctrl = this;
	$ctrl.username = SessionService.getUser.username;
	$ctrl.email = SessionService.getUser().email;
	// $ctrl.viewLogin = function(){
	// 	$ctrl.onView();
	// }

	// $ctrl.viewRegister = function(){
	// 	$ctrl.onRegister();
	// }

	$ctrl.logout = function(){
		
		$ctrl.onLogout();
	}
}

})();