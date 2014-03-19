var tmp; //DEBUG


icm.controller('LeafletController', [ '$scope','$http','$timeout','Core', 'Utils', "leafletData",'leafletEvents','LeafletService',function($scope, $http, $timeout, Core, Utils,  leafletData, leafletEvents, LeafletService) {
    if(!Core.project()) {
        //return false;
    }
    
    $scope.radioModel = 'pan';
    var core = Core;
    $scope.core = core;
    /** Some time functionality **/
    $scope.chronos = false;
    $scope.timeDisplay = 'none';
    $scope.mytime = new Date();
    $scope.hstep = 1;
    $scope.mstep = 15;
    $scope.ismeridian = true;
    $scope.time = Date.now();
    $scope.timechanged = function () {
        console.log('Time changed to: ' + $scope.mytime);
        $scope.time = new Date($scope.mytime).getTime();
        populateFeatures();
    };
    $scope.setNow = function() {
        var d = new Date();
        $scope.mytime = d;
        $scope.timechanged();
    };
    $scope.toggleChronos = function(){
        populateFeatures();
    };
    /** end of time **/
    
    
    //tmp = $scope; //DEBUG
    var controls= {};
    var drawControl;
    $scope.icontypes = {};
    $scope.leafletService = LeafletService;
    //$scope.leafletData = leafletData;
    
    $scope.icmlayers = [];
    
    var initcenter = {
        lat: 52.752087, //Approx HHNK
        lng: 4.896941,
        zoom: 9
    };
    var incidentlocation = Core.project().data('incidentlocation') || initcenter;
    angular.extend($scope, {
        markers: {},
        extralayers: LeafletService.layers,
        layers: {
            baselayers: LeafletService.definedLayers,
            overlays: LeafletService.definedOverlays
        },
        initcenter: LeafletService.center() || incidentlocation,
        defaults: {
            maxZoom: 11,
            crs: LeafletService.projection()
        }
    });
    
    
    //FIXME: d3 layer still expects initial feature collection with at least 1 feature
    var dummyfeature = { 
            "id": 0,
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [ 0, 1],[0,3],[2,3],[2,1],[0,1]
                ]]
            },
         "properties": {
            "uid":0,
            "owner": 0,
            "label":""
        }
    };
    var dummyCollection = {"type":"FeatureCollection","features":[dummyfeature]};
    var extentLayer = new L.GeoJSON.d3(dummyCollection, {
        labels: true,
        labelconfig: {
            field: "owner",
            style: {
                stroke: "steelBlue"
            }
        },
        style: {
                fill: "none",
                stroke: "steelBlue",
                'stroke-width': 2,
                textlocation: "ul"
        }
    });
    var locationLayer = new L.GeoJSON.d3(dummyCollection, {
        labels: true,
        labelconfig: {
            field: "owner",
            style: {
                stroke: "steelBlue"
            }
        },
        style: {
                fill: "steelBlue",
                stroke: "steelBlue",
                'stroke-width': 2,
                textlocation: "ul"
        }
    });
    //LeafletService.layers.icmlayers.locationLayer = locationLayer;
    
    var editmenu = function(feat,container, element, event){
        if ($scope.chronos){
            return null;
        }
        else {
            var menu = new Cow_utils.menu(feat,event, container, element, {
                menuconfig: Cow_utils.menuconfig
            });
            /* Menu listeners */
            menu.on('delete', function(d){
                if (confirm('Verwijderen?')) {
                    var key = d.fid;
                    Core.project().items(key).deleted('true').sync();
                } else {
                    // Do nothing!
                }
            });
            menu.on('edit.geom', function(d){
                drawControl.options.edit.featureGroup.addData(d.layer);
                controls.editcontrol.enable();
             });
            
            
            menu.on('model.populator', function(d){
                var populator_callback = function(xml){
                    $scope.map.spin(false);
                    var acts = d3.select(xml).selectAll('PopulationPerActivity');
                    var text = '';
                    acts.each(function(d){
                        text = text + d3.select(this).select('sActivity').html() + ': ';
                        text = text + d3.select(this).select('sPopulation').html();
                        text = text + '<br>';
                    });
                    var feat = d.layer;
                    var fid = d.fid;
                    var item = $scope.core.project().items(fid);
                    var entity = d.obj;
                    var bbox = entity.getBBox();
                    var fe = d3.select('.leaflet-popup-pane')
                        .attr('draggable',"true")
                        .append('div')
                        .classed('popup panel panel-primary',true)
                        .style('position', 'absolute')
                        .style('left', function(){return bbox.x + 35 + 'px';})
                        .style('top', function(){return bbox.y + 35 + 'px';})
                        .style("width", '400px')
                        .on('click', function(){
                            d3.event.stopPropagation();//Prevent the map from firing click event as well
                        });
                        
                    var desc = feat.properties.desc || "";
                    var name = feat.properties.name || "";
                    var creator = feat.properties.creator || "";
                    var owner = feat.properties.owner || "";
                    var created = new Date(item.created()).toLocaleString();
                    var updated = new Date(item.timestamp()).toLocaleString();
                    desc = desc.replace(/\r\n?|\n/g, '<br />');
                    desc = desc + '<h4>Populatie:</h4><br>' + text;
                    name = '(Populatie) ' + name;
                    var sheader = fe.append('div')
                        .classed('panel-heading', true)
                        .attr('contenteditable','true')
                        .html(name);
        
                    var scontent = fe.append('div')
                        .classed('panel-body', true);
                    
                    
                    var editdiv = scontent.append('div')
                        .attr('contenteditable','true')
                        .attr('id','descfield')
                        .style('overflow','scroll')
                        .style('height','180px')
                        .style('max-height','180px')
                        .html(desc);
                    var html = '<small>Gemaakt door: ' + creator + ' op ' +  created + '<br> Bewerkt door: ' + owner + ' op ' + updated + '</small>'; 
                    scontent.append('div').html(html);
                    scontent.append('span')
                        .html('Opslaan')
                        .classed('btn btn-success', true)
                        .on('click',function(z){
                            feat.properties.name = sheader.html();
                            feat.properties.desc = editdiv.html();
                            $scope.core.project().items(fid).data('feature',feat).sync();
                            fe.remove();
                    });
                    scontent.append('span')
                        .html('Annuleren')
                        .classed('btn btn-danger pull-right', true)
                        .on('click',function(z){
                            fe.remove();
                        });
                };
                // take a primitive and convert it into a WKT representation
                var toproj = proj4.Proj('+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.999908 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs ');
                var geojson = JSON.parse(JSON.stringify(d.layer)); //Clone object
                Terraformer.Tools.applyConverter(geojson, function(coordinate){
                    return proj4(toproj,coordinate);
                });
                var geom = Terraformer.WKT.convert(geojson.geometry);
                var user = 'kylbv.test_1';
                var pass = 'leclesuros';
                var analysetypes = '&eAnalyzeTypes=MAXIMUM';
                //var activities = '&sActivityList=wonena&sActivityList=werken&sActivityList=onderw&sActivityList=kinder&sActivityList=jstinr&sActivityList=asielz&sActivityList=uitvrt&sActivityList=zorgin&sActivityList=zieken&sActivityList=dagrec&sActivityList=zalena&sActivityList=beurze&sActivityList=evenem&sActivityList=prkcmp&sActivityList=sporta&sActivityList=hotels&sActivityList=nieuwb&sActivityList=totaal&sActivityList=totstr&sActivityList=tottyd';
                var activities = '&sActivityList=wonena&sActivityList=werken&sActivityList=onderw&sActivityList=kinder&sActivityList=zorgin&sActivityList=zieken&sActivityList=hotels&sActivityList=totaal';
                $scope.map.spin(true);
                d3.xml('/service/bridgis/geowebservice/populatoranalyze.asmx/RetrieveWKT?sUser='+user+'&sPassword='+pass+'&sWKTArea=' + geom + '' + analysetypes + ''+ activities + '',populator_callback);
            });
            menu.on('edit.text', function(d){
                var feat = d.layer;
                var fid = d.fid;
                var item = $scope.core.project().items(fid);
                var entity = d.obj;
                var bbox = entity.getBBox();
                var fe = d3
                    .select('.leaflet-popup-pane')
                    .attr('draggable',"true")
                    .append('div')
                    .classed('popup panel panel-primary',true)
                    .style('position', 'absolute')
                    .style('left', function(){return bbox.x + 35 + 'px';})
                    .style('top', function(){return bbox.y + 35 + 'px';})
                    .style("width", '400px')
                    .on('click', function(){
                        d3.event.stopPropagation();//Prevent the map from firing click event as well
                    });
                    
                var desc = feat.properties.desc || "";
                var name = feat.properties.name || "";
                var creator = feat.properties.creator || "";
                var owner = feat.properties.owner || "";
                var created = new Date(item.created()).toLocaleString();
                var updated = new Date(item.timestamp()).toLocaleString();
                desc = desc.replace(/\r\n?|\n/g, '<br />');
                
                
                var sheader = fe.append('div')
                    .classed('panel-heading', true)
                    //.attr('contenteditable','true')
                    .on('click', function(){
                        this.contentEditable=true;
                        this.focus();
                    })
                    .on('blur', function(){
                        this.contentEditable=false;
                    })
                    .html(name);
    
                var scontent = fe.append('div')
                    .classed('panel-body', true);
                
                
                var editdiv = scontent.append('div')
                    //.attr('contenteditable','true')
                    .attr('id','descfield')
                    //.classed('well well-sm', true)
                    .style('overflow','scroll')
                    .style('height','180px')
                    .style('max-height','180px')
                    .on('click', function(){
                        this.contentEditable=true;
                        this.focus();
                    })
                    .on('blur', function(){
                        this.contentEditable=false;
                    })
                    .html(desc);
                var html = '<small>Gemaakt door: ' + creator + ' op ' +  created + '<br> Bewerkt door: ' + owner + ' op ' + updated + '</small>'; 
                scontent.append('div').html(html);
                scontent.append('span')
                    .html('Opslaan')
                    .classed('btn btn-success', true)
                    .on('click',function(z){
                        feat.properties.name = sheader.html();
                        feat.properties.desc = editdiv.html();
                        $scope.core.project().items(fid).data('feature',feat).sync();
                        fe.remove();
                    });
                scontent.append('span')
                    .html('Annuleren')
                    .classed('btn btn-danger pull-right', true)
                    .on('click',function(z){
                        fe.remove();
                    });
            });
        }
    };
    var textbox = function(feat,container, element, event){
        //TODO
    };
    var featureLayer = new L.GeoJSON.d3(dummyCollection, {
        //core: Core,
        onClick: editmenu,
        onMouseover: textbox,
        labels: true,
        labelconfig: {
            field: "name",
            style: {
                'stroke-width': 0.2,
                stroke: "#000033"
            }
        },
        style: {
            fill: "none",
            stroke: "steelBlue",
            'stroke-width': 2,
            opacity: 0.5
        }
    });
    $scope.featureLayer = featureLayer;
    //LeafletService.layers.icmlayers.featureLayer = featureLayer;
    
    $scope.icontypes = LeafletService.icontypes;
    $scope.linestyles = LeafletService.linestyles;
    $scope.polygonstyles = LeafletService.polygonstyles;
    $scope.currentstyle = LeafletService.currentstyle;
    
    //Identify ESRI features
    var identify = function(event){
        var e = event.leafletEvent;
        leafletData.getLayers().then(function(lllayers){
            var dynamiclayers = _($scope.layers.overlays).filter(function(d){return d.type == 'esri_map';});
            _.each(dynamiclayers,function(dynLayer){
                lllayers.overlays[dynLayer.name].identify(e.latlng, function(data) {
                  if(data.error){
                      throw data.error;
                  }
                  if(data.results.length > 0) {
                    //Popup text should be in html format.  Showing all the attributes
                    popupText = '';
                    _.each(data.results[0].attributes, function(val,key){
                            popupText =  popupText + "<b>" + key + "</b>:&nbsp;" + val + "<br>";
                    });
        
                    //Add Popup to the map when the mouse was clicked at
                    var popup = L.popup()
                      .setLatLng(e.latlng)
                      .setContent(popupText)
                      .openOn(map);
                  }
                });
            });
        });
     };

    
    /** Map Listeners **/
    $scope.$on('leafletDirectiveMap.moveend', function(event,e){
        //d3.selectAll('.popup').remove();//Remove all popups on map
        handleNewExtent(e.leafletEvent); 
    });
    $scope.$on('leafletDirectiveMap.click', function(event,e){
        //d3.selectAll('.popup').remove();//Remove all popups on map
        controls.editcontrol.save();
        controls.editcontrol.disable();
        identify(e);
    });
    $scope.$on('leafletDirectiveMap.load', function (event, args) {
        initmap();
    });
    
    
  
    
    
    //Toggle baselayers
    $scope.toggleLayer = function(val) {
        var baselayers = $scope.layers.baselayers;
        var layerName = val.layer.name;
        if (baselayers.hasOwnProperty(layerName)) {
            val.buttonclass = false;
            delete baselayers[layerName];
            //map.removeLayer(val.layer);
        } else {
            val.buttonclass = true;
            baselayers[layerName] = val.layer;
            //map.addLayer(val.layer);
        }
    };
    //Toggle overlays
    $scope.toggleOverlay = function(val) {
        var overlays = $scope.layers.overlays;
        var overlayName = val.layer.name;
        if (overlays.hasOwnProperty(overlayName)) {
            delete overlays[overlayName];
            val.buttonclass = false;
        } else {
            overlays[overlayName] = val.layer;
            val.buttonclass = true;
        }
    };
    //Toggle icm layers
    $scope.toggleIcmLayer = function(val) {
        console.log(val); //TODO
        if ($scope.map.hasLayer(val)){
            $scope.map.removeLayer(val);
            val.buttonclass = false;
        }
        else{
            $scope.map.addLayer(val);
            val.buttonclass = true;
        }
    };
    
    /** END OF SECTION EXTRA LAYERS **/
    
    
    /** draw cow features on map **/
    var populateFeatures = function(){
      var items = _(core.project().items()).filter(function(d){
            return (!d.deleted() && d.data('type')=='feature');
      });
      var editCollection  = {"type":"FeatureCollection","features":[]};
      var viewCollection = {"type":"FeatureCollection","features":[]};
      for (i=0;i<items.length;i++){
		    var item = items[i];
		    var t;
		    if ($scope.chronos){
		        t = $scope.time;
		    }
		    else {
		        t = Date.now();
		    }
			//var feature = item.data('feature');
            if(item.data_on(t) && item.data_on(t).feature) {
                var feature = item.data_on(t).feature;
                //Add feature
                var opacity = 1;
                feature.id = item.id();
                var props = feature.properties;

                feature.style = {
                    "marker-url": props['marker-url'] || './images/mapicons/imoov/s0620_B12---g.png',
                    stroke: props.stroke || "#555555",
                    fill:  props.fill || "#555555",
                    "fill-opacity": props['fill-opacity'] ||0.5,
                    opacity: props.opacity || 1
                };
                feature.id = feature.properties.key = item.id();
                //Workaround for lines with a fill
                if (feature.geometry.type == 'LineString'){
                    feature.style.fill = 'none';
                    feature.properties.fill = 'none';
                }
                editCollection.features.push(feature);
			}
		}
		if (featureLayer){
		    console.log('Redrawing features');
			featureLayer.data(editCollection);
		    featureLayer.updateData($scope.map);
		}
    };
    //Anything changed in the peers store results in redraw of peer items (extents & points)
    var populatePeers = function(){
        var self = this;
        var extentCollection = {"type":"FeatureCollection","features":[]};
        var locationCollection  = {"type":"FeatureCollection","features":[]};
        //Get active peers
        var peers = _(Core.peers())
            .filter(function(d){
                return (!d.deleted());
            });
        
        for (i=0;i<peers.length;i++){
            var peer = peers[i];
            if (peer.data('extent') && peer.id() != core.peerid()){
                extentCollection.features.push(peer.data('extent'));
            }
            if (peer.data('location') && peer.id() != core.peerid()){
                //Own location is handled somewhere else
                locationCollection.features.push(peer.data('location'));
            }
        }
        //Update layer with extents
        /* EXTENT LAYER disabled
        if (extentLayer){
            //self.extentLayer.clearLayers();
            //self.extentLayer.addData(extentCollection);
            extentLayer.data(extentCollection);
            extentLayer.updateData(map);
        }
        */
        //Update layer with locations
        if (locationLayer){
            //self.locationLayer.clearLayers();
            //self.locationLayer.addData(locationCollection);
            locationLayer.data(locationCollection);
            locationLayer.updateData($scope.map);
        }
    };
    var handleNewExtent = function(e){
        var center = e.target.getCenter();
        var zoom = e.target.getZoom();
        //Set center
        $scope.leafletService.center({lat: center.lat, lng:center.lng, zoom: zoom}); 
        var bounds = e.target.getBounds();
        var bbox = {
            left: bounds.getWest(),
            bottom: bounds.getSouth(),
            right: bounds.getEast(),
            top: bounds.getNorth()
        };
        var b = [bbox.left,bbox.bottom,bbox.right,bbox.top];
        var peerid = core.peerid(); //TODO: core
        var username = core.user().data('name'); //TODO: core 
        var feature = { "id": peerid,
                        "type": "Feature",
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [
                                [ [b[0], b[1]],[b[0],b[3]],[b[2],b[3]],[b[2],b[1]],[b[0],b[1]]
                                ]
                            ]
                        },
                     "properties": {
                        "uid":peerid,
                        "owner": username,
                        "label":""
                    }
                };
        /* DISABLED         
        if (core.peerid()){
            var peer = core.peers(core.peerid());
            peer.data('extent',feature).sync();
        }
        */
    };


    
    /** 
        initmap() - called after first mapload
            Handles most of the ICMS stuff that didn't fit into angular
    **/
    
    var initmap = function(){
      leafletData.getMap('mainmap').then(function(map) {
        $scope.map = map;
        
        //Set correct projection for map
        map.options.crs = LeafletService.projection();
        
        /** ADD LAYERS **/
        map.addLayer(extentLayer);
        map.addLayer(featureLayer);

        /** SETUP DRAWING FUNCTIONALITY **/
        // Use a geoJson object for the drawnItems instead of featureGroup
        var drawnItems = new L.geoJson();
        map.addLayer(drawnItems);
        drawControl = new L.Control.Draw({
            draw: false,
            edit: {
                featureGroup: drawnItems,
                edit: false,
                remove: false
            }
        });
        map.addControl(drawControl);
       
        controls.pointcontrol = new L.Draw.Marker(map,  drawControl.options.Marker);
        controls.linecontrol = new L.Draw.Polyline(map, drawControl.options.polyline);  
        controls.polycontrol =  new L.Draw.Polygon(map, drawControl.options.polygon);
        controls.editcontrol = new L.EditToolbar.Edit(map, {
                featureGroup: drawControl.options.edit.featureGroup,
                selectedPathOptions: drawControl.options.edit.selectedPathOptions
            });
        
        map.on("draw:edited", function(e,x){
            var layers = e.layers;
            layers.eachLayer(function (layer) {
                var geojson = layer.toGeoJSON();
                var fid = layer.feature.id;
                var feature = core.project().items(fid).data('feature');
                feature.geometry = geojson.geometry;
                //First transform into featurestore item
                var item = core.project().items(fid)
                    .data('feature',feature)
                    .sync();
            });
            drawControl.options.edit.featureGroup.clearLayers();
            //populateFeatures();
        }); 

        map.on('draw:created', function (e) {
            var type = e.layerType,
            layer = e.layer;
			var feature = layer.toGeoJSON();
		
            var d = new Date();
            var timestamp = d.getTime();
            feature.properties.key = core.peerid() + "_" + timestamp;
            feature.properties.creator = core.user().data('name');
            feature.properties.owner = core.user().data('name');
            feature.properties['marker-url'] = './images/mapicons/' + $scope.currentstyle.icon.url;
            //Stroke depends on what kind of geom we're drawing
            if (controls.polycontrol.enabled()){
                feature.properties.stroke = $scope.currentstyle.polygon.stroke;
            }
            else {
                feature.properties.stroke = $scope.currentstyle.line.stroke;
            }
            feature.properties.fill = $scope.currentstyle.polygon.fill;
            feature.properties['stroke-width'] = 3;
            
            var id = core.peerid() + "_" + timestamp;
            var mygroups = core.project().myGroups();
            var item = core.project().items({_id:id})
                .data('type','feature')
                .data('feature', feature)
                //TODO: add permissions here
                .sync();

        });
        
        /** Bind layer reload on storechanged **/
        var itemstore = core.project().itemStore();
        var peerstore = core.peerStore();

        itemstore.off('datachange',populateFeatures);
        itemstore.on('datachange',populateFeatures);
        peerstore.off('datachange',populatePeers);
        peerstore.on('datachange',populatePeers);
        
        //Initialize first time features
        populateFeatures();
        
      });
    };  
 
    //leafletData.getLayers().then(function(layers){
    //        $scope.leafletLayers = layers;
    //});
   
    $scope.drawPoint = function(style){
        $scope.currentstyle.icon = style;
        controls.pointcontrol.enable();
        controls.polycontrol.disable();
        controls.linecontrol.disable();
    };
    $scope.drawLine = function(style){
        $scope.currentstyle.line = style;
        controls.pointcontrol.disable();
        controls.polycontrol.disable();
        controls.linecontrol.enable();
    };
    $scope.drawPolygon = function(style){
        $scope.currentstyle.polygon = style;
        controls.pointcontrol.disable();
        controls.polycontrol.enable();
        controls.linecontrol.disable();
    };
    
}]);

