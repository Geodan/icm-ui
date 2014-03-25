/**
    TT: Takes care for the syncronisation overview in login.html
    TODO:
        Make cleaner code
        Add sync info for items in stores
**/

icm.controller('SyncCtrl', ['$scope', '$stateParams', '$location', 'Core', 'Utils', function  ($scope, $stateParams, $location, Core, Utils) {
  $scope.maxprojects = 100; //Total amount to receive
  $scope.maxusers = 100;
  $scope.maxpeers = 100;
  $scope.curprojects = 0; //Amount we already have
  $scope.curusers = 0;
  $scope.curpeers = 0;
  $scope.queuedProjects = 0;
  $scope.queuedUsers = 0;
  $scope.queuedPeers = 0;
  $scope.syncedprojects = 100;
  $scope.syncedusers = 100;
  $scope.syncedpeers = 100;
  
  var update = function(){
      $scope.$apply(function(){
          $scope.curprojects = Core.projects().length; //Increasing, current amount
          $scope.curusers = Core.users().length;
          $scope.curpeers = Core.peers().length;
          $scope.maxprojects = Core.projectStore().syncinfo.numToReceive; //stays the same
          $scope.maxusers = Core.userStore().syncinfo.numToReceive;
          $scope.maxpeers = Core.peerStore().syncinfo.numToReceive;
          $scope.queuedProjects = projectstore.syncinfo.toReceive.length; //decreasing, left to receive
          $scope.queuedUsers = userstore.syncinfo.toReceive.length;
          $scope.queuedPeers = peerstore.syncinfo.toReceive.length;
          
          var totalprojects = $scope.curprojects + $scope.queuedProjects;
          var totalusers = $scope.curusers + $scope.queuedUsers;
          var totalpeers = $scope.curpeers + $scope.queuedPeers;
          
          $scope.syncedprojects =  100 * ($scope.curprojects / totalprojects);
          $scope.syncedusers =  100 * ($scope.curusers / totalusers);
          $scope.syncedpeers =  100 * ($scope.curpeers / totalpeers);
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
      $scope.curusers = Core.users().length;
  });
  userstore.bind('datachange', function () {
      window.setTimeout(update,10);
  });
  
  var peerstore = Core.peerStore();
  peerstore.loaded.then(function(){
      $scope.curpeers = Core.peers().length;
  });
  peerstore.bind('datachange', function () {
      window.setTimeout(update,10);
  });
  
}]);