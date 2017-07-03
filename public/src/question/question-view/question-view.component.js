(function(){
'use strict';

angular.module('olimpiadas')
.component('questionView',{
	templateUrl:"src/question/question-view/question-view.html",
	controller:QuestionViewController,
	bindings:{
		question: '<',
		status: '<',
	}
});

function QuestionViewController(){
	var $ctrl = this;

	$ctrl.isPreview = function(){
		return $ctrl.status == "preview";
	}

	$ctrl.isMultiResp = function(){
		var nroSol = 0,
		res = true;
		for(var option in $ctrl.question.options){
			if($ctrl.question.options[option].isCorrect == true){

				nroSol++
			}

		}
		if(nroSol == 1)
			res = false;

		return res; 
	}
}
})();