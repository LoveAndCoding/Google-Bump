// ==UserScript==
// @name			Google Bump
// @namespace		http://userscripts.org/scripts/show/33449
// @description		Adds some functionality to the Google web search. Main features include Multisearch, Video result extraction, Wikipedia definitions and links, and some clutter cleanup by. All options can be turned off.
// @version			2.01.20100604
// @include			http://www.google.tld/
// @include			http://www.google.tld/#*
// @include			http://www.google.tld/search?*
// @include			http://www.google.tld/webhp?*
// @exclude			http://www.google.com/search?*&tbs=*
// ==/UserScript==

/*
	Author: KTaShes
	Date: June 04 2010
	
	Code can now be found on GitHub @ http://github.com/ktsashes/Google-Bump
	
	This code uses juicer to compile from several different javascript files.
	Juicer (C) Christian Johansen - http://cjohansen.no/en/ruby/juicer_a_css_and_javascript_packaging_tool
*/
var version = "2.01";


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
	
	vid_noembed :		"data:image/png;base64,iVBORw0KGgoAA" +
						"AANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAA" +
						"AAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZ" +
						"VJlYWR5ccllPAAAAIdJREFUeNpi%2FP%2F%" +
						"2FPwMlgImBQkCxASwgImXKF3RxkL8YCYnNy" +
						"eHB6gJ8gfKfkBdgChixaGbEZggLLs1zciU3" +
						"QPkBQLwhZfLzAKjcf2TvMBFh8waoIVhdgi8" +
						"WAtAMwRuN2PyHbjNWr7KgOQ3uP6if0V2C4V" +
						"UmYkIaXzgx4YkuBmLkGId%2BZgIIMAA%2Fg" +
						"yWd%2ForwUQAAAABJRU5ErkJggg%3D%3D",
	
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
						"C",
	
	image_slideshow :	"data:image/png;base64,iVBORw0KGgoAAA" +
						"ANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAA" +
						"GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJl" +
						"YWR5ccllPAAAAGtJREFUeNpi%2FP%2F%2FPw" +
						"MlgImBQsACIlKmfIHxiXUOI4iYk8MDMQCbJB" +
						"7wn1gv%2FCclDP7j0PAfj%2BH%2F0V3ASIJL" +
						"GEmNhf%2BURiMjJQYwEpuQ%2FpOg%2BT9KQk" +
						"JS%2BJ9ImxnRDSA5%2FuEmDXhmotgAgAADAF" +
						"GQFx04us8gAAAAAElFTkSuQmCC",
	
	image_left_arrow :	"data:image/png;base64,iVBORw0KGgoAAA" +
						"ANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAA" +
						"GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJl" +
						"YWR5ccllPAAAAF1JREFUeNpi%2FP%2F%2FPw" +
						"MlgImBQkCxASwwRsqUL%2BhyML8xYtM4J4cH" +
						"rwv%2BU%2BIFZM2MpBpAkmaUMMDibELeYKRu" +
						"LEBNJNkLTNicRUpMMOHyG7GGMOELIGIA49DP" +
						"TAABBgBMsBIfaeHnDgAAAABJRU5ErkJggg%3" +
						"D%3D",
	
	image_right_arrow :	"data:image/png;base64,iVBORw0KGgoAA" +
						"AANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAA" +
						"AAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZ" +
						"VJlYWR5ccllPAAAAFpJREFUeNpi%2FP%2F%" +
						"2FPwMlgImBQkCxASwwRsqUL7jUwPzIiCw4J" +
						"4eHZBf8J9cLjPgMIdYFOA1hIeREPN5hpG4s" +
						"oIcygUBkJDUM%2FuOyiIkSzaSGAVYvMg79z" +
						"AQQYACovRIfeUjOIwAAAABJRU5ErkJggg%3" +
						"D%3D"
	
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
	this.DEFAULT_SLDKEY = true;
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
		// Color Defaults
			// Background Colors
	this.DEFAULT_GENBGCLR = '255,255,255';
	this.DEFAULT_RESLTCLR = '255,255,255';
	this.DEFAULT_GLBARCLR = '255,255,255';
	this.DEFAULT_ADDEDCLR = '240,247,249';
	this.DEFAULT_PLYBLCLR = '255,255,255';
	this.DEFAULT_OVRLYCLR = '0,0,0';
			// Text Colors
	this.DEFAULT_RESTXTCLR = '0,0,0';
	this.DEFAULT_LNKTXTCLR = '17,17,204';
	this.DEFAULT_URLTXTCLR = '34,136,34';
	this.DEFAULT_SIMTXTCLR = '66,114,219';
	this.DEFAULT_MDATXTCLR = '0,0,0';
	this.DEFAULT_PLYTXTCLR = '0,0,0';
	this.DEFAULT_PBLTXTCLR = '0,0,0';
	
	
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
	this.sldkey = GM_getValue("sldkey", this.DEFAULT_SLDKEY);
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
	
		// Color vars
	this.genbgclr = GM_getValue("genbgclr", this.DEFAULT_GENBGCLR);
	this.resltclr = GM_getValue("resltclr", this.DEFAULT_RESLTCLR);
	this.glbarclr = GM_getValue("glbarclr", this.DEFAULT_GLBARCLR);
	this.addedclr = GM_getValue("addedclr", this.DEFAULT_ADDEDCLR);
	this.plyblclr = GM_getValue("plyblclr", this.DEFAULT_PLYBLCLR);
	this.ovrlyclr = GM_getValue("ovrlyclr", this.DEFAULT_OVRLYCLR);
		// Text Color vars
	this.restxtclr = GM_getValue("restxtclr", this.DEFAULT_RESTXTCLR);
	this.lnktxtclr = GM_getValue("lnktxtclr", this.DEFAULT_LNKTXTCLR);
	this.urltxtclr = GM_getValue("urltxtclr", this.DEFAULT_URLTXTCLR);
	this.simtxtclr = GM_getValue("simtxtclr", this.DEFAULT_SIMTXTCLR);
	this.mdatxtclr = GM_getValue("mdatxtclr", this.DEFAULT_MDATXTCLR);
	this.plytxtclr = GM_getValue("plytxtclr", this.DEFAULT_PLYTXTCLR);
	this.pbltxtclr = GM_getValue("pbltxtclr", this.DEFAULT_PBLTXTCLR);
}

var options = new optionlist();

	// Start Helper Functions ----------------------------------------------------------
