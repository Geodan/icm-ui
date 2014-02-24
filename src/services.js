icm.factory('LeafletService',['$rootScope',function($rootScope) {
  var instance = {};
  var _center;
  instance.center = function(center){
          return instance._center = center || instance._center;
  };
  return instance;
}]);
