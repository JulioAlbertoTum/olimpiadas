(function(){
'use strict';

angular.module('olimpiadas')
.component('areaTreeview',{
	templateUrl:'src/area/area-treeview/area-treeview.html',
	controller:AreaTreeviewController,
	bindings:{
		onAreas: '=',
		onAction: '&',
		onMenu: '&'
	}
});

function AreaTreeviewController($timeout){
	var $ctrl = this;
	$ctrl.titulo = "Inorganica";
	$ctrl.$onInit = function(){
		$timeout(function(){
			$ctrl.metis();
		});
	}

	$ctrl.makeAction = function(mySub){
		$ctrl.onAction({id:mySub._id, name:mySub.name});
	}

	$ctrl.$postLink = function(){
		$timeout(function(){
			$ctrl.metis();
		});	
	}

	$ctrl.areas = function(){
		return $ctrl.onAreas();
	}

	$ctrl.metis = function(){
		$('#area-menu').metisMenu('dispose'); //For stop and destroy metisMenu
		$('#area-menu').metisMenu();
	}
	
	$ctrl.menu = function(myIndex){
		$ctrl.onMenu({index:myIndex});
	}
}
})();