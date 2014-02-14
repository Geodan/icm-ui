
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
        console.warn('change');
        items = ItemStore.filter(icms.messages(),$scope.currentBeeld.beeld);
        _($scope.currentBeeld.beeldonderdeel).each(function(d){
            var item = _(items).filter(function(b){
                return b.data('beeldonderdeel') == d.id
            })
            if(item.length > 0)
                d.content = item[0].data('beeldcontent');
        })
    });

    /*
        items: cow.item.data('beeldonderdeel').data('beeldcontent')
    */
    items = ItemStore.filter(icms.messages(),$scope.currentBeeld.beeld);
    _($scope.currentBeeld.beeldonderdeel).each(function(d){
        var item = _(items).filter(function(b){
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
