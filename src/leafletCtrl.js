var tmp; //DEBUG
icm.controller('LeafletController', [ '$scope',  "leafletData", function($scope, leafletData) {
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
    
    
    $scope.collection.features = [];
    var items = icms.features();

    var features = [];
    for (i=0;i<items.length;i++){
        var feature = items[i];
        features.push(feature.data('feature'));
    }
    $scope.collection = {"type":"FeatureCollection","features":features};
    
    var editmenu = function(feature, layer){
        Cow.utils.menu(feature, {
            layer: layer,
            menuconfig: Cow.utils.menuconfig
        });
    };

    $scope.map = leafletData.getMap().then(function(map) {
        // Initialise the FeatureGroup to store editable layers
        var drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);
        var drawControl = new L.Control.Draw({
            draw: true,
            edit: {
                featureGroup: drawnItems,
                edit: true,
                remove: true
            }
        });
        map.addControl(drawControl);
        map.on("draw:edited", function(e,x){}); //TODO
        map.on('draw:created', function (e) {
                console.log(e);
        });//TODO
        tmp = map;
    });
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
