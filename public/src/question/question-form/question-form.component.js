(function(){
'use strict';

angular.module('olimpiadas')
.component('questionForm',{
	templateUrl:'src/question/question-form/question-form.html',
	controller:QuestionFormController,
	bindings:{
		question:'=',
		status: '<',
		onSave: '&',
		onUpdate:'&',
		onDeleteOp:'&'
	}
});

function QuestionFormController(){
	var $ctrl = this;

	$ctrl.isViewed = function(){
		return $ctrl.status == 'viewed';
	}

	$ctrl.isCreatable = function(){
		return $ctrl.status == 'creatable';
	}

	$ctrl.isEditable = function(){
		return $ctrl.status == 'editable';
	}

	$ctrl.save = function(){
		$ctrl.onSave();
	}

	$ctrl.update = function(){
		$ctrl.onUpdate();
	}

	$ctrl.newOption = function(){
		$ctrl.question.options.push({isCorrect:false});
	}

	$ctrl.deleteOption = function(index){
		// console.log(index)
		// $ctrl.question.options.splice(index,1);
		$ctrl.onDeleteOp({pos:index});
	}
}

})();