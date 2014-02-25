icm.factory('LeafletService',['$rootScope','Core',function($rootScope, Core) {
  var instance = {};
  var core = Core;
  var _center;
  instance.center = function(center){
          return instance._center = center || instance._center;
  };
  
  instance.layers = {};
  instance.initlayers = function(){
      if (core.project()){
         instance.layers = core.project().data('layers') || {};
      }
  }
  
  
    /** Default baselayer **/
    instance.definedLayers = {
        osm: {
            name: 'OpenStreetMap',
            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            type: 'xyz'
        }
    };
    instance.definedOverlays = {};
  
    instance.reset = function(){
        //instance._center = null;
        
    }
    
  return instance;
}]);
