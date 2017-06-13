(function(){
'use strict';

angular.module('olimpiadas')
.component('areaView',{
	templateUrl:'src/area/area-view/area-view.html',
	controller: AreaViewController,
	bindings:{
		area: '<'
	}
});

function AreaViewController(){
	var $ctrl = this;
	
}

})();