
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
    angular.extend($scope, {
        utrecht: {
            lat: 52.083,
            lng: 5.111,
            zoom: 9
        },
        d3layer: {
            data: $scope.collection,
            style: style,
            resetStyleOnMouseout: true
        }
    });
}]);
