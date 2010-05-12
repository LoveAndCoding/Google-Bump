// ==UserScript==
// @name			Google Bump
// @namespace		http://userscripts.org/scripts/show/33449
// @description		Adds some functionality to the Google web search. Main features include Multisearch, Video result extraction, Wikipedia definitions and links, and some clutter cleanup by. All options can be turned off.
// @version			2.0.0.0a
// @include			http://www.google.tld/
// @include			http://www.google.tld/#*
// @include			http://www.google.tld/search?*
// @include			http://www.google.tld/webhp?*
// @exclude			http://www.google.com/search?*&tbs=*
// ==/UserScript==

/*
	Author: KTaShes
	Date: May 12 2010
	
	Code can now be found on GitHub @ http://github.com/ktsashes/Google-Bump
	
	This code uses juicer to compile from several different javascript files.
	Juicer (C) Christian Johansen - http://cjohansen.no/en/ruby/juicer_a_css_and_javascript_packaging_tool
*/
var version = "1.19";
var image_store = {
	
	multi_upArrow : 	"data:image/png;base64,iVBORw0KGgoAA" +
						"AANSUhEUgAAAA0AAAAICAYAAAAiJnXPAAAA" +
						"GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJ" +
						"lYWR5ccllPAAAAOJJREFUeNpi%2BP%2F%2F" +
						"PwM6BgIuILYC0VjlcWmQCG04hksjdg1hjUd" +
						"VG%2FZ%2FBdHYNDJCFTMwMjKCNBhIx%2FZ0" +
						"8GjZGTOxcXH9%2B%2FXt25drh84%2BXVxSA" +
						"ZS7AFT7DawWrBOqQTZ1eguvtqMZEwcvN1AQ" +
						"5AyGfz8%2Bf%2F18df%2Bpx7Mza2AaGaFOM" +
						"pDPWdjIq%2B9mwczOy8PExMgAkgC54d%2B%" +
						"2F%2Fwx%2Ff37%2B8vnirhMPp8TXgzSC5Kx" +
						"Uilc2sDEzM7KzMjNxADErCxMjM9D6v0Bjf%" +
						"2F%2F59%2F%2FH77%2F%2FfgLxr79%2F%2F" +
						"9%2FpDW%2BA28RAPLgAEGAAY5%2Bk2Ib1C%" +
						"2BEAAAAASUVORK5CYII%3D",
	
	multi_downArrow :	"data:image/png;base64,iVBORw0KGgoAA" +
						"AANSUhEUgAAAA0AAAAICAYAAAAiJnXPAAAA" +
						"GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJ" +
						"lYWR5ccllPAAAAOJJREFUeNpiZGBg4AJiAw" +
						"biwQUWkAbZ9FnN%2F%2F%2F8Yvr%2F6yfz%" +
						"2F39%2FGP%2F%2F%2FcXE8B8owwhEzGz%2F" +
						"GJlY%2FjOysf9lZGH793hmWi0jzCb57IWNP" +
						"Jq2lkBF3ECNDAz%2FgboYGRmAGhiAhnz9cv" +
						"3w8YdT4%2BtBNjH%2BB0oyMjKCNSoXrWzg0" +
						"nayZGLl5GGAWvXv9%2Fcv367uO363L7wBpA" +
						"Go%2FhsTyJEgBkgAJMH58OhpfqYfX%2Fk5m" +
						"BlANIiPrIEBqgGOoU61cu%2Fccch79buvIB" +
						"rEB4mjqEPmIGv06d15BJsGrJqQNWLTAMIAA" +
						"QYAJLynOOE%2FN%2BkAAAAASUVORK5CYII%" +
						"3D",
	
	vid_popout : 		"data:image/png;base64,iVBORw0KGgoAA" +
						"AANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAA" +
						"AAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZ" +
						"VJlYWR5ccllPAAAAJtJREFUeNpiXL9%2BPQ" +
						"MlgAVK%2BwGxOZL4SSDeRIoB5lueuFTBBH1" +
						"k9rRBDUA3GMMCFnQZqOaT2AxGUwMCm1jQJU" +
						"AakBScRGLDAZKaTUxoCk%2FCDEFyejUaRgE" +
						"wAzZBJTfhMIRgICLHxElkFxEygAmJbY5kK7" +
						"KLiDaALDDwBrDgEG8lxwDk6MMLkGMI2YBNa" +
						"MkUH8CZFzYRmwthACDAAJ6pRbpH2M60AAAA" +
						"AElFTkSuQmCC",
	
	media_close :		"data:image/png;base64,iVBORw0KGgoAA" +
						"AANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAA" +
						"AAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZ" +
						"VJlYWR5ccllPAAAAKdJREFUeNpi%2FP%2F%" +
						"2FPwMlgImBQsACY6RM%2BQJjEnISI4iYk8O" +
						"DagBMc1qrHkiBKxCHosmtBuLds6ov%2FYcZ" +
						"gu4FmGYQ2A3VgKIZxICq%2BY%2FhBShwhSl" +
						"EotHZrljDAApC0TTsxmJBKKFYCEW3BZdmqk" +
						"QjNgNWY3E6toDFasBqLAHmis8QFiy24PIz1" +
						"oBFdgEjNJFg0wwPWPSEhO4CZEPQQSpyUoZr" +
						"GPDcCBBgANKNMbOvj7dYAAAAAElFTkSuQmC" +
						"C"
}
/**
  *	Options object to hold both default and user configured options.
  */
function optionlist() {
	
		// Visual defaults
	this.DEFAULT_MARGS = true;
	this.DEFAULT_SUGGES = true;
	this.DEFAULT_DYM = true;
	this.DEFAULT_SIDEADS = true;
		// Wiki default
	this.DEFAULT_WIKI = true;
		// Shortcut defaults
	this.DEFAULT_SCUTS = true;
	this.DEFAULT_KEYD = true;
	this.DEFAULT_TABS = false;
		// Video defaults
	this.DEFAULT_EXVIDS = true;
	this.DEFAULT_VIDS = false;
		// Embed defaults
	this.DEFAULT_EMBD = true;
	this.DEFAULT_HDVD = true;
	this.DEFAULT_FSVD = true;
	this.DEFAULT_APVD = true;
	this.DEFAULT_LPVD = false;
	this.DEFAULT_IVVD = false;
	this.DEFAULT_PMVD = false;
	this.DEFAULT_CCVD = false;
		// Image defaults
	this.DEFAULT_IMGS = false;
	this.DEFAULT_IMGPLYR = true;
	this.DEFAULT_IMGSIZE = "large";
	this.DEFAULT_SLDSHW = true;
	this.DEFAULT_IMGLOAD = true;
	this.DEFAULT_SKIPERR = true;
	this.DEFAULT_SLDTM = 4000;
	this.DEFAULT_IMGPGS = 1;
		// Style defaults
	this.DEFAULT_STYL = "classic";
	this.DEFAULT_SOOT = false;
	this.DEFAULT_OLDSIZE = true;
		// Advanced defaults
	this.DEFAULT_DELAY = 400;
	
	
		// Visual vars
	this.margs = GM_getValue("margs", this.DEFAULT_MARGS);
	this.sugges = GM_getValue("sugges", this.DEFAULT_SUGGES);
	this.dym = GM_getValue("dym", this.DEFAULT_DYM);
	this.sideads = GM_getValue("sideads", this.DEFAULT_SIDEADS);
		// Wiki var
	this.wiki = GM_getValue("wiki", this.DEFAULT_WIKI);
		// Shortcut vars
	this.scuts = GM_getValue("scuts", this.DEFAULT_SCUTS);
	this.keyd = GM_getValue("keyd", this.DEFAULT_KEYD);
	this.tabs = GM_getValue("tabs", this.DEFAULT_TABS);
		// Video vars
	this.exvids = GM_getValue("exvids", this.DEFAULT_EXVIDS);
	this.vids = GM_getValue("vids", this.DEFAULT_VIDS);
		// Embed vars
	this.embd = GM_getValue("embd", this.DEFAULT_EMBD);
	this.hdvd = GM_getValue("hdvd", this.DEFAULT_HDVD);
	this.fsvd = GM_getValue("fsvd", this.DEFAULT_FSVD);
	this.apvd = GM_getValue("apvd", this.DEFAULT_APVD);
	this.lpvd = GM_getValue("lpvd", this.DEFAULT_LPVD);
	this.ivvd = GM_getValue("ivvd", this.DEFAULT_IVVD);
	this.pmvd = GM_getValue("pmvd", this.DEFAULT_PMVD);
	this.ccvd = GM_getValue("ccvd", this.DEFAULT_CCVD);
		// Image vars
	this.imgs = GM_getValue("imgs", this.DEFAULT_IMGS);
	this.imgPlyr = GM_getValue("imgPlyr", this.DEFAULT_IMGPLYR);
	this.imgSize = GM_getValue("imgSize", this.DEFAULT_IMGSIZE);
	this.sldshw = GM_getValue("sldshw", this.DEFAULT_SLDSHW);
	this.imgLoad = GM_getValue("imgLoad", this.DEFAULT_IMGLOAD);
	this.skipErr = GM_getValue("skipErr", this.DEFAULT_SKIPERR);
	this.sldTm = GM_getValue("sldtm", this.DEFAULT_SLDTM);
	this.imgPgs = GM_getValue("imgPages", this.DEFAULT_IMGPGS);
		// Style vars
	this.styl = GM_getValue("style", this.DEFAULT_STYL);
	this.soot = GM_getValue("soot", this.DEFAULT_SOOT);
	this.oldSize = GM_getValue("oldSize", this.DEFAULT_OLDSIZE);
		// Update vars
	this.updateCheck = parseInt(GM_getValue("updtTime",0));
	this.newversion = parseFloat(GM_getValue("newver", 0.0));
		// Advanced vars
	this.delay = parseInt(GM_getValue("delay", this.DEFAULT_DELAY));
}

	// Start Helper Functions ----------------------------------------------------------
// Shortcut for document.getElementById
function $(id) {
	return document.getElementById(id);
}
// Shortcut for document.getElementsByClassName
function $cl(cname) {
	return document.getElementsByClassName(cname);
}
// Shortcut for document.createElement
function $create(type, attributes) {
	var node;
	if(type == 'textNode') {
		node = document.createTextNode(attributes);
	} else {
		node = document.createElement(type);
		if(typeof attributes == 'string') {
			node.textContent = attributes;
		} else {
			for (var attr in attributes){
				if(attr == "textContent") {
					node.textContent = attributes[attr];
				} else if (attr == "className") {
					node.className = attributes[attr];
				} else if (attr == "innerHTML") {
					node.innerHTML = attributes[attr];
				} else if (attributes.hasOwnProperty(attr)) {
					node.setAttribute(attr, html_entity_decode(attributes[attr]));
				}
			}
		}
	}
	return node;
}
// Shortcut to remove an element
function $remove(node) {
	if (typeof node == "string") {
		node = $(node);
	}
	
	if (node) {
		return node.parentNode.removeChild(node);
	} else {
		return false;
	}
}
// Shortcut for document.getElementsByTagName
function $tag(type) {
	return document.getElementsByTagName(type);
}
		// Start Grease Monkey Code Snippets ----------------------------------------------------------
// Simple xmlhttpRequest GET shortcut
function get(url, cb, err) {
	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onload: function(xhr) { cb(xhr); },
		onerror: function(xvr) { err(xvr); }
	});
}
// Simple xmlhttpRequest POST shortcut
function post(url, data, cb) {
	GM_xmlhttpRequest({
		method: "POST",
		url: url,
		headers:{'Content-type':'application/x-www-form-urlencoded'},
		data:encodeURI(data),
		onload: function(xhr) { cb(xhr.responseText); }
	});
}
		// End Grease Monkey Code Snippets ------------------------------------------------------------
//	Decoed HTML Entities
function html_entity_decode(str) {
    //jd-tech.net
    var tarea = $create('textarea');
    tarea.innerHTML = str;
	return tarea.value;
}
// Shortcut for redirecting the page and opening new tabs
function linkit(theLink, tabit, under) {
	if (tabit || (options.tabs && under)) {
		GM_openInTab(theLink);
	} else {
		location.href = theLink;
	}
}
// Goes up until if finds the proper node, and then returns the given attribute
function findrightnode(target, clname, att) {
	var checkClass = target;
	// Loop up and break on finding correct info
	while (checkClass.parentNode) {
		if (checkClass.className == clname) {
			if(att) {
				return checkClass.getAttribute(att);
			} else {
				return checkClass;
			}
		} else  {
			checkClass = checkClass.parentNode;
		}
	}
}
// Helper function to check if the clicked item is a child of a given class
function checkallparentsforit(event, clname) {
	var onn = event.target;
	// Loop up and returns if value is found
	while (onn.parentNode) {
		if (onn.className == clname || onn.id == clname) {
			return true;
		}
		onn = onn.parentNode;
	}
	return false;
}
// Get an attribute from a node
function getAttribute(node, attName) {
	var atts = node.attributes;
	for (var i = 0; i < atts.length; i++) {
		if(atts[i].name == attName) {
			return atts[i].value;
		}
	}
}
// Checks if a new search has occured without a full reload
function checknonreload() {
	// Check that original page is still the page that is loaded
	if(currUrl != location.href) {
		if($('res')) {
			// Restart process if it is not
			resetPg();
			userInput = setupText();
			runThrough();
		}
		currUrl = location.href;
	}
}
// Reset a page to its original state
function resetPg() {
	var wdiv = $("wikiDiv");
	if (wdiv) {
		wdiv.parentNode.removeChild(wdiv);
	}
	var mdiv = $("mBox");
	if (mdiv) {
		mdiv.parentNode.removeChild(mdiv);
	}
	var xdiv = $("exvidlist");
	if (xdiv) {
		xdiv.parentNode.removeChild(xdiv);
	}
	var wldiv = $("wikiLink");
	if (wldiv) {
		wldiv.parentNode.removeChild(wldiv);
	}
	var gup = $("greyOut");
	if (gup) {
		closeEx();
	}
}
// Removes all the children of the given element using recursion
function removeAllChildren(node) {
	var count = node.childNodes.length;
	for (var nc = 0; nc < count; nc++) {
		node.removeChild(node.childNodes[0]);
	}
}
// Closes all features that display on top with a grey background
function closeEx() {
	conf.undraw();
	stylr.undraw();
	sldObj.undraw();
}
	// End Helper Functions ------------------------------------------------------------

	// Start Display Functions ---------------------------------------------------------
