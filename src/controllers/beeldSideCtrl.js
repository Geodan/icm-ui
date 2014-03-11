icm.controller('BeeldSideCtrl', ['$scope', '$stateParams', 'Beelden', 'Core', 'Utils', function  ($scope, $stateParams, Beelden, Core, Utils) {    
    $scope.beeldType = $stateParams.beeldType;
    $scope.beelden = Beelden.beelden;
    $scope.data =Utils;
    $scope.discussie = '';

     if(!Core.project()) {
        //TODO: hier moet je of terug gestuurd worden naar incidenten of netjes met een promise oid alsnog alle gegevens zetten
        if(!Core.project($stateParams.incidentID)) return false;
        
    } 
    $scope.nieuwBericht = false;
    $scope.$watch('data.users',function(users){
        var updated = false;
        _(users).each(function(d){
            if(d.updated) updated = true;
        })
        $scope.nieuwBericht =updated;

    }, true);
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
    //berichten:
    //van
    //naar
    //bericht
    $scope.getBerichten = function(user) {
        $scope.discussie = user.name;
        $scope.gesprek = true;
        user.timestamp = new Date().getTime();
        user.updated = false;
    }
    $scope.sendMessage = function() {
        if($scope.chat == '') return false;
        var id = $scope.data.user + '_' + $scope.discussie + '_' + new Date().getTime();
         var item = Core.project().items({_id:id})
                    .data('van',$scope.data.user)
                    .data('naar',$scope.discussie)
                    .data('bericht',$scope.chat)
                    .sync();
        $scope.chat='';
    }

}]);