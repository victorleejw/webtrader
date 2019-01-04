(function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}},d=function(a,b){function c(){this.constructor=a}for(var d in b)e.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},e={}.hasOwnProperty;b=function(){function a(){this.options_index=0,this.parsed=[]}return a.prototype.add_node=function(a){return"OPTGROUP"===a.nodeName.toUpperCase()?this.add_group(a):this.add_option(a)},a.prototype.add_group=function(a){var b,c,d,e,f,g;for(b=this.parsed.length,this.parsed.push({array_index:b,group:!0,label:a.label,title:a.title?a.title:void 0,children:0,disabled:a.disabled,classes:a.className}),f=a.childNodes,g=[],c=0,d=f.length;d>c;c++)e=f[c],g.push(this.add_option(e,b,a.disabled));return g},a.prototype.add_option=function(a,b,c){return"OPTION"===a.nodeName.toUpperCase()?(""!==a.text?(null!=b&&(this.parsed[b].children+=1),this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,value:a.value,text:a.text,html:a.innerHTML,title:a.title?a.title:void 0,selected:a.selected,disabled:c===!0?c:a.disabled,group_array_index:b,group_label:null!=b?this.parsed[b].label:null,classes:a.className,style:a.style.cssText})):this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,empty:!0}),this.options_index+=1):void 0},a}(),b.select_to_array=function(a){var c,d,e,f,g;for(f=new b,g=a.childNodes,d=0,e=g.length;e>d;d++)c=g[d],f.add_node(c);return f.parsed},a=function(){function a(b,d){this.form_field=b,this.options=null!=d?d:{},this.label_click_handler=c(this.label_click_handler,this),a.browser_is_supported()&&(this.is_multiple=this.form_field.multiple,this.set_default_text(),this.set_default_values(),this.setup(),this.set_up_html(),this.register_observers(),this.on_ready())}return a.prototype.set_default_values=function(){return this.click_test_action=function(a){return function(b){return a.test_active_click(b)}}(this),this.activate_action=function(a){return function(b){return a.activate_field(b)}}(this),this.active_field=!1,this.mouse_on_container=!1,this.results_showing=!1,this.result_highlighted=null,this.is_rtl=this.options.rtl||/\bchosen-rtl\b/.test(this.form_field.className),this.allow_single_deselect=null!=this.options.allow_single_deselect&&null!=this.form_field.options[0]&&""===this.form_field.options[0].text?this.options.allow_single_deselect:!1,this.disable_search_threshold=this.options.disable_search_threshold||0,this.disable_search=this.options.disable_search||!1,this.enable_split_word_search=null!=this.options.enable_split_word_search?this.options.enable_split_word_search:!0,this.group_search=null!=this.options.group_search?this.options.group_search:!0,this.search_contains=this.options.search_contains||!1,this.single_backstroke_delete=null!=this.options.single_backstroke_delete?this.options.single_backstroke_delete:!0,this.max_selected_options=this.options.max_selected_options||1/0,this.inherit_select_classes=this.options.inherit_select_classes||!1,this.display_selected_options=null!=this.options.display_selected_options?this.options.display_selected_options:!0,this.display_disabled_options=null!=this.options.display_disabled_options?this.options.display_disabled_options:!0,this.include_group_label_in_selected=this.options.include_group_label_in_selected||!1,this.max_shown_results=this.options.max_shown_results||Number.POSITIVE_INFINITY,this.case_sensitive_search=this.options.case_sensitive_search||!1,this.hide_results_on_select=null!=this.options.hide_results_on_select?this.options.hide_results_on_select:!0},a.prototype.set_default_text=function(){return this.default_text=this.form_field.getAttribute("data-placeholder")?this.form_field.getAttribute("data-placeholder"):this.is_multiple?this.options.placeholder_text_multiple||this.options.placeholder_text||a.default_multiple_text:this.options.placeholder_text_single||this.options.placeholder_text||a.default_single_text,this.default_text=this.escape_html(this.default_text),this.results_none_found=this.form_field.getAttribute("data-no_results_text")||this.options.no_results_text||a.default_no_result_text},a.prototype.choice_label=function(a){return this.include_group_label_in_selected&&null!=a.group_label?"<b class='group-name'>"+this.escape_html(a.group_label)+"</b>"+a.html:a.html},a.prototype.mouse_enter=function(){return this.mouse_on_container=!0},a.prototype.mouse_leave=function(){return this.mouse_on_container=!1},a.prototype.input_focus=function(){if(this.is_multiple){if(!this.active_field)return setTimeout(function(a){return function(){return a.container_mousedown()}}(this),50)}else if(!this.active_field)return this.activate_field()},a.prototype.input_blur=function(){return this.mouse_on_container?void 0:(this.active_field=!1,setTimeout(function(a){return function(){return a.blur_test()}}(this),100))},a.prototype.label_click_handler=function(a){return this.is_multiple?this.container_mousedown(a):this.activate_field()},a.prototype.results_option_build=function(a){var b,c,d,e,f,g,h;for(b="",h=0,g=this.results_data,e=0,f=g.length;f>e&&(c=g[e],d="",d=c.group?this.result_add_group(c):this.result_add_option(c),""!==d&&(h++,b+=d),(null!=a?a.first:void 0)&&(c.selected&&this.is_multiple?this.choice_build(c):c.selected&&!this.is_multiple&&this.single_set_selected_text(this.choice_label(c))),!(h>=this.max_shown_results));e++);return b},a.prototype.result_add_option=function(a){var b,c;return a.search_match&&this.include_option_in_results(a)?(b=[],a.disabled||a.selected&&this.is_multiple||b.push("active-result"),!a.disabled||a.selected&&this.is_multiple||b.push("disabled-result"),a.selected&&b.push("result-selected"),null!=a.group_array_index&&b.push("group-option"),""!==a.classes&&b.push(a.classes),c=document.createElement("li"),c.className=b.join(" "),a.style&&(c.style.cssText=a.style),c.setAttribute("data-option-array-index",a.array_index),c.innerHTML=a.highlighted_html||a.html,a.title&&(c.title=a.title),this.outerHTML(c)):""},a.prototype.result_add_group=function(a){var b,c;return(a.search_match||a.group_match)&&a.active_options>0?(b=[],b.push("group-result"),a.classes&&b.push(a.classes),c=document.createElement("li"),c.className=b.join(" "),c.innerHTML=a.highlighted_html||this.escape_html(a.label),a.title&&(c.title=a.title),this.outerHTML(c)):""},a.prototype.results_update_field=function(){return this.set_default_text(),this.is_multiple||this.results_reset_cleanup(),this.result_clear_highlight(),this.results_build(),this.results_showing?this.winnow_results():void 0},a.prototype.reset_single_select_options=function(){var a,b,c,d,e;for(c=this.results_data,e=[],a=0,b=c.length;b>a;a++)d=c[a],e.push(d.selected?d.selected=!1:void 0);return e},a.prototype.results_toggle=function(){return this.results_showing?this.results_hide():this.results_show()},a.prototype.results_search=function(){return this.results_showing?this.winnow_results():this.results_show()},a.prototype.winnow_results=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p;for(this.no_results_clear(),k=0,h=this.get_search_text(),b=h.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),j=this.get_search_regex(b),i=this.results_data,d=0,e=i.length;e>d;d++)f=i[d],f.search_match=!1,l=null,m=null,f.highlighted_html="",this.include_option_in_results(f)&&(f.group&&(f.group_match=!1,f.active_options=0),null!=f.group_array_index&&this.results_data[f.group_array_index]&&(l=this.results_data[f.group_array_index],0===l.active_options&&l.search_match&&(k+=1),l.active_options+=1),p=f.group?f.label:f.text,(!f.group||this.group_search)&&(m=this.search_string_match(p,j),f.search_match=null!=m,f.search_match&&!f.group&&(k+=1),f.search_match?(h.length&&(n=m.index,g=p.slice(0,n),c=p.slice(n,n+h.length),o=p.slice(n+h.length),f.highlighted_html=this.escape_html(g)+"<em>"+this.escape_html(c)+"</em>"+this.escape_html(o)),null!=l&&(l.group_match=!0)):null!=f.group_array_index&&this.results_data[f.group_array_index].search_match&&(f.search_match=!0)));return this.result_clear_highlight(),1>k&&h.length?(this.update_results_content(""),this.no_results(h)):(this.update_results_content(this.results_option_build()),(null!=a?a.skip_highlight:void 0)?void 0:this.winnow_results_set_highlight())},a.prototype.get_search_regex=function(a){var b,c;return c=this.search_contains?a:"(^|\\s|\\b)"+a+"[^\\s]*",this.enable_split_word_search||this.search_contains||(c="^"+c),b=this.case_sensitive_search?"":"i",new RegExp(c,b)},a.prototype.search_string_match=function(a,b){var c;return c=b.exec(a),!this.search_contains&&(null!=c?c[1]:void 0)&&(c.index+=1),c},a.prototype.choices_count=function(){var a,b,c,d;if(null!=this.selected_option_count)return this.selected_option_count;for(this.selected_option_count=0,d=this.form_field.options,a=0,b=d.length;b>a;a++)c=d[a],c.selected&&(this.selected_option_count+=1);return this.selected_option_count},a.prototype.choices_click=function(a){return a.preventDefault(),this.activate_field(),this.results_showing||this.is_disabled?void 0:this.results_show()},a.prototype.keydown_checker=function(a){var b,c;switch(c=null!=(b=a.which)?b:a.keyCode,this.search_field_scale(),8!==c&&this.pending_backstroke&&this.clear_backstroke(),c){case 8:this.backstroke_length=this.get_search_field_value().length;break;case 9:this.results_showing&&!this.is_multiple&&this.result_select(a),this.mouse_on_container=!1;break;case 13:this.results_showing&&a.preventDefault();break;case 27:this.results_showing&&a.preventDefault();break;case 32:this.disable_search&&a.preventDefault();break;case 38:a.preventDefault(),this.keyup_arrow();break;case 40:a.preventDefault(),this.keydown_arrow()}},a.prototype.keyup_checker=function(a){var b,c;switch(c=null!=(b=a.which)?b:a.keyCode,this.search_field_scale(),c){case 8:this.is_multiple&&this.backstroke_length<1&&this.choices_count()>0?this.keydown_backstroke():this.pending_backstroke||(this.result_clear_highlight(),this.results_search());break;case 13:a.preventDefault(),this.results_showing&&this.result_select(a);break;case 27:this.results_showing&&this.results_hide();break;case 9:case 16:case 17:case 18:case 38:case 40:case 91:break;default:this.results_search()}},a.prototype.clipboard_event_checker=function(){return this.is_disabled?void 0:setTimeout(function(a){return function(){return a.results_search()}}(this),50)},a.prototype.container_width=function(){return null!=this.options.width?this.options.width:this.form_field.offsetWidth+"px"},a.prototype.include_option_in_results=function(a){return this.is_multiple&&!this.display_selected_options&&a.selected?!1:!this.display_disabled_options&&a.disabled?!1:a.empty?!1:!0},a.prototype.search_results_touchstart=function(a){return this.touch_started=!0,this.search_results_mouseover(a)},a.prototype.search_results_touchmove=function(a){return this.touch_started=!1,this.search_results_mouseout(a)},a.prototype.search_results_touchend=function(a){return this.touch_started?this.search_results_mouseup(a):void 0},a.prototype.outerHTML=function(a){var b;return a.outerHTML?a.outerHTML:(b=document.createElement("div"),b.appendChild(a),b.innerHTML)},a.prototype.get_single_html=function(){return'<a class="chosen-single chosen-default">\n  <span>'+this.default_text+'</span>\n  <div><b></b></div>\n</a>\n<div class="chosen-drop">\n  <div class="chosen-search">\n    <input class="chosen-search-input" type="text" autocomplete="off" />\n  </div>\n  <ul class="chosen-results"></ul>\n</div>'},a.prototype.get_multi_html=function(){return'<ul class="chosen-choices">\n  <li class="search-field">\n    <input class="chosen-search-input" type="text" autocomplete="off" value="'+this.default_text+'" />\n  </li>\n</ul>\n<div class="chosen-drop">\n  <ul class="chosen-results"></ul>\n</div>'},a.prototype.get_no_results_html=function(a){return'<li class="no-results">\n  '+this.results_none_found+" <span>"+this.escape_html(a)+"</span>\n</li>"},a.browser_is_supported=function(){return"Microsoft Internet Explorer"===window.navigator.appName?document.documentMode>=8:/iP(od|hone)/i.test(window.navigator.userAgent)||/IEMobile/i.test(window.navigator.userAgent)||/Windows Phone/i.test(window.navigator.userAgent)||/BlackBerry/i.test(window.navigator.userAgent)||/BB10/i.test(window.navigator.userAgent)||/Android.*Mobile/i.test(window.navigator.userAgent)?!1:!0},a.default_multiple_text="Select Some Options",a.default_single_text="Select an Option",a.default_no_result_text="No results match",a}(),this.Chosen=function(a){function c(){return c.__super__.constructor.apply(this,arguments)}var e;return d(c,a),c.prototype.setup=function(){return this.current_selectedIndex=this.form_field.selectedIndex},c.prototype.set_up_html=function(){var a,b;return a=["chosen-container"],a.push("chosen-container-"+(this.is_multiple?"multi":"single")),this.inherit_select_classes&&this.form_field.className&&a.push(this.form_field.className),this.is_rtl&&a.push("chosen-rtl"),b={"class":a.join(" "),title:this.form_field.title},this.form_field.id.length&&(b.id=this.form_field.id.replace(/[^\w]/g,"_")+"_chosen"),this.container=new Element("div",b),this.container.setStyle({width:this.container_width()}),this.container.update(this.is_multiple?this.get_multi_html():this.get_single_html()),this.form_field.hide().insert({after:this.container}),this.dropdown=this.container.down("div.chosen-drop"),this.search_field=this.container.down("input"),this.search_results=this.container.down("ul.chosen-results"),this.search_field_scale(),this.search_no_results=this.container.down("li.no-results"),this.is_multiple?(this.search_choices=this.container.down("ul.chosen-choices"),this.search_container=this.container.down("li.search-field")):(this.search_container=this.container.down("div.chosen-search"),this.selected_item=this.container.down(".chosen-single")),this.results_build(),this.set_tab_index(),this.set_label_behavior()},c.prototype.on_ready=function(){return this.form_field.fire("chosen:ready",{chosen:this})},c.prototype.register_observers=function(){return this.container.observe("touchstart",function(a){return function(b){return a.container_mousedown(b)}}(this)),this.container.observe("touchend",function(a){return function(b){return a.container_mouseup(b)}}(this)),this.container.observe("mousedown",function(a){return function(b){return a.container_mousedown(b)}}(this)),this.container.observe("mouseup",function(a){return function(b){return a.container_mouseup(b)}}(this)),this.container.observe("mouseenter",function(a){return function(b){return a.mouse_enter(b)}}(this)),this.container.observe("mouseleave",function(a){return function(b){return a.mouse_leave(b)}}(this)),this.search_results.observe("mouseup",function(a){return function(b){return a.search_results_mouseup(b)}}(this)),this.search_results.observe("mouseover",function(a){return function(b){return a.search_results_mouseover(b)}}(this)),this.search_results.observe("mouseout",function(a){return function(b){return a.search_results_mouseout(b)}}(this)),this.search_results.observe("mousewheel",function(a){return function(b){return a.search_results_mousewheel(b)}}(this)),this.search_results.observe("DOMMouseScroll",function(a){return function(b){return a.search_results_mousewheel(b)}}(this)),this.search_results.observe("touchstart",function(a){return function(b){return a.search_results_touchstart(b)}}(this)),this.search_results.observe("touchmove",function(a){return function(b){return a.search_results_touchmove(b)}}(this)),this.search_results.observe("touchend",function(a){return function(b){return a.search_results_touchend(b)}}(this)),this.form_field.observe("chosen:updated",function(a){return function(b){return a.results_update_field(b)}}(this)),this.form_field.observe("chosen:activate",function(a){return function(b){return a.activate_field(b)}}(this)),this.form_field.observe("chosen:open",function(a){return function(b){return a.container_mousedown(b)}}(this)),this.form_field.observe("chosen:close",function(a){return function(b){return a.close_field(b)}}(this)),this.search_field.observe("blur",function(a){return function(b){return a.input_blur(b)}}(this)),this.search_field.observe("keyup",function(a){return function(b){return a.keyup_checker(b)}}(this)),this.search_field.observe("keydown",function(a){return function(b){return a.keydown_checker(b)}}(this)),this.search_field.observe("focus",function(a){return function(b){return a.input_focus(b)}}(this)),this.search_field.observe("cut",function(a){return function(b){return a.clipboard_event_checker(b)}}(this)),this.search_field.observe("paste",function(a){return function(b){return a.clipboard_event_checker(b)}}(this)),this.is_multiple?this.search_choices.observe("click",function(a){return function(b){return a.choices_click(b)}}(this)):this.container.observe("click",function(){return function(a){return a.preventDefault()}}(this))},c.prototype.destroy=function(){var a,b,c,d;for(this.container.ownerDocument.stopObserving("click",this.click_test_action),d=["chosen:updated","chosen:activate","chosen:open","chosen:close"],b=0,c=d.length;c>b;b++)a=d[b],this.form_field.stopObserving(a);return this.container.stopObserving(),this.search_results.stopObserving(),this.search_field.stopObserving(),null!=this.form_field_label&&this.form_field_label.stopObserving(),this.is_multiple?(this.search_choices.stopObserving(),this.container.select(".search-choice-close").each(function(a){return a.stopObserving()})):this.selected_item.stopObserving(),this.search_field.tabIndex&&(this.form_field.tabIndex=this.search_field.tabIndex),this.container.remove(),this.form_field.show()},c.prototype.search_field_disabled=function(){var a;return this.is_disabled=this.form_field.disabled||(null!=(a=this.form_field.up("fieldset"))?a.disabled:void 0)||!1,this.is_disabled?this.container.addClassName("chosen-disabled"):this.container.removeClassName("chosen-disabled"),this.search_field.disabled=this.is_disabled,this.is_multiple||this.selected_item.stopObserving("focus",this.activate_field),this.is_disabled?this.close_field():this.is_multiple?void 0:this.selected_item.observe("focus",this.activate_field)},c.prototype.container_mousedown=function(a){var b;if(!this.is_disabled)return!a||"mousedown"!==(b=a.type)&&"touchstart"!==b||this.results_showing||a.preventDefault(),null!=a&&a.target.hasClassName("search-choice-close")?void 0:(this.active_field?this.is_multiple||!a||a.target!==this.selected_item&&!a.target.up("a.chosen-single")||this.results_toggle():(this.is_multiple&&this.search_field.clear(),this.container.ownerDocument.observe("click",this.click_test_action),this.results_show()),this.activate_field())},c.prototype.container_mouseup=function(a){return"ABBR"!==a.target.nodeName||this.is_disabled?void 0:this.results_reset(a)},c.prototype.search_results_mousewheel=function(a){var b;return b=a.deltaY||-a.wheelDelta||a.detail,null!=b?(a.preventDefault(),"DOMMouseScroll"===a.type&&(b=40*b),this.search_results.scrollTop=b+this.search_results.scrollTop):void 0},c.prototype.blur_test=function(){return!this.active_field&&this.container.hasClassName("chosen-container-active")?this.close_field():void 0},c.prototype.close_field=function(){return this.container.ownerDocument.stopObserving("click",this.click_test_action),this.active_field=!1,this.results_hide(),this.container.removeClassName("chosen-container-active"),this.clear_backstroke(),this.show_search_field_default(),this.search_field_scale(),this.search_field.blur()},c.prototype.activate_field=function(){return this.is_disabled?void 0:(this.container.addClassName("chosen-container-active"),this.active_field=!0,this.search_field.value=this.get_search_field_value(),this.search_field.focus())},c.prototype.test_active_click=function(a){return a.target.up(".chosen-container")===this.container?this.active_field=!0:this.close_field()},c.prototype.results_build=function(){return this.parsing=!0,this.selected_option_count=null,this.results_data=b.select_to_array(this.form_field),this.is_multiple?this.search_choices.select("li.search-choice").invoke("remove"):(this.single_set_selected_text(),this.disable_search||this.form_field.options.length<=this.disable_search_threshold?(this.search_field.readOnly=!0,this.container.addClassName("chosen-container-single-nosearch")):(this.search_field.readOnly=!1,this.container.removeClassName("chosen-container-single-nosearch"))),this.update_results_content(this.results_option_build({first:!0})),this.search_field_disabled(),this.show_search_field_default(),this.search_field_scale(),this.parsing=!1},c.prototype.result_do_highlight=function(a){var b,c,d,e,f;return this.result_clear_highlight(),this.result_highlight=a,this.result_highlight.addClassName("highlighted"),d=parseInt(this.search_results.getStyle("maxHeight"),10),f=this.search_results.scrollTop,e=d+f,c=this.result_highlight.positionedOffset().top,b=c+this.result_highlight.getHeight(),b>=e?this.search_results.scrollTop=b-d>0?b-d:0:f>c?this.search_results.scrollTop=c:void 0},c.prototype.result_clear_highlight=function(){return this.result_highlight&&this.result_highlight.removeClassName("highlighted"),this.result_highlight=null},c.prototype.results_show=function(){return this.is_multiple&&this.max_selected_options<=this.choices_count()?(this.form_field.fire("chosen:maxselected",{chosen:this}),!1):(this.container.addClassName("chosen-with-drop"),this.results_showing=!0,this.search_field.focus(),this.search_field.value=this.get_search_field_value(),this.winnow_results(),this.form_field.fire("chosen:showing_dropdown",{chosen:this}))},c.prototype.update_results_content=function(a){return this.search_results.update(a)},c.prototype.results_hide=function(){return this.results_showing&&(this.result_clear_highlight(),this.container.removeClassName("chosen-with-drop"),this.form_field.fire("chosen:hiding_dropdown",{chosen:this})),this.results_showing=!1},c.prototype.set_tab_index=function(){var a;return this.form_field.tabIndex?(a=this.form_field.tabIndex,this.form_field.tabIndex=-1,this.search_field.tabIndex=a):void 0},c.prototype.set_label_behavior=function(){return this.form_field_label=this.form_field.up("label"),null==this.form_field_label&&(this.form_field_label=$$("label[for='"+this.form_field.id+"']").first()),null!=this.form_field_label?this.form_field_label.observe("click",this.label_click_handler):void 0},c.prototype.show_search_field_default=function(){return this.is_multiple&&this.choices_count()<1&&!this.active_field?(this.search_field.value=this.default_text,this.search_field.addClassName("default")):(this.search_field.value="",this.search_field.removeClassName("default"))},c.prototype.search_results_mouseup=function(a){var b;return b=a.target.hasClassName("active-result")?a.target:a.target.up(".active-result"),b?(this.result_highlight=b,this.result_select(a),this.search_field.focus()):void 0},c.prototype.search_results_mouseover=function(a){var b;return b=a.target.hasClassName("active-result")?a.target:a.target.up(".active-result"),b?this.result_do_highlight(b):void 0},c.prototype.search_results_mouseout=function(a){return a.target.hasClassName("active-result")||a.target.up(".active-result")?this.result_clear_highlight():void 0},c.prototype.choice_build=function(a){var b,c;return b=new Element("li",{"class":"search-choice"}).update("<span>"+this.choice_label(a)+"</span>"),a.disabled?b.addClassName("search-choice-disabled"):(c=new Element("a",{href:"#","class":"search-choice-close",rel:a.array_index}),c.observe("click",function(a){return function(b){return a.choice_destroy_link_click(b)}}(this)),b.insert(c)),this.search_container.insert({before:b})},c.prototype.choice_destroy_link_click=function(a){return a.preventDefault(),a.stopPropagation(),this.is_disabled?void 0:this.choice_destroy(a.target)},c.prototype.choice_destroy=function(a){return this.result_deselect(a.readAttribute("rel"))?(this.active_field?this.search_field.focus():this.show_search_field_default(),this.is_multiple&&this.choices_count()>0&&this.get_search_field_value().length<1&&this.results_hide(),a.up("li").remove(),this.search_field_scale()):void 0},c.prototype.results_reset=function(){return this.reset_single_select_options(),this.form_field.options[0].selected=!0,this.single_set_selected_text(),this.show_search_field_default(),this.results_reset_cleanup(),this.trigger_form_field_change(),this.active_field?this.results_hide():void 0},c.prototype.results_reset_cleanup=function(){var a;return this.current_selectedIndex=this.form_field.selectedIndex,a=this.selected_item.down("abbr"),a?a.remove():void 0},c.prototype.result_select=function(a){var b,c;return this.result_highlight?(b=this.result_highlight,this.result_clear_highlight(),this.is_multiple&&this.max_selected_options<=this.choices_count()?(this.form_field.fire("chosen:maxselected",{chosen:this}),!1):(this.is_multiple?b.removeClassName("active-result"):this.reset_single_select_options(),b.addClassName("result-selected"),c=this.results_data[b.getAttribute("data-option-array-index")],c.selected=!0,this.form_field.options[c.options_index].selected=!0,this.selected_option_count=null,this.is_multiple?this.choice_build(c):this.single_set_selected_text(this.choice_label(c)),this.is_multiple&&(!this.hide_results_on_select||a.metaKey||a.ctrlKey)?a.metaKey||a.ctrlKey?this.winnow_results({skip_highlight:!0}):(this.search_field.value="",this.winnow_results()):(this.results_hide(),this.show_search_field_default()),(this.is_multiple||this.form_field.selectedIndex!==this.current_selectedIndex)&&this.trigger_form_field_change(),this.current_selectedIndex=this.form_field.selectedIndex,a.preventDefault(),this.search_field_scale())):void 0},c.prototype.single_set_selected_text=function(a){return null==a&&(a=this.default_text),a===this.default_text?this.selected_item.addClassName("chosen-default"):(this.single_deselect_control_build(),this.selected_item.removeClassName("chosen-default")),this.selected_item.down("span").update(a)},c.prototype.result_deselect=function(a){var b;return b=this.results_data[a],this.form_field.options[b.options_index].disabled?!1:(b.selected=!1,this.form_field.options[b.options_index].selected=!1,this.selected_option_count=null,this.result_clear_highlight(),this.results_showing&&this.winnow_results(),this.trigger_form_field_change(),this.search_field_scale(),!0)},c.prototype.single_deselect_control_build=function(){return this.allow_single_deselect?(this.selected_item.down("abbr")||this.selected_item.down("span").insert({after:'<abbr class="search-choice-close"></abbr>'}),this.selected_item.addClassName("chosen-single-with-deselect")):void 0},c.prototype.get_search_field_value=function(){return this.search_field.value},c.prototype.get_search_text=function(){return this.get_search_field_value().strip()},c.prototype.escape_html=function(a){return a.escapeHTML()},c.prototype.winnow_results_set_highlight=function(){var a;return this.is_multiple||(a=this.search_results.down(".result-selected.active-result")),null==a&&(a=this.search_results.down(".active-result")),null!=a?this.result_do_highlight(a):void 0},c.prototype.no_results=function(a){return this.search_results.insert(this.get_no_results_html(a)),this.form_field.fire("chosen:no_results",{chosen:this})},c.prototype.no_results_clear=function(){var a,b;for(a=null,b=[];a=this.search_results.down(".no-results");)b.push(a.remove());return b},c.prototype.keydown_arrow=function(){var a;return this.results_showing&&this.result_highlight?(a=this.result_highlight.next(".active-result"))?this.result_do_highlight(a):void 0:this.results_show()},c.prototype.keyup_arrow=function(){var a,b,c;return this.results_showing||this.is_multiple?this.result_highlight?(c=this.result_highlight.previousSiblings(),a=this.search_results.select("li.active-result"),b=c.intersect(a),b.length?this.result_do_highlight(b.first()):(this.choices_count()>0&&this.results_hide(),this.result_clear_highlight())):void 0:this.results_show()},c.prototype.keydown_backstroke=function(){var a;return this.pending_backstroke?(this.choice_destroy(this.pending_backstroke.down("a")),this.clear_backstroke()):(a=this.search_container.siblings().last(),a&&a.hasClassName("search-choice")&&!a.hasClassName("search-choice-disabled")?(this.pending_backstroke=a,this.pending_backstroke&&this.pending_backstroke.addClassName("search-choice-focus"),this.single_backstroke_delete?this.keydown_backstroke():this.pending_backstroke.addClassName("search-choice-focus")):void 0)},c.prototype.clear_backstroke=function(){return this.pending_backstroke&&this.pending_backstroke.removeClassName("search-choice-focus"),this.pending_backstroke=null},c.prototype.search_field_scale=function(){var a,b,c,d,e,f,g,h;if(this.is_multiple){for(f={position:"absolute",left:"-1000px",top:"-1000px",display:"none",whiteSpace:"pre"},g=["fontSize","fontStyle","fontWeight","fontFamily","lineHeight","textTransform","letterSpacing"],c=0,d=g.length;d>c;c++)e=g[c],f[e]=this.search_field.getStyle(e);return b=new Element("div").update(this.escape_html(this.get_search_field_value())),b.setStyle(f),document.body.appendChild(b),h=b.measure("width")+25,b.remove(),(a=this.container.getWidth())&&(h=Math.min(a-10,h)),this.search_field.setStyle({width:h+"px"})}},c.prototype.trigger_form_field_change=function(){return e(this.form_field,"input"),e(this.form_field,"change")},e=function(a,b){var c;if(a.dispatchEvent){try{c=new Event(b,{bubbles:!0,cancelable:!0})}catch(d){c=document.createEvent("HTMLEvents"),c.initEvent(b,!0,!0)}return a.dispatchEvent(c)}return a.fireEvent("on"+b,document.createEventObject())},c}(a)}).call(this);