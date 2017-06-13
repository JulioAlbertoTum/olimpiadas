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
		//$ctrl.configTree();
		// console.log($ctrl.tree);
		// $("#area-menu").metisMenu();
		//$ctrl.titulo ="ganaderia";
		// $("#area-menu").click(function(){
		// 	alert("ganaderia");
		// })
		$timeout(function(){
			$ctrl.metis();
		});
	}

	$ctrl.makeAction = function(mySub){
		// console.log(mySub._id,mySub.name);
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