icm.factory('LeafletService',['$rootScope','Core',function($rootScope, Core) {
  var instance = {};
  var core = Core;
  var _center;
  instance.center = function(center){
          return instance._center = center || instance._center;
  };
  
  instance.layers = function(){
    if (core.project()){
        return core.project().data('layers') || {};
    }
    else {
        return {};
    }
  }
  
  return instance;
}]);
