// De definities van de verschillende beelden inclusief hun onderdelen
icm.factory('Beelden', ['$rootScope',function($rootScope) {
    var data = {};
    data.beelden = [
        { beeld: 'situatie', title: 'Situatie', beeldonderdeel: ['Situatie']}    
        ,{ beeld: 'meldingen', title: 'Meldingen', beeldonderdeel: ['Tijdlijn','Meldingen beeld', 'Acute meldingen', 'Situatie Plaats Incident', 'Genomen acties']}
        ,{ beeld: 'wat', title: 'Operationeel (WAT)', beeldonderdeel: ['Tijdlijn','Beeldvorming', 'Oordeelsvorming', 'Besluitsvorming', 'Knelpunten', 'Acties/maatregelen','Veiligheid medewerkers','Prognose (verwachting)']}
        ,{ beeld: 'wot', title: 'Tactisch (WOT)', beeldonderdeel: ['Tijdlijn','Beeldvorming', 'Oordeelsvorming', 'Besluitsvorming', 'Knelpunten', 'Acties/maatregelen','Prognose (verwachting)']}
        ,{ beeld: 'wbt', title: 'Strategisch (WBT)', beeldonderdeel: ['Tijdlijn','Beeldvorming', 'Oordeelsvorming', 'Besluitsvorming', 'Knelpunten', 'Acties/maatregelen','Prognose (verwachting)']}
        ,{ beeld: 'scenarios', title: 'Scenario\'s / maatregelen', beeldonderdeel: ['Meest waarschijnlijk','Minder waarschijnlijk', 'Minst waarschijnlijk']}
        ,{ beeld: 'communicatie', title: 'Communicatie', beeldonderdeel: ['Kernboodschap','Omgevingsbeeld', 'Communicatie vanuit het waterschap', 'Communicatie intern het waterschap']}
    ];
    return data;
}])

icm.controller('BeeldCtrl', ['$scope', '$state', '$stateParams', 'Beelden', function  ($scope, $state, $stateParams, Beelden) {
    $scope.beeldType = $stateParams.beeldType;

    $scope.currentBeeld = _(Beelden.beelden).filter(function(d){
        return d.beeld == $scope.beeldType;
    })[0]


}])
/*

item.data.beeld
item.data.beeldonderdeel
item.data.beeldcontent
*/
