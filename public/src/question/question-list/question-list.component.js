(function(){
'use strict';

angular.module('olimpiadas')
.component('questionList',{
	templateUrl:'src/question/question-list/question-list.html',
	controller:QuestionListController,
	bindings:{
		questions: '=',
		onSet: '&'
	}
});


function QuestionListController(){
	var $ctrl = this;

	$ctrl.setCurrent = function(myIndex){
		$ctrl.onSet({index:myIndex});
	}

}
})();