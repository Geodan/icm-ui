
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
            });

            if(item.length > 0) {
                var deltas = item[0].deltas();
                var deltaCount =  deltas.length;
                console.log(deltas);
                var oldValue = item[0].data('beeldcontent');
                if (deltaCount > 1) {
                    for (var i = deltaCount - 2; i >= 0; i--)
                    {
                        if (deltas[i].data.beeldcontent != undefined)
                        {
                            oldValue = deltas[i].data.beeldcontent;
                            break;
                        }
                    }
                    //oldValue = deltas[deltaCount - 2].data.beeldcontent;
                }
                console.log('XXX    XXX   DIff');
                console.log(oldValue);
                console.log(item[0].data('beeldcontent'));
                var diff =  TextDifference(oldValue, item[0].data('beeldcontent')) ;

                //diff op basis van oude waarde in scherm, wordt snel aangepast!!!!
                /*
                var newValue = item[0].data('beeldcontent');
                var diff = d.contentOld == null ? newValue : TextDifference(d.contentOld, newValue);
                d.contentOld = item[0].data('beeldcontent');
                */

                d.content = diff;
            }
        });
    }
    
    //Update de items na een datachange van de itemStore
    store.bind('datachange', function () {
        $scope.$apply(function(){
            updateItems()
        })
    });
    updateItems();

}]);

icm.controller('BeeldSideCtrl', ['$scope', 'Beelden', function  ($scope, Beelden) {
    $scope.beelden = Beelden.beelden;


}]);
