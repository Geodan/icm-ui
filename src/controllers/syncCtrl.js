icm.controller('SyncCtrl', ['$scope', '$stateParams', '$location', 'Core', 'Utils', function  ($scope, $stateParams, $location, Core, Utils) {
  $scope.maxprojects = 100; //Total amount to receive
  $scope.maxusers = 100;
  $scope.curprojects = 0; //Amount we already have
  $scope.curusers = 0;
  $scope.queuedProjects = 0;
  $scope.queuedUsers = 0;
  $scope.syncedprojects = 100;
  $scope.syncedusers = 100;
  
  var update = function(){
      $scope.$apply(function(){
          $scope.curprojects = Core.projects().length; //Increasing, current amount
          $scope.curusers = Core.users().length;
          $scope.maxprojects = Core.projectStore().syncinfo.numToReceive; //stays the same
          $scope.maxusers = Core.userStore().syncinfo.numToReceive;
          $scope.queuedProjects = projectstore.syncinfo.toReceive.length; //decreasing, left to receive
          $scope.queuedUsers = userstore.syncinfo.toReceive.length;
          
          var totalprojects = $scope.curprojects + $scope.queuedProjects;
          var totalusers = $scope.curusers + $scope.queuedUsers;
          
          $scope.syncedprojects =  100 * ($scope.curprojects / totalprojects);
          $scope.syncedusers =  100 * ($scope.curusers / totalusers);
      });
  };

  
  var projectstore = Core.projectStore();
  projectstore.loaded.then(function(){
      $scope.curprojects = Core.projects().length;
  });
  projectstore.bind('datachange', function () {
      window.setTimeout(update,10);
  });
  
  var userstore = Core.userStore();
  userstore.loaded.then(function(){
      $scope.curprojects = Core.projects().length;
  });
  userstore.bind('datachange', function () {
      window.setTimeout(update,10);
  });
  
}]);