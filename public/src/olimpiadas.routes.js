(function(){
'use strict';

angular.module('olimpiadas')
.config(routeConfig);

routeConfig.$inject = ['$stateProvider','$urlRouterProvider','$locationProvider'];
function routeConfig($stateProvider,$urlRouterProvider, $locationProvider){

	$stateProvider
	.state('home',{
		url:'/home',
		templateUrl:'src/home/home.html',
		controller:'HomeController',
		controllerAs:'homeCtrl'
	})
	.state('area',{
		url:'/area',
		templateUrl:'src/area/area.html',
		controller:'AreaController',
		controllerAs:'areaCtrl',
		resolve:{
			areas: ['AreaService',function(AreaService){
				return AreaService.getAreas();
			}]
		}
	})
	.state('temario',{
		url:'/temario/{subId}',
		templateUrl:'src/temario/temario.html',
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
		}
	})
	.state('question',{
		url:'/question/{temaId}',
		templateUrl: 'src/question/question.html',
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
		}
	});

	$urlRouterProvider.otherwise('/home');
}

})();