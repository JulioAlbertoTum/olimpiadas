(function(){
'use strict';

angular.module('olimpiadas')
.service('AreaService',AreaService);

AreaService.$inject = ['$http','ApiPath'];
function AreaService($http, ApiPath){
	var service = this;

	

	service.treeAreas = [
			{
			_id:"7",
			name:"Quimica",
			description:"desc",
			superarea: null
			},
			{
			_id:"1",
			name:"Fisica",
			description:"desc",
			superarea: [
				{
					_id:"11",
					name:"Mecanica",
					description:"desc",
					superarea: 1
				}
			]
		},
		{
			_id:"2",
			name:"Matematicas",
			description:"desc mat",
			superarea:[
				{
					_id:"4",
					name:"Geometria",
					description:"desc",
					superarea: 2
				},
				{
					_id:"5",
					name:"Calculo",
					description:"desc",
					superarea: 2
				},
				{
					_id:"6",
					name:"Algebra",
					description:"desc",
					superarea: 2
				}
			]
		}	
	];

	//service.size = service.areas.length;


	service.getAreas = function(){
		return $http.get(ApiPath+'/areas').then(function(response){
			return response.data;
		});
	}

	service.getTreeAreas = function(){
		return service.treeAreas;
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

