
icm.controller('BeeldCtrl', ['$scope', '$stateParams', 'Beelden', 'Core', function  ($scope, $stateParams, Beelden, Core) {
    console.log('Beelctrl'); //FIXME: controller is called twice
    $scope.beeldType = $stateParams.beeldType;
    
    if(!Core.project()) return false;

    //functie om het huidige beeld op te halen
    $scope.currentBeeld = _(Beelden.beelden).filter(function(d){
        return d.beeld == $scope.beeldType;
    })[0]
    
    var store = Core.project().itemStore();
        
    $scope.items = Core.project().items();
    store.bind('datachange', function () {
        $scope.$apply(function(){
            $scope.items = Core.project().items();
        })
    })


  
}])

icm.controller('BeeldSideCtrl', ['$scope', 'Beelden', function  ($scope, Beelden) {
    $scope.beelden = Beelden.beelden;


}])
/*

item.data.beeld
item.data.beeldonderdeel
item.data.beeldcontent
*/
