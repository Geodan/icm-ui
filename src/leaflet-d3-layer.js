/*
Based on: https://github.com/rclark/leaflet-d3-layer/blob/master/dist/scripts/leaflet-d3-layer.js
*/

(function() {
  var root;

  root = this;

  L.GeoJSON.d3 = L.GeoJSON.extend({
    
    initialize: function(geojson, options) {
      this.geojson = geojson;
      this.core = options.core;
      options = options || {};
      options.layerId = options.layerId || ("leaflet-d3-layer-" + (Math.floor(Math.random() * 101)));
      options.onEachFeature = function(geojson, layer) {};
      
      L.setOptions(this, options);
      this._layers = {};
      return this._layers;
    },
    
    data: function(data){
        if (data){
            this.geojson = data;
            if (data.features.length > 0){
                this.reload();
            }
            return this;
        }
        else {
            return this.geojson;
        }
    },
    reload: function(){
        var f;
        var self = this;
        var map = self._map;
        var project = function(d3pnt) {
            //if (!isNaN(d3pnt[0]) && !isNaN(d3pnt[1])){
                var geoPnt, pixelPnt;
                geoPnt = new L.LatLng(d3pnt[1], d3pnt[0]);
                pixelPnt = map.latLngToLayerPoint(geoPnt);
                return [pixelPnt.x, pixelPnt.y];
            //}
            //else {
            //    console.warn('Projecting invalid point: ', d3pnt);
            //    return [0,0];
            //}
        };
        this.project = project;
        var options = self.options;
        var svg = self._svg;
        var g = self._g;
        var bounds = d3.geo.bounds(this.geojson);
        this.bounds = bounds;
        var path = d3.geo.path().projection(project);
        this.path = path;

        var style = options.style;
		var onClick = options.onClick;
		var onMouseover = options.onMouseover;
		var mouseoverContent = options.mouseoverContent;
		var classfield = options.classfield;
		var colorfield = options.colorfield;
		var satellites = options.satellites || false;
		var eachFunctions = options.eachFunctions || false;	
		var labels = options.labels || false;
		this.labels = labels;
		var labelconfig = options.labelconfig;
		var highlight = options.highlight || false;
		var scale = options.scale || 'px';
		var pointradius = options.pointradius || 5;
		
        //console.log('Reloading ',options.layerId);
        //Adding a tooltip div
        /*
        var tooltipdiv = d3.select("body").append("div")   
            .attr("class", "tooltip")               
            .style("opacity", 0);
        */
        
        
        
        //TODO move out of core
		var labelgenerator = function(d){
		    if (labelconfig.field){
		        var str = d.properties[labelconfig.field];
		        if (str && str.length > 10){ 
		              return str.substr(0,16) + "..."; //Only first 10 chars
		        }
		        else {
		            return str;
		        }
            }
            else {
                return d.id;
            }
		};
		this.labelgenerator = labelgenerator; 
		var click = function(d,e){
		    var element = this;
		    var event = d3.event;
		    d3.event.stopPropagation();//Prevent the map from firing click event as well
		    if (onClick){
		        //onClick(d,self);
		        onClick(d,self._svg,element, event);
		    }
		};
		
		var mouseover = function(d){
		    if (!d.origopac){
		        d.origopac = d3.select(this).style('opacity');
		    }
		    d3.select(this)
		        .transition().duration(100)
		        .style('opacity',d.origopac * 0.2);
		    
		    if (mouseoverContent){
		        /*
                    tooltipdiv.transition()        
                        .duration(200)      
                        .style("opacity", 0.9);      
                    tooltipdiv.html(d[mouseoverContent] + "<br/>")  
                        .style("left", (d3.event.pageX) + "px")     
                        .style("top", (d3.event.pageY - 28) + "px");
                 */
                }
		    if (onMouseover){
		        onMouseover(d,this);
		    }
		};
		var mouseout = function(d){
		    d3.select(this)
		        .transition().duration(100)
		        .style('opacity',d.origopac);
		    if (mouseoverContent){
		        /*
		        tooltipdiv.transition()        
                    .duration(500)      
                    .style("opacity", 0);
                 */
            }
		};
        
      //Build up the element
        var build = function(d){
          var entity = d3.select(this);
          //Point/icon feature
          if (d.properties['marker-url'] && d.geometry.type == 'Point'){ 
              var x = project(d.geometry.coordinates)[0];
              var y = project(d.geometry.coordinates)[1];
              var img = entity.append("image")
                    //.transition().duration(500)
                    .on("click", click)
		            .on('mouseover',mouseover)
		            .on('mouseout',mouseout);
          }
          //Path feature
          else{
            var path = entity.append("path")
                //.transition().duration(500)
                .on("click", click)
		        .on('mouseover',mouseover)
		        .on('mouseout',mouseout);
          }
        };
        
		//A per feature styling method
		var styling = function(d){
		  var entity = d3.select(this);
		  //Point/icon feature
		  if (d.properties['marker-url'] && d.geometry.type == 'Point'){ 
		      var x = project(d.geometry.coordinates)[0];
              var y = project(d.geometry.coordinates)[1];
		      var img = entity.select("image")
                    .attr("xlink:href", function(d){
                            return d.style['marker-url'];
                    })
                    .classed("nodeimg",true)
                    .attr("width", 32)
                    .attr("height", 37)
                    .style('opacity',function(d){ //special case: opacity for icon
                            return d.style.opacity || style.opacity || 1;
                    });
             
		  }
		  //Path feature
		  else{
		    var path = entity.select("path");
		    var defstyles = self.styledefaults; 
			_(defstyles).each(function(val, key) { //First check for generic layer style
				path.style(key,function(d){
					if (d.properties[key]){
				        return d.properties[key]; //Override with features style if present
					}
 					else{ //Style can be defined by function...
 					    if (typeof(defstyles[key]) == "function") {
                            var f = defstyles[key];
                            return  f(d);
                        }
                        else {//..or by generic style string
                            return defstyles[key]; 
                        }
                    }
				});
			});
		  }
		};
		//A per feature styling method
		var textstyling = function(d){
		    var obj = this;
			_(labelconfig.style).each(function(val, key) { //First check for generic layer style
				d3.select(obj).style(key,function(d){
					if (d.labelconfig && d.labelconfig.style && d.labelconfig.style[key]){
						return d.labelconfig.style[key]; //Override with features style if present
					}
 					else {	
						return labelconfig.style[key]; //Apply generic style
					}
				});
			});
			//Now apply remaining styles of feature (possible doing a bit double work from previous loop)
			if (d.labelconfig && d.labelconfig.style) { //If feature has style information
				_(d.labelconfig.style).each(function(val, key){ //run through the styles
					d3.select(obj).style(key,d.labelconfig.style[key]); //and apply them
				});
			}
		};
		//Some path specific styles (point radius, label placement eg.)
		var pathStyler = function(d){ 
		    if (d.style && d.style.radius){
		        path.pointRadius(d.style.radius);
		    }
		    else if (style && style.radius){
		        path.pointRadius(style.radius);
		    }
		    return path(d);
		};
		this.pathStyler = pathStyler;
		//Calculating the location of the label, based on settings
		var textLocation = function(d){
		    var textLocation = path.centroid(d);
		    var bounds = path.bounds(d);
		    if (style && style.textlocation){
		        switch(style.textlocation){
		          case 'ul':
		            textLocation[0] = bounds[0][0];
		            textLocation[1] = bounds[0][1];
		            break;
		          case 'ur':
		            textLocation[0] = bounds[1][0];
		            textLocation[1] = bounds[1][1];
		            break;
		          //TODO: add other positions
		        }
		    }
		    else {
		        textLocation[1] = textLocation[1] + 20; //a bit down..
		    }
		    return textLocation;
		};
		this.textLocation = textLocation;
		
		//Here we start processing the data
		if (this.data.type === "Topology") {
		    this.data = root.topojson.feature(this.geojson, this.geojson.objects.features);
		}
		var entities = g.selectAll(".entity")
            .data(this.geojson.features, function(d) {
                return d.id;
            });
        //On enter
        var newentity = entities.enter()
            .append("g")
            .classed('entity',true)
            .attr('id',function(d){
                    return 'entity'+ d.id;
            });
        newentity.each(build);
       
        if (labels){
            var label = newentity.append('g')
                .classed('place-label',true);
            //On new:	
            label
                .append('text')
                .attr("x",function(d) {return textLocation(d)[0] ;})
                .attr("y",function(d) {return textLocation(d)[1] ;})
                //.classed("zoomable",true)
                .attr('text-anchor', 'left')
                .style('stroke','white')
                .style('stroke-width','3px')
                .style('stroke-opacity',0.8)
                .text(function(d){return labelgenerator(d);});
            label
                .append('text')
                .attr("x",function(d) {return textLocation(d)[0] ;})
                .attr("y",function(d) {return textLocation(d)[1] ;})
                //.classed("zoomable",true)
                .attr('text-anchor', 'left')
                .each(textstyling)
                .text(function(d){return labelgenerator(d);});
      } //End of new label
       
       
      //On update
      entities.each(styling);
      entities.each(function(d,i){
			    var entity = d3.select(this);
			    var x = path.centroid(d)[0];
                var y = path.centroid(d)[1];
                
                if (d.properties['marker-url'] && d.geometry.type == 'Point'){
                    entity.select('image')
                        .transition().duration(500)
                        .attr("x",x-12.5)
                        .attr("y",y-25);
                }
                else{
                    entity.select('path') //Only 1 path per entity
                        .transition().duration(500)
                        .attr("d",pathStyler(d));
                        //.style('opacity',0)
                }
			    
			    if (labels){
			        entity.select('.place-label')
                        .selectAll('text')
                        .transition().duration(500)
                        .attr("x", textLocation(d)[0] )
                        .attr("y", textLocation(d)[1] )
                        .text(labelgenerator(d));
			    }
			});
	  
	  //On exit
      entities.exit().remove().transition().duration(500);
      //Reset view after zoom
      var reset = function(self){
          var svg = self._svg;
          var g = self._g;
          var bounds = self.bounds;
          
          self._g.selectAll(".entity")
            .each(function(d,i){
                var entity = d3.select(this);
                var x = self.path.centroid(d)[0];
                var y = self.path.centroid(d)[1];
    
                if (d.properties['marker-url'] && d.geometry.type == 'Point'){
                    entity.select('image')
                        .attr("x",x-12)
                        .attr("y",y-25);
                        //.moveToFront();
                }
                else{
                    entity.select('path') //Only 1 path per entity
                        .attr("d",self.pathStyler(d));
                }
                
                 if (self.labels){
                    entity.select('.place-label')
                        .selectAll('text')
                        .attr("x", self.textLocation(d)[0] )
                        .attr("y", self.textLocation(d)[1] )
                        .text(self.labelgenerator(d));
                }
                entity.select('g.zoomable')
                    .attr("transform", function(d){
                        if (d.geometry.type == 'Point'){
                            var x = this.project(d.geometry.coordinates)[0];
                            var y = this.project(d.geometry.coordinates)[1];
                        }
                        else {
                            x = self.path.centroid(d)[0];
                            y = self.path.centroid(d)[1];
                        }
                        return "translate(" + x + "," + y + ")";
                    })
                    .transition().duration(500)
                    .attr('opacity',function(d){
                            if (d.minzoomlevel && d.minzoomlevel > self.getZoomLevel()){
                                return 0;
                            }
                            else {return 1;}
                    });
          });
      };
      map.on("viewreset", function(){
          if (self.geojson.features && self.geojson.features.length > 0){
              reset(self);
          }
      });
      //var feature = g.selectAll('path');
      //return feature.attr("d", path);
      
      this.resetFunction = reset;
      return reset;
    },
    
    updateData: function(map) {
      var self = this;
      this._map = map;
      
      if (this.geojson && this.geojson.features.length > 0){
          return this.reload();
      }
      this.resetFunction = this.reload;
      return this.reserFunction;
    },
    onAdd: function(map) {
      /* Initialize the SVG layer */
      map._initPathRoot();
      var d3Selector, g, overlayPane, svg;
      overlayPane = map.getPanes().overlayPane;
      d3Selector = d3.select(overlayPane);
      this._svg = svg = d3Selector.select('svg');
      //this._svg = svg = d3.select('#map').select('svg');
      this._g = g = svg.append('g');
      g.attr('id',this.options.layerId);
      this.styledefaults = {
            "marker-url": './images/mapicons/mapicons/emergencyphone.png', //TODO TT: not nice
            "marker-size" : "medium",
            "marker-symbol" : "bus",//TODO   
            "marker-color" : "#fff",
            "stroke" : "#555555",
            "stroke-opacity" : 1.0,
            "stroke-width" : 2,  
            "fill" : "none",
            "fill-opacity" : 0.5,
            "opacity" : 0.5
      };
      _.extend(this.styledefaults, this.options.style);
      return this.updateData(map);
    },
    onRemove: function(map) {
      this._svg.remove();
      return map.off("viewreset", this.resetFunction);
    }
    
  });
}).call(this);
//Adding some Backbone event binding functionality to the layer
_.extend(L.GeoJSON.d3.prototype, Events);
