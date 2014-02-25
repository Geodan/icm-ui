icm.factory('LeafletService',['$rootScope','Core',function($rootScope, Core) {
  var instance = {};
  var core = Core;
  var _center;
  instance.center = function(center){
          return instance._center = center || instance._center;
  };
  
  instance.layers = {};
  
    /** Default baselayer **/
    instance.reset = function(){
        if (core.project()){
         instance.layers = core.project().data('layers') || {};
        }
        //instance._center = null;
        var initcenter = {
            lat: 52.752087,
            lng: 4.896941,
            zoom: 9
        };
        instance.center(initcenter);
        instance.definedLayers = {
            osm: {
                name: 'OpenStreetMap',
                url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                type: 'xyz'
            }
        };
        instance.definedOverlays = {};
      
    }
    instance.reset();
    
  return instance;
}]);
