icm.controller('SyncCtrl', ['$scope', '$stateParams', '$location', 'Core', 'Utils', function  ($scope, $stateParams, $location, Core, Utils) {
  $scope.maxprojects = 100;
  $scope.maxusers = 100;
  
  var update = function(){
      $scope.$apply(function(){
          $scope.maxprojects = Core.projectStore().syncinfo.numToReceive;
          $scope.maxusers = Core.userStore().syncinfo.numToReceive;
          $scope.syncedprojects =  100 - 100 * (Core.projectStore().syncinfo.toReceive.length / Core.projectStore().syncinfo.numToReceive);
          $scope.syncedusers =  100 - 100 * (Core.userStore().syncinfo.toReceive.length / Core.userStore().syncinfo.numToReceive);
      });
  };

  //Update de items na een datachange van de itemStore
  var projectstore = Core.projectStore();
  projectstore.bind('datachange', function () {
      window.setTimeout(update,10);
  });
  
  var userstore = Core.userStore();
  userstore.bind('datachange', function () {
      window.setTimeout(update,10);
  });
  
}]);