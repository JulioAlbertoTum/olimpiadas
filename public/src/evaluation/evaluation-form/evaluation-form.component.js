(function(){
'use strict';

angular.module('olimpiadas')
.component('evaluationForm',{
	templateUrl:'src/evaluation/evaluation-form/evaluation-form.html',
	controller: EvaluationFormController,
	bindings:{
		evaluation: '='
	}
});


function EvaluationFormController(){
	var $ctrl = this;
	$ctrl.evaluation = null;
}


})();