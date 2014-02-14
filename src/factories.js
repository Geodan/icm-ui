/*
Deze functie wrapped de websocket trigger naar angular
*/
icm.factory('ItemStore',['$rootScope',function($rootScope) {
    var itemStore;
    if(core.project()) { 
        itemStore = core.project().itemStore();

        return {
            on: function(eventName, fn) {
                itemStore.on(eventName, function(data) {
                    $rootScope.$apply(function() {
                        fn(data);
                    });
                });
            }
        };
    }
    else {
        return {on: function(eventName, fn){}};
    }
}]);

/*
Deze functie wrapped de websocket trigger naar angular
*/
icm.factory('ProjectStore',['$rootScope',function($rootScope) {
    var projectStore = core.projectStore();

    return {
        on: function(eventName, fn) {
            projectStore.on(eventName, function(data) {
                $rootScope.$apply(function() {
                    fn(data);
                });
            });
        }
    };
}]);

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
