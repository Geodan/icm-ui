



/*
 * Deze angular control gaat over de lijst met incidenten in /incidenten
 */
icm.controller('IncidentenCtrl' ,['$scope', 'Core', function($scope, Core){
    console.log('creating IncidentenCtrl');
    
    $scope.project = Core.project(); //Get current project
    var store = Core.projectStore(); //Get projectstore
    $scope.projecten = Core.projects(); //Get list of projects
    //Bind storechange to angular DOM
    store.bind('datachange', function () {
        $scope.$apply(function(){
            $scope.projecten = Core.projects();
        })
    })
    //Set the current project
    $scope.setProject = function(project) {
        //$scope.incident = project.data('name')||project.id();
        Core.project(project.id());   
        
    };

}]);

