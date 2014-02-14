
icm.controller('BeeldCtrl', ['$scope', '$stateParams', 'Beelden', function  ($scope, $stateParams, Beelden) {
    $scope.beeldType = $stateParams.beeldType;

    $scope.currentBeeld = _(Beelden.beelden).filter(function(d){
        return d.beeld == $scope.beeldType;
    })[0]


}])
/*

item.data.beeld
item.data.beeldonderdeel
item.data.beeldcontent
*/
