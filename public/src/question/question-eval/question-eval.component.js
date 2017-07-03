(function(){
'use strict';

angular.module('olimpiadas')
.component('questionEval',{
	templateUrl:'src/question/question-eval/question-eval.html',
	controller: QuestionEvalController,
	bindings:{
		question: '=',
		order: '='
	}
});

function QuestionEvalController(){
	var $ctrl = this;
}

})()