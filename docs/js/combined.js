function geoFindMe(){return navigator.geolocation?void navigator.geolocation.getCurrentPosition(geoSuccess,geoError):void intro.append("<p>Geolocation is not supported by your browser</p>")}function geoSuccess(e){var t=e.coords.latitude,n=e.coords.longitude;loadCoffees(buildUrl(t,n)),introTransform()}function geoError(e){switch(e.code){case e.PERMISSION_DENIED:intro.innerHTML='<p style="margin-top:0">You denied the request for Geolocation.<br>You must accept the request for geolocation in order to app work.</p><button id="reload" class="button input-lg">Reload</button>',$("#reload").on("click",function(){location.reload()});break;case e.POSITION_UNAVAILABLE:intro.innerHTML="<p>Location information is unavailable.</p>";break;case e.TIMEOUT:intro.innerHTML="<p>The request to get user location timed out.</p>";break;case e.UNKNOWN_ERROR:intro.innerHTML="<p>An unknown error occurred.</p>"}}function buildUrl(e,t){var n="https://api.foursquare.com/v2/venues/explore?",i="NUWCSVP35BFQ2EGF4SNTU2PCMW23H3OJN1W21P3JXLQO0K1H",r="4IA23BBFIS1W5GDJAVSHEJPTY3KLTAX0CJQTRCGDJDUJ3X15",o="client_id="+i+"&client_secret="+r,s="section=coffee",a="ll="+e+","+t,c="radius=1000",l="v=20170629",u="venuePhotos=1",h="openNow=1",f="sortByDistance=1",p="limit=10",d=n+"&"+a+"&"+c+"&"+s+"&"+u+"&"+h+"&"+f+"&&"+p+"&"+o+"&"+l;return console.log("Url adresa je: "+d),d}function loadCoffees(e){$.ajax({url:e,type:"get",success:function(e){data=e,caffees=e.response.groups[0].items,caffees.length>0?printData(caffees):(output.innerHTML='<p class="no-coffees">There aren\'t coffees nearby!</p>',$("#sort-criteria").attr("disabled","disabled"))},failure:function(){alert("Something is wrong!")},error:function(e){alert("Something is wrong with data connection!")}})}function printData(e){dataObj={items:e},console.log(dataObj);var t=$("#item-container").html();console.log("template: "+t);var n=Mustache.to_html(t,dataObj);for(console.log(output),console.log("htmlcontent: "+n),output.innerHTML=n,imageLoadingAnimation(),coffeeItemsDivs=$(".item-wrapper"),coffeeItemsDivs.addClass("invisible"),animateRevealing(),i=0;i<coffeeItemsDivs.length;i++)$(coffeeItemsDivs[i]).resize(function(){console.log("promenjeno"+$(coffeeItemsDivs[i])),Waypoint.refreshAll()})}function sortCoffees(e){var t;if("Distance"==e)caffees.sort(function(e,t){return e.venue.location.distance>t.venue.location.distance?1:t.venue.location.distance>e.venue.location.distance?-1:0}),t=caffees;else if("Price"==e){for(var n=caffees.slice(0),i=[],r=0;r<n.length;r++)if(void 0==n[r].venue.price){var o=n.splice(r,1);i.push(o[0])}n.sort(function(e,t){return e.venue.price.tier>t.venue.price.tier?1:t.venue.price.tier>e.venue.price.tier?-1:0}),t=n.concat(i)}console.log("array with price: "+n),printData(t)}function introTransform(){$("#intro h1").css("font-size","24px"),$("#intro h2").css("display","none"),$("#intro p").css("display","none"),$("#intro").css({top:"0",transform:"translateY(0)"}),$("header").css({height:"66px",padding:"20px 0"}),$("#background-hover").css("background-color","rgb(72,28,22)"),$("header h1").css("margin-bottom","0px"),$("#cup1").css("display","none"),$("#cup2").css("display","none"),$(".main-content-wrapper").css("display","block"),setTimeout(function(){Waypoint.refreshAll()},1500)}function imageLoadingAnimation(){$(".image-container img").css("visibility","hidden"),$(".image-container img").on("load",function(){$(this).css("visibility","visible")}),$(".featherlight-content img").css("visibility","hidden"),$(".featherlight-content img").on("load",function(){$(this).css("visibility","visible")})}function animateRevealing(){for(i=0;i<coffeeItemsDivs.length;i++)new Waypoint({element:coffeeItemsDivs[i],handler:function(e){$(this.element).removeClass("invisible")},offset:"100%"})}!function(e){"use strict";function t(e,n){if(!(this instanceof t)){var i=new t(e,n);return i.open(),i}this.id=t.id++,this.setup(e,n),this.chainCallbacks(t._callbackChain)}function n(e,t){var n={};for(var i in e)i in t&&(n[i]=e[i],delete e[i]);return n}function i(e,t){var n={},i=new RegExp("^"+t+"([A-Z])(.*)");for(var r in e){var o=r.match(i);if(o){var s=(o[1]+o[2].replace(/([A-Z])/g,"-$1")).toLowerCase();n[s]=e[r]}}return n}if("undefined"==typeof e)return void("console"in window&&window.console.info("Too much lightness, Featherlight needs jQuery."));var r=[],o=function(t){return r=e.grep(r,function(e){return e!==t&&e.$instance.closest("body").length>0})},s={allowfullscreen:1,frameborder:1,height:1,longdesc:1,marginheight:1,marginwidth:1,name:1,referrerpolicy:1,scrolling:1,sandbox:1,src:1,srcdoc:1,width:1},a={keyup:"onKeyUp",resize:"onResize"},c=function(n){e.each(t.opened().reverse(),function(){if(!n.isDefaultPrevented()&&!1===this[a[n.type]](n))return n.preventDefault(),n.stopPropagation(),!1})},l=function(n){if(n!==t._globalHandlerInstalled){t._globalHandlerInstalled=n;var i=e.map(a,function(e,n){return n+"."+t.prototype.namespace}).join(" ");e(window)[n?"on":"off"](i,c)}};t.prototype={constructor:t,namespace:"featherlight",targetAttr:"data-featherlight",variant:null,resetCss:!1,background:null,openTrigger:"click",closeTrigger:"click",filter:null,root:"body",openSpeed:250,closeSpeed:250,closeOnClick:"background",closeOnEsc:!0,closeIcon:"&#10005;",loading:"",persist:!1,otherClose:null,beforeOpen:e.noop,beforeContent:e.noop,beforeClose:e.noop,afterOpen:e.noop,afterContent:e.noop,afterClose:e.noop,onKeyUp:e.noop,onResize:e.noop,type:null,contentFilters:["jquery","image","html","ajax","iframe","text"],setup:function(t,n){"object"!=typeof t||t instanceof e!=!1||n||(n=t,t=void 0);var i=e.extend(this,n,{target:t}),r=i.resetCss?i.namespace+"-reset":i.namespace,o=e(i.background||['<div class="'+r+"-loading "+r+'">','<div class="'+r+'-content">','<button class="'+r+"-close-icon "+i.namespace+'-close" aria-label="Close">',i.closeIcon,"</button>",'<div class="'+i.namespace+'-inner">'+i.loading+"</div>","</div>","</div>"].join("")),s="."+i.namespace+"-close"+(i.otherClose?","+i.otherClose:"");return i.$instance=o.clone().addClass(i.variant),i.$instance.on(i.closeTrigger+"."+i.namespace,function(t){var n=e(t.target);("background"===i.closeOnClick&&n.is("."+i.namespace)||"anywhere"===i.closeOnClick||n.closest(s).length)&&(i.close(t),t.preventDefault())}),this},getContent:function(){if(this.persist!==!1&&this.$content)return this.$content;var t=this,n=this.constructor.contentFilters,i=function(e){return t.$currentTarget&&t.$currentTarget.attr(e)},r=i(t.targetAttr),o=t.target||r||"",s=n[t.type];if(!s&&o in n&&(s=n[o],o=t.target&&r),o=o||i("href")||"",!s)for(var a in n)t[a]&&(s=n[a],o=t[a]);if(!s){var c=o;if(o=null,e.each(t.contentFilters,function(){return s=n[this],s.test&&(o=s.test(c)),!o&&s.regex&&c.match&&c.match(s.regex)&&(o=c),!o}),!o)return"console"in window&&window.console.error("Featherlight: no content filter found "+(c?' for "'+c+'"':" (no target specified)")),!1}return s.process.call(t,o)},setContent:function(t){var n=this;return t.is("iframe")&&n.$instance.addClass(n.namespace+"-iframe"),n.$instance.removeClass(n.namespace+"-loading"),n.$instance.find("."+n.namespace+"-inner").not(t).slice(1).remove().end().replaceWith(e.contains(n.$instance[0],t[0])?"":t),n.$content=t.addClass(n.namespace+"-inner"),n},open:function(t){var n=this;if(n.$instance.hide().appendTo(n.root),!(t&&t.isDefaultPrevented()||n.beforeOpen(t)===!1)){t&&t.preventDefault();var i=n.getContent();if(i)return r.push(n),l(!0),n.$instance.fadeIn(n.openSpeed),n.beforeContent(t),e.when(i).always(function(e){n.setContent(e),n.afterContent(t)}).then(n.$instance.promise()).done(function(){n.afterOpen(t)})}return n.$instance.detach(),e.Deferred().reject().promise()},close:function(t){var n=this,i=e.Deferred();return n.beforeClose(t)===!1?i.reject():(0===o(n).length&&l(!1),n.$instance.fadeOut(n.closeSpeed,function(){n.$instance.detach(),n.afterClose(t),i.resolve()})),i.promise()},resize:function(e,t){if(e&&t){this.$content.css("width","").css("height","");var n=Math.max(e/(parseInt(this.$content.parent().css("width"),10)-1),t/(parseInt(this.$content.parent().css("height"),10)-1));n>1&&(n=t/Math.floor(t/n),this.$content.css("width",""+e/n+"px").css("height",""+t/n+"px"))}},chainCallbacks:function(t){for(var n in t)this[n]=e.proxy(t[n],this,e.proxy(this[n],this))}},e.extend(t,{id:0,autoBind:"[data-featherlight]",defaults:t.prototype,contentFilters:{jquery:{regex:/^[#.]\w/,test:function(t){return t instanceof e&&t},process:function(t){return this.persist!==!1?e(t):e(t).clone(!0)}},image:{regex:/\.(png|jpg|jpeg|gif|tiff|bmp|svg)(\?\S*)?$/i,process:function(t){var n=this,i=e.Deferred(),r=new Image,o=e('<img src="'+t+'" alt="" class="'+n.namespace+'-image" />');return r.onload=function(){o.naturalWidth=r.width,o.naturalHeight=r.height,i.resolve(o)},r.onerror=function(){i.reject(o)},r.src=t,i.promise()}},html:{regex:/^\s*<[\w!][^<]*>/,process:function(t){return e(t)}},ajax:{regex:/./,process:function(t){var n=e.Deferred(),i=e("<div></div>").load(t,function(e,t){"error"!==t&&n.resolve(i.contents()),n.fail()});return n.promise()}},iframe:{process:function(t){var r=new e.Deferred,o=e("<iframe/>"),a=i(this,"iframe"),c=n(a,s);return o.hide().attr("src",t).attr(c).css(a).on("load",function(){r.resolve(o.show())}).appendTo(this.$instance.find("."+this.namespace+"-content")),r.promise()}},text:{process:function(t){return e("<div>",{text:t})}}},functionAttributes:["beforeOpen","afterOpen","beforeContent","afterContent","beforeClose","afterClose"],readElementConfig:function(t,n){var i=this,r=new RegExp("^data-"+n+"-(.*)"),o={};return t&&t.attributes&&e.each(t.attributes,function(){var t=this.name.match(r);if(t){var n=this.value,s=e.camelCase(t[1]);if(e.inArray(s,i.functionAttributes)>=0)n=new Function(n);else try{n=JSON.parse(n)}catch(a){}o[s]=n}}),o},extend:function(t,n){var i=function(){this.constructor=t};return i.prototype=this.prototype,t.prototype=new i,t.__super__=this.prototype,e.extend(t,this,n),t.defaults=t.prototype,t},attach:function(t,n,i){var r=this;"object"!=typeof n||n instanceof e!=!1||i||(i=n,n=void 0),i=e.extend({},i);var o,s=i.namespace||r.defaults.namespace,a=e.extend({},r.defaults,r.readElementConfig(t[0],s),i),c=function(s){var c=e.extend({$source:t,$currentTarget:e(this)},r.readElementConfig(t[0],a.namespace),r.readElementConfig(this,a.namespace),i),l=o||e(this).data("featherlight-persisted")||new r(n,c);"shared"===l.persist?o=l:l.persist!==!1&&e(this).data("featherlight-persisted",l),c.$currentTarget.blur(),l.open(s)};return t.on(a.openTrigger+"."+a.namespace,a.filter,c),c},current:function(){var e=this.opened();return e[e.length-1]||null},opened:function(){var t=this;return o(),e.grep(r,function(e){return e instanceof t})},close:function(e){var t=this.current();if(t)return t.close(e)},_onReady:function(){var t=this;t.autoBind&&(e(t.autoBind).each(function(){t.attach(e(this))}),e(document).on("click",t.autoBind,function(n){if(!n.isDefaultPrevented()){var i=t.attach(e(n.currentTarget));i(n)}}))},_callbackChain:{onKeyUp:function(t,n){return 27===n.keyCode?(this.closeOnEsc&&e.featherlight.close(n),!1):t(n)},beforeOpen:function(t,n){return this._previouslyActive=document.activeElement,this._$previouslyTabbable=e("a, input, select, textarea, iframe, button, iframe, [contentEditable=true]").not("[tabindex]").not(this.$instance.find("button")),this._$previouslyWithTabIndex=e("[tabindex]").not('[tabindex="-1"]'),this._previousWithTabIndices=this._$previouslyWithTabIndex.map(function(t,n){return e(n).attr("tabindex")}),this._$previouslyWithTabIndex.add(this._$previouslyTabbable).attr("tabindex",-1),document.activeElement.blur(),t(n)},afterClose:function(t,n){var i=t(n),r=this;return this._$previouslyTabbable.removeAttr("tabindex"),this._$previouslyWithTabIndex.each(function(t,n){e(n).attr("tabindex",r._previousWithTabIndices[t])}),this._previouslyActive.focus(),i},onResize:function(e,t){return this.resize(this.$content.naturalWidth,this.$content.naturalHeight),e(t)},afterContent:function(e,t){var n=e(t);return this.$instance.find("[autofocus]:not([disabled])").focus(),this.onResize(t),n}}}),e.featherlight=t,e.fn.featherlight=function(e,n){return t.attach(this,e,n),this},e(document).ready(function(){t._onReady()})}(jQuery),function(e,t){if("object"==typeof exports&&exports)t(exports);else{var n={};t(n),"function"==typeof define&&define.amd?define(n):e.Mustache=n}}(this,function(e){function t(e,t){return y.call(e,t)}function n(e){return!t(g,e)}function i(e){return"function"==typeof e}function r(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function o(e){return String(e).replace(/[&<>"'\/]/g,function(e){return _[e]})}function s(e){if(!x(e)||2!==e.length)throw new Error("Invalid tags: "+e);return[new RegExp(r(e[0])+"\\s*"),new RegExp("\\s*"+r(e[1]))]}function a(t,i){function o(){if(A&&!$)for(;k.length;)delete T[k.pop()];else k=[];A=!1,$=!1}i=i||e.tags,t=t||"","string"==typeof i&&(i=i.split(d));for(var a,h,f,g,y,b,x=s(i),_=new u(t),C=[],T=[],k=[],A=!1,$=!1;!_.eos();){if(a=_.pos,f=_.scanUntil(x[0]))for(var z=0,S=f.length;z<S;++z)g=f.charAt(z),n(g)?k.push(T.length):$=!0,T.push(["text",g,a,a+1]),a+=1,"\n"===g&&o();if(!_.scan(x[0]))break;if(A=!0,h=_.scan(w)||"name",_.scan(p),"="===h?(f=_.scanUntil(v),_.scan(v),_.scanUntil(x[1])):"{"===h?(f=_.scanUntil(new RegExp("\\s*"+r("}"+i[1]))),_.scan(m),_.scanUntil(x[1]),h="&"):f=_.scanUntil(x[1]),!_.scan(x[1]))throw new Error("Unclosed tag at "+_.pos);if(y=[h,f,a,_.pos],T.push(y),"#"===h||"^"===h)C.push(y);else if("/"===h){if(b=C.pop(),!b)throw new Error('Unopened section "'+f+'" at '+a);if(b[1]!==f)throw new Error('Unclosed section "'+b[1]+'" at '+a)}else"name"===h||"{"===h||"&"===h?$=!0:"="===h&&(x=s(i=f.split(d)))}if(b=C.pop())throw new Error('Unclosed section "'+b[1]+'" at '+_.pos);return l(c(T))}function c(e){for(var t,n,i=[],r=0,o=e.length;r<o;++r)t=e[r],t&&("text"===t[0]&&n&&"text"===n[0]?(n[1]+=t[1],n[3]=t[3]):(i.push(t),n=t));return i}function l(e){for(var t,n,i=[],r=i,o=[],s=0,a=e.length;s<a;++s)switch(t=e[s],t[0]){case"#":case"^":r.push(t),o.push(t),r=t[4]=[];break;case"/":n=o.pop(),n[5]=t[2],r=o.length>0?o[o.length-1][4]:i;break;default:r.push(t)}return i}function u(e){this.string=e,this.tail=e,this.pos=0}function h(e,t){this.view=null==e?{}:e,this.cache={".":this.view},this.parent=t}function f(){this.cache={}}var p=/\s*/,d=/\s+/,g=/\S/,v=/\s*=/,m=/\s*\}/,w=/#|\^|\/|>|\{|&|=|!/,y=RegExp.prototype.test,b=Object.prototype.toString,x=Array.isArray||function(e){return"[object Array]"===b.call(e)},_={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};u.prototype.eos=function(){return""===this.tail},u.prototype.scan=function(e){var t=this.tail.match(e);if(t&&0===t.index){var n=t[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n}return""},u.prototype.scanUntil=function(e){var t,n=this.tail.search(e);switch(n){case-1:t=this.tail,this.tail="";break;case 0:t="";break;default:t=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=t.length,t},h.prototype.push=function(e){return new h(e,this)},h.prototype.lookup=function(e){var t;if(e in this.cache)t=this.cache[e];else{for(var n=this;n;){if(e.indexOf(".")>0){t=n.view;for(var r=e.split("."),o=0;null!=t&&o<r.length;)t=t[r[o++]]}else t=n.view[e];if(null!=t)break;n=n.parent}this.cache[e]=t}return i(t)&&(t=t.call(this.view)),t},f.prototype.clearCache=function(){this.cache={}},f.prototype.parse=function(e,t){var n=this.cache,i=n[e];return null==i&&(i=n[e]=a(e,t)),i},f.prototype.render=function(e,t,n){var i=this.parse(e),r=t instanceof h?t:new h(t);return this.renderTokens(i,r,n,e)},f.prototype.renderTokens=function(t,n,r,o){function s(e){return u.render(e,n,r)}for(var a,c,l="",u=this,h=0,f=t.length;h<f;++h)switch(a=t[h],a[0]){case"#":if(c=n.lookup(a[1]),!c)continue;if(x(c))for(var p=0,d=c.length;p<d;++p)l+=this.renderTokens(a[4],n.push(c[p]),r,o);else if("object"==typeof c||"string"==typeof c)l+=this.renderTokens(a[4],n.push(c),r,o);else if(i(c)){if("string"!=typeof o)throw new Error("Cannot use higher-order sections without the original template");c=c.call(n.view,o.slice(a[3],a[5]),s),null!=c&&(l+=c)}else l+=this.renderTokens(a[4],n,r,o);break;case"^":c=n.lookup(a[1]),(!c||x(c)&&0===c.length)&&(l+=this.renderTokens(a[4],n,r,o));break;case">":if(!r)continue;c=i(r)?r(a[1]):r[a[1]],null!=c&&(l+=this.renderTokens(this.parse(c),n,r,c));break;case"&":c=n.lookup(a[1]),null!=c&&(l+=c);break;case"name":c=n.lookup(a[1]),null!=c&&(l+=e.escape(c));break;case"text":l+=a[1]}return l},e.name="mustache.js",e.version="0.8.1",e.tags=["{{","}}"];var C=new f;e.clearCache=function(){return C.clearCache()},e.parse=function(e,t){return C.parse(e,t)},e.render=function(e,t,n){return C.render(e,t,n)},e.to_html=function(t,n,r,o){var s=e.render(t,n,r);return i(o)?void o(s):s},e.escape=o,e.Scanner=u,e.Context=h,e.Writer=f}),!function(){"use strict";function e(i){if(!i)throw new Error("No options passed to Waypoint constructor");if(!i.element)throw new Error("No element option passed to Waypoint constructor");if(!i.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+t,this.options=e.Adapter.extend({},e.defaults,i),this.element=this.options.element,this.adapter=new e.Adapter(this.element),this.callback=i.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=e.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=e.Context.findOrCreateByElement(this.options.context),e.offsetAliases[this.options.offset]&&(this.options.offset=e.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),n[this.key]=this,t+=1}var t=0,n={};e.prototype.queueTrigger=function(e){this.group.queueTrigger(this,e)},e.prototype.trigger=function(e){this.enabled&&this.callback&&this.callback.apply(this,e)},e.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete n[this.key]},e.prototype.disable=function(){return this.enabled=!1,this},e.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},e.prototype.next=function(){return this.group.next(this)},e.prototype.previous=function(){return this.group.previous(this)},e.invokeAll=function(e){var t=[];for(var i in n)t.push(n[i]);for(var r=0,o=t.length;o>r;r++)t[r][e]()},e.destroyAll=function(){e.invokeAll("destroy")},e.disableAll=function(){e.invokeAll("disable")},e.enableAll=function(){e.Context.refreshAll();for(var t in n)n[t].enabled=!0;return this},e.refreshAll=function(){e.Context.refreshAll()},e.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},e.viewportWidth=function(){return document.documentElement.clientWidth},e.adapters=[],e.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},e.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=e}(),function(){"use strict";function e(e){window.setTimeout(e,1e3/60)}function t(e){this.element=e,this.Adapter=r.Adapter,this.adapter=new this.Adapter(e),this.key="waypoint-context-"+n,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},e.waypointContextKey=this.key,i[e.waypointContextKey]=this,n+=1,r.windowContext||(r.windowContext=!0,r.windowContext=new t(window)),this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var n=0,i={},r=window.Waypoint,o=window.onload;t.prototype.add=function(e){var t=e.options.horizontal?"horizontal":"vertical";this.waypoints[t][e.key]=e,this.refresh()},t.prototype.checkEmpty=function(){var e=this.Adapter.isEmptyObject(this.waypoints.horizontal),t=this.Adapter.isEmptyObject(this.waypoints.vertical),n=this.element==this.element.window;e&&t&&!n&&(this.adapter.off(".waypoints"),delete i[this.key])},t.prototype.createThrottledResizeHandler=function(){function e(){t.handleResize(),t.didResize=!1}var t=this;this.adapter.on("resize.waypoints",function(){t.didResize||(t.didResize=!0,r.requestAnimationFrame(e))})},t.prototype.createThrottledScrollHandler=function(){function e(){t.handleScroll(),t.didScroll=!1}var t=this;this.adapter.on("scroll.waypoints",function(){(!t.didScroll||r.isTouch)&&(t.didScroll=!0,r.requestAnimationFrame(e))})},t.prototype.handleResize=function(){r.Context.refreshAll()},t.prototype.handleScroll=function(){var e={},t={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var n in t){var i=t[n],r=i.newScroll>i.oldScroll,o=r?i.forward:i.backward;for(var s in this.waypoints[n]){var a=this.waypoints[n][s];if(null!==a.triggerPoint){var c=i.oldScroll<a.triggerPoint,l=i.newScroll>=a.triggerPoint,u=c&&l,h=!c&&!l;(u||h)&&(a.queueTrigger(o),e[a.group.id]=a.group)}}}for(var f in e)e[f].flushTriggers();this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}},t.prototype.innerHeight=function(){return this.element==this.element.window?r.viewportHeight():this.adapter.innerHeight()},t.prototype.remove=function(e){delete this.waypoints[e.axis][e.key],this.checkEmpty()},t.prototype.innerWidth=function(){return this.element==this.element.window?r.viewportWidth():this.adapter.innerWidth()},t.prototype.destroy=function(){var e=[];for(var t in this.waypoints)for(var n in this.waypoints[t])e.push(this.waypoints[t][n]);for(var i=0,r=e.length;r>i;i++)e[i].destroy()},t.prototype.refresh=function(){var e,t=this.element==this.element.window,n=t?void 0:this.adapter.offset(),i={};this.handleScroll(),e={horizontal:{contextOffset:t?0:n.left,contextScroll:t?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:t?0:n.top,contextScroll:t?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var o in e){var s=e[o];for(var a in this.waypoints[o]){var c,l,u,h,f,p=this.waypoints[o][a],d=p.options.offset,g=p.triggerPoint,v=0,m=null==g;p.element!==p.element.window&&(v=p.adapter.offset()[s.offsetProp]),"function"==typeof d?d=d.apply(p):"string"==typeof d&&(d=parseFloat(d),p.options.offset.indexOf("%")>-1&&(d=Math.ceil(s.contextDimension*d/100))),c=s.contextScroll-s.contextOffset,p.triggerPoint=Math.floor(v+c-d),l=g<s.oldScroll,u=p.triggerPoint>=s.oldScroll,h=l&&u,f=!l&&!u,!m&&h?(p.queueTrigger(s.backward),i[p.group.id]=p.group):!m&&f?(p.queueTrigger(s.forward),i[p.group.id]=p.group):m&&s.oldScroll>=p.triggerPoint&&(p.queueTrigger(s.forward),i[p.group.id]=p.group)}}return r.requestAnimationFrame(function(){for(var e in i)i[e].flushTriggers()}),this},t.findOrCreateByElement=function(e){return t.findByElement(e)||new t(e)},t.refreshAll=function(){for(var e in i)i[e].refresh()},t.findByElement=function(e){return i[e.waypointContextKey]},window.onload=function(){o&&o(),t.refreshAll()},r.requestAnimationFrame=function(t){var n=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||e;n.call(window,t)},r.Context=t}(),function(){"use strict";function e(e,t){return e.triggerPoint-t.triggerPoint}function t(e,t){return t.triggerPoint-e.triggerPoint}function n(e){this.name=e.name,this.axis=e.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),i[this.axis][this.name]=this}var i={vertical:{},horizontal:{}},r=window.Waypoint;n.prototype.add=function(e){this.waypoints.push(e)},n.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},n.prototype.flushTriggers=function(){for(var n in this.triggerQueues){var i=this.triggerQueues[n],r="up"===n||"left"===n;i.sort(r?t:e);for(var o=0,s=i.length;s>o;o+=1){var a=i[o];(a.options.continuous||o===i.length-1)&&a.trigger([n])}}this.clearTriggerQueues()},n.prototype.next=function(t){this.waypoints.sort(e);var n=r.Adapter.inArray(t,this.waypoints),i=n===this.waypoints.length-1;return i?null:this.waypoints[n+1]},n.prototype.previous=function(t){this.waypoints.sort(e);var n=r.Adapter.inArray(t,this.waypoints);return n?this.waypoints[n-1]:null},n.prototype.queueTrigger=function(e,t){this.triggerQueues[t].push(e)},n.prototype.remove=function(e){var t=r.Adapter.inArray(e,this.waypoints);t>-1&&this.waypoints.splice(t,1)},n.prototype.first=function(){return this.waypoints[0]},n.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},n.findOrCreate=function(e){return i[e.axis][e.name]||new n(e)},r.Group=n}(),function(){"use strict";function e(e){this.$element=t(e)}var t=window.jQuery,n=window.Waypoint;t.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(t,n){e.prototype[n]=function(){var e=Array.prototype.slice.call(arguments);return this.$element[n].apply(this.$element,e)}}),t.each(["extend","inArray","isEmptyObject"],function(n,i){e[i]=t[i]}),n.adapters.push({name:"jquery",Adapter:e}),n.Adapter=e}(),function(){"use strict";function e(e){return function(){var n=[],i=arguments[0];return e.isFunction(arguments[0])&&(i=e.extend({},arguments[1]),i.handler=arguments[0]),this.each(function(){var r=e.extend({},i,{element:this});"string"==typeof r.context&&(r.context=e(this).closest(r.context)[0]),n.push(new t(r))}),n}}var t=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=e(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=e(window.Zepto))}(),function(e){function t(e){var t=e.__resizeTriggers__,n=t.firstElementChild,i=t.lastElementChild,r=n.firstElementChild;i.scrollLeft=i.scrollWidth,i.scrollTop=i.scrollHeight,r.style.width=n.offsetWidth+1+"px",r.style.height=n.offsetHeight+1+"px",n.scrollLeft=n.scrollWidth,n.scrollTop=n.scrollHeight}function n(e){return e.offsetWidth!=e.__resizeLast__.width||e.offsetHeight!=e.__resizeLast__.height}function i(e){var i=this;t(this),this.__resizeRAF__&&l(this.__resizeRAF__),this.__resizeRAF__=c(function(){n(i)&&(i.__resizeLast__.width=i.offsetWidth,i.__resizeLast__.height=i.offsetHeight,i.__resizeListeners__.forEach(function(t){t.call(i,e)}))})}function r(){if(!s){var e=(b?b:"")+".resize-triggers { "+(x?x:"")+'visibility: hidden; opacity: 0; } .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',t=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css",n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e)),t.appendChild(n),s=!0}}var o=document.attachEvent,s=!1,a=e.fn.resize;if(e.fn.resize=function(e){return this.each(function(){this==window?a.call(jQuery(this),e):addResizeListener(this,e)})},e.fn.removeResize=function(e){return this.each(function(){removeResizeListener(this,e)})},!o){var c=function(){var e=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(e){return window.setTimeout(e,20)};return function(t){return e(t)}}(),l=function(){var e=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.clearTimeout;return function(t){return e(t)}}(),u=!1,h="animation",f="",p="animationstart",d="Webkit Moz O ms".split(" "),g="webkitAnimationStart animationstart oAnimationStart MSAnimationStart".split(" "),v="",m=document.createElement("fakeelement");if(void 0!==m.style.animationName&&(u=!0),u===!1)for(var w=0;w<d.length;w++)if(void 0!==m.style[d[w]+"AnimationName"]){v=d[w],h=v+"Animation",f="-"+v.toLowerCase()+"-",p=g[w],u=!0;break}var y="resizeanim",b="@"+f+"keyframes "+y+" { from { opacity: 0; } to { opacity: 0; } } ",x=f+"animation: 1ms "+y+"; "}window.addResizeListener=function(e,n){o?e.attachEvent("onresize",n):(e.__resizeTriggers__||("static"==getComputedStyle(e).position&&(e.style.position="relative"),r(),e.__resizeLast__={},e.__resizeListeners__=[],(e.__resizeTriggers__=document.createElement("div")).className="resize-triggers",e.__resizeTriggers__.innerHTML='<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>',e.appendChild(e.__resizeTriggers__),t(e),e.addEventListener("scroll",i,!0),p&&e.__resizeTriggers__.addEventListener(p,function(n){n.animationName==y&&t(e)})),e.__resizeListeners__.push(n))},window.removeResizeListener=function(e,t){o?e.detachEvent("onresize",t):(e.__resizeListeners__.splice(e.__resizeListeners__.indexOf(t),1),e.__resizeListeners__.length||(e.removeEventListener("scroll",i),e.__resizeTriggers__=!e.removeChild(e.__resizeTriggers__)))}}(jQuery);var caffees,intro=document.getElementById("intro"),output=document.getElementById("content-wrapper"),coffeeItemsDivs;$(document).ready(function(){geoFindMe(),$(window).width()>768&&($("#cup1").addClass("cup1-animation"),$("#cup2").addClass("cup2-animation"),$("#intro").addClass("intro-animation"))}),$("#sort-criteria").change(function(){console.log("Promenjeno je u "+$(this).val());var e=$(this).val();sortCoffees(e)});