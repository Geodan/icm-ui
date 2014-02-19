/*
Deze functie wrapped de websocket trigger naar angular
*/
/* Make use of itemstore in berichtenCtrl
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

*/
/*
 * Deze angular control gaat over de lijst met berichten in /berichten
 */
icm.controller('FeatureCtrl' , ['$scope',function($scope){
   
       
   //$scope.types = [{filter:'',label:'Alles'},{filter:'feature',label:'feature'}];
}]);
/*
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
*/
