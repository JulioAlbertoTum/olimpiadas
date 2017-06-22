(function(){
'use strict';

angular.module('olimpiadas')
.service('SessionService',SessionService);


SessionService.$inject = ['$auth','$location','$state','localStorageService','$http','ApiPath','$alert']
function SessionService($auth,$location,$state,localStorageService,$http,ApiPath,$alert){
	var service = this;

	service.login =function(credentials){
		$auth.login(credentials)
		.then(function(response){
			localStorageService.set('user',response.data.user);
			$state.go('home');	
		})
		.catch(function(response){
			var myAlert = $alert({ container:'.messages',
								title: response.data.message, 
								// content: 'Los datos han sido actualizados', 
								// placement: 'top', 
							
								type: 'danger-custom', 
								show: true,
								duration:5});
		})
	}


	service.getUser = function(){
		return localStorageService.get('user');
	}

	service.signup = function(user){
		$auth.signup(user)
		.then(function(response){
			// console.log(response.data);
			$auth.setToken(response.data.token)
			localStorageService.set('user',response.data.user);
			$state.go('home');
		})
		.catch(function(response){
			var myAlert = $alert({ container:'.messages',
								title: response.data.message, 
								// content: 'Los datos han sido actualizados', 
								// placement: 'top',
								type: 'danger-custom', 
								show: true,
								duration:5});
		})
	}

	service.logout = function(){
		$auth.logout()
		.then(function(){
			localStorageService.clearAll();
			$state.go('default');
		})
	}

	service.isLoggedIn = function(){
		if(localStorageService.get('user')){
			return true;
		}else{
			return false;
		}
	}

	service.getRol = function(){
		if(!localStorageService.get('user')){
			return false;
		}else{
			return localStorageService.get('user').rol;	
		}
		
	}

	service.updateProfile = function(user){
		return $http.put(ApiPath+'/user/'+user._id,$.param(user),{
			headers:{
				'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		});
	}

	service.updateSessionUser = function(user){
		localStorageService.set('user',user)
	}

	service.validateRude = function(user){
		return $http.put(ApiPath+'/user/rude/'+user._id,$.param(user),{
    		headers : {
        		'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    		}
		});
	}

}	
})();
