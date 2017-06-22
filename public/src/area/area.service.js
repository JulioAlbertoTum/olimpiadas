(function(){
'use strict';

angular.module('olimpiadas')
.service('AreaService',AreaService);

AreaService.$inject = ['$http','ApiPath'];
function AreaService($http, ApiPath){
	var service = this;

	//service.size = service.areas.length;


	service.getAreas = function(){
		return $http.get(ApiPath+'/areas').then(function(response){
			return response.data;
		});
	}

	service.getTreeAreas = function(areas){
		var superareas = [];
		var subareas = [];
		for(var i=0; i<areas.length; i++){
			if(areas[i].parent == null){
				superareas.push(areas[i]);
				// superareas.subareas = [];
			}else{
				subareas.push(areas[i]);
			}
		}
		
		for(var i=0; i<superareas.length; i++){
			var superu = superareas[i];
			superu.subareas = [];
			for(var j=0; j<subareas.length; j++){
				var sub = subareas[j];
				if(sub.parent.toString() == superu._id.toString()){
					// console.log(superu.name,sub.name);
					// console.log(superu.subareas);
					superu.subareas.push(sub);
				}
			}
		}

		// console.log("superareas",superareas)
		return superareas;
	}

	

	service.getAreaForId = function(id){
		for(var i=0; i<service.areas.length; i++){
			var area = service.areas[i];
			if(area._id == id){
				return area;
			}
		}
	}

	service.updateArea = function(modify){
		// var area  = service.getAreaForId(modify._id);
		// area.name = modify.name;
		// area.description = modify.description;

		return $http.put(ApiPath+'/areas/'+modify._id, $.param(modify),{
    		headers : {
        		'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    		}
		});
	}

	service.saveArea = function(nuevo){
		return $http.post(ApiPath+'/areas',$.param(nuevo),{
    		headers : {
        		'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    		}
		});
	}

	service.deleteArea = function(id){
		
		return $http.delete(ApiPath+'/areas/'+id);

	}
}

})();

