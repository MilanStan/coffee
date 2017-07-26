function geoFindMe(){return navigator.geolocation?void navigator.geolocation.getCurrentPosition(geoSuccess,geoError):void intro.append("<p>Geolocation is not supported by your browser</p>")}function geoSuccess(e){var t=e.coords.latitude,n=e.coords.longitude;loadCoffees(buildUrl(t,n)),introTransform()}function geoError(e){switch(e.code){case e.PERMISSION_DENIED:intro.innerHTML='<p style="margin-top:0">You denied the request for Geolocation.<br>You must accept the request for geolocation in order to app work.</p><button id="reload" class="button input-lg">Reload</button>',$("#reload").on("click",function(){location.reload()});break;case e.POSITION_UNAVAILABLE:intro.innerHTML="<p>Location information is unavailable.</p>";break;case e.TIMEOUT:intro.innerHTML="<p>The request to get user location timed out.</p>";break;case e.UNKNOWN_ERROR:intro.innerHTML="<p>An unknown error occurred.</p>"}}function buildUrl(e,t){var n="https://api.foursquare.com/v2/venues/explore?",r="NUWCSVP35BFQ2EGF4SNTU2PCMW23H3OJN1W21P3JXLQO0K1H",i="4IA23BBFIS1W5GDJAVSHEJPTY3KLTAX0CJQTRCGDJDUJ3X15",o="client_id="+r+"&client_secret="+i,s="section=coffee",a="ll="+e+","+t,c="radius=1000",u="v=20170629",l="venuePhotos=1",f="openNow=1",p="sortByDistance=1",h="limit=10",d=n+"&"+a+"&"+c+"&"+s+"&"+l+"&"+f+"&"+p+"&&"+h+"&"+o+"&"+u;return console.log("Url adresa je: "+d),d}function loadCoffees(e){$.ajax({url:e,type:"get",success:function(e){data=e,caffees=e.response.groups[0].items,caffees.length>0?printData(caffees):(output.innerHTML='<p class="no-coffees">There aren\'t coffees nearby!</p>',$("#sort-criteria").attr("disabled","disabled"))},failure:function(){alert("Something is wrong!")},error:function(e){alert("Something is wrong with data connection!")}})}function printData(e){dataObj={items:e},console.log(dataObj);var t=$("#item-container").html();console.log("template: "+t);var n=Mustache.to_html(t,dataObj);console.log(output),console.log("htmlcontent: "+n),output.innerHTML=n,imageLoadingAnimation()}function sortCoffees(e){var t;if("Distance"==e)caffees.sort(function(e,t){return e.venue.location.distance>t.venue.location.distance?1:t.venue.location.distance>e.venue.location.distance?-1:0}),t=caffees;else if("Price"==e){for(var n=caffees.slice(0),r=[],i=0;i<n.length;i++)if(void 0==n[i].venue.price){var o=n.splice(i,1);r.push(o[0])}n.sort(function(e,t){return e.venue.price.tier>t.venue.price.tier?1:t.venue.price.tier>e.venue.price.tier?-1:0}),t=n.concat(r)}console.log("array with price: "+n),printData(t)}function introTransform(){$("#intro h1").css("font-size","24px"),$("#intro h2").css("display","none"),$("#intro p").css("display","none"),$("#intro").css({top:"0",transform:"translateY(0)"}),$("header").css({height:"66px",padding:"20px 0"}),$("#background-hover").css("background-color","rgb(72,28,22)"),$("header h1").css("margin-bottom","0px"),$("#cup1").css("display","none"),$("#cup2").css("display","none"),$(".main-content-wrapper").css("display","block")}function imageLoadingAnimation(){$(".image-container img").css("visibility","hidden"),$(".image-container img").on("load",function(){$(this).css("visibility","visible")}),$(".featherlight-content img").css("visibility","hidden"),$(".featherlight-content img").on("load",function(){$(this).css("visibility","visible")})}!function(e){"use strict";function t(e,n){if(!(this instanceof t)){var r=new t(e,n);return r.open(),r}this.id=t.id++,this.setup(e,n),this.chainCallbacks(t._callbackChain)}function n(e,t){var n={};for(var r in e)r in t&&(n[r]=e[r],delete e[r]);return n}function r(e,t){var n={},r=new RegExp("^"+t+"([A-Z])(.*)");for(var i in e){var o=i.match(r);if(o){var s=(o[1]+o[2].replace(/([A-Z])/g,"-$1")).toLowerCase();n[s]=e[i]}}return n}if("undefined"==typeof e)return void("console"in window&&window.console.info("Too much lightness, Featherlight needs jQuery."));var i=[],o=function(t){return i=e.grep(i,function(e){return e!==t&&e.$instance.closest("body").length>0})},s={allowfullscreen:1,frameborder:1,height:1,longdesc:1,marginheight:1,marginwidth:1,name:1,referrerpolicy:1,scrolling:1,sandbox:1,src:1,srcdoc:1,width:1},a={keyup:"onKeyUp",resize:"onResize"},c=function(n){e.each(t.opened().reverse(),function(){if(!n.isDefaultPrevented()&&!1===this[a[n.type]](n))return n.preventDefault(),n.stopPropagation(),!1})},u=function(n){if(n!==t._globalHandlerInstalled){t._globalHandlerInstalled=n;var r=e.map(a,function(e,n){return n+"."+t.prototype.namespace}).join(" ");e(window)[n?"on":"off"](r,c)}};t.prototype={constructor:t,namespace:"featherlight",targetAttr:"data-featherlight",variant:null,resetCss:!1,background:null,openTrigger:"click",closeTrigger:"click",filter:null,root:"body",openSpeed:250,closeSpeed:250,closeOnClick:"background",closeOnEsc:!0,closeIcon:"&#10005;",loading:"",persist:!1,otherClose:null,beforeOpen:e.noop,beforeContent:e.noop,beforeClose:e.noop,afterOpen:e.noop,afterContent:e.noop,afterClose:e.noop,onKeyUp:e.noop,onResize:e.noop,type:null,contentFilters:["jquery","image","html","ajax","iframe","text"],setup:function(t,n){"object"!=typeof t||t instanceof e!=!1||n||(n=t,t=void 0);var r=e.extend(this,n,{target:t}),i=r.resetCss?r.namespace+"-reset":r.namespace,o=e(r.background||['<div class="'+i+"-loading "+i+'">','<div class="'+i+'-content">','<button class="'+i+"-close-icon "+r.namespace+'-close" aria-label="Close">',r.closeIcon,"</button>",'<div class="'+r.namespace+'-inner">'+r.loading+"</div>","</div>","</div>"].join("")),s="."+r.namespace+"-close"+(r.otherClose?","+r.otherClose:"");return r.$instance=o.clone().addClass(r.variant),r.$instance.on(r.closeTrigger+"."+r.namespace,function(t){var n=e(t.target);("background"===r.closeOnClick&&n.is("."+r.namespace)||"anywhere"===r.closeOnClick||n.closest(s).length)&&(r.close(t),t.preventDefault())}),this},getContent:function(){if(this.persist!==!1&&this.$content)return this.$content;var t=this,n=this.constructor.contentFilters,r=function(e){return t.$currentTarget&&t.$currentTarget.attr(e)},i=r(t.targetAttr),o=t.target||i||"",s=n[t.type];if(!s&&o in n&&(s=n[o],o=t.target&&i),o=o||r("href")||"",!s)for(var a in n)t[a]&&(s=n[a],o=t[a]);if(!s){var c=o;if(o=null,e.each(t.contentFilters,function(){return s=n[this],s.test&&(o=s.test(c)),!o&&s.regex&&c.match&&c.match(s.regex)&&(o=c),!o}),!o)return"console"in window&&window.console.error("Featherlight: no content filter found "+(c?' for "'+c+'"':" (no target specified)")),!1}return s.process.call(t,o)},setContent:function(t){var n=this;return t.is("iframe")&&n.$instance.addClass(n.namespace+"-iframe"),n.$instance.removeClass(n.namespace+"-loading"),n.$instance.find("."+n.namespace+"-inner").not(t).slice(1).remove().end().replaceWith(e.contains(n.$instance[0],t[0])?"":t),n.$content=t.addClass(n.namespace+"-inner"),n},open:function(t){var n=this;if(n.$instance.hide().appendTo(n.root),!(t&&t.isDefaultPrevented()||n.beforeOpen(t)===!1)){t&&t.preventDefault();var r=n.getContent();if(r)return i.push(n),u(!0),n.$instance.fadeIn(n.openSpeed),n.beforeContent(t),e.when(r).always(function(e){n.setContent(e),n.afterContent(t)}).then(n.$instance.promise()).done(function(){n.afterOpen(t)})}return n.$instance.detach(),e.Deferred().reject().promise()},close:function(t){var n=this,r=e.Deferred();return n.beforeClose(t)===!1?r.reject():(0===o(n).length&&u(!1),n.$instance.fadeOut(n.closeSpeed,function(){n.$instance.detach(),n.afterClose(t),r.resolve()})),r.promise()},resize:function(e,t){if(e&&t){this.$content.css("width","").css("height","");var n=Math.max(e/(parseInt(this.$content.parent().css("width"),10)-1),t/(parseInt(this.$content.parent().css("height"),10)-1));n>1&&(n=t/Math.floor(t/n),this.$content.css("width",""+e/n+"px").css("height",""+t/n+"px"))}},chainCallbacks:function(t){for(var n in t)this[n]=e.proxy(t[n],this,e.proxy(this[n],this))}},e.extend(t,{id:0,autoBind:"[data-featherlight]",defaults:t.prototype,contentFilters:{jquery:{regex:/^[#.]\w/,test:function(t){return t instanceof e&&t},process:function(t){return this.persist!==!1?e(t):e(t).clone(!0)}},image:{regex:/\.(png|jpg|jpeg|gif|tiff|bmp|svg)(\?\S*)?$/i,process:function(t){var n=this,r=e.Deferred(),i=new Image,o=e('<img src="'+t+'" alt="" class="'+n.namespace+'-image" />');return i.onload=function(){o.naturalWidth=i.width,o.naturalHeight=i.height,r.resolve(o)},i.onerror=function(){r.reject(o)},i.src=t,r.promise()}},html:{regex:/^\s*<[\w!][^<]*>/,process:function(t){return e(t)}},ajax:{regex:/./,process:function(t){var n=e.Deferred(),r=e("<div></div>").load(t,function(e,t){"error"!==t&&n.resolve(r.contents()),n.fail()});return n.promise()}},iframe:{process:function(t){var i=new e.Deferred,o=e("<iframe/>"),a=r(this,"iframe"),c=n(a,s);return o.hide().attr("src",t).attr(c).css(a).on("load",function(){i.resolve(o.show())}).appendTo(this.$instance.find("."+this.namespace+"-content")),i.promise()}},text:{process:function(t){return e("<div>",{text:t})}}},functionAttributes:["beforeOpen","afterOpen","beforeContent","afterContent","beforeClose","afterClose"],readElementConfig:function(t,n){var r=this,i=new RegExp("^data-"+n+"-(.*)"),o={};return t&&t.attributes&&e.each(t.attributes,function(){var t=this.name.match(i);if(t){var n=this.value,s=e.camelCase(t[1]);if(e.inArray(s,r.functionAttributes)>=0)n=new Function(n);else try{n=JSON.parse(n)}catch(a){}o[s]=n}}),o},extend:function(t,n){var r=function(){this.constructor=t};return r.prototype=this.prototype,t.prototype=new r,t.__super__=this.prototype,e.extend(t,this,n),t.defaults=t.prototype,t},attach:function(t,n,r){var i=this;"object"!=typeof n||n instanceof e!=!1||r||(r=n,n=void 0),r=e.extend({},r);var o,s=r.namespace||i.defaults.namespace,a=e.extend({},i.defaults,i.readElementConfig(t[0],s),r),c=function(s){var c=e.extend({$source:t,$currentTarget:e(this)},i.readElementConfig(t[0],a.namespace),i.readElementConfig(this,a.namespace),r),u=o||e(this).data("featherlight-persisted")||new i(n,c);"shared"===u.persist?o=u:u.persist!==!1&&e(this).data("featherlight-persisted",u),c.$currentTarget.blur(),u.open(s)};return t.on(a.openTrigger+"."+a.namespace,a.filter,c),c},current:function(){var e=this.opened();return e[e.length-1]||null},opened:function(){var t=this;return o(),e.grep(i,function(e){return e instanceof t})},close:function(e){var t=this.current();if(t)return t.close(e)},_onReady:function(){var t=this;t.autoBind&&(e(t.autoBind).each(function(){t.attach(e(this))}),e(document).on("click",t.autoBind,function(n){if(!n.isDefaultPrevented()){var r=t.attach(e(n.currentTarget));r(n)}}))},_callbackChain:{onKeyUp:function(t,n){return 27===n.keyCode?(this.closeOnEsc&&e.featherlight.close(n),!1):t(n)},beforeOpen:function(t,n){return this._previouslyActive=document.activeElement,this._$previouslyTabbable=e("a, input, select, textarea, iframe, button, iframe, [contentEditable=true]").not("[tabindex]").not(this.$instance.find("button")),this._$previouslyWithTabIndex=e("[tabindex]").not('[tabindex="-1"]'),this._previousWithTabIndices=this._$previouslyWithTabIndex.map(function(t,n){return e(n).attr("tabindex")}),this._$previouslyWithTabIndex.add(this._$previouslyTabbable).attr("tabindex",-1),document.activeElement.blur(),t(n)},afterClose:function(t,n){var r=t(n),i=this;return this._$previouslyTabbable.removeAttr("tabindex"),this._$previouslyWithTabIndex.each(function(t,n){e(n).attr("tabindex",i._previousWithTabIndices[t])}),this._previouslyActive.focus(),r},onResize:function(e,t){return this.resize(this.$content.naturalWidth,this.$content.naturalHeight),e(t)},afterContent:function(e,t){var n=e(t);return this.$instance.find("[autofocus]:not([disabled])").focus(),this.onResize(t),n}}}),e.featherlight=t,e.fn.featherlight=function(e,n){return t.attach(this,e,n),this},e(document).ready(function(){t._onReady()})}(jQuery),function(e,t){if("object"==typeof exports&&exports)t(exports);else{var n={};t(n),"function"==typeof define&&define.amd?define(n):e.Mustache=n}}(this,function(e){function t(e,t){return y.call(e,t)}function n(e){return!t(g,e)}function r(e){return"function"==typeof e}function i(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function o(e){return String(e).replace(/[&<>"'\/]/g,function(e){return x[e]})}function s(e){if(!$(e)||2!==e.length)throw new Error("Invalid tags: "+e);return[new RegExp(i(e[0])+"\\s*"),new RegExp("\\s*"+i(e[1]))]}function a(t,r){function o(){if(E&&!_)for(;T.length;)delete k[T.pop()];else T=[];E=!1,_=!1}r=r||e.tags,t=t||"","string"==typeof r&&(r=r.split(d));for(var a,f,p,g,y,w,$=s(r),x=new l(t),C=[],k=[],T=[],E=!1,_=!1;!x.eos();){if(a=x.pos,p=x.scanUntil($[0]))for(var j=0,O=p.length;j<O;++j)g=p.charAt(j),n(g)?T.push(k.length):_=!0,k.push(["text",g,a,a+1]),a+=1,"\n"===g&&o();if(!x.scan($[0]))break;if(E=!0,f=x.scan(b)||"name",x.scan(h),"="===f?(p=x.scanUntil(v),x.scan(v),x.scanUntil($[1])):"{"===f?(p=x.scanUntil(new RegExp("\\s*"+i("}"+r[1]))),x.scan(m),x.scanUntil($[1]),f="&"):p=x.scanUntil($[1]),!x.scan($[1]))throw new Error("Unclosed tag at "+x.pos);if(y=[f,p,a,x.pos],k.push(y),"#"===f||"^"===f)C.push(y);else if("/"===f){if(w=C.pop(),!w)throw new Error('Unopened section "'+p+'" at '+a);if(w[1]!==p)throw new Error('Unclosed section "'+w[1]+'" at '+a)}else"name"===f||"{"===f||"&"===f?_=!0:"="===f&&($=s(r=p.split(d)))}if(w=C.pop())throw new Error('Unclosed section "'+w[1]+'" at '+x.pos);return u(c(k))}function c(e){for(var t,n,r=[],i=0,o=e.length;i<o;++i)t=e[i],t&&("text"===t[0]&&n&&"text"===n[0]?(n[1]+=t[1],n[3]=t[3]):(r.push(t),n=t));return r}function u(e){for(var t,n,r=[],i=r,o=[],s=0,a=e.length;s<a;++s)switch(t=e[s],t[0]){case"#":case"^":i.push(t),o.push(t),i=t[4]=[];break;case"/":n=o.pop(),n[5]=t[2],i=o.length>0?o[o.length-1][4]:r;break;default:i.push(t)}return r}function l(e){this.string=e,this.tail=e,this.pos=0}function f(e,t){this.view=null==e?{}:e,this.cache={".":this.view},this.parent=t}function p(){this.cache={}}var h=/\s*/,d=/\s+/,g=/\S/,v=/\s*=/,m=/\s*\}/,b=/#|\^|\/|>|\{|&|=|!/,y=RegExp.prototype.test,w=Object.prototype.toString,$=Array.isArray||function(e){return"[object Array]"===w.call(e)},x={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};l.prototype.eos=function(){return""===this.tail},l.prototype.scan=function(e){var t=this.tail.match(e);if(t&&0===t.index){var n=t[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n}return""},l.prototype.scanUntil=function(e){var t,n=this.tail.search(e);switch(n){case-1:t=this.tail,this.tail="";break;case 0:t="";break;default:t=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=t.length,t},f.prototype.push=function(e){return new f(e,this)},f.prototype.lookup=function(e){var t;if(e in this.cache)t=this.cache[e];else{for(var n=this;n;){if(e.indexOf(".")>0){t=n.view;for(var i=e.split("."),o=0;null!=t&&o<i.length;)t=t[i[o++]]}else t=n.view[e];if(null!=t)break;n=n.parent}this.cache[e]=t}return r(t)&&(t=t.call(this.view)),t},p.prototype.clearCache=function(){this.cache={}},p.prototype.parse=function(e,t){var n=this.cache,r=n[e];return null==r&&(r=n[e]=a(e,t)),r},p.prototype.render=function(e,t,n){var r=this.parse(e),i=t instanceof f?t:new f(t);return this.renderTokens(r,i,n,e)},p.prototype.renderTokens=function(t,n,i,o){function s(e){return l.render(e,n,i)}for(var a,c,u="",l=this,f=0,p=t.length;f<p;++f)switch(a=t[f],a[0]){case"#":if(c=n.lookup(a[1]),!c)continue;if($(c))for(var h=0,d=c.length;h<d;++h)u+=this.renderTokens(a[4],n.push(c[h]),i,o);else if("object"==typeof c||"string"==typeof c)u+=this.renderTokens(a[4],n.push(c),i,o);else if(r(c)){if("string"!=typeof o)throw new Error("Cannot use higher-order sections without the original template");c=c.call(n.view,o.slice(a[3],a[5]),s),null!=c&&(u+=c)}else u+=this.renderTokens(a[4],n,i,o);break;case"^":c=n.lookup(a[1]),(!c||$(c)&&0===c.length)&&(u+=this.renderTokens(a[4],n,i,o));break;case">":if(!i)continue;c=r(i)?i(a[1]):i[a[1]],null!=c&&(u+=this.renderTokens(this.parse(c),n,i,c));break;case"&":c=n.lookup(a[1]),null!=c&&(u+=c);break;case"name":c=n.lookup(a[1]),null!=c&&(u+=e.escape(c));break;case"text":u+=a[1]}return u},e.name="mustache.js",e.version="0.8.1",e.tags=["{{","}}"];var C=new p;e.clearCache=function(){return C.clearCache()},e.parse=function(e,t){return C.parse(e,t)},e.render=function(e,t,n){return C.render(e,t,n)},e.to_html=function(t,n,i,o){var s=e.render(t,n,i);return r(o)?void o(s):s},e.escape=o,e.Scanner=l,e.Context=f,e.Writer=p});var caffees,intro=document.getElementById("intro"),output=document.getElementById("content-wrapper");$(document).ready(function(){geoFindMe(),$(window).width()>768&&($("#cup1").addClass("cup1-animation"),$("#cup2").addClass("cup2-animation"),$("#intro").addClass("intro-animation"))}),$("#sort-criteria").change(function(){console.log("Promenjeno je u "+$(this).val());var e=$(this).val();sortCoffees(e)});