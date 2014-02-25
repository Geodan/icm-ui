
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
            if(d.isedit === undefined) d.isedit = false;
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

    $scope.editItem = function(isedit) {
        var onderdeel = this.onderdeel;


        if(isedit) {
            //Er is geedit, we moeten de wijzigingen aan de cow.item() doorgeven en syncen
            var beeldonderdeelItem =  _($scope.items).filter(function(b){
                return b.data('beeldonderdeel') == onderdeel.id;
            })
            if(beeldonderdeelItem.length > 0) {
                //er is al een item, we gaan hem aanpassen
                beeldonderdeelItem[0]
                    .data('beeldcontent',onderdeel.contentedit)
                    .sync();
            }
            else {
                //er is nog geen item, we gaan een nieuwe maken
                var id = $scope.beeldType + '_' + onderdeel.id;
                var item = Core.project().items({_id:id})
                    .data('beeld',$scope.beeldType)
                    .data('beeldonderdeel',onderdeel.id)
                    .data('beeldcontent',onderdeel.contentedit)
                    .sync();
            }

            
        }
        else {
            //we gaan editen, zorg dat de huidige versie opgeslagen is in de scope zodat cancel makkelijk is.
            this.onderdeel.contentedit = this.onderdeel.content;
           this.onderdeel.oldVersion = this.onderdeel.content;
        }
        this.onderdeel.isedit = !isedit;
    }
    $scope.cancelEdit = function() {

        this.onderdeel.isedit = false;
        this.onderdeel.content = this.onderdeel.oldVersion;
    }

}])

icm.controller('BeeldSideCtrl', ['$scope', 'Beelden', function  ($scope, Beelden) {
    $scope.beelden = Beelden.beelden;


}])