// Shortcut for document.getElementById
function $(id) {
	return document.getElementById(id);
}
// Shortcut for either Id
function $$(first, second) {
	return $(first) || $(second);
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
	
	if (node && node.parentNode) {
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
function checkallparentsforit(el, clname) {
	var onn = el;
	// Loop up and returns if value is found
	while (typeof(onn) != "undefined" && onn !== null) {
		if (onn.className == clname || onn.id == clname) {
			return true;
		}
		onn = onn.parentNode || null;
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
		if($$(statId, dynaId)) {
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
	popupManager.closeAll();
}
	// End Helper Functions ------------------------------------------------------------

/**	=================================================================
  *	Media Embedding
  *	=================================================================
  */

/**	Control_Icon
  *	Control Icon Object
  *	
  *	Construction Parameters
  *		icon		The src of the image
  *		title		The title of the icon
  *		handle		A handler for clicks
  *	
  *	Functions
  *		draw
  *			Draw the icon
  *	
  *		handleClick
  *			Handles clicking on the given icon by delegating to assigned clickers
  *	
  *		addClicker
  *			Add a click handler funciton
  *	
  *		removeClicker
  *			Remove a click handler function
  *	
  */
function Control_Icon (icon, title, handle) {
	this.img = icon;
	this.title = title;
	this.clickers = [];
	if ( handle ) this.clickers.push( handle );
	
	this.draw = function (parentNode) {
		
		var icn = $create('img', {
			src : this.img,
			alt : this.title,
			title : this.title,
			className : 'controlIcon'
		});
		
		parentNode.appendChild(icn);
		var SR = this;
		icn.addEventListener('click', function (e) { SR.handleClick(e); }, false);
		
	};
	
	this.handleClick = function (e) {
		for ( var hc = 0; hc < this.clickers.length; hc++ ) {
			this.clickers[hc]();
		}
	};
	
	this.addClicker = function (handle) {
		this.clickers.push( handle );
	};
	
	this.removeClicker = function (handle) {
		for ( var rc = 0; rc < this.clickers.length; rc++ ) {
			if (this.clickers[rc] == handle) {
				this.clickers.splice(rc,1);
				return;
			}
		}
	};
};

/**	Media_Embed
  *	Media Embed Object
  *	
  *	Functions
  *		draw
  *			Draw the icon
  *	
  *		addImageEmbed
  *			Embed an image in the embed area
  *	
  *		addVideoEmbed
  *			Embed an video in the embed area
  *	
  *		clearEmbed
  *			Clean the embed area
  *	
  *		drawImageControls
  *			Draw the controls for images
  *	
  *		drawVideoControls
  *			Draw the controls for videos
  *	
  */
function Media_Embed () {
	
	this.player;
	this.labelArea;
	this.controlsArea;
	this.embedArea;
	this.title;
	this.controls;
	this.imgRes;
	this.vidRes;
	this.defaultMessage = "Select an item to view it here.";
	
	this.draw = function (parentNode) {
		this.player = rightBox("pBox");
		
		this.clearEmbed(this.defaultMessage);
		
		var hidePlayer = $create("div", {
			id : "hidePly",
			textContent : "X"
		});
		var SR = this;
		hidePlayer.addEventListener("click", function (event) {
			SR.clearEmbed();
		}, false);
		this.player.appendChild(hidePlayer);
		
		parentNode.appendChild(this.player);
	};
	
	this.addImageEmbed = function (img, controls) {
		this.imgRes = img;
		var title = img.title;
		var url = img.link;
		
		this.clearEmbed(title);
		
		if(controls) {
			this.drawImageControls();
		}
		
		var alink = $create("a", {
			href : url
		});
		var imgtag = $create("img", {
			src : url,
			alt : title,
			title : title,
			className : "playimg"
		});
		alink.appendChild(imgtag);
		this.embedArea.appendChild(alink);
		this.player.className = "rBox imgShowing";
	};
	
	this.addVideoEmbed = function (vid, controls, embed) {
		this.vidRes = vid;
		this.clearEmbed(vid.name);
		
		if(controls) {
			this.drawVideoControls();
		}
		
		this.embedArea.appendChild(embed);
		this.player.className = "rBox playing";
	};
	
	this.clearEmbed = function (label) {
		if (!this.labelArea) {
			this.labelArea = $create("div", {
				id : "playerTag"
			});
			this.player.appendChild(this.labelArea);
		}
		this.labelArea.innerHTML = label || this.defaultMessage;
		
		if(!this.controlsArea) {
			this.controlsArea = $create("div", {
				id : "controlArea"
			});
			this.player.appendChild(this.controlsArea);
		}
		removeAllChildren(this.controlsArea);
		
		if (!this.embedArea) {
			this.embedArea = $create("div", {
				id : "embedArea"
			});
			this.player.appendChild(this.embedArea);
		}
		removeAllChildren(this.embedArea);
		
		this.player.className = "rBox";
	};
	
	this.drawImageControls = function () {
		
		// Reusable Var
		var icn;
		
		var SR = this;
		
		icn = new Control_Icon(image_store.image_left_arrow, "Previous Image", function () {
			imgSearch.clickImage(SR.imgRes.locNum - 1);
		});
		icn.draw(this.controlsArea);
		
		icn = new Control_Icon(image_store.image_slideshow, "Play Slideshow from here", function () {
			imgSearch.startSlides(SR.imgRes.locNum)
		});
		icn.draw(this.controlsArea);
		
		icn = new Control_Icon(image_store.image_right_arrow, "Next Image", function () {
			imgSearch.clickImage(SR.imgRes.locNum + 1);
		});
		icn.draw(this.controlsArea);
	};
	
	this.drawVideoControls = function () {
		
		// Reusable Var
		var icn;
		
		var SR = this;
		
		icn = new Control_Icon(image_store.vid_noembed, "No Embed", function () {
			GM_openInTab(SR.vidRes.link);
			SR.clearEmbed(SR.defaultMessage);
			SR.player.className = "rBox";
		});
		icn.draw(this.controlsArea);
		
	};
}

/**	=================================================================
  *	End Media Embedding
  *	=================================================================
  */

/**	=================================================================
  *	Style Store
  *	=================================================================
  */

function stylesheet_store () {

	var maxwidth = window.innerWidth - 50;
	var maxheight = window.innerHeight - 100;
	

	this.center_stylesheet = " \
		body { \
			width: 760px; \
			margin: 0px auto !important; \
			border: 1px solid #000000; \
			border-top-style: none; \
		} \
		#guser { \
			padding-top: 3px; \
		} \
		#tsf { \
			position: relative; \
		} \
		#cnt { \
			min-width: 0px !important; \
		} \
		#fll { \
			margin: 0px auto !important; \
			padding: 19px 0px; \
		} \
		.gbh { \
			left: auto !important; \
			right: auto !important; \
			width: 760px; \
		} \
		#ssb { \
			margin-bottom: 0px; \
			padding-bottom: 0px; \
		} \
		#mBox { \
			position: relative; \
			height: 238px; \
			overflow: hidden; \
			border-bottom: 1px solid #6B90DA; \
			border-top: 1px solid #6B90DA; \
		} \
		#wikiDiv { \
			min-height: 122px; \
			z-index: 999; \
			border-bottom: 1px solid #000000; \
			border-left: 1px solid #000000; \
			border-top: 1px solid #000000; \
			position: absolute; \
			top: 0px; \
			left: -202px; \
			width: 200px; \
		} \
		#wikiHeader { \
			font-size: 100%; \
			text-align: center; \
			border-bottom: 1px solid #000000; \
		} \
		#wikiHeader a, #wikiHeader a:active { \
			color: #0077CC; \
			text-decoration: none; \
		} \
		#wikiDesc { \
			margin: 0px; \
			padding: 5px 2px 2px 2px; \
			font-size: 85%; \
		} \
		#wikiExp { \
			min-height: 120px; \
			z-index: 998; \
			text-align: center; \
			font-size: 75%; \
			position: absolute; \
			top: 0px; \
			left: -22px; \
			width: 12px; \
			background-color: #FFFFFF; \
			border-top: 1px solid #000000; \
			border-left: 1px solid #000000; \
			border-bottom: 1px solid #000000; \
			cursor: pointer; \
			color: #0077CC; \
			padding: 1px 4px; \
		} \
		#pBox { \
			text-align: center; \
			height: 238px; \
			display: none; \
		} \
		#videoList { \
			float: left; \
			height: 238px; \
			width: 270px; \
			overflow-y: auto; \
			overflow-x: hidden; \
			border-right: 1px solid #6B90DA; \
		}\
		#vidTag, #imageTag, #playerTag { \
			text-align: center; \
			margin: 0px; \
			padding: 0px 8px; \
			font-size: 14px; \
		} \
		#playerTag, #controlArea { \
			height: 16px; \
		} \
		#embedArea { \
			height: 206px; \
		} \
		.rl-item { \
			max-width: 100px; \
			float: left; \
			padding: 5px 10px; \
		} \
		.rl-thumbnail img { \
			max-width: 100px; \
		} \
		.rl-domain-below { \
			overflow-x: hidden; \
			width: 100px; \
		} \
		.rl-details, .rl-snippet, .rl-snippet-grid-view, .rl-watch-on, .rl-cannot-play-here, .rl-special { \
			display: none; \
		} \
		#imageList { \
			text-align: center; \
			height: 238px; \
			width: 270px; \
			float: right; \
			z-index: 1001; \
			overflow-y: auto; \
			overflow-x: hidden; \
		} \
		#imageList img { \
			max-width: 100px; \
		} \
		.playing { \
			display: block !important; \
			z-index: 1004 !important; \
		} \
		.imgShowing { \
			display: block !important; \
			z-index: 1004 !important; \
		} \
		.imgShowing img { \
			max-height: 190px; \
			max-width: 380px; \
			margin-top: 2px; \
		} \
		.sldImgs { \
			display: block; \
		} \
		#vBox { \
		} \
		#resOL { \
			padding-left: 4px; \
		} \
		#res { \
			margin: 0px !important; \
		} \
		#ssb { \
			margin: 0px !important; \
		} /* "; /* End Stylesheet */

	this.classic_stylesheet = " \
		#center_col { \
			margin-right: 0px; \
		} \
		#foot { \
			clear: both; \
		} \
		#mBox { \
			width: 400px; \
		} \
		#pBox { \
			vertical-align: middle; \
			overflow: hidden; \
			width: 400px; \
		} \
		.playing, .imgShowing { \
			position: relative; \
		} \
		.playing .embedArea { \
			height: 400px; \
		} \
		.rBox { \
			float: right; \
			text-align: center; \
		} \
		.wBBord { \
			border-bottom: 1px solid #6B90DA; \
		} \
		#setShow, .blocked { \
			display: block; \
		} \
		#vidTag, #imageTag { \
			margin: 0px; \
		} \
		#playerTag { \
			height: 20px; \
		} \
		#vBox { \
			height: 305px; \
		} \
		.playimg { \
			max-width: 400px; \
			max-height: 345px; \
			border-style: none; \
		} \
		#videoList { \
			width: 180px; \
		} \
		#imageList { \
			width: 220px; \
		} \
		#ssb { \
			position: relative; \
			height: 25px; \
		} \
		#resStat { \
			display: inline; \
			position: absolute; \
			top: 1px; \
			right: 0px; \
		} \
		#resOL { \
			margin: 0px 2% 0px .1em; \
		} \
		.toLI { \
			display: list-item; \
		} \
		.reAddAd { \
			width: 100px; \
		} \
		.g { \
			margin-top: 0px; \
			min-width: 540px; \
		} \
		#dymTxt { \
			margin: 5px; \
		} \
		#ssb { \
			position: relative; \
			height: 25px; \
		} \
		#rsStats { \
			display: inline; \
			float: right; \
		} \
		#prs { \
			display: inline; \
		} \
		.vidRes { \
			width: 145px; \
			display: block; \
		} \
		.vidRes .g { \
			margin: 0px; \
			 min-width: 0px; \
			 margin-left: 1em; \
		} \
		.vidRes img { \
			width: 137px; \
			height: 97px; \
		} \
		.vrTitle { \
			margin-bottom: 30px; \
		} \
		#exvidlist { \
			width: 170px; \
		} \
		.playing #embedArea { \
			height: 340px; \
		} \
		.vid_thumb { \
			width: 140px; \
			height: 100px; \
			padding: 0px 10px; \
			border-style: none; \
			border-bottom: 1px solid #000000; \
		} \
		.vid_result { \
			font-size: 11pt; \
			border: 1px solid #000000; \
			margin: 9px; \
		} \
		.vid_result a { \
			text-decoration: none; \
		} \
		#ssb { \
			margin-bottom: 0px; \
			padding-bottom: 0px; \
		} \
		#hidePly { \
			display: none; \
		} \
		#slideShow { \
			position: fixed; \
			text-align: center; \
			padding: 15px; \
			top: 50%; \
			left: 50%; \
			z-index: 9998; \
			background-color: #FFFFFF; \
			border: 1px solid #000000; \
		} \
		.sldImgs { \
			max-width: " + maxwidth + "px; \
			max-height: " + maxheight + "px; \
		} \
		#sldLink { \
			text-align: center; \
		} \
		#next{ \
			float: right; \
		} \
		#prev { \
			float: left; \
		} \
		#res { \
			padding-right: 0px; \
			margin-top: 0px; \
		} \
		#wikiHeader { \
			font-size: 115%; \
			padding-left: .2em; \
		} \
		#wikiDesc { \
			font-size: 75%; \
			margin: 0px; \
			padding: .2em; \
			text-indent: 3em; \
			border-width: 1px; \
			border-style: solid; \
		} \
		#wikiDiv { \
			width: 580px; \
			margin-bottom: .5em; \
		} \
		.ts td { \
			padding: 0px 0px 0px 17px; \
		} /* "; /* End Stylesheet */


	this.clrpicker_stylesheet = " \
		.colorContainer { \
			position: fixed; \
			z-index: 10001; \
			background-color: #FFFFFF; \
			padding: 8px; \
			border: 1px solid #000000; \
			-moz-border-radius: 3px; \
		} \
		.configColorBox { \
			width: 15px; \
			height: 15px; \
			border: 1px solid #000000; \
			cursor: pointer; \
			-moz-border-radius: 3px; \
		} \
		.colorToneToBlack { \
			width: 255px; \
		} \
		.colorBar { \
			width: 40px; \
		} \
		.colorToneToBlack, .colorBar { \
			position: relative; \
			height: 255px; \
		} /* "; /* End Stylesheet */



	this.dock_stylesheet = " \
		body { \
			margin-bottom: 50px; \
		}  \
		a img { \
			border-style: none; \
		}  \
		.closed { \
			display: none; \
		}  \
		#dock { \
			position: fixed; \
			height: 40px; \
			width: 260px; \
			border: 1px solid #000000; \
			border-bottom-style: none; \
			bottom: 0px; \
			right: 50%; \
			margin-right: -130px; \
			text-align: center; \
			background-color: #F0F7F9; \
		}  \
		.dockLink { \
			padding: 1em 1.25em; \
			display: inline; \
			cursor: pointer; \
			float: left; \
		}  \
		#wikiHeader { \
			font-size: 18pt; \
			padding-left: .5em; \
		}  \
		.wiki_p { \
			text-indent: 1.5em; \
		}  \
		#playerTag { \
			text-align: center; \
			margin-top: 0px; \
		}  \
		#pBox { \
			position: relative; \
			display: none; \
		}  \
		#pBox, #videoList, .imgLink img, #imageList { \
		}  \
		#playerTag, #vidTag, #imageTag { \
			text-shadow: -1px 0px #888888; \
		}  \
		.vid_result { \
			display: -moz-stack; \
			width: 16%; \
			margin: 1px 2%; \
			text-align: center; \
		}  \
		.vid_result img { \
			max-height: 120px; \
			max-width: 90px; \
			display: block; \
			margin: 5px auto; \
		} \
		#vBox { \
			height: 480px; \
		}  \
		.playing #embedArea { \
			height: 400px; \
		}  \
		#videoList, #imageList { \
			border-top-style: none; \
			text-align: center; \
		}  \
		.rl-domain { \
			display: block; \
		}  \
		#miniSldLink { \
			cursor: pointer; \
			float: right; \
			font-size: small; \
			padding: 2px 4px; \
			margin-top: 1px; \
			text-shadow: -1px 1px #666666; \
		}  \
		#miniSldLink:hover { \
			background-color: #FFFFFF; \
			color: #000000; \
			text-shadow: -1px 1px #CCCCCC; \
		}  \
		#imageList input { \
			display: block; \
			margin: 5px auto; \
		}  \
		.imgShowing, .playing { \
			display: block !important; \
			text-align: center; \
		} \
		.imgShowing img{ \
			max-height: 400px; \
			max-width: 85%; \
		}  \
		.imgLink { \
			margin: 1%; \
			vertical-align: middle; \
		}  \
		.imgLink img { \
			padding: 2px; \
			background-color: #555555; \
		}  \
		.imgDetails { \
			display: inline-block !important; \
		} \
		.aset { \
			display: inline !important; \
		} /* "; /* End Stylesheet */

	this.gen_stylesheet = " \
		html, body { \
			background-color: rgb(" + options.genbgclr + "); \
			color: rgb(" + options.restxtclr + "); \
			margin: 0px; \
		} \
		.csb, .ss, #logo span, .play_icon, .mini_play_icon, .micon, .close_btn, #tbp, .mbi { \
			background-image: url(" + iconSheetTrans() + "); \
		} \
		#gbar, #guser { \
			background-color: rgb(" + options.glbarclr + "); \
			padding-top: 3px !important; \
		} \
		#guser { \
			margin-right: 0px; \
			padding-right: 8px; \
		} \
		#cnt, #leftnav, #tbd, #atd, #tsf, #hidden_modes, #hmp { \
			background-color: rgb(" + options.resltclr + "); \
		} \
		#wikiHeader a, #wikiHeader, #mBox, .detailedImgInfo, #newVer { \
			background-color: rgb(" + options.addedclr + "); \
			color: rgb(" + options.mdatxtclr + "); \
		} \
		#wikiDesc { \
			border-color: rgb(" + options.addedclr + "); \
		} \
		.embeddable { \
			background-color: rgb(" + options.plyblclr + "); \
		} \
		.embeddable a { \
			color: rgb(" + options.pbltxtclr + ") !important; \
		} \
		a:link, .w, .q:active, .q:visited, .tbotu, #fll a, #bfl a, #newVer a { \
			color: rgb(" + options.lnktxtclr + "); \
		} \
		li.g span cite { \
			color: rgb(" + options.urltxtclr + "); \
		} \
		.gl, .f, .m, .c h2, #mbEnd h2, #tads h2, .descbox, .fl, .fl a, .flt, .gl a:link, a.mblink, .mblink b { \
			color: rgb(" + options.simtxtclr + ") !important; \
		} \
		.removed { \
			display: none !important; \
		} \
		#greyOut { \
			background-color: rgb(" + options.ovrlyclr + "); \
			opacity: .6; \
			width: 100%; \
			height: 100%; \
			z-index: 1000; \
			position: fixed; \
			top: 0px; \
			left: 0px; \
		} \
		#gbLoader { \
			position: absolute; \
			top: 25px; \
			right: 3px; \
		} \
		.confLbl { \
			font-size: small; \
			display: inline; \
		} \
		 .opli { \
			display: inline; \
		} \
		 .confTab { \
			margin: 0px; \
			padding: 2px 4px; \
			border: 1px solid black; \
		} \
		#confWel, #styleWel { \
			border-bottom: 1px solid black; \
			font-size: 22pt; \
			font-family: serif; \
			text-align: center; \
			background-color: #F0F7F9; \
			-moz-border-radius-topleft: 5px; \
			-moz-border-radius-topright: 5px; \
		} \
		#slideShow { \
			position: fixed; \
			text-align: center; \
			padding: 15px; \
			top: 50%; \
			left: 50%; \
			z-index: 9998; \
			background-color: white; \
			border: 1px solid black; \
		} \
		.config_section_head { \
			margin: 6px 0px; \
			border-bottom: 1px solid grey; \
		} \
		 #confWrap { \
			height: 427px; \
			border-bottom: 1px solid black; \
			margin-bottom: 2px; \
		} \
		.config_option { \
			margin: 2px; \
		} \
		.sldImgs { \
			display: block; \
		} \
		 .keycuts { \
			width: 100%; \
		} \
		 .keycuts em { \
			text-decoration: underline; \
			font-weight: bold; \
		} \
		.conf_Tab, #confTabs { \
			background-color: #F0F7F9; \
		} \
		 #t_AbtConf { \
			background-color: #F0F7F9 !important; \
		} \
		#hidePly { \
			background-color: #FFFFFF; \
			color: #FF0000; \
			border-bottom: 1px solid #000000; \
			border-left: 1px solid #000000; \
			font-size: 50%; \
			position: absolute; \
			top: 0px; \
			right: 0px; \
			width: 1.1em; \
			height: 1.1em; \
			cursor: pointer; \
		} \
		#confTabs { \
			height: 19px; \
			border-bottom: 1px solid #000000; \
			position: relative; \
			margin-bottom: 3px; \
		} \
		 .conf_Tab { \
			padding: 0px 0.5em .25em .5em; \
			margin-top: 4px; \
			border-bottom: 1px solid black; \
			border-right: 1px solid black; \
			display: inline; \
			z-index: 10001; \
			cursor: pointer; \
			line-height: 16px; \
		} \
		.selected_tab { \
			border-bottom-color: #FFFFFF; \
			background-color: #FFFFFF; \
		} \
		 .confTabOn { \
			margin: .7em; \
		} \
		 .confTabOn label { \
			margin: .2em 0px; \
		} \
		 .confTabOn button { \
			margin: .5em 0px; \
		} \
		#t_AbtConf { \
			border-color: #000000 !important; \
			display: block; \
			position: absolute; \
			top: -4px; \
			right: 0px; \
			text-align: right; \
			border-right-style: none; \
			z-index: 10000; \
		} \
		#AbtConf p { \
			margin-top: 0px; \
		} \
		 #deapallFault, #sNc { \
			margin-left: .2em; \
		} \
		#newVer { \
			text-align: center; \
			font-size: 90%; \
			padding: 1px; \
		} \
		#newVer a  { \
			display: block; \
		} \
		.newVerAvailable { \
			font-weight: bold; \
			font-size: 120%; \
		} \
		.GB_dialog_popup { \
			position: fixed; \
			left: 50%; \
			top: 50%; \
			width: 500px; \
			height: 520px; \
			margin-left: -250px; \
			margin-top: -260px; \
			z-index: 9999; \
			background-color: white; \
			border: 1px solid black; \
			-moz-border-radius: 5px; \
			color: #000000 !important; \
		} \
		#res { \
			margin: 0px 8px; \
		} \
		 #cnt { \
			max-width: 100%; \
		} \
		#ssb { \
			height: auto; \
			overflow: hidden; \
		} \
		.imgSizelarge { \
			max-width: 130px; \
			max-height: 130px; \
			display: block; \
			margin: 5px auto; \
		} \
		.imgSizemedium { \
			max-width: 90px; \
			max-height: 90px; \
			display: inline-block; \
			margin: 5px; \
		} \
		.imgSizesmall { \
			max-width: 50px; \
			max-height: 50px; \
			display: inline-block; \
			margin: 5px; \
		} \
		.titleOnly, .imgDetails { \
			display: block; \
			font-size: 9pt; \
			margin: 1em; \
		} \
		.detailedImgInfo { \
			display: block; \
			text-decoration: none; \
		} \
		.conf_subsect { \
			margin-bottom: 10px; \
		} \
		.error { \
			color:#FF0000; \
		} \
		.controlIcon { \
			cursor: pointer; \
		} /* "; /* End Stylesheet */

	this.media_stylesheet = " \
		a, img {  \
			border-style: none; \
		} \
		#res {  \
			padding-top: 7px;  \
		} \
		#center_col { \
			margin-right: 0px; \
		} \
		#videoList { \
			border: 1px solid black;  \
			overflow: auto; \
			width: " + ( !options.imgs ? '100%' : '55%' ) + "; \
			height: auto; \
			margin-top: 1%; \
		} \
		.vid_thumb { \
			max-width: 120px; \
			max-height: 120px; \
		} \
		#videoList p { \
			margin-top: 0px; \
			margin-bottom: 5px; \
			text-decoration: underline; \
		} \
		#resOL { \
			position: absolute; \
			right: 0px; \
			top: 7px; \
			width: 44%; \
			overflow: auto; \
			height: " + (!options.vids || !options.imgs ? '500px' : '300px') + "; \
		} \
		#imageList { \
			border: 1px solid black; \
			overflow: auto; \
			width: " + (!options.vids ? '100%' : '44%') + "; \
			height: " + (!options.vids ? '190px' : 'auto') + "; \
			position: " + (!options.vids ? 'static' : 'absolute') + "; \
			top: 312px; \
			right: 0px; \
			margin-top: " + (!options.vids ? '4px' : '1%') + "; \
			text-align: center; \
		} \
		#imageList img { \
			margin: " + (!options.vids ? '4px' : '1.4%') + "; \
			padding: " + (!options.vids ? '4px' : '0px') + "; \
		} \
		#pBox { \
			border: 1px solid black; \
			height: 500px; \
			text-align: center; \
			width: 55%; \
		} \
		#embedArea img { \
			max-width: 95%; \
			max-height: 95%; \
			margin-top: 1%; \
		} \
		#playerTag { \
			font-size: 16px; \
			height: 16px; \
		} \
		#controlArea { \
			height: 16px; \
		} \
		.controlIcon { \
			padding: 0px; \
		} \
		#embedArea { \
			height: " + ("468") + "px; \
		} \
		#hidePly { \
			display: none !important; \
		} \
		.removed, .rl-details, .rl-snippet, \
		.rl-short-snippet, .rl-snippet-grid-view, \
		.rl-watch-on, .rl-special, .rl-cannot-play-here { \
			display: none;  \
		} \
		#wikiHeader { \
			font-size: 115%; \
			padding-left: .2em; \
		} \
		#wikiDesc { \
			font-size: 75%; \
			margin: 0px; \
			padding: .2em; \
			text-indent: 3em; \
		} \
		#wikiDiv { \
			width: 100%; \
			margin-bottom: .5em; \
			margin-top: 1%; \
		} \
		#res { \
			padding-right: 0px; \
			position: relative; \
		} \
		.vid_result, .rl-res { \
			width: 120px; \
			margin-left: 2%; \
			margin-right: 2%; \
			display: inline-table; \
			height: auto; \
			text-align: center; \
		} \
		.thumbnail-img { \
			width: 100px; \
			height: 80px; \
		} \
		.rl-metadata, .rl-thumbnail { \
			display: block; \
			font-size: small; \
		} /* "; /* End Stylesheet */

	this.multisearch_stylesheet = " \
		#currentSearch { \
			margin-top: 0px !important; \
		} \
		.lsbb { \
			white-space: nowrap; \
		} \
		#allSearches { \
			background-color: #FFFFFF; \
			z-index: 1000; \
		} \
		#expand, #collapse { \
			cursor: pointer; \
			font-family: sans-serif; \
			float: right; \
			color: #0077CC; \
			margin-right: 3px; \
			margin-bottom: 2px; \
		} \
		#collapse { \
			font-size: 60%; \
			padding-left: .3em; \
			padding-right: .35em; \
		} \
		#expand { \
			font-size: 50%; \
			padding-left: .2em; \
			padding-right: .25em; \
		} \
		.TabHead { \
			font-size: 75%; \
			color: #555555; \
			margin: 0px; \
			margin-left: 1em; \
			display: inline; \
		} \
		.siteSelector { \
			display: inline; \
			margin-left: 1em; \
			margin-bottom: 1em; \
		} \
		.searchBoxes { \
			display: inline; \
			margin-left: 1em; \
			width: 50%; \
		} \
		.closeBtn { \
			color: red; \
			display: inline; \
			margin: 0px; \
			cursor: pointer; \
			font-size: 50%; \
			vertical-align: top; \
			margin-left: .8em; \
		} \
		#expandedMulti { \
			padding-top: 10px; \
		} \
		#adding { \
			margin-left: 3em; \
			cursor: pointer; \
			font-size: 85%; \
			color: blue; \
			margin-top: -1em; \
		} \
		#searchAll { \
			font-size: normal; \
		} \
		#otherSearchContent { \
			margin-bottom: 44px; \
		} \
		.gac_m { \
			z-index: 1500 !important; \
			border: 1px solid #D0D0D0 !important; \
			border-top-style: none !important; \
		} \
		.ts td { \
			padding-left: 4px !important; \
		} /* "; /* End Stylesheet */
/**	
  *	Relies on importing for retrieving stylesheets
  *	
  *	@depends style-assignment-header.js
  *	@depends assign-style-center.js
  *	@depends center-styles.css
  *	@depends assign-style-classic.js
  *	@depends classic-styles.css
  *	@depends assign-style-color.js
  *	@depends color-picker.css
  *	@depends assign-style-column.js
  *	@depends column-styles.css
  *	@depends assign-style-dock.js
  *	@depends dock-styles.css
  *	@depends assign-style-gen.js
  *	@depends general-styles.css
  *	@depends assign-style-media.js
  *	@depends media-styles.css
  *	@depends assign-style-multi.js
  *	@depends multisearch-styles.css
  */
  
}
  
var ssStore = new stylesheet_store();

/**	=================================================================
  *	End Style Store
  *	=================================================================
  */

/**
  *	Import Dependencies
  *	
  *	@depends media-embed.js
  *	@depends stylesheet-store.js
  */
  // Start Display Functions ---------------------------------------------------------
// Adds all the styles for the page.
function allStyles () {
	var maxwidth = window.innerWidth - 50;
	var maxheight = window.innerHeight - 100;
	
	if(document.getElementsByClassName("g")[0]) {
		var lists = document.getElementsByClassName("g")[0].parentNode;
		lists.id = "resOL";
		dockShow = lists;
	}
	
	if (options.styl == "media" && (options.imgs || options.vids)) {
		GM_addStyle(ssStore.media_stylesheet);
		$("resOL").parentNode.className = "resBox";
		$("resOL").parentNode.appendChild($("nav"));
		
	} else if (options.styl == "dock") {
		GM_addStyle(ssStore.dock_stylesheet);
		
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
			if ($('resOL').className == "removed") {
				$('resOL').className = "";
				dockShow.className = "removed";
				$("nav").className = "";
				dockShow = $('resOL');
			}
			e.stopPropagation();
			e.preventDefault();
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
				e.stopPropagation();
				e.preventDefault();
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
				e.stopPropagation();
				e.preventDefault();
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
				e.stopPropagation();
				e.preventDefault();
			}, false);
			dock.appendChild(icon);
		}
		
		document.body.appendChild(dock);
	} else if (options.styl == "center") {
		GM_addStyle(ssStore.center_stylesheet);
	} else {
		GM_addStyle(ssStore.classic_stylesheet);
	}
	
	GM_addStyle(ssStore.gen_stylesheet);
	
	GM_addStyle(ssStore.multisearch_stylesheet);
	
	GM_addStyle(ssStore.clrpicker_stylesheet);
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
	embedder = new Media_Embed();
	embedder.draw($('mBox'));
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
// Change the Google logo to be transparent
function logoToTrans() {
	var currLogo = $('logo').childNodes[1];
	
	var canvas = $create('canvas', {
		id : 'transLogo'
	});
	var ctx = canvas.getContext('2d');
	ctx.drawImage(currLogo, 0, 41,137,49,0,0,137,49);
	
	var imgd = ctx.getImageData(0, 0, 137, 49);
	var pix = imgd.data
	for (var i = 0, n = pix.length; i < n; i += 4) {
		pix[i+3] = 255 - Math.min(pix[i],Math.min(pix[i+1],pix[i+2]));
	}
	ctx.putImageData(imgd, 0, 0);
	
	removeAllChildren($('logo'));
	$('logo').appendChild(canvas);
}
// Change the icon sheet from Google to be transparent
function iconSheetTrans() {
	var img = new Image();
	img.src = "/images/srpr/nav_logo13.png";
	
	var canvas = $create('canvas', {
		id : 'transLogo',
		width: 167,
		height: 222
	});
	var ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0,167,222);
	
	var imgd = ctx.getImageData(0, 0, 167, 222);
	var pix = imgd.data
	for (var i = 0, n = pix.length; i < n; i += 4) {
		if(pix[i+3] != 0 && (Math.abs(pix[i] - pix[i+1]) < 75 && Math.abs(pix[i+1] - pix[i+2]) < 75) ) {
			pix[i+3] = Math.sqrt(255) * Math.sqrt(255 - Math.min(pix[i],Math.min(pix[i+1],pix[i+2])));
		}
	}
	ctx.putImageData(imgd, 0, 0);
	
	return canvas.toDataURL("image/png");
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
	
	divHolder.appendChild($create("span", {
		textContent : "A newer version of Google Bump is available.",
		className : "newVerAvailable"
	}));
	
	var uplink = $create("a", {
		href : "http://userscripts.org/scripts/source/33449.user.js",
		textContent : "Update Google Bump"
	});
	divHolder.appendChild(uplink);
	
	// divHolder.appendChild($create("textNode", " | "));
	
	uplink = $create("a", {
		href : "http://userscripts.org/scripts/show/33449#full_description",
		textContent : "Change Log"
	});
	divHolder.appendChild(uplink);
	
	$("leftnav").insertBefore(divHolder, $('leftnav').childNodes[0]);
}
	// End Update Script -----------------------------------------------------------------

/**
  *	General Purpose Color Picker
  */
function color_picker(color) {
	
	this.clickHandles = [];
	this.color = color;
	this.bwCanvas;
	this.bwCtx;
	this.cbCanvas;
	this.cbCtx;
	this.container;
	
	this.draw = function (attachedNode) {
		this.container = $create('div', {
			'className' : 'colorContainer'
		});
		this.drawBW(this.color);
		this.drawCB(0);
		
		document.body.appendChild(this.container);
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
	
	this.drawCB = function (yOffset) {
		// Color Bar
		this.cbCanvas = $create('canvas', {
			'className' : 'colorBar'
		});
		this.cbCanvas.width = 40;
		this.cbCanvas.height = 255;
		this.cbCanvas.style.position = 'relative';
		this.container.appendChild(this.cbCanvas);
		this.cbCtx = this.cbCanvas.getContext('2d');
		this.redrawCB(yOffset);
			
		var SR = this;
		this.cbCanvas.addEventListener('click', function (e) { SR.colorPick(e) }, false);
	};
	
	this.redrawCB = function (yOffset) {
		this.cbCtx.clearRect(0,0,255,255);
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
		
		this.cbCtx.strokeStyle = "rgba(255,255,255,1)";
		this.cbCtx.strokeRect(7,yOffset-2, 26, 5);
		this.cbCtx.strokeStyle = "rgba(0,0,0,1)";
		this.cbCtx.strokeRect(6,yOffset-3,28,7);
	};
	
	this.colorPick = function (e) {
		e.stopPropagation();
		e.preventDefault();
		if(e.layerX >= 10 && e.layerX < 30) {
			var data = this.cbCtx.getImageData(e.layerX, e.layerY, 1, 1).data;
			
			this.redrawCB(e.layerY);
			
			this.color = data[0] + ',' + data[1] + ',' + data[2];
			this.redrawBW(this.color);
		}
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

/**
  *	Import dependencies
  *	
  *	@depends color-picker.js
  */

/**
  *	Configuration tab
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

/**
  *	Configuration window
  */
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

/**
  *	Configuration section
  */
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
			if(this.sectionOptions[soo].cbox) {
				this.checkboxes++;
			} else {
				this.selectboxes++;
			}
		}
		parentNode.appendChild(sect);
	};
	
	this.SelectAll = function () {
		for (var so = 0; so < this.sectionOptions.length; so++) {
			if(this.sectionOptions[so].cbox) {
				this.sectionOptions[so].cbox.checked = true;
			}
		}
	};
	
	this.DeselectAll = function () {
		for (var so = 0; so < this.sectionOptions.length; so++) {
			if(this.sectionOptions[so].cbox) {
				this.sectionOptions[so].cbox.checked = false;
			}
		}
	};
	
	this.setDefaults = function () {
		for (var so = 0; so < this.sectionOptions.length; so++) {
			this.sectionOptions[so].setDefault();
		}
	};
}

/**
  *	Configuration descriptoin area
  */  
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
	
	this.setDefault = function () {
		return;
	};
}

