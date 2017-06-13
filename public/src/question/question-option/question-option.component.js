(function(){
'use strict';

angular.module('olimpiadas')
.component('questionOption',{
	templateUrl:'src/question/question-option/question-option.html',
	controller:QuestionOptionController,
	bindings:{
		option:'=',
		index:'=',
		status: '<',
		onDelete:'&'
	}
});

function QuestionOptionController(){
	var $ctrl = this;

	$ctrl.delete = function(){
		// console.log($ctrl.index)
		$ctrl.onDelete({index:$ctrl.index});
		
	}

	$ctrl.isViewed = function(){
		return $ctrl.status == 'viewed';
	}

}

})();