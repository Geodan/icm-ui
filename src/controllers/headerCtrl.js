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

	$scope.print = function(){
		window.print();
		//workaround for Chrome bug - https://code.google.com/p/chromium/issues/detail?id=141633
		if (window.stop) {
			location.reload(); //triggering unload (e.g. reloading the page) makes the print dialog appear
			window.stop(); //immediately stop reloading
		}
		return false;
	}
	
    function clearProject() {
        Core.peer().data('activeproject', ' ').sync();
        $scope.data.incident = '';
    }

}]);