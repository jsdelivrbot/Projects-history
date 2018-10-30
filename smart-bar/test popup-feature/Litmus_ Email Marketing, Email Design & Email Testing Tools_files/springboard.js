// Springboard v3.85
window.springBoard=window.springBoard ||{}, window.springBoard.urlParams, window.springBoard.revision=3.85, window.springBoard.qualarooInterval=25, window.springBoard.inspectletInterval=25, window.springBoard.createCookie=function (e, i, n){if (n){var o=new Date; o.setTime(o.getTime() + 24 * n * 60 * 60 * 1e3); var t="; expires=" + o.toGMTString()}else var t=""; var a=0==document.location.host.indexOf("www.") ? document.location.host.substr(3, document.location.host.length) : document.location.host; return document.cookie=escape(e) + "=" + escape(i) + t + ";domain=" + a + ";path=/" + ("https:"==document.location.protocol ? "; secure" : ""), null}, window.springBoard.readCookie=function (e){for (var i=escape(e) + "=", n=document.cookie.split(";"), o=0; o < n.length; o++){for (var t=n[o]; " "==t.charAt(0);)t=t.substring(1, t.length); if (0==t.indexOf(i))return unescape(t.substring(i.length, t.length))}return null}, window.springBoard.eraseCookie=function (e){return window.springBoard.createCookie(e, "", -1), null}, window.springBoard.addCss=function (e){var i=document.getElementsByTagName("head")[0], n=document.createElement("style"); n.type="text/css", n.styleSheet ? n.styleSheet.cssText=e : n.appendChild(document.createTextNode(e)), i.appendChild(n)}, window.springBoard.addJS=function (e){var i=document.getElementsByTagName("head")[0], n=document.createElement("script"); n.type="text/javascript", n.src=e, i.appendChild(n)}, window.onpopstate=function (){var e, i=/\+/g, n=/([^&=]+)=?([^&]*)/g, o=function (e){return decodeURIComponent(e.replace(i, " "))}, t=window.location.search.substring(1); for (window.springBoard.urlParams={}; e=n.exec(t);)window.springBoard.urlParams[o(e[1])]=o(e[2])}, window.onpopstate(), window.springBoard.checkCookies=function (){if (window.springBoard.urlParams.cfQA){var e=window.springBoard.urlParams.cfQA.toLowerCase(); "true"==e && window.springBoard.createCookie("cfQA", "true"), "false"==e && window.springBoard.eraseCookie("cfQA")}if (window.springBoard.urlParams.cvDisable){var i=window.springBoard.urlParams.cvDisable.toLowerCase(); "true"==i && (window.springBoard.createCookie("cvDisable", "true"), window.optimizely=window.optimizely || [], window.optimizely.push(["disable"])), "false"==i && window.springBoard.eraseCookie("cvDisable")}"true"==window.springBoard.readCookie("cvDisable") && (document.title="[DISABLED] " + document.title)}, window.springBoard.checkCookies(), window.springBoard.postOptimizelyActions=function (){if ("undefined" !=typeof window.optimizely && "undefined" !=typeof window.optimizely.data && "undefined" !=typeof window.optimizely.data.state && "undefined" !=typeof window.optimizely.data.experiments){window.springBoard.postGAActions(), setTimeout(window.springBoard.postGAActions, 5e3), window.springBoard.qualarooIntegration(), window.springBoard.inspectletIntegration(), "true"==window.springBoard.readCookie("cfQA") && (document.title="[QA] " + document.title); var e=window.optimizely.data.state.activeExperiments; window.springBoard.experimentData=""; for (var i=0; i < e.length; i++)window.springBoard.experimentData=window.springBoard.experimentData + window.optimizely.data.experiments[e[i]].name + " | " + e[i] + " | " + window.optimizely.data.state.variationNamesMap[e[i]] + "\n"}else setTimeout(function (){window.springBoard.postOptimizelyActions()}, 500)}, window.springBoard.qualarooIntegration=function (){if ("undefined" !=typeof window._kiq){var e=[], i=[], n=""; for (var o in window.optimizely.data.state.variationNamesMap)window.optimizely.data.state.variationNamesMap.hasOwnProperty(o) && (e.push(optimizely.data.experiments[o].name), i.push(optimizely.data.state.variationNamesMap[o])); for (var t=0; t < e.length; t++)n=n + e[t] + ":" + i[t] + ", "; if (window._kiq.push(["set",{"Optimizely Tests": n}]), "undefined" !=typeof window.__insp && "undefined" !=typeof window.__insp.wid && "undefined" !=typeof window.__insp.sid){var a="http://www.inspectlet.com/dashboard/watchsession/", d=window.__insp.wid, r=window.__insp.sid, w=a + d + "/" + r + "?pn=1"; window._kiq.push(["set",{video: w}])}else window.springBoard.qualarooInterval=2 * window.springBoard.qualarooInterval, setTimeout(function (){window.springBoard.qualarooIntegration()}, window.springBoard.qualarooInterval)}else window.springBoard.qualarooInterval=2 * window.springBoard.qualarooInterval, setTimeout(function (){window.springBoard.qualarooIntegration()}, window.springBoard.qualarooInterval)}, window.springBoard.inspectletIntegration=function (){if ("undefined" !=typeof window.__insp)for (var e=window.optimizely.activeExperiments, i=e.length - 1; i >=0; i--)__insp.push(["tagSession", optimizely.data.experiments[e[i]].name + "-" + optimizely.variationNamesMap[e[i]]]); else window.springBoard.inspectletInterval=2 * window.springBoard.inspectletInterval, setTimeout(function (){window.springBoard.inspectletIntegration()}, window.springBoard.inspectletInterval)}, window.springBoard.postGAActions=function (){if ("undefined" !=typeof window.optimizely && "undefined" !=typeof window.optimizely.activeExperiments && ("undefined" !=typeof window.ga && "undefined" !=typeof window.ga.getAll || "undefined" !=typeof window._gaq && "undefined"==typeof window._gaq.length)){if ("undefined"==typeof window.springBoard.disableGAEvents){var e=window.optimizely.activeExperiments, i=""; if ("undefined" !=typeof window._gaq && "undefined"==typeof window._gaq.length && "universal" !==window.springBoard.forceGAType){if ("undefined" !=typeof window.springBoard.forceGATrackingId && "undefined" !==window._gat && "undefined" !=typeof window._gat.fb && window._gat.fb !=window.springBoard.forceGATrackingId)return setTimeout(window.springBoard.postGAActions, 50), !1; if ("undefined" !=typeof window._gat && "undefined" !=typeof window._gat.nb)for (var n in window._gat.nb)if (window._gat.nb.hasOwnProperty(n)){var o=/^gtm/; if (null !==n.match(o)){i=n + "."; break}}}else if ("undefined" !=typeof window.ga && "undefined" !=typeof window.ga.getAll && "classic" !==window.springBoard.forceGAType)if ("undefined" !=typeof window.springBoard.forceGATrackingId){for (var t=window.ga.getAll(), a=0; a < t.length; a++)t[a].get("trackingId")==window.springBoard.forceGATrackingId && (i="t0"==t[a].get("name") ? "" : t[a].get("name") + "."); if (""===i)return setTimeout(window.springBoard.postGAActions, 50), !1}else i="t0"==window.ga.getAll()[0].get("name") ? "" : window.ga.getAll()[0].get("name") + "."; if ("undefined"==typeof window.springBoard.disableSegmentEvents && (null===window.springBoard.readCookie("springBoardSegments") || window.springBoard.readCookie("springBoardSegments") !==JSON.stringify(window.optimizely.data.visitor.segments))){window.springBoard.createCookie("springBoardSegments", JSON.stringify(window.optimizely.data.visitor.segments), 1); var d=[]; for (var n in window.optimizely.data.segments)window.optimizely.data.segments.hasOwnProperty(n) && (d=d + window.optimizely.data.segments[n].name + ":" + window.optimizely.data.visitor.segments[n] + ","); "undefined" !=typeof window._gaq && "undefined"==typeof window._gaq.length && "universal" !==window.springBoard.forceGAType ? _gaq.push([i + "_trackEvent", "Optimizely Segments", "Segments", d, 1, !0]) : "undefined" !=typeof window.ga && "undefined" !=typeof window.ga.getAll && "classic" !==window.springBoard.forceGAType && window.ga(i + "send",{hitType: "event", eventCategory: "Optimizely Segments", eventAction: "Segments", eventLabel: d, nonInteraction: 1})}if ("undefined" !=typeof window._gaq && "undefined"==typeof window._gaq.length && "universal" !==window.springBoard.forceGAType)for (var r=e.length - 1; r >=0; r--)_gaq.push([i + "_trackEvent", "Optimizely", optimizely.data.experiments[e[r]].name, optimizely.data.experiments[e[r]].name + "-" + optimizely.variationNamesMap[e[r]], 1, !0]); else if ("undefined" !=typeof window.ga && "undefined" !=typeof window.ga.getAll && "classic" !==window.springBoard.forceGAType)for (var a=e.length - 1; a >=0; a--)window.ga(i + "send",{hitType: "event", eventCategory: "Optimizely", eventAction: window.optimizely.data.experiments[e[a]].name, eventLabel: window.optimizely.data.experiments[e[a]].name + "-" + window.optimizely.variationNamesMap[e[a]], nonInteraction: 1})}}else setTimeout(window.springBoard.postGAActions, 50)}, window.springBoard.postOptimizelyActions(), window.cFact=window.springBoard;

