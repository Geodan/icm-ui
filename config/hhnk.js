var icmconfig = {
  "crs": new L.Proj.CRS.TMS(
     'EPSG:28992',
     '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs',
     [-285401.92,22598.08,595401.9199999999,903401.9199999999], {
     resolutions: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420]
  }),
  "center": {
      lat: 52.752087, //Approx HHNK
      lng: 4.896941,
      zoom: 5
  },
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
        ,{"cat":"REALITEIT -- RAMPEN / ONGEVALLENRAMPZONES","url":"imoov/s0070---g.png","text":"Brongebied"}
        ,{"cat":"REALITEIT -- RAMPEN / ONGEVALLENRAMPZONES","url":"imoov/s0080---g.png","text":"Effectgebied, huidige situatie"}
        ,{"cat":"REALITEIT -- RAMPEN / ONGEVALLENRAMPZONES","url":"imoov/s0090---g.png","text":"Effectgebied, prognose"}
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
        ,{"cat":"REALITEIT -- EXTRA RISICO’SBETROKKEN PERSONEN","url":"imoov/s0390---g.png","text":"Aantal (gezonde) bewoners [ zwart getal interactief toevoegen ]"}
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
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGEVACUATIE EN LOGISTIEK","url":"imoov/s0690---g.png","text":"Evacuatiegebied, grens"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGEVACUATIE EN LOGISTIEK","url":"imoov/s0700---g.png","text":"Evacuatieroute"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGEVACUATIE EN LOGISTIEK","url":"imoov/s0710---g.png","text":"Evacuatie richting"}
        ,{"cat":"REPRESSIE / RAMPENBESTRIJDINGEVACUATIE EN LOGISTIEK","url":"imoov/s0720---g.png","text":"Extra aanvoerroutes hulpdiensten"}
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
        ,{"cat":"REALITEIT -- CONTEXT DYNAMISCHalgemeen","url":"imoov/s1060---g.png","text":"Verkeersvolume"}
        ,{"cat":"REALITEIT -- CONTEXT STATISCHBESTUURLIJKE GRENZEN","url":"imoov/s1070---g.png","text":"Rijk"}
        ,{"cat":"REALITEIT -- CONTEXT STATISCHBESTUURLIJKE GRENZEN","url":"imoov/s1080---g.png","text":"Provincie"}
        ,{"cat":"REALITEIT -- CONTEXT STATISCHBESTUURLIJKE GRENZEN","url":"imoov/s1090---g.png","text":"Gemeente"}
        ,{"cat":"REALITEIT -- CONTEXT STATISCHBESTUURLIJKE GRENZEN","url":"imoov/s1100---g.png","text":"Waterschap"}
        ,{"cat":"REALITEIT -- CONTEXT STATISCHKAARTONDERGROND “GEWONE SITUATIE”","url":"imoov/s1110---g.png","text":"RD kilometer grid"}
        ,{"cat":"REALITEIT -- CONTEXT STATISCHKAARTONDERGROND “GEWONE SITUATIE”","url":"imoov/s1120---g.png","text":"Hoogtelijnen"}
        ,{"cat":"REALITEIT -- CONTEXT STATISCHKAARTONDERGROND “GEWONE SITUATIE”","url":"imoov/s1130---g.png","text":"Bruggen en tunnels"}
        ,{"cat":"REALITEIT -- CONTEXT STATISCHKAARTONDERGROND “GEWONE SITUATIE”","url":"imoov/s1140---g.png","text":"Gebouwen en bebouwd gebied"}
        ,{"cat":"REALITEIT -- CONTEXT STATISCHKAARTONDERGROND “GEWONE SITUATIE”","url":"imoov/s1150---g.png","text":"Bos"}
        ,{"cat":"REALITEIT -- CONTEXT STATISCHKAARTONDERGROND “GEWONE SITUATIE”","url":"imoov/s1160---g.png","text":"Hoofdweg"}
        ,{"cat":"REALITEIT -- CONTEXT STATISCHKAARTONDERGROND “GEWONE SITUATIE”","url":"imoov/s1170---g.png","text":"Spoorlijn"}
        ,{"cat":"REALITEIT -- CONTEXT STATISCHKAARTONDERGROND “GEWONE SITUATIE”","url":"imoov/s1180---g.png","text":"Water (zomerbedding)"}
        ,{"cat":"REALITEIT -- CONTEXT STATISCHKAARTONDERGROND “GEWONE SITUATIE”","url":"imoov/s1190---g.png","text":"Dijkring"}
        ,{"cat":"REALITEIT -- CONTEXT STATISCHKAARTONDERGROND “GEWONE SITUATIE”","url":"imoov/s1200---g.png","text":"Winterbedding (gewoon hoogwater tot aan de winterdijken)"}
        ,{"cat":"REALITEIT -- CONTEXT STATISCHKAARTONDERGROND “GEWONE SITUATIE”","url":"imoov/s1210---g.png","text":"Topografische kaart [ geen symbool maar een kopie van een kaartondergrond ]"}
        ]
   },
  definedlayers:{
      brt: {
          name: 'BRT',
          url: 'http://geodata.nationaalgeoregister.nl/tms/1.0.0/brtachtergrondkaart/{z}/{x}/{y}.png',
          type: 'xyz',
          layerOptions: {
              tms: true
          }
      }
  },
  layers:{
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
    "HHNK101a": {"type": "baselayer", "category": "Achtergrond", "layer": {"type": "wms", "visible": true, "name": "Luchtfoto 2013", "url": "http://geoweb.hhnk.nl:6080/arcgis/services/tiled/luchtfoto_2013/MapServer/WMSServer", "layerOptions": {"layers": "show:10"}}},
    "HHNK102": {"type": "baselayer", "category": "Achtergrond", "layer": {"type": "wms", "visible": true, "name": "AHN2 gefilterd", "url": "http://geoweb.hhnk.nl:6080/arcgis/services/extra_tiled/ahn2_gefilterd/MapServer/WMSServer", "layerOptions": {"layers":"show:0"}}},
    "HHNK103": {"type": "baselayer", "category": "Achtergrond", "layer": {
              name:  'Top10NL',
              url: 'http://geoweb.hhnk.nl:6080/arcgis/rest/services/tiled/topo_vlak_256_exploded/MapServer/WMTS/tile/1.0.0/topo_vlak_256_exploded/{z}/{x}/{y}.png',
              type: 'xyz',
              layerOptions:{
                  tms:false
              }
       }
    },
    
    "brp":     {"type": "overlay", "category": "Extern", "layer": {"type": "betterwms","visible": true, "name": "Gewaspercelen","url": "http://research.geodan.nl/service/ngr/brpgewaspercelen/wms","layerOptions": {"layers": "brpgewaspercelen","format": "image/png","transparent": true}}},
    zwemwater:{type: 'overlay', category: 'Extern', layer: {type: 'betterwms',visible: true, name: "Zwemwater locatie",url: 'http://www.zwemwater.nl/zwr-ogc/services/zwr-wms',layerOptions: {layers: 'zwemwaterlocatie',format: 'image/png',transparent: true}}},
    zw_gebied:{type: 'overlay', category: 'Extern', layer: {type: 'betterwms',visible: true, name: "Zwemwater gebied",url: 'http://www.zwemwater.nl/zwr-ogc/services/zwr-wms',layerOptions: {layers: 'gebied',format: 'image/png',transparent: true}}},
    golffront: {type: 'overlay', category: '3Di', layer:{ 
            name: "Golffront",
            type:  'betterwms',
            url:"http://research.geodan.nl/service/lizard/geoserver/floodapp/wms", 
            visible: true,
            layerOptions: {
                layers: 'floodapp:golffront_shp',
                format: 'image/png',
                transparent: true
            }
        }
    },
    waterdepth: {type: 'overlay', category: '3Di', layer:{ 
            name: "Waterdiepte",
            type:  'betterwms',
            url:"http://research.geodan.nl/service/lizard/geoserver/floodapp/wms", 
            visible: true,
            layerOptions: {
                layers: 'floodapp:Waterdepth_petten',
                format: 'image/png',
                transparent: true
            }
        }
    }
    ,"nachtkaart": {"type": "baselayer", "category": "Achtergrond", "layer": {
          name: 'Grijstinten',
          url: 'http://services.geodan.nl/tms/1.0.0/nachtkaart_EPSG28992/{z}/{x}/{y}.png',
          type: 'xyz',
          visible: 'true',
          layerOptions: {
              tms: true
          }
      }
    }
    ,"top10nl": {"type": "baselayer", "category": "Achtergrond", "layer": {
          name:  'Top10',
          url: 'http://services.geodan.nl/tms/1.0.0/topokaart_EPSG28992/{z}/{x}/{y}.png',
          type: 'xyz',
          visible: 'true',
          layerOptions:{
              tms:true
          }
      }
  }
   } 
};
