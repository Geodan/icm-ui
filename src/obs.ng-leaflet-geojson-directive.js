var noopDirective = function() { return function () {}; };
// Disable ngPaste directive
angular.module('leaflet-directive')
        .factory('geojson', noopDirective);

angular.module("leaflet-directive").directive('geojson', function ($log, $rootScope, leafletData, leafletHelpers) {
    return {
        restrict: "A",
        scope: false,
        replace: false,
        require: 'leaflet',

        link: function(scope, element, attrs, controller) {
            var safeApply = leafletHelpers.safeApply,
                isDefined = leafletHelpers.isDefined,
                leafletScope  = controller.getLeafletScope(),
                leafletGeoJSON = {};

            controller.getMap().then(function(map) {
                leafletScope.$watch("geojson", function(geojson) {
                    if (isDefined(leafletGeoJSON) && map.hasLayer(leafletGeoJSON)) {
                        map.removeLayer(leafletGeoJSON);
                    }

                    if (!(isDefined(geojson) && isDefined(geojson.data))) {
                        return;
                    }

                    var resetStyleOnMouseout = geojson.resetStyleOnMouseout,
                        onEachFeature = geojson.onEachFeature;

                    if (!onEachFeature) {
                        onEachFeature = function(feature, layer) {
                            
                            if (leafletHelpers.LabelPlugin.isLoaded() && isDefined(geojson.label)) {
                                layer.bindLabel(feature.properties.desc);
                            }

                            layer.on({
                                mouseover: function(e) {
                                    safeApply(leafletScope, function() {
                                        geojson.selected = feature;
                                        $rootScope.$broadcast('leafletDirectiveMap.geojsonMouseover', e);
                                    });
                                },
                                mouseout: function(e) {
                                    if (resetStyleOnMouseout) {
                                        leafletGeoJSON.resetStyle(e.target);
                                    }
                                    safeApply(leafletScope, function() {
                                        geojson.selected = undefined;
                                        $rootScope.$broadcast('leafletDirectiveMap.geojsonMouseout', e);
                                    });
                                },
                                click: function(e) {
                                    console.log('Click!');
                                    safeApply(leafletScope, function() {
                                        geojson.selected = feature;
                                        $rootScope.$broadcast('leafletDirectiveMap.geojsonClick', geojson.selected, e);
                                    });
                                }
                            });
                        };
                    }

                    geojson.options = {
                        style: geojson.style,
                        onEachFeature: onEachFeature
                    };

                    //leafletGeoJSON = L.geoJson(geojson.data, geojson.options);
                    leafletGeoJSON = new L.GeoJSON.d3(geojson.data, {
                        core: core, //TODO
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
                    });
                    leafletData.setGeoJSON(leafletGeoJSON);
                    leafletGeoJSON.addTo(map);
                });
            });
        }
    };
});
