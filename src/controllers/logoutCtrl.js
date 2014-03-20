icm.controller('LogoutCtrl', ['$scope', '$location', 'Core', 'Utils', function ($scope, $location, Core, Utils) {
    $scope.data = Utils;

    console.log('LogoutCtrl');

    $scope.logout = function () {
        $scope.data.user = '';
        Core.user('');
        $location.path('/login');
    }
}]);
