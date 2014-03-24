/*
 * Deze angular control gaat over de lijst met incidenten in /incidenten
 */
icm.controller('IncidentenCtrl' ,['$scope', 'Core', 'Utils', 'Beelden', '$state', 'LeafletService', function($scope, Core, Utils, Beelden, $state, LeafletService){
    $scope.data= Utils;    
    $scope.data.project = Core.project(); //Get current project
    var store = Core.projectStore(); //Get projectstore    

    $scope.firstBeeld = icmconfig.beelden[0].beeld; //set first beeld as default beeld

    //zet de
    $scope.data.projectlist = Core.projects();
    //Bind storechange to angular DOM
    store.bind('datachange', function () {
        $scope.$apply(function(){
            $scope.data.projectlist = Core.projects();
        });
    });

    var newItems = function() {
         _(Beelden.beelden).each(function(b){
             var items =   _($scope.data.itemlist).filter(function(d){ return d.data('beeld') == b.beeld; });             
             var updated = false;
             _(items).each(function(item){
                 if (item._updated > b.timestamp) {
                    updated = true;                 
                }

             });
             b.updated = updated;
        });
        
        
        _($scope.data.users).each(function(u){
            var updated =false;
            var berichten = _($scope.data.itemlist).filter(function(d){ 
                return (d.data('naar') == $scope.data.user && d.data('van') == u.name );
            }); 
            _(berichten).each(function(msg){
                if(msg._updated > u.timestamp) {
                    updated = true;
                }
                u.updated = updated;
            });
        });
    };

    //Set the current project
    $scope.setProject = function(project) {
        //Unbind the listener to the old itemStore, otherwhise we mess up stores
        if ($scope.data.project){
            $scope.data.project.itemStore().unbind('datachange');
        }
        Core.project(project.id()); 
        $scope.data.incident=project.data('name');
        $scope.data.project = project;
        var itemstore = project.itemStore();
        $scope.data.itemlist = project.items();        
        itemstore.bind('datachange', function () {
            $scope.$apply(function(){
                $scope.data.itemlist = project.items();
                newItems();
            });
        });

        //$scope.incident = project.data('name')||project.id();
         Beelden.reset(new Date().getTime());
        // Beelden.reset(); 
         LeafletService.reset();
         newItems();
    };
    

}]);

