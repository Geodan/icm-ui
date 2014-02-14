


/*
 * Deze angular control gaat over de lijst met berichten in /berichten
 */
icm.controller('BerichtCtrl' , ['$scope','ItemStore',function($scope,ItemStore){
    $scope.itemStore = {};

    ItemStore.on('datachange',function(data) {
          $scope.itemStore.items = icm.messages();
    });
    $scope.itemStore.items = icm.messages();
       
   //$scope.types = [{filter:'',label:'Alles'},{filter:'feature',label:'feature'}];
}]);

icm.filter('beeldType',function(){
    return function(input,filter) {
        if(filter) {
            return _(input).filter(function(d){
                   return d.data('beeldType') == filter; 
            });
        }
        else {
            return input;
        }
    };
});
