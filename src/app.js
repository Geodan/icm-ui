var eagle = angular.module('eagle', ["ui.router",'ui.bootstrap'])

eagle.config(function($stateProvider, $urlRouterProvider){
  
  // For any unmatched url, send to /route1
  $urlRouterProvider.otherwise("/")
  
  $stateProvider
    .state('incidenten', {
        url: "/incidenten",
        templateUrl: "templates/incidenten.html"
    })
                
    .state('berichten', {
        url: "/berichten",
        templateUrl: "templates/berichten.html"
    })

    .state('kaart', {
        url: "/kaart",
        templateUrl: "templates/kaart.html"
    })

    .state('uitloggen', {
        url: "/uitloggen",
        templateUrl: "templates/uitloggen.html"
    })

    .state('help', {
        url: "/help",
        templateUrl: "templates/help.html"
    })
      
})