// Adds all the styles for the page.
function allStyles () {
	var maxwidth = window.innerWidth - 50;
	var maxheight = window.innerHeight - 100;
	/*
	var ssheet = "#greyOut { background-color: black; opacity: .6; width: 100%; height: 100%; z-index: 1000; position: fixed; top: 0px; left: 0px; } " + 
				"#mBox { background-color: white; width: 400px; } #pBox { vertical-align: middle; overflow: hidden; width: 400px; } " +
				".rBox { float: right; background-color: #F0F7F9; text-align: center; } .wBBord { border-bottom: 1px solid #6B90DA; } " +
				".confLbl { font-size: small; display: inline; } .opli { display: inline; } .confTab { margin: 0px; padding: 2px 4px; border: 1px solid black; } " +
				"#confWel { border-bottom: 1px solid black; font-size: 22pt; font-family: \"Times New Roman\", serif; text-align: center; background-color: #F0F7F9; } " +
				"#slOpts { margin: 6px 0px; border-bottom: 1px solid grey; } #confWrap { height: 432px; border-bottom: 1px solid black; margin-bottom: 2px; } " +
				"#confTabs { height: 16px; position: relative; margin-bottom: 3px; } .conf_Tab { padding: 0px 0.5em .25em .5em; " + 
				"margin-top: 4px; background-color: #F0F7F9;  border-bottom: 1px solid black; border-right: 1px solid black; display: inline; z-index: 10001; cursor: pointer;} " +
				".selected_tab { border-bottom-style: none; background-color: white;} .confTabOn { margin: .7em; } .confTabOn label { margin: .2em 0px; } .confTabOn button { margin: .5em 0px; } " + 
				"#t_AbtConf { display: block; position: absolute; top: -4px; right: 0px; width: 146px; text-align: right; border-right-style: none; z-index: 10000; } " +
				"#AbtConf p { margin-top: 0px; } #setShow, .blocked, .imgLink { display: block; } " +
				"#confGoogBump { position: fixed; left: 50%; top: 50%; width: 500px; height: 520px; margin-left: -250px; margin-top: -260px; z-index: 9999; background-color: white; border: 1px solid black; } " +
				"#deapallFault, #sNc { margin-left 1em; } .playimg { max-width: 400px; max-height: 345px; border-style: none; } " + 
				"#videoList { width: 180px; } #imageList { width: 220px; } #wikLink { float: left; display: inline; } #ssb { position: relative; height: 25px; } " +
				"#resStat { display: inline; position: absolute; top: 1px; right: 0px; } #newVer { float: right; margin-top: -1.4em; font-size: 85%; background-color: #CCCCFF; padding: 1px; } " + 
				".rl-videofrom { display: none; } #resOL { margin: 0px 2% 0px .1em; } .toLI { display: list-item; } .reAddAd { width: 100px; } .g { margin-top: 0px; min-width: 540px; } " +
				"#dymTxt { margin: 0px; float: left; } #ssb { position: relative; height: 25px; } #rsStats { display: inline; position: absolute; top: 3px; right: 0px; } " + 
				"#prs { display: inline; } .vidRes { width: 145px; display: block; } .vidRes .g { margin: 0px;  min-width: 0px;  margin-left: 1em; } " + 
				".vidRes img { width: 137px; height: 97px; } .vrTitle { margin-bottom: 30px; } #exvidlist { width: 170px; } " + 
				".rl-item img { width: 160px; height: 120px; } .rl-item { display: inline; } #ssb { margin-bottom: 0px; padding-bottom: 0px; } " +
				".rl-special, .rl-watchon, .rl-snippet-grid-view, .rl-details, .rl-short-snippet, .rl-snippet { display: none; }" + 
				"#slideShow { position: fixed; text-align: center; padding: 15px; top: 50%; left: 50%; z-index: 9998; background-color: white; " + 
				"border: 1px solid black; } .sldImgs { max-width: " + maxwidth + "px; max-height: " + maxheight + "px; } " +
				"#sldLink { text-align: center; } #next{ float: right; } #prev { float: left; } #res { padding-right: 0px; margin-top: 0px; }" + 
				"#wikiHeader { font-size: 115%; background-color: #F0F7F9; padding-left: .2em; }" +
				"#wikiDesc { font-size: 75%; margin: 0px; padding: .2em; text-indent: 3em; border: 2px solid #F0F7F9; }" +
				"#wikiDiv { width: 580px; margin-top: -1px; margin-bottom: .5em; } " +
				".ts td { padding: 0px 0px 0px 17px; } ";
	if (sideads || sugges) {
		ssheet += ".hd, ";
	}
	if (margs) {
		ssheet += ".e, ";
	}
	ssheet += ".removed { display: none; }";
				
	GM_addStyle(ssheet);
	*/
	if (options.styl == "media" && (options.imgs || options.vids)) {
		var mediaSS = "a, img { border-style: none; } " +
						"#res { /*background: #1e68ef url(http://uwdcb.doesntexist.com/gbback.jpg) repeat-x scroll top left; */padding-top: 7px; } " +
						"#resOL { position: absolute; right: 0px; top: 7px;";
		if (options.vids && options.imgs) {
			mediaSS += "height: 300px;";
		} else if (options.imgs) {
			mediaSS += "height: 500px; } #imageList img { margin: 4px !important; padding: 4px !important; } #imageList { margin-top: 1% !important; width: 100% !important; height: 150px !important; position: static !important; } #resOL {";
		} else {
			mediaSS += "height: 500px; } #videoList { width: 100% !important; } #resOL {";
		}
		mediaSS += " width: 44%; overflow: auto; border: 1px solid black; background-color: #FFFFFF; } "+
						"#videoList { border: 1px solid black; overflow: auto; width: 55%; height: auto; margin-top: 1%; } "+
						"#videoList p { margin-top: 0px; margin-bottom: 5px; text-decoration: underline; } " +
						"#imageList { border: 1px solid black; overflow: auto; width: 44%; height: auto; position: absolute; top: 312px; right: 0px; } "+
						"#imageList img { margin: 1.4%; } " +
						"#pBox { border: 1px solid black; height: 500px; text-align: center; width: 55%; }" +
						"#pBox img { max-width: 95%; max-height: 95%; margin-top: 1%;} " +
						"#hidePly { display: none !important; } " +
						"#wikLink { float: left; } " +
						".removed, .rl-details, .rl-snippet, .rl-short-snippet, .rl-snippet-grid-view, .rl-watch-on, .rl-special, .rl-cannot-play-here { display: none; } " +
						"#wikiHeader { font-size: 115%; background-color: #D8E2F5; padding-left: .2em; }" +
						"#wikiDesc { font-size: 75%; margin: 0px; padding: .2em; text-indent: 3em; border: 2px solid #D8E2F5; background-color: #FFFFFF; }" +
						"#wikiDiv { width: 100%; margin-bottom: .5em; margin-top: 1%; } " +
						"#res { padding-right: 0px; position: relative; } " +
						".vid_result, .rl-res { width: 102px; margin-left: 2%; margin-right: 2%; display: inline-table; height: auto; text-align: center; } " +
						".thumbnail-img { width: 100px; height: 80px; } " +
						".rl-metadata, .rl-thumbnail { display: block; font-size: small; } " +
						"#sldLink { text-align: center; display: block;}" +
						"#slideShow { position: fixed; text-align: center; padding: 15px; top: 50%; left: 50%; z-index: 9998; background-color: white; border: 1px solid black; } " +
						".sldImgs { max-width: " + maxwidth + "px; max-height: " + maxheight + "px; } " +
						"#greyOut { background-color: black; opacity: .6; width: 100%; height: 100%; z-index: 1000; position: fixed; top: 0px; left: 0px; } " +
						"#pBox, #imageList, #videoList { background-color: #D8E2F5; } " +
						".rl-res, #imageList img { padding: 1%; background-color: #FFFFFF; border: 1px solid black; } ";
		
		GM_addStyle(mediaSS);
		//$("resOL").parentNode.id = "resBox";
		//$("resOL").parentNode.appendChild($("nav"));
		
	} else if (options.styl == "dock") {
		var dockSS = "#dymTxt { float: left; } body { margin-bottom: 50px; } " +
						"a img { border-style: none; } " +
						".closed { display: none; } " +
						"#dock { position: fixed; height: 40px; width: 260px; border: 1px solid #000000; border-bottom-style: none; bottom: 0px; right: 50%; margin-right: -130px; text-align: center; background-color: #F0F7F9; } " +
						".dockLink { padding: 1em 1.25em; display: inline; cursor: pointer; float: left; } " +
						"#wikiHeader { font-size: 18pt; padding-left: .5em; } " +
						".wiki_p { text-indent: 1.5em; } " +
						"#playerTag { text-align: center; margin-top: 0px; } " +
						"#pBox { position: relative; } " +
						"#pBox, #videoList, .imgLink img, #imageList { border: 1px solid #000000; } " +
						"#playerTag, #vidTag, #imageTag { background-color: #000000; color: #FFFFFF; text-shadow: -1px 0px #888888; } " +
						"#videoList .rl-item { display: -moz-stack; width: 16%; margin: 1px 2%; text-align: center; } " +
						"#vBox { height: 480px; } " +
						"#vidTag { border-bottom: 1px solid #000000; } " +
						"#videoList, #imageList { border-top-style: none; } " +
						".rl-domain { display: block; } " +
						"#miniSldLink { cursor: pointer; float: right; font-size: small; padding: 2px 4px; margin-top: 1px; text-shadow: -1px 1px #666666; } " +
						"#miniSldLink:hover { background-color: #FFFFFF; color: #000000; text-shadow: -1px 1px #CCCCCC } " +
						"#imageList button, .rl-cannot-play-here, .rl-domain-below, .rl-watch-on, .rl-special, .rl-snippet { display: none; } " +
						".imgShowing { text-align: center; } " +
						".imgLink { display: inline-block;  margin: 1%; width: 9%; vertical-align: middle; } " +
						".imgLink img { height: auto; padding: 2px; background-color: #555555; } " +
						".aset { display: inline !important; } ";
		GM_addStyle(dockSS);
		
		//$("mBox").className = "removed";
		var dock = $create("div", {
			id : 'dock'
		});
		
		var icon = $create("div", {
			className : "dockLink"
		});
		var alink = $create("a", {
			href : "#ssb",
			id : "searchDock",
			textContent : "Web"
		});
		icon.appendChild(alink);
		icon.addEventListener("click",function (e) {
			if ($('resOL').parentNode.className == "removed") {
				$('resOL').parentNode.className = "";
				dockShow.className = "removed";
				$("nav").className = "";
				dockShow = $('resOL').parentNode;
			}
		}, false);
		dock.appendChild(icon);
		
		if (options.wiki) {
			icon = $create("div", {
				className : "dockLink"
			});
			alink = $create("a", {
				href : "#ssb",
				id : "wikiDock",
				textContent : "Wiki",
				className : "removed"
			});
			icon.appendChild(alink);
			icon.addEventListener("click",function (e) {
				if ($('wikiDiv') && $('wikiDiv').className == "removed") {
					$('wikiDiv').className = "";
					dockShow.className = "removed";
					$("nav").className = "removed";
					dockShow = $('wikiDiv');
				}
			}, false);
			dock.appendChild(icon);
		}
		
		if (options.vids) {
			icon = $create("div", {
				className : "dockLink"
			});
			alink = $create("a", {
				href : "#ssb",
				id : "vidDock",
				textContent : "Video",
				className : "removed"
			});
			icon.appendChild(alink);
			icon.addEventListener("click",function (e) {
				if ($('videoList') && $('videoList').className == "removed") {
					$('videoList').className = "";
					dockShow.className = "removed";
					$("nav").className = "removed";
					dockShow = $('videoList');
				}
			}, false);
			dock.appendChild(icon);
		}
		
		if (options.imgs) {
			icon = $create("div", {
				className : "dockLink"
			});
			alink = $create("a", {
				href : "#ssb",
				id : "imgDock",
				textContent : "Image",
				className : "removed"
			});
			icon.appendChild(alink);
			icon.addEventListener("click",function (e) {
				if ($('imageList') && $('imageList').className == "removed") {
					$('imageList').className = "";
					dockShow.className = "removed";
					$("nav").className = "removed";
					dockShow = $('imageList');
				}
			}, false);
			dock.appendChild(icon);
		}
		
		document.body.appendChild(dock);
	} else if (options.styl == "center") {
		var centerssheet = "body { width: 760px; margin: 0px auto !important; padding-top: 3px; border: 1px solid #000000; border-top-style: none; } " +
							"html { background-color: #DDDDFF; } " +
							"#tsf { position: relative; } " +
							".gbh { left: auto !important; right: auto !important; width: 760px; } " +
							"#ssb { margin-bottom: 0px; padding-bottom: 0px; } " +
							"#mBox { position: relative; width: 760px; height: 220px; overflow: hidden; border-bottom: 1px solid #6B90DA; border-top: 1px solid #6B90DA; } " +
							"#wikiDiv { min-height: 122px; z-index: 1003; border-bottom: 1px solid #000000; border-right: 1px solid #000000; position: absolute; top: 0px; left: 0px; background-color: #FFFFFF; width: 200px; } " +
							"#wikiHeader { font-size: 100%; text-align: center; border-bottom: 1px solid #000000; } " +
							"#wikiHeader a, #wikiHeader a:active { color: #0077CC; text-decoration: none; } " +
							"#wikiDesc { margin: 0px; padding: 5px 2px 2px 2px; font-size: 85%; } " +
							"#wikiExp { min-height: 120px; z-index: 1002; text-align: center; font-size: 75%; position: absolute; top: 0px; left: 0px; background-color: #FFFFFF; border-right: 1px solid #000000; border-bottom: 1px solid #000000; cursor: pointer; color: #0077CC; padding: 1px 4px; } " +
							"#pBox { width: 380px; text-align: center; height: 220px; background-color: #FFFFFF; } " +
							"#videoList { float: left; height: 220px; width: 379px; overflow-y: auto; overflow-x: hidden; border-right: 1px solid #6B90DA; } " + 
							"#vidTag, #imageTag, #playerTag { text-align: center; margin: 0px; padding: 0px 8px; background-color: #F0F7F9; border-bottom: 1px solid #6B90DA; } " +
							".rl-item { max-width: 100px; float: left; padding: 5px 10px; } " +
							".rl-thumbnail img { max-width: 100px; } " +
							".rl-domain-below { overflow-x: hidden; width: 100px; } " +
							".rl-details, .rl-snippet, .rl-snippet-grid-view, .rl-watch-on, .rl-cannot-play-here, .rl-special { display: none; } " +
							"#imageList { text-align: center; height: 220px; width: 379px; float: right; z-index: 1001; overflow-y: auto; overflow-x: hidden; } " +
							"#imageList img { max-width: 100px; } " +
							".playing { display: block !important; z-index: 1004 !important; } " +
							".imgShowing { display: block !important; z-index: 1004 !important; } " +
							".imgShowing img { max-height: 190px; max-width: 380px; margin-top: 2px; } " +
							".sldImgs { display: block; } " +
							"#vBox { background-color: #FFFFFF; } " +
							"#resOL { padding-left: 4px; } " +
							"#res { margin: 0px !important; } " +
							".gac_m { left: 142px !important; margin: -25px 0px -100% 1px !important; float: left; } " +
							"#ssb { margin: 0px !important; } ";
		if (options.vids && options.imgs) {
			centerssheet += "#pBox { position: absolute; top: 0px; right: 0px; display: none; z-index: 1002; } .imgShowing { position: absolute; left: 0px; border-right: 1px solid #6B90DA; width: 379px; } .playing { position: absolute; right: 0px; } ";
		} else if (options.vids) {
			centerssheet += "#pBox { float: right; } ";
		} else {
			centerssheet += "#pBox { float: left; border-right: 1px solid #6B90DA; } ";
		}
		GM_addStyle(centerssheet);
		
		//var wikiExp = $create("div");
		//documnet.body.appendChild(wikiExp);
	} else {
		var ssheet = "#center_col { margin-right: 0px; } " +
					"#mBox { background-color: white; width: 400px; } #pBox { vertical-align: middle; overflow: hidden; width: 400px; } .playing, .imgShowing { position: relative; } " +
					".rBox { float: right; background-color: #F0F7F9; text-align: center; } .wBBord { border-bottom: 1px solid #6B90DA; } " +
					"#setShow, .blocked, .imgLink { display: block; } #vidTag, #imageTag { margin: 0px; } " +
					"#playerTag { background-color: #F0F7F9; height: 20px; } #vBox { height: 305px; } " +
					".playimg { max-width: 400px; max-height: 345px; border-style: none; } " + 
					"#videoList { width: 180px; } #imageList { width: 220px; } #wikLink { float: left; display: inline; } #ssb { position: relative; height: 25px; } " +
					"#resStat { display: inline; position: absolute; top: 1px; right: 0px; } " + 
					"#resOL { margin: 0px 2% 0px .1em; } .toLI { display: list-item; } .reAddAd { width: 100px; } .g { margin-top: 0px; min-width: 540px; } " +
					"#dymTxt { margin: 0px; float: left; } #ssb { position: relative; height: 25px; } #rsStats { display: inline; float: right; } " + 
					"#prs { display: inline; } .vidRes { width: 145px; display: block; } .vidRes .g { margin: 0px;  min-width: 0px;  margin-left: 1em; } " + 
					".vidRes img { width: 137px; height: 97px; } .vrTitle { margin-bottom: 30px; } #exvidlist { width: 170px; } " + 
					".vid_thumb { width: 140px; height: 100px; padding: 0px 10px; border-style: none; border-bottom: 1px solid #000000; background-color: #000000; } " +
					".vid_result { font-size: 11pt; border: 1px solid #000000; margin: 9px; } .vid_result a { text-decoration: none; } " +
					"#ssb { margin-bottom: 0px; padding-bottom: 0px; } " +
					"#hidePly { display: none; } " +
					"#slideShow { position: fixed; text-align: center; padding: 15px; top: 50%; left: 50%; z-index: 9998; background-color: white; " + 
					"border: 1px solid black; } .sldImgs { max-width: " + maxwidth + "px; max-height: " + maxheight + "px; } " +
					"#sldLink { text-align: center; } #next{ float: right; } #prev { float: left; } #res { padding-right: 0px; margin-top: 0px; }" + 
					"#wikiHeader { font-size: 115%; background-color: #F0F7F9; padding-left: .2em; }" +
					"#wikiDesc { font-size: 75%; margin: 0px; padding: .2em; text-indent: 3em; border: 2px solid #F0F7F9; }" +
					"#wikiDiv { width: 580px; margin-top: -1px; margin-bottom: .5em; } " +
					".ts td { padding: 0px 0px 0px 17px; } ";
		GM_addStyle(ssheet);
	}
	
	// Applies css that is constant across all styles
	var genSS = "#greyOut { background-color: black; opacity: .6; width: 100%; height: 100%; z-index: 1000; position: fixed; top: 0px; left: 0px; } " + 
					"#gbLoader { position: absolute; top: 25px; right: 3px; } " +
					".confLbl { font-size: small; display: inline; } .opli { display: inline; } .confTab { margin: 0px; padding: 2px 4px; border: 1px solid black; } " +
					"#confWel, #styleWel { border-bottom: 1px solid black; font-size: 22pt; font-family: \"Times New Roman\", serif; text-align: center; background-color: #F0F7F9; -moz-border-radius-topleft: 5px; -moz-border-radius-topright: 5px;} " +
					"#slideShow { position: fixed; text-align: center; padding: 15px; top: 50%; left: 50%; z-index: 9998; background-color: white; border: 1px solid black; } " +
					".config_section_head { margin: 6px 0px; border-bottom: 1px solid grey; } #confWrap { height: 427px; border-bottom: 1px solid black; margin-bottom: 2px; } " +
					".sldImgs { display: block; } .embeddable { background-color: #FFFFFF; } .keycuts { width: 100%; } .keycuts em { text-decoration: underline; font-weight: bold; } " +
					".conf_Tab, #confTabs { background-color: #F0F7F9; } #t_AbtConf { background-color: #F0F7F9 !important; } " +
					"#hidePly { background-color: #FFFFFF; color: #FF0000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 50%; position: absolute; top: 0px; right: 0px; width: 1.1em; height: 1.1em; cursor: pointer; } " +
					"#confTabs { height: 19px; border-bottom: 1px solid #000000; position: relative; margin-bottom: 3px; } .conf_Tab { padding: 0px 0.5em .25em .5em; " + 
					"margin-top: 4px; border-bottom: 1px solid black; border-right: 1px solid black; display: inline; z-index: 10001; cursor: pointer; line-height: 16px; } " +
					".selected_tab { border-bottom-color: #FFFFFF; background-color: #FFFFFF; } .confTabOn { margin: .7em; } .confTabOn label { margin: .2em 0px; } .confTabOn button { margin: .5em 0px; } " + 
					"#t_AbtConf { border-color: #000000 !important; display: block; position: absolute; top: -4px; right: 0px; text-align: right; border-right-style: none; z-index: 10000; } " +
					"#AbtConf p { margin-top: 0px; } #deapallFault, #sNc { margin-left: .2em; } " +
					"#newVer { width: 200px; height: 1.3em; margin: -1.8em 0px 0px 8px; text-align: center; font-size: 85%; background-color: #CCCCFF; padding: 1px; } " +
					".GB_dialog_popup { position: fixed; left: 50%; top: 50%; width: 500px; height: 520px; margin-left: -250px; margin-top: -260px; z-index: 9999; background-color: white; border: 1px solid black; -moz-border-radius: 5px; } " +
					"#res { margin: 0px 8px; } #cnt { max-width: 100%; } " +
					"#ssb { height: auto; overflow: hidden; } " +
					"#wikLink { float: left; } .conf_subsect { margin-bottom: 10px; } " +
					".error { color:#FF0000; } ";
	if (options.oldSize) {
		genSS += "#sff .lst, #sff .lsb { font-size: small; height: auto; } ";
	}
	if (options.dym) { 
		genSS += "#dymTxt { float: left; } ";
	}
	if (options.margs) {
		genSS += "#gbar { padding-left: 8px; } .e, ";
	}
	if (options.sideads || options.sugges) {
		genSS += "#rhs, ";
	}
	genSS += ".removed, #preload { display: none !important; }";
	
	GM_addStyle(genSS);
	
	var msSS = "#currentSearch { margin-top: 0px !important; } " + 
				"#allSearches { border: 1px solid #0077CC; margin-top: 10px; background-color: #FFFFFF; z-index: 1000; float: left; } " +
				"#expand, #collapse { cursor: pointer; font-family: sans-serif; float: right; color: #0077CC; margin-right: 3px; margin-bottom: 2px; } " +
				"#collapse { font-size: 60%; padding-left: .3em; padding-right: .35em; } " +
				"#expand { font-size: 50%; padding-left: .2em; padding-right: .25em;  } " +
				".TabHead { font-size: 75%; color: #555555; margin: 0px; margin-left: 1em; display: inline; } " +
				".siteSelector { display: inline; margin-left: 1em; margin-bottom: 1em; } " +
				".searchBoxes { display: inline; margin-left: 1em; width: 50%; } " +
				".closeBtn { color: red; display: inline; margin: 0px; cursor: pointer; font-size: 50%; vertical-align: top; margin-left: .8em; } " +
				"#expandedMulti hr { margin: 1px; } " +
				"#adding { margin-left: 3em; cursor: pointer; font-size: 85%; color: blue; margin-top: -1em; } " +
				"#searchAll { font-size: normal; } " +
				"#otherSearchContent { margin-bottom: 44px; } " +
				".gac_m { z-index: 1500 !important; " + (options.styl != "center" ? "left: 151px !important;" : "") + " border: 1px solid #D0D0D0 !important; border-top-style: none !important; } " +
				".ts td { padding-left: 4px !important; } ";
	
	GM_addStyle(msSS);
	
	if(document.getElementsByClassName("g")[0]) {
		var lists = document.getElementsByClassName("g")[0].parentNode;
		lists.id = "resOL";
		dockShow = lists.parentNode;
	}
}
// Creates a basic right floating box of given id
function rightBox(idName) {
	return $create("div", {
		className : "rBox",
		id : idName
	});
}
// Greys out the page
function greydout() {
	var greyer = $create("div", {
		id : "greyOut",
		title : "Return to the main page"
	});
	document.body.appendChild(greyer);
	return greyer;
}
// Converts an html string into a working html tag
function stringtohtml(htmlstring) {
	var toHTML = $create("html", {
		innerHTML : htmlstring
	});
	return toHTML;
}
// Creates a player div used by both the video and image searchs
function makePlayer() {
	var bigBox = rightBox("mBox");
	var player = rightBox("pBox");
	// Sets the proper display text for an empty player
	if (options.styl == "center" && options.vids) {
		player.innerHTML = "<div id=\"playerTag\">Player</div>";
	} else if (options.styl == "center") {
		player.innerHTML = "<div id=\"playerTag\">Image</div>";
	} else if (options.vids && options.imgs) {
		player.textContent = "Please select either a Video or an image below to view it here.";
		player.className = player.className + " wBBord";
	} else if (options.vids) {
		player.textContent = "Please Select a video to view it here (if from compatable site)";
	} else {
		player.textContent = "Click on an image to view it here.";
	}
	bigBox.appendChild(player);
	if ($("res").childNodes) {
		$("res").insertBefore(bigBox, $("res").childNodes[0]);
	} else {
		$("res").appendChild(bigBox);
	}
	
	if (options.styl == "dock") {
		player.className = "removed";
	} else if (options.styl == "center" && options.imgs && options.vids) {
		var hidePlayer = $create("div", {
			id : "hidePly",
			textContent : "X"
		});
		hidePlayer.addEventListener("click", function (event) {
			removeAllChildren(player);
			player.className = "rBox closed";
		}, false);
		player.appendChild(hidePlayer);
	}
}
// Sets up the player for use
function setupPlayer(label) {
	player = $("pBox");
	removeAllChildren(player);
	var tagDiv = $create("div", {
		id : "playerTag",
		textContent : label
	});
	var hidePlayer = $create("div", {
		id : "hidePly",
		textContent : "X"
	});
	hidePlayer.addEventListener("click", function (event) {
		removeAllChildren(player);
		player.className = "rBox closed";
	}, false);
	player.appendChild(tagDiv);
	player.appendChild(hidePlayer);
}
	// End Display Functions -----------------------------------------------------------

	// Start Update Script ---------------------------------------------------------------
