
icm.controller('LeafletController', [ '$scope','ItemStore', function($scope, ItemStore) {
    $scope.collection = {"type":"FeatureCollection","features":[]};
    $scope.itemStore = {};
    
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
        var feature = items[i];
        features.push(feature.data('feature'));
    }
    $scope.collection = {"type":"FeatureCollection","features":features};
    function style(feature) {
        var icon = L.icon({
                iconUrl: feature.properties.icon,
                iconSize: [40, 40]
        });
        return {
            icon: icon,
            fillColor: 'red',
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }
    function pointToLayer(feature, latlng){
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
    var editmenu = function(feature, layer){
        Cow.utils.menu(feature, {
            layer: layer,
            menuconfig: Cow.utils.menuconfig
        });
    };
    angular.extend($scope, {
        utrecht: {
            lat: 52.083,
            lng: 5.111,
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
