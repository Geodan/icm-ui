icm.factory('LeafletService',['$rootScope','$http','Core',function($rootScope, $http,Core) {
    var instance = {};
    var core = Core;
    var _center = null;
    var _projection;
    instance.layers = {};
    instance.icontypes = {};
    
    instance.projection = function(){
        return icmconfig.crs;
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
    
    /* Initiate the marker icons */
    instance.icontypes = icmconfig.drawstyles.icontypes;
    /*OBS
    $http({method: 'GET', url: './images/mapicons/progideon_list.js'}).
        success(function(data, status, headers, config) {
            _(data.icons).each(function(d){
                instance.icontypes[d.url] = d;
            });
                
        }).
        error(function(data, status, headers, config) {
            console.log(status);
        });
    */
    instance.linestyles = icmconfig.drawstyles.linestyles;
    instance.polygonstyles = icmconfig.drawstyles.polygonstyles;
    /* OBS
    instance.linestyles = [
        {stroke: '#000'},
        {stroke: '#f57900'},
        {stroke: '#204a87'},
        {stroke: '#cc0000'},
        {stroke: '#5c3566'},
        {stroke: '#4e9a06'}];
    instance.polygonstyles = [
        {stroke: '#000'   ,fill: '#000'  },
        {stroke: '#f57900',fill: '#f57900'},
        {stroke: '#204a87',fill: '#204a87'},
        {stroke: '#cc0000',fill: '#cc0000'},
        {stroke: '#5c3566',fill: '#5c3566'},
        {stroke: '#4e9a06',fill: '#4e9a06'}];
        */
    /* Set an init style */
    instance.currentstyle = {
        icon: {url: 'imoov/s0110_A10---g.png'},
        line: {stroke: '#000'},
        polygon: {stroke: '#000',fill: '#000'}
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
             
             instance.layers.icmlayers = {};

            var initcenter = core.project().data('incidentlocation') || icmconfig.center;
            if (initcenter) instance.center(initcenter);

        }

        instance.definedLayers = icmconfig.definedlayers;
        instance.definedOverlays = {};
      
    }
    instance.reset();
    
    return instance;
}]);

