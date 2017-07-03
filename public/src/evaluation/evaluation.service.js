(function(){
'use strict';

angular.module('olimpiadas')
.service('EvaluationService',EvaluationService);


EvaluationService.$inject = ['$http','ApiPath'];

function EvaluationService($http, ApiPath){
	var service = this;

	service.getEvaluations = function(){
		return $http.get(ApiPath+'/evaluations').then(function(response){
			return response.data;
		});
	}

	service.getEvaluation = function(id){
		return $http.get(ApiPath+'/evaluation/'+id).then(function(response){
			return response.data;
		});
	}

	service.saveEvaluation = function(evaluation){
		return $http.post(ApiPath+'/evaluations',$.param(evaluation),{
			headers : {
        		'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    		}
		});
	}

	service.updateEvaluation = function(evaluation){
		return $http.put(ApiPath+'/evaluation/'+evaluation._id, $.param(evaluation),{
			headers : {
        		'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    		}
		})
	}

	service.deleteEvaluation = function(id){
		return $http.delete(ApiPath+'/evaluation/'+id);
	}

	service.saveQuestions = function(id,questions){
		return $http.put(ApiPath+'/evaluation/'+id+'/questions', $.param(questions),{
			headers : {
        		'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    		}
		})
	}



}

})();