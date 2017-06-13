(function(){
'use strict';

angular.module('olimpiadas')
.component('areaDelete',{
	templateUrl: 'src/area/area-delete/area-delete.html',
	controller: AreaDeleteController,
	bindings:{
		area:'<',
		onDeleteArea: '='
	}
});

function AreaDeleteController(){
	var $ctrl = this;

	$ctrl.deleteArea = function(){
		$ctrl.onDeleteArea();
	}
}

})();