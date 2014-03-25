icm.controller('BeeldCtrl', ['$scope', '$stateParams', 'Beelden', 'Core', 'Utils', function  ($scope, $stateParams, Beelden, Core, Utils) {
    $scope.beeldType = $stateParams.beeldType;
    $scope.data = Utils;

    if(!Core.project()) {
        //TODO: hier moet je of terug gestuurd worden naar incidenten of netjes met een promise oid alsnog alle gegevens zetten
        if(!Core.project($stateParams.incidentID)) return false;

    }

    //functie om het huidige beeld op te halen
    $scope.currentBeeld = _(Beelden.beelden).filter(function(d){
        return d.beeld == $scope.beeldType;
    })[0];

    $scope.editItem = function(isedit,item,title) {

        var onderdeel = this.onderdeel;

        if(isedit) {

            //onderdeel.contentedit = onderdeel.contentedit.replace('<div>','<br>').replace('</div>','');
             if(title) return false;
            //Er is geedit, we moeten de wijzigingen aan de cow.item() doorgeven en syncen
            if(item) {
                //er is al een item, we gaan hem aanpassen
                item
                    .data('beeldcontent',onderdeel.contentedit || ' ')
                    .sync();
            }
            else {
                //er is nog geen item, we gaan een nieuwe maken
                if(!onderdeel.contentedit) {
                    this.onderdeel.isedit = !isedit;
                    return false; //er is geen content dus ook niet gaan syncen
                }
                var id = $scope.beeldType + '_' + onderdeel.id;

                var item = Core.project().items({_id:id})
                    .data('beeld',$scope.beeldType)
                    .data('beeldonderdeel',onderdeel.id)
                    .data('beeldcontent',onderdeel.contentedit)
                    .sync();
            }
            this.onderdeel.zeker = true;
        }
        else {
            //we gaan editen, zorg dat de huidige versie opgeslagen is in de scope zodat cancel makkelijk is.
            //hierbij moet de nieuwe string zonder de diff gebruikt worden.
            if(!item)  this.onderdeel.contentedit = '';
            else this.onderdeel.contentedit = item.data('beeldcontent');
            
        }
        this.onderdeel.isedit = !isedit;
    };

    $scope.cancelEdit = function(item) {
        if(this.onderdeel.zeker) {
            this.onderdeel.zeker = false;
        }
        else {            
            this.onderdeel.zeker = true;
            this.onderdeel.isedit = false;
            this.onderdeel.content = item ? item.data('beeldcontent'):'';
        }
    }

}]);
