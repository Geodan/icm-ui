

icm.controller('BeeldCtrl', ['$scope', '$state', '$stateParams',function  ($scope, $state, $stateParams) {
    $scope.beeldType = $stateParams.beeldType;

    $scope.beeld = [{
        beeldType: 'situatie',
        content: [{
            textType: 'Beeldvorming',
            text: 'In dit tabblad is feitelijk de samenvatting van de belangrijkste, multidisciplinaire informatie (voor iedereen relevant) opgenomen, voor zowel bron- als effectgebied. Informatie die uit de diverse overige tabbladen gefilterd wordt. Het geeft in één oogopslag de kern van de calamiteit weer: aard, knelpunten, maatregelen, actuele coördinatiefase (incl. eventuele GRIP-fase), veiligheid personeel belangrijkste besluiten en dergelijke. Het is namelijk onwenselijk dat eenieder alle eigenbeelden moet raadplegen en interpreteren om tot een integraal beeld te komen. De regie voerende informatiecoördinator zal als eerste eventuele inconsistenties opmerken tussen de diverse monobeelden (eigenbeelden). Het is dan ook diens taak om daar actie op te nemen (uitzoeken wat de oorzaak is, fouten laten herstellen (bij voorkeur nooit zelf in andere monobeelden corrigeren). '
        }]
    },
    {
        beeldType: 'meldingen',
        content: [{
            textType: 'Tijdlijn',
            text: 'overzicht van belangrijkste gebeurtenissen'
        },
        {
            textType: 'Meldingen beeld',
            text: 'samenvatting van (niet door waterschapsfunctionaris gevalideerde) externe meldingen'
        },
        {
            textType: 'Acute meldingen',
            text: 'meldingen (niet door waterschapsfunctionaris gevalideerde) die een inbreuk zijn op het meldingenbeeld'
        }]
    },
    {
        beeldType: 'wat',
        content: [{
            textType: 'Tijdlijn',
            text: 'overzicht van belangrijkste gebeurtenissen'
        },
        {
            textType: 'Beeldvorming',
            text: ''
        },
        {
            textType: 'Oordeelsvorming',
            text: ''
        },
        {
            textType: 'Besluitsvorming',
            text: ''
        }]
    },
    {
        beeldType: 'wot',
        content: [{
            textType: 'Tijdlijn',
            text: 'overzicht van belangrijkste gebeurtenissen'
        },
        {
            textType: 'Beeldvorming',
            text: ''
        },
        {
            textType: 'Oordeelsvorming',
            text: ''
        },
        {
            textType: 'Besluitsvorming',
            text: ''
        }]
    },
    {
        beeldType: 'wbt',
        content: [{
            textType: 'Tijdlijn',
            text: 'overzicht van belangrijkste gebeurtenissen'
        },
        {
            textType: 'Beeldvorming',
            text: ''
        },
        {
            textType: 'Oordeelsvorming',
            text: ''
        },
        {
            textType: 'Besluitsvorming',
            text: ''
        }]
    }]

    $scope.currentBeeld = _($scope.beeld).filter(function(d){
        return d.beeldType == $scope.beeldType;
    })[0]


}])
/*

item.data.beeld
item.data.beeldonderdeel
item.data.beeldcontent
*/