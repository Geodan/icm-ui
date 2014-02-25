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
  instance.layernames = function(){
    if (core.project()){
        var keys = [];
        _.each( core.project().data('layers').baselayers, function( val, key ) {
          if ( val ) {
            keys.push(key);
          }
        });
        return keys || [];
    }
    else {
        return [];
    }
  }
  
  return instance;
}]);
