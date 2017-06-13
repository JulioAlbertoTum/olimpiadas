(function(){
'use strict';

angular.module('olimpiadas')
.component('temarioDelete',{
	templateUrl:'src/temario/temario-delete/temario-delete.html',
	controller: TemarioDeleteController,
	bindings:{
		tema: '=',
		onDestroy:'&'
	}
});

function TemarioDeleteController(){
	var $ctrl = this;

	$ctrl.delete = function(){
		$ctrl.onDestroy()
	}
}
})();