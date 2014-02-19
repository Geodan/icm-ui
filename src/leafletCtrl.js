var tmp; //DEBUG
icm.controller('LeafletController', [ '$scope','ItemStore',  "leafletData", function($scope, ItemStore, leafletData) {
    console.log('init controller'); //FIXME: controller is called twice... but why?
    $scope.collection = {"type":"FeatureCollection","features":[]};
    $scope.itemStore = {};
    
    $scope.eventDetected = "No events yet...";
    $scope.$on('leafletDirectiveMap.zoomstart', function(event){
        $scope.eventDetected = "ZoomStart";
    });
    $scope.$on('leafletDirectiveMap.drag', function(event){
        $scope.eventDetected = "Drag";
    });
    $scope.$on('leafletDirectiveMap.click', function(event){
        $scope.eventDetected = "Click";
    });
    $scope.$on('leafletDirectiveMap.mousemove', function(event){
        $scope.eventDetected = "MouseMove";
    });
    
    ItemStore.on('datachange',function(data) {
          $scope.collection.features = [];
          var items = icms.features();
          for (i=0;i<items.length;i++){
              $scope.collection.features.push(feature);
          }
    });
    $scope.collection.features = [];
    var items = icms.features();

    var features = [];
    for (i=0;i<items.length;i++){
        var feature = items[i].data('feature');
        feature.id = items[i].id();
        features.push(feature);
    }
    $scope.collection = {"type":"FeatureCollection","features":features};
    
    var editmenu = function(feature, layer){
        Cow.utils.menu(feature, {
            layer: layer,
            menuconfig: Cow.utils.menuconfig
        });
    };
    
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
            feature.properties.icon = './images/mapicons/mapicons/emergencyphone.png'; //TODO TT: not nice
            feature.properties.linecolor = "aliceBlue";
            feature.properties.polycolor = "red";
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
        $scope.initmap().then(function(){
            $scope.controls.pointcontrol.enable();
            $scope.controls.polycontrol.disable();
            $scope.controls.linecontrol.disable();
        });
    };
    $scope.drawLine = function(){
       $scope.initmap().then(function(){
            $scope.controls.pointcontrol.disable();
            $scope.controls.polycontrol.disable();
            $scope.controls.linecontrol.enable();
       });
    };
    $scope.drawPolygon = function(){
        $scope.initmap().then(function(){
            $scope.controls.pointcontrol.disable();
            $scope.controls.polycontrol.enable();
            $scope.controls.linecontrol.disable();
        });
    };
    
    angular.extend($scope, {
        utrecht: {
            lat: 52.752087,
            lng: 4.896941,
            zoom: 9
        },
        controls: {
            custom: []
        },
        events: {
            map: {
                /**
                Listen options:
                click, dblclick, mousedown, mouseup, mouseover, mouseout, mousemove, contextmenu, focus, blur, preclick, load, unload, viewreset, movestart, move, moveend, dragstart, drag, dragend, zoomstart, zoomend, zoomlevelschange, resize, autopanstart, layeradd, layerremove, baselayerchange, overlayadd, overlayremove, locationfound, locationerror, popupopen, popupclose
                **/
                enable: ['zoomstart', 'drag', 'click', 'mousemove'],
                logic: 'emit'
            }
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
                            },
                            style: {
                                fill: "none",
                                stroke: "steelBlue",
                                'stroke-width': 2,
                                opacity: 0.5
                            }
                        }
                    }
                }
            }
        }
    });
}]);