// Fetches script homepage to check for updates
function scriptPage() {
	var dt = new Date();
	if (options.newversion > parseFloat(version) && options.newversion != 0.0) {
		verNotice();
	} else if (Date.now() - options.updateCheck >= 86400000 || options.updateCheck === 0) {
		GM_setValue("updtTime", Date.now().toString());
		get("http://userscripts.org/scripts/show/33449", chckAgainst, unable);
	}
}
//Dummy function for errors
function unable(response) {}
// Checks the version number on the script homepage against this version number and informs if a newer version is available
function chckAgainst(response) {
	var spage = stringtohtml(response.responseText);
	var newest = parseFloat(spage.getElementsByTagName('code')[0].textContent);
	// Creates an install link if a newer version is available
	if (newest > version) {
		GM_setValue("newver", "" + newest);
		verNotice();
	}
}
// Displays a notification about a new update
function verNotice() {
	var divHolder = $create('div', {
		id : "newVer"
	});
	
	var uplink = $create("a", {
		href : "http://userscripts.org/scripts/source/33449.user.js",
		textContent : "Update Google Bump"
	});
	divHolder.appendChild(uplink);
	
	divHolder.appendChild($create("textNode", " | "));
	
	uplink = $create("a", {
		href : "http://userscripts.org/scripts/show/33449#full_description",
		textContent : "Change Log"
	});
	divHolder.appendChild(uplink);
	
	$("tsf").appendChild(divHolder);
}
	// End Update Script -----------------------------------------------------------------

/**
  *	General Purpose Color Picker
  */
// // Main Rectangle
// var c = document.createElement('canvas');
// c.width = 255;
// c.height = 255;
// c.style.position = 'relative';
// document.body.appendChild(c);
// var ctx = c.getContext('2d');

// var wtc = ctx.createLinearGradient(0,0,255,0);
// wtc.addColorStop(0, 'rgb(255,255,255)');
// wtc.addColorStop(1, 'rgb(255,0,0)');
// ctx.fillStyle = wtc;
// ctx.fillRect(0,0,255,255);
// var btw = ctx.createLinearGradient(0,0,0,255);
// btw.addColorStop(0,'rgba(255,255,255,0)');
// btw.addColorStop(1,'black');
// ctx.fillStyle = btw;
// ctx.fillRect(0,0,255,255);

// // Color Bar
// var cbar = document.createElement('canvas');
// cbar.width = 40;
// cbar.height = 255;
// cbar.style.position = 'relative';
// document.body.appendChild(cbar);
// var cbtx = cbar.getContext('2d');
// var rtr = cbtx.createLinearGradient(0,0,0,255);
// rtr.addColorStop(0, 'rgb(255,0,0)');
// rtr.addColorStop(1/6, 'rgb(255,255,0)');
// rtr.addColorStop(1/3, 'rgb(0,255,0)');
// rtr.addColorStop(1/2, 'rgb(0,255,255)');
// rtr.addColorStop(2/3, 'rgb(0,0,255)');
// rtr.addColorStop(5/6, 'rgb(255,0,255)');
// rtr.addColorStop(1, 'rgb(255,0,0)');
// cbtx.fillStyle = rtr;
// cbtx.fillRect(10,0,20,255);

// function color_click(e) {
	// var data = ctx.getImageData(e.layerX, e.layerY, 1, 1).data;
	// var nc = document.createElement("canvas");
	// nc.width = 50;
	// nc.height = 50;
	// var ncx = nc.getContext("2d");
	// ncx.fillStyle = "rgb(" + data[0] + "," + data[1] + "," + data[2] + ")";
	// ncx.fillRect(0, 0, 50, 50);
	// document.body.appendChild(nc);
// }

// function color_pick(e) {
	// if(e.layerX >= 10 && e.layerX < 30) {
		// var data = cbtx.getImageData(e.layerX, e.layerY, 1, 1).data;
		// var wtc = ctx.createLinearGradient(0,0,255,0);
		// wtc.addColorStop(0, 'rgb(255,255,255)');
		// wtc.addColorStop(1, 'rgb(' + data[0] + ',' + data[1] + ',' + data[2] + ')');
		// ctx.fillStyle = wtc;
		// ctx.fillRect(0,0,255,255);
		// var btw = ctx.createLinearGradient(0,0,0,255);
		// btw.addColorStop(0,'rgba(255,255,255,0)');
		// btw.addColorStop(1,'black');
		// ctx.fillStyle = btw;
		// ctx.fillRect(0,0,255,255);
	// }
// }

function color_picker(color) {
	
	this.clickHandles = [];
	this.color = color;
	this.bwCanvas;
	this.bwCtx;
	this.cbCanvas;
	this.cbCtx;
	this.container;
	
	this.draw = function (parentNode) {
		this.container = $create('div', {
			'className' : 'colorContainer'
		});
		this.drawBW(this.color);
		this.drawCB();
		
		parentNode.appendChild(this.container);
	};
	
	this.drawBW = function (tone) {
		if(!tone) {
			tone = '255,0,0';
		}
		
		this.bwCanvas = $create('canvas', {
			'className' : 'colorToneToBlack'
		});
		this.bwCanvas.width = 255;
		this.bwCanvas.height = 255;
		this.bwCanvas.style.position = 'relative';
		this.container.appendChild(this.bwCanvas);
		this.bwCtx = this.bwCanvas.getContext('2d');
		
		this.redrawBW(tone);
		
		var SR = this;
		this.bwCanvas.addEventListener('click', function (e) { SR.clickDelegate(e) }, false);
	};
	
	this.redrawBW = function (tone) {
		var wtc = this.bwCtx.createLinearGradient(0,0,255,0);
		wtc.addColorStop(0, 'rgb(255,255,255)');
		wtc.addColorStop(1, 'rgb(' + tone + ')');
		this.bwCtx.fillStyle = wtc;
		this.bwCtx.fillRect(0,0,255,255);
		var btw = this.bwCtx.createLinearGradient(0,0,0,255);
		btw.addColorStop(0,'rgba(255,255,255,0)');
		btw.addColorStop(1,'rgb(0,0,0)');
		this.bwCtx.fillStyle = btw;
		this.bwCtx.fillRect(0,0,255,255);
	};
	
	this.drawCB = function () {
		// Color Bar
		this.cbCanvas = $create('canvas', {
			'className' : 'colorBar'
		});
		this.cbCanvas.width = 40;
		this.cbCanvas.height = 255;
		this.cbCanvas.style.position = 'relative';
		this.container.appendChild(this.cbCanvas);
		this.cbCtx = this.cbCanvas.getContext('2d');
		var rtr = this.cbCtx.createLinearGradient(0,0,0,255);
		rtr.addColorStop(0, 'rgb(255,0,0)');
		rtr.addColorStop(1/6, 'rgb(255,255,0)');
		rtr.addColorStop(1/3, 'rgb(0,255,0)');
		rtr.addColorStop(1/2, 'rgb(0,255,255)');
		rtr.addColorStop(2/3, 'rgb(0,0,255)');
		rtr.addColorStop(5/6, 'rgb(255,0,255)');
		rtr.addColorStop(1, 'rgb(255,0,0)');
		this.cbCtx.fillStyle = rtr;
		this.cbCtx.fillRect(10,0,20,255);
		
		var SR = this;
		this.cbCanvas.addEventListener('click', function (e) { SR.colorPick(e) }, false);
	};
	
	this.colorPick = function (e) {
		var data = this.cbCtx.getImageData(e.layerX, e.layerY, 1, 1).data;
		
		this.color = data[0] + ',' + data[1] + ',' + data[2];
		this.redrawBW(this.color);
	};
	
	this.clickDelegate = function (e) {
		var data = this.bwCtx.getImageData(e.layerX, e.layerY, 1, 1).data;
		var selection = data[0] + ',' + data[1] + ',' + data[2];
		
		for(var cd = 0; cd < this.clickHandles.length; cd++) {
			this.clickHandles[cd](e, selection);
		}
	};
	
	this.registerClick = function (func) {
		this.clickHandles.push(func);
	};
	
	this.unregisterClick = function (func) {
		if(func) {
			for(var ch = 0; ch < this.clickHandles.length; ch++) {
				if(func == this.clickHandles[ch]) {
					this.clickHandles.splice(ch, 1);
					break;
				}
			}
		} else {
			this.clickHandles = [];
		}
	};
	
	this.undraw = function () {
		$remove(this.container);
	};
}

// c.addEventListener('click', color_click, false);
// cbar.addEventListener('click', color_pick, false);
/**
  *	Import dependencies
  *	
  *	@depends color-picker.js
  */
  
function config_tab(title, id, on) {
	
	this.title = title;
	this.id = id;
	this.tab;
	this.siblings = on && on.siblings.push(this) ? on.siblings : new Array(this);
	this.on = on ? on : this;
	
	this.draw = function (parentNode) {
		
		this.tab = $create("div", {
			className : this.on == this ? "conf_Tab selected_tab" : "conf_Tab",
			id : this.id,
			textContent : this.title
		});
		
		var self = this;
		this.tab.addEventListener("click", function (event) {
			self.goTo();
		}, false);
		
		parentNode.appendChild(this.tab);
	};
	
	this.goTo = function () {
		$(this.on.tab.id.substr(2)).className = "removed";
		this.on.tab.className = "conf_Tab";
		
		$(this.tab.id.substr(2)).className = "confTabOn";
		this.tab.className = "conf_Tab selected_tab";
		
		for (i = this.siblings.length - 1; i >= 0; i--) {
			this.siblings[i].on = this;
		}
	};
}

function config_window(tab, id) {
	
	this.tab = tab;
	this.id = id;
	this.window;
	this.sections = new Array();
	
	this.draw = function (parentNode) {
		this.window = $create("div", {
			className : this.tab.on == this.tab ? "confTabOn" : "removed",
			id : this.id
		});
		var ckcount = 0;
		for (var so = 0; so < this.sections.length; so++) {
			this.sections[so].draw(this.window);
			ckcount+= this.sections[so].checkboxes;
		}
		
		if (ckcount >= 2) {
			var SR = this;
			var select = new button("Select All", function () { SR.SelectAll(); });
			select.draw(this.window);
			var deselect = new button("Deselect All", function () { SR.DeselectAll(); });
			deselect.draw(this.window);
		}
			
		parentNode.appendChild(this.window);
	};
	
	this.SelectAll = function () {
		for (var so = 0; so < this.sections.length; so++) {
			this.sections[so].SelectAll();
		}
	};
	
	this.DeselectAll = function () {
		for (var so = 0; so < this.sections.length; so++) {
			this.sections[so].DeselectAll();
		}
	};
	
	this.setDefaults = function () {
		for (var so = 0; so < this.sections.length; so++) {
			this.sections[so].setDefaults();
		}
	};
}

function config_section(title) {
	
	this.title = title ? title : "";
	this.sectionOptions = new Array();
	this.checkboxes = 0;
	this.selectboxes = 0;
	
	this.draw = function (parentNode) {
		var sect = $create("div", {
			className : "conf_subsect"
		});
		if(this.title != "") {
			var hdng = $create("h3", {
				textContent : this.title,
				className : "config_section_head"
			});
			sect.appendChild(hdng);
		}
		for (var soo = 0; soo < this.sectionOptions.length; soo++) {
			this.sectionOptions[soo].draw(sect);
			if(this.sectionOptions[soo].box) {
				this.checkboxes++;
			} else {
				this.selectboxes++;
			}
		}
		parentNode.appendChild(sect);
	};
	
	this.SelectAll = function () {
		for (var so = 0; so < this.sectionOptions.length; so++) {
			if(this.sectionOptions[so].box) {
				this.sectionOptions[so].box.checked = true;
			}
		}
	};
	
	this.DeselectAll = function () {
		for (var so = 0; so < this.sectionOptions.length; so++) {
			if(this.sectionOptions[so].box) {
				this.sectionOptions[so].box.checked = false;
			}
		}
	};
	
	this.setDefaults = function () {
		for (var so = 0; so < this.sectionOptions.length; so++) {
			this.sectionOptions[so].setDefault();
		}
	};
}
	
