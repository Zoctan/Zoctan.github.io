"use strict";!function(){var n=new Date;setInterval(function(){var t,e;t=new Date("12/12/2017 12:00:00"),n.setTime(n.getTime()+250),days=(n-t)/1e3/60/60/24,dnum=Math.floor(days),hours=(n-t)/1e3/60/60-24*dnum,hnum=Math.floor(hours),minutes=(n-t)/1e3/60-1440*dnum-60*hnum,mnum=Math.floor(minutes),seconds=(n-t)/1e3-86400*dnum-3600*hnum-60*mnum,snum=Math.round(seconds),(e=document.getElementById("runtime"))?(siteStartDateString=(siteStartDateString=t.toUTCString()).split(" ").slice(0,4).join(" "),e.innerHTML="Started at ".concat(siteStartDateString,", my site has been running for ").concat(dnum," days ").concat(hnum," hours ").concat(mnum," minutes ").concat(snum," seconds</div>")):document.getElementsByTagName("footer")[0].getElementsByClassName("is-size-7")[0].insertAdjacentHTML("beforeend",'<div id="runtime" class="is-size-7">load runtime...</div>')},250)}();