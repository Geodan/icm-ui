//Replacing editpopup:
var Cow = window.Cow || {};
Cow_utils = {};

Cow_utils.menuconfig = {
     "name": "root",
     "children": [{
          "name": "model.population",
          icon: './css/img/users_icon.png',
          label: "Populatie",
          size: 1
      },{
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

Cow_utils.menu = function(event, config){
    var self = this;
    var fid = event.target.options.id;
    d3.selectAll('.popup').remove(); //Remove any old menu's
    var feature = event.target.toGeoJSON();
    var menuconfig = config.menuconfig;
    var map = event.target._map;
    //var core = layer.core;
    //var g = layer._svg.append('g');
    var d3Selector, g, overlayPane, svg;
    overlayPane = map.getPanes().overlayPane;
    d3Selector = d3.select(overlayPane);
    this._svg = svg = d3Selector.select('svg');
    g = svg.append('g');
    //var g = d3.select('#map').select('svg').append('g');
    var center = map.latLngToLayerPoint(event.latlng);
    
    g.attr('class','popup')
        .attr("transform", function(z){
            var x = center.x;
            var y = center.y;
            return "translate(" + x + "," + y + ")";
        });

    //var item = core.project().items(feature.properties.key); //TODO
    //var groups = core.project().groups();
    /* OBS?
    $.each(groups, function(i,d){
        d.children = [{name: 'Vw'},{name: 'Ed'},{name: 'Sh'}];
    });
    */
    var data = menuconfig; //TODO: move out of menu code, make param
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
             self.trigger(name, {fid: fid, layer: event.target});
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
 var populatorcallback = function(d){ 
    
    var population = "Populatie: \n" ;
    var wonen = 0;
    var werken = 0;
    var onderwijs = 0;
    var zorg = 0;
    $.each(d.results,function(i,d){
            if (d.doel == 'onderwijsfunctie'){
                onderwijs = onderwijs + (d.count * 200);
            }
            else if (d.doel == 'kantoorfunctie' || d.doel == 'industriefunctie' || d.doel == 'winkelfunctie'){
                werken = werken + (d.count * 10);
            }
            else if (d.doel == 'gezondheidszorgfunctie'){
                zorg = zorg + (d.count * 50);
            }
            else if (d.doel == 'woonfunctie'){
                wonen = wonen + Math.round(d.count * 2.3);
            }
    });
    population = 'Populatie: \n WONEN: ' + wonen + ' pers.\n' + 
            ' WERKEN: ' + werken + ' pers. \n' + 
            ' ZORG: ' + zorg + ' pers. \n' + 
            ' ONDERWIJS: ' + onderwijs + ' pers. \n';

    
    //Doing the same as for text edit
    var name = feature.properties.name || "";
    //var desc = (feature.properties.desc || "") + population; 
    var desc = population; //Replace original text
    var innerHtml = '' + 
    //+ translator.translate('Label') + ': <input id="titlefld" name="name" value ="'+name+'""><br/>'
    'Description: <br> <textarea id="descfld" name="desc" rows="6" cols="25">'+desc+'</textarea><br/>' + 
    //+ '<button class="popupbutton" id="closeButton"">' + translator.translate('Opslaan')+'</button>'
     '';
    var div = d3.select('body').append('div')
    .style('left',divloc[0] + 0 +  'px')
    .style('top',divloc[1] + 0 + 'px')
    .classed("popup share ui-draggable", true);
var sheader = div.append('div')
    .classed('sheader', true)
    .attr('title','Dit object is gemaakt door');
sheader.append('span')
    .classed('group populatie',true); //TODO add own groups here
sheader.append('span').html(groupnames);
var scontent = div.append('div')
    .classed('scontent', true);
desc = desc.replace(/\r\n?|\n/g, '<br />');
scontent.append('div').classed('ssubheader', true).html(innerHtml);
scontent.append('div')
        .html('Opslaan')
        .classed('popupbutton', true)
        .on('click',function(z){
                self.changeFeature(self, feature);
                div.remove();
        });
sfooter = div.append('div')
    .classed('sfooter',true)
    .attr('id','permissionlist');//TODO dont use ids;
if (item.permissions('view')){
    var itemgroups = item.permissions('view').groups;
    var blokje = d3.select('#permissionlist').selectAll('.permission').data(itemgroups);
    blokje.enter()
        .append('span')
        .attr('class',function(d){
            var groupname = core.project().groups(d).data('name');
            return 'group ' + groupname;
        });
}
    };//End of callback
    //Will generate a callback to 'callback'
    var geom = JSON.stringify(feature.geometry);
    d3.json('/service/populator/populator.py?geom=' + geom,populatorcallback);  
    
};

Cow_utils.editText = function(feature,self){
    //icm.msg(item);
    /*
    name = feature.properties.name || "";
    desc = feature.properties.desc || "";
    innerHtml = '' + 
    //+ translator.translate('Label') + ': <input id="titlefld" name="name" value ="'+name+'""><br/>'
    'Description: <br> <textarea class="mention" id="descfld" name="desc" rows="6" cols="25">'+desc+'</textarea><br/>' + 
    //+ '<button class="popupbutton" id="closeButton"">' + translator.translate('Opslaan')+'</button>'
    '';
    
    
    
    var div = d3.select('body').append('div')
        //.style('left',divloc[0] + 0 +  'px')
        //.style('top',divloc[1] + 0 + 'px')
        .style('left',100 +  'px')
        .style('top',100 + 'px')
        .classed("popup share ui-draggable", true);
    
    
    var sheader = div.append('div')
        .classed('sheader', true)
        .attr('title','Dit object is gemaakt door');
    sheader.append('span')
        .classed('group populatie',true); //TODO add own groups here
    //sheader.append('span').html(groupnames);
    var scontent = div.append('div')
        .classed('scontent', true);
    desc = desc.replace(/\r\n?|\n/g, '<br />');
    scontent.append('div').classed('ssubheader', true).html(innerHtml);
    var names = ['Tom', 'Steven', 'Luis'];
    var tags = ['Flood','hospital'];
    $('#descfld').textcomplete([
    {
        match: /(^|\s)@(\w*)$/,
        search: function (term, callback) {
          callback($.map(names, function (element) {
                return element.indexOf(term) === 0 ? element : null;
            }));
        },
        replace: function (value) {
          return '$1@' + value + ' ';
        }
     },{
        match: /(^|\s)#(\w*)$/,
        search: function (term, callback) {
          callback($.map(tags, function (element) {
                return element.indexOf(term) === 0 ? element : null;
            }));
        },
        replace: function (value) {
          return '$1#' + value + ' ';
        }
     }]);
    scontent.append('div')
            .html('Opslaan')
            .classed('popupbutton', true)
            .on('click',function(z){
                    leaflmap.changeFeature(self, feature);
                    div.remove();
            });
    sfooter = div.append('div')
        .classed('sfooter',true)
        .attr('id','permissionlist');//TODO dont use ids;
    if (item.permissions('view')){
        var itemgroups = item.permissions('view').groups;
        var blokje = d3.select('#permissionlist').selectAll('.permission').data(itemgroups);
        blokje.enter()
            .append('span')
            .attr('class',function(d){
                var groupname = self.core.projects(1).groups(d).data('name');
                return 'group ' + groupname;
            });
    }
    /*
    var div = d3.select('body').append('div')
        .attr("height", 500)
        .style('left',divloc[0]  -100 +  'px')
        .style('top',divloc[1] + 0 + 'px')
        .style('background-color','white')
        .style('opacity',0.7)
        .style('position','absolute');

        div.append('div').attr("width", 480)
        .html(innerHtml);

        div.append('div')
            .html('Opslaan')
            .classed('popupbutton', true)
            .on('click',function(z){
                    self.changeFeature(self, feature);
                    div.remove();
            });
     */
};

Cow_utils.share = function(feature, self){
    var mygroups = self.core.project().myGroups();
    groupnames = "";
    for (var i = 0;i<mygroups.length;i++){
        var d = mygroups[i];
        groupnames = groupnames + self.core.project().groups(d).data('name');
    };
    var item = self.core.project().items(feature.properties.key); //TODO
    var allgroups = self.core.project().groups();
    var grouparr = [];
    for (i = 0;i<allgroups.length;i++){
        var d = allgroups[i];
        grouparr.push(d._id);
    };
    var divloc = [300,100];
    div = d3.select('body').append('div')
        .style('left',divloc[0]  -100 +  'px')
        .style('top',divloc[1] + 0 + 'px')
        .classed("popup share ui-draggable", true);
    sheader = div.append('div')
        .classed('sheader', true)
        .attr('title','Dit object is gemaakt door');
    sheader.append('span')
        .classed('group populatie',true); //TODO add own groups here
    sheader.append('span').html(groupnames);
    scontent = div.append('div')
        .classed('scontent', true);
    scontent.append('div').classed('ssubheader', true).html('deel dit object met:');
    scontent.append('div').classed('iedereen',true).append('div')
        .attr('class','permission share-cop unselected')
        .on('click',function(d){
            //Only adding permissions here, removing goes 1 by 1
            item.permissions('view',grouparr).sync();
            d3.selectAll('.permission').attr('class','selected');
        })
        .html('<span class="group cop" title="COP"></span>Iedereen');
    
    var formbox = scontent.append('div').classed('individueel',true).attr('id','permlist');
    var permissions = d3.select('#permlist').selectAll('.permission').data(allgroups);
    //Add on/off button for every group
    var pdiv = permissions.enter().append('div')
            .attr('class',function(d){
                if (item.permissionHasGroup('view',[d._id])) {
                    return 'permission selected';
                }
                else {
                    return 'permission unselected';
                }
            })
            .on('click',function(d){
                if (d3.select(this).classed('unselected')){
                    d3.select(this).classed('selected',true).classed('unselected',false);
                    item.permissions('view',d._id).sync();
                }
                else {
                    d3.select(this).classed('unselected',true).classed('selected',false);
                    item.removePermission('view',[d._id]).sync();
                    //core.itemstore().items('feature',{data:item.flatten()},'user');
                }
            });
        pdiv.append('span').attr('class',function(d){
                    return 'group ' + d.name;
            });
        pdiv.append('span')
            .html(function(d){return d.name;});
    scontent.append('div')
            .html('Sluiten')
            .classed('popupbutton', true)
            .on('click',function(z){
                    //Close share window, 
                    div.remove();
            });
    //formbox.html(form);
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