function config_desc_section(title, content) {
	
	this.title = title ? title : "";
	this.content = typeof content == "string" ? $create('p', { textContent : content }) : content;
	
	this.draw = function (parentNode) {
		var sect = $create("div", {
			className : "conf_subsect"
		});
		if(this.title != "") {
			var hdng = $create("h3", {
				textContent : this.title,
				className : "config_section_head"
			});
			sect.appendChild(hdng);
		}
		sect.appendChild(this.content);
		parentNode.appendChild(sect);
	};
	
	this.SelectAll = function () {
		return;
	};
	
	this.DeselectAll = function () {
		return;
	};
	
	this.setDefaults = function () {
		return;
	};
}

function config_checkBox(label, id, dflt) {
	
	this.label = label;
	this.id = id;
	this.value = GM_getValue(id, dflt);
	this.defaultVal = dflt;
	this.box;
	
	this.draw = function (parentNode) {
		var lbl = $create("label", {
			textContent : this.label + ": ",
			"for" : this.id
		});
		this.box = $create("input",{
			type : "checkbox",
			name : this.id,
			id : this.id
		});
		if (this.value) {
			this.box.checked = true;
		}
		this.box.addEventListener("change", function(event) {
			GM_setValue(event.target.id, event.target.checked); 
		}, true);
		
		parentNode.appendChild(lbl);
		parentNode.appendChild(this.box);
		parentNode.appendChild($create("br"));
	};
	
	this.setDefault = function () {
		if (this.box) {
			this.box.checked = this.defaultVal;
			GM_setValue(this.id, this.defaultVal);
		}
	};
}

function config_selectionBox(label, id, op_labels, op_values, dflt) {
	
	this.label = label;
	this.id = id;
	this.currentValue = GM_getValue(id, dflt);
	this.defaultVal = dflt;
	this.options = op_labels;
	this.values = op_values;
	this.list;
	
	this.draw = function (parentNode) {
		var disp = $create("p", {
			textContent : this.label + ": ",
			className : "confLbl"
		});
		this.list = $create("select", {
			name : this.id,
			className : "opli"
		});
		var SR = this;
		this.list.addEventListener("change", function(event) { 
			GM_setValue(SR.list.name, SR.list.value);
		}, true);
		// Creates the desired Options with the given  values and ids
		for (var lo = 0; lo < this.options.length; lo++) {
			var op = $create("option", {
				textContent : this.options[lo],
				value : this.values[lo],
				id : this.id + "_" + lo
			});
			if (this.values[lo] == this.currentValue) {
				op.selected = true;
			}
			this.list.appendChild(op);
		}
		
		parentNode.appendChild(disp);
		parentNode.appendChild(this.list);
		parentNode.appendChild($create("br"));
	};
	
	this.setDefault = function () {
		if (this.list) {
			this.list.value = this.defaultVal;
			GM_setValue(this.id, this.defaultVal);
		}
	};
}

function config_colorBox(label, id, dflt) {
	
	this.label = label;
	this.id = id;
	this.currentValue = GM_getValue(id, dflt);
	this.defaultVal = dflt;
	this.box;
	this.popout;
	
	this.draw = function (parentNode) {
		var disp = $create("p", {
			textContent : this.label + ": ",
			className : "confLbl"
		});
		this.box = $create("div", {
			name : this.id,
			className : "configColorBox"
		});
		this.box.style.backgroundColor = 'rgb(' + this.currentValue + ')';
		
		this.popout = popupManager.newColor();
		
		var SR = this;
		this.box.addEventListener("click", function(event) { 
			popupManager.closeColor();
			SR.popout.draw(SR.box);
		}, true);
		// // Creates the desired Options with the given  values and ids
		// for (var lo = 0; lo < this.options.length; lo++) {
			// var op = $create("option", {
				// textContent : this.options[lo],
				// value : this.values[lo],
				// id : this.id + "_" + lo
			// });
			// if (this.values[lo] == this.currentValue) {
				// op.selected = true;
			// }
			// this.list.appendChild(op);
		// }
		
		parentNode.appendChild(disp);
		parentNode.appendChild(this.box);
		parentNode.appendChild($create("br"));
	};
	
	this.setDefault = function () {
		if (this.list) {
			this.list.value = this.defaultVal;
			GM_setValue(this.id, this.defaultVal);
		}
	};
}

function button(value, action) {
	
	this.val = value;
	this.btn;
	this.action = action;
	
	this.draw = function (parentNode) {
		this.btn = $create("input", {
			type : 'button',
			value : this.val
		});
		
		var SR = this;
		this.btn.addEventListener("click", function () {
			SR.action();
		}, false);
		
		parentNode.appendChild(this.btn);
	}
	
	this.undraw = function () {
		$remove(this.btn);
		this.btn = SET_UNDEFINED;
	}
}

/**
  *	Import dependencies
  *	
  *	@depends dialog-pieces.js
  */
/**	=================================================================
  *	Dialogs
  *	=================================================================
  */

function popup_manager () {
	
	this.popup = [];
	this.colorPopup = [];
	
	this.newSlideShow = function () {
		return this.newPopup(3);
	};
	
	this.newStyler = function () {
		return this.newPopup(1);
	};
	
	this.newConfig = function () {
		return this.newPopup(0);
	}
	
	this.newColor = function (tone) {
		var cp = new color_picker(tone);
		this.popup.push(cp);
		this.colorPopup.push(cp);
		return cp;
	}
	
	this.newPopup = function (type) {
		var nPop = new popup_dialog(type);
		nPop.init();
		this.popup.push(nPop);
		return nPop;
	};
	
	this.closeAll = function () {
		for(var p = 0; p < this.popup.length; p++) {
			this.popup[p].undraw();
		}
	};
	
	this.closeColor = function () {
		for(var p = 0; p < this.colorPopup.length; p++) {
			this.colorPopup[p].undraw();
		}
	};
	
	this.readySwitch = function () {
		for(var p = 0; p < this.popup.length; p++) {
			this.popup[p].undraw_dialog();
		}
	};
}

/**	popup_dialog
  *	Popup Dialog Object (Interface Substitute)
  *	
  *	Construction Parameters
  *		box_type	Type of popup dialog to create
  *			-	0		Configuration
  *			-	1		Styling Options
  *			-	2		About Dialog
  *			-	3		Slideshow
  *			-	4		Video Popup
  *			-	Other	Error
  *	
  *	Functions
  *		init
  *			Initializes the dialog
  *		
  *		draw
  *			Initializes and draws or redraws the dialog
  *		
  *		draw_shader
  *			Draws the shading on the page to cover the page
  *		
  *		undraw
  *			Undraw the dialog and shader
  *		
  *		undraw_dialog
  *			Undraw only the dialog
  *		
  *		undraw_shader
  *			Undraw only the shader
  *		
  *		is_drawn
  *			<= Return Boolean =>	If dialog is currently drawn
  *	
  */
function popup_dialog(box_type) {
	
	this.shader;
	this.dialog;
	this.dialog_type = box_type;
	this.initd = false;
	
	this.init = function () {
		if(this.dialog_type == 0) {
			this.dialog = new config_dialog(this);
		} else if(this.dialog_type == 1) {
			this.dialog = new style_dialog(this);
		} else if(this.dialog_type == 2) {
			this.draw_about();
		} else if(this.dialog_type == 3) {
			this.dialog = new slideshow_dialog(this);
		} else {
			this.draw_error();
		}
		this.initd = true;
	}
	
	this.draw = function (pass) {
		if(Number.NaN != this.dialog_type) {
			if(this.dialog && this.dialog.isDrawn) {
				this.undraw_dialog();
			}
			if(!this.shader) {
				this.draw_shader();
			}
			
			if(!this.initd) {
				this.init();
			}
			
			this.dialog.draw(pass);
		}
		
	};
	
	this.draw_shader = function() {
		this.shader = $create("div", {
			id : "greyOut",
			title : "Return to the main page"
		});
		document.body.appendChild(this.shader);
		var SR = this;
		this.shader.addEventListener("click", function (e) {
			SR.undraw_shader();
			if (SR.dialog_type == 0 || SR.dialog_type == 1) {
				location.reload();
			}
		}, false);
	};
	
	this.undraw = function() {
		this.undraw_dialog();
		this.undraw_shader();
	}
	
	this.undraw_dialog = function () {
		this.dialog.undraw();
	};
	
	this.undraw_shader = function () {
		if(this.dialog.isDrawn) {
			this.undraw_dialog();
		}
		
		$remove(this.shader);
		this.shader = SET_UNDEFINED;
	};
	
	this.is_drawn = function () {
		return this.shader && this.dialog.isDrawn;
	};
};

function style_dialog(popup) {
	
	this.dialog;
	this.windows = new Array();
	this.isDrawn = false;
	this.popup = false;
	
	this.draw = function () {
		var centDivStyl = $create("div", {
			id : "styleGoogBump",
			className : "GB_dialog_popup"
		});
		
		// The heading to the configuration page
		var welcome = $create("h1", {
			textContent : "Google Bump Styles",
			id : "styleWel"
		});
		
		// Wrappers for the content
		var tabHead = $create("div", {
			id : "confTabs"
		});
		var wrapper = $create("div", {
			id : "confWrap"
		});
		var btnwrap = $create("div", {
			id : "confBtnWrap"
		});
		
		// Creates and appends the navigation tabs
		var genTab = new config_tab("General", "t_GenStyl");
		var clcTab = new config_tab("Classic", "t_ClscStyl", genTab);
		var mdaTab = new config_tab("Media", "t_MdaStyl", genTab);
		var dckTab = new config_tab("Dock", "t_DockStyl", genTab);
		var cntTab = new config_tab("Center", "t_CentStyl", genTab);
		
		genTab.draw(tabHead);
		clcTab.draw(tabHead);
		mdaTab.draw(tabHead);
		dckTab.draw(tabHead);
		cntTab.draw(tabHead);
		
		// Appearance Settings
		var app_set_window = new config_window(clcTab, "ClscStyl");
			// Settings
		var app_section = new config_section();
		app_section.sectionOptions.push(new config_desc_section('Coming Soon', 'This section is still under construction. Please excuse our mess.'));
		app_set_window.sections.push(app_section);
		
		// Image Search Settings
		var img_set_window = new config_window(mdaTab, "MdaStyl");
			// Genearl Settings
		var img_section = new config_section();
		img_section.sectionOptions.push(new config_desc_section('Coming Soon', 'This section is still under construction. Please excuse our mess.'));
		img_set_window.sections.push(img_section);
		
		// Video Search Settings
		var vid_set_window = new config_window(dckTab, "DockStyl");
			// Genearl Settings
		var vid_section = new config_section();
		vid_section.sectionOptions.push(new config_desc_section('Coming Soon', 'This section is still under construction. Please excuse our mess.'));
		vid_set_window.sections.push(vid_section);
		
		// Other Settings
		var other_set_window = new config_window(cntTab, "CentStyl");
			// Advanced
		var adv_section = new config_section();
		adv_section.sectionOptions.push(new config_desc_section('Coming Soon', 'This section is still under construction. Please excuse our mess.'));
		other_set_window.sections.push(adv_section);
		
		// General Settings
		var gen_set_window = new config_window(genTab, "GenStyl");
			// Searches
		var otr_section = new config_section("Style");
		otr_section.sectionOptions.push(new config_selectionBox("Layout Style", "style", ["Classic", "Media", "Dock", "Columns", "Centered"], ["classic", "media", "dock", "column", "center"], options.DEFAULT_STYL));
		otr_section.sectionOptions.push(new config_colorBox('Background Color','bgcolor','240,247,249'));
		gen_set_window.sections.push(otr_section);
		
		// Draw the windows
		app_set_window.draw(wrapper);
		img_set_window.draw(wrapper);
		vid_set_window.draw(wrapper);
		other_set_window.draw(wrapper);
		gen_set_window.draw(wrapper);
		
		// Push them to the windows array
		this.windows.push(app_set_window);
		this.windows.push(img_set_window);
		this.windows.push(vid_set_window);
		this.windows.push(other_set_window);
		this.windows.push(gen_set_window);
		
		// Save and default buttons
		var SR = this;
		var savebtn = new button("Save", function () { SR.popup.undraw(); location.reload(); });
		var defbtn = new button("Defaults", function () { SR.setDefaults(); });
		savebtn.draw(btnwrap);
		defbtn.draw(btnwrap);
		
		// Appending of all the configurations
		centDivStyl.appendChild(welcome);
		centDivStyl.appendChild(tabHead);
		centDivStyl.appendChild(wrapper);
		centDivStyl.appendChild(btnwrap);
		document.body.appendChild(centDivStyl);
		
		this.dialog = centDivStyl;
		this.isDrawn = true;
	};
	
	this.undraw = function () {
		if (this.isDrawn) {
			$remove(this.dialog);
			this.isDrawn = false;
		}
	};
	
}

