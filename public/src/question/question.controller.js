(function(){
'use strict';

angular.module('olimpiadas')
.controller('QuestionController',QuestionController);


QuestionController.$inject =['questions','$stateParams','QuestionService'];
function QuestionController(questions,$stateParams,QuestionService){
	var $ctrl = this;

	$ctrl.titulo = "Preguntas";
	$ctrl.descripcion = "Preguntas generadas para el area";
	
	$ctrl.temaId  = $stateParams.temaId;
	$ctrl.questions = questions;
	$ctrl.current = null;
	$ctrl.status = '';
	$ctrl.index = -1;

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
}
})();