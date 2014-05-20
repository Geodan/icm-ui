

var startSmokeModels = function(){
	//var sidebarleft = d3.select('.alles').append('div').attr('id', 'sidebarright');
	//sidebarleft.append('div').attr('id','rulerright');
	//sidebarleft.append('div').attr('id','models').html('<h4>Models</h4>');
	d3.select('#sidebarright').call(icmmodels.SmokeModelUi);
	//d3.select('#sidebarright #rulerright').on('click',function(d){
	//  var me = d3.select('#sidebarright');
	//  var newwidth;
	//  if (me.style('left') == '0px'){
	//	  newwidth = '325px';
	//  }
	//  else {
	//	  newwidth = '0px';
	//  }
	//  me.transition().style('left',newwidth);
	//});
};

var icmconfig = {
  "crs": L.CRS.EPSG3857,
  "center": {
        lat: 52.752087, //Approx HHNK
        lng: 4.896941,
        zoom: 5
  },
  "beelden":[
        { beeld: 'summary', title: 'Samenvatting', timestamp: 0, beeldonderdeel: 
          [ {id:'situatie', title: 'Situatie', isedit: false, zeker: true}
          ]}          
        ,{ beeld: 'populatie', title: 'Populatie', timestamp: 0, beeldonderdeel: 
          [ {title:'Samenvatting',id:'samenvatting', isedit: false, zeker: true}
        ]}
        ,{ beeld: 'evacuatie', title: 'Evacutatie', timestamp: 0, beeldonderdeel:
          [ {title:'Samenvatting',id:'samenvatting', isedit: false, zeker: true}
        ]}        
        ,{ beeld: 'opvang', title: 'Opvang', timestamp: 0, beeldonderdeel: 
          [ {title:'Samenvatting',id:'samenvatting', isedit: false, zeker: true}
        ]}         
        ,{ beeld: 'comms', title: 'Communicatie', timestamp: 0, beeldonderdeel: 
          [ {title:'Samenvatting',id:'kernboodschap', isedit: false, zeker: true}
        ]}
   ],
   drawstyles:{
      linestyles:  [
        {stroke: '#000'},
        {stroke: '#f57900'},
        {stroke: '#204a87'},
        {stroke: '#cc0000'},
        {stroke: '#5c3566'},
        {stroke: '#4e9a06'}],
      polygonstyles: [
        {stroke: '#000'   ,fill: '#000'  },
        {stroke: '#f57900',fill: '#f57900'},
        {stroke: '#204a87',fill: '#204a87'},
        {stroke: '#cc0000',fill: '#cc0000'},
        {stroke: '#5c3566',fill: '#5c3566'},
        {stroke: '#4e9a06',fill: '#4e9a06'}],
      icontypes:[
         {"cat":"none", "text":"ZW", "url":"mapicons/direction_downleft.png"}
        ,{"cat":"none", "text":"Z","url":"mapicons/direction_down.png"}
        ,{"cat":"none", "text":"ZO","url":"mapicons/direction_downright.png"}
        ,{"cat":"none", "text":"O","url":"mapicons/direction_left.png"}
        ,{"cat":"none", "text":"W","url":"mapicons/direction_right.png"}
        ,{"cat":"none", "text":"NW","url":"mapicons/direction_upleft.png"}
        ,{"cat":"none", "text":"N","url":"mapicons/direction_up.png"}
        ,{"cat":"none", "text":"NO","url":"mapicons/direction_upright.png"}
        ,{"cat":"none", "text":"Afgesloten","url":"mapicons/accesdenied.png"}
        ,{"cat":"none", "text":"Let op!","url":"mapicons/caution.png"}
        ,{"cat":"none", "text":"Groepsvervoer","url":"mapicons/bus.png"}
        ,{"cat":"none", "text":"Parkeerplaats","url":"mapicons/parkinggarage.png"}
        ,{"cat":"none", "text":"EHBO","url":"mapicons/firstaid.png"}
        ,{"cat":"none", "text":"Noodtelefoon","url":"mapicons/emergencyphone.png"}
        ,{"cat":"none", "text":"Ambulancepost","url":"mapicons/ambulance.png"}
        ,{"cat":"none", "text":"Ziekenhuis","url":"mapicons/hospital-building.png"}
        ,{"cat":"none", "text":"Apotheek","url":"mapicons/medicine.png"}
        ,{"cat":"none", "text":"School","url":"mapicons/school.png"}
        ,{"cat":"none", "text":"Zaal","url":"mapicons/communitycentre.png"}
        ,{"cat":"none", "text":"Verzorgingstehuis","url":"mapicons/seniorsite.png"}
        ,{"cat":"none", "text":"none","url":"mapicons/family.png"}
        ,{"cat":"none", "text":"Kinderopvang","url":"mapicons/daycare.png"}
        ,{"cat":"none", "text":"Calamiteit","url":"mapicons/blast.png"}
        ,{"cat":"none", "text":"Dodelijke slachtoffers","url":"mapicons/skull.png"}
        ,{"cat":"none", "text":"Schade aan huis","url":"mapicons/earthquake-3.png"}
        ,{"cat":"none", "text":"Stroomuitval","url":"mapicons/poweroutage.png"}
        ,{"cat":"none", "text":"Brand","url":"mapicons/fire.png"}
        ,{"cat":"none", "text":"Overstroming","url":"mapicons/flood.png"}
        ,{"cat":"none", "text":"Radio zender","url":"mapicons/radio-station-2.png"}
        ,{"cat":"none", "text":"Verzamelpunt","url":"mapicons/regroup.png"}
        ,{"cat":"none", "text":"Netwerk","url":"mapicons/wifi.png"}
        ,{"cat":"none", "text":"Groep mensen","url":"mapicons/group-2.png"}
        ,{"cat":"none", "text":"Brandweer","url":"mapicons/firemen.png"}
        ,{"cat":"none", "text":"Politie","url":"mapicons/police.png"}
        ,{"cat":"none", "text":"Camera","url":"mapicons/cctv.png"}
        ,{"cat":"none", "text":"Gemeentehuis","url":"mapicons/moderntower.png"}
        ,{"cat":"none", "text":"Commentaar","url":"mapicons/comment-map-icon.png"}
        ,{"cat":"none", "text":"Happy","url":"mapicons/smiley_happy.png"}
      ]
   },
  "definedlayers":{
      osm: {
                name: "Openstreetmap",
                url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                type: 'xyz'
            },
     osm_grey: {
          name: 'OSM grey',
          url: 'http://a.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png',
          type: 'xyz'
      }
  },
  "layers":
  {
      "ahn1": {"type": "overlay", "category": "Terrein", "layer": {"type":"betterwms","visible":true,"name":"Hoogtekaart","url":"http://t3.edugis.nl/tiles/tilecache.py?map=maps/edugis/cache/hoogte.map","layerOptions":{"layers":"hoogtes","format":"image/png","transparent":true,"opacity":0.8}}}
  }
};


var addGeofortLayers = function(LeafletService,map){
    
};

