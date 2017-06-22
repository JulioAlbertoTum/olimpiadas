(function(){
'use strict';

angular.module('olimpiadas',['angular-underscore','mgcrea.ngStrap.alert','LocalStorageModule','satellizer','ui.router'])
.constant('ApiPath','http://localhost:8080')
.config(function(localStorageServiceProvider){
     localStorageServiceProvider.setPrefix('demoPrefix');

})
.run(function($rootScope, $state, $auth, SessionService){
	$rootScope.$on('$stateChangeStart',function(event, toState){
		var requiredLogin = false;
		console.log("aqui caemos");
		if(toState.data && toState.data.requiredLogin)
			requiredLogin = true;

		if(requiredLogin && !$auth.isAuthenticated()){
			event.preventDefault();
			console.log("aqui caemos");
			$state.go('default');
		}

		if((toState.name == 'default') && $auth.isAuthenticated() ){
			event.preventDefault();
			console.log("aqui caemos");
			$state.go('home');
		}
		
		if( SessionService.getRol() && !_.contains(toState.data.permission,SessionService.getRol()) ){
			event.preventDefault();
			console.log("aqui caemos");
			$state.go('home')
		}
	})
});
})();