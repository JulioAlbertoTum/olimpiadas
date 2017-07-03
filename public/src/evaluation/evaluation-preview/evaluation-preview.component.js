(function(){
'use strict';

angular.module('olimpiadas')
.component('evaluationPreview',{
	templateUrl:'src/evaluation/evaluation-preview/evaluation-preview.html',
	controller: EvaluationPreviewController,
	bindings:{
		data :'=',
		evaluation : '=',
		namelevel : '=',
		namestage :' ='
	}
});

function EvaluationPreviewController(){
	var $ctrl = this;
}

})();