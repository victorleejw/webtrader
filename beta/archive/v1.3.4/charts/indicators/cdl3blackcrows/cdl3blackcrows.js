define(["jquery","jquery-ui","color-picker","loadCSS"],function(a){function b(){a(this).dialog("close"),a(this).find("*").removeClass("ui-state-error")}function c(c,d){a.get("charts/indicators/cdl3blackcrows/cdl3blackcrows.html",function(e){e=a(e),e.appendTo("body"),e.dialog({autoOpen:!1,resizable:!1,width:350,modal:!0,my:"center",at:"center",of:window,buttons:[{text:"Ok",click:function(){require(["validation/validation"],function(){require(["charts/indicators/highcharts_custom/cdl3blackcrows"],function(b){b.init(),a(a(".cdl3blackcrows").data("refererChartID")).highcharts().series[0].addCDL3BLACKCROWS()}),b.call(e)})}},{text:"Cancel",click:function(){b.call(this)}}]}),"function"==typeof d&&d(c)})}return{open:function(b){return 0==a(".cdl3blackcrows").length?void c(b,this.open):void a(".cdl3blackcrows").data("refererChartID",b).dialog("open")}}});