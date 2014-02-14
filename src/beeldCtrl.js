
icm.controller('BeeldCtrl', ['$scope', '$stateParams', 'Beelden', 'ItemStore', function  ($scope, $stateParams, Beelden, ItemStore) {
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

    //functies om de complete itemstore aan deze control te hangen.
    $scope.itemStore = {};
    ItemStore.on('datachange',function(data) {
          items = ItemStore.filter(icms.messages(),$scope.currentBeeld.beeld);
          
           _($scope.currentBeeld.beeldonderdeel).each(function(d){
            d.content = _(items).findWhere(function(b){
                b.data('beeldonderdeel') == d.id;
                return b.beeldcontent;
            })
          })


          console.log('angular change');
    });

    /*
        items: cow.item.data('beeldonderdeel').data('beeldcontent')
    */
    items = ItemStore.filter(icms.messages(),$scope.currentBeeld.beeld);
     _($scope.currentBeeld.beeldonderdeel).each(function(d){
            d.content = _(items).findWhere(function(b){
                b.data('beeldonderdeel') == d.id;
                return b.beeldcontent;
            })
          })
var i =0;


}])

icm.controller('BeeldSideCtrl', ['$scope', 'Beelden', function  ($scope, Beelden) {
    $scope.beelden = Beelden.beelden;


}])
/*

item.data.beeld
item.data.beeldonderdeel
item.data.beeldcontent
*/