/**
  *	Configuration boolean check box
  */
function config_checkBox(label, id, dflt) {
	
	this.label = label;
	this.id = id;
	this.value = GM_getValue(id, dflt);
	this.defaultVal = dflt;
	this.cbox;
	
	this.draw = function (parentNode) {
		var lbl = $create("label", {
			textContent : this.label + ": ",
			"for" : this.id
		});
		this.cbox = $create("input",{
			type : "checkbox",
			name : this.id,
			id : this.id
		});
		if (this.value) {
			this.cbox.checked = true;
		}
		this.cbox.addEventListener("change", function(event) {
			GM_setValue(event.target.id, event.target.checked); 
		}, true);
		
		var hldr = $create('div', {
			className : 'config_option'
		});
		
		hldr.appendChild(lbl);
		hldr.appendChild(this.cbox);
		parentNode.appendChild(hldr);
	};
	
	this.setDefault = function () {
		if (this.cbox) {
			this.cbox.checked = this.defaultVal;
			GM_setValue(this.id, this.defaultVal);
		}
	};
}

/**
  *	Configuration list selection box
  */
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
		
		var hldr = $create('div', {
			className : 'config_option'
		});
		
		hldr.appendChild(disp);
		hldr.appendChild(this.list);
		parentNode.appendChild(hldr);
	};
	
	this.setDefault = function () {
		if (this.list) {
			this.list.value = this.defaultVal;
			GM_setValue(this.id, this.defaultVal);
		}
	};
}

