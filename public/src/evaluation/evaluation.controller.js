(function(){
'use strict';

angular.module('olimpiadas')
.controller('EvaluationController',EvaluationController);

EvaluationController.$inject = ['AreaService','areas','evaluations','TemarioService','QuestionService','$alert','EvaluationService','$timeout'];
function EvaluationController(AreaService,areas,evaluations,TemarioService,QuestionService,$alert,EvaluationService,$timeout){
	var $ctrl = this;

	$ctrl.titulo = "Evaluaciones";
	$ctrl.descripcion = "generacion de pruebas";
	$ctrl.gato = 24;
	$ctrl.index_area = null;
	$ctrl.current_area = null;
	$ctrl.current_subarea = null;
	$ctrl.temario = null;
	$ctrl.tema = null;
	$ctrl.questions = null;
	$ctrl.dataEval = null;
	$ctrl.evaluation = null;
	$ctrl.evaluations = evaluations;
	$ctrl.previewEvaluation = false;
	$ctrl.areas = AreaService.getTreeAreas(areas);
	$ctrl.flagEdit = false;
	$ctrl.flagupdate = false;
	$ctrl.nameLevel = {'primero':'Primero de Secundaria',
					   'segundo':'Segundo de Secundaria',
					   'tercero':'Primero de Secundaria',
					   'cuarto':'Primero de Secundaria',
					   'quinto':'Primero de Secundaria',
					   'sexto':'Primero de Secundaria',
				};
	$ctrl.nameStage = {'first':'Primera',
					   'second':'Segunda',
					   'third':'Tercera',
					   'fourth':'Cuarta'
				};
				
	$ctrl.$onInit = function(){
		$timeout(function(){
			// $("#date_start").datetimepicker();

		});
	}


	$ctrl.setArea = function(){
		$ctrl.current_area = $ctrl.areas[$ctrl.index_area];
		$ctrl.current_subarea = null;
		$ctrl.temario = null;
		$ctrl.tema = null;
		$ctrl.questions = null;
	}

	$ctrl.setSubarea = function(){
		if($ctrl.current_subarea != null){
			TemarioService.getTemario($ctrl.current_subarea)
			.then(function(response){
				$ctrl.temario = response;	
			});
			console.log($ctrl.temario);
		}
	}

	$ctrl.setTema = function(){
		if($ctrl.tema != null){
			QuestionService.getQuestionsForTema($ctrl.tema)
			.then(function(response){
				
				$ctrl.questions = response;
			});

			
		}
	}

	$ctrl.addEvaluation = function(index){
		if(!$ctrl.evaluation){
			$ctrl.evaluation = [];
		}

		var selected = $ctrl.questions[index];
		if($ctrl.notRepeatQuestion(selected._id)){
			$ctrl.evaluation.push(selected);
			$("#button_"+selected._id).prop('disabled',true);	
		}
		
	}

	$ctrl.notRepeatQuestion = function(id){
		var res = true;
		for(var i=0; i<$ctrl.evaluation.length; i++){
			var question = $ctrl.evaluation[i];
			if(id == question._id){
				res = false
				break;
			}
		}
		return res;
	}

	$ctrl.removeEvaluation = function(index){

		if($ctrl.evaluation.length == 0){
			$ctrl.evaluation = null;
		}
		var index_selected = $ctrl.evaluation[index]._id;
		$("#button_"+index_selected).prop('disabled',false);
		$ctrl.evaluation.splice(index,1);
	}

	$ctrl.clearEvaluation = function(){
		$ctrl.evaluation = null;
	}

	$ctrl.togglePreview  = function(){
		if($ctrl.previewEvaluation){
			$ctrl.previewEvaluation = false;
		}else{
			$ctrl.previewEvaluation = true;
		}
		
	}


	$ctrl.saveEvaluation = function(){
		EvaluationService.saveEvaluation($ctrl.dataEval)
		.then(function(response){
			console.log(response.data);
			$ctrl.dataEval = response.data;
			var myAlert = $alert({ container:'.messages',
								title: 'La evaluacion se ha creado correctamente', 
								type: 'success-custom', 
								show: true,
								duration:3});
			$ctrl.evaluations.push(response.data);
		})
	}

	$ctrl.updateEvaluation = function(){
		EvaluationService.updateEvaluation($ctrl.dataEval)
		.then(function(response){
			// console.log(response.data);
			$ctrl.dataEval = response.data;
			var myAlert = $alert({ container:'.messages',
								title: 'La evaluacion se ha actualizado correctamente', 
								type: 'success-custom', 
								show: true,
								duration:3});
			// $ctrl.flagupdate = false;
			$ctrl.evaluations[$ctrl.index] = response.data;
			$ctrl.index = null;
		})
	}

	$ctrl.view = function(index){
		$ctrl.evaluationPreview = $ctrl.evaluations[index];
		EvaluationService.getEvaluation($ctrl.evaluationPreview._id)
		.then(function(response){
			console.log(response);
			$ctrl.evaluationPreview = angular.copy(response);
			$ctrl.evaluationPreview.date_start = new Date($ctrl.evaluationPreview.date_start);
			$ctrl.evaluationPreview.hour_start = new Date($ctrl.evaluationPreview.hour_start);
			$ctrl.evaluationPreview.hour_end = new Date($ctrl.evaluationPreview.hour_end);
			$ctrl.questionPreview = $ctrl.evaluationPreview.questions;
			// $ctrl.flagEdit = true;
			// $ctrl.flagupdate = true;
			$ctrl.index = index;
			$("#verEvaluacion").modal();
		})

	}

	$ctrl.create = function(){
		$ctrl.dataEval = {
			date_start : new Date(),
			hour_start :new Date(2017,3,12),
			hour_end: new Date(2017,3,12)
		};
		$ctrl.evaluation = [];
		$ctrl.flagEdit = true;
		$ctrl.flagupdate = false;
	}

	$ctrl.edit =function (index){
		$ctrl.dataEval = $ctrl.evaluations[index];
		EvaluationService.getEvaluation($ctrl.dataEval._id)
		.then(function(response){
			console.log(response);
			$ctrl.dataEval = angular.copy(response);
			$ctrl.dataEval.date_start = new Date($ctrl.dataEval.date_start);
			$ctrl.dataEval.hour_start = new Date($ctrl.dataEval.hour_start);
			$ctrl.dataEval.hour_end = new Date($ctrl.dataEval.hour_end);
			$ctrl.evaluation = $ctrl.dataEval.questions;
			$ctrl.flagEdit = true;
			$ctrl.flagupdate = true;
			$ctrl.index = index;
		})
		
	}


	$ctrl.delete = function(index){
		$ctrl.evalDelete = $ctrl.evaluations[index];
		$ctrl.index = index;
		$("#deleteEvaluation").modal();
	}

	$ctrl.destroy =function (index){
		EvaluationService.deleteEvaluation($ctrl.evalDelete._id)
		.then(function(response){
			$ctrl.evaluations.splice($ctrl.index,1);
				var myAlert = $alert({ container:'.messages',
								title: 'La evaluacion se ha eliminado', 
								type: 'success-custom', 
								show: true,
								duration:3});
				$ctrl.index = null;
				$ctrl.evalDelete = null;
				$("#deleteEvaluation").modal('hide');
		});
	}

	$ctrl.saveQuestions =function(){
		EvaluationService.saveQuestions($ctrl.dataEval._id, {questions: $ctrl.evaluation})
		.then(function(response){
			$ctrl.flagEdit = false;
		});
	}

	$ctrl.backTable = function(){
		$ctrl.flagEdit = false;
		$ctrl.dataEval = null;
	}


}

})();