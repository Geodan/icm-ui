// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

icm.controller('IncidentCtrl' ,['$scope', 'Core', '$stateParams', '$location', '$http', 'leafletData', function($scope, Core, $stateParams, $location, $http,leafletData) {

    var project = null;
    /** MAP CONTROLLERS **/
    $scope.projection =  icmconfig.crs;
    
    angular.extend($scope, {
            center: icmconfig.center,
            defaults: {
                crs: $scope.projection,
                maxZoom: 10
            }
    });
    $scope.layers = {
        baselayers: icmconfig.definedlayers
    };
    $scope.incident = {};
    $scope.isNew = true;
    $scope.isEditable = true;
    $scope.showDeleteConfirm = false;
    $scope.projectTypes =
        [
            { id: 0, name: "LIVE" },
            { id: 1, name: "Oefening" }
        ];
    $scope.projectStatuses =
        [
            { id: 0, name: "Actief" },
            { id: 1, name: "Gepland" },
            { id: 2, name: "Gesloten" }
        ];

    /* Datepicker configuration */
    $scope.dateOptions = {
        'starting-day': 1
    };
    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };
    
    
    if ($stateParams.incidentID != undefined)
    {
        if(!Core.project()) return false;
        //TODO: hier moet je of terug gestuurd worden naar incidenten of netjes met een promise oid alsnog alle gegevens zetten

        project = Core.projects($stateParams.incidentID + '');
    }

    if (project === null)
    {
        $scope.id = null;
        $scope.incident.date = new Date();
        $scope.incident.name = '';
        $scope.incident.status = $scope.projectStatuses[0];
        $scope.isPlanned = false;
        $scope.incident.type = $scope.projectTypes[1];
        $scope.isNew = true;
        $scope.initcenter = {
                lat: icmconfig.center.lat,  //52.752087, //Approx HHNK
                lng: icmconfig.center.lng,  //4.896941,
                zoom: icmconfig.center.zoom //5
            };
    } else {
        $scope.id = project.id();
        $scope.incident.name = project.data('name');
        $scope.incident.date = project.data('date');
        $scope.incident.status = project.data('status') === undefined ? $scope.projectStatuses[0] : $scope.projectStatuses[project.data('status').id];
        $scope.incident.type = project.data('type') === undefined ? $scope.projectTypes[1] : $scope.projectTypes[project.data('type').id];
        $scope.isPlanned = $scope.incident.status.id === 1;
        $scope.isNew = false;
        $scope.isEditable = false;
        $scope.initcenter = project.data('incidentlocation') || {
                lat: icmconfig.center.lat,    //52.752087, //Approx HHNK
                lng: icmconfig.center.lng,    //4.896941,
                zoom: icmconfig.center.zoom   //5
            };
    }

    $scope.changeStatus = function() {
        $scope.isPlanned = $scope.incident.status.id === 1;
        console.log('change: ' + $scope.isPlanned);
    };

    $scope.setEditable = function() {
        $scope.isEditable = true;
    };

    leafletData.getMap('map1').then(function(map) {
        //Set correct projection for map
        map.options.crs = $scope.projection;
        map.setView([$scope.initcenter.lat, $scope.initcenter.lng],$scope.initcenter.zoom);
    });
    /** END OF MAP **/
    
    $scope.ok = function () {
        var coreProject;
        if ($scope.incident.name === '') {

            return false;
        }
        if ($scope.id === null) {
            coreProject = Core.projects({_id: Date.now()});
            coreProject.itemStore().loaded.then(function () {
                //load all mapLayers
                var layers = icmconfig.layers;
                _.each(layers, function(d,k){
                    coreProject.items({
                        _id:k,
                        data: d
                    }).deleted(false).sync();
                });
                /*
                $http.get('./config/kaartlagen.json')
                    .then(function(res){
                        var layers = res.data;
                        _.each(layers, function(d,k){
                            coreProject.items({
                                _id:k,
                                data: d
                            }).deleted(false).sync();
                        });
                    });
                    */
            });
        } else {
            coreProject = Core.projects(  $scope.id + '');
        }

        if (($scope.isNew || $scope.isPlanned) && coreProject.data('date') !== $scope.incident.date ) {
            coreProject.data('date', $scope.incident.date.toISOString());
        }
        
        /* TT: For some reason the controller cannot keep track of the map-object
        therefore we have to get it again from the leafletdata-directive */
        leafletData.getMap('map1').then(function(map) {
            var mapcenter = map.getCenter();
            var mapzoom = map.getZoom();
            var incidentlocation = {
                lat: mapcenter.lat, 
                lng:mapcenter.lng,
                zoom: mapzoom
            };
            coreProject.data('name',$scope.incident.name)
                .data('status',$scope.incident.status)
                .data('type',$scope.incident.type)
                .data('incidentlocation',incidentlocation)
                .sync();
            $location.path('/incidenten');
        });

        coreProject.data('name',$scope.incident.name)
            .data('status',$scope.incident.status)
            .data('type',$scope.incident.type)
            .sync();
        $location.path('/incidenten');
        return true;
    };

    $scope.deletePreview = function() {
        $scope.showDeleteConfirm = true;
    };
    $scope.deleteCancel = function() {
        $scope.showDeleteConfirm = false;
    };
    $scope.deleteIncident = function() {
        var coreProject = Core.projects(  $scope.id + '');
        coreProject.deleted(true).sync();
        $location.path('/incidenten');
    };
}]);