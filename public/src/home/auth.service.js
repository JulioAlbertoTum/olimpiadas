(function(){
'use strict';

angular.module('olimpiadas')
.service('AuthService',AuthService);

function AuthService(){
	var service = this;

	service.user = null;

	service.isLoggedIn = function(){
		if(service.user){
			return true;
		}else{
			return false;
		}
	}

	service.getUserStatus = function(){
		return service.user;
	}
}	
})();
