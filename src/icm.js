var core;

core = new Cow.core({
  wsUrl: 'wss://websocket.geodan.nl:443/new'
});


core.userStore().loaded.then(function(){
    core.users({_id:'1'}).data('name','Anonymous').sync();
    core.user('1');
});
