
icm.controller('BeeldCtrl', ['$scope', '$stateParams', 'Beelden', function  ($scope, $stateParams, Beelden) {
    console.log('Beelctrl'); //FIXME: controller is called twice
    $scope.beeldType = $stateParams.beeldType;
    var items;
/*

currentBeeld = 
{
    { beeld: 'wot', title: 'Tactisch (WOT)', beeldonderdeel:
            [   {title:'Tijdlijn',id:'tijdlijn'},
                {title:'Beeldvorming',id:'beeldvorming'},
                {title:'Oordeelsvorming',id:'oordeelsvorming'},
                {title:'Besluitsvorming',id:'besluitsvorming'},
                {title:'Knelpunten',id:'knelpunten'},
                {title:'Acties/maatregelen',id:'maatregelen'},              
                {title:'Prognose (verwachting)',id:'prognose'}
            ]}

}
*/

    //functie om het huidige beeld op te halen
    $scope.currentBeeld = _(Beelden.beelden).filter(function(d){
        return d.beeld == $scope.beeldType;
    })[0]

  
}])

icm.controller('BeeldSideCtrl', ['$scope', 'Beelden', function  ($scope, Beelden) {
    $scope.beelden = Beelden.beelden;


}])
/*

item.data.beeld
item.data.beeldonderdeel
item.data.beeldcontent
*/
