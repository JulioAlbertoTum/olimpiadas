(function(){
'use strict';

angular.module('olimpiadas')
.component('alert',{
	templateUrl:'src/common/alert/alert.html',
	controller:AlertController,
	bindings:{
		message: '<'
	}
});

function AlertController(){
	var $ctrl =  this;
}	
})();