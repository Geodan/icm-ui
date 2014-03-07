var tmp; //DEBUG


icm.controller('LeafletController', [ '$scope','$http','$timeout','Core', 'Utils', "leafletData",'leafletEvents','LeafletService',function($scope, $http, $timeout, Core, Utils,  leafletData, leafletEvents, LeafletService) {
    if(!Core.project()) {
        //return false;
    }
    var core = Core;
    var map;
    $scope.map = map; //DEBUG
    $scope.core = core; //DEBUG
    tmp = $scope; //DEBUG
    var controls= {};
    var drawControl;
    $scope.icontypes = {};
    $scope.leafletService = LeafletService;
    $scope.leafletData = leafletData;
    //FIXME: d3 layer still expects initial feature collection with at least 1 feature
    var dummyfeature = { 
            "id": 0,
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [ 0, 1],[0,3],[2,3],[2,1],[0,1]
                ]]
            },
         "properties": {
            "uid":0,
            "owner": 0,
            "label":""
        }
    };
    var dummyCollection = {"type":"FeatureCollection","features":[dummyfeature]};
    var extentLayer = new L.GeoJSON.d3(dummyCollection, {
        labels: true,
        labelconfig: {
            field: "owner",
            style: {
                stroke: "steelBlue"
            }
        },
        style: {
                fill: "none",
                stroke: "steelBlue",
                'stroke-width': 2,
                textlocation: "ul"
        }
    });
    var locationLayer = new L.GeoJSON.d3(dummyCollection, {
        labels: true,
        labelconfig: {
            field: "owner",
            style: {
                stroke: "steelBlue"
            }
        },
        style: {
                fill: "steelBlue",
                stroke: "steelBlue",
                'stroke-width': 2,
                textlocation: "ul"
        }
    });
    
    var editmenu = function(feat,container, element, event){
        var menu = new Cow_utils.menu(feat,event, container, element, {
            menuconfig: Cow_utils.menuconfig
        });
        /* Menu listeners */
        menu.on('delete', function(d){
            if (confirm('Verwijderen?')) {
                var key = d.fid;
                Core.project().items(key).deleted('true').sync();
            } else {
                // Do nothing!
            }
        });
        menu.on('edit.geom', function(d){
            drawControl.options.edit.featureGroup.addData(d.layer);
            controls.editcontrol.enable();
         });
        menu.on('edit.text', function(d){
            //TODO: edit the text in the bottom of the map
        });
        
    };
    
    var featureLayer = new L.GeoJSON.d3(dummyCollection, {
        //core: Core,
        onClick: editmenu,
        //onMouseover: cow.textbox,
        labels: true,
        labelconfig: {
            field: "name",
            style: {
                stroke: "#000033"
            }
        },
        style: {
            fill: "none",
            stroke: "steelBlue",
            'stroke-width': 2,
            opacity: 0.5
        }
    });
    
    
    /* Initiate the marker icons */
    //$http({method: 'POST', url: './images/mapicons/imoov_list_subset.js'}).
    $http({method: 'POST', url: './images/mapicons/progideon_list.js'}).
        success(function(data, status, headers, config) {
            _(data.icons).each(function(d){
                $scope.icontypes[d.url] = d;
            });
                
        }).
        error(function(data, status, headers, config) {
            console.log(status);
        });
    /* Initiate the line icons */
    $scope.linestyles = [
        {stroke: '#000'},
        {stroke: '#f57900'},
        {stroke: '#204a87'},
        {stroke: '#cc0000'},
        {stroke: '#5c3566'},
        {stroke: '#4e9a06'}];
    $scope.polygonstyles = [
        {stroke: '#000'   ,fill: '#000'  },
        {stroke: '#f57900',fill: '#f57900'},
        {stroke: '#204a87',fill: '#204a87'},
        {stroke: '#cc0000',fill: '#cc0000'},
        {stroke: '#5c3566',fill: '#5c3566'},
        {stroke: '#4e9a06',fill: '#4e9a06'}];
    /* Set an init style */
    $scope.currentstyle = {
        icon: {url: 'imoov/s0110_A10---g.png'},
        line: {stroke: '#000'},
        polygon: {stroke: '#000',fill: '#000'}
    };
    
    //Identify ESRI features
    var identify = function(event){
        var e = event.leafletEvent;
        leafletData.getLayers().then(function(lllayers){
            var dynamiclayers = _($scope.layers.overlays).filter(function(d){return d.type == 'esri_map';});
            _.each(dynamiclayers,function(dynLayer){
                lllayers.overlays[dynLayer.name].identify(e.latlng, function(data) {
                  if(data.error){
                      throw data.error;
                  }
                  if(data.results.length > 0) {
                    //Popup text should be in html format.  Showing all the attributes
                    popupText = '';
                    _.each(data.results[0].attributes, function(val,key){
                            popupText =  popupText + "<b>" + key + "</b>:&nbsp;" + val + "<br>";
                    });
        
                    //Add Popup to the map when the mouse was clicked at
                    var popup = L.popup()
                      .setLatLng(e.latlng)
                      .setContent(popupText)
                      .openOn(map);
                  }
                });
            });
        });
     };

    
    /** Map Listeners **/
    $scope.$on('leafletDirectiveMap.moveend', function(event,e){
        d3.selectAll('.popup').remove();//Remove all popups on map
        //handleNewExtent(e.leafletEvent); //DISABLED
    });
    $scope.$on('leafletDirectiveMap.click', function(event,e){
        d3.selectAll('.popup').remove();//Remove all popups on map
        controls.editcontrol.save();
        controls.editcontrol.disable();
        identify(e);
    });
    $scope.$on('leafletDirectiveMap.load', function (event, args) {
        initmap();
    });
   
    
    /** SECTION FOR EXTRA LAYERS **/
    //Get extra layers from leafletService
    $scope.extralayers = $scope.leafletService.layers;
    //Get the center from leafletService
    $scope.center = $scope.leafletService.center();
    //Set init layers from leafletService
    angular.extend($scope, {
        layers: {
            baselayers: $scope.leafletService.definedLayers,
            overlays: $scope.leafletService.definedOverlays
        }
    });
    
    //Toggle baselayers
    $scope.toggleLayer = function(val) {
        var baselayers = $scope.layers.baselayers;
        var layerName = val.layer.name;
        if (baselayers.hasOwnProperty(layerName)) {
            delete baselayers[layerName];
            val.buttonclass = 'btn-default';
        } else {
            baselayers[layerName] = val.layer;
            val.buttonclass = 'btn-primary';
        }
    };
    //Toggle overlays
    $scope.toggleOverlay = function(val) {
        var overlays = $scope.layers.overlays;
        var overlayName = val.layer.name;
        if (overlays.hasOwnProperty(overlayName)) {
            delete overlays[overlayName];
            val.buttonclass = 'btn-default';
        } else {
            overlays[overlayName] = val.layer;
            val.buttonclass = 'btn-primary';
        }
    };
    /** END OF SECTION EXTRA LAYERS **/
    
    
    /** draw cow features on map **/
    var populateFeatures = function(){
      var items = _(core.project().items()).filter(function(d){
            return (!d.deleted() && d.data('type')=='feature');
      });
      
      var editCollection = dummyCollection; //FIXME
      var viewCollection = dummyCollection; //FIXME
      for (i=0;i<items.length;i++){
		    var item = items[i];
			var feature = item.data('feature');
            if(feature === undefined) {
                console.warn('old item type');
                return false;
            }
            else{
                //Add feature
                var opacity = 1;
                feature.id = item.id();
                var props = feature.properties;
                props.name = item.data('name'); 
                feature.style = {
                    "marker-url": props['marker-url'] || './images/mapicons/imoov/s0620_B12---g.png',
                    stroke: props.stroke || "#555555",
                    fill:  props.fill || "#555555",
                    "fill-opacity": props['fill-opacity'] ||0.5,
                    opacity: props.opacity || 1
                };
                feature.id = feature.properties.key = item.id();
                //Workaround for lines with a fill
                if (feature.geometry.type == 'LineString'){
                    feature.style.fill = 'none';
                    feature.properties.fill = 'none';
                }
                editCollection.features.push(feature);
			}
		}
		if (featureLayer){
			featureLayer.data(editCollection);
		    featureLayer.updateData(map);
		}
    };
    //Anything changed in the peers store results in redraw of peer items (extents & points)
    var populatePeers = function(){
        var self = this;
        var extentCollection = {"type":"FeatureCollection","features":[]};
        var locationCollection  = {"type":"FeatureCollection","features":[]};
        //Get active peers
        var peers = _(Core.peers())
            .filter(function(d){
                return (!d.deleted());
            });
        
        for (i=0;i<peers.length;i++){
            var peer = peers[i];
            if (peer.data('extent') && peer.id() != core.peerid()){
                extentCollection.features.push(peer.data('extent'));
            }
            if (peer.data('location') && peer.id() != core.peerid()){
                //Own location is handled somewhere else
                locationCollection.features.push(peer.data('location'));
            }
        }
        //Update layer with extents
        /* EXTENT LAYER disabled
        if (extentLayer){
            //self.extentLayer.clearLayers();
            //self.extentLayer.addData(extentCollection);
            extentLayer.data(extentCollection);
            extentLayer.updateData(map);
        }
        */
        //Update layer with locations
        if (locationLayer){
            //self.locationLayer.clearLayers();
            //self.locationLayer.addData(locationCollection);
            locationLayer.data(locationCollection);
            locationLayer.updateData(map);
        }
    };
    var handleNewExtent = function(e){
        var center = e.target.getCenter();
        var zoom = e.target.getZoom();
        $scope.leafletService.center({lat: center.lat, lng:center.lng, zoom: zoom}); 
        var bounds = e.target.getBounds();
        var bbox = {
            left: bounds.getWest(),
            bottom: bounds.getSouth(),
            right: bounds.getEast(),
            top: bounds.getNorth()
        };
        var b = [bbox.left,bbox.bottom,bbox.right,bbox.top];
        var peerid = core.peerid(); //TODO: core
        var username = core.user().data('name'); //TODO: core 
        var feature = { "id": peerid,
                        "type": "Feature",
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [
                                [ [b[0], b[1]],[b[0],b[3]],[b[2],b[3]],[b[2],b[1]],[b[0],b[1]]
                                ]
                            ]
                        },
                     "properties": {
                        "uid":peerid,
                        "owner": username,
                        "label":""
                    }
                };
        if (core.peerid()){
            var peer = core.peers(core.peerid());
            peer.data('extent',feature).sync();
        }
    };


    
    /** 
        initmap() - called after first mapload
            Handles most of the ICMS stuff that didn't fit into angular
    **/
    
    var initmap = function(){
      $scope.center = $scope.leafletService.center() || $scope.center;
      leafletData.getMap().then(function(d) {
        map = d;
        //Set correct projection for map
        var RD = new L.Proj.CRS.TMS(
         'EPSG:28992',
         '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs',
         [-285401.92,22598.08,595401.9199999999,903401.9199999999], {
         resolutions: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420]
         });
        map.options.crs = RD;
        map.setView($scope.leafletService.center());
        /** ADD LAYERS **/
        map.addLayer(extentLayer);
        map.addLayer(featureLayer);


        /** SETUP DRAWING FUNCTIONALITY **/
        // Use a geoJson object for the drawnItems instead of featureGroup
        var drawnItems = new L.geoJson();
        map.addLayer(drawnItems);
        drawControl = new L.Control.Draw({
            draw: false,
            edit: {
                featureGroup: drawnItems,
                edit: false,
                remove: false
            }
        });
        map.addControl(drawControl);
       
        controls.pointcontrol = new L.Draw.Marker(map,  drawControl.options.Marker);
        controls.linecontrol = new L.Draw.Polyline(map, drawControl.options.polyline);  
        controls.polycontrol =  new L.Draw.Polygon(map, drawControl.options.polygon);
        controls.editcontrol = new L.EditToolbar.Edit(map, {
                featureGroup: drawControl.options.edit.featureGroup,
                selectedPathOptions: drawControl.options.edit.selectedPathOptions
            });
        
        map.on("draw:edited", function(e,x){
            var layers = e.layers;
            layers.eachLayer(function (layer) {
                var geojson = layer.toGeoJSON();
                var fid = layer.feature.id;
                var feature = Core.project().items(fid).data('feature');
                feature.geometry = geojson.geometry;
                //First transform into featurestore item
                var item = Core.project().items(fid)
                    .data('feature',feature)
                    .sync();
            });
            drawControl.options.edit.featureGroup.clearLayers();
            populateFeatures();
        }); 

        map.on('draw:created', function (e) {
            var type = e.layerType,
            layer = e.layer;
			var feature = layer.toGeoJSON();
		
            var d = new Date();
            var timestamp = d.getTime();
            feature.properties.key = core.peerid() + "_" + timestamp;
            feature.properties.creator = core.user().data('name');
            feature.properties.owner = core.user().data('name');
            feature.properties['marker-url'] = './images/mapicons/' + $scope.currentstyle.icon.url;
            //Stroke depends on what kind of geom we're drawing
            if (controls.polycontrol.enabled()){
                feature.properties.stroke = $scope.currentstyle.polygon.stroke;
            }
            else {
                feature.properties.stroke = $scope.currentstyle.line.stroke;
            }
            feature.properties.fill = $scope.currentstyle.polygon.fill;
            
            var id = core.peerid() + "_" + timestamp;
            var mygroups = core.project().myGroups();
            var item = core.project().items({_id:id})
                .data('type','feature')
                .data('feature', feature)
                //TODO: add permissions here
                .sync();
            populateFeatures();
        });
        
        /** Bind layer reload on storechanged **/
        var itemstore = core.project().itemStore();
        var peerstore = core.peerStore();
        itemstore.bind('datachange',function() {
             populateFeatures();
        });
        peerstore.bind('datachange',function() {
            populatePeers();
        });
        
        //Initialize first time features
        populateFeatures();
      });
    };
    
    leafletData.getLayers().then(function(layers){
            $scope.leafletLayers = layers;
    });
   
    $scope.drawPoint = function(style){
        $scope.currentstyle.icon = style;
        controls.pointcontrol.enable();
        controls.polycontrol.disable();
        controls.linecontrol.disable();
    };
    $scope.drawLine = function(style){
        $scope.currentstyle.line = style;
        controls.pointcontrol.disable();
        controls.polycontrol.disable();
        controls.linecontrol.enable();
    };
    $scope.drawPolygon = function(style){
        $scope.currentstyle.polygon = style;
        controls.pointcontrol.disable();
        controls.polycontrol.enable();
        controls.linecontrol.disable();
    };
    
}]);

