
// De definities van de verschillende beelden inclusief hun onderdelen
icm.factory('Beelden', ['$rootScope', function( $rootScope ) {
    return {
      reset: function(time) {
        time = time?time:0;
        /* TT: config comes from ./config/xx.json */
        this.beelden = icmconfig.beelden;
        _(this.beelden).each(function(d){
                d.beeld.timestamp = time;
        });
        return this.beelden;
      },
      beelden: []
    };
}]);

/*TT: Cow temporarily moved to a global because signalR breaks from within a factory */
var cow = new Cow.core({
      wsUrl: '/Cow/signalr'
      //wsUrl: 'wss://websocket.geodan.nl:443'
    });   
    cow.userStore().loaded.then(function(){
    //if (!cow.users('1')){
    //    cow.users({_id:'1'}).data('name','Anonymous').sync();
    //}
    //cow.user('1'); //set current user
});
icm.factory('Core', ['$rootScope', function($rootScope) {
   /*
   var cow = new Cow.core({
          wsUrl: '/Cow/signalr'
        });   
    cow.userStore().loaded.then(function(){
        if (!cow.users('1')){
            cow.users({_id:'1'}).data('name','Anonymous').sync();
        }
        cow.user('1'); //set current user
    });
    tmp = cow;
    */
   return cow;

}]);

icm.filter('beeldfilter', function() {
  return function(items,beeld) {
    if(!beeld) {
      return items;
    }
    if(!items) {
      return [];
    }
    return _(items).filter(function(d){
           return d.data('beeld') == beeld; 
    });
  };  
});
icm.filter('onderdeelfilter', function() {
  return function(items,onderdeel) {
    if(!onderdeel) {
      return items;
    }
    return _(items).filter(function(d){
           return d.data('beeldonderdeel') == onderdeel; 
    });
  };
});
icm.filter('berichtfilter', function() {
  return function(items,me,you) {
    if(!items) {
      return [];
    }
    return  _.chain(items).filter(function(d){
           return  ((d.data('van') == me &&  d.data('naar') == you) || (d.data('naar') == me && d.data('van') == you)); 
    }).sortBy('_created').value();
  };
});
icm.filter('filterIncident', function() {
        return function(items, type){
           if(!items) {
            return [];
          }
          return _(items).filter(function(d){
            return (d.data('type')!==undefined && d.data('type').id == type);
          });
        };
      });
icm.factory('Utils', ['$rootScope','Core', function ($rootScope,Core) {
  var cow = Core;
  return {
      nondeleted : function(item) {
        return !item.deleted();
      },      
      beeldcontent: function(item) {
        return item.data('beeldcontent');
      },
      user: "",
      incident: "",
      onlineUsers: function (users,peers) {
        var onlineUsers = [];
        var activeUsers = _(cow.users()).filter(function(d){return !d.deleted();});
        var onlinePeers = _(cow.peers()).filter(function(d){return !d.deleted();});
        var peersByUser = _.groupBy(onlinePeers, function(d){ return d.data('userid');});
        _.each(activeUsers, function(d){
            var user = {};
            user.name = d.id();
            user.timestamp = 0;
            var peers = peersByUser[d.id()];
            user.online = false;
            user.inProject = false;
            if (peers){
                user.online = true;
                var peersProjects = _.map(peers,function(d){return d.data('activeproject');});
                if (cow.project()){
                    user.inProject = _.contains(peersProjects,cow.project().id());
                }
            }
            onlineUsers.push(user);
            //console.log(d.id(),user);
        });
        return onlineUsers;
        /* OBS 
        var activeUsers = _.pluck(_.filter(users,function(d){return !d.deleted()}),'_id');
        var onlinePeers = _.map( _.filter(peers,function(d){return !d.deleted()}),function(d){return d.data('userid')})
        var onlineUsers = [];        
        _.each(activeUsers,function(d){
          var user = {};
          user.online = _.contains(onlinePeers,d);
          user.name = d;
          user.timestamp = 0;
          onlineUsers.push(user)
        });
        return onlineUsers;
        */
      },            
      project: {},
      projectlist: [],
      itemlist: [],
      userlist: [],
      peerlist: [],
      users: [],
      beeldcontentDiff: function(item) {
        if(!item) {
            return '';
        }
        var deltas = item.deltas();
        var oldValue = '';
        for (var i =  deltas.length - 2; i >= 0; i--)
        {
          if (deltas[i].data.beeldcontent !== undefined)
          {
            oldValue = deltas[i].data.beeldcontent;
            break;
          }
        }
        var lastChange =  new Date(item.timestamp());
        lastChange = lastChange.getDate() + '-' + (lastChange.getMonth()+1) + '-' + lastChange.getFullYear() + ' ' + lastChange.getHours() + ':' + (lastChange.getMinutes() < 10 ? '0' + lastChange.getMinutes() : lastChange.getMinutes()); // dd-MM-yyyy HH:mm
        return '<h5><small>Laatste wijziging: ' + lastChange + '</small></h5>' + TextDifference(oldValue, item.data('beeldcontent'));
      }
    }; 

}]);

icm.directive('contenteditable', function() {
  return {
    restrict: 'A', // only activate on element attribute
    require: '?ngModel', // get a hold of NgModelController
    link: function(scope, element, attrs, ngModel) {
      if(!ngModel) {return;} // do nothing if no ng-model
       
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
