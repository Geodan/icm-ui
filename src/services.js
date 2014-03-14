icm.factory('LeafletService',['$rootScope','Core',function($rootScope, Core) {
    var instance = {};
    var core = Core;
    var _center = null;
    var _projection;
    instance.layers = {};
    
    instance.projection = function(){
        return new L.Proj.CRS.TMS(
         'EPSG:28992',
         '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs',
         [-285401.92,22598.08,595401.9199999999,903401.9199999999], {
         resolutions: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420]
       });
    };
    
    instance.center = function(center){
        if (!center){
            //console.log('Getting center: ', instance._center);
        }
        else{
            //console.log('setting center: ', center);
        }
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
        
        //var initcenter = {
        //    lat: 52.752087, //Approx HHNK
        //    lng: 4.896941,
        //    zoom: 5
        //};
        //var initcenter = Core.project().data('incidentlocation');
        //instance.center(initcenter);
        
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

