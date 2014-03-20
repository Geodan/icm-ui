icm.controller('UserCtrl', ['$scope', '$stateParams', '$location', 'Core', 'Utils', function  ($scope, $stateParams, $location, Core, Utils) {
  $scope.data = Utils;
  $scope.loginName = '';
  $scope.noUser = true;
  $scope.confirmNewUser = false;

  $scope.onSelect = function ($item) {
    $scope.loginName = $item.name;
    $scope.noUser = $scope.username === '';
  };

  $scope.login = function() {
      var user = Core.users($scope.loginName);
      //check if user is default user (there was no user found with the chosen login name
      if (!user) {
          $scope.confirmNewUser = true;
      } else {
          setUser(user);
      }
  };

  $scope.newUser = function () {
      var user = Core.users({_id: $scope.loginName});
      setUser(user);
  };

  $scope.newUserCancel = function (){
      $scope.loginName = '';
      $scope.confirmNewUser = false;
  };

  function setUser(user) {
    Core.user(user.id());
    $scope.data.user = user.data('name');
    $scope.data.userlist = Core.users();
    $location.path('/incidenten');
  }

  $scope.data.users = $scope.data.onlineUsers(Core.users(),Core.peers());
  $scope.data.userlist = Core.users();
  $scope.data.peerlist = Core.peers();

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

  var userstore = Core.userStore();
  userstore.bind('datachange', function () {
      window.setTimeout(update,10);
  });
}]);