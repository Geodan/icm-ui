

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

/*
 * Deze angular control gaat over de lijst met incidenten in /incidenten
 */
icm.controller('IncidentenCtrl' ,['$scope','ProjectStore', function($scope,ProjectStore){
    $scope.projectStore = {};
    ProjectStore.on('datachange',function(data) {
          $scope.projectStore.projects = icm.projects();
    })

    $scope.projectStore.projects = icm.projects();    

    $scope.setProject = function(project) {
       ProjectStore.incident = project.data('name')||project.id();
        core.project(project.id());   
        
    }

}]);

