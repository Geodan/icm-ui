var icmconfig = {
  "crs": new L.Proj.CRS.TMS(
     'EPSG:28992',
     '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs',
     [-285401.92,22598.08,595401.9199999999,903401.9199999999], {
     resolutions: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420]
  }),
  "beelden":[
        { beeld: 'summary', title: 'Situatie', timestamp: 0, beeldonderdeel: 
          [ {id:'situatie', title: 'Situatie', isedit: false, zeker: true}
          ]}    
        ,{ beeld: 'meldingen', title: 'Meldingen', timestamp: 0, beeldonderdeel: 
          [ {title:'Tijdlijn',id:'Tijdlijn', isedit: false, zeker: true},
            {title:'Meldingen beeld',id:'meldingen' , isedit: false, zeker: true},
            {title: 'Acute meldingen', id:'acuut', isedit: false, zeker: true},
            {title: 'Situatie Plaats Incident',id: 'spi', isedit: false, zeker: true} ,
            {title: 'Genomen acties',id:'acties' , isedit: false, zeker: true}
        ]}
        ,{ beeld: 'wat', title: 'Operationeel (WAT)', timestamp: 0, beeldonderdeel: 
          [ {title:'Tijdlijn',id:'tijdlijn', isedit: false, zeker: true},
            {title:'Beeldvorming',id:'beeldvorming', isedit: false, zeker: true},
            {title:'Oordeelsvorming',id:'oordeelsvorming', isedit: false, zeker: true},
            {title:'Besluitsvorming',id:'besluitsvorming', isedit: false, zeker: true},
            {title:'Knelpunten',id:'knelpunten', isedit: false, zeker: true},
            {title:'Acties/maatregelen',id:'maatregelen', isedit: false, zeker: true},
            {title:'Veiligheid medewerkers',id:'veiligheid', isedit: false, zeker: true},
            {title:'Prognose (verwachting)',id:'prognose', isedit: false, zeker: true}
        ]}
        ,{ beeld: 'wot', title: 'Tactisch (WOT)', timestamp: 0, beeldonderdeel:
          [ {title:'Tijdlijn',id:'tijdlijn', isedit: false, zeker: true},
            {title:'Beeldvorming',id:'beeldvorming', isedit: false, zeker: true},
            {title:'Oordeelsvorming',id:'oordeelsvorming', isedit: false, zeker: true},
            {title:'Besluitsvorming',id:'besluitsvorming', isedit: false, zeker: true},
            {title:'Knelpunten',id:'knelpunten', isedit: false, zeker: true},
            {title:'Acties/maatregelen',id:'maatregelen', isedit: false, zeker: true},          
            {title:'Prognose (verwachting)',id:'prognose', isedit: false, zeker: true}
        ]}        
        ,{ beeld: 'wbt', title: 'Strategisch (WBT)', timestamp: 0, beeldonderdeel: 
          [ {title:'Tijdlijn',id:'tijdlijn', isedit: false, zeker: true},
            {title:'Beeldvorming',id:'beeldvorming', isedit: false, zeker: true},
            {title:'Oordeelsvorming',id:'oordeelsvorming', isedit: false, zeker: true},
            {title:'Besluitsvorming',id:'besluitsvorming', isedit: false, zeker: true},
            {title:'Knelpunten',id:'knelpunten', isedit: false, zeker: true},
            {title:'Acties/maatregelen',id:'maatregelen', isedit: false, zeker: true},          
            {title:'Prognose (verwachting)',id:'prognose', isedit: false, zeker: true}
        ]}
        ,{ beeld: 'scenarios', title: 'Scenario\'s', timestamp: 0, beeldonderdeel: 
          [ {title:'Meest waarschijnlijk',id:'meest', isedit: false, zeker: true},
            {title:'Minder waarschijnlijk',id:'minder', isedit: false, zeker: true},
            {title:'Minst waarschijnlijk',id:'minst', isedit: false, zeker: true}
        ]}
        ,{ beeld: 'communicatie', title: 'Communicatie', timestamp: 0, beeldonderdeel: 
          [ {title:'Kernboodschap',id:'kernboodschap', isedit: false, zeker: true},
            {title:'Omgevingsbeeld',id:'omgevingsbeeld', isedit: false, zeker: true},
            {title:'Communicatie vanuit het waterschap',id:'extern', isedit: false, zeker: true},
            {title:'Communicatie intern het waterschap',id:'intern', isedit: false, zeker: true}
        ]}
   ],
  "definedlayers":{
      brt: {
                name: 'BRT',
                url: 'http://geodata.nationaalgeoregister.nl/tms/1.0.0/brtachtergrondkaart/{z}/{x}/{y}.png',
                type: 'xyz',
                layerOptions: {
                    tms: true
                }
      }
  },
  "layers":
  {
    "HHNK001a": {"type": "overlay", "category": "AWZ-Leidingen", "layer": {"type": "betterwms","visible": true,"name": "Risicopunten Afvalwaterzuivering ","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/afvalwaterzuivering_leidingenbeheer/MapServer/WmsServer", "layerOptions": {"layers":7, "format": "img/png", "transparent": true}}},
    "HHNK001b": {"type": "overlay", "category": "AWZ-Leidingen", "layer": {"type": "betterwms","visible": true,"name": "Overnamepunten","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/afvalwaterzuivering_leidingenbeheer/MapServer/WMSServer", "layerOptions": {"layers":6, "format": "img/png", "transparent": true}}},
    "HHNK001c": {"type": "overlay", "category": "AWZ-Leidingen", "layer": {"type": "betterwms","visible": true,"name": "Rioolgemalen","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/afvalwaterzuivering_leidingenbeheer/MapServer/WMSServer", "layerOptions": {"layers":5, "format": "img/png", "transparent": true}}},
    "HHNK001d": {"type": "overlay", "category": "AWZ-Leidingen", "layer": {"type": "betterwms","visible": true,"name": "Appendagepunten","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/afvalwaterzuivering_leidingenbeheer/MapServer/WMSServer", "layerOptions": {"layers":4, "format": "img/png", "transparent": true}}},
    "HHNK001e": {"type": "overlay", "category": "AWZ-Leidingen", "layer": {"type": "betterwms","visible": true,"name": "Lozingspunten","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/afvalwaterzuivering_leidingenbeheer/MapServer/WMSServer", "layerOptions": {"layers":3, "format": "img/png", "transparent": true}}},
    "HHNK001f": {"type": "overlay", "category": "AWZ-Leidingen", "layer": {"type": "betterwms","visible": true,"name": "Zuiveringen(RWZI)","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/afvalwaterzuivering_leidingenbeheer/MapServer/WMSServer", "layerOptions": {"layers":2, "format": "img/png", "transparent": true}}},
    "HHNK001g": {"type": "overlay", "category": "AWZ-Leidingen", "layer": {"type": "betterwms","visible": true,"name": "Appendage lijnen","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/afvalwaterzuivering_leidingenbeheer/MapServer/WMSServer", "layerOptions": {"layers":1, "format": "img/png", "transparent": true}}},
    "HHNK001h": {"type": "overlay", "category": "AWZ-Leidingen", "layer": {"type": "betterwms","visible": true,"name": "Leidingsegmenten","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/afvalwaterzuivering_leidingenbeheer/MapServer/WMSServer", "layerOptions": {"layers":0, "format": "img/png", "transparent": true}}},
    "HHNK002" : {"type": "overlay", "category": "Dijkpalen", "layer": {"type": "betterwms","visible": true,"name": "Referentiepunten primaire keringen","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/dijkpalen/MapServer/WMSServer", "layerOptions": {"layers":0, "format": "img/png", "transparent": true}}},
    "HHNK003" : {"type": "overlay", "category": "Dijkringen", "layer": {"type": "betterwms","visible": true,"name": "Waterkeringstelsels","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/dijkringen/MapServer/WMSServer", "layerOptions": {"layers":0, "format": "img/png", "transparent": true}}},
    "HHNK004a": {"type": "overlay", "category": "Gebieden", "layer": {"type": "betterwms","visible": true,"name": "Boezemgebieden ","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/gebieden/MapServer/WMSServer", "layerOptions": {"layers":6, "format": "img/png", "transparent": true}}},
    "HHNK004b": {"type": "overlay", "category": "Gebieden", "layer": {"type": "betterwms","visible": true,"name": "Poldergebieden","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/gebieden/MapServer/WMSServer", "layerOptions": {"layers":5, "format": "img/png", "transparent": true}}},
    "HHNK004c": {"type": "overlay", "category": "Gebieden", "layer": {"type": "betterwms","visible": true,"name": "Beheergebied HHNK","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/gebieden/MapServer/WMSServer", "layerOptions": {"layers":4, "format": "img/png", "transparent": true}}},
    "HHNK004d": {"type": "overlay", "category": "Gebieden", "layer": {"type": "betterwms","visible": true,"name": "Veiligheidsregio\"s en gebieden","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/gebieden/MapServer/WMSServer", "layerOptions": {"layers":3, "format": "img/png", "transparent": true}}},
    "HHNK004e": {"type": "overlay", "category": "Gebieden", "layer": {"type": "betterwms","visible": true,"name": "Gemeenten","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/gebieden/MapServer/WMSServer", "layerOptions": {"layers":2, "format": "img/png", "transparent": true}}},
    "HHNK004f": {"type": "overlay", "category": "Gebieden", "layer": {"type": "betterwms","visible": true,"name": "Waterschappen","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/gebieden/MapServer/WMSServer", "layerOptions": {"layers":1, "format": "img/png", "transparent": true}}},
    "HHNK004g": {"type": "overlay", "category": "Gebieden", "layer": {"type": "betterwms","visible": true,"name": "Provincies","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/gebieden/MapServer/WMSServer", "layerOptions": {"layers":0, "format": "img/png", "transparent": true}}},
    "HHNK005a": {"type": "overlay", "category": "Kunstwerken", "layer": {"type": "betterwms","visible": true,"name": "Gemaal","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/kunstwerken_en_inrichtingselementen/MapServer/WMSServer", "layerOptions": {"layers":15, "format": "img/png", "transparent": true}}},
    "HHNK005b": {"type": "overlay", "category": "Kunstwerken", "layer": {"type": "betterwms","visible": true,"name": "Sluis","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/kunstwerken_en_inrichtingselementen/MapServer/WMSServer", "layerOptions": {"layers":14, "format": "img/png", "transparent": true}}},
    "HHNK005c": {"type": "overlay", "category": "Kunstwerken", "layer": {"type": "betterwms","visible": true,"name": "Aquaduct","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/kunstwerken_en_inrichtingselementen/MapServer/WMSServer", "layerOptions": {"layers":13, "format": "img/png", "transparent": true}}},
    "HHNK005d": {"type": "overlay", "category": "Kunstwerken", "layer": {"type": "betterwms","visible": true,"name": "Regelbare stuw","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/kunstwerken_en_inrichtingselementen/MapServer/WMSServer", "layerOptions": {"layers":12, "format": "img/png", "transparent": true}}},
    "HHNK005e": {"type": "overlay", "category": "Kunstwerken", "layer": {"type": "betterwms","visible": true,"name": "Vaste stuw","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/kunstwerken_en_inrichtingselementen/MapServer/WMSServer", "layerOptions": {"layers":11, "format": "img/png", "transparent": true}}},
    "HHNK005f": {"type": "overlay", "category": "Kunstwerken", "layer": {"type": "betterwms","visible": true,"name": "Duiker","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/kunstwerken_en_inrichtingselementen/MapServer/WMSServer", "layerOptions": {"layers":10, "format": "img/png", "transparent": true}}},
    "HHNK005g": {"type": "overlay", "category": "Kunstwerken", "layer": {"type": "betterwms","visible": true,"name": "Vaste dam","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/kunstwerken_en_inrichtingselementen/MapServer/WMSServer", "layerOptions": {"layers":9, "format": "img/png", "transparent": true}}},
    "HHNK005h": {"type": "overlay", "category": "Kunstwerken", "layer": {"type": "betterwms","visible": true,"name": "Brug","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/kunstwerken_en_inrichtingselementen/MapServer/WMSServer", "layerOptions": {"layers":8, "format": "img/png", "transparent": true}}},
    "HHNK005i": {"type": "overlay", "category": "Kunstwerken", "layer": {"type": "betterwms","visible": true,"name": "Coupure","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/kunstwerken_en_inrichtingselementen/MapServer/WMSServer", "layerOptions": {"layers":5, "format": "img/png", "transparent": true}}},
    "HHNK005j": {"type": "overlay", "category": "Kunstwerken", "layer": {"type": "betterwms","visible": true,"name": "Put","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/kunstwerken_en_inrichtingselementen/MapServer/WMSServer", "layerOptions": {"layers":4, "format": "img/png", "transparent": true}}},
    "HHNK005k": {"type": "overlay", "category": "Kunstwerken", "layer": {"type": "betterwms","visible": true,"name": "Syphon","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/kunstwerken_en_inrichtingselementen/MapServer/WMSServer", "layerOptions": {"layers":3, "format": "img/png", "transparent": true}}},
    "HHNK005l": {"type": "overlay", "category": "Kunstwerken", "layer": {"type": "betterwms","visible": true,"name": "Overig","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/kunstwerken_en_inrichtingselementen/MapServer/WMSServer", "layerOptions": {"layers":2, "format": "img/png", "transparent": true}}},
    "HHNK005m": {"type": "overlay", "category": "Kunstwerken", "layer": {"type": "betterwms","visible": true,"name": "Kunstwerken met inlaatfunctie","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/kunstwerken_en_inrichtingselementen/MapServer/WMSServer", "layerOptions": {"layers":1, "format": "img/png", "transparent": true}}},
    "HHNK005n": {"type": "overlay", "category": "Kunstwerken", "layer": {"type": "betterwms","visible": true,"name": "KWK Leidingen en kabels 2007","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/kunstwerken_en_inrichtingselementen/MapServer/WMSServer", "layerOptions": {"layers":0, "format": "img/png", "transparent": true}}},
    "HHNK006a": {"type": "overlay", "category": "Oppervlaktewateren", "layer": {"type": "betterwms","visible": true,"name": "Boezem","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/oppervlaktewateren/MapServer/WMSServer", "layerOptions": {"layers":3, "format": "img/png", "transparent": true}}},
    "HHNK006b": {"type": "overlay", "category": "Oppervlaktewateren", "layer": {"type": "betterwms","visible": true,"name": "Waterlopen, primair","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/oppervlaktewateren/MapServer/WMSServer", "layerOptions": {"layers":2, "format": "img/png", "transparent": true}}},
    "HHNK006c": {"type": "overlay", "category": "Oppervlaktewateren", "layer": {"type": "betterwms","visible": true,"name": "Waterlopen, secundair, tertiair","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/oppervlaktewateren/MapServer/WMSServer", "layerOptions": {"layers":1, "format": "img/png", "transparent": true}}},
    "HHNK006d": {"type": "overlay", "category": "Oppervlaktewateren", "layer": {"type": "betterwms","visible": true,"name": "Oppervlaktewater (vlakken)","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/oppervlaktewateren/MapServer/WMSServer", "layerOptions": {"layers":0, "format": "img/png", "transparent": true}}},
    "HHNK007a": {"type": "overlay", "category": "Peilgebieden", "layer": {"type": "betterwms","visible": true,"name": "Peilafwijkingen, praktijk","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/peilgebieden/MapServer/WMSServer", "layerOptions": {"layers":1, "format": "img/png", "transparent": true}}},
    "HHNK007b": {"type": "overlay", "category": "Peilgebieden", "layer": {"type": "betterwms","visible": true,"name": "Peilgebieden, praktijk","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/peilgebieden/MapServer/WMSServer", "layerOptions": {"layers":0, "format": "img/png", "transparent": true}}},
    "HHNK008a": {"type": "overlay", "category": "Regios", "layer": {"type": "betterwms","visible": true,"name": "Gebiedsindeling rayons peilbeheer","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/regios/MapServer/WMSServer", "layerOptions": {"layers":4, "format": "img/png", "transparent": true}}},
    "HHNK008b": {"type": "overlay", "category": "Regios", "layer": {"type": "betterwms","visible": true,"name": "Samenwerkingsregio\"s","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/regios/MapServer/WMSServer", "layerOptions": {"layers":3, "format": "img/png", "transparent": true}}},
    "HHNK008c": {"type": "overlay", "category": "Regios", "layer": {"type": "betterwms","visible": true,"name": "Zuiveringsregios ","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/regios/MapServer/WMSServer", "layerOptions": {"layers":2, "format": "img/png", "transparent": true}}},
    "HHNK008d": {"type": "overlay", "category": "Regios", "layer": {"type": "betterwms","visible": true,"name": "Gebiedsindeling_HHNK_Waterkeringen_en_wegen","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/regios/MapServer/WMSServer", "layerOptions": {"layers":1, "format": "img/png", "transparent": true}}},
    "HHNK008e": {"type": "overlay", "category": "Regios", "layer": {"type": "betterwms","visible": true,"name": "Beheergebied HHNK","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/regios/MapServer/WMSServer", "layerOptions": {"layers":0, "format": "img/png", "transparent": true}}},
    "HHNK009a": {"type": "overlay", "category": "Waterkeringen", "layer": {"type": "betterwms","visible": true,"name": "Waterkeringen, primair ","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/waterkeringen/MapServer/WMSServer", "layerOptions": {"layers":1, "format": "img/png", "transparent": true}}},
    "HHNK009b": {"type": "overlay", "category": "Waterkeringen", "layer": {"type": "betterwms","visible": true,"name": "Waterkeringen, regionaal (Legger, concept)","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/waterkeringen/MapServer/WMSServer", "layerOptions": {"layers":0, "format": "img/png", "transparent": true}}},
    "HHNK010a": {"type": "overlay", "category": "Waterleidingen", "layer": {"type": "betterwms","visible": true,"name": "PWN_Waterleidingen","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/waterleidingen/MapServer/WMSServer", "layerOptions": {"layers":5, "format": "img/png", "transparent": true}}},
    "HHNK010b": {"type": "overlay", "category": "Waterleidingen", "layer": {"type": "betterwms","visible": true,"name": "Waternet waterleidingen","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/waterleidingen/MapServer/WMSServer", "layerOptions": {"layers":1, "format": "img/png", "transparent": true}}},
    "HHNK011c": {"type": "overlay", "category": "Wegen_en_vaarwegen", "layer": {"type": "betterwms","visible": true,"name": "Wegen, Rijk en Provincie (NWB)","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/wegen_en_vaarwegen/MapServer/WMSServer", "layerOptions": {"layers":8, "format": "img/png", "transparent": true}}},
    "HHNK011d": {"type": "overlay", "category": "Wegen_en_vaarwegen", "layer": {"type": "betterwms","visible": true,"name": "Wegen, overig (NWB)","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/wegen_en_vaarwegen/MapServer/WMSServer", "layerOptions": {"layers":7, "format": "img/png", "transparent": true}}},
    "HHNK011e": {"type": "overlay", "category": "Wegen_en_vaarwegen", "layer": {"type": "betterwms","visible": true,"name": "Wegvakonderdelen (DHV) ","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/wegen_en_vaarwegen/MapServer/WMSServer", "layerOptions": {"layers":5, "format": "img/png", "transparent": true}}},
    "HHNK011f": {"type": "overlay", "category": "Wegen_en_vaarwegen", "layer": {"type": "betterwms","visible": true,"name": "Wegvakken (DHV) ","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/wegen_en_vaarwegen/MapServer/WMSServer", "layerOptions": {"layers":4, "format": "img/png", "transparent": true}}},
    "HHNK011g": {"type": "overlay", "category": "Wegen_en_vaarwegen", "layer": {"type": "betterwms","visible": true,"name": "Wegen hectometrering (NWB)","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/wegen_en_vaarwegen/MapServer/WMSServer", "layerOptions": {"layers":3, "format": "img/png", "transparent": true}}},
    "HHNK011h": {"type": "overlay", "category": "Wegen_en_vaarwegen", "layer": {"type": "betterwms","visible": true,"name": "Vaarwegen (NWB)","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/wegen_en_vaarwegen/MapServer/WMSServer", "layerOptions": {"layers":2, "format": "img/png", "transparent": true}}},
    "HHNK011i": {"type": "overlay", "category": "Wegen_en_vaarwegen", "layer": {"type": "betterwms","visible": true,"name": "Vaarwegen kilometrering (NWB)","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/wegen_en_vaarwegen/MapServer/WMSServer", "layerOptions": {"layers":1, "format": "img/png", "transparent": true}}},
    "HHNK012a": {"type": "overlay", "category": "Zoneringen", "layer": {"type": "betterwms","visible": true,"name": "Zoneringen, lijnen","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/zoneringen/MapServer/WMSServer", "layerOptions": {"layers":6, "format": "img/png", "transparent": true}}},
    "HHNK012b": {"type": "overlay", "category": "Zoneringen", "layer": {"type": "betterwms","visible": true,"name": "Vakgrenzen ","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/zoneringen/MapServer/WMSServer", "layerOptions": {"layers":5, "format": "img/png", "transparent": true}}},
    "HHNK012c": {"type": "overlay", "category": "Zoneringen", "layer": {"type": "betterwms","visible": true,"name": "Zoneringen, Primaire waterkeringen","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/zoneringen/MapServer/WMSServer", "layerOptions": {"layers":4, "format": "img/png", "transparent": true}}},
    "HHNK012d": {"type": "overlay", "category": "Zoneringen", "layer": {"type": "betterwms","visible": true,"name": "Zoneringen, Regionale waterkeringen","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/zoneringen/MapServer/WMSServer", "layerOptions": {"layers":3, "format": "img/png", "transparent": true}}},
    "HHNK012e": {"type": "overlay", "category": "Zoneringen", "layer": {"type": "betterwms","visible": true,"name": "Profiel van vrije ruimte,Regionale waterkeringen","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/zoneringen/MapServer/WMSServer", "layerOptions": {"layers":2, "format": "img/png", "transparent": true}}},
    "HHNK012f": {"type": "overlay", "category": "Zoneringen", "layer": {"type": "betterwms","visible": true,"name": "Zoneringen, Zandige kust","url": "http://geoweb.hhnk.nl:6080/arcgis/services/CIS/zoneringen/MapServer/WMSServer", "layerOptions": {"layers":0, "format": "img/png", "transparent": true}}},
    "HHNK101a": {"type": "baselayer", "category": "Achtergrond", "layer": {"type": "esri_map", "visible": true, "name": "Luchtfoto 2013", "url": "http://geoweb.hhnk.nl:6080/arcgis/rest/services/tiled/luchtfoto_2013/MapServer", "layerOptions": {"layers": "show:10"}}},
    "HHNK102": {"type": "baselayer", "category": "Achtergrond", "layer": {"type": "esri_map", "visible": true, "name": "AHN2 gefilterd", "url": "http://geoweb.hhnk.nl:6080/arcgis/rest/services/extra_tiled/ahn2_gefilterd/MapServer", "layerOptions": {"layers":"show:0"}}},
    "brp":     {"type": "overlay", "category": "Extern", "layer": {"type": "betterwms","visible": true, "name": "Gewaspercelen","url": "http://research.geodan.nl/service/ngr/brpgewaspercelen/wms","layerOptions": {"layers": "brpgewaspercelen","format": "image/png","transparent": true}}}
  }
};
