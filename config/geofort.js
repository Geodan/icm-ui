var icmconfig = {
  "crs": L.CRS.EPSG3857,
  "beelden":[
        { beeld: 'summary', title: 'Samenvatting', timestamp: 0, beeldonderdeel: 
          [ {id:'situatie', title: 'Situatie', isedit: false, zeker: true}
          ]}          
        ,{ beeld: 'populatie', title: 'Populatie', timestamp: 0, beeldonderdeel: 
          [ {title:'Samenvatting',id:'samenvatting', isedit: false, zeker: true},
            {title:'Gebiedsoverzicht',id:'gebied', isedit: false, zeker: true},
            {title:'Besluitsvorming',id:'besluitsvorming', isedit: false, zeker: true},
            {title:'Knelpunten',id:'knelpunten', isedit: false, zeker: true},
            {title:'Acties/maatregelen',id:'maatregelen', isedit: false, zeker: true},               
            {title:'Prognose (verwachting)',id:'prognose', isedit: false, zeker: true}
        ]}
        ,{ beeld: 'evacuatie', title: 'Evacutatie', timestamp: 0, beeldonderdeel:
          [ {title:'Samenvatting',id:'samenvatting', isedit: false, zeker: true},
            {title:'Routeoverzicht',id:'routes', isedit: false, zeker: true},                                
            {title:'Besluitsvorming',id:'besluitsvorming', isedit: false, zeker: true},
            {title:'Knelpunten',id:'knelpunten', isedit: false, zeker: true},
            {title:'Acties/maatregelen',id:'maatregelen', isedit: false, zeker: true},          
            {title:'Prognose (verwachting)',id:'prognose', isedit: false, zeker: true}
        ]}        
        ,{ beeld: 'opvang', title: 'Opvang', timestamp: 0, beeldonderdeel: 
          [ {title:'Samenvatting',id:'samenvatting', isedit: false, zeker: true},
            {title:'Locatie overzicht',id:'locaties', isedit: false, zeker: true},                
            {title:'Besluitsvorming',id:'besluitsvorming', isedit: false, zeker: true},
            {title:'Knelpunten',id:'knelpunten', isedit: false, zeker: true},
            {title:'Acties/maatregelen',id:'maatregelen', isedit: false, zeker: true},          
            {title:'Prognose (verwachting)',id:'prognose', isedit: false, zeker: true}
        ]}         
        ,{ beeld: 'comms', title: 'Communicatie', timestamp: 0, beeldonderdeel: 
          [ {title:'Kernboodschap',id:'kernboodschap', isedit: false, zeker: true},
            {title:'Omgevingsbeeld',id:'omgevingsbeeld', isedit: false, zeker: true},
            {title:'Communicatie extern',id:'extern', isedit: false, zeker: true},
            {title:'Communicatie intern',id:'intern', isedit: false, zeker: true}
        ]}
   ],
  "definedlayers":{
      osm: {
                name: "Openstreetmap",
                url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                type: 'xyz'
            }
  },
  "layers":
  {
  }
};
