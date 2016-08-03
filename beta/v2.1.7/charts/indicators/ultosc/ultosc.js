define(["jquery","common/rivetsExtra","jquery-ui","color-picker","ddslick"],function(a,b){function c(){a(this).dialog("close"),a(this).find("*").removeClass("ui-state-error")}function d(d,e){require(["css!charts/indicators/ultosc/ultosc.css"]);var f=function(a,b,c,d){this.level=a,this.stroke=b,this.strokeWidth=c,this.dashStyle=d},g=[new f(30,"red",1,"Dash"),new f(70,"red",1,"Dash")];require(["text!charts/indicators/ultosc/ultosc.html","text!charts/indicators/indicators.json"],function(f,h){var i="#cd0a0a";f=a(f),f.appendTo("body"),h=JSON.parse(h);var j=h.ultosc,k={title:j.long_display_name,description:j.description};b.bind(f[0],k),f.find("input[type='button']").button(),f.find("#ultosc_stroke").colorpicker({position:{at:"right+100 bottom",of:"element",collision:"fit"},part:{map:{size:128},bar:{size:128}},select:function(b,c){a("#ultosc_stroke").css({background:"#"+c.formatted}).val(""),i="#"+c.formatted},ok:function(b,c){a("#ultosc_stroke").css({background:"#"+c.formatted}).val(""),i="#"+c.formatted}});var l="Solid";a("#ultosc_dashStyle").ddslick({imagePosition:"left",width:148,background:"white",onSelected:function(b){a("#ultosc_dashStyle .dd-selected-image").css("max-width","115px"),l=b.selectedData.value}}),a("#ultosc_dashStyle .dd-option-image").css("max-width","115px");var m=f.find("#ultosc_levels").DataTable({paging:!1,scrollY:100,autoWidth:!0,searching:!1,info:!1,columnDefs:[{className:"dt-center",targets:[0,1,2,3]}],aoColumnDefs:[{bSortable:!1,aTargets:[1,3]}]});a.each(g,function(b,c){a(m.row.add([c.level,'<div style="background-color: '+c.stroke+';width:100%;height:20px;"></div>',c.strokeWidth,'<div style="width:50px;overflow:hidden;"><img src="images/dashstyle/'+c.dashStyle+'.svg" /></div>']).draw().node()).data("level",c).on("click",function(){a(this).toggleClass("selected")})}),f.find("#ultosc_level_delete").click(function(){m.rows(".selected").indexes().length<=0?require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Select level(s) to delete!"})}):m.rows(".selected").remove().draw()}),f.find("#ultosc_level_add").click(function(){require(["indicator_levels"],function(b){b.open(d,function(b){a.each(b,function(b,c){a(m.row.add([c.level,'<div style="background-color: '+c.stroke+';width:100%;height:20px;"></div>',c.strokeWidth,'<div style="width:50px;overflow:hidden;"><img src="images/dashstyle/'+c.dashStyle+'.svg" /></div>']).draw().node()).data("level",c).on("click",function(){a(this).toggleClass("selected")})})})})}),f.dialog({autoOpen:!1,resizable:!1,width:350,height:400,modal:!0,my:"center",at:"center",of:window,dialogClass:"ultosc-ui-dialog",buttons:[{text:"OK",click:function(){var b=!0;a(".ultosc_input_width_for_period").each(function(){var c=a(this);return _.isInteger(_.toNumber(c.val()))&&_.inRange(c.val(),parseInt(c.attr("min")),parseInt(c.attr("max"))+1)?void 0:(require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Only numbers between "+c.attr("min")+" to "+c.attr("max")+" is allowed for "+c.closest("tr").find("td:first").text()+"!"})}),c.val(c.prop("defaultValue")),void(b=!1))});var d=parseInt(a("#ultosc_first_period").val()),e=parseInt(a("#ultosc_second_period").val()),g=parseInt(a("#ultosc_third_period").val());if(d>g){{a("#ultosc_first_period")}return require(["jquery","jquery-growl"],function(a){a.growl.error({message:" Period 1 cannot be more than Period 3!"})}),void(b=!1)}if(e>g){{a("#ultosc_first_period")}return require(["jquery","jquery-growl"],function(a){a.growl.error({message:" Period 2 cannot be more than Period 3!"})}),void(b=!1)}if(b){var h=[];a.each(m.rows().nodes(),function(){var b=a(this).data("level");b&&h.push({color:b.stroke,dashStyle:b.dashStyle,width:b.strokeWidth,value:b.level,label:{text:b.level}})});var j={firstPeriod:parseInt(a("#ultosc_first_period").val()),secondPeriod:parseInt(a("#ultosc_second_period").val()),thirdPeriod:parseInt(a("#ultosc_third_period").val()),stroke:i,strokeWidth:parseInt(a("#ultosc_stroke_width").val()),dashStyle:l,appliedTo:parseInt(a("#ultosc_applied_to").val()),levels:h};a(a(".ultosc").data("refererChartID")).highcharts().series[0].addIndicator("ultosc",j),c.call(f)}}},{text:"Cancel",click:function(){c.call(this)}}]}),f.find("select").selectmenu({width:150}),"function"==typeof e&&e(d)})}return{open:function(b){return 0==a(".ultosc").length?void d(b,this.open):void a(".ultosc").data("refererChartID",b).dialog("open")}}});