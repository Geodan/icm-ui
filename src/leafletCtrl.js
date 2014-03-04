var tmp; //DEBUG


icm.controller('LeafletController', [ '$scope','$http','$timeout','Core', 'Utils', "leafletData",'leafletEvents','LeafletService',function($scope, $http, $timeout, Core, Utils,  leafletData, leafletEvents, LeafletService) {
    if(!Core.project()) {
        //return false;
    }
    var core = Core;
    $scope.core = core;
    tmp = $scope;
    var controls= {};
    var drawControl;
    $scope.icontypes = {};
    $scope.leafletService = LeafletService;
    
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
    
    $scope.currentstyle = {
        icon: {url: 'imoov/s0110_A10---g.png'},
        line: {stroke: '#000'},
        polygon: {stroke: '#000',fill: '#000'}
    };
    
    $scope.markers = {};
    $scope.paths = {};
    
    $scope.events = {
        markers: {
            enable: leafletEvents.getAvailableMarkerEvents()
        },
        paths: {
            enable: leafletEvents.getAvailablePathEvents()
        }
    };
    /* Menu created on clicking the object */
    var editmenu = function(event){
        var menu = new Cow_utils.menu(event, {
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
            var feat = d.layer.toGeoJSON();
            feat.properties.id = d.layer.options.id;
            //Cheap ass cloning of the feature
            drawControl.options.edit.featureGroup.addData(feat);
            controls.editcontrol.enable();
         });
    };
    
    /* Map Listeners */
    $scope.$on('leafletDirectiveMarker.click', function(event, args){
        var event = args.leafletEvent;
        editmenu(event); 
    });
    $scope.$on('leafletDirectivePath.click', function(event, args){
        var event = args.leafletEvent;
        editmenu(event);
    });
    $scope.$on('leafletDirectiveMap.moveend', function(event,e){
        d3.selectAll('.popup').remove();//Remove all popups on map
        handleNewExtent(e.leafletEvent);
    });
    $scope.$on('leafletDirectiveMap.click', function(event,e){
        d3.selectAll('.popup').remove();//Remove all popups on map
        controls.editcontrol.save();
        controls.editcontrol.disable();
    });
    $scope.$on('leafletDirectiveMap.load', function (event, args) {
        initmap();
    });
    $scope.$on("leafletDirectiveMap.markerMouseover", function(ev, leafletEvent) {
        console.log(leafletEvent);
    });
    $scope.$on("leafletDirectiveMap.markerClick", function(ev, featureSelected, leafletEvent) {
        console.log(featureSelected);
    });
    
    
    
    var populateFeatures = function(){
      var items = _(Core.project().items()).filter(function(d){
            return (!d.deleted() && d.data('type')=='feature');
      });
      
      for (i=0;i<items.length;i++){
          var item = items[i];
          var feature = item.data('feature');
          feature.id = item.id();
          var props = feature.properties;
          if (feature.geometry.type == 'Point'){
              var coords = feature.geometry.coordinates;
              $scope.markers[item.id().toString()] = {
                    options: {
                        id: item.id().toString()
                    },
                    id: item.id().toString(),
                    lat: coords[1],
                    lng: coords[0],
                    message: item.id(),
                    icon:{
                        iconUrl: feature.properties['marker-url'] || './images/mapicons/imoov/s0620_B12---g.png',
                        iconSize:     [35, 35],
                        shadowSize:   [0, 0],
                        iconAnchor:   [17, 17]
                    }
                };
          }
          else {
              var f = L.GeoJSON.geometryToLayer(feature.geometry);
              var type, fill;
              /* Convert geojson types to leaflet path types */
              //TODO: check this for completeness
              switch (feature.geometry.type) {
                  case 'LineString':
                      type = 'polyline';
                      fill = false;
                      break;
                  case 'Polygon':
                      type = 'polygon';
                      fill = true;
                      break;
                  case 'MultiLineString':
                      fill = false;
                      type = 'multiPolyline';
                      break;
                  case "MultiPolygon":
                      fill = true;
                      type = 'multiPolygon';
                      break;
              }
              
              $scope.paths[item.id().toString()] ={
                  //TODO: check this for completeness
                  id: item.id(),
                  type: type,
                  source: 'items',
                  latlngs: f.getLatLngs(),
                  message: item.id(),
                  fill: fill,
                  color: props.stroke || "#555555",
                  opacity: props['stroke-opacity'] || 1.0,
                  weight: props['stroke-width'] || 2,  
                  fillColor: props.fill || "#555555",
                  fillOpacity: props['fill-opacity'] ||0.5
                  //"opacity" : props['opacity'] || 0.5
              };
          }
      }
    };
    
    var populatePeers = function(){
        
        var extents = [];
        var locations = [];
        //Get active peers
        var peers = _(Core.peers())
            .filter(function(d){
                return (!d.deleted());
            });
        
	    for (i=0;i<peers.length;i++){
	        var peer = peers[i];
	        //Add extents
	        if (peer.data('extent') && peer.id() != Core.peerid()){ 
	            var feature = peer.data('extent');
	            var f = L.GeoJSON.geometryToLayer(feature.geometry);
	            var path = {
	                id: peer.id(),
	                source: 'peers',
	                type: 'polygon',
	                latlngs: f.getLatLngs(),
	                fill: false,
	                color: 'steelBlue',
	                weight: 2,
	                opacity: 0.5,
	                fillOpacity: 0
	            };
	            $scope.paths[peer.id().toString()] = path;
	        }
	        //Add locations
	        if (peer.data('location') && peer.id() != Core.peerid()){
	            //Own location is handled somewhere else
	            var feature = peer.data('location');
	            var f = L.GeoJSON.geometryToLayer(feature.geometry);
	            var coords = feature.geometry.coordinates;
                $scope.markers[peer.id().toString()] ={
                    lat: coords[1],
                    lng: coords[0],
                    source: 'peers',
                    message: peer.id(),
                    icon:{
                        iconUrl: './images/mapicons/imoov/s0140--k.png',
                        iconSize:     [12, 12], // size of the icon
                        shadowSize:   [0, 0], // size of the shadow
                        iconAnchor:   [6, 6] // point of the icon which will correspond to marker's location
                    }
                };
	        }
	    }
    };
    populateFeatures();
    populatePeers();
    
    
    $scope.extralayers = $scope.leafletService.layers;
    
    $scope.center = $scope.leafletService.center();
    angular.extend($scope, {
        layers: {
            baselayers: $scope.leafletService.definedLayers,
            overlays: $scope.leafletService.definedOverlays
        }
    });
    
    
    $scope.toggleLayer = function(layerName) {
        var baselayers = $scope.layers.baselayers;
        if (baselayers.hasOwnProperty(layerName)) {
            delete baselayers[layerName];
        } else {
            baselayers[layerName] = $scope.extralayers.baselayers[layerName];
        }
    };
    $scope.toggleOverlay = function(layer) {
        var overlays = $scope.layers.overlays;
        var overlayName = layer.name;
        if (overlays.hasOwnProperty(overlayName)) {
            delete overlays[overlayName];
        } else {
            overlays[overlayName] = layer;
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
        var peerid =''// core.peerid(); //TODO: core
        var username = ''//core.user().data('name'); //TODO: core 
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
        /*if (core.peerid()){
            var peer = core.peers(core.peerid());
            peer.data('extent',feature).sync();
        }*/
    };

    
    populateFeatures();
    populatePeers();
    

    var itemstore = Core.project().itemStore();
    var peerstore = Core.peerStore();
    itemstore.bind('datachange',function() {
        $scope.$apply(function(){
                populateFeatures();
        });
    });
    peerstore.bind('datachange',function() {
        $timeout(function() {
            $scope.$apply(function(){
                    populatePeers();
            });
        });
    });
    
    var initmap = function(){
      $scope.center = $scope.leafletService.center() || $scope.center;
      return leafletData.getMap().then(function(map) {
        //tmp = map;
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
                var fid = layer.feature.properties.id;
                delete $scope.paths[fid];
                var feature = Core.project().items(fid).data('feature');
                feature.geometry = geojson.geometry;
                //First transform into featurestore item
                var item = Core.project().items(feature.properties.key) //TODO
                    .data('feature',feature)
                    .sync();
            });
            drawControl.options.edit.featureGroup.clearLayers(); 
        }); //TODO

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
                .permissions('view',mygroups)//Set default permissions to my groups
                .permissions('edit',mygroups)//Set default permissions to my groups
                .permissions('share',mygroups)//Set default permissions to my groups
                .sync();
        });//TODO
        
      });
    };
    
   
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

