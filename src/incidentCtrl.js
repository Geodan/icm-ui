/*
Deze functie 
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
icm.controller('IncidentCtrl' ,['$scope','ProjectStore', function($scope,ProjectStore){
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

icm.controller('NavIncidentCtrl' ,['$scope','ProjectStore', function($scope,ProjectStore){
    $scope.projectStore = ProjectStore;
}]);
