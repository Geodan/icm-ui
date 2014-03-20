icm.controller('UserCtrl', ['$scope', '$stateParams', 'Core', 'Utils', function  ($scope, $stateParams, Core, Utils) {    
  $scope.data = Utils;
  $scope.noUser = true;

  $scope.onSelect = function ($item) {
    Core.user($item.name);
    $scope.data.userlist = Core.users();
    $scope.noUser = false;
  };
  
  $scope.data.users = $scope.data.onlineUsers(Core.users(),Core.peers());
  $scope.data.userlist = Core.users();
  $scope.data.peerlist = Core.peers();
  var userstore = Core.userStore();

  var peerstore = Core.peerStore();
  var update = function(){
      $scope.$apply(function(){
            $scope.data.users = $scope.data.onlineUsers(Core.users(),Core.peers());
            $scope.data.userlist = Core.users();
            $scope.data.peerlist = Core.peers();
          });
  };
  //Update de items na een datachange van de itemStore
  peerstore.bind('datachange', function () {
      //Timeout is needed because angular wants it ALWAYS asynchronous
      window.setTimeout(update,10);
  });
  userstore.bind('datachange', function () {
      window.setTimeout(update,10);
  });
}]);