function config_dialog(popup) {
	
	this.dialog;
	this.windows = new Array();
	this.isDrawn = false;
	this.popup = popup;
	
	this.draw = function () {
		var centDivConf = $create("div", {
			id : "confGoogBump",
			className : "GB_dialog_popup"
		});
		
		// The heading to the configuration page
		var welcome = $create("h1", {
			textContent : "Google Bump Configuration",
			id : "confWel"
		});
		
		// Wrappers for the content
		var tabHead = $create("div", {
			id : "confTabs"
		});
		var wrapper = $create("div", {
			id : "confWrap"
		});
		var btnwrap = $create("div", {
			id : "confBtnWrap"
		});
		
		// Creates and appends the navigation tabs
		var genTab = new config_tab("General", "t_GenConf");
		var abtTab = new config_tab("Created by KTaSh", "t_AbtConf", genTab);
		var appTab = new config_tab("Visual", "t_AppConf", genTab);
		var imgTab = new config_tab("Images", "t_ImgConf", genTab);
		var vidTab = new config_tab("Videos", "t_VidConf", genTab);
		var otrTab = new config_tab("Advanced", "t_OtrConf", genTab);
		
		abtTab.draw(tabHead);
		genTab.draw(tabHead);
		appTab.draw(tabHead);
		imgTab.draw(tabHead);
		vidTab.draw(tabHead);
		otrTab.draw(tabHead);
		
		// About Us Section
		var fieldsabt = $create("div");
		fieldsabt.id = "AbtConf";
		fieldsabt.className = "removed";
		var nwp = $create("p");
		nwp.textContent = "Google Bump was created by me, KTaSh. Any piece of this code can be used by anyone for " + 
								"any reason. However, if you do use it, I do ask that you let me know. I'd just like " +
								"to see what you have done with it. Also, please extend this same courtesy, for at least " +
								"this bit of code, to others. The source for this code can be found ";
		fieldsabt.appendChild(nwp);
		var linkToScript = $create("a");
		linkToScript.textContent = "here.";
		linkToScript.href = "http://userscripts.org/scripts/review/33449";
		nwp.appendChild(linkToScript);
		var sig = $create("p");
		sig.textContent = "KTaSh";
		fieldsabt.appendChild(sig);
		var abtver = $create("p");
		abtver.textContent = "Version : " + version;
		fieldsabt.appendChild(abtver);
		
		// Appearance Settings
		var app_set_window = new config_window(appTab, "AppConf");
			// Settings
		var app_section = new config_section("Features");
		app_section.sectionOptions.push(new config_checkBox("Add Margins", "margs", options.DEFAULT_MARGS));
		app_section.sectionOptions.push(new config_checkBox("Remove Suggestions", "sugges", options.DEFAULT_SUGGES));
		app_section.sectionOptions.push(new config_checkBox("Move \"Did you mean\" text", "dym", options.DEFAULT_DYM));
		app_section.sectionOptions.push(new config_checkBox("Remove Sidebar Ads", "sideads", options.DEFAULT_SIDEADS));
		app_set_window.sections.push(app_section);
		app_set_window.sections.push(new config_desc_section("Styles", "Styles can now be configured in the style menu. If keyboard shortcuts are enabled, you can use CTRL + SHIFT + Y to access, otherwise you can get to it the same way you access this menu."));
		//app_section.sectionOptions.push(new config_selectionBox("Layout Style", "style", ["Classic", "Media", "Dock", "Columns", "Centered"], ["classic", "media", "dock", "column", "center"], options.DEFAULT_STYL));
		
		// Image Search Settings
		var img_set_window = new config_window(imgTab, "ImgConf");
			// Genearl Settings
		var img_section = new config_section("Sidebar Options");
		img_section.sectionOptions.push(new config_checkBox("Search For Images", "imgs", options.DEFAULT_IMGS));
		img_section.sectionOptions.push(new config_checkBox("Show in player", "imgPlyr", options.DEFAULT_IMGPLYR));
		img_section.sectionOptions.push(new config_selectionBox("Number of pages to load", "imgPages", ["1 Pages","2 Pages","3 Pages","4 Pages","5 Pages","7 Pages","10 Pages"], [1, 2, 3, 4, 5, 7, 10], options.DEFAULT_IMGPGS));
		img_section.sectionOptions.push(new config_selectionBox("Image display size", "imgSize", ["Titles Only","Small","Medium","Large", "Details"], ["title", "small", "medium", "large", "details"], options.DEFAULT_IMGSIZE));
		img_set_window.sections.push(img_section);
			// Slideshow Settings
		var sld_section = new config_section("SlideShow Options");
		sld_section.sectionOptions.push(new config_checkBox("Enable Slideshow", "sldshw", options.DEFAULT_SLDSHW));
		sld_section.sectionOptions.push(new config_checkBox("Pause while image is loading", "imgLoad", options.DEFAULT_IMGLOAD));
		sld_section.sectionOptions.push(new config_checkBox("Skip images that cannot be loaded", "skipErr", options.DEFAULT_SKIPERR));
		sld_section.sectionOptions.push(new config_selectionBox("Display images in slideshow for", "sldtm", ["1 Second","2 Second","3 Second","4 Second","5 Second","7 Second","10 Second"], [1000, 2000, 3000, 4000, 5000, 7000, 10000], options.DEFAULT_SLDTM));
		img_set_window.sections.push(sld_section);
		
		// Video Search Settings
		var vid_set_window = new config_window(vidTab, "VidConf");
			// Genearl Settings
		var vid_section = new config_section("Sidebar Options");
		vid_section.sectionOptions.push(new config_checkBox("Search For Videos", "vids", options.DEFAULT_VIDS));
		vid_section.sectionOptions.push(new config_checkBox("Remove Videos from Search Results", "exvids", options.DEFAULT_EXVIDS));
		vid_set_window.sections.push(vid_section);
			// Embed Settings
		var emd_section = new config_section("Embed Options");
		emd_section.sectionOptions.push(new config_checkBox("Embed videos (when available)", "embd", options.DEFAULT_EMBD));
		emd_section.sectionOptions.push(new config_checkBox("Play in HD (when available)", "hdvd", options.DEFAULT_HDVD));
		emd_section.sectionOptions.push(new config_checkBox("Enable Fullscreen (when available)", "fsvd", options.DEFAULT_FSVD));
		emd_section.sectionOptions.push(new config_checkBox("Autoplay (when available)", "apvd", options.DEFAULT_APVD));
		emd_section.sectionOptions.push(new config_checkBox("Loop Videos (when available)", "lpvd", options.DEFAULT_LPVD));
		emd_section.sectionOptions.push(new config_checkBox("Closed Captions (when available)", "ccvd", options.DEFAULT_CCVD));
		emd_section.sectionOptions.push(new config_checkBox("Enable Privacy Mode (when available)", "pmvd", options.DEFAULT_PMVD));
		emd_section.sectionOptions.push(new config_checkBox("Youtube Annotations", "ivvd", options.DEFAULT_IVVD));
		vid_set_window.sections.push(emd_section);
		
		// Other Settings
		var other_set_window = new config_window(otrTab, "OtrConf");
			// Advanced
		var adv_section = new config_section();
		adv_section.sectionOptions.push(new config_selectionBox("Millisecond delay for page (Only change if you have load issues)", "delay", ["100 ms","200 ms","300 ms","400 ms","500 ms","700 ms","1000 ms"], [100, 200, 300, 400, 500, 700, 1000], options.DEFAULT_DELAY));
		other_set_window.sections.push(adv_section);
		
		// General Settings
		var gen_set_window = new config_window(genTab, "GenConf");
			// Searches
		var otr_section = new config_section("Searches");
		otr_section.sectionOptions.push(new config_checkBox("Wikipedia", "wiki", options.DEFAULT_WIKI));
		gen_set_window.sections.push(otr_section);
			// Settings
		var gen_section = new config_section("Functionality");
		gen_section.sectionOptions.push(new config_checkBox("Open All Links in New Tabs", "tabs", options.DEFAULT_TABS));
		gen_section.sectionOptions.push(new config_checkBox("Use MultiSearch", "scuts", options.DEFAULT_SCUTS));
		gen_section.sectionOptions.push(new config_checkBox("Use Old Button Size", "oldSize", options.DEFAULT_OLDSIZE));
		gen_section.sectionOptions.push(new config_checkBox("Enable Keyboard Shorcuts", "keyd", options.DEFAULT_KEYD));
		gen_set_window.sections.push(gen_section);
			// Keyboard Shortcut list
		var kydv = $create('div', {
			textContent : 'Keyboard shortcuts:'
		});
		var kytbl = $create('table', { className : 'keycuts' } );
		var skeys = {
			'_O_ptions' : 'CTRL + SHIFT + O',
			//'St_y_ler' : 'CTRL + SHIFT + Y',
			'Start Sl_i_deshow' : 'CTRL + SHIFT + I',
			'Jump to Se_a_rch' : 'CTRL + SHIFT + A',
			'Expand M_u_ltiSearch Box' : 'CTRL + SHIFT + U'
		};
		for (action in skeys) {
			var kytr = $create('tr');
			var act_fmt = action.split("_");
			var kytd = $create('td', { textContent : act_fmt[0] } );
			kytd.appendChild($create('em', { textContent : act_fmt[1] } ));
			kytd.innerHTML += act_fmt[2];
			kytr.appendChild(kytd);
			kytr.appendChild($create('td', { textContent : skeys[action] } ));
			kytbl.appendChild(kytr);
		}
		var cut_list_section = new config_desc_section("Keyboard Shortcuts", kytbl);
		gen_set_window.sections.push(cut_list_section);
		
		// Draw the windows
		app_set_window.draw(wrapper);
		img_set_window.draw(wrapper);
		vid_set_window.draw(wrapper);
		other_set_window.draw(wrapper);
		gen_set_window.draw(wrapper);
		
		// Push them to the windows array
		this.windows.push(app_set_window);
		this.windows.push(img_set_window);
		this.windows.push(vid_set_window);
		this.windows.push(other_set_window);
		this.windows.push(gen_set_window);
		
		// Save and default buttons
		var SR = this;
		var savebtn = new button("Save", function () { SR.popup.undraw(); location.reload(); });
		var defbtn = new button("Defaults", function () { SR.setDefaults(); });
		savebtn.draw(btnwrap);
		defbtn.draw(btnwrap);
		
		// Appending of all the configurations
		centDivConf.appendChild(welcome);
		centDivConf.appendChild(tabHead);
		wrapper.appendChild(fieldsabt);
		centDivConf.appendChild(wrapper);
		centDivConf.appendChild(btnwrap);
		document.body.appendChild(centDivConf);
		
		this.dialog = centDivConf;
		this.isDrawn = true;
	};
	
	this.undraw = function () {
		if (this.isDrawn) {
			$remove(this.dialog);
			this.isDrawn = false;
		}
	}
	
	this.setDefaults = function () {
		for (var wo = 0; wo < this.windows.length; wo++) {
			this.windows[wo].setDefaults();
		}
	};
}

function slideshow_dialog(popup) {
	
	this.dialog;
	this.interval;
	this.images = new Array();
	this.onImage = -1;
	this.toWait = options.sldTm;
	this.isDrawn = false;
	this.isPlaying = false;
	this.waitForLoad;
	this.holder;
	this.popup = popup;
	this.psBtn;
	
	this.add_image = function (img) {
		this.images.push($create('img', {
			className : 'sldImgs',
			src : decodeURI(img.link),
			alt : img.title
		}));
	};
	
	this.draw = function (imgOn) {
		this.dialog = $create('div', {
			id : 'slideShow'
		});
		
		this.holder = $create('div', {
			id : 'slideHolder'
		});
		
		this.dialog.appendChild(this.holder);
		
		var SR = this;
		var pvBtn = new button('<<', function () {
			SR.pause();
			SR.prevImage();
		});
		pvBtn.draw(this.dialog);
		this.psBtn = new button('Pause', function () {
			if (this.btn.value == 'Pause') {
				SR.pause();
			} else {
				SR.play();
			}
		});
		this.psBtn.draw(this.dialog);
		var nxBtn = new button('>>', function () {
			SR.pause();
			SR.nextImage();
		});
		nxBtn.draw(this.dialog);
		
		this.isDrawn = true;
		
		document.body.appendChild(this.dialog);
		
		this.play();
		this.nextImage(imgOn);
	};
	
	this.undraw = function () {
		if(this.isDrawn) {
			clearInterval(this.interval);
			this.images[this.onImage].removeEventListener("load", this.waitForLoad, false);
			$remove(this.dialog);
			this.isDrawn = false;
			this.onImage = -1;
		}
	};
	
	this.nextImage = function (imgGoTo) {
		if(this.onImage >= 0) {
			this.holder.removeChild(this.images[this.onImage]);
			this.images[this.onImage].removeEventListener("load", this.waitForLoad, false);
		}
		
		if(!imgGoTo || !isFinite(imgGoTo) || imgGoTo < 0) {
			this.onImage++;
		} else {
			this.onImage = imgGoTo;
		}
		
		if(this.onImage >= this.images.length) {
			this.onImage = 0;
		}
		this.holder.appendChild(this.images[this.onImage]);
		this.dialog.style.marginLeft = "-" + (this.images[this.onImage].width / 2 + 16) + "px";
		this.dialog.style.marginTop = "-" + (this.images[this.onImage].height / 2 + 31) + "px";
		
		var SR = this;
		if (!this.images[this.onImage].complete && options.imgLoad && this.isPlaying) {
			this.pause();
			this.waitForLoad = function () {
				SR.play();
				SR.dialog.style.marginLeft = "-" + (SR.images[SR.onImage].width / 2 + 16) + "px";
				SR.dialog.style.marginTop = "-" + (SR.images[SR.onImage].height / 2 + 31) + "px";
			};
			this.images[this.onImage].addEventListener("load", SR.waitForLoad, false);
		} else if (!this.images[this.onImage].complete) {
			this.waitForLoad = function () {
				SR.dialog.style.marginLeft = "-" + (SR.images[SR.onImage].width / 2 + 16) + "px";
				SR.dialog.style.marginTop = "-" + (SR.images[SR.onImage].height / 2 + 31) + "px";
			};
			this.images[this.onImage].addEventListener("load", SR.waitForLoad, false);
		}
		
		if(this.images[this.onImage].complete && (this.images[this.onImage].width == 0 || this.images[this.onImage].height == 0) && options.skipErr) {
			this.nextImage();
		}
	};
	
	this.prevImage = function () {
		if(this.onImage >= 0) {
			this.holder.removeChild(this.images[this.onImage]);
		}
		this.onImage--;
		if(this.onImage < 0) {
			this.onImage = this.images.length - 1;
		}
		this.holder.appendChild(this.images[this.onImage]);
		
		this.dialog.style.marginLeft = "-" + (this.images[this.onImage].width / 2 + 16) + "px";
		this.dialog.style.marginTop = "-" + (this.images[this.onImage].height / 2 + 31) + "px";
		
		if(this.images[this.onImage].complete && (this.images[this.onImage].width == 0 || this.images[this.onImage].height == 0) && options.skipErr) {
			this.prevImage();
		}
	};
	
	this.pause = function () {
		if(this.psBtn && this.psBtn.btn.value == 'Pause') {
			this.psBtn.btn.value = 'Play';
			clearInterval(this.interval);
			this.isPlaying = false;
		}
	};
	
	this.play = function () {
		if(this.psBtn && this.psBtn.btn.value == 'Play') {
			this.psBtn.btn.value = 'Pause';
		}
		var SR = this;
		this.interval = setInterval(function () { SR.nextImage() }, options.sldTm);
		this.isPlaying = true;
	};
}

/** =================================================================
  *	End Dialogs
  *	=================================================================
  */

/**
  *	Import dependencies
  *	
  *	@depends dialogs.js
  */
	// Start Configuration Functions --------------------------------------------------
// Setup the configuration for the script
function setupConf() {
	conf = popupManager.newConfig();
	conf.draw();
}
// Opens the configuration page
function configurations() {
	if(!conf.is_drawn()) {
		popupManager.closeAll();
		conf.draw();
	} else {
		conf.undraw();
	}
}
//
function styler() {
	if (!stylr) {
		stylr = popupManager.newStyler();
	}
	if(!stylr.is_drawn()) {
		popupManager.closeAll();
		stylr.draw();
	} else {
		stylr.undraw();
	}
}
	// End Configuration Functions ----------------------------------------------------

