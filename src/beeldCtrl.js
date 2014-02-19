
icm.controller('BeeldCtrl', ['$scope', '$stateParams', 'Beelden', 'Core', 'Utils', function  ($scope, $stateParams, Beelden, Core, Utils) {
    console.log('Beelctrl'); //FIXME: controller is called twice
    $scope.beeldType = $stateParams.beeldType;
    
    if(!Core.project()) return false;

    //functie om het huidige beeld op te halen
    $scope.currentBeeld = _(Beelden.beelden).filter(function(d){
        return d.beeld == $scope.beeldType;
    })[0];
    
    var store = Core.project().itemStore();
        
    $scope.items = Utils.filter(Core.project().items(), $scope.currentBeeld.beeld);
    store.bind('datachange', function () {
        $scope.$apply(function(){
            $scope.items = Utils.filter(Core.project().items(),  $scope.currentBeeld.beeld);
             _($scope.currentBeeld.beeldonderdeel).each(function(d){
                var item = _($scope.items).filter(function(b){
                    return b.data('beeldonderdeel') == d.id
                })
                if(item.length > 0)
                    d.content = item[0].data('beeldcontent');

            })
        })
    });
    _($scope.currentBeeld.beeldonderdeel).each(function(d){
                var item = _($scope.items).filter(function(b){
                    return b.data('beeldonderdeel') == d.id
                })
                if(item.length > 0)
                    d.content = item[0].data('beeldcontent');

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