/**
  *	Configuration color selector
  */
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
		this.box = $create("input", {
			type : 'text',
			name : this.id,
			className : "configColorBox"
		});
		this.box.style.backgroundColor = 'rgb(' + this.currentValue + ')';
		
		this.popout = popupManager.newColor();
		
		var SR = this;
		this.box.addEventListener("click", function(event) { 
			this.blur();
			
			offLeft = 0;
			offTop = 0;
			var node = this;
			while(node != document.body) {
				offLeft += node.offsetLeft + 1;
				offTop += node.offsetTop + 1;
				node = node.offsetParent;
			}
			
			popupManager.closeColor();
			SR.popout.draw(SR.box);
			SR.popout.container.style.top = Math.min(window.innerHeight - 276, (offTop - 1)) + "px";
			SR.popout.container.style.left = Math.min(window.innerWidth - 313, (offLeft - 1)) + "px";
			
			document.addEventListener('click', function (e) {
				if(e.target.className != 'colorContainer' && (e.target.parentNode && e.target.parentNode.className != 'colorContainer')) {
					popupManager.closeColor();
					document.removeEventListener('click', arguments.callee, false);
				} else {
					e.stopPropagation();
				}
			}, false);
			event.stopPropagation();
		}, true);
		this.popout.registerClick(function(e, clr) {
			SR.box.style.backgroundColor = "rgb(" + clr + ")";
			GM_setValue(id, clr);
			popupManager.closeColor();
		});
		
		var hldr = $create('div', {
			className : 'config_option'
		});
		
		hldr.appendChild(disp);
		hldr.appendChild(this.box);
		parentNode.appendChild(hldr);
	};
	
	this.setDefault = function () {
		if (this.box) {
			this.box.style.backgroundColor = 'rgb(' + this.defaultVal + ')';
			GM_setValue(this.id, this.defaultVal);
		}
	};
}

