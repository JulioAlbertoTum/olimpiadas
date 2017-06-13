(function(){
'use strict';

angular.module('olimpiadas')
.component('areaForm',{
	
	templateUrl:'src/area/area-form/area-form.html',
	bindings:{
		area: '=',
		create:'=',
		onSuper:'=',
		onCreateArea:'=',
		onUpdateArea:'=',

	},
	controller:function(){
		var $ctrl = this;

		$ctrl.createArea = function(){
			$ctrl.onCreateArea();
		}

		$ctrl.updateArea = function(){
			$ctrl.onUpdateArea();
		}

		$ctrl.super = function(){
			return $ctrl.onSuper();
		}
	}
	
})

})();