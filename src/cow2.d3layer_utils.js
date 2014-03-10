//Replacing editpopup:
var Cow = window.Cow || {};
Cow_utils = {};

Cow_utils.menuconfig = {
     "name": "root",
     "children": [{
      // "name": "model.population",
      //    icon: './css/img/users_icon.png',
      //    label: "Populatie",
      //    size: 1
      //},{
          "name": "edit.geom",        
          icon: './css/img/pencil_icon.png',
          label: 'Bewerken',
          value: 1
     },{
          "name": "delete",
          icon: './css/img/clipboard_cut_icon.png',
          label: 'Verwijderen',
          value: 1
     },{
          "name": "edit.text",
          icon: './css/img/text_letter_t_icon.png',
          label: "Tekst",
          size: 1
     }//,{
     //     "name": "share",
     //     icon: './css/img/share_2_icon.png',
     //     label: "Delen",
     //     size: 1
     //},{
     //    "name": "model.smoke",
     //     icon: './css/img/cloud_icon.png',
     //     label: "Rookpluim",
     //     size: 1
     //}
     ]
};

Cow_utils.menu = function(feat, event, container, element, config){
    var self = this;
    var fid = feat.id;
    d3.selectAll('.popup').remove(); //Remove any old menu's
    var feature = feat;
    var menuconfig = config.menuconfig;

    var g, svg;
    this._svg = svg = container;
    g = svg.append('g');
    var loc = d3.mouse(element); //Wrong on firefox
    var center = {x: event.layerX, y: event.layerY};
    
    if (navigator.userAgent.match('Firefox')){
        loc[0] = loc[0] + 10;
        loc[1] = loc[1] + 10;
    }
    if (navigator.userAgent.match('MSIE')){
        loc[0] = loc[0] - 140;
        loc[1] = loc[1] + 2;
    }
    
    g.attr('class','popup')
        .attr("transform", function(z){
            var x = loc[0];
            var y = loc[1];
            return "translate(" + x + "," + y + ")";
        });
  
    var data = menuconfig; 
    width = 150;
    height = 150;
    var radius = Math.min(width, height) / 2;
    var partition = d3.layout.partition()
        .sort(null)
        .size([2 * Math.PI, radius * radius])
        .value(function(d) { return d.value || 1; });
    var arc = d3.svg.arc()
        .startAngle(function(d) { return d.x; })
        .endAngle(function(d) { return d.x + d.dx; })
        .innerRadius(function(d) { return Math.sqrt(d.y * 0.7); })
        .outerRadius(function(d) {
            return Math.sqrt((d.y + d.dy)*1.5);
    });
    
    var color = d3.scale.category10();
    var entity = g.append('g');

   if (entity.attr('selected') == 'true'){
    entity.select('.popup').remove();
    entity.attr('selected','false');
   }
   else {
    entity.attr('selected','true');
    
    var chart = entity.append('g')
        .classed('pie popup',true)
        .attr('width',width)
        .attr('height',height)
        .append('g')
        .attr('class','zoomable');
        
     var g = chart.datum(data).selectAll("arc1")
        .data(partition.nodes)
        .enter().append("g")
        .attr("class", "arc1")
        .on('click', function(d){
             entity.remove();
             d3.event.stopPropagation();//Prevent the map from firing click event as well
             var name = d.name;
             self.trigger(name, {fid: fid, layer: feature, obj: element});
        })
        .on('mouseover', function(d){ //Mouseover menulabel
            d3.select(this)
                 .append("text")
                  .classed('menu_shadow',true)
                  //.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
                  .attr("dy", 0)
                  .attr("dx", 0)
                  .text(function(d) { 
                          return d.label; 
                  });
            d3.select(this)
             .append("text")
              .classed('menu',true)
              //.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
              .attr("dy", 0)
              .attr("dx", 0)
              .text(function(d) { 
                      return d.label; 
              });
              
        })
        .on('mouseout', function(d){
            d3.select(this)
                .style('opacity',1)
                .selectAll('text').remove();
        });
        
    g.append("path")
        .style('opacity',0)
        .transition()
        .style('opacity',1)
        .attr("d", function(d){
            return arc(d);
        })
        
        .style("stroke", "#fff")
        .style("fill", function(d) {
            if (d.name == 'root') {
                return 'none';
            }
            else if (d.parent && d.parent.name == 'P'){
                return 'none';
            }
            else if (d.parent && d.parent.name == 'root'){
                return color(d.name);
            }
            else{ 
                return color(d.name);
            }
        });
        
        
    g.append("svg:image")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
       .attr('x',-9)
       .attr('y',-12)
       .attr('width', 20)
       .attr('height', 24)
       .attr("xlink:href",function(d){
               return d.icon;
       });
    //g.append("text")
    //  .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
    //  .attr("dy", ".35em")
    //  .style("text-anchor", "middle")
    //  .text(function(d) { 
    //          return d.name; 
    //  });
   }
};
//Adding some Backbone event binding functionality to the store
_.extend(Cow_utils.menu.prototype, Events);

