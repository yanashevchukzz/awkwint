buddhaCrosssell.loadScripts=function(jQueryBuddha) {
var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},formatMoney=function(e,s){function t(e,s){return void 0===e?s:e}function l(e,s,l,a){if(s=t(s,2),l=t(l,","),a=t(a,"."),isNaN(e)||null==e)return 0;e=(e/100).toFixed(s);var d=e.split(".");return d[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1"+l)+(d[1]?a+d[1]:"")}"string"==typeof e&&(e=e.replace(".",""));var a="",d=/\{\{\s*(\w+)\s*\}\}/,r=s;switch(r.match(d)[1]){case"amount":a=l(e,2);break;case"amount_no_decimals":a=l(e,0);break;case"amount_with_comma_separator":a=l(e,2,".",",");break;case"amount_no_decimals_with_comma_separator":a=l(e,0,".",",")}return r.replace(d,a)},getHandleIndexInDb=function(e){var s=-1;for(var t in buddhaCrosssell.alsoBoughtDb)if(buddhaCrosssell.alsoBoughtDb.hasOwnProperty(t)&&buddhaCrosssell.alsoBoughtDb[t][0]==e){s=t;break}return s},debounce=function(e,s){var t;return function(){clearTimeout(t),t=setTimeout(e,s)}},getWidgetVariantInfo=function(e){var s=".bcsell-item-"+e,t=buddhaCrosssell.widgets[e].variants,l=jQueryBuddha(s+" #bcsell-select-1 :selected").attr("value"),a=jQueryBuddha(s+" #bcsell-select-2 :selected").attr("value"),d=jQueryBuddha(s+" #bcsell-select-3 :selected").attr("value"),r=null;return void 0!==t[l]&&void 0!==t[l][a]&&void 0!==t[l][a][d]?r=t[l][a][d]:void 0!==t[l]&&void 0!==t[l][a]?r=t[l][a]:void 0!==t[l]&&(r=t[l]),r},getSchemaValue=function(e){var s,t=buddhaCrosssell.schema[e];if(void 0!==t)s=t;else switch(e){case"abWidgetTitle":s="People who bought this product, also bought";break;case"enableAlsoBoughtStars":case"enableCustomWidget":s=!1}return s};buddhaCrosssell.buildWidgets=function(){var e=getHandleIndexInDb(buddhaCrosssell.productHandle);if(-1!=e)for(var s=buddhaCrosssell.alsoBoughtDb[e],t=1;t<s.length;t++)buddhaCrosssell.productHandles.push(buddhaCrosssell.alsoBoughtDb[s[t]][0]);buddhaCrosssell.productHandles=buddhaCrosssell.productHandles.concat(buddhaCrosssell.productsFromCollection.concat(buddhaCrosssell.randomProducts)),buddhaCrosssell.productHandles=buddhaCrosssell.productHandles.filter(function(e,s){return buddhaCrosssell.productHandles.indexOf(e)==s}),jQueryBuddha(".bcsell-ab-widget-title").html(getSchemaValue("abWidgetTitle"));for(var t=1;t<=3;t++)jQueryBuddha(".bcsell-item").last().clone().appendTo(".bcsell-list");jQueryBuddha("#buddha-crosssell").removeClass("bcsell-hidden"),getSchemaValue("enableAlsoBoughtStars")&&jQueryBuddha(".bcsell-product-rating-stars").removeClass("bcsell-hidden"),window.navigator.userAgent.indexOf("Edge/")>-1&&jQueryBuddha("head").append("<style>         #buddha-crosssell .bcsell-list {           transform: initial !important;         }     </style"),0==buddhaCrosssell.zoomAnimation&&jQueryBuddha("head").append("<style>          #buddha-crosssell .bcsell-item .bcsell-img a img {              transform: translateY(-50%) scale(1) !important;          }      </style>");var l=jQueryBuddha(".bcsell-item"),a=0;for(t=0;t<4&&(jQueryBuddha(l[t]).addClass("bcsell-item-"+t),void 0!==buddhaCrosssell.productHandles[0]);t++)!function(e){jQueryBuddha.ajax({dataType:"json",url:"/products/"+buddhaCrosssell.productHandles[0]+".js",success:function(s){a++,buddhaCrosssell.loadProductOnWidget(s,e),4==a&&buddhaCrosssell.widgetsLoadedFailsafe()},error:function(){4==++a&&buddhaCrosssell.widgetsLoadedFailsafe()}}),buddhaCrosssell.productHandles.splice(0,1)}(t)},buddhaCrosssell.widgetsLoadedFailsafe=function(){for(var e=0,s=jQueryBuddha('.bcsell-item img[src=""]').length,t=0;t<4;t++)if(jQueryBuddha(".bcsell-item-"+t+' .bcsell-img img[src=""]').length>0){if(void 0===buddhaCrosssell.productHandles[0]){s=0;break}!function(t){jQueryBuddha.ajax({dataType:"json",url:"/products/"+buddhaCrosssell.productHandles[0]+".js",success:function(l){e++,buddhaCrosssell.loadProductOnWidget(l,t),e==s&&(0==buddhaCrosssell.showOutOfStockProducts?buddhaCrosssell.outOfStockProductsCheck():(void 0!==buddhaCrosssell.themeFixesAfter&&buddhaCrosssell.themeFixesAfter(),void 0!==buddhaCrosssell.customerFixesAfter&&buddhaCrosssell.customerFixesAfter()))},error:function(){++e==s&&(0==buddhaCrosssell.showOutOfStockProducts?buddhaCrosssell.outOfStockProductsCheck():(void 0!==buddhaCrosssell.themeFixesAfter&&buddhaCrosssell.themeFixesAfter(),void 0!==buddhaCrosssell.customerFixesAfter&&buddhaCrosssell.customerFixesAfter()))}}),buddhaCrosssell.productHandles.splice(0,1)}(t)}0==s&&(0==buddhaCrosssell.showOutOfStockProducts?buddhaCrosssell.outOfStockProductsCheck():(void 0!==buddhaCrosssell.themeFixesAfter&&buddhaCrosssell.themeFixesAfter(),void 0!==buddhaCrosssell.customerFixesAfter&&buddhaCrosssell.customerFixesAfter()))},buddhaCrosssell.outOfStockProductsCheck=function(){for(var e=0,s=jQueryBuddha(".bcsell-item[out-of-stock]").length,t=0;t<4;t++)if(jQueryBuddha(".bcsell-item-"+t+"[out-of-stock]").length>0){if(void 0===buddhaCrosssell.randomProducts[0]){s=0;break}!function(t){jQueryBuddha.ajax({dataType:"json",url:"/products/"+buddhaCrosssell.randomProducts[0]+".js",success:function(l){e++,buddhaCrosssell.loadProductOnWidget(l,t),e==s&&(void 0!==buddhaCrosssell.themeFixesAfter&&buddhaCrosssell.themeFixesAfter(),void 0!==buddhaCrosssell.customerFixesAfter&&buddhaCrosssell.customerFixesAfter())},error:function(){++e==s&&(void 0!==buddhaCrosssell.themeFixesAfter&&buddhaCrosssell.themeFixesAfter(),void 0!==buddhaCrosssell.customerFixesAfter&&buddhaCrosssell.customerFixesAfter())}}),buddhaCrosssell.randomProducts.splice(0,1)}(t)}0==s&&(void 0!==buddhaCrosssell.themeFixesAfter&&buddhaCrosssell.themeFixesAfter(),void 0!==buddhaCrosssell.customerFixesAfter&&buddhaCrosssell.customerFixesAfter())},buddhaCrosssell.loadProductOnWidget=function(e,s){var t=e.price,l=e.compare_at_price,a=".bcsell-item-"+s,d=e.images.length;l>e.compare_at_price_max?l=e.compare_at_price_max:l<e.compare_at_price_min&&(l=e.compare_at_price_min),0==buddhaCrosssell.slideAnimation&&(d=1);for(var r=0;r<d-1;r++)jQueryBuddha(a+" .bcsell-img img").last().clone().appendTo(a+" .bcsell-img a");for(var r=0;r<d;r++){var i=e.images[r],o={".jpg":"_"+buddhaCrosssell.imageResolution+".jpg",".JPG":"_"+buddhaCrosssell.imageResolution+".JPG",".png":"_"+buddhaCrosssell.imageResolution+".png",".PNG":"_"+buddhaCrosssell.imageResolution+".PNG"};for(key in o){var u=i.lastIndexOf(key);-1!=u&&(i=i.substring(0,u)+o[key]+i.substring(u+key.length))}jQueryBuddha(a+" .bcsell-img img:nth-child("+(r+1)+")").attr("src",i)}d>1&&setInterval(function(){var e=jQueryBuddha(a+" .bcsell-img img.bcsell-show");if(1==e.length){var s=e.next();0==s.length&&(s=e.parent().children().first()),jQueryBuddha(a+" .bcsell-img img.bcsell-hide").removeClass("bcsell-hide"),s.addClass("bcsell-show"),e.removeClass("bcsell-show").addClass("bcsell-hide")}},10300),jQueryBuddha(a+" .bcsell-img img").first().on("load",function(e){setTimeout(function(){jQueryBuddha(e.target).addClass("bcsell-show")},200)}),setTimeout(function(){0==jQueryBuddha(a+" .bcsell-img img.bcsell-show").length&&jQueryBuddha(a+" .bcsell-img img").addClass("bcsell-show")},3e3),t=formatMoney(t,buddhaCrosssell.moneyFormat),jQueryBuddha(a+" .bcsell-img > a").attr("href",e.url),jQueryBuddha(a+" .bcsell-panel .bcsell-product-name").attr("href",e.url),jQueryBuddha(a+" .bcsell-product-name").html(e.title),jQueryBuddha(a+" .bcsell-product-price").html(t),jQueryBuddha(a+" .bcsell-product-price-panel").html(t),l&&l>0&&(l=formatMoney(l,buddhaCrosssell.moneyFormat))>t&&(jQueryBuddha(a+" .bcsell-product-price-old").html(l),jQueryBuddha(a+" .bcsell-product-price-old-panel").html(l)),getSchemaValue("enableAlsoBoughtStars")&&buddhaCrosssell.refreshProductReviewRating(s,Shopify.shop,e.id),buddhaCrosssell.widgets[s]={},buddhaCrosssell.widgets[s].variants={};for(var n=buddhaCrosssell.widgets[s].variants,h=!1,r=0;r<e.variants.length;r++)if(e.variants[r].available){h=!0;var c=[e.variants[r].option1,e.variants[r].option2,e.variants[r].option3],b=[e.variants[r].id,e.variants[r].price,e.variants[r].compare_at_price];null!=c[0]&&void 0===n[c[0]]&&(n[e.variants[r].option1]=1==e.options.length?b:{}),null!=c[1]&&void 0===n[c[0]][c[1]]&&(n[c[0]][c[1]]=2==e.options.length?b:{}),null!=c[2]&&void 0===n[c[0]][c[1]][c[2]]&&(n[c[0]][c[1]][c[2]]=3==e.options.length?b:{})}for(var r=1;r<=e.options.length;r++){buddhaCrosssell.refreshVariants(s,r);var m=e.options[r-1].name.toLowerCase();jQueryBuddha(a+" .bcsell-variant-"+r+" .bcsell-select-label").html(m),jQueryBuddha(a+" #bcsell-select-"+r+" option").length>0&&("title"!=m||!jQueryBuddha(a+" #bcsell-select-"+r+' option[value="Default Title"]'))&&(jQueryBuddha(a+" .bcsell-variant-"+r).removeClass("bcsell-hidden"),jQueryBuddha(a+" #bcsell-select-"+r).on("change",{widgetIndex:s,selectLevel:r},function(s){for(k=s.data.selectLevel+1;k<=e.options.length;k++)buddhaCrosssell.refreshVariants(s.data.widgetIndex,k);buddhaCrosssell.refreshPrice(s.data.widgetIndex)}))}buddhaCrosssell.refreshPrice(s),jQueryBuddha(a+" .bcsell-add-to-cart > a").on("click touchend",{widgetIndex:s,hasStock:h},function(e){return"idle"!=buddhaCrosssell.touchState&&"tap"!=buddhaCrosssell.touchState||(e.data.hasStock||0==buddhaCrosssell.showOutOfStockProducts?buddhaCrosssell.addToCart(e.data.widgetIndex):window.location.href=jQueryBuddha(a+" .bcsell-img > a").attr("href")),!1}),h||(buddhaCrosssell.showOutOfStockProducts?jQueryBuddha(a+" .bcsell-add-to-cart > a").html("View product"):jQueryBuddha(a).attr("out-of-stock",!0));var f=jQueryBuddha(a+" .bcsell-panel").height()-2;jQueryBuddha("head").append("<style>        #buddha-crosssell "+a+".bcsell-hover .bcsell-panel {          transform: translateY(-"+f+"px) !important;        }    </style"),jQueryBuddha(a).tilt({glare:!0,maxGlare:.1,scale:1.1,maxTilt:1.5,perspective:100})},buddhaCrosssell.addEvents=function(){jQueryBuddha(document).on("touchstart",function(e){jQueryBuddha(e.target).parents("#buddha-crosssell .bcsell-item").length>0&&(buddhaCrosssell.ignoreTiltEvent=!0,buddhaCrosssell.touchState="tap",setTimeout(function(){"tap"==buddhaCrosssell.touchState&&(buddhaCrosssell.touchState="touch")},250))}),jQueryBuddha(document).on("touchend",function(e){var s=jQueryBuddha(e.target);s.parents("#buddha-crosssell .bcsell-list").length>0?(s.parents(".bcsell-img").length>0&&0==s.parents(".bcsell-item.bcsell-hover").length&&e.preventDefault(),bcsellItem=s.closest(".bcsell-item"),bcsellItem&&"tap"==buddhaCrosssell.touchState&&(jQueryBuddha(".bcsell-hover").removeClass("bcsell-hover").removeClass("bcsell-zoom"),jQueryBuddha(bcsellItem).addClass("bcsell-hover"),jQueryBuddha(bcsellItem).addClass("bcsell-zoom"),jQueryBuddha(bcsellItem).addClass("bcsell-transform-anim"))):jQueryBuddha(".bcsell-hover").removeClass("bcsell-hover").removeClass("bcsell-zoom"),buddhaCrosssell.touchState="idle",setTimeout(function(){"idle"==buddhaCrosssell.touchState&&(buddhaCrosssell.ignoreTiltEvent=!1)},200)}),jQueryBuddha(".bcsell-item").on("mouseenter",function(){jQueryBuddha(this).addClass("bcsell-hover")}),jQueryBuddha(".bcsell-item").on("mouseleave",function(e){var s=document.elementFromPoint(e.clientX,e.clientY);if(null==s||jQueryBuddha(s).parents(".bcsell-item.bcsell-hover").length)return buddhaCrosssell.ignoreTiltEvent=!0,void setTimeout(function(){buddhaCrosssell.ignoreTiltEvent=!1},50);jQueryBuddha(".bcsell-hover").removeClass("bcsell-hover").removeClass("bcsell-zoom")}),jQueryBuddha(window).on("scroll",debounce(function(){var e=jQueryBuddha("#buddha-crosssell");jQueryBuddha(window).scrollTop()+jQueryBuddha(window).height()-200>e.position().top&&e.addClass("bcsell-fade")},200)),jQueryBuddha(window).on("resize",debounce(function(){buddhaCrosssell.adjustWidgetStyle()},200))},buddhaCrosssell.adjustWidgetStyle=function(){var e=jQueryBuddha("#buddha-crosssell").width(),s="";if(e<900)s="      #buddha-crosssell .bcsell-item {width:230px !important; }       #buddha-crosssell .bcsell-list {padding: 0 10% !important;}       ";else if(e<1180){var t=(e-120)/4-1,l=t/230*320;s="        #buddha-crosssell .bcsell-item {width: "+t+"px !important; height: "+l+"px !important; margin: 20px 20px !important;}         #buddha-crosssell .bcsell-item-0 {margin-left: 0px !important;}         #buddha-crosssell .bcsell-item-3 {margin-right: 0px !important;}     "}else e<1440&&(s="#buddha-crosssell .bcsell-item {width:230px !important; }");jQueryBuddha("#bcsellResizeStyle").remove(),jQueryBuddha("head").append('<style id="bcsellResizeStyle">'+s+"</style")},buddhaCrosssell.refreshProductReviewRating=function(e,s,t){var l=".bcsell-item-"+e,a={product_id:t,shop:s,version:"v4"};buddhaCrosssell.productsReviewInstalled?jQueryBuddha.ajax({url:"//productreviews.shopifycdn.com/proxy/v4/reviews/product",data:a,dataType:"jsonp",timeout:2e3,success:function(e){var s=e.product.match(/meta itemprop=\"ratingValue\" content=\"(.*)\"/);if(s&&s[1]){var t=parseFloat(s[1]);if(!isNaN(t)){var a=t/5*100;jQueryBuddha(l+" .bcsell-front-stars").attr("style","width: "+a+'%;"')}}},error:function(){jQueryBuddha(l+" .bcsell-front-stars").attr("style","width: 0;")}}):jQueryBuddha(l+" .bcsell-front-stars").attr("style","width: 0;")},buddhaCrosssell.refreshVariants=function(e,s){var t=".bcsell-item-"+e,l=buddhaCrosssell.widgets[e].variants,a=[];switch(s){case 1:a=Object.keys(l);break;case 2:var d=jQueryBuddha(t+" #bcsell-select-1 :selected").attr("value");void 0!==l[d]&&(a=Object.keys(l[d]));break;case 3:var d=jQueryBuddha(t+" #bcsell-select-1 :selected").attr("value"),r=jQueryBuddha(t+" #bcsell-select-2 :selected").attr("value");void 0!==l[d]&&void 0!==l[d][r]&&(a=Object.keys(l[d][r]))}a.sort(function(e,s){return e-s}),jQueryBuddha(t+" #bcsell-select-"+s).empty();for(var i=0;i<a.length;i++)jQueryBuddha(t+" #bcsell-select-"+s).append('<option value="'+a[i]+'">'+a[i]+"</option>")},buddhaCrosssell.refreshPrice=function(e){var s=".bcsell-item-"+e,t=getWidgetVariantInfo(e);if(null!=t){var l=formatMoney(t[1],buddhaCrosssell.moneyFormat);if(jQueryBuddha(s+" .bcsell-product-price-panel").html(l),null!=t[2]&&t[2]>0){var a=formatMoney(t[2],buddhaCrosssell.moneyFormat);a>l&&jQueryBuddha(s+" .bcsell-product-price-old-panel").html(a)}}},buddhaCrosssell.scrollToWidgets=function(){var e=window.location.hash;"#buddha-crosssell-hash"!=e&&"#buddha-crosssell-hash-show-widget"!=e||jQueryBuddha(window).on("load",function(){setTimeout(function(){if(jQueryBuddha(window).scrollTop()<500){var s=jQueryBuddha("#buddha-crosssell").offset().top;jQueryBuddha("html, body").animate({scrollTop:s},1500),setTimeout(function(){"#buddha-crosssell-hash-show-widget"==e&&jQueryBuddha(".bcsell-item-0").addClass("bcsell-hover");var t=jQueryBuddha("#buddha-crosssell").offset().top;(t-s<=-50||t-s>=50)&&jQueryBuddha("html, body").animate({scrollTop:t},500)},1300)}else"#buddha-crosssell-hash-show-widget"==e&&jQueryBuddha(".bcsell-item-0").addClass("bcsell-hover")},300)})},buddhaCrosssell.addToCart=function(e){var s=getWidgetVariantInfo(e);null!=s&&jQueryBuddha.ajax({type:"POST",url:"/cart/add.js",data:{quantity:1,id:s[0]},success:function(e){location.href=buddhaCrosssell.shopUrl+"/cart"},error:function(e,s,t){location.href=buddhaCrosssell.shopUrl+"/cart"}})},buddhaCrosssell.load=function(){buddhaCrosssell.imageResolution="300x",buddhaCrosssell.zoomAnimation=!0,buddhaCrosssell.slideAnimation=!0,buddhaCrosssell.showOutOfStockProducts=!0,buddhaCrosssell.productHandles=[],void 0!==buddhaCrosssell.themeFixesBefore&&buddhaCrosssell.themeFixesBefore(),void 0!==buddhaCrosssell.customerFixesBefore&&buddhaCrosssell.customerFixesBefore(),buddhaCrosssell.widgets=[],buddhaCrosssell.touchState="idle",buddhaCrosssell.ignoreTiltEvent=!1,buddhaCrosssell.buildWidgets(),buddhaCrosssell.adjustWidgetStyle(),buddhaCrosssell.addEvents(),buddhaCrosssell.scrollToWidgets()},buddhaCrosssell.initApp=function(){function e(){0==--t&&(jQueryBuddha.ajaxSetup({cache:!1}),buddhaCrosssell.load())}var s=!1;if(buddhaCrosssell.productsReviewInstalled=!1,jQueryBuddha("script").each(function(){-1!=jQueryBuddha(this).text().indexOf("asyncLoad")&&(-1!=jQueryBuddha(this).text().indexOf("crosssell-init.js?")&&(s=!0),-1!=jQueryBuddha(this).text().indexOf("productreviews.shopifycdn.com")&&(buddhaCrosssell.productsReviewInstalled=!0))}),0!=s){var t=0;if(void 0!==buddhaCrosssell.loadDbScripts){buddhaCrosssell.alsoBoughtDb=[],t=buddhaCrosssell.loadDbScripts.length,jQueryBuddha.ajaxSetup({cache:!0});for(var l=0;l<t;l++)jQueryBuddha.getScript(buddhaCrosssell.loadDbScripts[l],e)}else buddhaCrosssell.load()}},function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"===("undefined"==typeof module?"undefined":_typeof(module))&&module.exports?module.exports=function(s,t){return void 0===t&&(t="undefined"!=typeof window?require("jquery"):require("jquery")(s)),e(t),t}:e(jQueryBuddha)}(function(e){return e.fn.tilt=function(s){var t=function(){this.ticking||(requestAnimationFrame(n.bind(this)),this.ticking=!0)},l=function(){var s=this;e(this).on("mousemove",i),e(this).on("mouseenter",d),this.settings.reset&&e(this).on("mouseleave",o),this.settings.glare&&e(window).on("resize",c.bind(s))},a=function(){var s=this;void 0!==this.timeout&&clearTimeout(this.timeout),e(this).css({transition:this.settings.speed+"ms "+this.settings.easing}),this.settings.glare&&this.glareElement.css({transition:"opacity "+this.settings.speed+"ms "+this.settings.easing}),this.timeout=setTimeout(function(){e(s).css({transition:""}),s.settings.glare&&s.glareElement.css({transition:""})},this.settings.speed)},d=function(s){buddhaCrosssell.ignoreTiltEvent||(this.ticking=!1,e(this).css({"will-change":"transform"}),a.call(this),e(this).trigger("tilt.mouseEnter"))},r=function(s){return void 0===s&&(s={pageX:e(this).offset().left+e(this).outerWidth()/2,pageY:e(this).offset().top+e(this).outerHeight()/2}),{x:s.pageX,y:s.pageY}},i=function(e){buddhaCrosssell.ignoreTiltEvent||(this.mousePositions=r(e),t.call(this))},o=function(){buddhaCrosssell.ignoreTiltEvent||(a.call(this),this.reset=!0,t.call(this),e(this).trigger("tilt.mouseLeave"))},u=function(){var s=e(this).outerWidth(),t=e(this).outerHeight(),l=e(this).offset().left,a=e(this).offset().top,d=(this.mousePositions.x-l)/s,r=(this.mousePositions.y-a)/t;return{tiltX:(this.settings.maxTilt/2-d*this.settings.maxTilt).toFixed(2),tiltY:(r*this.settings.maxTilt-this.settings.maxTilt/2).toFixed(2),percentageX:100*d,percentageY:100*r,angle:Math.atan2(this.mousePositions.x-(l+s/2),-(this.mousePositions.y-(a+t/2)))*(180/Math.PI)}},n=function(){if(this.transforms=u.call(this),this.reset)return this.reset=!1,e(this).css("transform","perspective("+this.settings.perspective+"px) rotateX(0deg) rotateY(0deg)"),void(this.settings.glare&&(this.glareElement.css("transform","rotate(180deg) translate(-50%, -50%)"),this.glareElement.css("opacity","0")));e(this).css("transform","perspective("+this.settings.perspective+"px) rotateX("+("x"===this.settings.disableAxis?0:this.transforms.tiltY)+"deg) rotateY("+("y"===this.settings.disableAxis?0:this.transforms.tiltX)+"deg) scale3d("+this.settings.scale+","+this.settings.scale+","+this.settings.scale+")"),this.settings.glare&&(this.glareElement.css("transform","rotate("+this.transforms.angle+"deg) translate(-50%, -50%)"),this.glareElement.css("opacity",""+this.transforms.percentageY*this.settings.maxGlare/100)),e(this).trigger("change",[this.transforms]),this.ticking=!1},h=function(){var s=this.settings.glarePrerender;if(s||e(this).append('<div class="js-tilt-glare"><div class="js-tilt-glare-inner"></div></div>'),this.glareElementWrapper=e(this).find(".js-tilt-glare"),this.glareElement=e(this).find(".js-tilt-glare-inner"),!s){var t={position:"absolute",top:"0",left:"0",width:"100%",height:"100%"};this.glareElementWrapper.css(t).css({overflow:"hidden","pointer-events":"none"}),this.glareElement.css({position:"absolute",top:"50%",left:"50%","background-image":"linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",width:""+2*e(this).outerWidth(),height:""+2*e(this).outerWidth(),transform:"rotate(180deg) translate(-50%, -50%)","transform-origin":"0% 0%",opacity:"0"})}},c=function(){this.glareElement.css({width:""+2*e(this).outerWidth(),height:""+2*e(this).outerWidth()})};return e.fn.tilt.destroy=function(){e(this).each(function(){e(this).find(".js-tilt-glare").remove(),e(this).css({"will-change":"",transform:""}),e(this).off("mousemove mouseenter mouseleave")})},e.fn.tilt.getValues=function(){var s=[];return e(this).each(function(){this.mousePositions=r.call(this),s.push(u.call(this))}),s},e.fn.tilt.reset=function(){e(this).each(function(){var s=this;this.mousePositions=r.call(this),this.settings=e(this).data("settings"),o.call(this),setTimeout(function(){s.reset=!1},this.settings.transition)})},this.each(function(){var t=this;this.settings=e.extend({maxTilt:e(this).is("[data-tilt-max]")?e(this).data("tilt-max"):20,perspective:e(this).is("[data-tilt-perspective]")?e(this).data("tilt-perspective"):300,easing:e(this).is("[data-tilt-easing]")?e(this).data("tilt-easing"):"cubic-bezier(.03,.98,.52,.99)",scale:e(this).is("[data-tilt-scale]")?e(this).data("tilt-scale"):"1",speed:e(this).is("[data-tilt-speed]")?e(this).data("tilt-speed"):"400",transition:!e(this).is("[data-tilt-transition]")||e(this).data("tilt-transition"),disableAxis:e(this).is("[data-tilt-disable-axis]")?e(this).data("tilt-disable-axis"):null,axis:e(this).is("[data-tilt-axis]")?e(this).data("tilt-axis"):null,reset:!e(this).is("[data-tilt-reset]")||e(this).data("tilt-reset"),glare:!!e(this).is("[data-tilt-glare]")&&e(this).data("tilt-glare"),maxGlare:e(this).is("[data-tilt-maxglare]")?e(this).data("tilt-maxglare"):1},s),null!==this.settings.axis&&(console.warn("Tilt.js: the axis setting has been renamed to disableAxis. See https://github.com/gijsroge/tilt.js/pull/26 for more information"),this.settings.disableAxis=this.settings.axis),this.init=function(){e(t).data("settings",t.settings),t.settings.glare&&h.call(t),l.call(t)},this.init()})},e("[data-tilt]").tilt(),!0});

}