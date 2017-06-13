(function(){
'use strict';

angular.module('olimpiadas')
.component('temarioView',{
	templateUrl: 'src/temario/temario-view/temario-view.html',
	controller: TemarioViewController,
	bindings:{
		tema:'<'
	}
});


function TemarioViewController(){
	var $ctrl = this;

}

})();