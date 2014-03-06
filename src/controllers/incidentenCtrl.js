/*
 * Deze angular control gaat over de lijst met incidenten in /incidenten
 */
icm.controller('IncidentenCtrl' ,['$scope', 'Core', 'Utils', 'Beelden', 'LeafletService', function($scope, Core, Utils, Beelden, LeafletService){
    $scope.data= Utils;    
    $scope.data.project = Core.project(); //Get current project
    var store = Core.projectStore(); //Get projectstore    

    //zet de 
    $scope.data.projectlist = Core.projects()
    //Bind storechange to angular DOM
    store.bind('datachange', function () {
        $scope.$apply(function(){
            $scope.data.projectlist = Core.projects();
        })
    })
    
    //Set the current project
    $scope.setProject = function(project) {

        Core.project(project.id()); 
        $scope.data.incident=project.data('name');
        $scope.data.project = project;
        var itemstore = project.itemStore();
        $scope.data.itemlist = project.items();        
        itemstore.bind('datachange', function () {
            $scope.$apply(function(){
                $scope.data.itemlist = project.items(); 
            })
        });

        //$scope.incident = project.data('name')||project.id();
        Beelden.beelden = [
        { beeld: 'situatie', title: 'Situatie', timestamp: 0, beeldonderdeel: 
            [   {id:'situatie', title: 'Situatie', isedit: false, zeker: true}
            ]}    
        ,{ beeld: 'meldingen', title: 'Meldingen', timestamp: 0, beeldonderdeel: 
            [   {title:'Tijdlijn',id:'Tijdlijn', isedit: false, zeker: true},
                {title:'Meldingen beeld',id:'meldingen' , isedit: false, zeker: true},
                {title: 'Acute meldingen', id:'acuut', isedit: false, zeker: true},
                {title: 'Situatie Plaats Incident',id: 'spi', isedit: false, zeker: true} ,
                {title: 'Genomen acties',id:'acties' , isedit: false, zeker: true}
            ]}
        ,{ beeld: 'wat', title: 'Operationeel (WAT)', timestamp: 0, beeldonderdeel: 
            [   {title:'Tijdlijn',id:'tijdlijn', isedit: false, zeker: true},
                {title:'Beeldvorming',id:'beeldvorming', isedit: false, zeker: true},
                {title:'Oordeelsvorming',id:'oordeelsvorming', isedit: false, zeker: true},
                {title:'Besluitsvorming',id:'besluitsvorming', isedit: false, zeker: true},
                {title:'Knelpunten',id:'knelpunten', isedit: false, zeker: true},
                {title:'Acties/maatregelen',id:'maatregelen', isedit: false, zeker: true},
                {title:'Veiligheid medewerkers',id:'veiligheid', isedit: false, zeker: true},
                {title:'Prognose (verwachting)',id:'prognose', isedit: false, zeker: true}
            ]}
        ,{ beeld: 'wot', title: 'Tactisch (WOT)', timestamp: 0, beeldonderdeel:
            [   {title:'Tijdlijn',id:'tijdlijn', isedit: false, zeker: true},
                {title:'Beeldvorming',id:'beeldvorming', isedit: false, zeker: true},
                {title:'Oordeelsvorming',id:'oordeelsvorming', isedit: false, zeker: true},
                {title:'Besluitsvorming',id:'besluitsvorming', isedit: false, zeker: true},
                {title:'Knelpunten',id:'knelpunten', isedit: false, zeker: true},
                {title:'Acties/maatregelen',id:'maatregelen', isedit: false, zeker: true},              
                {title:'Prognose (verwachting)',id:'prognose', isedit: false, zeker: true}
            ]}              
        ,{ beeld: 'wbt', title: 'Strategisch (WBT)', timestamp: 0, beeldonderdeel: 
            [   {title:'Tijdlijn',id:'tijdlijn', isedit: false, zeker: true},
                {title:'Beeldvorming',id:'beeldvorming', isedit: false, zeker: true},
                {title:'Oordeelsvorming',id:'oordeelsvorming', isedit: false, zeker: true},
                {title:'Besluitsvorming',id:'besluitsvorming', isedit: false, zeker: true},
                {title:'Knelpunten',id:'knelpunten', isedit: false, zeker: true},
                {title:'Acties/maatregelen',id:'maatregelen', isedit: false, zeker: true},              
                {title:'Prognose (verwachting)',id:'prognose', isedit: false, zeker: true}
            ]}
        ,{ beeld: 'scenarios', title: 'Scenario\'s', timestamp: 0, beeldonderdeel: 
            [   {title:'Meest waarschijnlijk',id:'meest', isedit: false, zeker: true},
                {title:'Minder waarschijnlijk',id:'minder', isedit: false, zeker: true},
                {title:'Minst waarschijnlijk',id:'minst', isedit: false, zeker: true}
            ]}
        ,{ beeld: 'communicatie', title: 'Communicatie', timestamp: 0, beeldonderdeel: 
            [   {title:'Kernboodschap',id:'kernboodschap', isedit: false, zeker: true},
                {title:'Omgevingsbeeld',id:'omgevingsbeeld', isedit: false, zeker: true},
                {title:'Communicatie vanuit het waterschap',id:'extern', isedit: false, zeker: true},
                {title:'Communicatie intern het waterschap',id:'intern', isedit: false, zeker: true}
            ]}
    ];
          
         LeafletService.reset();
    };
    

}]);

