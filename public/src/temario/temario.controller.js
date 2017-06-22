(function(){
'use strict';

angular.module('olimpiadas')
.controller('TemarioController',TemarioController);

TemarioController.$inject = ['areas','temario','TemarioService','SessionService'];
function TemarioController(areas,temario,TemarioService,SessionService){
	var $ctrl = this;

	$ctrl.titulo = "Temario";
	$ctrl.descripcion = "Detalles de Evaluacion";

	$ctrl.tree = areas;
	$ctrl.currentArea = null;
	$ctrl.rol = SessionService.getRol();
	$ctrl.temario = temario;
	$ctrl.current = null;
	$ctrl.currentTemaId = null;
	$ctrl.getTree = function(){
		var superareas = [];
		var subareas = [];
		for(var i=0; i<areas.length; i++){
			if(areas[i].parent == null){
				superareas.push(areas[i]);
				// superareas.subareas = [];
			}else{
				subareas.push(areas[i]);
			}
		}
		
		for(var i=0; i<superareas.length; i++){
			var superu = superareas[i];
			superu.subareas = [];
			for(var j=0; j<subareas.length; j++){
				var sub = subareas[j];
				if(sub.parent.toString() == superu._id.toString()){
					// console.log(superu.name,sub.name);
					// console.log(superu.subareas);
					superu.subareas.push(sub);
				}
			}
		}

		// console.log("superareas",superareas)
		return superareas;
	}

	$ctrl.viewTemas = function(id, name){
	
		TemarioService.getTemario(id)
		.then(function(response){
			$ctrl.temario = response;
			$ctrl.currentTemaId = id;
			$ctrl.currentArea = name;
		})
		
	}

	$ctrl.viewTema = function(index){

		// console.log(index);
		$ctrl.current = $ctrl.temario[index];
		$("#verTema").modal();
		
	};

	$ctrl.setCurrent = function(index){

		$ctrl.current = $ctrl.temario[index];
	}

	$ctrl.createTema = function(tema){
		$ctrl.current ={};
		$("#crearTema").modal();
	}

	$ctrl.editTema = function(index){
		$ctrl.index = index;
		$ctrl.current = angular.copy($ctrl.temario[index]);
		$("#editarTema").modal();
	}

	$ctrl.saveTema = function(){
		$ctrl.current.subarea = $ctrl.currentTemaId;
		TemarioService.saveTema($ctrl.current)
		.then(function(response){			
			$ctrl.temario.push(response.data);
			$("#crearTema").modal('hide');
			$ctrl.current = null;

		});
	}

	$ctrl.updateTema = function(){
		TemarioService.updateTema($ctrl.current)
		.then(function(response){
			$ctrl.temario[$ctrl.index] = response.data;
			$ctrl.current = null;
			$ctrl.index = null;
			$("#editarTema").modal('hide');
		});
	}

	$ctrl.deleteTema = function(index){
		$ctrl.index = index;
		$ctrl.current = $ctrl.temario[index];
		$("#borrarTema").modal();
	}

	$ctrl.destroyTema = function(){
		TemarioService.deleteTema($ctrl.current._id)
		.then(function(response){
			$ctrl.temario.splice($ctrl.index,1);
			$ctrl.index = null;
			$ctrl.current = null;
			$("#borrarTema").modal("hide");
		});
	}



}

})();