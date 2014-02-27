icm.controller('UserCtrl', ['$scope', '$stateParams', 'Core', 'Utils', function  ($scope, $stateParams, Core, Utils) {    

     if(!Core.project()) {
        //TODO: hier moet je of terug gestuurd worden naar incidenten of netjes met een promise oid alsnog alle gegevens zetten
        if(!Core.project($stateParams.incidentID)) return false;
        
    } 

    var store = Core.peerStore();
    $scope.peers = _(Core.peers()).filter(function(d){return !d.deleted();}); //Get list of peers
    
    //Update de items na een datachange van de itemStore
    store.bind('datachange', function () {
        $scope.$apply(function(){
            $scope.peers = _(Core.peers()).filter(function(d){return !d.deleted();}); //Get list of peers
        });
    });

}]);