/**
  *	General purpose button object
  */
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
		this.btn = undefined;
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

/**	popup_manager
  *	Popup Dialog Manager Object
  *	
  *	Functions
  *		newSlideShow
  *			<= Return popup_dialog => Creates a new slideshow
  *		
  *		newStyler
  *			<= Return popup_dialog => Creates a new styler dialog
  *		
  *		newConfig
  *			<= Return popup_dialog => Creates a new configuration dialog
  *		
  *		newColor
  *			<= Return popup_dialog => Creates a new color popup
  *		
  *		newPopup
  *			<= Return popup_dialog => Creates a new popup of a given type
  *		
  *		closeAll
  *			Closes any open popups
  *		
  *		closeColor
  *			Closes any open color popups
  *		
  *		readySwitch
  *			Prepares the page for switching dialogs
  *	
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
		this.shader = undefined;
	};
	
	this.is_drawn = function () {
		return this.shader && this.dialog.isDrawn;
	};
};

/**	style_dialog
  *	Style Dialog Object
  *	
  *	Construction Parameters
  *		popup		The popup_dialog object it was created with
  *	
  *	Functions
  *		draw
  *			Draw the dialog on the page
  *	
  *		undraw
  *			Undraw the dialog
  *	
  *		setDefaults
  *			Set the defaults for all of the options
  *	
  */
