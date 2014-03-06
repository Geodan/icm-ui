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
            var items = _(core.project().items())
                    .filter(function(d){return d.data('type') == 'baselayer' && !d.deleted()}); 
             instance.layers.baselayers = _.map(items,function(d){return d.data('layer')});
             var items = _(core.project().items())
                    .filter(function(d){return d.data('type') == 'overlay' && !d.deleted()}); 
             var mapped = _.map(items, function(d){return d.data()});
             instance.layers.overlays = _.groupBy(mapped, function(d){return d.category;});
             
        }
        //instance._center = null;
        var initcenter = {
            lat: 52.752087,
            lng: 4.896941,
            zoom: 9
        };
        instance.center(initcenter);
        var matrixIds = new Array(26);
          for (var i=0; i<26; ++i) {
            //matrixIds[i] = 'EPSG:28992'+':' + i;
            matrixIds[i] = i;
        }
        var matrixIds28992 = new Array(26);
        for (var i= 0; i<26; i++) {
            matrixIds28992[i]= {
                identifier    : "EPSG:28992:" + i,
                topLeftCorner : new L.LatLng(903402.0, -285401.92)
            };
        }
        instance.definedLayers = {
            brt: {
                name: 'BRT',
                url: 'http://geodata.nationaalgeoregister.nl/wmts/',
                type: 'wmts',
                layerParams: {
                    layer: "brtachtergrondkaart",
                    tilematrixSet: "EPSG:28992",
                    matrixIds: matrixIds28992,
                    format: "image/png8",
                    style: ''
                }
            }
        };
        instance.definedOverlays = {};
      
    }
    instance.reset();
    
  return instance;
}]);

