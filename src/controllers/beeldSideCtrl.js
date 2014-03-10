icm.controller('BeeldSideCtrl', ['$scope', '$stateParams', 'Beelden', 'Core', 'Utils', function  ($scope, $stateParams, Beelden, Core, Utils) {    
    $scope.beeldType = $stateParams.beeldType;
    $scope.beelden = Beelden.beelden;
    $scope.data =Utils;

     if(!Core.project()) {
        //TODO: hier moet je of terug gestuurd worden naar incidenten of netjes met een promise oid alsnog alle gegevens zetten
        if(!Core.project($stateParams.incidentID)) return false;
        
    } 

    //functie om het huidige beeld op te halen
    $scope.currentBeeld = _(Beelden.beelden).filter(function(d){
        return d.beeld == $scope.beeldType;
    })[0];
     $scope.currentBeeld.timestamp = new Date().getTime();
    

    

    function updateItems() {
        _($scope.beelden).each(function(b){
            
             var items = Utils.filter(Core.project().items(),b.beeld);             
             var updated = false;
             _(items).each(function(item){
                 if (item._updated > b.timestamp) {
                    updated = true;                 
                }

             })
             b.updated = updated;
             
        });
    }
    $scope.setRead = function(beeld) {
        var bld = beeld.beeld;
        var beelden  =$scope.beelden;
        _(beelden).each(function(b){
            if(b.beeld == bld) {
                b.timestamp = new Date().getTime();
                b.updated = false;
            }
        })
        return false;
    }
    



}]);