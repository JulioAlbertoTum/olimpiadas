(function(){
'use strict';

angular.module('olimpiadas')
.config(routeConfig);

routeConfig.$inject = ['$authProvider','$stateProvider','$urlRouterProvider','$locationProvider'];
function routeConfig($authProvider, $stateProvider,$urlRouterProvider, $locationProvider){

	$authProvider.loginUrl = "http://localhost:8080/auth/login";
	$authProvider.signupUrl = "http://localhost:8080/auth/signup";
	$authProvider.tokenName = "token";
	$authProvider.tokenPrefix = "olimpiadas";

	$stateProvider
	.state('default',{
		url:'/',
		templateUrl:'src/default/default.html',
		controller:'DefaultController',
		controllerAs: 'defCtrl',
		data:{
			// requiredLogin : false,
			permission: []
		}
	})
	.state('home',{
		url:'/home',
		templateUrl:'src/home/home.html',
		controller:'HomeController',
		controllerAs:'homeCtrl',
		data:{
			requiredLogin: true,
			permission: ['estudiante','evaluador','admin']
		}
	})
	.state('home.profile',{
		url: '/profile',
		templateUrl:'src/profile/profile.html',
		controller:'ProfileController',
		controllerAs:'profCtrl',
		data:{
			requiredLogin: true,
			permission: ['estudiante','evaluador','admin']
		}
	})
	.state('home.user',{
		url: '/user',
		templateUrl: 'src/user/user.html',
		controller:'UserController',
		controllerAs: 'userCtrl',
		data:{
			requiredLogin: true,
			permission: ['admin']
		}
	})
	.state('home.area',{
		url:'/area/{rol}',
		templateUrl:function($stateParams){
			return 'src/area/area.'+$stateParams.rol+'.html'	
		},
		controller:'AreaController',
		controllerAs:'areaCtrl',
		resolve:{
			areas: ['AreaService',function(AreaService){
				return AreaService.getAreas();
			}]
		},
		data:{
			requiredLogin: true,
			permission: ['estudiante','evaluador','admin']
		}
	})
	.state('home.temario',{
		url:'/temario/{rol}/{subId}',
		templateUrl:function($stateParams){
			return 'src/temario/temario.'+$stateParams.rol+'.html'
		},
		controller:'TemarioController',
		controllerAs:'temCtrl',
		resolve:{
			areas:['AreaService',function(AreaService){
				return AreaService.getAreas();
			}],
			temario:['TemarioService','$stateParams',function(TemarioService, $stateParams){
				var id = $stateParams.subId;
				if(id){
					return TemarioService.getTemario(id)
					.then(function(response){
						return response;
					});
				}else{
					return [];
				}
			}]
		},
		data:{
			requiredLogin: true,
			permission: ['estudiante','evaluador','admin']
		}
	})
	.state('home.question',{
		url:'/question/{rol}/{temaId}',
		templateUrl:function($stateParams){
			return 'src/question/question.'+$stateParams.rol+'.html'
		},
		controller:'QuestionController',
		controllerAs: 'qCtrl',
		resolve:{
			questions: ['QuestionService','$stateParams',function(QuestionService, $stateParams){
				var id = $stateParams.temaId;
				if(id){
					return QuestionService.getQuestionsForTema(id)
					.then(function(response){
						return response;
					});
				}else{
					return [];
				}
			}]
		},
		data:{
			requiredLogin: true,
			permission: ['estudiante','evaluador']
		}
	});

	$urlRouterProvider.otherwise('/');
}

})();