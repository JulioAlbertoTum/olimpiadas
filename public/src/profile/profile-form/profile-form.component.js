(function(){
'use strict';

angular.module('olimpiadas')
.component('profileForm', {
	templateUrl:'src/profile/profile-form/profile-form.html',
	controller:ProfileFormController,
	bindings:{
		user: '=',
		onUpdate: '&'
	}
});

function ProfileFormController(){
	var $ctrl = this;
	
	$ctrl.update = function(){
		$ctrl.onUpdate();
	}
}
})();