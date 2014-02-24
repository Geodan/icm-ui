
icm.controller('BeeldCtrl', ['$scope', '$stateParams', 'Beelden', 'Core', 'Utils', function  ($scope, $stateParams, Beelden, Core, Utils) {    
    $scope.beeldType = $stateParams.beeldType;
    
    if(!Core.project()) {
        //TODO: hier moet je of terug gestuurd worden naar incidenten of netjes met een promise oid alsnog alle gegevens zetten
        if(!Core.project($stateParams.incidentID)) return false;
        
    } 

    //functie om het huidige beeld op te halen
    $scope.currentBeeld = _(Beelden.beelden).filter(function(d){
        return d.beeld == $scope.beeldType;
    })[0];

    var store = Core.project().itemStore();
        
    function updateItems() {
         $scope.items = Utils.filter(Core.project().items(), $scope.currentBeeld.beeld);
         _($scope.currentBeeld.beeldonderdeel).each(function(d){
            var item = _($scope.items).filter(function(b){
                return b.data('beeldonderdeel') == d.id
            })
            if(item.length > 0)
                d.content = item[0].data('beeldcontent');
        })
    }
    
    //Update de items na een datachange van de itemStore
    store.bind('datachange', function () {
        $scope.$apply(function(){
            updateItems()
        })
    });
    updateItems();

}])

icm.controller('BeeldSideCtrl', ['$scope', 'Beelden', function  ($scope, Beelden) {
    $scope.beelden = Beelden.beelden;


}])