Cow_utils.populator = function(feature){
 //TODO   
};

Cow_utils.editText = function(feature,entity){
    
};

Cow_utils.textbox = function(feature,obj, svg){
    var _this = this;
    var self = this.map;
    //d3.selectAll('.popup').remove(); //Remove any old menu's
    d3.select(obj).on('mouseout', function(d){
          d3.selectAll('.textbox').remove();
    });
    var loc = d3.mouse(obj); //Wrong on firefox
    var divloc = [d3.event.screenX ,d3.event.screenY ];
    var item = self.core.project().items(feature.properties.key); //TODO
    var name = feature.properties.name || "";
    var desc = feature.properties.desc || "";
    var ownername = feature.properties.owner || "Anoniem";
    //var mygroups = self.core.project().myGroups();
    var groupnames = "";
    if (item.permissions('edit')){
        var editgroups = item.permissions('edit').groups;
        $.each(editgroups,function(i,d){
            var name = self.core.project().groups(d).data('name'); //TODO
            if (name != 'public') { //Keep public out of here
                groupnames = groupnames + name;
            }
        });
    }
    
    var allgroups = self.core.project().groups(); //TODO
    var grouparr = [];
    $.each(allgroups, function(i,d){
         grouparr.push(d._id);
    });
    
    var div = d3.select('body').append('div')
        .style('left',divloc[0] + 25 +  'px')
        .style('top',divloc[1] + -100 + 'px')
        .classed("textbox popup share ui-draggable", true);
    var sheader = div.append('div')
        .classed('sheader', true)
        .attr('title','Dit object is gemaakt door');
    sheader.append('span')
        .classed('group ' + groupnames,true); //TODO add own groups here
    sheader.append('span').html(groupnames  + " <small>(" + ownername + ")</small>");
    var scontent = div.append('div')
        .classed('scontent', true);
    desc = desc.replace(/\r\n?|\n/g, '<br />');
    scontent.append('div').classed('ssubheader', true).html(desc);
    sfooter = div.append('div')
        .classed('sfooter',true)
        .attr('id','permissionlist')
        .html("Gedeeld met:");//TODO dont use ids;
    if (item.permissions('view')){
        var itemgroups = item.permissions('view').groups;
        var blokje = d3.select('#permissionlist').selectAll('.permission').data(itemgroups);
        blokje.enter()
            .append('span')
            .attr('class',function(d){
                var groupname = self.core.project().groups(d).data('name');
                return 'group ' + groupname;
            });
    }
        
};

Cow_utils.ripple = function(feature, object, context){
    console.log(context._map);
    
    var map = context._map;
    var width = map.getSize().x;
    var height = map.getSize().y;
    var loc = d3.mouse(object); //Wrong on firefox
    var svg = d3.select('.leaflet-popup-pane').append("svg");
    svg.attr('class','popup');
    svg.attr("width", width);
    svg.attr("height", height);
    var circle = svg.append('circle')
        .attr('r',10).attr('cx',loc[0]).attr('cy',loc[1])
        .style('fill','none').style('stroke','green')
        .transition().duration(2000).attr('r',500)
        .transition().duration(500).style('opacity',0).remove().call(function(d){
                d3.selectAll('.popup').transition().duration(1000).remove();
        });
    
};
