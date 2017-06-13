(function(){
'use strict';

angular.module('olimpiadas')
.service('TemarioService',TemarioService);

TemarioService.$inject = ['$http','ApiPath'];
function TemarioService($http,ApiPath){
	var service = this;

	//service.size = service.temario.length;

	service.getTemario = function(id){
		// console.log('se obtiene el temario');
		// return service.temario;

		return $http.get(ApiPath+'/subarea/'+id+'/temario').then(function(response){
			return response.data;
		});
	}

	service.updateTema = function(tema){
		return $http.put(ApiPath+'/tema/'+tema._id, $.param(tema),{
    		headers : {
        		'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    		}
		});
	}

	service.saveTema = function(nuevo){
		return $http.post(ApiPath+'/temario',$.param(nuevo),{
    		headers : {
        		'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    		}
		});
	}

	service.deleteTema = function(id){
		return $http.delete(ApiPath+'/tema/'+id)
	}


}
})();