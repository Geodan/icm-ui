var tmp; //DEBUG

icm.controller('LeafletController', [ '$scope','$timeout','Core', 'Utils', "leafletData",'leafletEvents',function($scope, $timeout, Core, Utils,  leafletData, leafletEvents) {
    if(!Core.project()) {
        //return false;
    }
    
    var editmenu = function(event){
        Cow.utils.menu(event, {
            menuconfig: Cow.utils.menuconfig
        });
    };
    
    $scope.events = {
        markers: {
            enable: leafletEvents.getAvailableMarkerEvents(),
        },
        paths: {
            enable: leafletEvents.getAvailablePathEvents(),
        }
    };

    $scope.eventDetected = "No events yet...";
    $scope.$on('leafletDirectiveMarker.click', function(event, args){
        var event = args.leafletEvent;
        editmenu(event); 
        //$scope.eventDetected = event.name;
    });
    $scope.$on('leafletDirectivePath.click', function(event, args){
        var event = args.leafletEvent;
        editmenu(event); 
        //$scope.eventDetected = event.name;
    });
    
    $scope.markers = [];
    $scope.paths = [];
    function populateFeatures(){
      var items = _(Core.project().items()).filter(function(d){
            return (!d.deleted() && d.data('type')=='feature');
      });
      
      //Throw out old extents
      var arrayOfObjects = $scope.paths;
      for(var i = 0; i < arrayOfObjects.length; i++) {
          var obj = arrayOfObjects[i];
          if(obj.source == 'items') {
              arrayOfObjects.splice(i, 1);
              i--;
          }
      }
      //Throw out old locations
      var arrayOfObjects = $scope.markers;
      for(var i = 0; i < arrayOfObjects.length; i++) {
          var obj = arrayOfObjects[i];
          if(obj.source == 'items') {
              arrayOfObjects.splice(i, 1);
              i--;
          }
      }
      for (i=0;i<items.length;i++){
          var item = items[i];
          var feature = item.data('feature');
          feature.id = item.id();
          var props = feature.properties;
          if (feature.geometry.type == 'Point'){
              var coords = feature.geometry.coordinates;
              $scope.markers.push({
                    lat: coords[1],
                    lng: coords[0],
                    message: item.id(),
                    icon:{
                        iconUrl: feature.properties['marker-url'] || './images/mapicons/imoov/s0620_B12---g.png',
                        iconSize:     [35, 35],
                        shadowSize:   [0, 0],
                        iconAnchor:   [17, 17]
                    }
                });
          }
          else {
              var f = L.GeoJSON.geometryToLayer(feature.geometry);
              var type, fill;
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
                      type = 'multiPolyline'
                      break;
                  case "MultiPolygon":
                      fill = true;
                      type = 'multiPolygon';
                      break;
              }
              $scope.paths.push({
                  //TODO: check this for completeness
                  id: item.id(),
                  type: type,
                  source: 'items',
                  latlngs: f.getLatLngs(),
                  message: item.id(),
                  fill: fill,
                  color: props['stroke'] || "#555555",
                  opacity: props['stroke-opacity'] || 1.0,
                  weight: props['stroke-width'] || 2,  
                  fillColor: props['fill'] || "#555555",
                  fillOpacity: props['fill-opacity'] ||0.5
                  //"opacity" : props['opacity'] || 0.5
              });
          }
      }
    }
    
    function populatePeers(){
        //Throw out old extents
        var arrayOfObjects = $scope.paths;
        for(var i = 0; i < arrayOfObjects.length; i++) {
            var obj = arrayOfObjects[i];
            if(obj.source == 'peers') {
                arrayOfObjects.splice(i, 1);
                i--;
            }
        }
        //Throw out old locations
        var arrayOfObjects = $scope.markers;
        for(var i = 0; i < arrayOfObjects.length; i++) {
            var obj = arrayOfObjects[i];
            if(obj.source == 'peers') {
                arrayOfObjects.splice(i, 1);
                i--;
            }
        }
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
	            $scope.paths.push(path);
	        }
	        //Add locations
	        if (peer.data('location') && peer.id() != Core.peerid()){
	            //Own location is handled somewhere else
	            var feature = peer.data('location');
	            var f = L.GeoJSON.geometryToLayer(feature.geometry);
	            var coords = feature.geometry.coordinates;
                $scope.markers.push({
                    lat: coords[1],
                    lng: coords[0],
                    source: 'peers',
                    message: peer.id(),
                    icon:{
                        iconUrl: './images/mapicons/imoov/s0140--k.png',
                        iconSize:     [12, 12], // size of the icon
                        shadowSize:   [0, 0], // size of the shadow
                        iconAnchor:   [6, 6], // point of the icon which will correspond to marker's location
                    }
                });
	        }
	    }
    }
    populateFeatures();
    populatePeers();
    
    var editmenu = function(feature, layer){
        Cow.utils.menu(feature, {
            layer: layer,
            menuconfig: Cow.utils.menuconfig
        });
    };
    angular.extend($scope, {
        center: {
            lat: 52.752087,
            lng: 4.896941,
            zoom: 9
        },
        layers: {
            baselayers: {
                osm: {
                    name: 'OpenStreetMap',
                    type: 'xyz',
                    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    layerOptions: {
                        subdomains: ['a', 'b', 'c'],
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                        continuousWorld: true
                    }
                }
            },
            overlays: {
                hillshade: {
                    name: 'Hillshade Europa',
                    type: 'wms',
                    url: 'http://129.206.228.72/cached/hillshade',
                    visible: true,
                    layerOptions: {
                        layers: 'europe_wms:hs_srtm_europa',
                        format: 'image/png',
                        opacity: 0.25,
                        attribution: 'Hillshade layer by GIScience http://www.osm-wms.de',
                        crs: L.CRS.EPSG900913
                    }
                }
                /*
                ,editlayer: {
                    name: 'editlayer',
                    type: 'd3layer',
                    visible: true,
                    //binds: binds,
                    layerOptions: {
                        data: $scope.collection,
                        options: {
                            core: Core, //TODO
                            onClick: editmenu,
                            labels: true,
                            labelconfig: {
                                field: "name",
                                style: {
                                    stroke: "#000033"
                                    //stroke: "steelBlue"
                                }
                            }
                        }
                    }
                },
                extentlayer: {
                    name: 'extents',
                    type: 'd3layer',
                    visible: true,
                    layerOptions: {
                        data: $scope.extents,
                        options: {
                            core: Core //TODO
                        }
                    }
                }
                */
            }
        }
    });
    
    $scope.$on('leafletDirectiveMap.moveend', function(event,e){
        $scope.handleNewExtent(e.leafletEvent);
    });
    $scope.$on('leafletDirectiveMap.load', function (event, args) {
        $scope.initmap();
    });
    $scope.$on("leafletDirectiveMap.markerMouseover", function(ev, leafletEvent) {
        console.log(leafletEvent);
    });

    $scope.$on("leafletDirectiveMap.markerClick", function(ev, featureSelected, leafletEvent) {
        console.log(featureSelected);
    });
    
    $scope.handleNewExtent = function(e){
        var bounds = e.target.getBounds();
        var bbox = {
            left: bounds.getWest(),
            bottom: bounds.getSouth(),
            right: bounds.getEast(),
            top: bounds.getNorth()
        };
        var b = [bbox.left,bbox.bottom,bbox.right,bbox.top];
        var peerid = Core.peerid(); //TODO: Core
        var username = Core.user().data('name'); //TODO: Core 
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
        if (Core.peerid()){
            var peer = Core.peers(Core.peerid());
            peer.data('extent',feature).sync();
        }
    };

    
    
    var itemstore = Core.project().itemStore();
    var peerstore = Core.peerStore();
    itemstore.bind('datachange',function() {
        $scope.$apply(function(){
                populateFeatures();
        });
    });
    peerstore.bind('datachange',function() {
        //FIXME $timeout not defined
        $timeout(function() {
            $scope.$apply(function(){
                    populatePeers();
            });
        });
    });
    tmp = $scope;
    $scope.initmap = function(){
      return leafletData.getMap().then(function(map) {
        
        $scope.map = map;
        // Initialise the FeatureGroup to store editable layers
        var drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);
        $scope.drawControl = new L.Control.Draw({
            draw: false,
            edit: {
                featureGroup: drawnItems,
                edit: false,
                remove: false
            }
        });
        map.addControl($scope.drawControl);
        $scope.controls = {
            pointcontrol: new L.Draw.Marker(map, $scope.drawControl.options.Marker),
            linecontrol: new L.Draw.Polyline(map, $scope.drawControl.options.polyline),  
            polycontrol:  new L.Draw.Polygon(map, $scope.drawControl.options.polygon),
            editcontrol: new L.EditToolbar.Edit(map, {
                featureGroup: $scope.drawControl.options.edit.featureGroup,
                selectedPathOptions: $scope.drawControl.options.edit.selectedPathOptions
            })
        };
        map.on("draw:edited", function(e,x){}); //TODO
        map.on('draw:created', function (e) {
            var type = e.layerType,
            layer = e.layer;
			var feature = layer.toGeoJSON();
		
            var d = new Date();
            var timestamp = d.getTime();
            feature.properties.stroke = 'green';
            feature.properties.fill = 'green';
            feature.properties['marker-url'] = './images/mapicons/imoov/s0620_B12---g.png';
            feature.properties.key = Core.peerid() + "_" + timestamp;
            feature.properties.creator = Core.user().data('name');
            feature.properties.owner = Core.user().data('name');

            var id = Core.peerid() + "_" + timestamp;
            var mygroups = Core.project().myGroups();
            var item = Core.project().items({_id:id})
                .data('type','feature')
                .data('feature', feature)
                .permissions('view',mygroups)//Set default permissions to my groups
                .permissions('edit',mygroups)//Set default permissions to my groups
                .permissions('share',mygroups)//Set default permissions to my groups
                .sync();
        });//TODO
        
      });
    };
    
    
    $scope.drawPoint = function(){
            $scope.controls.pointcontrol.enable();
            $scope.controls.polycontrol.disable();
            $scope.controls.linecontrol.disable();
    };
    $scope.drawLine = function(){
            $scope.controls.pointcontrol.disable();
            $scope.controls.polycontrol.disable();
            $scope.controls.linecontrol.enable();
    };
    $scope.drawPolygon = function(){
            $scope.controls.pointcontrol.disable();
            $scope.controls.polycontrol.enable();
            $scope.controls.linecontrol.disable();
    };
    //TODO: work in progress....
    var editlayerBinds = {
        'delete': function(d){
            if (confirm('Verwijderen?')) {
                var key = d.feature.id.toString();
                Core.project().items(key).deleted('true').sync();
            } else {
                // Do nothing!
            }
        }
    };
    
}]);