if (window.springBoard.readCookie('cfQA') == "true") {}

// Qualaroo
var _kiq = _kiq || [];
(function () {
	setTimeout(function () {
		var d = document, f = d.getElementsByTagName('script')[0], s = d.createElement('script');
		s.type = 'text/javascript';
		s.async = true;
		s.src = '//s3.amazonaws.com/ki.js/46950/f3T.js';
		f.parentNode.insertBefore(s, f);
	}, 1);
})();

//CrazyEgg
setTimeout(function(){
	var a=document.createElement("script");
	var b=document.getElementsByTagName("script")[0];
	a.src=document.location.protocol+"//script.crazyegg.com/pages/scripts/0004/4384.js?"+Math.floor(new Date().getTime()/3600000);
	a.async=true;a.type="text/javascript";b.parentNode.insertBefore(a,b)
}, 1);

window.optimizely = window.optimizely || [];

window.springBoard.main = function () {
	// Plan type tracking
	if (window.location.href.indexOf("/signup/welcome") > -1) {
		if (document.referrer == "https://litmus.com/signup/basic-with-trial-plan" || document.referrer == "https://litmus.com/signup/basic-plan") {
			window.optimizely.push(["trackEvent", "signup_basic"]);
		} else if (document.referrer == "https://litmus.com/signup/plus-with-trial-plan" || document.referrer == "https://litmus.com/signup/plus-plan") {
			window.optimizely.push(["trackEvent", "signup_plus"]);
		} else if (document.referrer == "https://litmus.com/signup/premium-with-trial-plan" || document.referrer == "https://litmus.com/signup/premium-plan") {
			window.optimizely.push(["trackEvent", "signup_pro"]);
		} else if (document.referrer == "https://litmus.com/signup/basic-with-trial-annual-plan" || document.referrer == "https://litmus.com/signup/basic-annual-plan") {
			window.optimizely.push(["trackEvent", "signup_basic_annual"]);
		} else if (document.referrer == "https://litmus.com/signup/plus-with-trial-annual-plan" || document.referrer == "https://litmus.com/signup/plus-annual-plan") {
			window.optimizely.push(["trackEvent", "signup_plus_annual"]);
		} else if (document.referrer == "https://litmus.com/signup/premium-with-trial-annual-plan" || document.referrer == "https://litmus.com/signup/premium-annual-plan") {
			window.optimizely.push(["trackEvent", "signup_pro_annual"]);
		}
	}

	// Qualaroo surveys
	var checkQualaroo = setInterval(function () {
		if (typeof _kiq != 'undefined') {
			clearInterval(checkQualaroo);

			if (window.location.href.indexOf("/signup/welcome") > -1) {
				if (document.referrer == "https://litmus.com/signup/basic-with-trial-plan" || document.referrer == "https://litmus.com/signup/basic-plan") {
					_kiq.push(['set', {'newuser': 'basic_monthly'}]);
				} else if (document.referrer == "https://litmus.com/signup/plus-with-trial-plan" || document.referrer == "https://litmus.com/signup/plus-plan") {
					_kiq.push(['set', {'newuser': 'plus_monthly'}]);
				} else if (document.referrer == "https://litmus.com/signup/premium-with-trial-plan" || document.referrer == "https://litmus.com/signup/premium-plan") {
					_kiq.push(['set', {'newuser': 'pro_monthly'}]);
				} else if (document.referrer == "https://litmus.com/signup/basic-with-trial-annual-plan" || document.referrer == "https://litmus.com/signup/basic-annual-plan") {
					_kiq.push(['set', {'newuser': 'basic_annual'}]);
				} else if (document.referrer == "https://litmus.com/signup/plus-with-trial-annual-plan" || document.referrer == "https://litmus.com/signup/plus-annual-plan") {
					_kiq.push(['set', {'newuser': 'plus_annual'}]);
				} else if (document.referrer == "https://litmus.com/signup/premium-with-trial-annual-plan" || document.referrer == "https://litmus.com/signup/premium-annual-plan") {
					_kiq.push(['set', {'newuser': 'pro_annual'}]);
				}
			}
		}
	}, 1);
};