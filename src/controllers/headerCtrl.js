icm.controller('HeaderCtrl', ['$scope', '$location', 'Utils', function  ($scope, $location, Utils) {
    $scope.data = Utils;

    $scope.goToIncidents = function(){
        $scope.data.incident = '';
        $location.path('/incidenten');
    };

    $scope.goToLogout= function(){
        $scope.data.incident = '';
        $location.path('/user');
    };

    $scope.goHome = function(){
        $scope.data.incident = '';
        $location.path('/login');
    };

}]);