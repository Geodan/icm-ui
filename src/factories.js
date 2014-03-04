// De definities van de verschillende beelden inclusief hun onderdelen
icm.factory('Beelden', ['$rootScope',function($rootScope) {
    var data = {};
    data.beelden = [
        { beeld: 'situatie', title: 'Situatie', timestamp: 0, beeldonderdeel: 
        	[	{id:'situatie', title: 'Situatie'}
        	]}    
        ,{ beeld: 'meldingen', title: 'Meldingen', timestamp: 0, beeldonderdeel: 
        	[	{title:'Tijdlijn',id:'Tijdlijn'},
        		{title:'Meldingen beeld',id:'meldingen' },
        		{title: 'Acute meldingen', id:'acuut'},
        		{title: 'Situatie Plaats Incident',id: 'spi'} ,
        		{title: 'Genomen acties',id:'acties' }
    		]}
        ,{ beeld: 'wat', title: 'Operationeel (WAT)', timestamp: 0, beeldonderdeel: 
       		[	{title:'Tijdlijn',id:'tijdlijn'},
       			{title:'Beeldvorming',id:'beeldvorming'},
       			{title:'Oordeelsvorming',id:'oordeelsvorming'},
       			{title:'Besluitsvorming',id:'besluitsvorming'},
       			{title:'Knelpunten',id:'knelpunten'},
       			{title:'Acties/maatregelen',id:'maatregelen'},
       			{title:'Veiligheid medewerkers',id:'veiligheid'},
       			{title:'Prognose (verwachting)',id:'prognose'}
   			]}
        ,{ beeld: 'wot', title: 'Tactisch (WOT)', timestamp: 0, beeldonderdeel:
         	[	{title:'Tijdlijn',id:'tijdlijn'},
       			{title:'Beeldvorming',id:'beeldvorming'},
       			{title:'Oordeelsvorming',id:'oordeelsvorming'},
       			{title:'Besluitsvorming',id:'besluitsvorming'},
       			{title:'Knelpunten',id:'knelpunten'},
       			{title:'Acties/maatregelen',id:'maatregelen'},       		
       			{title:'Prognose (verwachting)',id:'prognose'}
   			]}   			
        ,{ beeld: 'wbt', title: 'Strategisch (WBT)', timestamp: 0, beeldonderdeel: 
        	[	{title:'Tijdlijn',id:'tijdlijn'},
       			{title:'Beeldvorming',id:'beeldvorming'},
       			{title:'Oordeelsvorming',id:'oordeelsvorming'},
       			{title:'Besluitsvorming',id:'besluitsvorming'},
       			{title:'Knelpunten',id:'knelpunten'},
       			{title:'Acties/maatregelen',id:'maatregelen'},       		
       			{title:'Prognose (verwachting)',id:'prognose'}
   			]}
        ,{ beeld: 'scenarios', title: 'Scenario\'s', timestamp: 0, beeldonderdeel: 
        	[	{title:'Meest waarschijnlijk',id:'meest'},
        		{title:'Minder waarschijnlijk',id:'minder'},
        		{title:'Minst waarschijnlijk',id:'minst'}
    		]}
        ,{ beeld: 'communicatie', title: 'Communicatie', timestamp: 0, beeldonderdeel: 
        	[	{title:'Kernboodschap',id:'kernboodschap'},
        		{title:'Omgevingsbeeld',id:'omgevingsbeeld'},
        		{title:'Communicatie vanuit het waterschap',id:'extern'},
        		{title:'Communicatie intern het waterschap',id:'intern'}
    		]}
    ];
    return data;
}]);

icm.factory('Core', ['$rootScope', function($rootScope) {
   
   var cow = new Cow.core({
          wsUrl: 'wss://websocket.geodan.nl:443/icms'
        });   
    cow.userStore().loaded.then(function(){
        if (!cow.users('1')){
            cow.users({_id:'1'}).data('name','Anonymous').sync();
        }
        cow.user('1'); //set current user
    });
   return cow;

}]);

icm.factory('Utils', ['$rootScope', function ($rootScope) {
  return {
     filter: function (items,beeld) { 
        return _(items).filter(function(d){
           return d.data('beeld') == beeld; 
        });

      },
      user: "",
      incident: ""
    }; 

}]);

icm.directive('contenteditable', function() {
  return {
    restrict: 'A', // only activate on element attribute
    require: '?ngModel', // get a hold of NgModelController
    link: function(scope, element, attrs, ngModel) {
      if(!ngModel) return; // do nothing if no ng-model
       
      // Specify how UI should be updated
      ngModel.$render = function() {
        element.html(ngModel.$viewValue || '');
      };
      // Write data to the model
      function read() {
        var html = element.html();
        // When we clear the content editable the browser leaves a <br> behind
        // If strip-br attribute is provided then we strip this out
        if( attrs.stripBr && html == '<br>' ) {
          html = '';
        }
        ngModel.$setViewValue(html);
      }
     
      // Listen for change events to enable binding
      element.on('blur keyup change', function() {
        scope.$apply(read);
      });
      read(); // initialize
    }
  };
});
