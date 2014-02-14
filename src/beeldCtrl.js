

icm.controller('BeeldCtrl', ['$scope', '$state', '$stateParams',function  ($scope, $state, $stateParams) {
    $scope.beeldType = $stateParams.beeldType;

    $scope.beelden = [
{ beeld: 'situatie', title: 'Situatie', beeldonderdeel: ['Situatie']}    
,{ beeld: 'meldingen', title: 'Meldingen', beeldonderdeel: ['Tijdlijn','Meldingen beeld', 'Acute meldingen', 'Situatie Plaats Incident', 'Genomen acties']}
,{ beeld: 'wat', title: 'Operationeel (WAT)', beeldonderdeel: ['Tijdlijn','Beeldvorming', 'Oordeelsvorming', 'Besluitsvorming', 'Knelpunten', 'Acties/maatregelen','Veiligheid medewerkers','Prognose (verwachting)']}
,{ beeld: 'wot', title: 'Tactisch (WOT)', beeldonderdeel: ['Tijdlijn','Beeldvorming', 'Oordeelsvorming', 'Besluitsvorming', 'Knelpunten', 'Acties/maatregelen','Prognose (verwachting)']}
,{ beeld: 'wbt', title: 'Strategisch (WBT)', beeldonderdeel: ['Tijdlijn','Beeldvorming', 'Oordeelsvorming', 'Besluitsvorming', 'Knelpunten', 'Acties/maatregelen','Prognose (verwachting)']}
,{ beeld: 'scenarios', title: 'Scenario\'s / maatregelen', beeldonderdeel: ['Meest waarschijnlijk','Minder waarschijnlijk', 'Minst waarschijnlijk']}
,{ beeld: 'communicatie', title: 'Communicatie', beeldonderdeel: ['Kernboodschap','Omgevingsbeeld', 'Communicatie vanuit het waterschap', 'Communicatie intern het waterschap']}
];

    $scope.currentBeeld = _($scope.beelden).filter(function(d){
        return d.beeld == $scope.beeldType;
    })[0]


}])
/*

item.data.beeld
item.data.beeldonderdeel
item.data.beeldcontent
*/
