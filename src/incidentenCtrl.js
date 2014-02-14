



/*
 * Deze angular control gaat over de lijst met incidenten in /incidenten
 */
icm.controller('IncidentenCtrl' ,['$scope','ProjectStore', function($scope,ProjectStore){
    $scope.projectStore = {};
    ProjectStore.on('datachange',function(data) {
          $scope.projectStore.projects = icm.projects();
    })

    $scope.projectStore.projects = icm.projects();    

    //TODO: momenteel wordt de core.project alleen hier gezet, als je rechtstreeks via een link binennkomt
    //gaat het mis
    $scope.setProject = function(project) {
       ProjectStore.incident = project.data('name')||project.id();
        core.project(project.id());   
        
    }

}]);

