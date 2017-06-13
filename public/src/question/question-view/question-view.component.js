(function(){
'use strict';

angular.module('olimpiadas')
.component('questionView',{
	templateUrl:"src/question/question-view/question-view.html",
	controller:QuestionViewController,
	bindings:{
		question: '<',
		status: '<'
	}
});

function QuestionViewController(){
	var $ctrl = this;

	$ctrl.isPreview = function(){
		return $ctrl.status == "preview";
	}
}
})();