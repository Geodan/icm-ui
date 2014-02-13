/*
Deze functie wrapped de websocket trigger naar angular
*/
icm.factory('ItemStore',['$rootScope',function($rootScope) {
    var itemStore;
    if(core.project()) { 
        itemStore = core.project().itemStore();

        return {
            on: function(eventName, fn) {
                itemStore.on(eventName, function(data) {
                    $rootScope.$apply(function() {
                        fn(data);
                    });
                });
            }
        };
    }
    else {
        return {on: function(eventName, fn){}};
    }
}]);


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

icm.filter('type',function(){
    return function(input,filter) {
        if(filter) {
            return _(input).filter(function(d){
                   return d.data('type') == filter; 
            });
        }
        else {
            return input;
        }
    };
});
