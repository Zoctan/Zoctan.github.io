"use strict";!function(e,o){var s,a,n,t;o(e).on("click",".navbar-main .search",function(){o(".searchbox").toggleClass("show")}).on("click",".searchbox .searchbox-mask",function(){o(".searchbox").removeClass("show")}).on("click",".searchbox-close",function(){o(".searchbox").removeClass("show")}).on("keydown",".searchbox-input",(s=function(){var e=o(this).val();try{var c=google.search.cse.element.getElement("searchresults-only0");""===e.trim()?c.clearAllResults():c.execute(e)}catch(e){}},a=300,function(){var e=this,c=arguments,o=n&&!t;clearTimeout(t),t=setTimeout(function(){t=null,n||s.apply(e,c)},a),o&&s.apply(e,c)}))}(document,jQuery);