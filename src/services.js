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
        cloudmade: {
            name: 'Cloudmade Tourist',
            type: 'xyz',
            url: 'http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png',
            layerParams: {
                key: '007b9471b4c74da4a6ec7ff43552b16f',
                styleId: 7
            }
        }
    };
    instance.definedOverlays = { 
        //waterkeringen: {
        //    name:"Waterkeringen",
        //    type:"wms",
        //    url:"http://hhnk.webgispublisher.nl:8080/geoserver/wms",
        //    visible:true,
        //    layerOptions:{
        //        layers:"GeoData:LRWK_Regionale_Waterkeringen",
        //        format:"image/png",
        //        transparent:true
        //    }
        //}
    };
  
  return instance;
}]);
