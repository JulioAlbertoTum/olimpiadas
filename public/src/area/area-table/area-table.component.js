(function(){
'use strict';


angular.module('olimpiadas')
.component('areaTable',{
	templateUrl:'src/area/area-table/area-table.html',
	controller: function(){
		var $ctrl = this;

		console.log($ctrl.areas);
		$ctrl.getSuperArea = function(myIndex){
			var _id = $ctrl.areas[myIndex].parent
			return $ctrl.foundForId(_id).name;
		}

		$ctrl.foundForId = function(id){
			for(var a in $ctrl.areas){
				if($ctrl.areas[a]._id == id){
					return $ctrl.areas[a];
					break;
				}
			}
			return {};
		}


		$ctrl.edit = function(myIndex){
			// console.log("este es myindex "+myIndex);
			$ctrl.onEdit({index:myIndex});
			
		}

		$ctrl.create = function(){
			$ctrl.onCreate();
		}

		$ctrl.view  = function(myIndex){
			$ctrl.onView({index:myIndex});
		}

		$ctrl.delete = function(myIndex){
			console.log("borrar el area");
			$ctrl.onDelete({index:myIndex});
		}
	},
	bindings:{
		areas: '=',
		onSuper:'&',
		onEdit:'&',
		onCreate:'&',
		onView:'&',
		onDelete:'&'
	}

});

})();