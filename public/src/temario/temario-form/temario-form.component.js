(function(){
'use strict';

angular.module('olimpiadas')
.component('temarioForm',{
	templateUrl:'src/temario/temario-form/temario-form.html',
	controller: TemarioFormController,
	bindings:{
		tema:"<",
		created:"<",
		onCreate:"&",
		onUpdate:"&"
	}
});

function TemarioFormController(){
	var $ctrl = this;

	$ctrl.create = function(){
		$ctrl.onCreate();
	}

	$ctrl.update = function(){
		$ctrl.onUpdate();
	}
}
})();