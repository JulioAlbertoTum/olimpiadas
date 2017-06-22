(function(){
'use strict';


angular.module('olimpiadas')
.controller('AreaController',AreaController);

AreaController.$inject = ['areas','AreaService','SessionService','$alert'];
function AreaController(areas, AreaService, SessionService, $alert){
	var $ctrl = this;

	$ctrl.titulo ="Area";
	$ctrl.descripcion = "Categorizacion de Pruebas";
	$ctrl.areas = areas;
	$ctrl.rol = SessionService.getRol();
	$ctrl.treeArea = AreaService.getTreeAreas($ctrl.areas);
	$ctrl.viewArea = false;
	$ctrl.current = {};
	$ctrl.new = {
		_id:"null",
		name:"",
		description:""
	};

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
			var myAlert = $alert({ container:'.messages',
								title: 'El area se ha creado exitosamente.', 
								// content: 'Los datos han sido actualizados', 
								// placement: 'top', 
							
								type: 'success-custom', 
								show: true,
								duration:3});
		});
		
	}

	$ctrl.updateArea = function(){

		AreaService.updateArea($ctrl.current)
		.then(function(response){
			$ctrl.areas[$ctrl.index] = response.data;
			$('#editarArea').modal('hide');
			$ctrl.current ={};
			var myAlert = $alert({ container:'.messages',
								title: 'Los datos se han actualizado.', 
								// content: 'Los datos han sido actualizados', 
								// placement: 'top', 
							
								type: 'success-custom', 
								show: true,
								duration:3});
		});
	}

	$ctrl.viewArea = function(index){
		$ctrl.current = $ctrl.areas[index];
		$('#verArea').modal();
	}

	$ctrl.showDelete = function(index){
		$ctrl.current = $ctrl.areas[index];
		$ctrl.index = index;
		$("#borrarArea").modal();
	}

	$ctrl.deleteArea  = function(){
		AreaService.deleteArea($ctrl.current._id)
		.then(function(response){
			$ctrl.areas.splice($ctrl.index,1)
			$('#borrarArea').modal('hide');
			var myAlert = $alert({ container:'.messages',
								title: 'El area ha sido eliminada.', 
								// content: 'Los datos han sido actualizados', 
								// placement: 'top', 
							
								type: 'info-custom', 
								show: true,
								duration:3});	
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

	$ctrl.getSubarea



	// console.log($ctrl.super);
}

})();


