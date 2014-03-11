// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
icm.controller('IncidentCtrl' ,['$scope', '$modalInstance', 'Core', 'project', function($scope, $modalInstance,  Core, project) {
    $scope.incident = {};
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
    $scope.today = function() {
        $scope.incident.date = new Date();
    };

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };


    if (project === null)
    {
        $scope.id = null;
        $scope.today();
        $scope.incident.name = '';
        $scope.incident.status = $scope.projectStatuses[0];
        $scope.incident.type = $scope.projectTypes[1];
        $scope.isNew = true;
    } else {
        $scope.id = project.id();
        $scope.incident.name = project.data('name');
        $scope.incident.date = project.data('date');
        $scope.incident.status = $scope.projectStatuses[project.data('status').id];
        $scope.incident.type = $scope.projectTypes[project.data('type').id];
        $scope.isNew = false;
    }

    $scope.ok = function () {
        var coreProject;
        if ($scope.id === null) {
            coreProject = Core.projects({_id: Date.now()});
            coreProject.itemStore.loaded.then(function () {

            });
        } else {
            coreProject = Core.projects(  $scope.id + '');
        }
        coreProject.data('name',$scope.incident.name)
            .data('date',$scope.incident.date)
            .data('status',$scope.incident.status)
            .data('type',$scope.incident.type)
            .sync();
        $modalInstance.close('Ok');
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);