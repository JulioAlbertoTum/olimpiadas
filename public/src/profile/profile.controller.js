(function(){
'use strict';

angular.module('olimpiadas')
.controller('ProfileController',ProfileController);

ProfileController.$inject = ['SessionService','$alert','$timeout']
function ProfileController(SessionService,$alert,$timeout){
	var $ctrl = this;
	$ctrl.titulo ="Perfil de Usuario";
	$ctrl.user = SessionService.getUser();
	$ctrl.defaultPhoto = "img/default_user.png";
	$ctrl.rude = null;

	$ctrl.updateProfile = function(){
		SessionService.updateProfile($ctrl.user)
		.then(function(response){
			$ctrl.user = response.data;
			SessionService.updateSessionUser($ctrl.user);
			var myAlert = $alert({ container:'.messages',
								title: 'Los datos se han actualizado exitosamente', 
								// content: 'Los datos han sido actualizados', 
								// placement: 'top', 
								type: 'success-custom', 
								show: true,
								duration:3});
			console.log($ctrl.user);
		})
	}

	$ctrl.upload = function(){
		angular.element('#photo').trigger('click');
	}

	$ctrl.isVerify = function(){
		if($ctrl.user.verify == true){
			return true
		}
		return false;
	}

	$ctrl.isStudent = function(){
		if($ctrl.user.rol == 'estudiante'){
			return true
		}
		return false
	}

	$ctrl.validateRude = function(){
		SessionService.validateRude({_id:$ctrl.user._id,rude:$ctrl.rude})
		.then(function(response){
			console.log(response.data);
			SessionService.updateSessionUser(response.data);
			$ctrl.user = response.data;
			var myAlert = $alert({ container:'.messages',
								title: 'Has validado tu codigo RUDE', 
								// content: 'Los datos han sido actualizados', 
								// placement: 'top', 
								type: 'success-custom', 
								show: true,
								duration:3});
		})
		.catch(function(response){
			var myAlert = $alert({ container:'.messages',
								title: response.data.message, 
								// content: 'Los datos han sido actualizados', 
								// placement: 'top', 
								type: 'danger-custom', 
								show: true,
								duration:5});
		});
	}

	$ctrl.isVerify();

}
})();