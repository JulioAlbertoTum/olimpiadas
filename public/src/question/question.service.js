(function(){
'use strict';

angular.module('olimpiadas')
.service('QuestionService',QuestionService);

QuestionService.$inject=['$http','ApiPath'];
function QuestionService($http,ApiPath){
	var service = this;

	service.getQuestionsForTema = function(id){
		return $http.get(ApiPath +'/tema/'+id+'/questions' ).then(function(response){
			return response.data;
		});
	}

	service.getQuestion = function(id){
		return $http.get(ApiPath+'/question/'+id);
	}

	service.saveQuestion = function(question){
		return $http.post(ApiPath+'/questions',$.param(question),{
			headers : {
        		'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    		}
		});
	}

	service.updateQuestion = function(question){
		return $http.put(ApiPath+'/question/'+question._id, $.param(question),{
			headers : {
        		'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    		}
		})
	}

	service.deleteQuestion = function(id){
		return $http.delete(ApiPath+'/question/'+id);
	}

	service.deleteOption = function(qId, oId){
		return $http.delete(ApiPath+'/question/'+qId+'/option/'+oId);	
		// return $http({
		// 		method: 'DELETE',	
		// 		url: ApiPath+'/question/'+qId+'/option/'+oId
		// 	});
	}
}
})();