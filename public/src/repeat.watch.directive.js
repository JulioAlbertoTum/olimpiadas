(function(){
'use strict';


angular.module('olimpiadas').directive('ngRepeatEndWatch', function () {
  return {
    restrict: 'A',
    scope: {},
    link: function (scope, element, attrs) {
      if (attrs.ngRepeat) {
        if (scope.$parent.$last) {
          if (attrs.ngRepeatEndWatch !== '') {
            if (typeof scope.$parent.$parent[attrs.ngRepeatEndWatch] === 'function') {
         				scope.$parent.$parent[attrs.ngRepeatEndWatch]();
            } else {
   							scope.$parent.$parent[attrs.ngRepeatEndWatch] = true;
           	}
          } else {
                scope.$parent.$parent.ngRepeatEnd = true;
          }
        }
      } else {
        throw 'falta ngRepeatEndWatch';
    }
  }
};
});

})();