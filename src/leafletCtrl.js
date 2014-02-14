


/*
 * Deze angular control gaat over de lijst met incidenten in /incidenten
 */
icm.controller('LeafletCtrl' ,[ "$scope", "$http", function($scope, $http) {
    $scope.$on("leafletDirectiveMap.geojsonMouseover", function(ev, leafletEvent) {
        countryMouseover(leafletEvent);
    });

    $scope.$on("leafletDirectiveMap.geojsonClick", function(ev, featureSelected, leafletEvent) {
        countryClick(featureSelected, leafletEvent);
    });

    angular.extend($scope, {
        center: {
            lat: 52.083726,
            lng: 5.111282,
            zoom: 8
        }
    });

    function countryClick(country, event) {
        console.log(country.properties.name);
    }

    function style(d) {
        
        return {
            //fillColor: getColor($scope.countries[feature.id]),
            fillColor: 'red',
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    // Mouse over function, called from the Leaflet Map Events
    function countryMouseover(leafletEvent) {
        var layer = leafletEvent.target;
        layer.setStyle({
            weight: 2,
            color: '#666',
            fillColor: 'white'
        });
        layer.bringToFront();
    }

    // Get the countries data from a JSON
    var collection = {type: 'FeatureCollection', features: []};
    _(icm.features()).each(function(d){
            collection.features.push(d.data('feature'));
    });
    angular.extend($scope, {
        geojson: {
            data: collection,
            style: style,
            resetStyleOnMouseout: true
        }
    });
}]);

