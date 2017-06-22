(function(){
'use strict';

angular.module('olimpiadas')
.component('navAside',{
	templateUrl:'src/home/nav-aside/nav-aside.html',
	controller: NavAsideController,
	bindings:{

	}
});	

NavAsideController.$inject = ['$timeout','SessionService']
function NavAsideController($timeout,SessionService){
	var $ctrl = this;
	$ctrl.rol = SessionService.getRol();
	$ctrl.$onInit = function(){
		$timeout(function(){
			$("#sideNav").click(function(){
			if($(this).hasClass('closed')){
				$('.navbar-side').animate({left: '0px'});
				$(this).removeClass('closed');
				$('#page-wrapper').animate({'margin-left' : '260px'});
				
			}
			else{
			    $(this).addClass('closed');
				$('.navbar-side').animate({left: '-260px'});
				$('#page-wrapper').animate({'margin-left' : '0px'}); 
			}
			});
		});
	}
}
})();