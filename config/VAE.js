 var icmconfig = {
  //"crs": L.CRS.EPSG3857,
  "crs": L.CRS.EPSG4326,
  "center": {
      lat: 24.449696, //Approx Abu Dabi ,
      lng: 54.428580,
      zoom: 9
  },
  "beelden":[
        { beeld: 'summary', title: 'Current situation', timestamp: 0, beeldonderdeel: 
          [ {id:'situatie', title: 'Summary', isedit: false, zeker: true}
          ]}    
        ,{ beeld: 'meldingen', title: 'Reports', timestamp: 0, beeldonderdeel: 
          [ {title:'Timeline',id:'Tijdlijn', isedit: false, zeker: true},
            {title:'Notifications',id:'meldingen' , isedit: false, zeker: true},
            {title: 'Urgent', id:'acuut', isedit: false, zeker: true},
            {title: 'Local situation',id: 'spi', isedit: false, zeker: true} ,
            {title: 'Mitigations',id:'acties' , isedit: false, zeker: true}
        ]}
        ,{ beeld: 'wat', title: 'Operational team', timestamp: 0, beeldonderdeel: 
          [ {title:'Tijdlijn',id:'tijdlijn', isedit: false, zeker: true},
            {title:'Beeldvorming',id:'beeldvorming', isedit: false, zeker: true},
            {title:'Oordeelvorming',id:'oordeelsvorming', isedit: false, zeker: true},
            {title:'Besluitvorming',id:'besluitsvorming', isedit: false, zeker: true},
            {title:'Knelpunten',id:'knelpunten', isedit: false, zeker: true},
            {title:'Acties/maatregelen',id:'maatregelen', isedit: false, zeker: true},
            {title:'Veiligheid medewerkers',id:'veiligheid', isedit: false, zeker: true},
            {title:'Prognose (verwachting)',id:'prognose', isedit: false, zeker: true}
        ]}
        ,{ beeld: 'wot', title: 'Tactical Team', timestamp: 0, beeldonderdeel:
          [ {title:'Tijdlijn',id:'tijdlijn', isedit: false, zeker: true},
            {title:'Beeldvorming',id:'beeldvorming', isedit: false, zeker: true},
            {title:'Oordeelvorming',id:'oordeelsvorming', isedit: false, zeker: true},
            {title:'Besluitvorming',id:'besluitsvorming', isedit: false, zeker: true},
            {title:'Knelpunten',id:'knelpunten', isedit: false, zeker: true},
            {title:'Acties/maatregelen',id:'maatregelen', isedit: false, zeker: true},          
            {title:'Prognose (verwachting)',id:'prognose', isedit: false, zeker: true}
        ]}        
        ,{ beeld: 'wbt', title: 'Strategical team', timestamp: 0, beeldonderdeel: 
          [ {title:'Tijdlijn',id:'tijdlijn', isedit: false, zeker: true},
            {title:'Beeldvorming',id:'beeldvorming', isedit: false, zeker: true},
            {title:'Oordeelvorming',id:'oordeelsvorming', isedit: false, zeker: true},
            {title:'Besluitvorming',id:'besluitsvorming', isedit: false, zeker: true},
            {title:'Knelpunten',id:'knelpunten', isedit: false, zeker: true},
            {title:'Acties/maatregelen',id:'maatregelen', isedit: false, zeker: true},          
            {title:'Prognose (verwachting)',id:'prognose', isedit: false, zeker: true}
        ]}
        ,{ beeld: 'scenarios', title: 'Scenarios', timestamp: 0, beeldonderdeel: 
          [ {title:'High probability',id:'meest', isedit: false, zeker: true},
            {title:'Medium probability',id:'minder', isedit: false, zeker: true},
            {title:'Low probability',id:'minst', isedit: false, zeker: true}
        ]}
        ,{ beeld: 'communicatie', title: 'Communication', timestamp: 0, beeldonderdeel: 
          [ {title:'Core message',id:'kernboodschap', isedit: false, zeker: true},
            {title:'Environment',id:'omgevingsbeeld', isedit: false, zeker: true}
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
         {"cat":"REALITEIT -- RAMPEN / ONGEVALLENRAMPTYPE, INCIDENTLOCATIE","url":"imoov/s0010_R01---g.png","text":"Verkeer en vervoer: lucht, water, land"}
        ,{"cat":"REALITEIT -- RAMPEN / ONGEVALLENRAMPTYPE, INCIDENTLOCATIE","url":"imoov/s0020_R02---g.png","text":"Gevaarlijke stoffen: brandbaar, explosief, gif, nuceair"}
        ,{"cat":"REALITEIT -- RAMPEN / ONGEVALLENRAMPTYPE, INCIDENTLOCATIE","url":"imoov/s0030_R03---g.png","text":"Volksgezondheid: gezondheidsdreiging, ziektegolf"}
        ,{"cat":"REALITEIT -- RAMPEN / ONGEVALLENRAMPTYPE, INCIDENTLOCATIE","url":"imoov/s0040_R04---g.png","text":"Infrastructuur: tunnels, brand, instorting, uitval"}
        ,{"cat":"REALITEIT -- RAMPEN / ONGEVALLENRAMPTYPE, INCIDENTLOCATIE","url":"imoov/s0050_R05---g.png","text":"Bevolking: paniek, ordeverstoring"}
        ,{"cat":"REALITEIT -- RAMPEN / ONGEVALLENRAMPTYPE, INCIDENTLOCATIE","url":"imoov/s0060_R06---g.png","text":"Natuur: overstroming, natuurbrand, extreem weer"}
        //,{"cat":"REALITEIT -- RAMPEN / ONGEVALLENRAMPZONES","url":"imoov/s0070---g.png","text":"Brongebied"}
        //,{"cat":"REALITEIT -- RAMPEN / ONGEVALLENRAMPZONES","url":"imoov/s0080---g.png","text":"Effectgebied, huidige situatie"}
        //,{"cat":"REALITEIT -- RAMPEN / ONGEVALLENRAMPZONES","url":"imoov/s0090---g.png","text":"Effectgebied, prognose"}
        ,{"cat":"REALITEIT -- RAMPEN / ONGEVALLENGETROFFEN PERSONEN","url":"imoov/s0100_B15---g.png","text":"Beknelde personen"}
        ,{"cat":"REALITEIT -- RAMPEN / ONGEVALLENGETROFFEN PERSONEN","url":"imoov/s0110_A10---g.png","text":"Aantal gewonden en doden [ rode getallen interactief toevoegen ]"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’Salgemeen","url":"imoov/s0120_E06---g.png","text":"Risicovol object"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SGEVAARLIJKE STOFFEN","url":"imoov/s0130---g.png","text":"LPG"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SGEVAARLIJKE STOFFEN","url":"imoov/s0140---g.png","text":"Opslag gevaarlijke stoffen"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SGEVAARLIJKE STOFFEN","url":"imoov/s0150---g.png","text":"Ammoniak"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SGEVAARLIJKE STOFFEN","url":"imoov/s0160---g.png","text":"Emplacement"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SGEVAARLIJKE STOFFEN","url":"imoov/s0170---g.png","text":"Vervoer gevaarlijke stoffen"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SGEVAARLIJKE STOFFEN","url":"imoov/s0180---g.png","text":"Vuurwerk"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SGEVAARLIJKE STOFFEN","url":"imoov/s0190---g.png","text":"Nucleair"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SGEVAARLIJKE STOFFEN","url":"imoov/s0200---g.png","text":"Ontplofbare stoffen"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SGEVAARLIJKE STOFFEN","url":"imoov/s0210---g.png","text":"Defensie"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SGEVAARLIJKE STOFFEN","url":"imoov/s0220---g.png","text":"Overige gevaarlijke stof"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SGEVAARLIJKE STOFFEN","url":"imoov/s0230---g.png","text":"BRZO, Besluit Risico’s Zware Ongevallen"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SGEVAARLIJKE STOFFEN","url":"imoov/s0240---g.png","text":"Pijpleidingen (deels geheim !)"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SKWETSBARE OBJECTEN","url":"imoov/s0250_A01---g.png","text":"Aandachts-locatie (geen adres)"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SKWETSBARE OBJECTEN","url":"imoov/s0260_A02---g.png","text":"Aandachts-adres"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SKWETSBARE OBJECTEN","url":"imoov/s0270_A03---g.png","text":"Voormalig Aandachts-adres (dit is bijvoorbeeld al ontruimd)"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SKWETSBARE OBJECTEN","url":"imoov/s0280_A06---g.png","text":"Nutsvoorziening bijvoorbeeld geknapte hoogspanningskabel"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SKWETSBARE OBJECTEN","url":"imoov/s0290_A12---g.png","text":"Winkel"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SKWETSBARE OBJECTEN","url":"imoov/s0300_A13---g.png","text":"Zorginstelling incl. Ziekenhuis-dat-niet-meer-functioneert"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SKWETSBARE OBJECTEN","url":"imoov/s0310_A14---g.png","text":"Camping / bungalowpark"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SKWETSBARE OBJECTEN","url":"imoov/s0320_A15---g.png","text":"Object van maatschappelijk nut, bijvoorbeeld een museum"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SKWETSBARE OBJECTEN","url":"imoov/s0330_A16---g.png","text":"Object van economisch nut, bijvoorbeeld een bank"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SKWETSBARE OBJECTEN","url":"imoov/s0340_A17---g.png","text":"Openbaar gebouw"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SKWETSBARE OBJECTEN","url":"imoov/s0350_A18---g.png","text":"School of Kinderopvang"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SKWETSBARE OBJECTEN","url":"imoov/s0360---g.png","text":"Hotel of Pension"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SKWETSBARE OBJECTEN","url":"imoov/s0370---g.png","text":"Gemaal"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SKWETSBARE OBJECTEN","url":"imoov/s0380---g.png","text":"Radarpost / Verkeersleiding"}
        //,{"cat":"REALITEIT -- EXTRA RISICO’SBETROKKEN PERSONEN","url":"imoov/s0390---g.png","text":"Aantal (gezonde) bewoners [ zwart getal interactief toevoegen ]"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SBETROKKEN PERSONEN","url":"imoov/s0400---g.png","text":"Ramptoeristen"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SBETROKKEN FAUNA","url":"imoov/s0410---g.png","text":"Boerderij met veeteelt"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SBETROKKEN FAUNA","url":"imoov/s0420---g.png","text":"Viskwekerij"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SBETROKKEN FAUNA","url":"imoov/s0430---g.png","text":"Bedrijf met hobby-dieren (zoals manege en hondenkennel)"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SBETROKKEN TERREIN","url":"imoov/s0440_B16---g.png","text":"Verbrand of beschadigd gebouw"}
        ,{"cat":"REALITEIT -- EXTRA RISICO’SBETROKKEN TERREIN","url":"imoov/s0450---g.png","text":"Verbrande natuur (bos en heide)"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGNOTITIES","url":"imoov/s0460---g.png","text":"Algemeen"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGNOTITIES","url":"imoov/s0470_E01-B---g.png","text":"Gemeente"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGNOTITIES","url":"imoov/s0480_B01-C---g.png","text":"Brandweer"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGNOTITIES","url":"imoov/s0490_D01-B---g.png","text":"Politie"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGNOTITIES","url":"imoov/s0500_C01-C---g.png","text":"GHOR, Geneeskundig"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGNOTITIES","url":"imoov/s0510_F01---g.png","text":"Spoorwegen"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGNOTITIES","url":"imoov/s0520_F02---g.png","text":"Defensie"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGNOTITIES","url":"imoov/s0530_F03---g.png","text":"Waterschap"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGNOTITIES","url":"imoov/s0540_F04---g.png","text":"Provincie"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGMAATREGELEN EN INZET","url":"imoov/s0550_A04---g.png","text":"Pand dat verzegeld is"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGMAATREGELEN EN INZET","url":"imoov/s0560_A05---g.png","text":"Afgesloten weg"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGMAATREGELEN EN INZET","url":"imoov/s0570_A09---g.png","text":"Sirene (op vaste locatie)"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGMAATREGELEN EN INZET","url":"imoov/s0580_E03---g.png","text":"Gemeente Voertuig"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGMAATREGELEN EN INZET","url":"imoov/s0590_B03---g.png","text":"Brandweer Voertuig"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGMAATREGELEN EN INZET","url":"imoov/s0600_B04---g.png","text":"Brandweer Blusboot"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGMAATREGELEN EN INZET","url":"imoov/s0610_B05---g.png","text":"Brandweer Meetploeg"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGMAATREGELEN EN INZET","url":"imoov/s0620_B12---g.png","text":"Brandweer Ontsmettingssluis voertuigen"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGMAATREGELEN EN INZET","url":"imoov/s0630_B13---g.png","text":"Brandweer Decontaminatie (personen)"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGMAATREGELEN EN INZET","url":"imoov/s0640_D04---g.png","text":"Politie Voertuig"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGMAATREGELEN EN INZET","url":"imoov/s0650_D06---g.png","text":"Politie Plaatsdelict"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGMAATREGELEN EN INZET","url":"imoov/s0660_D08---g.png","text":"Politie Sporenonderzoek Technische Recherche"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGMAATREGELEN EN INZET","url":"imoov/s0670_D01-B---g.png","text":"Politie Wegblokkade"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGMAATREGELEN EN INZET","url":"imoov/s0680_C03---g.png","text":"GHOR Voertuig"}
        //,{"cat":"REPRESSIE / RAMPENBESTRIJDINGEVACUATIE EN LOGISTIEK","url":"imoov/s0690---g.png","text":"Evacuatiegebied, grens"}
        //,{"cat":"REPRESSIE / RAMPENBESTRIJDINGEVACUATIE EN LOGISTIEK","url":"imoov/s0700---g.png","text":"Evacuatieroute"}
        //,{"cat":"REPRESSIE / RAMPENBESTRIJDINGEVACUATIE EN LOGISTIEK","url":"imoov/s0710---g.png","text":"Evacuatie richting"}
        //,{"cat":"REPRESSIE / RAMPENBESTRIJDINGEVACUATIE EN LOGISTIEK","url":"imoov/s0720---g.png","text":"Extra aanvoerroutes hulpdiensten"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGEVACUATIE EN LOGISTIEK","url":"imoov/s0730---g.png","text":"Logistiek punt (bijvoorbeeld uitgiftepunt drinkwater)"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGEVACUATIE EN LOGISTIEK","url":"imoov/s0740_B14---g.png","text":"Brandstofvoorziening voor hulpverleningsvoertuigen"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGOPVANG VAN SLACHTOFFERS EN DADERS","url":"imoov/s0750_E02---g.png","text":"Gemeente Opvanglocatie"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGOPVANG VAN SLACHTOFFERS EN DADERS","url":"imoov/s0760_C04---g.png","text":"GHOR Behandelcentrum"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGOPVANG VAN SLACHTOFFERS EN DADERS","url":"imoov/s0770_A11---g.png","text":"Ziekenhuis (functionerend)"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGOPVANG VAN SLACHTOFFERS EN DADERS","url":"imoov/s0780_E04---g.png","text":"Morgue (identificeren van lichamen)"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGOPVANG VAN SLACHTOFFERS EN DADERS","url":"imoov/s0790_E05---g.png","text":"Verzamel Plaats Doden (VPD)"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGOPVANG VAN SLACHTOFFERS EN DADERS","url":"imoov/s0800_D05---g.png","text":"Politie, Detentievoorziening"}
        ,{"cat":"PREPARATIECOMMANDOCENTRA EN UITGANGSSTELLINGEN","url":"imoov/s0810_A07---g.png","text":"COPI, Commando Plaats Incident"}
        ,{"cat":"PREPARATIECOMMANDOCENTRA EN UITGANGSSTELLINGEN","url":"imoov/s0820_E01-A---g.png","text":"Gemeente, bijvoorbeeld gemeentehuis, actiecentrum"}
        ,{"cat":"PREPARATIECOMMANDOCENTRA EN UITGANGSSTELLINGEN","url":"imoov/s0830_B10---g.png","text":"Brandweer, Vaste locatie"}
        ,{"cat":"PREPARATIECOMMANDOCENTRA EN UITGANGSSTELLINGEN","url":"imoov/s0840_B11---g.png","text":"Brandweer, Mobiele / tijdelijke locatie"}
        ,{"cat":"PREPARATIECOMMANDOCENTRA EN UITGANGSSTELLINGEN","url":"imoov/s0850_B01-A---g.png","text":"Brandweer OVD, Officier van Dienst"}
        ,{"cat":"PREPARATIECOMMANDOCENTRA EN UITGANGSSTELLINGEN","url":"imoov/s0860_B01-B---g.png","text":"Brandweer CVD, Commandant van Dienst"}
        ,{"cat":"PREPARATIECOMMANDOCENTRA EN UITGANGSSTELLINGEN","url":"imoov/s0870_B03---g.png","text":"Brandweer Uitgangsstelling"}
        ,{"cat":"PREPARATIECOMMANDOCENTRA EN UITGANGSSTELLINGEN","url":"imoov/s0880_B06---g.png","text":"Brandweer Bluswatervoorziening (algemeen) brandkraan, geboorde put of open water"}
        ,{"cat":"PREPARATIECOMMANDOCENTRA EN UITGANGSSTELLINGEN","url":"imoov/s0890_B07---g.png","text":"Brandkraan 100 mm"}
        ,{"cat":"PREPARATIECOMMANDOCENTRA EN UITGANGSSTELLINGEN","url":"imoov/s0900_B08---g.png","text":"Brandkraan 150 mm"}
        ,{"cat":"PREPARATIECOMMANDOCENTRA EN UITGANGSSTELLINGEN","url":"imoov/s0910_B09---g.png","text":"Brandkraan 200 mm"}
        ,{"cat":"PREPARATIECOMMANDOCENTRA EN UITGANGSSTELLINGEN","url":"imoov/s0920_D02---g.png","text":"Politie, Vaste locatie"}
        ,{"cat":"PREPARATIECOMMANDOCENTRA EN UITGANGSSTELLINGEN","url":"imoov/s0930_D03---g.png","text":"Politie,  Mobiele / tijdelijke locatie"}
        ,{"cat":"PREPARATIECOMMANDOCENTRA EN UITGANGSSTELLINGEN","url":"imoov/s0940_D01-A---g.png","text":"Politie, Officier van Dienst"}
        ,{"cat":"PREPARATIECOMMANDOCENTRA EN UITGANGSSTELLINGEN","url":"imoov/s0950_D07---g.png","text":"Politie, Werkruimte Technische Recherche"}
        ,{"cat":"PREPARATIECOMMANDOCENTRA EN UITGANGSSTELLINGEN","url":"imoov/s0960_C05---g.png","text":"GHOR, Vaste locatie"}
        ,{"cat":"PREPARATIECOMMANDOCENTRA EN UITGANGSSTELLINGEN","url":"imoov/s0970_C06---g.png","text":"GHOR,  Mobiele / tijdelijke locatie"}
        ,{"cat":"PREPARATIECOMMANDOCENTRA EN UITGANGSSTELLINGEN","url":"imoov/s0980_C02---g.png","text":"GHOR, Loodspost"}
        ,{"cat":"PREPARATIECOMMANDOCENTRA EN UITGANGSSTELLINGEN","url":"imoov/s0990_C01-A---g.png","text":"GHOR OVD, Officier van Dienst"}
        ,{"cat":"PREPARATIECOMMANDOCENTRA EN UITGANGSSTELLINGEN","url":"imoov/s1000_C01-B---g.png","text":"GHOR CVD, Commandant van Dienst"}
        ,{"cat":"PREPARATIECOMMANDOCENTRA EN UITGANGSSTELLINGEN","url":"imoov/s1010_C07---g.png","text":"GHOR Ambulancestation"}
        ,{"cat":"PREPARATIECOMMANDOCENTRA EN UITGANGSSTELLINGEN","url":"imoov/s1020---g.png","text":"Huisartsenpost"}
        ,{"cat":"PREPARATIECOMMANDOCENTRA EN UITGANGSSTELLINGEN","url":"imoov/s1030---g.png","text":"Kazerne Defensie"}
        ,{"cat":"PREPARATIECOMMANDOCENTRA EN UITGANGSSTELLINGEN","url":"imoov/s1040---g.png","text":"Beschikbaar groot gebouw"}
        ,{"cat":"PREPARATIECOMMANDOCENTRA EN UITGANGSSTELLINGEN","url":"imoov/s1050---g.png","text":"Materialendepot RWS, Rijkswaterstaat"}
        //,{"cat":"REALITEIT -- CONTEXT DYNAMISCHalgemeen","url":"imoov/s1060---g.png","text":"Verkeersvolume"}
        //,{"cat":"REALITEIT -- CONTEXT STATISCHBESTUURLIJKE GRENZEN","url":"imoov/s1070---g.png","text":"Rijk"}
        //,{"cat":"REALITEIT -- CONTEXT STATISCHBESTUURLIJKE GRENZEN","url":"imoov/s1080---g.png","text":"Provincie"}
        //,{"cat":"REALITEIT -- CONTEXT STATISCHBESTUURLIJKE GRENZEN","url":"imoov/s1090---g.png","text":"Gemeente"}
        //,{"cat":"REALITEIT -- CONTEXT STATISCHBESTUURLIJKE GRENZEN","url":"imoov/s1100---g.png","text":"Waterschap"}
        //,{"cat":"REALITEIT -- CONTEXT STATISCHKAARTONDERGROND “GEWONE SITUATIE”","url":"imoov/s1110---g.png","text":"RD kilometer grid"}
        //,{"cat":"REALITEIT -- CONTEXT STATISCHKAARTONDERGROND “GEWONE SITUATIE”","url":"imoov/s1120---g.png","text":"Hoogtelijnen"}
        //,{"cat":"REALITEIT -- CONTEXT STATISCHKAARTONDERGROND “GEWONE SITUATIE”","url":"imoov/s1130---g.png","text":"Bruggen en tunnels"}
        //,{"cat":"REALITEIT -- CONTEXT STATISCHKAARTONDERGROND “GEWONE SITUATIE”","url":"imoov/s1140---g.png","text":"Gebouwen en bebouwd gebied"}
        //,{"cat":"REALITEIT -- CONTEXT STATISCHKAARTONDERGROND “GEWONE SITUATIE”","url":"imoov/s1150---g.png","text":"Bos"}
        //,{"cat":"REALITEIT -- CONTEXT STATISCHKAARTONDERGROND “GEWONE SITUATIE”","url":"imoov/s1160---g.png","text":"Hoofdweg"}
        //,{"cat":"REALITEIT -- CONTEXT STATISCHKAARTONDERGROND “GEWONE SITUATIE”","url":"imoov/s1170---g.png","text":"Spoorlijn"}
        //,{"cat":"REALITEIT -- CONTEXT STATISCHKAARTONDERGROND “GEWONE SITUATIE”","url":"imoov/s1180---g.png","text":"Water (zomerbedding)"}
        //,{"cat":"REALITEIT -- CONTEXT STATISCHKAARTONDERGROND “GEWONE SITUATIE”","url":"imoov/s1190---g.png","text":"Dijkring"}
        //,{"cat":"REALITEIT -- CONTEXT STATISCHKAARTONDERGROND “GEWONE SITUATIE”","url":"imoov/s1200---g.png","text":"Winterbedding (gewoon hoogwater tot aan de winterdijken)"}
        //,{"cat":"REALITEIT -- CONTEXT STATISCHKAARTONDERGROND “GEWONE SITUATIE”","url":"imoov/s1210---g.png","text":"Topografische kaart [ geen symbool maar een kopie van een kaartondergrond ]"}
        ]
   },
  definedlayers:{
      //brt: {
      //    name: 'BRT',
      //    url: 'http://geodata.nationaalgeoregister.nl/tms/1.0.0/brtachtergrondkaart/{z}/{x}/{y}.png',
      //    type: 'xyz',
      //    layerOptions: {
      //        tms: true
      //    }
      //}
      //osm: {
      //      name: "Openstreetmap",
      //      url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      //      type: 'xyz'
      //  },
      //osm_grey: {
      //    name: 'OSM grey',
      //    url: 'http://a.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png',
      //    type: 'xyz'
      //},
	  "VAEBG1": {
		type: "dynamic",
		name: "Basemap (EN) ",
		visible: false,
		url: "/service/abudhabi/rest/services/BaseMapEnglish/MapServer", 
		layerOptions: {"layers":"show:0"}
	  }
  },
  layers:{
    
    "VAE001": {type: "overlay", category: "CharityAndWorship", layer: {type: "dynamic",visible: true,"name": "Mosques ", "url": "/service/abudhabi/rest/services/CharityAndWorship/MapServer", "layerOptions": {"layers":"show:0",position: 'back'}}}, 
	"VAE027": {type: "overlay", category: "Weather", layer: {type: "dynamic",visible: true,"name": "MSL Pressure ", "url": "/service/abudhabi/rest/services/PublicData/MapServer", "layerOptions": {"layers":"show:27"}}},
    "VAE028": {type: "overlay", category: "Weather", layer: {type: "dynamic",visible: true,"name": "Mean Temperature ", "url": "/service/abudhabi/rest/services/PublicData/MapServer", "layerOptions": {"layers":"show:28",position: 'back'}}},
	"VAE029": {type: "overlay", category: "Weather", layer: {type: "dynamic",visible: true,"name": "Mean Relative Humidity ", "url": "/service/abudhabi/rest/services/PublicData/MapServer", "layerOptions": {"layers":"show:29",position: 'back'}}},
	"VAE030": {type: "overlay", category: "Weather", layer: {type: "dynamic",visible: true,"name": "Mean Minimum Temperature", "url": "/service/abudhabi/rest/services/PublicData/MapServer", "layerOptions": {"layers":"show:30",position: 'back'}}},
	"VAE031": {type: "overlay", category: "Weather", layer: {type: "dynamic",visible: true,"name": "Mean Maximum Temperature ", "url": "/service/abudhabi/rest/services/PublicData/MapServer", "layerOptions": {"layers":"show:31",position: 'back'}}},
	"VAE032": {type: "overlay", category: "Weather", layer: {type: "dynamic",visible: true,"name": "Absolute Minimum Temperature ", "url": "/service/abudhabi/rest/services/PublicData/MapServer", "layerOptions": {"layers":"show:32",position: 'back'}}},
	"VAE033": {type: "overlay", category: "Weather", layer: {type: "dynamic",visible: true,"name": "Absolute Maximum Temperature ", "url": "/service/abudhabi/rest/services/PublicData/MapServer", "layerOptions": {"layers":"show:33",position: 'back'}}},
	"VAE035": {type: "overlay", category: "Environment", layer: {type: "dynamic",visible: true,"name": "Tide Stations", "url": "/service/abudhabi/rest/services/PublicData/MapServer", "layerOptions": {"layers":"show:35",position: 'back'}}},
	"VAE036": {type: "overlay", category: "Environment", layer: {type: "dynamic",visible: true,"name": "Marine Site Data", "url": "/service/abudhabi/rest/services/PublicData/MapServer", "layerOptions": {"layers":"show:36",position: 'back'}}},
	"VAE037": {type: "overlay", category: "Environment", layer: {type: "dynamic",visible: true,"name": "Fishing Landing Sites", "url": "/service/abudhabi/rest/services/PublicData/MapServer", "layerOptions": {"layers":"show:37",position: 'back'}}},
	"VAE038": {type: "overlay", category: "Environment", layer: {type: "dynamic",visible: true,"name": "Dredged Channel", "url": "/service/abudhabi/rest/services/PublicData/MapServer", "layerOptions": {"layers":"show:38",position: 'back'}}},
	"VAE039": {type: "overlay", category: "Environment", layer: {type: "dynamic",visible: true,"name": "Protected Areas", "url": "/service/abudhabi/rest/services/PublicData/MapServer", "layerOptions": {"layers":"show:39",position: 'back'}}},
	"VAE040": {type: "overlay", category: "Environment", layer: {type: "dynamic",visible: true,"name": "Coastal Soils", "url": "/service/abudhabi/rest/services/PublicData/MapServer", "layerOptions": {"layers":"show:40",position: 'back'}}},
	"VAE041": {type: "overlay", category: "Environment", layer: {type: "dynamic",visible: true,"name": "Geology", "url": "/service/abudhabi/rest/services/PublicData/MapServer", "layerOptions": {"layers":"show:41",position: 'back'}}},
	"VAE042": {type: "overlay", category: "Weather", layer: {type: "dynamic",visible: true,"name": "Farms", "url": "/service/abudhabi/rest/services/PublicData/MapServer", "layerOptions": {"layers":"show:42",position: 'back'}}},
	"VAE043": {type: "overlay", category: "Weather", layer: {type: "dynamic",visible: true,"name": "Agriculture", "url": "/service/abudhabi/rest/services/PublicData/MapServer", "layerOptions": {"layers":"show:43",position: 'back'}}},
	"VAE044": {type: "overlay", category: "Weather", layer: {type: "dynamic",visible: true,"name": "Terrestrial Habitat", "url": "/service/abudhabi/rest/services/PublicData/MapServer", "layerOptions": {"layers":"show:44",position: 'back'}}},
	"VAE046": {type: "overlay", category: "Planning", layer: {type: "dynamic",visible: true,"name": "Road Schemes", "url": "/service/abudhabi/rest/services/PublicData/MapServer", "layerOptions": {"layers":"show:46",position: 'back'}}},
    "VAE047": {type: "overlay", category: "Planning", layer: {type: "dynamic",visible: true,"name": "Precincts", "url": "/service/abudhabi/rest/services/PublicData/MapServer", "layerOptions": {"layers":"show:47",position: 'back'}}},
	
    //,"nachtkaart": {"type": "baselayer", "category": "Achtergrond", "layer": {
    //      name: 'Grijstinten',
    //      url: 'http://services.geodan.nl/tms/1.0.0/nachtkaart_EPSG28992/{z}/{x}/{y}.png',
    //      type: 'xyz',
    //      visible: 'true',
    //      layerOptions: {
    //          tms: true
    //      }
    //  }
    //}
    //,"top10nl": {"type": "baselayer", "category": "Achtergrond", "layer": {
    //      name:  'Top10',
    //      url: 'http://services.geodan.nl/tms/1.0.0/topokaart_EPSG28992/{z}/{x}/{y}.png',
    //      type: 'xyz',
    //      visible: 'true',
    //      layerOptions:{
    //          tms:true
    //      }
    //  }
    //}
   } 
};