function style_dialog(popup) {
	
	this.dialog;
	this.windows = new Array();
	this.isDrawn = false;
	this.popup = popup;
	
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
		var bgcTab = new config_tab("Backgrounds", "t_BgColrs", genTab);
		var txcTab = new config_tab("Fonts", "t_TxColrs", genTab);
		var clcTab = new config_tab("Classic", "t_ClscStyl", genTab);
		var mdaTab = new config_tab("Media", "t_MdaStyl", genTab);
		var dckTab = new config_tab("Dock", "t_DockStyl", genTab);
		var cntTab = new config_tab("Center", "t_CentStyl", genTab);
		
		genTab.draw(tabHead);
		bgcTab.draw(tabHead);
		txcTab.draw(tabHead);
		clcTab.draw(tabHead);
		mdaTab.draw(tabHead);
		dckTab.draw(tabHead);
		cntTab.draw(tabHead);
		
		// Background Settings
		var bgc_set_window = new config_window(bgcTab, 'BgColrs');
			// Colors
		var bgc_section = new config_section("Background Colors");
		bgc_section.sectionOptions.push(new config_colorBox('Body (Mostly for Center Style)', 'genbgclr', options.DEFAULT_GENBGCLR));
		bgc_section.sectionOptions.push(new config_colorBox('Main Area', 'resltclr', options.DEFAULT_RESLTCLR));
		bgc_section.sectionOptions.push(new config_colorBox('Google Bar (Top)', 'glbarclr', options.DEFAULT_GLBARCLR));
		bgc_section.sectionOptions.push(new config_colorBox('Added Items', 'addedclr', options.DEFAULT_ADDEDCLR));
		bgc_section.sectionOptions.push(new config_colorBox('Embedable Videos', 'plyblclr', options.DEFAULT_PLYBLCLR));
		bgc_section.sectionOptions.push(new config_colorBox('Overlay', 'ovrlyclr', options.DEFAULT_OVRLYCLR));
		bgc_set_window.sections.push(bgc_section);
		
		// Font Settings
		var txc_set_window = new config_window(txcTab, 'TxColrs');
			// Colors
		var txc_section = new config_section("Text Colors");
		txc_section.sectionOptions.push(new config_colorBox('General', 'restxtclr', options.DEFAULT_RESTXTCLR));
		txc_section.sectionOptions.push(new config_colorBox('Links', 'lnktxtclr', options.DEFAULT_LNKTXTCLR));
		txc_section.sectionOptions.push(new config_colorBox('Result URL', 'urltxtclr', options.DEFAULT_URLTXTCLR));
		txc_section.sectionOptions.push(new config_colorBox('Similar and Paging Links', 'simtxtclr', options.DEFAULT_SIMTXTCLR));
		txc_section.sectionOptions.push(new config_colorBox('Added Items', 'mdatxtclr', options.DEFAULT_MDATXTCLR));
		txc_section.sectionOptions.push(new config_colorBox('Embed Area Text', 'plytxtclr', options.DEFAULT_PLYTXTCLR));
		txc_section.sectionOptions.push(new config_colorBox('Embedable Videos', 'pbltxtclr', options.DEFAULT_PBLTXTCLR));
		txc_set_window.sections.push(txc_section);
		
		// Classic Settings
		var classic_set_window = new config_window(clcTab, "ClscStyl");
			// General Settings
		var classic_section = new config_section();
		classic_section.sectionOptions.push(new config_desc_section('Coming Soon', 'This section is still under construction. Please excuse our mess.'));
		classic_set_window.sections.push(classic_section);
		
		// Media Settings
		var media_set_window = new config_window(mdaTab, "MdaStyl");
			// General Settings
		var media_section = new config_section();
		media_section.sectionOptions.push(new config_desc_section('Coming Soon', 'This section is still under construction. Please excuse our mess.'));
		media_set_window.sections.push(media_section);
		
		// Dock Settings
		var dock_set_window = new config_window(dckTab, "DockStyl");
			// General Settings
		var dock_section = new config_section();
		dock_section.sectionOptions.push(new config_desc_section('Coming Soon', 'This section is still under construction. Please excuse our mess.'));
		dock_set_window.sections.push(dock_section);
		
		// Center Settings
		var center_set_window = new config_window(cntTab, "CentStyl");
			// General Settings
		var center_section = new config_section();
		center_section.sectionOptions.push(new config_desc_section('Coming Soon', 'This section is still under construction. Please excuse our mess.'));
		center_set_window.sections.push(center_section);
		
		// General Settings
		var gen_set_window = new config_window(genTab, "GenStyl");
			// Styles
		var gen_section = new config_section("Style");
		gen_section.sectionOptions.push(new config_selectionBox("Layout Style", "style", ["Classic", "Media", "Dock",/* "Columns",*/ "Centered"], ["classic", "media", "dock",/* "column",*/ "center"], options.DEFAULT_STYL));
		gen_set_window.sections.push(gen_section);
		
		// Draw the windows
		bgc_set_window.draw(wrapper);
		txc_set_window.draw(wrapper);
		classic_set_window.draw(wrapper);
		media_set_window.draw(wrapper);
		dock_set_window.draw(wrapper);
		center_set_window.draw(wrapper);
		gen_set_window.draw(wrapper);
		
		// Push them to the windows array
		this.windows.push(bgc_set_window);
		this.windows.push(txc_set_window);
		this.windows.push(classic_set_window);
		this.windows.push(media_set_window);
		this.windows.push(dock_set_window);
		this.windows.push(center_set_window);
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
	
	this.setDefaults = function () {
		for (var wo = 0; wo < this.windows.length; wo++) {
			this.windows[wo].setDefaults();
		}
	};
	
}

/**	config_dialog
  *	Configuration Dialog Object
  *	
  *	Construction Parameters
  *		popup		The popup_dialog object it was created with
  *	
  *	Functions
  *		draw
  *			Draw the dialog on the page
  *	
  *		undraw
  *			Undraw the dialog
  *	
  *		setDefaults
  *			Set the defaults for all of the options
  *		
  */
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
		var appTab = new config_tab("Clutter", "t_AppConf", genTab);
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
		// app_section.sectionOptions.push(new config_checkBox("Add Margins", "margs", options.DEFAULT_MARGS));
		app_section.sectionOptions.push(new config_checkBox("Remove Suggestions", "sugges", options.DEFAULT_SUGGES));
		app_section.sectionOptions.push(new config_checkBox("Move \"Did you mean\" text", "dym", options.DEFAULT_DYM));
		app_section.sectionOptions.push(new config_checkBox("Remove Sidebar Ads", "sideads", options.DEFAULT_SIDEADS));
		app_set_window.sections.push(app_section);
		
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
		sld_section.sectionOptions.push(new config_checkBox("Enable Keyboad Controls in Slidshow", "sldkey", options.DEFAULT_SLDKEY));
		sld_section.sectionOptions.push(new config_checkBox("Pause while image is loading", "imgLoad", options.DEFAULT_IMGLOAD));
		sld_section.sectionOptions.push(new config_checkBox("Skip images that cannot be loaded", "skipErr", options.DEFAULT_SKIPERR));
		sld_section.sectionOptions.push(new config_selectionBox("Display images in slideshow for", "sldtm", ["1 Second","2 Second","3 Second","4 Second","5 Second","7 Second","10 Second"], [1000, 2000, 3000, 4000, 5000, 7000, 10000], options.DEFAULT_SLDTM));
		img_set_window.sections.push(sld_section);
		
		// Video Search Settings
		var vid_set_window = new config_window(vidTab, "VidConf");
			// Genearl Settings
		var vid_section = new config_section("Sidebar Options");
		vid_section.sectionOptions.push(new config_checkBox("Search For Videos", "vids", options.DEFAULT_VIDS));
		// vid_section.sectionOptions.push(new config_checkBox("Remove Videos from Search Results", "exvids", options.DEFAULT_EXVIDS));
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
		// gen_section.sectionOptions.push(new config_checkBox("Use Old Button Size", "oldSize", options.DEFAULT_OLDSIZE));
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

