var icm = angular.module('icm', ["ui.router",'ui.bootstrap'])
    .run(
      [        '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {

        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ui-sref-active="active }"> will set the <li> // to active whenever
        // 'contacts.list' or one of its decendents is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      }])
    .config(
        [          '$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
  
  
      $urlRouterProvider
        .when("/incidenten/","/incidenten")

      //bij foute url stuur naar het begin
        .otherwise("/")
      
      $stateProvider

        // Hier moet IAAA stuff komen, maar voorlopig moet je een username invullen voor
        // COW
        .state("login", {
            url: "/",
            views: {
                'all': {
                    templateUrl: "templates/login.html",
                }
            },
            controller: "LoginCtrl"
        })

          ////////////////
          // Incidenten //
          ////////////////

        .state('incidenten', {
            // Dit is een lijst met alle beschikbare incidenten
            url: "/incidenten",
            views: {
              'main@': {
                templateUrl: "templates/incidenten.html",
                }
            },

            // zorg dat de scope, state en de incidenten door worden gegeven aan de
            // controller
            controller: 'IncidentenCtrl'
        })

          /////////////////////////
          // Incidenten > Detail //
          /////////////////////////
        
        .state('incidenten.incident', {
            // With abstract set to true, that means this state can not be explicitly activated.
            // It can only be implicitly activated by activating one of it's children.
            abstract: true,
            url: '/:incidentID'
        })

          //////////////////////
          // Incident > Beeld //
          //////////////////////
        

        .state('incidenten.incident.beeld', {
            url: "/:beeldType",
            views: {

              // So this one is targeting the unnamed view within the parent state's template.
              'main@': {
                templateUrl: "templates/beeld.html"
                },
               'sidebar@': {
                templateUrl: "templates/sidebar/beeld.html"
                }
            },
            controller: 'BeeldCtrl'


       
        })

       
    }]);

