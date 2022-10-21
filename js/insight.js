"use strict";function loadInsight(t,a){var n=$(".searchbox"),e=n.find(".searchbox-input"),s=n.find(".searchbox-body");function c(t,n,e){if(!Array.isArray(n)||!n.length||!t)return e?t.slice(0,e):t;var r=t.toLowerCase(),n=n.map(function(t){var n=r.indexOf(t.toLowerCase());return t&&-1!==n?[n,n+t.length]:null}).filter(function(t){return null!==t}).sort(function(t,n){return t[0]-n[0]||t[1]-n[1]});if(!n.length)return t;var o,a,s="",c=0,i=(a=[],n.forEach(function(t){!o||t[0]>o[1]?a.push(o=t):t[1]>o[1]&&(o[1]=t[1])}),a),l=[i[0][0],i[i.length-1][1]];e&&e<l[1]&&(c=l[0]);for(var u=0;u<i.length;u++){var f=i[u];if(s+=t.slice(c,Math.min(f[0],l[0]+e)),e&&f[0]>=l[0]+e)break;s+="<em>"+t.slice(f[0],f[1])+"</em>",c=f[1],u===i.length-1&&(s+=e?t.slice(f[1],Math.min(t.length,l[0]+e+1)):t.slice(f[1]))}return s}function i(t,n,e,r,o){n=null!=n&&""!==n?n:a.untitled;e=e?'<span class="searchbox-result-title-secondary">('+e+")</span>":"";return'<a class="searchbox-result-item" href="'.concat(o,'">\n            <span class="searchbox-result-icon">\n                <i class="fa fa-').concat(t,'" />\n            </span>\n            <span class="searchbox-result-content">\n                <span class="searchbox-result-title">\n                    ').concat(n,"\n                    ").concat(e,"\n                </span>\n                ").concat(r?'<span class="searchbox-result-preview">'+r+"</span>":"","\n            </span>\n        </a>")}function l(r,o,t){var n;if(0===t.length)return null;var e=a[o.toLowerCase()];switch(o){case"POSTS":case"PAGES":n=t.map(function(t){return i("file",c(t.title,r),null,c(t.text,r,100),t.link)});break;case"CATEGORIES":case"TAGS":n=t.map(function(t){var n=c(t.name,r),e=c(t.slug,r);return i("CATEGORIES"===o?"folder":"tag",n,e,null,t.link)});break;default:return null}return e=e,$("<section>").addClass("searchbox-result-section").append($("<header>").text(e)).append(n)}function u(t){return t.split(" ").filter(function(t){return!!t}).map(function(t){return t.toLowerCase()})}function f(t,e,r){t=u(t);return t.filter(function(n){return 0<r.filter(function(t){return!!Object.prototype.hasOwnProperty.call(e,t)&&-1<e[t].toLowerCase().indexOf(n)}).length}).length===t.length}function h(t,r,n,o){var a=0;return u(t).forEach(function(t){var e=new RegExp(t,"img");n.forEach(function(t,n){Object.prototype.hasOwnProperty.call(r,t)&&(t=r[t].match(e),a+=t?t.length*o[n]:0)})}),a}function p(t,n){var e,r,o={post:function(t){return h(e,t,["title","text"],[3,1])},page:function(t){return h(e,t,["title","text"],[3,1])},category:function(t){return h(e,t,["name","slug"],[1,1])},tag:function(t){return h(e,t,["name","slug"],[1,1])}},n=(r=e=n,{post:function(t){return f(r,t,["title","text"])},page:function(t){return f(r,t,["title","text"])},category:function(t){return f(r,t,["name","slug"])},tag:function(t){return f(r,t,["name","slug"])}}),a=t.posts,s=t.pages,c=t.tags,t=t.categories;return{posts:a.filter(n.post).sort(function(t,n){return o.post(n)-o.post(t)}).slice(0,5),pages:s.filter(n.page).sort(function(t,n){return o.page(n)-o.page(t)}).slice(0,5),categories:t.filter(n.category).sort(function(t,n){return o.category(n)-o.category(t)}).slice(0,5),tags:c.filter(n.tag).sort(function(t,n){return o.tag(n)-o.tag(t)}).slice(0,5)}}function r(t){var n,e,r=$.makeArray(s.find(".searchbox-result-item")),o=-1,t=(r.forEach(function(t,n){$(t).hasClass("active")&&(o=n)}),(r.length+o+t)%r.length);$(r[o]).removeClass("active"),$(r[t]).addClass("active"),0!==(r=$(r[t])).length&&(t=s[0].clientHeight,n=r.position().top-s.scrollTop(),(e=r[0].clientHeight+r.position().top)>t+s.scrollTop()&&s.scrollTop(e-s[0].clientHeight),n<0&&s.scrollTop(r.position().top))}function o(t){t&&t.length&&(location.href=t.attr("href"))}$.getJSON(t.contentUrl,function(o){"#insight-search"===location.hash.trim()&&n.addClass("show"),e.on("input",function(){var t,n=$(this).val(),e=n,r=p(o,n);for(t in s.empty(),r)s.append(l(u(e),t.toUpperCase(),r[t]))}),e.trigger("input")});var g=!1;$(document).on("click focus",".navbar-main .search",function(){n.addClass("show"),n.find(".searchbox-input").focus()}).on("click touchend",".searchbox-result-item",function(t){"click"!==t.type&&!g||(o($(this)),g=!1)}).on("click touchend",".searchbox-close",function(t){"click"!==t.type&&!g||($(".navbar-main").css("pointer-events","none"),setTimeout(function(){$(".navbar-main").css("pointer-events","auto")},400),n.removeClass("show"),g=!1)}).on("keydown",function(t){if(n.hasClass("show"))switch(t.keyCode){case 27:n.removeClass("show");break;case 38:r(-1);break;case 40:r(1);break;case 13:o(s.find(".searchbox-result-item.active").eq(0))}}).on("touchstart",function(t){g=!0}).on("touchmove",function(t){g=!1})}