/**	slideshow_dialog
  *	Slideshow Dialog Object
  *	
  *	Construction Parameters
  *		popup		The popup_dialog object it was created with
  *	
  *	Functions
  *		add_image
  *			Add an image to the slideshow slidedeck
  *	
  *		draw
  *			Draw the dialog on the page
  *	
  *		undraw
  *			Undraw the dialog
  *	
  *		keyboardControls
  *			Handling of keyboard controls for the slideshow
  *	
  *		nextImage
  *			Go to the next image
  *	
  *		prevImage
  *			Go to the previous image
  *	
  *		pause
  *			Pause the slideshow
  *	
  *		play
  *			Play the slideshow
  *		
  */
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
			if (SR.isPlaying) {
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
		
		if (options.sldkey) {
			document.addEventListener('keypress', function (e) {
				if (SR.isDrawn) {
					SR.keyboardControls(e);
				}
			}, false);
		}
	};
	
	this.undraw = function () {
		if(this.isDrawn) {
			clearInterval(this.interval);
			this.images[this.onImage].removeEventListener("load", this.waitForLoad, false);
			$remove(this.dialog);
			this.isDrawn = false;
			this.onImage = -1;
			
			document.removeEventListener('keypress', function (e) {
				if (SR.isDrawn) {
					SR.keyboardControls(e);
				}
			}, false);
		}
	};
	
	this.keyboardControls = function (e) {
		if (e.charCode == 32) { // Space
			e.stopPropagation();
			e.preventDefault();
			
			if(this.isPlaying) {
				this.pause();
			} else {
				this.play();
			}
		} else if (e.keyCode == 37) { // Left
			this.pause();
			this.prevImage();
		} else if (e.keyCode == 39) { // Right
			this.pause();
			this.nextImage();
		} else if (e.keyCode == 36) { // Home (Beginning)
			e.stopPropagation();
			e.preventDefault();
			
			this.nextImage(0);
		} else if (e.keyCode == 35) { // End
			e.stopPropagation();
			e.preventDefault();
			
			this.prevImage(this.images.length - 1);
		}
	};
	
	this.nextImage = function (imgGoTo) {
		if(this.onImage >= 0) {
			this.holder.removeChild(this.images[this.onImage]);
			this.images[this.onImage].removeEventListener("load", this.waitForLoad, false);
		}
		
		if(typeof(imgGoTo) == "undefined" || imgGoTo < 0 || imgGoTo >= this.images.length) {
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
	
	this.prevImage = function (imgGoTo) {
		if(this.onImage >= 0) {
			this.holder.removeChild(this.images[this.onImage]);
		}
		if(typeof(imgGoTo) == "undefined" || imgGoTo < 0 || imgGoTo >= this.images.length) {
			this.onImage--;
		} else {
			this.onImage = imgGoTo;
		}
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
// Opens the style configuration page
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

// Activate Keyboard Shortcuts for the script
function keycuts() {
	document.addEventListener("keypress", function (event) {
		if(event.ctrlKey && event.shiftKey) {
			if (String.fromCharCode(event.charCode) === 'O') {
				if(conf.is_drawn()) {
					conf.undraw();
					location.reload();
				} else {
					configurations();
				}
			} else if (String.fromCharCode(event.charCode) === 'A') {
				var q = document.evaluate('//input[@name="q"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				q = q.snapshotItem(0);
				q.focus();
			} else if (String.fromCharCode(event.charCode) === 'U' && multiBox) {
				multiBox.expandCollapse();
			} else if (String.fromCharCode(event.charCode) === 'Y') {
				if(stylr && stylr.is_drawn()) {
					stylr.undraw();
					location.reload();
				} else {
					styler();
				}
			} else if (String.fromCharCode(event.charCode) === 'I' && options.sldshw) {
				startslides();
			}
		}
	}, false);
}

/**	=================================================================
  *	Multisearch
  *	=================================================================
  */

/**	multisearcher
  *	Multisearch Object
  *	
  *	Functions
  *		draw
  *			Draw the multisearch option
  *	
  *		addBox
  *			Add a new search box
  *	
  *		expandCollapse
  *			Expand or collapse the multisearch boxes
  *	
  *		searchAll
  *			Search all boxes
  *	
  *		searchNew
  *			Search only added boxes
  *	
  *		getAllVals
  *			<= Return Array => Get an array of all the values and their search location
  *	
  *		getNewVals
  *			<= Return Array => Get an array of only the new boxes values and their search location
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
	
	this.draw = function () {
		
		var theirButton = $cl('lsb')[0];
		this.myButton = $create('input', {
			type : 'button',
			className : 'lsb',
			value : 'More Options',
			style : 'border-left: 1px solid #CCCCCC;'
		});
		
		theirButton.parentNode.appendChild(this.myButton);
		
		var SR = this;
		this.myButton.addEventListener('click', function (e) {
			SR.expandCollapse();
		}, false);
		
		this.wrapper = $create("div", {
			id : "allSearches"
		});
		
		this.multiwrapper = $create("div");
		this.multiwrapper.id = "expandedMulti";
		var tabhead1 = $create("h3");
		tabhead1.textContent = "Current Tab";
		tabhead1.className = "TabHead";
		var tabhead2 = $create("h3");
		tabhead2.textContent = "New Tab(s)";
		tabhead2.className = "TabHead";
		
		this.origOptionBox = new multisearchbox(null).getOptBox();
		
		this.multiwrapper.appendChild(tabhead1);
		this.multiwrapper.appendChild(this.origOptionBox);
		this.multiwrapper.appendChild(tabhead2);
		this.multiwrapper.appendChild($create("br"));
		
		this.newSearchWrapper = $create("div", {
			id : 'newSearchBoxes'
		});
		
		for (var nm = GM_getValue("numMulti", 2); nm > 0 ; nm--) {
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
		
		adder.addEventListener("click", function (event) {
			SR.addBox();
		}, false);
		
		$("tsf").addEventListener("submit", function (event) {
			if (SR.expanded) {
				event.stopPropagation();
				event.preventDefault();
				redirgo([this.origOptionBox.value, $cl('lst')[0].value], false);
			}
		}, false);
		
		srchAll.addEventListener("click", function (event) {
			event.stopPropagation();
			event.preventDefault();
			SR.searchAll();
		}, false);
		
		srchNew.addEventListener("click", function (event) {
			event.stopPropagation();
			event.preventDefault();
			SR.searchNew();
		}, false);
		
		fillOutAll.addEventListener("click", function (event) {
			event.stopPropagation();
			event.preventDefault();
			var sbs = SR.boxes;
			var val = $cl('lst')[0].value;
			for (sb in sbs) {
				sbs[sb].setValue(val);
			}
		}, false);
		
		$cl('tsf-p')[0].appendChild(this.wrapper);
		
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
			this.myButton.value = "Less Options";
		} else {
			this.wrapper.removeChild(this.multiwrapper);
			this.myButton.value = "More Options";
		}
		this.expanded = !this.expanded;
	};
	
	this.searchAll = function () {
		var tablist = this.getAllVals();
		redirgo(tablist, false);
	};
	
	this.searchNew = function () {
		var tablist = this.getNewVals();
		redirgo(tablist, true);
	};
	
	this.getAllVals = function () {
		var newVals = this.getNewVals();
		return newVals.concat([this.origOptionBox.value, $cl('lst')[0].value]);
	};
	
	this.getNewVals = function () {
		var tablist = [];
		for (var i = 0, len = this.boxes.length; i < len; i++) {
			this.boxes[i].addCode(tablist);
		}
		return tablist;
	};
	
}

/**	multisearchbox
  *	Multisearch Box Object
  *	
  *	Construction Parameters
  *		parentObj		The multisearch object that it was created from
  *	
  *	Functions
  *		draw
  *			Draw the multisearch box
  *	
  *		undraw
  *			Undraw the multisearch box
  *	
  *		getOptBox
  *			<= Return HTML Object => Returns select box with the options
  *	
  *		addCode
  *			Add the code for this box to the given array for multisearching
  *	
  *		setValue
  *			Set the value for the box
  *	
  *		search
  *			If it is active, search for it
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
		this.srchBox.value = value;
		// TODO: Setup undo ability
	};
	
	this.search = function () {
		if (this.active) {
			var code = new array();
			this.addCode(code);
			redirgo(code, true);
		}
	};
	
}

/**	=================================================================
  *	End Multisearch
  *	=================================================================
  */

/**
  *	Import Dependencies
  *	
  *	@depends multisearch.js
  */
	// Start Text / Input Based Functions ------------------------------------------

// Script for the auto redirection
function redirgo(theList, tablast) {
	if (theList.length < 2) {
		return "";
	} else {
		var putintabs = (theList.length !== 2);
		for (var x = 0; x < theList.length; x += 2) {
			if (x == theList.length - 2) {
				putintabs = tablast || false;
			}	
			if (theList[x] == "quote") {
				linkit("http://en.wikiquote.org/wiki/Special:Search?go=Go&search=" + theList[x + 1], putintabs);
			} else if (theList[x] == "howto") {
				linkit("http://www.wikihow.com/Special:LSearch?fulltext=Search&search=" + theList[x + 1], putintabs);
			} else if (theList[x] == "defin") {
				linkit("http://en.wiktionary.org/wiki/Special:Search?go=Go&search=" + theList[x + 1], putintabs);
			} else if (theList[x] == "anidb") {
				linkit("http://anidb.net/perl-bin/animedb.pl?show=animelist&do.search=Search&adb.search=" + theList[x + 1], putintabs);
			} else if (theList[x] == "imdb") {
				linkit("http://www.imdb.com/find?s=all&x=22&y=12&q=" + theList[x + 1], putintabs);
			} else if (theList[x] == "gamefaq") {
				linkit("http://www.gamefaqs.com/search/index.html?platform=0&game=" + theList[x + 1], putintabs);
			} else if (theList[x] == "diggs") {
				linkit("http://digg.com/search?section=all&s=" + theList[x + 1], putintabs);
			} else if (theList[x] == "utube") {
				linkit("http://www.youtube.com/results?search_type=&aq=f&search_query=" + theList[x + 1], putintabs);
			} else if (theList[x] == "wikipda") {
				linkit("http://en.wikipedia.org/wiki/Special:Search?go=Go&search=" + theList[x + 1], putintabs);
			} else if (theList[x] == "googl") {
				linkit("http://google.com/search?q=" + theList[x + 1], putintabs);
			} else if (theList[x] == "flckr") {
				linkit("http://www.flickr.com/search/?q=" + theList[x + 1], putintabs);
			} else if (theList[x] == "cnns") {
				linkit("http://search.cnn.com/search.jsp?type=web&sortBy=date&intl=false&query=" + theList[x + 1], putintabs);
			} else if (theList[x] == "opnsrc") {
				linkit("http://sourceforge.net/search/?type_of_search=soft&words=" + theList[x + 1], putintabs);
			} else if (theList[x] == "eby") {
				linkit("http://shop.ebay.com/items/?_nkw=" + theList[x + 1], putintabs);
			} else if (theList[x] == "espns") {
				linkit("http://search.espn.go.com/" + theList[x + 1].split(" ").join("-"), putintabs);
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
// Handles clicks for opening links in new tabs
function clickd() {
	document.addEventListener("click", function(event) {
		// Makes sure it is a left click
		if (event.button === 0 && !event.ctrlKey && !event.altKey && !event.shiftKey && options.tabs) {
			// Opens all links that are external links in tabs if the tab feature is turned on
			if (checkallparentsforit(event.target, "resOL")) {
				if (event.target.href) {
					event.stopPropagation();
					event.preventDefault();
					linkit(event.target.href, false, true);
				} else if (event.target.parentNode.href) {
					event.stopPropagation();
					event.preventDefault();
					linkit(event.target.parentNode.href, false, true);
				}
			}
		}
	}, false);
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
	var lis = $cl("g");
	for (var k = 0; k < lis.length; k++) {
		if (lis[k].className.indexOf("videobox") >= 0 || lis[k].id == "imagebox") {
			lis[k].className = lis[k].className + " removed";
		} else {
			// var found = false;
			// for(var cn = (lis[k].childNodes.length - 1); cn > 0;cn--) {
				// if (lis[k].childNodes[cn].className && lis[k].childNodes[cn].className.indexOf("s") >= 0) {
					// found = true;
				// }
			// }
			// if (!found) {
				// lis[k].className = lis[k].className + " removed";
			// }
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
	var dym = $cl('spell');
	if (dym.length == 4) {
		var p1 = dym[0].parentNode;
		var p2 = dym[2].parentNode;
		var thebar = $('leftnav');
		p2.className = "removed";
		p1.id = "dymTxt";
		thebar.insertBefore(p1, thebar.childNodes[0]);
	}
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
			$$(statId, dynaId).insertBefore(box, $$(statId, dynaId).childNodes[0]);
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
		
		embedder.addVideoEmbed(this, true, object)
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
	
	// Sorts through the video results and puts them in a list
	var box = rightBox("videoList");
	
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
		
		if ($("imageList")) {
			$("mBox").insertBefore(box, $("imageList"));
		} else {
			$("mBox").appendChild(box);
		}
		
		if (options.styl == "dock") {
			box.className = "removed";
			$("vidDock").className = "";
		}
		
	} else {
		novids();
	}
}
// Searches for videos based on what the user is searching for
function menutogglevids(theSearch) {
	get("http://video.google.com/videosearch?q=" + encodeURIComponent(theSearch), showvids, novids);
}
	// End Video Search Functions --------------------------------------------------

/**	=================================================================
  *	Image Search
  *	=================================================================
  */

/**	Image_Search
  *	Image Search Object
  *	
  *	Construction Parameters
  *		src			The src for the image
  *		link		The link to the image
  *		title		The title of the image
  *		sizeInfo	Information string on the size
  *		type		Type of the image
  *		num			The number of the image in the results
  *	
  *	Functions
  *		draw
  *			Draw the image
  *	
  *		clicked
  *			Handles actions if an image is clicked
  *	
  *		buildImage
  *			<= Return Image => Builds the image HTML Ojbect for the given settings
  *	
  */
function indiv_img_result(src, link, title, sizeInfo, type, num) {
	
	this.src = src;
	this.link = decodeURI(link);
	this.title = title;
	this.locNum = num;
	this.size = sizeInfo;
	this.frmt = type;
	
	this.draw = function (parentNode) {
		var link = $create("a", {
			href : this.link,
			className : 'imgLink'
		});
		if(options.imgSize == "title") {
			
			link.innerHTML = this.title;
			link.className += " titleOnly";
			
		} else if(options.imgSize == "details") {
			
			if(options.styl == 'dock') {
				var img = $create("img", {
					src : this.src,
					alt : this.title,
					title : this.title,
					className : 'imgSizemedium'
				});
				link.appendChild(img);
			} else {
				link.innerHTML = this.title;
			}
			link.className += " imgDetails";
			var info = $create("span", {
				innerHTML : this.size + ' ' + this.frmt,
				className : 'detailedImgInfo'
			});
			link.appendChild(info);
			
		} else {
			
			var img = $create("img", {
				src : this.src,
				alt : this.title,
				title : this.title,
				className : 'imgSize' + options.imgSize
			});
			link.appendChild(img);
			
		}
		parentNode.appendChild(link);
		
		var SR = this;
		link.addEventListener('click', function (e) { SR.clicked(e); }, false);
	};
	
	this.clicked = function (event) {
		if(options.imgPlyr) {
			if(event) {
				event.stopPropagation();
				event.preventDefault();
			}
			
			embedder.addImageEmbed(this, true);
		}
	};
	
	this.buildImage = function () {
		return $create("img", {
			src : this.src,
			alt : this.title,
			title : this.title
		});
	};
	
}

/**	img_set
  *	Image Set Object
  *	
  *	Functions
  *		draw
  *			Draw the set
  *	
  *		undraw
  *			Undraw the set
  *	
  *		addImg
  *			Add an image to the set
  *	
  */
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

/**	Image_Search
  *	Image Search Object
  *	
  *	Construction Parameters
  *		query		The search query
  *	
  *	Functions
  *		draw
  *			Draw and perform intiate search
  *	
  *		next
  *			Show the next set
  *	
  *		prev
  *			Show the previous set
  *	
  *		clickImage
  *			Simulate clicking on an image
  *	
  *		startSlides
  *			Start the slideshow
  *	
  *		buildSets
  *			Build the sets of images
  *	
  *		processPage
  *			Add the images from a given page
  *	
  *		errorPage
  *			Handles error pages (dummy function at the moment)
  *	
  *		search
  *			Perform a search
  *	
  */
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
		this.prevBtn.draw(this.div);
		this.prevBtn.btn.disabled = true;
		
		if(options.sldshw) {
			this.slideBtn = new button('Play', function () { SR.startSlides(); this.btn.blur(); });
			this.slideBtn.draw(this.div);
			this.slideBtn.btn.disabled = true;
		}
		
		this.nextBtn = new button('>', function () { SR.next(); });
		this.nextBtn.draw(this.div);
		this.nextBtn.btn.disabled = true;
		
		if(options.styl == 'dock') {
			this.nextBtn.undraw();
			this.prevBtn.undraw();
		}
		
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
	
	this.clickImage = function (indx) {
		if(indx < 0) {
			indx = this.imgs.length - 1;
		} else if (indx >= this.imgs.length) {
			indx = 0;
		}
		this.imgs[indx].clicked();
	};
	
	this.startSlides = function (startOn) {
		if (!this.slideshow.is_drawn()) {
			popupManager.closeAll();
			this.slideshow.draw(startOn);
		} else if (this.slideshow && this.slideshow.is_drawn()) {
			this.slideshow.undraw();
		}
	};
	
	this.buildSets = function () {
		var perSet;
		if (options.imgSize == 'large') {
			perSet = 7;
		} else if (options.imgSize == 'medium') {
			perSet = 14;
		} else if (options.imgSize == 'small') {
			perSet = 28;
		} else if (options.imgSize == 'title') {
			perSet = 21;
		} else { // Details
			perSet = 14;
		}
		for(var setCreator = 0; setCreator < this.imgs.length; setCreator++) {
			if((setCreator % perSet == 0 && options.styl != 'dock') || setCreator == 0) {
				this.sets.push(new img_set());
			}
			var dockWorker = options.styl == 'dock' ? 0 : Math.floor(setCreator / perSet);
			this.sets[dockWorker].addImg(this.imgs[setCreator]);
		}
	};
	
	this.processPage = function (response) {
		var na;
		eval("na = " + response.responseText.match(/dyn\.setResults\(\[\[[^]*]\);/)[0].substring(14));
		
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
			for(var nao = 0; nao < na.length; nao++) {
				var img = new indiv_img_result(na[nao][14] + "?q=tbn:" + na[nao][2] + na[nao][3], na[nao][3], na[nao][6], na[nao][9], na[nao][10], this.imgs.length);
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
		get("http://images.google.com/images?q=" + encodeURIComponent(this.query) + "&gbv=2&start=" + (21 * this.pages), function (r) { SR.processPage(r) }, function (r) { SR.errorPage(r) });
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
	if(imgSearch) {
		imgSearch.startSlides();
	}
}
// Searches for images based on what the user is searching for
function menutoggleimages(theSearch) {
	imgSearch = new Image_Search(theSearch);
	imgSearch.draw($("mBox"));
	
	if (options.styl == "dock") {
		imgSearch.div.className = "removed";
		$("imgDock").className = "";
	}
}
	// End Image Search Functions -------------------------------------------------

	// Start Wiki Based Functions --------------------------------------------------
// Creates and inserts the link to a wikipedia and wiktionary search
function lookup(lookingFor) {
	var logoBox = $("leftnav");
	var p = $create("p", {
		textContent : "Find " + lookingFor +  " on ",
		className : 'added',
		id : 'wikiLink'
	});
	var link = $create("a");
	link.textContent = "Wikipedia";
	link.href = "http://en.wikipedia.org/wiki/Special:Search?go=Go&search=" + lookingFor;
	var link2 = $create("a");
	link2.textContent = "Wiktionary";
	link2.href = "http://en.wiktionary.org/wiki/Special:Search?go=Go&search=" + lookingFor;
	p.appendChild(link);
	p.innerHTML += " | ";
	p.appendChild(link2);
	
	if($('dymTxt')) {
		$('leftnav').insertBefore(p, $('dymTxt').nextSibling);
	} else {
		$('leftnav').insertBefore(p, $('leftnav').childNodes[0]);
	}
	p.className = "added";
	p.id = "wikLink";
	logoBox.insertBefore(p,logoBox.childNodes[0]);
}
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
		$$(statId, dynaId).insertBefore(defdiv,$$(statId, dynaId).childNodes[1]);
	} else {
		$$(statId, dynaId).insertBefore(defdiv,$$(statId, dynaId).childNodes[0]);
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
		wikiExp.innerHTML = "E<br />x<br />p<br />a<br />n<br />d<br />&laquo;";
		wikiExp.addEventListener("click", function (event) {
			$("wikiDiv").className = ($("wikiDiv").className == "removed") ? "" : "removed";
			wikiExp.innerHTML = (wikiExp.style.left == "-22px" || wikiExp.style.left == "") ? "C<br />o<br />l<br />l<br />a<br />p<br />s<br />e<br />&raquo;" : "E<br />x<br />p<br />a<br />n<br />d<br />&laquo;";
			wikiExp.style.left = (wikiExp.style.left == "-223px") ? "-22px" : "-223px";
		}, false);
		defdiv.parentNode.appendChild(wikiExp);
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
	get("http://en.wikipedia.org/wiki/Special:Search?go=Go&search=" + encodeURIComponent(theSearch), checkwikistate, nowikilink);
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
	
	logoToTrans();
	
	if ($("preload")) {
		resetPg();
	} else {
		var pdiv = $create("div");
		pdiv.id = "preload";
		document.body.appendChild(pdiv);
	}
	setupConf();
	if(options.tabs) {
		clickd();
	}
	if(options.keyd) {
		keycuts();
	}
	allStyles();
	
	// Setup for first loading.
	if (GM_getValue("loadBefore", false)) {
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
		
		var mBox = rightBox("mBox");
		if ($$(statId, dynaId).childNodes) {
			$$(statId, dynaId).insertBefore(mBox, $$(statId, dynaId).childNodes[0]);
		} else {
			$$(statId, dynaId).appendChild(mBox);
		}
		
		if (options.imgPlyr || options.embd) {
			makePlayer();
		}
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
	
	// Checks for script updates
	scriptPage();
}
	// End Core Functions -------------------------------------------------------------
// End Functions --------------------------------------------------------------------

// Global Variables
var filler, centDiv, centDivConf, conf, stylr, centDivSld, sldTmr, sldObj, dockShow, multiBox, multi, queryBox, imgSearch, embedder;
var pon = 0;

GM_registerMenuCommand("Options", configurations, "o", "control shift");
GM_registerMenuCommand("Styles", styler, "y", "control shift");
GM_registerMenuCommand("Script Info (Opens in New Tab)", redirInfo);

var popupManager = new popup_manager();
// Finds and saves what the user looks for  and saves the url-- Currently returns incorrect value if back button is used
var userInput = setupText();
var currUrl = location.href;
var delayed = false;

var dynaId = 'search';
var statId = 'ires';

// Starts the process
if($$(statId, dynaId) && $$(statId, dynaId).children.length > 0) {
	runThrough();
} else {
	delayed = true;
	var inval = setTimeout(waitingForPage, options.delay);
}

function waitingForPage() {
	if($$(statId, dynaId) && $$(statId, dynaId).children.length > 0) {
		userInput = setupText();
		currUrl = location.href;
		runThrough();
	} else {
		setTimeout(waitingForPage, options.delay);
	}
}
