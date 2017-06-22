(function(){
'use strict';

angular.module('olimpiadas')
.controller('QuestionController',QuestionController);


QuestionController.$inject =['questions','$stateParams','QuestionService','$alert'];
function QuestionController(questions,$stateParams,QuestionService,$alert){
	var $ctrl = this;

	$ctrl.titulo = "Preguntas";
	$ctrl.descripcion = "Preguntas generadas para el area";
	
	$ctrl.temaId  = $stateParams.temaId;
	$ctrl.questions = questions;
	$ctrl.current = null;
	$ctrl.status = '';
	$ctrl.index = -1;

	$ctrl.isEmpty = function(){
		return $ctrl.questions.length == 0
	}

	$ctrl.setCurrentQuestion = function(index){
		
		QuestionService.getQuestion($ctrl.questions[index]._id)
		.then(function(response){
			$ctrl.index = index;
			$ctrl.status = 'viewed';
			$ctrl.questions[index] = response.data;
			$ctrl.current = $ctrl.questions[index];
		});
	}

	$ctrl.previewQuestion = function(){
		$ctrl.status = 'preview'		
	}

	$ctrl.createQuestion =function(){
		$ctrl.current = {type_question:'simple',tema:$ctrl.temaId, options:[]};
		// alert("se crea una pregunta");
		$ctrl.status='creatable';
	}

	$ctrl.saveQuestion = function(){
		QuestionService.saveQuestion($ctrl.current)
		.then(function(response){
			$ctrl.questions.push(response.data);
			$ctrl.current = null;
			$ctrl.status = '';
			$ctrl.index = -1;
			var myAlert = $alert({ container:'.messages',
								title: 'La pregunta se ha creado exitosamente.', 
								// content: 'Los datos han sido actualizados', 
								// placement: 'top', 
								templateUrl:'src/common/alert/alert.html',
								type: 'success-custom', 
								show: true,
								duration:3});

		});
	}

	$ctrl.editQuestion = function(){
		$ctrl.current = angular.copy($ctrl.current);
		$ctrl.status = 'editable';
	}

	$ctrl.updateQuestion = function(){
		// var id = $ctrl.current._id;
		QuestionService.updateQuestion($ctrl.current)
		.then(function(response){
			$ctrl.questions[$ctrl.index] = response.data;
			$ctrl.current = null;
			$ctrl.status = '';
			$ctrl.index = -1;
			var myAlert = $alert({ container:'.messages',
								title: 'La pregunta se ha actualizado exitosamente.', 
								// content: 'Los datos han sido actualizados', 
								// placement: 'top', 
								templateUrl:'src/common/alert/alert.html',
								type: 'success-custom', 
								show: true,
								duration:3});
		});
	}

	$ctrl.destroyQuestion = function(){
		var id = $ctrl.questions[$ctrl.index]._id;
		QuestionService.deleteQuestion(id)
		.then(function(response){
			$ctrl.questions.splice($ctrl.index,1);
			$ctrl.current = null;
			$ctrl.status = '';
			$ctrl.index = -1;
			$("#borrarPregunta").modal('hide');
			var myAlert = $alert({ container:'.messages',
								title: 'La pregunta se ha eliminado exitosamente.', 
								// content: 'Los datos han sido actualizados', 
								// placement: 'top', 
							
								type: 'info-custom', 
								show: true,
								duration:3});
		});
	}

	$ctrl.deleteQuestion = function(){
		$('#borrarPregunta').modal();
	}

	$ctrl.deleteOption = function(pos){
		
		if($ctrl.current.options[pos]._id){
			QuestionService.deleteOption($ctrl.current._id, $ctrl.current.options[pos]._id)
			.then(function(response){
				$ctrl.current.options.splice(pos,1);
			})
		}else{
			$ctrl.current.options.splice(pos,1);
		}
		
	}

	$ctrl.isMultiResp = function(){
		var nroSol = 0,
		res = true;
		for(var option in $ctrl.current.options){
			if($ctrl.current.options[option].isCorrect == true){

				nroSol++
			}

		}
		console.log(nroSol);
		if(nroSol == 1)
			res = false;

		return res; 
	}
}
})();