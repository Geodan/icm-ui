icm.factory('LeafletService',['$rootScope','Core',function($rootScope, Core) {
    var instance = {};
    var core = Core;
    var _center;
    instance.layers = {};
    instance.center = function(center){
          return instance._center = center || instance._center;
    };
    
    /** Default baselayer **/
    instance.reset = function(){
        if (core.project()){
            var items = _(core.project().items())
                    .filter(function(d){return d.data('type') == 'baselayer' && !d.deleted()});
             var mapped = _.map(items, function(d){return d.data()});
             instance.layers.baselayers = _.groupBy(mapped,function(d){return d.category;});
             
             var items = _(core.project().items())
                    .filter(function(d){return d.data('type') == 'overlay' && !d.deleted()}); 
             var mapped = _.map(items, function(d){return d.data()});
             instance.layers.overlays = _.groupBy(mapped, function(d){return d.category;});
             
        }
        
        var initcenter = {
            lat: 52.752087,
            lng: 4.896941,
            zoom: 5
        };
        instance.center(initcenter);
        
        instance.definedLayers = {
            brt: {
                name: 'BRT',
                url: 'http://geodata.nationaalgeoregister.nl/tms/1.0.0/brtachtergrondkaart/{z}/{x}/{y}.png',
                type: 'xyz',
                layerOptions: {
                    tms: true,
                }
            }
        };
        instance.definedOverlays = {};
      
    }
    instance.reset();
    
    return instance;
}]);

