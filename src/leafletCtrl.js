var tmp; //DEBUG

icm.controller('LeafletController', [ '$scope','ItemStore',  "leafletData",function($scope, ItemStore,  leafletData) {
    $scope.collection = {"type":"FeatureCollection","features":[]};
    $scope.locations = {"type":"FeatureCollection","features":[]};
    $scope.extents = {"type":"FeatureCollection","features":[]};
    var editmenu = function(feature, layer){
        Cow.utils.menu(feature, {
            layer: layer,
            menuconfig: Cow.utils.menuconfig
        });
    };
    angular.extend($scope, {
        utrecht: {
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
                },
                editlayer: {
                    name: 'editlayer',
                    type: 'd3layer',
                    visible: true,
                    //binds: binds,
                    layerOptions: {
                        data: $scope.collection,
                        options: {
                            core: core, //TODO
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
                            core: core //TODO
                        }
                    }
                }
            }
        }
    });
    
    $scope.$on('leafletDirectiveMap.moveend', function(event,e){
        $scope.handleNewExtent(e.leafletEvent);
    });
    $scope.$on('leafletDirectiveMap.load', function (event, args) {
        $scope.initmap();
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

    
    function populateFeatures(){
      var items = icms.features();
      var features = [];
      for (i=0;i<items.length;i++){
          var feature = items[i].data('feature');
          feature.id = items[i].id();
          features.push(feature);
      }
      $scope.collection.features = features;
    }
    
    function populatePeers(){
        //$scope.extents = {"type":"FeatureCollection","features":[]};
        var peers = icms.peers();
	    for (i=0;i<peers.length;i++){
	        var peer = peers[i];
	        if (peer.data('extent') && peer.id() != core.peerid()){ //TODO: core
	            $scope.extents.features.push(peer.data('extent'));
	        }
	        if (peer.data('location') && peer.id() != core.peerid()){ //TODO: core
	            //Own location is handled somewhere else
	            $scope.locations.features.push(peer.data('location'));
	        }
	    }
    }
    
    ItemStore.on('datachange',function() {
        populateFeatures();
    });
    core.peerStore().on('datachange',function() {
        populatePeers();
    });
    
    populateFeatures();
    populatePeers();
    
    
    
    $scope.initmap = function(){
      return leafletData.getMap().then(function(map) {
        tmp = map;
        
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
            feature.properties.key = core.peerid() + "_" + timestamp;
            feature.properties.creator = core.user().data('name');
            feature.properties.owner = core.user().data('name');

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
    
    
    $scope.drawPoint = function(){
        //$scope.initmap().then(function(){
            $scope.controls.pointcontrol.enable();
            $scope.controls.polycontrol.disable();
            $scope.controls.linecontrol.disable();
        //});
    };
    $scope.drawLine = function(){
       //$scope.initmap().then(function(){
            $scope.controls.pointcontrol.disable();
            $scope.controls.polycontrol.disable();
            $scope.controls.linecontrol.enable();
       //});
    };
    $scope.drawPolygon = function(){
        //$scope.initmap().then(function(){
            $scope.controls.pointcontrol.disable();
            $scope.controls.polycontrol.enable();
            $scope.controls.linecontrol.disable();
        //});
    };
    var editlayerBinds = {
        'delete': function(d){
            if (confirm('Verwijderen?')) {
                var key = d.feature.id.toString();
                core.project().items(key).deleted('true').sync();
            } else {
                // Do nothing!
            }
        }
    };
    
}]);

