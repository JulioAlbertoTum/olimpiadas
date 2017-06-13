(function(){
'use strict';


angular.module('olimpiadas')
.controller('AreaController',AreaController);

AreaController.$inject = ['areas','AreaService'];
function AreaController(areas, AreaService){
	var $ctrl = this;

	$ctrl.titulo ="Area";
	$ctrl.descripcion = "Categorizacion de Pruebas";
	$ctrl.areas = areas
	//$ctrl.tree = AreaService.getTreeAreas();
	$ctrl.viewArea = false;
	$ctrl.current = {};
	$ctrl.new = {
		_id:"null",
		name:"",
		description:""
	};
	// $ctrl.titulo = "Areas";
	// $ctrl.super = $ctrl.getSuper();

	$ctrl.index  = 0;
	

	$ctrl.setCurrent = function(index){
		$ctrl.index = index;
		$ctrl.current =angular.copy($ctrl.areas[index]);
		$('#editarArea').modal();
	}

	$ctrl.setSave = function(){
		$ctrl.new = {
			
		};
		$('#crearArea').modal();
	}

	$ctrl.createArea = function(){
		// $ctrl.new._id="null";
		//console.log($ctrl.new);
		AreaService.saveArea($ctrl.new)
		.then(function(response){
			$ctrl.areas.push(response.data);
			$('#crearArea').modal('hide');	
			$ctrl.new = {};
			$ctrl.index = 0;
		});
		// $ctrl.tree.push($ctrl.new);
		// $ctrl.areas.push($ctrl.new);
		
	}

	$ctrl.updateArea = function(){

		AreaService.updateArea($ctrl.current)
		.then(function(response){
			$ctrl.areas[$ctrl.index] = response.data;
			$('#editarArea').modal('hide');
			$ctrl.current ={};
		});

		// AreaService.updateArea($ctrl.current);
		// // console.log(update,$ctrl.current);
		// $ctrl.current = {};
		// $('#editarArea').modal('hide');
	}

	$ctrl.viewArea = function(index){
		$ctrl.current = $ctrl.areas[index];
		$('#verArea').modal();
	}

	$ctrl.showDelete = function(index){
		// console.log("el area desde area controller");
		$ctrl.current = $ctrl.areas[index];
		$ctrl.index = index;
		$("#borrarArea").modal();
	}

	$ctrl.deleteArea  = function(){
		AreaService.deleteArea($ctrl.current._id)
		.then(function(response){
			$ctrl.areas.splice($ctrl.index,1)
			$('#borrarArea').modal('hide');	
		});
		// console.log("eliminamos el area");
		
	}

	$ctrl.getSuper = function(){
		var sup = [];
		for(var i=0; i<$ctrl.areas.length;i++){
			var area = $ctrl.areas[i];
			if(area.parent == null){
				sup.push(area);
			}
		}
		// console.log(sup);
		return sup;
	}

	// console.log($ctrl.super);
}

})();


