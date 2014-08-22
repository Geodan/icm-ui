var icmconfig = {
  "crs": L.CRS.EPSG3857,
  "center": {
        lat: 52.752087, //Approx HHNK
        lng: 4.896941,
        zoom: 5
  },
  "beelden":[
        { beeld: 'summary', title: 'Summary', timestamp: 0, beeldonderdeel: 
          [ {id:'situatie', title: 'Situation', isedit: false, zeker: true}
          ]}    
        ,{ beeld: 'wat', title: 'Water operational', timestamp: 0, beeldonderdeel: 
          [ {title:'Timeline',id:'tijdlijn', isedit: false, zeker: true},
            {title:'Overview',id:'beeldvorming', isedit: false, zeker: true},
            {title:'Judgement',id:'oordeelsvorming', isedit: false, zeker: true},
            {title:'Decisions',id:'besluitsvorming', isedit: false, zeker: true},
            {title:'Bottlenecks',id:'knelpunten', isedit: false, zeker: true},
            {title:'Actions',id:'maatregelen', isedit: false, zeker: true},          
            {title:'Prognosis',id:'prognose', isedit: false, zeker: true},
            {title:'Safety',id:'veiligheid', isedit: false, zeker: true}
        ]}
        ,{ beeld: 'wot', title: 'Water tactical', timestamp: 0, beeldonderdeel:
          [ {title:'Timeline',id:'tijdlijn', isedit: false, zeker: true},
            {title:'Overview',id:'beeldvorming', isedit: false, zeker: true},
            {title:'Judgement',id:'oordeelsvorming', isedit: false, zeker: true},
            {title:'Decisions',id:'besluitsvorming', isedit: false, zeker: true},
            {title:'Bottlenecks',id:'knelpunten', isedit: false, zeker: true},
            {title:'Actions',id:'maatregelen', isedit: false, zeker: true},          
            {title:'Prognosis',id:'prognose', isedit: false, zeker: true}
        ]}        
        ,{ beeld: 'wbt', title: 'Water strategic', timestamp: 0, beeldonderdeel: 
          [ {title:'Timeline',id:'tijdlijn', isedit: false, zeker: true},
            {title:'Overview',id:'beeldvorming', isedit: false, zeker: true},
            {title:'Judgement',id:'oordeelsvorming', isedit: false, zeker: true},
            {title:'Decisions',id:'besluitsvorming', isedit: false, zeker: true},
            {title:'Bottlenecks',id:'knelpunten', isedit: false, zeker: true},
            {title:'Actions',id:'maatregelen', isedit: false, zeker: true},          
            {title:'Prognosis',id:'prognose', isedit: false, zeker: true}
        ]}
        ,{ beeld: 'scenarios', title: 'Scenarios\'s', timestamp: 0, beeldonderdeel: 
          [ {title:'Most likely',id:'meest', isedit: false, zeker: true},
            {title:'Less likely',id:'minder', isedit: false, zeker: true},
            {title:'Least likely',id:'minst', isedit: false, zeker: true}
        ]}
        ,{ beeld: 'communicatie', title: 'Communication', timestamp: 0, beeldonderdeel: 
          [ {title:'Core message',id:'kernboodschap', isedit: false, zeker: true},
            {title:'Overview',id:'omgevingsbeeld', isedit: false, zeker: true},
            {title:'Communication from waterboard',id:'extern', isedit: false, zeker: true},
            {title:'Communication intern waterboard',id:'intern', isedit: false, zeker: true}
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
  layers:
  {

		"AHN1_hoogtes": {
			"type": "overlay", 
			"category": "Terrain", 
			"layer": {
				"type":"betterwms",
				"visible":true,
				"name":"Height map",
				"url":"http://t3.edugis.nl/tiles/tilecache.py?map=maps/edugis/cache/hoogte.map",
				"layerOptions": {
					"layers":"hoogtes",
					"format":"image/png",
					"transparent":true,
					"opacity":0.8
				}
			}
		}
		
		, "BAG_pand": {
			"type": "overlay", 
			"category": "BAG", 
			"layer": {
				"type":"betterwms",
				"visible":true,
				"name":"Pand: Building footprints (Zoom in)",
				"url":"/service/ngr/bag/wms",
				"layerOptions": {
					"layers":"pand",
					"format":"image/png",
					"transparent":true,
					"opacity":0.85
				}
			}
		}
		
		, "BAG_ligplaats": {
			"type": "overlay", 
			"category": "BAG", 
			"layer": {
				"type":"betterwms",
				"visible":true,
				"name":"Ligplaats: Floating houses  (Zoom in)",
				"url":"/service/ngr/bag/wms",
				"layerOptions": {
					"layers":"ligplaats",
					"format":"image/png",
					"transparent":true,
					"opacity":0.85
				}
			}
		}
		
		, "BAG_standplaats": {
			"type": "overlay", 
			"category": "BAG", 
			"layer": {
				"type":"betterwms",
				"visible":true,
				"name":"standplaats",
				"url":"/service/ngr/bag/wms",
				"layerOptions": {
					"layers":"standplaats",
					"format":"image/png",
					"transparent":true,
					"opacity":0.8
				}
			}
		}
		
		, "BAG_verblijfsobject": {
			"type": "overlay", 
			"category": "BAG", 
			"layer": {
				"type":"betterwms",
				"visible":true,
				"name":"verblijfsobject",
				"url":"/service/ngr/bag/wms",
				"layerOptions": {
					"layers":"verblijfsobject",
					"format":"image/png",
					"transparent":true,
					"opacity":0.8
				}
			}
		}
		
		, "BAG_woonplaats": {
			"type": "overlay", 
			"category": "BAG", 
			"layer": {
				"type":"betterwms",
				"visible":true,
				"name":"woonplaats",
				"url":"/service/ngr/bag/wms",
				"layerOptions": {
					"layers":"woonplaats",
					"format":"image/png",
					"transparent":true,
					"opacity":0.8
				}
			}
		}
		
		, "AHN2_05m_int": {
			"type": "overlay", 
			"category": "AHN2", 
			"layer": {
				"type":"betterwms",
				"visible":true,
				"name":"Height map 0.5m interpolated",
				"url":"/service/ngr/ahn2/wms",
				"layerOptions": {
					"layers":"ahn2_05m_int",
					"format":"image/png",
					"transparent":true,
					"opacity":0.8
				}
			}
		}
		
		, "AHN2_05m_non": {
			"type": "overlay", 
			"category": "AHN2", 
			"layer": {
				"type":"betterwms",
				"visible":true,
				"name":"Height map 0.5m no interpolated",
				"url":"/service/ngr/ahn2/wms",
				"layerOptions": {
					"layers":"ahn2_05m_non",
					"format":"image/png",
					"transparent":true,
					"opacity":0.8
				}
			}
		}
		
		, "AHN2_05m_ruw": {
			"type": "overlay", 
			"category": "AHN2", 
			"layer": {
				"type":"betterwms",
				"visible":true,
				"name":"Height map 0.5m (with buildings)",
				"url":"/service/ngr/ahn2/wms",
				"layerOptions": {
					"layers":"ahn2_05m_ruw",
					"format":"image/png",
					"transparent":true,
					"opacity":0.8
				}
			}
		}
		
		, "AHN2_5m": {
			"type": "overlay", 
			"category": "AHN2", 
			"layer": {
				"type":"betterwms",
				"visible":true,
				"name":"Height map 5m",
				"url":"/service/ngr/ahn2/wms",
				"layerOptions": {
					"layers":"ahn2_5m",
					"format":"image/png",
					"transparent":true,
					"opacity":0.8
				}
			}
		}
		
		, "AHN2_bladindex": {
			"type": "overlay", 
			"category": "AHN2", 
			"layer": {
				"type":"betterwms",
				"visible":true,
				"name":"ahn2_bladindex",
				"url":"/service/ngr/ahn2/wms",
				"layerOptions": {
					"layers":"ahn2_bladindex",
					"format":"image/png",
					"transparent":true,
					"opacity":0.8
				}
			}
		}
		
		, "TOP10NL_wegdeelvlakken": {
			"type": "overlay", 
			"category": "TOP10NL", 
			"layer": {
				"type":"betterwms",
				"visible":true,
				"name":"wegdeelvlakken",
				"url":"/service/ngr/top10nl/wms",
				"layerOptions": {
					"layers":"wegdeelvlakken",
					"format":"image/png",
					"transparent":true,
					"opacity":0.8
				}
			}
		}
		
		, "TOP10NL_waterdeellijnen": {
			"type": "overlay", 
			"category": "TOP10NL", 
			"layer": {
				"type":"betterwms",
				"visible":true,
				"name":"waterdeellijnen",
				"url":"/service/ngr/top10nl/wms",
				"layerOptions": {
					"layers":"waterdeellijnen",
					"format":"image/png",
					"transparent":true,
					"opacity":0.8
				}
			}
		}
		
		, "TOP10NL_waterdeel_vlakken": {
			"type": "overlay", 
			"category": "TOP10NL", 
			"layer": {
				"type":"betterwms",
				"visible":true,
				"name":"waterdeel_vlakken",
				"url":"/service/ngr/top10nl/wms",
				"layerOptions": {
					"layers":"waterdeel_vlakken",
					"format":"image/png",
					"transparent":true,
					"opacity":0.8
				}
			}
		}
		
		, "TOP10NL_terreinen": {
			"type": "overlay", 
			"category": "TOP10NL", 
			"layer": {
				"type":"betterwms",
				"visible":true,
				"name":"terreinen",
				"url":"/service/ngr/top10nl/wms",
				"layerOptions": {
					"layers":"terreinen",
					"format":"image/png",
					"transparent":true,
					"opacity":0.8
				}
			}
		}
		
		, "TOP10NL_spoorbaandeel_lijnen": {
			"type": "overlay", 
			"category": "TOP10NL", 
			"layer": {
				"type":"betterwms",
				"visible":true,
				"name":"spoorbaandeel_lijnen",
				"url":"/service/ngr/top10nl/wms",
				"layerOptions": {
					"layers":"spoorbaandeel_lijnen",
					"format":"image/png",
					"transparent":true,
					"opacity":0.8
				}
			}
		}
		
		, "TOP10NL_inrichtingselementlijnen": {
			"type": "overlay", 
			"category": "TOP10NL", 
			"layer": {
				"type":"betterwms",
				"visible":true,
				"name":"inrichtingselementlijnen",
				"url":"/service/ngr/top10nl/wms",
				"layerOptions": {
					"layers":"inrichtingselementlijnen",
					"format":"image/png",
					"transparent":true,
					"opacity":0.8
				}
			}
		}
		
		, "TOP10NL_inrichtingselement_punten": {
			"type": "overlay", 
			"category": "TOP10NL", 
			"layer": {
				"type":"betterwms",
				"visible":true,
				"name":"inrichtingselement_punten",
				"url":"/service/ngr/top10nl/wms",
				"layerOptions": {
					"layers":"inrichtingselement_punten",
					"format":"image/png",
					"transparent":true,
					"opacity":0.8
				}
			}
		}
		
		, "TOP10NL_geo_labels": {
			"type": "overlay", 
			"category": "TOP10NL", 
			"layer": {
				"type":"betterwms",
				"visible":true,
				"name":"geo_labels",
				"url":"/service/ngr/top10nl/wms",
				"layerOptions": {
					"layers":"geo_labels",
					"format":"image/png",
					"transparent":true,
					"opacity":0.8
				}
			}
		}
		
		, "TOP10NL_gebouwen": {
			"type": "overlay", 
			"category": "TOP10NL", 
			"layer": {
				"type":"betterwms",
				"visible":true,
				"name":"gebouwen",
				"url":"/service/ngr/top10nl/wms",
				"layerOptions": {
					"layers":"gebouwen",
					"format":"image/png",
					"transparent":true,
					"opacity":0.8
				}
			}
		}
		
		, "TOP10NL_functioneelgebied_labels": {
			"type": "overlay", 
			"category": "TOP10NL", 
			"layer": {
				"type":"betterwms",
				"visible":true,
				"name":"functioneelgebied_labels",
				"url":"/service/ngr/top10nl/wms",
				"layerOptions": {
					"layers":"functioneelgebied_labels",
					"format":"image/png",
					"transparent":true,
					"opacity":0.8
				}
			}
		}

		, "BRP_brpgewaspercelen": {
			"type": "overlay", 
			"category": "BRP", 
			"layer": {
				"type": "betterwms",
				"visible": true, 
				"name": "Crop parcels", 
				"url": "/service/ngr/brpgewaspercelen/wms", 
				"layerOptions": {
					"layers": "brpgewaspercelen",
					"format": "image/png", 
					"transparent": true
				}
			}
		}
	
		, golffront: {
		type: 'overlay', 
		category: '3Di', 
		layer: { 
				name: "Wave front",
				type:  'betterwms',
				url: "http://result.3di.lizard.net/3di/wms",
				visible: true,
				layerOptions: {
					layers: '61f5a464c35044c19bc7d4b42d7f58cb:arrival',
					format: 'image/png',
					transparent: true
				}
			}
		}

		, waterdepth: {
			type: 'overlay', 
			category: '3Di', 
			layer: { 
				name: "Water depth",
				type:  'betterwms',
				url: "http://result.3di.lizard.net/3di/wms",
				visible: true,
				layerOptions: {
					layers: '61f5a464c35044c19bc7d4b42d7f58cb:maxdepth',
					format: 'image/png',
					transparent: true
				}
			}
		}
	
	
	
      // , "ahn1": {"type": "overlay", "category": "Terrain", "layer": {"type":"betterwms","visible":true,"name":"Height map","url":"http://t3.edugis.nl/tiles/tilecache.py?map=maps/edugis/cache/hoogte.map","layerOptions":{"layers":"hoogtes","format":"image/png","transparent":true,"opacity":0.8}}}

	  , zwemwater:{type: 'overlay', category: 'External', layer: {type: 'betterwms',visible: true, name: "Bathing locations",url: 'http://www.zwemwater.nl/zwr-ogc/service/zwr-wms',layerOptions: {layers: 'zwemwaterlocatie',format: 'image/png',transparent: true}}}

	  , zw_gebied: {type: 'overlay', category: 'External', layer: {type: 'betterwms',visible: true, name: "Bathing Areas",url: 'http://www.zwemwater.nl/zwr-ogc/service/zwr-wms',layerOptions: {layers: 'gebied',format: 'image/png',transparent: true}}}

  }
};


var addUnigisLayers = function(LeafletService,map){
    
     /*Kwetsbare objecten*/
     var geojsonMarkerOptions = {
         radius: 8,
         fillColor: "#ff7800",
         color: "#000",
         weight: 1,
         opacity: 1,
         fillOpacity: 0.8
     };
     var data = [];
     var kwetsbareobjectenlayer = new L.geoJson(data, {
         pointToLayer: function(feature, latlng){
             return L.circleMarker(latlng, geojsonMarkerOptions);
         },
         style: function (feature) {
             if (feature.properties.PRIORITEIT == 1){
                 return {fillColor: 'red'};
             }
             else if (feature.properties.PRIORITEIT == 2){
                 return {fillColor: 'orange'};
             }
             else if (feature.properties.PRIORITEIT == 3){
                 return {fillColor: 'yellow'};
             }
             else if (feature.properties.PRIORITEIT == 4){
                 return {fillColor: 'blue'};
             }
             else{
                 return {fillColor: 'blue'};
             }
         },
         onEachFeature: function (feature, layer) {
             layer.bindLabel(feature.properties.ROT_NAAM + "<br>" + (feature.properties.OMSCHRIJ_1 || ''),{ noHide: false });
             layer.bindPopup(feature.properties.ROT_NAAM + "<br>" + (feature.properties.OMSCHRIJ_1 || ''));
         }
     });
     kwetsbareobjectenlayer.buttonclass = false;
     kwetsbareobjectenlayer.name = 'Crititcal objects';
     LeafletService.layers.icmlayers.kwetsbareobjectenlayer = kwetsbareobjectenlayer;
     //self.layercontrol.addOverlay(kwetsbareobjectenlayer,"Kwetsbare objecten");
     d3.json('./data/clip_risicokaart_FeaturesToJson_edit.geojson',function(data){
            var collection = {"type":"FeatureCollection","features":[]};
             collection.features = data.features;
             kwetsbareobjectenlayer.addData(collection);
     });
};

//Q&D workaround to get a legend for 3di
var depthLegend = function(elem){
	if (d3.select(elem).classed('active')){
		d3.select(elem).classed('active', false);
		d3.select('#depthLegend').remove();
	}
	else{
		d3.select(elem).classed('active', true);
		var legendbox = d3.select('#map').append('div').attr('id','depthLegend').classed('panel panel-default',true).style('position', 'absolute').style('left', '100px').style('bottom', '100px')
			.on('click', function(d){this.remove()});
		legendbox.append('div').classed('panel-heading', true).html('Waterdiepte');
		var listgroup = legendbox.append('div').classed('panel-content', true).append('ul').classed('list-group',true);
		listgroup.append('li').style('color', 'white').style('background', 'rgb(170, 200, 255)').html('0 meter');
		listgroup.append('li').style('color', 'white').style('background', 'rgb(65, 120, 221)').html('1 meter');
		listgroup.append('li').style('color', 'white').style('background', 'rgb(4, 65, 146)').html('2 meter');	
	}
}

var waveLegend = function(elem){
	if (d3.select(elem).classed('active')){
		d3.select(elem).classed('active', false);
		d3.select('#waveLegend').remove();
	}
	else{
		d3.select(elem).classed('active', true);
		var legendbox = d3.select('#map').append('div').attr('id', 'waveLegend').classed('panel panel-default',true).style('position', 'absolute').style('left', '200px').style('bottom', '100px')
			.on('click', function(d){this.remove()});
		legendbox.append('div').classed('panel-heading', true).html('Aankomsttijd');
		var listgroup = legendbox.append('div').classed('panel-content', true).append('ul').classed('list-group',true);
		listgroup.append('li').style('color', 'steelBlue').style('background', 'rgb(255, 36, 0)').html('tot 1 uur');
		listgroup.append('li').style('color', 'steelBlue').style('background', 'rgb(255, 72, 0)').html('tot 2 uur');
		listgroup.append('li').style('color', 'steelBlue').style('background', 'rgb(255, 109, 0)').html('tot 3 uur');	
		listgroup.append('li').style('color', 'steelBlue').style('background', 'rgb(255, 145, 0)').html('tot 5 uur');	
		listgroup.append('li').style('color', 'steelBlue').style('background', 'rgb(255, 218, 0)').html('tot 10 uur');	
		listgroup.append('li').style('color', 'steelBlue').style('background', 'rgb(255, 255, 0)').html('>= 10 uur');
	}
}