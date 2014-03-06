icm.controller('UserCtrl', ['$scope', '$stateParams', 'Core', 'Utils', function  ($scope, $stateParams, Core, Utils) {    
  $scope.data = Utils;

  $scope.onSelect = function ($item) {
    
    Core.user($item.name);
    $scope.data.userlist = Core.users();
    
    
    
  };
  
  $scope.data.users = $scope.data.onlineUsers(Core.users(),Core.peers());
  $scope.data.userlist = Core.users();
  $scope.data.peerlist = Core.peers();
  var userstore = Core.userStore();
 
  
  var peerstore = Core.peerStore();
    
    
    //Update de items na een datachange van de itemStore
    peerstore.bind('datachange', function () {
        $scope.$apply(function(){
           $scope.data.users = $scope.data.onlineUsers(Core.users(),Core.peers());
            $scope.data.userlist = Core.users();
            $scope.data.peerlist = Core.peers();
        });
    });
            
  

   
   

}]);