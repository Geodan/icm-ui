icm.controller('HeaderCtrl', ['$scope', '$location', 'Core', 'Utils', function  ($scope, $location, Core, Utils) {
    $scope.data = Utils;

    $scope.goToIncidents = function(){
        clearProject();
        $location.path('/incidenten');
    };

    $scope.goToLogout= function(){
        clearProject();
        $location.path('/user');
    };

    $scope.goHome = function(){
        clearProject();
        $location.path('/login');
    };

    function clearProject() {
        Core.peer().data('activeproject', ' ').sync();
        $scope.data.incident = '';
    }

}]);