// 
function keycuts() {
	document.addEventListener("keypress", function (event) {
		if(event.ctrlKey && event.shiftKey) {
			if (String.fromCharCode(event.charCode) === 'O') {
				configurations();
			} else if (String.fromCharCode(event.charCode) === 'A') {
				var q = document.evaluate('//input[@name="q"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				q = q.snapshotItem(0);
				q.focus();
			} else if (String.fromCharCode(event.charCode) === 'U' && multiBox) {
				multiBox.expandCollapse();
			} else if (String.fromCharCode(event.charCode) === 'Y') {
				styler();
			} else if (String.fromCharCode(event.charCode) === 'I' && options.sldshw) {
				startslides();
			}
		}
	}, false);
}

/**	multisearcher
  *	Multisearch Object
  *	
  *	Functions
  *	
  */
function multisearcher() {
	
	this.original = document.evaluate('//input[@name="q"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	this.boxes = [];
	this.expanded = false;
	this.wrapper;
	this.multiwrapper;
	this.newSearchWrapper;
	this.origOptionBox;
	
	// Images
	this.downArrow = "iVBORw0KGgoAAAANSUhEUgAAAA0AAAAICA" +
					"YAAAAiJnXPAAAAGXRFWHRTb2Z0d2FyZQBBZ" +
					"G9iZSBJbWFnZVJlYWR5ccllPAAAAOJJREFU" +
					"eNpiZGBg4AJiAwbiwQUWkAbZ9FnN%2F%2F%" +
					"2F8Yvr%2F6yfz%2F39%2FGP%2F%2F%2FcXE" +
					"8B8owwhEzGz%2FGJlY%2FjOysf9lZGH793h" +
					"mWi0jzCb57IWNPJq2lkBF3ECNDAz%2FgboY" +
					"GRmAGhiAhnz9cv3w8YdT4%2BtBNjH%2BB0o" +
					"yMjKCNSoXrWzg0nayZGLl5GGAWvXv9%2Fcv" +
					"367uO363L7wBpAGo%2FhsTyJEgBkgAJMH58" +
					"OhpfqYfX%2Fk5mBlANIiPrIEBqgGOoU61cu" +
					"%2Fccch79buvIBrEB4mjqEPmIGv06d15BJs" +
					"GrJqQNWLTAMIAAQYAJLynOOE%2FN%2BkAAA" +
					"AASUVORK5CYII%3D";
	this.upArrow = "iVBORw0KGgoAAAANSUhEUgAAAA0AAAAICAYA" +
					"AAAiJnXPAAAAGXRFWHRTb2Z0d2FyZQBBZG9" +
					"iZSBJbWFnZVJlYWR5ccllPAAAAOJJREFUeN" +
					"pi%2BP%2F%2FPwM6BgIuILYC0VjlcWmQCG0" +
					"4hksjdg1hjUdVG%2FZ%2FBdHYNDJCFTMwMj" +
					"KCNBhIx%2FZ08GjZGTOxcXH9%2B%2FXt25d" +
					"rh84%2BXVxSAZS7AFT7DawWrBOqQTZ1eguv" +
					"tqMZEwcvN1AQ5AyGfz8%2Bf%2F18df%2Bpx" +
					"7Mza2AaGaFOMpDPWdjIq%2B9mwczOy8PExM" +
					"gAkgC54d%2B%2F%2Fwx%2Ff37%2B8vnirhM" +
					"Pp8TXgzSC5KxUilc2sDEzM7KzMjNxADErCx" +
					"MjM9D6v0Bjf%2F%2F59%2F%2FH77%2F%2Ff" +
					"gLxr79%2F%2F9%2FpDW%2BA28RAPLgAEGAA" +
					"Y5%2Bk2Ib1C%2BEAAAAASUVORK5CYII%3D";
	
	this.draw = function () {
		this.wrapper = $create("div", {
			id : "allSearches"
		});
		
		var fullorig = findrightnode(this.original, "ts");
		
		var topHat = $('sff');
		var newHolder = $create("div", {
			id : "otherSearchContent"
		});
		for (var ci = 0; ci < topHat.childNodes.length;) {
			newHolder.appendChild(topHat.childNodes[ci]);
		}
		topHat.appendChild(newHolder);
		
		topHat.insertBefore(this.wrapper, topHat.childNodes[0]);
		this.wrapper.appendChild(fullorig);
		fullorig.id = "currentSearch";
		
		var expand = $create("img", {
			src : 'data:image/png;base64,' + this.downArrow,
			id : 'expand',
			alt : 'expand'
		});
		this.wrapper.appendChild(expand);
		
		this.multiwrapper = $create("div");
		this.multiwrapper.id = "expandedMulti";
		var tabhead1 = $create("h3");
		tabhead1.textContent = "Current Tab";
		tabhead1.className = "TabHead";
		var tabhead2 = $create("h3");
		tabhead2.textContent = "New Tab(s)";
		tabhead2.className = "TabHead";
		
		this.multiwrapper.appendChild(tabhead1);
		this.multiwrapper.appendChild(new multisearchbox(null).optionList("Orig"));
		this.multiwrapper.appendChild($create("hr"));
		this.multiwrapper.appendChild(tabhead2);
		this.multiwrapper.appendChild($create("br"));
		
		this.newSearchWrapper = $create("div", {
			id : 'newSearchBoxes'
		});
		
		for (var nm = GM_getValue("numMulti",2); nm > 0 ; nm--) {
			var msb = new multisearchbox(this);
			msb.draw(this.newSearchWrapper);
			this.boxes.push(msb);
		}
		
		this.multiwrapper.appendChild(this.newSearchWrapper);
		
		var adder = $create("div");
		adder.id = "adding";
		adder.textContent = "Add more...";
		this.multiwrapper.appendChild(adder);
		
		var srchAll = $create("button", {
			textContent : "Search All",
			id : "searchAll"
		});
		this.multiwrapper.appendChild(srchAll);
		
		var srchNew = $create("button", {
			textContent : "Search New",
			id : "searchNew"
		});
		this.multiwrapper.appendChild(srchNew);
		
		var fillOutAll = $create('button', {
			textContent : 'Set All from Original',
			id : 'setBoxes'
		});
		this.multiwrapper.appendChild(fillOutAll);
		
		var SR = this;
		adder.addEventListener("click", function (event) {
			// var newl = $cl("SBoxes").length;
			// GM_setValue("numMulti",newl + 1);
			// newSB(newl, multi);
			// multi.removeChild(adder);
			// multi.removeChild(srchAll);
			// multi.removeChild(srchNew);
			// multi.appendChild(adder);
			// multi.appendChild(srchAll);
			// multi.appendChild(srchNew);
			SR.addBox();
		}, false);
		
		expand.addEventListener("click", function (event) {
			SR.expandCollapse();
		}, false);
		
		$("tsf").addEventListener("submit", function (event) {
			if (SR.expanded) {
				event.stopPropagation();
				event.preventDefault();
				var siteto = $("searchListOrig").value;
				var srchval;
				var inputs = $tag("input");
				for (var i = 0; i < inputs.length; i++) {
					if(inputs[i].name == "q") {
						srchval = inputs[i].value;
						break;
					}
				}
				redirgo([siteto, srchval], false);
			}
		}, false);
		
		srchAll.addEventListener("click", function (event) {
			event.stopPropagation();
			event.preventDefault();
			var curtabThis;
			var inputs = $tag("input");
			for (var i = 0; i < inputs.length; i++) {
				if(inputs[i].name == "q") {
					curtabThis = inputs[i].value;
					break;
				}
			}
			var tablist = [];
			for (i = $cl("SBoxes").length - 1; i >= 0; i--) {
				tablist.push($("searchList" + i).value);
				tablist.push($("searchText" + i).value);
			}
			tablist.push($("searchListOrig").value);
			tablist.push(curtabThis);
			redirgo(tablist, false);
		}, false);
		
		srchNew.addEventListener("click", function (event) {
			event.stopPropagation();
			event.preventDefault();
			var tablist = [];
			for (i = $cl("SBoxes").length - 1; i >= 0; i--) {
				tablist.push($("searchList" + i).value);
				tablist.push($("searchText" + i).value);
			}
			redirgo(tablist, true);
		}, false);
		
		fillOutAll.addEventListener("click", function (event) {
			event.stopPropagation();
			event.preventDefault();
			var sbs = $cl('searchBoxes');
			for (sb in sbs) {
				sbs[sb].value = queryBox.value;
			}
		}, false);
	};
	
	this.addBox = function () {
		var msb = new multisearchbox(this);
		msb.draw(this.newSearchWrapper);
		this.boxes.push(msb);
		GM_setValue("numMulti", parseInt(GM_getValue("numMulti", 2)) + 1);
	};
	
	this.expandCollapse = function () {
		if (!this.expanded) {
			this.wrapper.appendChild(this.multiwrapper);
		} else {
			this.wrapper.removeChild(this.multiwrapper);
		}
		$('expand').src = "data:image/png;base64," + (this.expanded ? this.downArrow : this.upArrow);
		this.expanded = !this.expanded;
	};
	
	this.searchAll = function () {
		
	};
	
	this.searchNew = function () {
		
	};
	
	this.getAllVals = function () {
		var newVals = this.getNewVals();
		
	};
	
	this.getNewVals = function () {
		var tablist = new array();
		for (i = this.boxes.length - 1; i >= 0; i--) {
			this.boxes[i].addCode(tablist);
		}
		return tablist;
	};
	
}

/**	multisearchbox
  *	
  */
function multisearchbox (parentObj) {
	
	this.parentObj = parentObj;
	this.wrapping;
	this.srchBox;
	this.removeBtn;
	this.optionBox;
	this.goBtn;
	this.undoBtn;
	this.active = false;
	
	// quote|howto|defin|anidb|imdb|gamefaq|diggs|utube|wikipda|googl|flckr|cnns|opnsrc|eby|espns
	this.valList = ["quote", "howto", "defin", "anidb", "imdb", "gamefaq", "diggs", "utube", "wikipda", "flckr", "cnns", "opnsrc", "eby", "espns", "googl"];
	this.showList = ["WikiQuote", "Wiki How to", "Wiktionary", "AnimeDB", "IMDB", "GameFAQs", "Digg", "Youtube", "Wikipedia", "Flickr", "CNN", "Source Forge", "Ebay", "ESPN", "Google"];
	this.closeImg = "";
	this.undoImg = "";
	
	this.draw = function (parentNode) {
		this.active = true;
		
		this.wrapping = $create("div", {
			className : "SBoxes"
		});
		
		this.wrapping.appendChild(this.getOptBox());
		
		this.srchBox = $create("input", {
			type : "text",
			className : "searchBoxes"
		});
		this.wrapping.appendChild(this.srchBox);
		
		this.removeBtn = $create("p", {
			className : "closeBtn",
			textContent : "X"
		});
		this.wrapping.appendChild(this.removeBtn);
		
		var SR = this;
		this.removeBtn.addEventListener("click", function () {
			SR.undraw();
			GM_setValue("numMulti", parseInt(GM_getValue("numMulti", 2)) - 1);
		}, false);
		
		//this.wrapping.appendChild($create("br"));
		parentNode.appendChild(this.wrapping);
	};
	
	this.undraw = function () {
		this.active = false;
		$remove(this.wrapping);
	};
	
	this.getOptBox = function () {
		if (!this.optionBox) {
			this.optionBox = $create("select", {
				className : "siteSelector"
			});
			for (var i = this.showList.length - 1; i >= 0;i--) {
				var opt = $create("option", {
					value : this.valList[i],
					textContent : this.showList[i]
				});
				this.optionBox.appendChild(opt);
			}
		}
		return this.optionBox;
	};
	
	this.addCode = function (arr) {
		if (this.active) {
			arr.push(this.optionBox.value);
			arr.push(this.srchBox.value);
		}
	};
	
	this.setValue = function (value) {
		this.srchBox = value;
		// TODO: Setup undo ability
	};
	
	this.search = function () {
		if (this.active) {
			var code = new array();
			this.addCode(code);
			redirgo(code, true);
		}
	};
	
	this.optionList = function (id) {
		if (!this.optionBox) {
			this.optionBox = $create("select", {
				className : "siteSelector"
			});
			for (var i = this.showList.length - 1; i >= 0;i--) {
				var opt = $create("option", {
					value : this.valList[i],
					textContent : this.showList[i]
				});
				this.optionBox.appendChild(opt);
			}
		}
		return this.optionBox;
	};
}
/**
  *	Import Dependencies
  *	
  *	@depends multisearch.js
  */
	// Start Text / Input Based Functions ------------------------------------------
// Creates and inserts the link to a wikipedia and wiktionary search
function lookup(lookingFor) {
	var logoBox = $("ssb");
	var p = $create("p");
	p.textContent = "Find " + lookingFor +  " on ";
	var link = $create("a");
	link.textContent = "Wikipedia | ";
	link.href = "http://en.wikipedia.org/wiki/Special:Search?go=Go&search=" + lookingFor;
	var link2 = $create("a");
	link2.textContent = "Wiktionary";
	link2.href = "http://en.wiktionary.org/wiki/Special:Search?go=Go&search=" + lookingFor;
	p.appendChild(link);
	p.appendChild(link2);
	p.className = "added";
	p.id = "wikLink";
	logoBox.insertBefore(p,logoBox.childNodes[1]);
	var resultsstats = logoBox.childNodes[logoBox.childNodes.length - 1];
	resultsstats.id = "resStat";
}
// Script for the auto redirection
function redirgo(theList, tablast) {
	if (theList.length < 2) {
		return "";
	} else {
		var putintabs = (theList.length !== 2);
		for (var x = 0; x < theList.length; x += 2) {
			if (x == theList.length - 2) {
				putintabs = false || tablast;
			}	
			if (theList[x] == "quote") {
				linkit("http://en.wikiquote.org/wiki/Special:Search?go=Go&search=" + theList[x + 1], putintabs, false);
			} else if (theList[x] == "howto") {
				linkit("http://www.wikihow.com/Special:LSearch?fulltext=Search&search=" + theList[x + 1], putintabs, false);
			} else if (theList[x] == "defin") {
				linkit("http://en.wiktionary.org/wiki/Special:Search?go=Go&search=" + theList[x + 1], putintabs, false);
			} else if (theList[x] == "anidb") {
				linkit("http://anidb.net/perl-bin/animedb.pl?show=animelist&do.search=Search&adb.search=" + theList[x + 1], putintabs, false);
			} else if (theList[x] == "imdb") {
				linkit("http://www.imdb.com/find?s=all&x=22&y=12&q=" + theList[x + 1], putintabs, false);
			} else if (theList[x] == "gamefaq") {
				linkit("http://www.gamefaqs.com/search/index.html?platform=0&game=" + theList[x + 1], putintabs, false);
			} else if (theList[x] == "diggs") {
				linkit("http://digg.com/search?section=all&s=" + theList[x + 1], putintabs, false);
			} else if (theList[x] == "utube") {
				linkit("http://www.youtube.com/results?search_type=&aq=f&search_query=" + theList[x + 1], putintabs, false);
			} else if (theList[x] == "wikipda") {
				linkit("http://en.wikipedia.org/wiki/Special:Search?go=Go&search=" + theList[x + 1], putintabs, false);
			} else if (theList[x] == "googl") {
				linkit("http://google.com/search?q=" + theList[x + 1], putintabs, false);
			} else if (theList[x] == "flckr") {
				linkit("http://www.flickr.com/search/?q=" + theList[x + 1], putintabs, false);
			} else if (theList[x] == "cnns") {
				linkit("http://search.cnn.com/search.jsp?type=web&sortBy=date&intl=false&query=" + theList[x + 1], putintabs, false);
			} else if (theList[x] == "opnsrc") {
				linkit("http://sourceforge.net/search/?type_of_search=soft&words=" + theList[x + 1], putintabs, false);
			} else if (theList[x] == "eby") {
				linkit("http://shop.ebay.com/items/?_nkw=" + theList[x + 1], putintabs, false);
			} else if (theList[x] == "espns") {
				linkit("http://search.espn.go.com/" + theList[x + 1].split(" ").join("-"), putintabs, false);
			}
		}
	}
}
// Gets what the user is searching for, capitalizes first letters, and filters out search syntax
function setupText(preset) {
	var search;
	var params;
	if (!location.href.match("/search?[^#]*q=")) {
		params = location.hash.split("&").join("#").split("#");
	} else {
		/*
		// Finds then breaks on the search box, saving its value
		for (var i = 0; i < theInput.length; i++) {
			if (theInput[i].getAttribute("type") == "text") {
				search = theInput[i].value;
				break;
			}
		}
		*/
		// Extracts the search value from the URL
		params = location.search.split("&").join("?").split("?");
	}
	for (var p = params.length - 1; p >= 0; p--) {
		if(params[p].indexOf("q=") === 0) {
			search = unescape(params[p].substr(2).split("+").join(" "));
			break;
		}
	}
	
	if(search == undefined) { return; }
	// Checks for google specific syntax
	var checkforcolon = search.split(":");
	var regexColon = new RegExp("^(site|filetype|allintitle|allinbody|allinurl)$");
	var listredirs = new Array();
	var counter = 0;
	for (var k = 0; k < checkforcolon.length; k += 2) {
		var indiv = checkforcolon[k].split(" ");
		var checker = indiv[indiv.length - 1];
		// Finds google search sytnax and removes it (when it is properly formatted)
		if (regexColon.test(checker)) {
			indiv = indiv.slice(0,indiv.length - 1);
			checkforcolon[k + 1] = checkforcolon[k + 1].split(" ").slice(1,checkforcolon[k + 1].length).join(" ");
			checkforcolon[k] = indiv.join(" ");
		}
	}
	if (listredirs.length > 0) {
		redirgo(listredirs);
	}
	search = checkforcolon.join(" ");
	search = search.split(" ");
	// Capitalizes the first letter in each word
	for (var i = 0; i < search.length; i++) {
		search[i] = search[i].charAt(0).toUpperCase() + search[i].substr(1).toLowerCase();
	}
	return search.join(" ");
}
// Setup the expanded multisearch search box
function multiSearchSetup() {
	multiBox = new multisearcher();
	multiBox.draw();
}
// Creates the list of options for the multisearch
function optionList(id) {
	var sel = $create("select");
	sel.id = "searchList" + id;
	sel.className = "siteSelector";
	// quote|howto|defin|anidb|imdb|gamefaq|diggs|utube|wikipda|googl|flckr|cnns|opnsrc|eby|espns
	var valList = ["quote", "howto", "defin", "anidb", "imdb", "gamefaq", "diggs", "utube", "wikipda", "flckr", "cnns", "opnsrc", "eby", "espns", "googl"];
	var showList = ["WikiQuote", "Wiki How to", "Wiktionary", "AnimeDB", "IMDB", "GameFAQs", "Digg", "Youtube", "Wikipedia", "Flickr", "CNN", "Source Forge", "Ebay", "ESPN", "Google"];
	for (var i = showList.length - 1; i >= 0;i--) {
		var opt = $create("option");
		opt.value = valList[i];
		opt.textContent = showList[i];
		sel.appendChild(opt);
	}
	return sel;
}
// Removes one of the multisearch boxes and saves the new number of boxes
function removeSB(event) {
	GM_setValue("numMulti", $cl("SBoxes").length - 1);
	var numTo = this.id.substr(8);
	$("wrapperSB" + numTo).parentNode.removeChild($("wrapperSB" + numTo));
}
// Creates a new multisearch box
function newSB(nm, parent) {
	var wrapper = $create("div");
	wrapper.className = "SBoxes";
	wrapper.id = "wrapperSB" + nm;
	
	wrapper.appendChild(optionList(nm));
	
	var textLine = $create("input");
	textLine.type = "text";
	textLine.className = "searchBoxes";
	textLine.id = "searchText" + nm;
	wrapper.appendChild(textLine);
	
	var close = $create("p");
	close.className = "closeBtn";
	close.id = "closebtn" + nm;
	close.textContent = "X";
	wrapper.appendChild(close);
	
	close.addEventListener("click", removeSB, false);
	
	wrapper.appendChild($create("br"));
	parent.appendChild(wrapper);
}
	// End Text / Input Based Functions --------------------------------------------

	// Start Visual Functions ----------------------------------------------------------
// Adds a little more margin for appearance
function addMargins() {
	// To Be Decided
}
// Removes all of the side ads on the page, if they exist
function removeSideAds() {
	var sideAds = $("mbEnd");
	if (sideAds !== null) {
		sideAds.className = "removed";
	}
	sideAds = $("tads");
	if (sideAds !== null) {
		sideAds.className = "removed";
	}
}
// Unhides side ad content... dunno why you'd want it
function showSideAds() {
	if ($("mbEnd") !== null) {
		var theAds = $("mbEnd").childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes;
		for (var ad = 0; ad < theAds.length; ad++) {
			theAds[ad].className = "toLI";
		}
		$("mbEnd").className = "reAddAd";
	}
	if ($("tads") !== null) {
		var theTAds = $cl("tas");
		for (var ad = 0; ad < theTAds.length; ad++) {
			theTAds[ad].className = "toLI";
		}
		$("tads").className = "reAddAd";
	}
}
// Removes everything except the search results (Removes Suggestions)
function noSuggestions() {
	/*
	var lis = $cl("ts");
	for (var i = 0; i < lis.length; i++) {
		lis[i].parentNode.className = lis[i].parentNode.className + " removed";
	}
	*/
	var lis = document.getElementsByTagName("li");
	for (var k = 0; k < lis.length; k++) {
		if (lis[k].className.indexOf("g") !== 0) {
			lis[k].className = lis[k].className + " removed";
		} else {
			var found = false;
			for(var cn = (lis[k].childNodes.length - 1); cn > 0;cn--) {
				if (lis[k].childNodes[cn].className && lis[k].childNodes[cn].className.indexOf("s") >= 0) {
					found = true;
				}
			}
			if (!found) {
				lis[k].className = lis[k].className + " removed";
			}
		}
	}
	if ($('trev') !== null) {
		$('trev').className = "removed";
	}
	if ($('brs') !== null) {
		$('brs').className = "removed";
	}
}
// Moves the "Did you mean text" to a different position
function didyoumean() {
	// var dym = $cl('spell');
	// if (dym.length == 4) {
		// var p1 = dym[0].parentNode;
		// var p2 = dym[2].parentNode;
		// var thebar = $('ssb');
		// var seconditem = thebar.childNodes[1];
		// var resultsstats = thebar.childNodes[thebar.childNodes.length - 1];
		// p2.className = "removed";
		// p1.id = "dymTxt";
		// thebar.insertBefore(p1, seconditem);
		// resultsstats.id = "rsStats";
	// }
}
	// End Visual Functions ------------------------------------------------------------

	// Start Video Extraction Functions --------------------------------------------
// Finds videos within the results and sets them aside... literally
function extractVideos(userSearch) {
	// Get all elements with the j class, the defining class for videos
	var vidsr = $cl("ts");
	if (vidsr.length > 0) {
		if (!options.vids && !options.imgs) {
			// Begin base item creation -------------------------------------------------
			var box = rightBox("exvidlist");
			var theList = $create("ol");
			var header = $create("h3");
			var videosLink = $create("a");
			videosLink.href = "http://video.google.com/videosearch?q=" + userSearch + "#";
			videosLink.textContent = "Videos";
			header.appendChild(videosLink);
			box.appendChild(header);
			// End base item creation ----------------------------------------------------
			var originalLength = vidsr.length;
			for (var i = 0; i < vidsr.length; i++) {
				if (vidsr[i].parentNode.childNodes.length == 3 && vidsr[i].parentNode.childNodes[0] == vidsr[i]) { // Tests that it is, in fact, a video result
					// Get the entire result (the j class is just a <td> and not the whole result)
					var videoresult = vidsr[i].parentNode;
					if (videoresult.className.indexOf("g") >= 0) {
						videoresult.className = "vidRes";
						
						// Locates the description of the link and erases it
						var text = vidsr[i].childNodes[0].childNodes[0].childNodes[1];
						text.className = "removed";
						var vidtitle = text.childNodes[1].childNodes[0];
						vidtitle.className = "vrTitle";
						
						// Appends items
						theList.appendChild(videoresult);
						theList.appendChild(vidtitle);
					}
				} else {
					vidsr[i].parentNode.parentNode.parentNode.parentNode.parentNode.className = "blocked";
				}
				if (vidsr.length < originalLength) {
					i--;
					originalLength--;
				}
			}
			box.appendChild(theList);
			if(theList.childNodes.length < 1) {
				box.className = "removed";
			}
			$("res").insertBefore(box, $("res").childNodes[0]);
		} else {
			//
		}
	}
}
// Goes through and reveals the videos that are automatically hidden with all non-result content
function unextractVids() {
	var vidss = $cl("ts");
	if (vidss.length > 0) {
		for (var rvl = 0; rvl < vidss.length; rvl++) {
			if (vidss[rvl].parentNode.childNodes.length == 3 && vidss[rvl].parentNode.childNodes[0] == vidss[rvl]) {
				vidss[rvl].parentNode.className = "g";
			}
		}
	}
}
	// End Video Extraction Functions ----------------------------------------------

/**	=================================================================
  *	Video Search
  *	=================================================================
  */

/**	indiv_video_result
  *	Individual Video Result Ojbect
  *	
  *	Construction Parameters
  *		src		Source of the screenshot image
  *		link	Url to video
  *		domain	Domain of origin
  *		name	Name of the Video
  *	
  *	Functions
  *		draw
  *			( HtmlNode parentNode )		Node to draw in
  *			Draw the video result
  *		
  *		clicked	
  *			( Event event )		click event
  *			( indiv_video_result res )		The result object clicked (for self-reference)
  *			Handles click event for embedabble videos
  *		
  *		youtubeEmbed
  *			( String link )		Link to the video for parsing
  *			Handles logic for youtube embeds including extra options
  *			<= Return String =>		Url for the embed
  *		
  *		googleEmbed
  *			( String link )		Link to the video for parsing
  *			Handles logic for google embeds including extra options
  *			<= Return String =>		Url for the embed
  *		
  *		metacafeEmbed
  *			( String link )		Link to the video for parsing
  *			Handles logic for metacafe embeds including extra options
  *			<= Return String =>		Url for the embed
  *		
  *		livevideoEmbed
  *			( String link )		Link to the video for parsing
  *			Handles logic for livevideo embeds including extra options
  *			<= Return String =>		Url for the embed
  *	
  */
function indiv_video_result(src, link, domain, name) {
	
	// Thumbnail Source
	this.src = src;
	// Link to video
	this.link = link;
	// Domain
	this.domain = domain;
	// Name of video
	this.name = name;
	// Embeddable on page
	this.embeddable = (domain == 'youtube' || domain == 'google' || domain == 'metacafe' || domain == 'livevideo');
	
	// Draw the video result
	this.draw = function (parentNode) {
		var img = $create("img", {
			src : this.src,
			alt : this.name,
			title : "\"" + this.name.replace(/\s\.{3}$/,"") + "\" from " + this.domain,
			className : 'vid_thumb'
		});
		var ancr_t = $create("a", {
			href : this.link,
			textContent : this.name
		});
		var ancr_i = $create("a", {
			href : this.link
		});
		var hldr = $create("div", {
			className : 'vid_result' + (this.embeddable ? ' embeddable' : '')
		});
		
		ancr_i.appendChild(img);
		hldr.appendChild(ancr_i);
		hldr.appendChild(ancr_t);
		parentNode.appendChild(hldr);
		
		if(options.embd && this.embeddable) {
			var SR = this;
			hldr.addEventListener("click", function (e) {
				SR.clicked(e, SR);
			}, true);
		}
	};
	
	// Handles click event for embedabble videos
	this.clicked = function (event, res) {
		event.stopPropagation();
		event.preventDefault();
		$("pBox").className = "playing";
		var vBox = $create("div");
		vBox.id = "vBox";
		// Embeds the video
		var src;
		if (res.domain == "youtube") {
			src = this.youtubeEmbed(res.link);
		} else if (res.domain == "google") {
			src = this.googleEmbed(res.link);
		} else if (res.domain == "metacafe") {
			src = this.metacafeEmbed(res.link);
		} else {
			src = this.livevideoEmbed(res.link);
		}
		
		// New embed code options
		var object = $create("object", { 
				width : '100%',
				height : '100%'
			} );
		
		// Movie param
		var movie = $create("param", {
				name : 'movie',
				value : src
			});
		object.appendChild(movie);
		
		// Fullscreen param
		var param = $create("param", {
				name : 'allowFullScreen',
				value : options.fsvd
			});
		object.appendChild(param);
		
		// Script Access param
		param = $create("param", {
				name : 'allowScriptAccess',
				value : 'always'
			});
		object.appendChild(param);
		
		// Embed
		var embed = $create("embed", {
				'src' : src,
				type : 'application/x-shockwave-flash',
				wmode : 'transparent',
				width : '100%',
				height : '100%',
				allowfullscreen : true,
				allowScriptAccess : 'always',
				id : 'embdPlyr'
			});
		// Special flashVars for metacafe
		if(res.domain == "metacafe") {
			embed.setAttribute('flashVars', "playerVars=autoPlay=" + (options.apvd ? 'yes' : 'no'));
		}
		object.appendChild(embed);
		
		vBox.appendChild(object);
		
		setupPlayer(res.name);
		$("pBox").appendChild(vBox);
	};
	
	// Handles logic for youtube embeds including extra options
	this.youtubeEmbed = function(link) {
		var regexUtube = new RegExp("^http:\/\/w{3}\.youtube\.com\/watch");
		var src = link.replace(regexUtube, "");
		src = "http://www.youtube" + (options.pmvd ? "-nocookie" : "") + ".com/v/" + src.substr(3) +
				"?fs=" + Number(options.fsvd) +
				"&hd=" + Number(options.hdvd) + 
				"&autoplay=" + Number(options.apvd) +
				"&loop=" + Number(options.lpvd) +
				"&iv_load_policy=" + (options.ivvd ? 1 : 3) +
				"&cc_load_policy=" + Number(options.ccvd) +
				"&enablejsapi=1" +
				(!options.pmvd && !options.lpvd ? "&version=3" : "");
		return src;
	};
	
	// Handles logic for google embeds including extra options
	this.googleEmbed = function(link) {
		var regexGoogl = new RegExp("^http:\/\/video\.google\.com\/videoplay");
		var src = link.replace(regexGoogl, "");
		src = "http://video.google.com/googleplayer.swf?hl=en&" + src.substr(1) +
				"&fs=" + options.fsvd +
				"&autoplay=" + options.apvd +
				"&loop=" + options.lpvd;
		return src;
	};
	
	// Handles logic for metacafe embeds including extra options
	this.metacafeEmbed = function(link) {
		var regexMetaCaf = new RegExp("^http:\/\/w{3}\.metacafe\.com\/watch\/");
		var src = link.replace(regexMetaCaf,"http://www.metacafe.com/fplayer/");
		src = src.substring(0,src.length - 1) + ".swf?";
		return src;
	};
	
	// Handles logic for livevideo embeds including extra options
	this.livevideoEmbed = function(link) {
		var regexLiveVideo = new RegExp("^http:\/\/w{3}\.livevideo\.com\/video\/");
		var src = link.replace(regexLiveVideo, "");
		src = "http://www.livevideo.com/flvplayer/embed/" + src.split("/")[0] + "?autostart=" + Number(options.apvd);
		return src;
	};
}

/**	=================================================================
  *	End Video Search
  *	=================================================================
  */
/**
  *	Import Dependencies
  *	
  *	@depends video-search.js
  */
	// Start Video Search Functions ------------------------------------------------
// Handles errors and no video results
function novids(response) {
	var box = rightBox("videoList");
	box.textContent = "No Videos Found";
	if ($("imageList")) {
		$("mBox").insertBefore(box, $("imageList"));
	} else {
		$("mBox").appendChild(box);
	}
	if (options.styl == "dock") {
		box.className = "removed";
	}
}
// Show the loaded videos
function showvids(response) {
	var code = stringtohtml(response.responseText);
	
	// Creates a Temporary box with the other pages data so I can use DOM functions on it
	// var boxTemp = $create("table");
	// boxTemp.className = "removed";
	// var viddivs = code.getElementsByTagName("div");
	// for (var vdn = 0; viddivs && vdn < viddivs.length; vdn++) {
		// if (viddivs[vdn].id == "search-results") {
			// boxTemp.innerHTML = viddivs[vdn].innerHTML;
		// }
	// }
	// $("gsr").appendChild(boxTemp);
	
	// Sorts through the video results and puts them in a list
	var box = rightBox("videoList");
	var littlep = $create("p");
	littlep.textContent = "Videos";
	littlep.id = "vidTag";
	box.appendChild(littlep);
	
	var rlitems = code.getElementsByClassName("rl-item");
	var rlress = code.getElementsByClassName("rl-res");
	var thbs = code.getElementsByClassName("thumbnail-img");
	var vts = code.getElementsByClassName("rl-title");
	if (rlitems.length > 0) {
		var proc = 0;
		var limit = 5;
		if (!options.imgs && options.styl == "media") {
			limit = -1;
		} else if (options.styl == "center") {
			limit = 3;
		}
		
		while((proc < limit || limit == -1) && proc < rlress.length) {
			if (rlitems[proc].className.indexOf('playlist-res') < 0) {
				var vid_src = getAttribute(rlress[proc], "srcurl");
				var img_src = thbs[proc].src;
				var vid_title = vts[proc].textContent.trim();
				var vid_domain = vid_src.replace(/http:\/\/\w*\./,'').replace(/\..*/,'');
				
				var new_vid = new indiv_video_result(img_src, vid_src, vid_domain, vid_title);
				new_vid.draw(box);
				
				proc++;
			} else {
				$remove(rlitems[proc]);
			}
		}
		
		// 
		// while((proc < limit || limit == -1) && rlitems.length > 0) {
			// proc++;
			// vidclicksetup(rlitems[0]);
			// box.appendChild(rlitems[0]);
		// }
		
		// var thbs = code.getElementsByClassName("thumbnail-img");
		// alert(thbs[0].parentNode.href);
		// for (var tmbo = 0; tmbo < thbs.length; tmbo++) {
			// var sorc = thbs[0].src;
			// var pnt = thbs[0].parentNode;
			// pnt.removeChild(thbs[0]);
			// pnt.appendChild($create("img", {
					// className : 'thumbnail-img',
					// src : sorc
				// }));
		// }
		/*
		for (var vi = rlitems.length - 1; vi >= 0; vi--) {
			vidclicksetup(rlitems[vi]);
			box.appendChild(rlitems[vi]);
			//alert(rlitems[vi].id);
		}
		*/
		if ($("imageList")) {
			$("mBox").insertBefore(box, $("imageList"));
		} else {
			$("mBox").appendChild(box);
		}
		
		if (options.styl == "dock") {
			box.className = "removed";
			$("vidDock").className = "";
		}
		
		/*
		var thumbs = $cl("rl-thumbnail-inner");
		for (var vt = 0; vt < thumbs.length && vt < 4; vt++) {
			thumbs[vt].childNodes[0].href = "#mBox";
		}
		thumbs = $cl("rl-thumbnail");
		for (var vt = 0; vt < thumbs.length && vt < 4; vt++) {
			thumbs[vt].childNodes[0].href = "#mBox";
		}
		var titles = $cl("rl-title");
		for (var vl = 0; vl < thumbs.length && vl < 4; vl++) {
			titles[vl].childNodes[0].href = titles[vl].parentNode.parentNode.getAttribute('srcurl');
		}*/
	} else {
		novids();
	}
	// Removes the Temporary Dom Box
	//$("gsr").removeChild(boxTemp);
	
	/*
	
	if (vids && checkallparentsforit(event, "rl-item")) {
		event.stopPropagation();
		event.preventDefault();
		$("pBox").className += " playing";
		var src = findrightnode(event, "rl-res", "srcurl");
		// Finds if video is hosted on supported site, and takes the appropriate action
		var regexUtube = new RegExp("^http:\/\/w{3}\.youtube\.com\/watch");
		var regexGoogl = new RegExp("^http:\/\/video\.google\.com\/videoplay");
		var regexMetaCaf = new RegExp("^http:\/\/w{3}\.metacafe\.com\/watch\/");
		var regexLiveVideo = new RegExp("^http:\/\/w{3}\.livevideo\.com\/video\/");
		if (regexUtube.test(src)) {
			src = src.replace(regexUtube, "");
			src = "http://www.youtube.com/v/" + src.substr(3);
			$("pBox").innerHTML = '<object width="100%" height="100%"><param name="movie" value="' + src + 
					'&ap=%2526fmt%3D18"></param><param name="allowFullScreen" value="true"></param><embed src="' + src + 
					'&ap=%2526fmt%3D18" type="application/x-shockwave-flash" allowfullscreen="true" width="100%" height="100%"></embed></object>';
		} else if (regexGoogl.test(src)) {
			src = src.replace(regexGoogl, "");
			src = "http://video.google.com/googleplayer.swf?hl=en&fs=true&" + src.substr(1);
			$("pBox").innerHTML = '<embed id="VideoPlayback" src="' + src + 
					'" style="width:100%;height:100%" allowFullScreen="true" allowScriptAccess="always"' +
					'type="application/x-shockwave-flash"> </embed>';
		} else if (regexMetaCaf.test(src)) {
			src = src.replace(regexMetaCaf,"http://www.metacafe.com/fplayer/");
			src = src.substring(0,src.length - 1) + ".swf";
			$("pBox").innerHTML = '<embed src="'+ src +
					'" width="100%" height="100%" wmode="transparent" pluginspage="http://www.macromedia.com/go/getflashplayer" ' +
					'type="application/x-shockwave-flash"> </embed>';
		} else if (regexLiveVideo.test(src)) {
			src = src.replace(regexGoogl, "");
			src = "http://www.livevideo.com/flvplayer/embed/" + src.split("/")[4];
			$("pBox").innerHTML = '<embed src="' + src + '" type="application/x-shockwave-flash" ' +
					'quality="high" WIDTH="100%" HEIGHT="100%" wmode="transparent">';
		} else {
			linkit(src);
		}
		
	*/
}
// Searches for videos based on what the user is searching for
function menutogglevids(theSearch) {
	get("http://video.google.com/videosearch?q=" + theSearch, showvids, novids);
}
	// End Video Search Functions --------------------------------------------------

/**	=================================================================
  *	Image Search
  *	=================================================================
  */

function indiv_img_result(src, link, title) {
	
	this.src = src;
	this.link = link;
	this.title = title;
	
	this.draw = function (parentNode) {
		var link = $create("a", {
			href : this.link,
			className : 'imgLink'
		});
		link.href = this.link;
		link.className = "imgLink";
		var img = $create("img", {
			src : this.src,
			alt : this.title,
			title : this.title
		});
		link.appendChild(img);
		parentNode.appendChild(link);
		
		var SR = this;
		link.addEventListener('click', function (e) { SR.clicked(e); }, false);
	};
	
	this.clicked = function (event) {
		event.stopPropagation();
		event.preventDefault();
		
		alert(this.title);
	};
	
	this.buildImage = function () {
		return $create("img", {
			src : this.src,
			alt : this.title,
			title : this.title
		});
	};
	
}

function img_set() {
	
	this.imgs = [];
	this.div;
	
	this.draw = function (parentNode) {
		if(!this.div) {
			this.div = $create("div", {
				className : 'aset'
			});
			for (var i = 0; i < this.imgs.length; i++) {
				this.imgs[i].draw(this.div);
			}
		}
		parentNode.appendChild(this.div);
	};
	
	this.undraw = function () {
		if(this.div) {
			$remove(this.div);
		}
	};
	
	this.addImg = function (img) {
		this.imgs.push(img);
	};
}

function Image_Search(query) {
	
	this.query = query;
	this.imgs = [];
	this.sets = [];
	this.setOn = 0;
	this.pages = 0;
	this.prevBtn;
	this.nextBtn;
	this.slideBtn;
	this.slideshow = popupManager.newSlideShow();
	this.div;
	
	this.draw = function (parentNode) {
		
		this.div = $create('div', {
			'id' : 'imageList',
			'className' : 'rBox'
		});
		
		var SR = this;
		this.prevBtn = new button('<', function () { SR.prev(); });
		this.slideBtn = new button('Play', function () { SR.startSlides(); });
		this.nextBtn = new button('>', function () { SR.next(); });
		
		this.prevBtn.draw(this.div);
		this.slideBtn.draw(this.div);
		this.nextBtn.draw(this.div);
		
		this.prevBtn.btn.disabled = true;
		this.slideBtn.btn.disabled = true;
		this.nextBtn.btn.disabled = true;
		parentNode.appendChild(this.div);
		
		this.search();
	};
	
	this.next = function () {
		if(this.setOn < this.sets.length - 1) {
			if(this.setOn == 0) {
				this.prevBtn.btn.disabled = false;
			}
			
			this.sets[this.setOn].undraw();
			this.sets[++this.setOn].draw(this.div);
			
			if (this.setOn == this.sets.length - 1) {
				this.nextBtn.btn.disabled = true;
			}
		}
	};
	
	this.prev = function () {
		if(this.setOn > 0) {
			if(this.setOn == this.sets.length - 1) {
				this.nextBtn.btn.disabled = false;
			}
			
			this.sets[this.setOn].undraw();
			this.sets[--this.setOn].draw(this.div);
			
			if (this.setOn == 0) {
				this.prevBtn.btn.disabled = true;
			}
		}
	};
	
	this.clickImage = function () {
		
	};
	
	this.startSlides = function () {
		if (!this.slideshow.is_drawn()) {
			popupManager.closeAll();
			this.slideshow.draw();
		} else if (this.slideshow && this.slideshow.is_drawn()) {
			this.slideshow.undraw();
		}
	};
	
	this.buildSets = function () {
		for(var setCreator = 0; setCreator < this.imgs.length; setCreator++) {
			if(setCreator % 7 == 0) {
				this.sets.push(new img_set());
			}
			this.sets[Math.floor(setCreator / 7)].addImg(this.imgs[setCreator]);
		}
	};
	
	this.processPage = function (response) {
		var na;
		eval("na = new Array" + response.responseText.match(/dyn\.setResults\(\[\[[^]*]\);/)[0].substring(14));
		
		/*
			var link = $create("a");
			link.href = na[0][i][3];
			link.className = "imgLink";
			
			var img = $create("img");
			img.src = na[0][i][14] + "?q=tbn:" + na[0][i][2] + na[0][i][3];
			img.alt = na[0][i][6];
			img.title = na[0][i][6];
		*/
		
		if(na[0]) {
			for(var nao = 0; nao < na[0].length; nao++) {
				var img = new indiv_img_result(na[0][nao][14] + "?q=tbn:" + na[0][nao][2] + na[0][nao][3], na[0][nao][3], na[0][nao][6]);
				this.imgs.push(img);
				this.slideshow.dialog.add_image(img);
			}
			
			if(this.pages < options.imgPgs) {
				this.search();
			} else {
				this.buildSets();
				this.sets[0].draw(this.div);
				this.slideBtn.btn.disabled = false;
				
				if(this.sets.length > 1) {
					this.nextBtn.btn.disabled = false;
				}
			}
		}
		
	};
	
	this.errorPage = function (response) {
		
	};
	
	this.search = function () {
		var SR = this;
		get("http://images.google.com/images?q=" + this.query + "&gbv=2&start=" + (21 * this.pages), function (r) { SR.processPage(r) }, function (r) { SR.errorPage(r) });
		this.pages++;
	};
	
}

/**	=================================================================
  *	End Image Search
  *	=================================================================
  */
/**
  *	Import Dependencies
  *	
  *	@depends image-search.js
  */
	// Start Image Search Functions ------------------------------------------------
// Starts the slide show
function startslides() {
	// if (!$("plySld").disabled && !sldObj.is_drawn()) {
		// if(conf.is_drawn()) {
			// conf.undraw();
		// }
		// if(stylr && stylr.is_drawn()) {
			// stylr.undraw();
		// }
		// sldObj.draw();
	// } else if (sldObj && sldObj.is_drawn()) {
		// sldObj.undraw();
	// }
	if(imgSearch) {
		imgSearch.startSlides();
	}
}
// Change the displayed set of images in the mediabox.
function changeset(changeby) {
	var sets = $cl("aset blocked");
	var so = parseInt(sets[0].id.substr(6));
	if (sets[0]) {
		sets[0].className = "aset removed";
		$("imgset" + (so + changeby)).className = "aset blocked";
		if (changeby > 0) {
			if (so === 0) {
				$("prev").disabled = false;
			}
			if (so == $cl("aset removed").length - 1 || $("imgset" + (so + 2)).childNodes.length === 0) {
				$("next").disabled = true;
			}
		} else if (changeby < 0) {
			if (so == 1) {
				$("prev").disabled = true;
			}
			if (so == $cl("aset removed").length || $("imgset" + (so + 1)).childNodes.length === 0) {
				$("next").disabled = false;
			}
		}
	}
}
// Displays a message that no images where found
function noimages(response) {
	var box = rightBox("imageList");
	box.textContent = "No Images Found";
	$("mBox").appendChild(box);
	
	if (options.styl == "dock") {
		box.className = "removed";
	}
}
// Show the loaded images
function showimages(response) {
	/*
		http://tbn3.google.com/images?q=tbn:dBk3GpW1jNJbZM:http://1.bp.blogspot.com/_sUpF830t0gU/SWbJrRPrsaI/AAAAAAAAAJI/VjT3kh6cNEI/s320/Blah_Blah_Blah.jpg
		14 + ?q=tbn: + 2 + 3 
		6
	*/
	var na;
	eval("na = new Array" + response.responseText.match(/dyn\.setResults\(\[\[[^]*]\);/)[0].substring(14));
	
	var done = !$("imageList");
	var listdiv;
	// If this is the first call to showimages, the imagelist will be setup
	if (done) {
		var realbox = rightBox("imageList");
		var imgTag = $create("p");
		imgTag.id = "imageTag";
		imgTag.textContent = "Images";
		realbox.appendChild(imgTag);
		
		if (options.styl == "dock") {
			var sldSpan = $create("span");
			sldSpan.textContent = "Play SlideShow";
			sldSpan.id = "miniSldLink";
			sldSpan.addEventListener("click", function (event) {
				startslides();
			}, false);
			imgTag.appendChild(sldSpan);
		}
		
		var bck = $create("button", {
			textContent : "<<",
			id : "prev",
			disabled : true
		});
		bck.addEventListener("click", function (event) {
			changeset(-1);
		}, false);
		
		var fwrd = $create("button", {
			textContent : ">>",
			id : "next"
		});
		fwrd.addEventListener("click", function (event) {
			changeset(1);
		}, false);
		realbox.appendChild(bck);
		realbox.appendChild(fwrd);
		
		if (options.sldshw) {
			var plyBtn = $create("button", {
				textContent : "Play SlideShow",
				id : "plySld",
				disabled : true
			});
			plyBtn.addEventListener("click", function (event) {
				startslides();
			}, false);
			realbox.appendChild(plyBtn);
		}
		
		var ldng = $create('div', {
			textContent : 'Loading images...',
			id : 'imgLdTxt'
		});
		realbox.appendChild(ldng);
		
		var listerdiv = $create("div", {
			id : "biglist",
			className : "removed"
		});
		if (options.styl == "dock") {
			realbox.className = "removed";
		}
	} else {
		realbox = $("imageList");
		listerdiv = $("biglist");
	}
	
	if (na[0]) {
		for (var i = 0; i < na[0].length; i++) {
			var link = $create("a");
			link.href = na[0][i][3];
			link.className = "imgLink";
			
			var img = $create("img");
			img.src = na[0][i][14] + "?q=tbn:" + na[0][i][2] + na[0][i][3];
			img.alt = na[0][i][6];
			img.title = na[0][i][6];
			
			link.appendChild(img);
			listerdiv.appendChild(link);
		}
	} else {
		realbox.textContent = "No Images Found";
	}
	//$("res").removeChild(tempbox);
	$("mBox").appendChild(realbox);
	$("mBox").appendChild(listerdiv);
	if (options.imgPgs > pon) {
		menutoggleimages(userInput);
	} else {
		imagesorter(listerdiv);
		$remove('imgLdTxt');
		if (options.sldshw) {
			$('plySld').disabled = false;
		}
	}
}
// Sorts the images into sets; Size based on number of images.
function imagesorter(imgHolder) {
	if (imgHolder) {
		var numper;
		if (options.styl == "dock") {
			$("imgDock").className = "";
			numper = 21;
		} else if (imgHolder.childNodes.length % 6 === 0) {
			numper = 6;
		} else if (imgHolder.childNodes.length % 7 === 0) {
			numper = 7;
		} else {
			numper = 5;
		}
		var seton = 0;
		var ion = 0;
		var imgdiv = setcreator(seton);
		if(options.sldshw) {
			sldObj = new popup_dialog(3);
			sldObj.init();
		}
		
		// Divides the images out, and creates a new set as necessary
		for (var ic = 0; imgHolder.childNodes[ic] && ic < imgHolder.childNodes.length; ic++) {
			//imgHolder.childNodes[ic].childNodes[0].childNodes[0].title = html_entity_decode(imgHolder.childNodes[ic].childNodes[0].childNodes[0].title);
			if(options.sldshw) {
				sldObj.dialog.add_image(imgHolder.childNodes[ic]);
			}
			imgdiv.appendChild(imgHolder.childNodes[ic]);
			ic--;
			if (!imgHolder.childNodes[ic + 1] || (ion + 1) % numper === 0) {
				seton++;
				$("imageList").appendChild(imgdiv);
				imgdiv = setcreator(seton);
			}
			ion++;
		}
		$("mBox").removeChild(imgHolder);
		
		// Sets up the default state
		if($("imgset0")) {
			$("imgset0").className = "aset blocked";
			if (!$('imgset1') || $('imgset1').childNodes.length === 0) {
				$("next").disabled = true;
			}
		} else {
			$("mBox").removeChild($("imageList"));
			noimages("");
		}
	}
}
// Creates a set for the images to be put in with the given set number
function setcreator(seton) {
	var setdiv = $create("div");
	setdiv.id = "imgset" + (seton);
	setdiv.className = "aset removed";
	return setdiv;
}
// Searches for images based on what the user is searching for
function menutoggleimages(theSearch) {
	// get("http://images.google.com/images?q=" + theSearch + "&gbv=2&start=" + (21 * pon), showimages, noimages);
	// pon++;
	imgSearch = new Image_Search(theSearch);
	imgSearch.draw($("mBox"));
}
	// End Image Search Functions -------------------------------------------------

	// Start Wiki Based Functions --------------------------------------------------
// Handles the case of a wikipedia page being found
function foundwikilink(response) {
	var defdiv = $create("div");
	var code = stringtohtml(response.responseText);
	var theHeading = code.getElementsByClassName("firstHeading")[0];
	var headLink = $create("a");
	headLink.textContent = "Wikipedia Article for " + theHeading.textContent;
	headLink.href = response.finalUrl;
	theHeading.textContent = "";
	var paras = code.getElementsByTagName("p");
	var paranew = $create("p");
	var hit = 0;
	
	for (var l = 0; l < paras.length; l++) {
		if (paras[l].parentNode.id == "bodyContent" && paras[l].childNodes[0].id != "coordinates") {
			hit = l;
			break;
		}
	}
	if(paras.length != 0) {
		// Adds 7 paragraphs from wikipedia if it is set to dock mode
		if (options.styl == "dock") {
			paranew = $create("div");
			var pcount = 0;
			while (hit < paras.length && paras[hit].parentNode.id == "bodyContent" && pcount < 7){
				paras[hit].className = "wiki_p";
				paranew.appendChild(paras[hit]);
				pcount++;
			}
		// Finds and cuts down the wikipedia description if the style is not set to dock mode
		} else {
			var cut = paras[hit].textContent.split(".");
			paranew.textContent = cut.slice(0,Math.min(3,cut.length - 1)).join(".") + ".";
			if (paranew.textContent.length < 2) {
				paranew.textContent = "This item has multiple possible definitions. Please visit wikipedia to specify a specific one.";
			}
		}
	} else {
		paranew.textContent = "No summary could be created for this page.";
	}
	theHeading.appendChild(headLink);
	defdiv.appendChild(theHeading);
	defdiv.appendChild(paranew);
	if (options.vids || options.imgs || options.exvids) {
		$("res").insertBefore(defdiv,$("res").childNodes[1]);
	} else {
		$("res").insertBefore(defdiv,$("res").childNodes[0]);
	}
	
	// Reassignment of links to link to the right page
	wikiLinks = paranew.getElementsByTagName("a");
	usableUrl = currUrl.split("#")[0];
	for (var lnum = 0; lnum < wikiLinks.length; lnum++) {
		if (wikiLinks[lnum].href.indexOf(usableUrl) < 0) {
			wikiLinks[lnum].href = "http://en.wikipedia.com" + wikiLinks[lnum].href.substr(21);
		} else {
			wikiLinks[lnum].href = wikiLinks[lnum].href.replace(usableUrl, headLink.href);
		}
	}
	
	// ID assignments for Wikipedia entry
	theHeading.id = "wikiHeader";
	paranew.id = "wikiDesc";
	defdiv.id = "wikiDiv";
	if (options.styl == "dock") {
		defdiv.className = "removed";
		$("wikiDock").className = "";
	} else if (options.styl == "center") {
		var wikiExp = $create("div");
		wikiExp.id = "wikiExp";
		defdiv.className = "removed";
		wikiExp.innerHTML = "E<br />x<br />p<br />a<br />n<br />d<br />&raquo;";
		wikiExp.addEventListener("click", function (event) {
			$("wikiDiv").className = ($("wikiDiv").className == "removed") ? "" : "removed";
			wikiExp.innerHTML = (wikiExp.style.left == "0px" || wikiExp.style.left == "") ? "C<br />o<br />l<br />l<br />a<br />p<br />s<br />e<br />&laquo;" : "E<br />x<br />p<br />a<br />n<br />d<br />&raquo;";
			wikiExp.style.left = (wikiExp.style.left == "200px") ? "0px" : "200px";
		}, false);
		document.body.appendChild(wikiExp);
	}
}
// Handles case when there is no imediate available wikipedia page
function nowikilink(response) {
	lookup(userInput);
}
// Checks whether a wikipedia page for the search was found and calls the appropriate function
function checkwikistate(response) {
	if(response.status != 200 || response.status != 302) {
		var srchregex = new RegExp("^http:\/\/en\.wikipedia\.org\/wiki\/Special:Search\?");
		if (srchregex.test(response.finalUrl)) {
			nowikilink(response);
		} else {
			foundwikilink(response);
		}
	} else {
		nowikilink(response);
	}
}
// Searches wikipedia based on what the user is searching for
function menutogglewiki(theSearch) {
	get("http://en.wikipedia.org/wiki/Special:Search?go=Go&search=" + theSearch, checkwikistate, nowikilink);
}
	// End Wiki Based Functions ----------------------------------------------------

/** 
  *	Import Dependencies
  *	
  *	@depends header.js
  *	@depends image-store.js
  *	@depends options-store.js
  *	@depends helper-functions.js
  *	@depends style-functions.js
  *	@depends update.js
  *	@depends dialog-functions.js
  *	@depends shortcuts.js
  *	@depends text-functions.js
  *	@depends visual-functions.js
  *	@depends video-extraction.js
  *	@depends video-functions.js
  *	@depends image-functions.js
  *	@depends wiki-functions.js
  */
	// Start Core Functions -----------------------------------------------------------
// Redirects user to the scripts homepage
function redirInfo() {
	linkit("http://userscripts.org/scripts/show/33449", true, false);
}
// Checks toggles and calls requested functions
function runThrough() {
	var q = document.evaluate('//*[@name="q"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	queryBox = q.snapshotItem(0);
	
	if ($("preload")) {
		resetPg();
	} else {
		var pdiv = $create("div");
		pdiv.id = "preload";
		document.body.appendChild(pdiv);
	}
	setupConf();
	//clickd();
	if(options.keyd) {
		keycuts();
	}
	allStyles();
	
	// Setup for first loading.
	if (GM_getValue("loadBefore", false)) {
		//$('gsr').removeChild(filler);
		//$('gsr').removeChild(centDivConf);
		conf.undraw();
	} else {
		GM_setValue("loadBefore", true);
	}
	
	// Visual Fixes
	if (options.sugges) {
		noSuggestions();
	}
	if (options.dym) {
		didyoumean();
	}
	if (options.sideads) {
		removeSideAds();
	} else {
		showSideAds();
	}
	
	// Creates the player if either a video or image search is active
	if (options.vids || options.imgs) {
		makePlayer();
	}
	
	// Main features
	// Shows video results
	if (options.vids) {
		menutogglevids(userInput);
	}
	// Extract the video results from the search and if videos is not enabled, display them seperate
	if (options.exvids) {
		extractVideos(userInput);
	} else {
		unextractVids();
	}
	
	// Shows image results
	if (options.imgs) {
		menutoggleimages(userInput);
	}
	// Add Wikipedia link  -- Done last for loading and time reasons
	if (options.wiki) {
		menutogglewiki(userInput);
	} else {
		nowikilink();
	}
	
	if (options.scuts && !$('allSearches')) {
		multiSearchSetup();
	}
	
	if (delayed) {
		// New google search code doesn't reload page. This checks for changes and redoes all actions
		var checkpage = setInterval(checknonreload, options.delay);
	}
	
	//document.addEventListener("unload", function (event) { clearTimeout(checkpage); if(sldTmr) { clearTimeout(sldTmr); } }, false);
	
	// Checks for script updates
	scriptPage();
}
	// End Core Functions -------------------------------------------------------------
// End Functions --------------------------------------------------------------------

// Global Variables
var filler, centDiv, centDivConf, conf, stylr, centDivSld, sldTmr, sldObj, dockShow, multiBox, multi, queryBox, imgSearch;
var pon = 0;
// The following is an undefined varialbe to allow the reset of all variables; Do not set
var SET_UNDEFINED;

GM_registerMenuCommand("Options", configurations, "o", "control shift");
GM_registerMenuCommand("Style", styler, "y", "control shift");
GM_registerMenuCommand("Script Info (Opens in New Tab)", redirInfo);

var popupManager = new popup_manager();
var options = new optionlist();
// Finds and saves what the user looks for  and saves the url-- Currently returns incorrect value if back button is used
var userInput = setupText();
var currUrl = location.href;
var delayed = false;

// Starts the process
if($('res')) {
	runThrough();
} else {
	delayed = true;
	var inval = setTimeout(waitingForPage, options.delay);
}

function waitingForPage() {
	if($('res')) {
		userInput = setupText();
		currUrl = location.href;
		runThrough();
	} else {
		setTimeout(waitingForPage, options.delay);
	}
}
