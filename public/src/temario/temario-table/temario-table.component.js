(function(){
'use strict';

angular.module('olimpiadas')
.component('temarioTable',{
	templateUrl:'src/temario/temario-table/temario-table.html',
	controller:TemarioTableController,
	bindings:{
		temario: '<',
		onView : '&',
		onEdit : '&',
		onDelete : '&',
		rol: '<'
	}

});


function TemarioTableController(){
	var $ctrl = this;

	$ctrl.view = function(myindex){
		
		$ctrl.onView({index:myindex});
	}

	$ctrl.edit = function(myindex){
		$ctrl.onEdit({index:myindex});
	}

	$ctrl.delete = function(myindex){
		$ctrl.onDelete({index:myindex});
	}

	$ctrl.isEmpty = function(){
			return $ctrl.temario.length == 0;
	}
}
})();