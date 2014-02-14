
icm.controller('BeeldCtrl', ['$scope', '$stateParams', 'Beelden', 'ItemStore', function  ($scope, $stateParams, Beelden, ItemStore) {
    $scope.beeldType = $stateParams.beeldType;


    //functie om het huidige beeld op te halen
    $scope.currentBeeld = _(Beelden.beelden).filter(function(d){
        return d.beeld == $scope.beeldType;
    })[0]

    //functies om de complete itemstore aan deze control te hangen.
    $scope.itemStore = {};
    ItemStore.on('datachange',function(data) {
          $scope.itemStore.items = ItemStore.filter(icm.messages(),$scope.currentBeeld.beeld);
    });
    $scope.itemStore.items = ItemStore.filter(icm.messages(),$scope.currentBeeld.beeld);



}])

icm.controller('BeeldSideCtrl', ['$scope', 'Beelden', function  ($scope, Beelden) {
    $scope.beelden = Beelden.beelden;


}])
/*

item.data.beeld
item.data.beeldonderdeel
item.data.beeldcontent
*/
