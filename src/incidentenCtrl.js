



/*
 * Deze angular control gaat over de lijst met incidenten in /incidenten
 */
icm.controller('IncidentenCtrl' ,['$scope', 'Core', function($scope, Core){
    console.log('creating IncidentenCtrl');
    
    $scope.project = Core.project();
    var store = Core.projectStore();
    $scope.projecten = Core.projects();
    store.bind('datachange', function () {
        $scope.$apply(function(){
            $scope.projecten = Core.projects();
        })
    })

}]);

