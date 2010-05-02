// ==UserScript==
// @name		Google Bump
// @namespace      http://userscripts.org/scripts/show/33449
// @description    Adds some functionality to the Google web search. Main features include Multisearch, Video result extraction, Wikipedia definitions and links, and some clutter cleanup by. All options can be turned off.
// @version	1.19
// @include	http://www.google.tld/search?*
// @include	http://ipv6.google.tld/search?*
// @exclude	http://www.google.tld/search?*&tbs=*
// ==/UserScript==

/*
	Author: KTaShes
	Date: Apr. 7 2010
*/
var version = "1.19";

// Start Functions ------------------------------------------------------------------
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
function $create(type) {
	return document.createElement(type);
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
// Shortcut for redirecting the page and opening new tabs
function linkit(theLink, tabit, under) {
	if (tabit || (tabs && under)) {
		GM_openInTab(theLink);
	} else {
		location.href = theLink;
	}
}
// Goes up until if finds the proper node, and then returns the given attribute
function findrightnode(event, clname, att) {
	var checkClass = event.target;
	var src;
	// Loop up and break on finding correct info
	while (checkClass.parentNode) {
		if (checkClass.className == clname) {
			src = checkClass.getAttribute(att);
			break;
		} else  {
			checkClass = checkClass.parentNode;
		}
	}
	return src;
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
// Erases the page if it has been loaded before (fixes issues caused by 'back' button)
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
	// End Helper Functions ------------------------------------------------------------

	// Start Display Functions ---------------------------------------------------------
// Adds all the styles for the page.
function allStyles () {
	var maxwidth = window.innerWidth - 50;
	var maxheight = window.innerHeight - 100;
	
	/*
		This is the style section with a brief explaination of each.
		
		Media:
			The media style is designed for easier viewing of videos and images.
		Dock:
			The dock style is designed so that the main google pain remains untouched other then a small div at the bottom of the page.
		Center:
			The center style is both for smaller displays and a more centered look overall.
		Classic:
			The classic style is the same as the original style. As new features become available, this may be phased out.
	*/
	if (styl == "media" && (imgs || vids)) {
		var mediaSS = "a, img { border-style: none; } " +
						"#res { padding-top: 7px; } " +
						"#resOL { position: absolute; right: 0px; top: 7px;";
		if (vids && imgs) {
			mediaSS += "height: 300px;";
		} else if (imgs) {
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
						".rl-item, .rl-res { width: 102px; margin-left: 2%; margin-right: 2%; display: inline-table; height: auto; text-align: center; } " +
						".thumbnail-img { width: 100px; height: 80px; } " +
						".rl-metadata, .rl-thumbnail { display: block; font-size: small; } " +
						"#sldLink { text-align: center; display: block;}" +
						"#slideShow { position: fixed; text-align: center; padding: 15px; top: 50%; left: 50%; z-index: 9998; background-color: white; border: 1px solid black; } " +
						".sldImgs { max-width: " + maxwidth + "px; max-height: " + maxheight + "px; } " +
						"#greyOut { background-color: black; opacity: .6; width: 100%; height: 100%; z-index: 1000; position: fixed; top: 0px; left: 0px; } " +
						"#pBox, #imageList, #videoList { background-color: #D8E2F5; } " +
						".rl-res, #imageList img { padding: 1%; background-color: #FFFFFF; border: 1px solid black; } ";
		
		GM_addStyle(mediaSS);
		
	} else if (styl == "dock") {
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
		var dock = $create("div");
		dock.id = "dock";
		
		var icon = $create("div");
		var alink = $create("a");
		alink.href = "#ssb";
		alink.id = "searchDock";
		alink.textContent = "Web";
		icon.className = "dockLink";
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
		
		if (wiki) {
			icon = $create("div");
			alink = $create("a");
			alink.href = "#ssb";
			alink.id = "wikiDock";
			alink.textContent = "Wiki";
			alink.className = "removed";
			icon.className = "dockLink";
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
		
		if (vids) {
			icon = $create("div");
			alink = $create("a");
			alink.href = "#ssb";
			alink.id = "vidDock";
			alink.textContent = "Video";
			alink.className = "removed";
			icon.className = "dockLink";
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
		
		if (imgs) {
			icon = $create("div");
			alink = $create("a");
			alink.href = "#ssb";
			alink.id = "imgDock";
			alink.textContent = "Image";
			alink.className = "removed";
			icon.className = "dockLink";
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
	} else if (styl == "center") {
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
		if (vids && imgs) {
			centerssheet += "#pBox { position: absolute; top: 0px; right: 0px; display: none; z-index: 1002; } .imgShowing { position: absolute; left: 0px; border-right: 1px solid #6B90DA; width: 379px; } .playing { position: absolute; right: 0px; } ";
		} else if (vids) {
			centerssheet += "#pBox { float: right; } ";
		} else {
			centerssheet += "#pBox { float: left; border-right: 1px solid #6B90DA; } ";
		}
		GM_addStyle(centerssheet);
		
		var wikiExp = $create("div");
	} else {
		var ssheet = "#mBox { background-color: white; width: 400px; } #pBox { vertical-align: middle; overflow: hidden; width: 400px; } .playing, .imgShowing { height: 325px; position: relative; } " +
					".rBox { float: right; background-color: #F0F7F9; text-align: center; } .wBBord { border-bottom: 1px solid #6B90DA; } " +
					"#setShow, .blocked, .imgLink { display: block; } #vidTag, #imageTag { margin: 0px; } " +
					"#playerTag { background-color: #F0F7F9; height: 20px; } #vBox { height: 305px; } " +
					".playimg { max-width: 400px; max-height: 345px; border-style: none; } " + 
					"#videoList { width: 180px; } #imageList { width: 220px; } #wikLink { float: left; display: inline; } #ssb { position: relative; height: 25px; } " +
					"#resStat { display: inline; position: absolute; top: 1px; right: 0px; } " + 
					".rl-videofrom { display: none; } #resOL { margin: 0px 2% 0px .1em; } .toLI { display: list-item; } .reAddAd { width: 100px; } .g { margin-top: 0px; min-width: 540px; } " +
					"#dymTxt { margin: 0px; float: left; } #ssb { position: relative; height: 25px; } #rsStats { display: inline; position: absolute; top: 3px; right: 0px; } " + 
					"#prs { display: inline; } .vidRes { width: 145px; display: block; } .vidRes .g { margin: 0px;  min-width: 0px;  margin-left: 1em; } " + 
					".vidRes img { width: 137px; height: 97px; } .vrTitle { margin-bottom: 30px; } #exvidlist { width: 170px; } " + 
					".rl-item img { width: 160px; height: 120px; } .rl-item { display: inline; } #ssb { margin-bottom: 0px; padding-bottom: 0px; } " +
					".rl-special, .rl-watch-on, .rl-snippet-grid-view, .rl-details, .rl-short-snippet, .rl-snippet, .rl-watch-on, .rl-cannot-play-here { display: none; }" + 
					"#slideShow { position: fixed; text-align: center; padding: 15px; top: 50%; left: 50%; z-index: 9998; background-color: white; " + 
					"border: 1px solid black; } .sldImgs { max-width: " + maxwidth + "px; max-height: " + maxheight + "px; } " +
					"#sldLink { text-align: center; } #next{ float: right; } #prev { float: left; } #res { padding-right: 0px; margin-top: 0px; }" + 
					"#wikiHeader { font-size: 115%; background-color: #F0F7F9; padding-left: .2em; }" +
					"#wikiDesc { font-size: 75%; margin: 0px; padding: .2em; text-indent: 3em; border: 2px solid #F0F7F9; }" +
					"#wikiDiv { width: 580px; margin-top: -1px; margin-bottom: .5em; } " +
					".ts td { padding: 0px 0px 0px 17px; } ";
		GM_addStyle(ssheet);
	}
	
	var genSS = "#greyOut { background-color: black; opacity: .6; width: 100%; height: 100%; z-index: 1000; position: fixed; top: 0px; left: 0px; } " + 
					"#gbLoader { position: absolute; top: 25px; right: 3px; } " +
					".confLbl { font-size: small; display: inline; } .opli { display: inline; } .confTab { margin: 0px; padding: 2px 4px; border: 1px solid black; } " +
					"#confWel { border-bottom: 1px solid black; font-size: 22pt; font-family: \"Times New Roman\", serif; text-align: center; background-color: #F0F7F9; } " +
					"#slideShow { position: fixed; text-align: center; padding: 15px; top: 50%; left: 50%; z-index: 9998; background-color: white; border: 1px solid black; } " +
					"#slOpts { margin: 6px 0px; border-bottom: 1px solid grey; } #confWrap { height: 432px; border-bottom: 1px solid black; margin-bottom: 2px; } " +
					".sldImgs { display: block; } " +
					"#hidePly { background-color: #FFFFFF; color: #FF0000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 50%; position: absolute; top: 0px; right: 0px; width: 1.1em; height: 1.1em; cursor: pointer; } " +
					"#confTabs { height: 16px; position: relative; margin-bottom: 3px; } .conf_Tab { padding: 0px 0.5em .25em .5em; " + 
					"margin-top: 4px; background-color: #F0F7F9;  border-bottom: 1px solid black; border-right: 1px solid black; display: inline; z-index: 10001; cursor: pointer; } " +
					".selected_tab { border-bottom-style: none; background-color: white;} .confTabOn { margin: .7em; } .confTabOn label { margin: .2em 0px; } .confTabOn button { margin: .5em 0px; } " + 
					"#t_AbtConf { display: block; position: absolute; top: -4px; right: 0px; width: 146px; text-align: right; border-right-style: none; z-index: 10000; } " +
					"#AbtConf p { margin-top: 0px; } #deapallFault, #sNc { margin-left 1em; } " +
					"#newVer { float: right; margin-top: -1.4em; font-size: 85%; background-color: #CCCCFF; padding: 1px; } " +
					"#confGoogBump { position: fixed; left: 50%; top: 50%; width: 500px; height: 520px; margin-left: -250px; margin-top: -260px; z-index: 9999; background-color: white; border: 1px solid black; } " +
					"#res { margin: 0px 8px; } #cnt { max-width: 100%; } " +
					"#ssb { max-height: 25px; overflow: hidden; } " +
					"#wikLink { float: left; } " +
					".error { color:#FF0000; } ";
	if (oldSize) {
		genSS += "#sff .lst, #sff .lsb { font-size: small; height: auto; } ";
	}
	if (dym) { 
		genSS += "#dymTxt { float: left; } ";
	}
	if (margs) {
		genSS += "#gbar { padding-left: 8px; } .e, ";
	}
	if (sideads || sugges) {
		genSS += ".hd, ";
	}
	genSS += ".removed, #preload { display: none; }";
	
	GM_addStyle(genSS);
	
	var msSS = "#currentSearch { margin-top: 0px !important; } " + 
				"#allSearches { border: 1px solid #0077CC; margin-top: 10px; background-color: #FFFFFF; z-index: 1000; float: left; } " +
				"#expand, #collapse { cursor: pointer; font-family: sans-serif; float: right; color: #0077CC; margin-right: 3px; margin-bottom: 2px; margin-top: -8px; border: 1px solid #0077CC; } " +
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
				".gac_m { z-index: 1500 !important; top: 91px !important; " + (styl != "center" ? "left: 151px !important;" : "") + " border: 1px solid #D0D0D0 !important; border-top-style: none !important; } " +
				".ts td { padding-left: 4px; !important } ";
	
	GM_addStyle(msSS);
	
	if(document.getElementsByClassName("g")[0]) {
		var lists = document.getElementsByClassName("g")[0].parentNode;
		lists.id = "resOL";
		dockShow = lists.parentNode;
	}
}
// Creates a basic right floating box of given id
function rightBox(idName) {
	var box = $create("div");
	box.className = "rBox";
	box.id = idName;
	return box;
}
// Greys out the page
function greydout() {
	var greyer = $create("div");
	greyer.id = "greyOut";
	greyer.title = "Return to the main page";
	$("gsr").appendChild(greyer);
	return greyer;
}
// Converts an html string into a working html tag
function stringtohtml(htmlstring) {
	var toHTML = $create("html");
	toHTML.innerHTML = htmlstring;
	return toHTML;
}
// Creates a player div used by both the video and image searchs
function makePlayer() {
	var bigBox = rightBox("mBox");
	var player = rightBox("pBox");
	// Sets the proper display text for an empty player
	if (styl == "center" && vids) {
		player.innerHTML = "<div id=\"playerTag\">Player</div>";
	} else if (styl == "center") {
		player.innerHTML = "<div id=\"playerTag\">Image</div>";
	} else if (vids && imgs) {
		player.textContent = "Please select either a Video or an image below to view it here.";
		player.className = player.className + " wBBord";
	} else if (vids) {
		player.textContent = "Please Select a video to view it here (if from compatable site)";
	} else {
		player.textContent = "Click on an image to view it here.";
	}
	bigBox.appendChild(player);
	$("res").insertBefore(bigBox, $("res").childNodes[0]);
	
	if (styl == "dock") {
		player.className = "removed";
	} else if (styl == "center" && imgs && vids) {
		var hidePlayer = $create("div");
		hidePlayer.id = "hidePly";
		hidePlayer.textContent = "X";
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
	var tagDiv = $create("div");
	tagDiv.id = "playerTag";
	tagDiv.textContent = label;
	var hidePlayer = $create("div");
	hidePlayer.id = "hidePly";
	hidePlayer.textContent = "X";
	hidePlayer.addEventListener("click", function (event) {
		removeAllChildren(player);
		player.className = "rBox closed";
	}, false);
	player.appendChild(tagDiv);
	player.appendChild(hidePlayer);
}
	// End Display Functions -----------------------------------------------------------
	
	// Start Functionality Functions --------------------------------------------------
		// Start Update Script ---------------------------------------------------------------
// Fetches script homepage to check for updates
function scriptPage() {
	var dt = new Date();
	if (newversion > parseFloat(version) && newversion != 0.0) {
		verNotice();
	} else if (Date.now() - updateCheck >= 86400000 || updateCheck === 0) {
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
	var uplink = $create("a");
	uplink.href = "http://userscripts.org/scripts/source/33449.user.js";
	uplink.textContent = "A Newer Version of Google Bump is Available.";
	uplink.id = "newVer";
	$("tsf").appendChild(uplink);
}
		// End Update Script -----------------------------------------------------------------
		
		// Start Configuration Functions --------------------------------------------------
// Creates a series of checkboxes with the given arrays and then appends it where needed
function loopchkbox(setts, keys, defs, whatparent) {
	var appSetts = setts;
	var appKeys = keys;
	var appDefs = defs;
	// Creates the desired Check boxes with the given  values and ids
	for (var la = 0; la < appSetts.length; la++) {
		var lbl = $create("label");
		lbl.textContent = appSetts[la] + ": ";
		var chk = $create("input");
		chk.type = "checkbox";
		chk.name = appKeys[la];
		chk.id = appKeys[la];
		if (GM_getValue(appKeys[la], appDefs[la])) {
			chk.checked = "true";
		}
		chk.addEventListener("change", function(event) { GM_setValue(event.target.id, event.target.checked); }, true);
		var br = $create("br");
		lbl.appendChild(chk);
		whatparent.appendChild(lbl);
		whatparent.appendChild(br);
	}
}
// Creates an drop down option menu for configurations
function loopoptions(lbl, setv, setts, keys, whatparent) {
	var appSetts = setts;
	var appKeys = keys;
	var disp = $create("p");	
	disp.textContent = lbl + ": ";
	disp.className = "confLbl";
	whatparent.appendChild(disp);
	var opli = $create("select");
	opli.name = setv;
	opli.className = "opli";
	opli.addEventListener("change", function(event) { GM_setValue(event.target.name, event.target.value); }, true);
	// Creates the desired Options with the given  values and ids
	for (var lo = 0; lo < appSetts.length; lo++) {
		var op = $create("option");
		op.textContent = appSetts[lo];
		op.value = appKeys[lo];
		op.id = setv + lo;
		if (GM_getValue(setv, 4000) == appKeys[lo]) {
			op.selected = true;
		}
		var br = $create("br");
		opli.appendChild(op);
	}
	whatparent.appendChild(opli);
	whatparent.appendChild($create("br"));
}
// Creates a navigation tab for the configuration page
function tabMaker(txt, idName) {
	var itab = $create("div");
	itab.className = "conf_Tab";
	itab.textContent = txt;
	itab.id = idName;
	
	itab.addEventListener("click", function (event) {
		var currTab = $cl("conf_Tab selected_tab");
		$(currTab[0].id.substr(2)).className = "removed";
		currTab[0].className = "conf_Tab";
		$(this.id.substr(2)).className = "confTabOn";
		this.className = "conf_Tab selected_tab";
	},false);
	
	return itab;
}
// Setup the configuration for the script
function setupConf() {
	filler = greydout();
	centDivConf = $create("div");
	
	// The heading to the configuration page
	var welcome = $create("h1");
	welcome.textContent = "Google Bump Script Configuration";
	welcome.id = "confWel";
	
	// Wrappers for the content
	var tabHead = $create("div");
	tabHead.id = "confTabs";
	var wrapper = $create("div");
	wrapper.id = "confWrap";
	var btnwrap = $create("div");
	btnwrap.id = "confBtnWrap";
	
	// Creates and appends the navigation tabs
	tabHead.appendChild(tabMaker("Created by KTaSh", "t_AbtConf"));
	var genTab = tabMaker("General", "t_GenConf");
	genTab.className = "conf_Tab selected_tab";
	tabHead.appendChild(genTab);
	tabHead.appendChild(tabMaker("Appearance", "t_AppConf"));
	tabHead.appendChild(tabMaker("Image Search", "t_ImgConf"));
	tabHead.appendChild(tabMaker("Other Searches", "t_VidConf"));
	
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
	var fieldsapp = $create("div");
	fieldsapp.id = "AppConf";
	fieldsapp.className = "removed";
	loopchkbox(["Add Margins", "Remove Suggestions", "Move \"Did you mean\" text", "Remove Sidebar Ads"], ["margs","sugges","dym","sideads"], [true, true, true, true], fieldsapp);
	loopoptions("Layout Style", "style", ["Classic", "Media", "Dock", "Centered"], ["classic", "media", "dock", "center"], fieldsapp);
	var apall = $create("button");
	apall.textContent = "Select All";
	apall.id = "apallAP";
	fieldsapp.appendChild(apall);
	var deapall = $create("button");
	deapall.textContent = "Deselect All";
	deapall.id = "deapallAP";
	fieldsapp.appendChild(deapall);
	
	// Image Search Settings
	var fieldsimg = $create("div");
	fieldsimg.id = "ImgConf";
	fieldsimg.className = "removed";
	loopchkbox(["Search For Images"], ["imgs"], [false], fieldsimg);
	loopoptions("Number of pages to load", "imgPages", ["1 Pages","2 Pages","3 Pages","4 Pages","5 Pages","7 Pages","10 Pages"], [1, 2, 3, 4, 5, 7, 10], fieldsimg);
	var lwrTitle = $create("h4");
	lwrTitle.textContent = "SlideShow Options";
	lwrTitle.id = "slOpts";
	fieldsimg.appendChild(lwrTitle);
	loopoptions("Display images in slideshow for", "sldtm", ["1 Second","2 Second","3 Second","4 Second","5 Second","7 Second","10 Second"], [1000, 2000, 3000, 4000, 5000, 7000, 10000], fieldsimg);
	
	// Other Search Settings
	var fieldssch = $create("div");
	fieldssch.id = "VidConf";
	fieldssch.className = "removed";
	loopchkbox(["Search Wikipedia", "Search For Videos", "Remove Videos from Search Results"], ["wiki","vids","exvids"], [false, false, false], fieldssch);
	var apallsch = $create("button");
	apallsch.textContent = "Select All";
	apallsch.id = "apallSR";
	fieldssch.appendChild(apallsch);
	var deapallsch = $create("button");
	deapallsch.textContent = "Deselect All";
	deapallsch.id = "deapallSR";
	fieldssch.appendChild(deapallsch);
	
	// General Settings
	var fieldsgen = $create("div");
	fieldsgen.id = "GenConf";
	fieldsgen.className = "confTabOn";
	loopchkbox(["Open All Links in New Tabs", "Use MultiSearch", "Use old button size"], ["tabs","scuts", "oldSize"], [false, true, true], fieldsgen);
	var apallgen = $create("button");
	apallgen.textContent = "Select All";
	apallgen.id = "apallGE";
	fieldsgen.appendChild(apallgen);
	var deapallgen = $create("button");
	deapallgen.textContent = "Deselect All";
	deapallgen.id = "deapallGE";
	fieldsgen.appendChild(deapallgen);
	
	// Save and default buttons
	var savebtn = $create("button");
	savebtn.textContent = "Save";
	savebtn.id = "sNc";
	var defbtn = $create("button");
	defbtn.textContent = "Defaults";
	defbtn.id = "deapallFault";
	
	// Appending of all the configurations
	centDivConf.id = "confGoogBump";	
	centDivConf.appendChild(welcome);
	centDivConf.appendChild(tabHead);
	wrapper.appendChild(fieldsapp);
	wrapper.appendChild(fieldsimg);
	wrapper.appendChild(fieldssch);
	wrapper.appendChild(fieldsgen);
	wrapper.appendChild(fieldsabt);
	centDivConf.appendChild(wrapper);
	btnwrap.appendChild(savebtn);
	btnwrap.appendChild(defbtn);
	centDivConf.appendChild(btnwrap);
	$('gsr').appendChild(centDivConf);
	centDiv = centDivConf;
	
	apall.addEventListener("click", function (event) {
		GM_setValue("margs", true);
		$('margs').checked = "true";
		GM_setValue("sugges", true);
		$('sugges').checked = "true";
		GM_setValue("dym", true);
		$('dym').checked = "true";
		GM_setValue("sideads", true);
		$('sideads').checked = "true";
	}, false);
	deapall.addEventListener("click", function (event) {
		GM_setValue("margs", false);
		$('margs').checked = "";
		GM_setValue("sugges", false);
		$('sugges').checked = "";
		GM_setValue("dym", false);
		$('dym').checked = "";
		GM_setValue("sideads", false);
		$('sideads').checked = "";
	}, false);
	apallsch.addEventListener("click", function (event) {
		GM_setValue("wiki", true);
		$('wiki').checked = "true";
		GM_setValue("vids", true);
		$('vids').checked = "true";
		GM_setValue("exvids", true);
		$('exvids').checked = "true";
	}, false);
	deapallsch.addEventListener("click", function (event) {
		GM_setValue("wiki", false);
		$('wiki').checked = "";
		GM_setValue("vids", false);
		$('vids').checked = "";
		GM_setValue("exvids", false);
		$('exvids').checked = "";
	}, false);
	apallgen.addEventListener("click", function (event) {
		GM_setValue("tabs", true);
		$('tabs').checked = "true";
		GM_setValue("scuts", true);
		$('scuts').checked = "true";
		GM_setValue("soot", true);
		$('soot').checked = "true";
		GM_setValue("oldSize", true);
		$('oldSize').checked = "true";
	}, false);
	deapallgen.addEventListener("click", function (event) {
		GM_setValue("tabs", false);
		$('tabs').checked = "";
		GM_setValue("scuts", false);
		$('scuts').checked = "";
		GM_setValue("soot", false);
		$('soot').checked = "";
		GM_setValue("oldSize", false);
		$('oldSize').checked = "";
	}, false);
	/*
		Default values are:
		Add margins		:	ON
		Remove Suggestions	:	ON
		Move "Did You Mean"	:	ON
		Remove Sidebar Ads	:	ON
		Search Wikipedia	:	ON
		Search for Videos	:	OFF
		Search for Images	:	OFF
		Extract Videos		:	OFF
		Open Links in New Tabs	:	OFF
		Multisearch			:	ON
		Use Old Button Size	:	ON
		Style				:	Classic
		Image Pages to Search	:	1
		Slideshow Time		:	4 seconds
	*/
	defbtn.addEventListener("click", function (event) {
		GM_setValue("margs", true);
		$('margs').checked = "true";
		GM_setValue("sugges", true);
		$('sugges').checked = "true";
		GM_setValue("dym", true);
		$('dym').checked = "true";
		GM_setValue("sideads", true);
		$('sideads').checked = "true";
		GM_setValue("wiki", true);
		$('wiki').checked = "true";
		GM_setValue("vids", false);
		$('vids').checked = "";
		GM_setValue("imgs", false);
		$('imgs').checked = "";
		GM_setValue("exvids", false);
		$('exvids').checked = "";
		GM_setValue("tabs", false);
		$('tabs').checked = "";
		GM_setValue("scuts", true);
		$('scuts').checked = "true";
		GM_setValue("oldSize", true);
		$('oldSize').checked = "true";
		GM_setValue("imgPages", 1);
		$('imgPages0').selected = "selected";
		GM_setValue("style", "classic");
		$('style0').selected = "selected";
		GM_setValue("sldtm", 4000);
		$('sldtm3').selected = "selected";
	}, false);
}
// Opens the configuration page
function configurations() {
	if (!$('slideShow')) {
		$('gsr').appendChild(filler);
	} else {
		$('gsr').removeChild(centDiv);
		clearTimeout(sldTmr);
	}
	$('gsr').appendChild(centDivConf);
	centDiv = centDivConf;
}
		// End Configuration Functions ----------------------------------------------------
// Closes all features that display on top with a grey background
function closeEx() {
	$('gsr').removeChild(filler);
	$('gsr').removeChild(centDiv);
	if (sldTmr) {
		clearTimeout(sldTmr);
	}
}
// Handles page clicks and decides based on situation what to do
function clickd() {
	document.addEventListener("click", function(event) {
		// Makes sure it is a left click
		if (event.button === 0 && !event.ctrlKey && !event.altKey && !event.shiftKey) {
			// Back to the page
			if (event.target.id == "sNc" || event.target.id == "greyOut" || event.target.id == "slideShow" || event.target.className == "sldImgs") {
				closeEx();
				location.reload();
			}
			// Handles the clicking of an image in the image search
			if (imgs && checkallparentsforit(event, "imgLink") && !$("slideShow")) {
				event.stopPropagation();
				event.preventDefault();
				var src = findrightnode(event, "imgLink", "href");
				//src = src.split("&")[0].substr(15);
				var alink = $create("a");
				alink.href = src;
				var imgtag = $create("img");
				imgtag.src = src;
				imgtag.alt = userInput;
				imgtag.title = userInput;
				imgtag.className = "playimg";
				alink.appendChild(imgtag);
				setupPlayer("Image");
				$("pBox").appendChild(alink);
				$("pBox").className = "rBox imgShowing";
			} 
			// Opens all links that are external links in tabs if the tab feature is turned on
			if (checkallparentsforit(event, "resOL") || checkallparentsforit(event, "pBox")) {
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
	// End Functionality Functions ----------------------------------------------------
	
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
	var theInput = document.getElementsByTagName('input');
	var search;
	if (preset) {
		search = preset;
	} else {
		// Extracts the search value from the URL
		var params = window.location.search.split("&").join("?").split("?");
		for (var p = params.length - 1; p >= 0; p--) {
			if(params[p].indexOf("q=") === 0) {
				search = unescape(params[p].substr(2).split("+").join(" "));
			}
		}
	}
	
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
	var div = $create("div");
	div.id = "allSearches";
	var currentSearch = $cl("ts")[1];
	
	var topHat = currentSearch.parentNode;
	var newHolder = $create("div");
	newHolder.id = "otherSearchContent";
	for (var ci = 0; ci < topHat.childNodes.length;) {
		newHolder.appendChild(topHat.childNodes[ci]);
	}
	topHat.appendChild(newHolder);
	
	topHat.insertBefore(div, topHat.childNodes[0]);
	div.appendChild(currentSearch);
	currentSearch.id = "currentSearch";
	
	var expand = $create("div");
	expand.id = "expand";
	expand.innerHTML = "&nabla;";
	div.appendChild(expand);
	
	var multi = $create("div");
	multi.id = "expandedMulti";
	var tabhead1 = $create("h3");
	tabhead1.textContent = "Current Tab";
	tabhead1.className = "TabHead";
	var tabhead2 = $create("h3");
	tabhead2.textContent = "New Tab(s)";
	tabhead2.className = "TabHead";
	
	multi.appendChild(tabhead1);
	multi.appendChild(optionList("Orig"));
	multi.appendChild($create("hr"));
	multi.appendChild(tabhead2);
	multi.appendChild($create("br"));
	
	for (var nm = 0; nm < GM_getValue("numMulti",2); nm++) {
		newSB(nm, multi);
	}
	
	var adder = $create("div");
	adder.id = "adding";
	adder.textContent = "Add more...";
	multi.appendChild(adder);
	
	var srchAll = $create("button");
	srchAll.textContent = "Search All";
	srchAll.id = "searchAll";
	multi.appendChild(srchAll);
	
	var srchNew = $create("button");
	srchNew.textContent = "Search New";
	srchNew.id = "searchNew";
	multi.appendChild(srchNew);
	
	// Setup for handling of all clicks for the multisearch
	adder.addEventListener("click", function (event) {
		var newl = $cl("SBoxes").length;
		GM_setValue("numMulti",newl + 1);
		newSB(newl, multi);
		multi.removeChild(adder);
		multi.removeChild(srchAll);
		multi.removeChild(srchNew);
		multi.appendChild(adder);
		multi.appendChild(srchAll);
		multi.appendChild(srchNew);
	}, false);
	
	expand.addEventListener("click", function (event) {
		if (expand.id == "expand") {
			expand.innerHTML = "&Delta;";
			expand.id = "collapse";
			div.appendChild(multi);
		} else {
			expand.innerHTML = "&nabla;";
			expand.id = "expand";
			div.removeChild(multi);
		}
	}, false);
	
	$("tsf").addEventListener("submit", function (event) {
		if (expand.id == "collapse") {
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
			redirgo([siteto, srchval,], false);
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
}
// Creates the list of options for the multisearch
function optionList(id) {
	var sel = $create("select");
	sel.id = "searchList" + id;
	sel.className = "siteSelector";
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
	var dym = $cl('spell');
	if (dym.length == 4) {
		var p1 = dym[0].parentNode;
		var p2 = dym[2].parentNode;
		var thebar = $('ssb');
		var seconditem = thebar.childNodes[1];
		var resultsstats = thebar.childNodes[thebar.childNodes.length - 1];
		p2.className = "removed";
		p1.id = "dymTxt";
		thebar.insertBefore(p1, seconditem);
		resultsstats.id = "rsStats";
	}
}
	// End Visual Functions ------------------------------------------------------------
	
	// Start Video Extraction Functions --------------------------------------------
// Finds videos within the results and sets them aside... literally
function extractVideos(userSearch) {
	// Get all elements with the j class, the defining class for videos
	var vidsr = $cl("ts");
	if (vidsr.length > 0) {
		if (!vids && !imgs) {
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
			// Currently out of commision. To return soon
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
	if (styl == "dock") {
		box.className = "removed";
	}
}
// Show the loaded videos
function showvids(response) {
	var code = stringtohtml(response.responseText);
	
	// Creates a Temporary box with the other pages data so I can use DOM functions on it
	var boxTemp = $create("table");
	boxTemp.className = "removed";
	var viddivs = code.getElementsByTagName("div");
	for (var vdn = 0; viddivs && vdn < viddivs.length; vdn++) {
		if (viddivs[vdn].id == "search-results") {
			boxTemp.innerHTML = viddivs[vdn].innerHTML;
		}
	}
	$("gsr").appendChild(boxTemp);
	
	// Sorts through the video results and puts them in a list
	var box = rightBox("videoList");
	var littlep = $create("p");
	littlep.textContent = "Videos";
	littlep.id = "vidTag";
	box.appendChild(littlep);
	var rlitems = $cl("rl-item");
	if (rlitems.length > 0) {
		var proc = 0;
		var limit = 5;
		if (!imgs && styl == "media") {
			limit = -1;
		} else if (styl == "center") {
			limit = 3;
		}
		while((proc < limit || limit == -1) && rlitems.length > 0) {
			proc++;
			vidclicksetup(rlitems[0]);
			box.appendChild(rlitems[0]);
		}
		if ($("imageList")) {
			$("mBox").insertBefore(box, $("imageList"));
		} else {
			$("mBox").appendChild(box);
		}
		
		if (styl == "dock") {
			box.className = "removed";
			$("vidDock").className = "";
		}
	} else {
		novids();
	}
	// Removes the Temporary Dom Box
	$("gsr").removeChild(boxTemp);
}
// Setup for handling clicks on videos
function vidclicksetup(node) {
	node.addEventListener("click", vidclick, false);
	for (var nn = node.childNodes.length - 1; nn >= 0; nn--) {
		vidclicksetup(node.childNodes[nn]);
	}
}
// Handles video click by checking if compatible embed is available
function vidclick(event) {
	event.stopPropagation();
	event.preventDefault();
	$("pBox").className = "playing";
	var vBox = $create("div");
	vBox.id = "vBox";
	var src = findrightnode(event, "rl-res", "srcurl");;
	// Finds if video is hosted on supported site, and takes the appropriate action
	var regexUtube = new RegExp("^http:\/\/w{3}\.youtube\.com\/watch");
	var regexGoogl = new RegExp("^http:\/\/video\.google\.com\/videoplay");
	var regexMetaCaf = new RegExp("^http:\/\/w{3}\.metacafe\.com\/watch\/");
	var regexLiveVideo = new RegExp("^http:\/\/w{3}\.livevideo\.com\/video\/");
	if (regexUtube.test(src)) {
		src = src.replace(regexUtube, "");
		src = "http://www.youtube.com/v/" + src.substr(3);
		vBox.innerHTML = '<object width="100%" height="100%"><param name="movie" value="' + src + 
				'&ap=%2526fmt=18"></param><param name="allowFullScreen" value="true"></param><embed src="' + src + 
				'&ap=%2526fmt=18" type="application/x-shockwave-flash" allowfullscreen="true" width="100%" wmode="transparent" height="100%"></embed></object>';
	} else if (regexGoogl.test(src)) {
		src = src.replace(regexGoogl, "");
		src = "http://video.google.com/googleplayer.swf?hl=en&fs=true&" + src.substr(1);
		vBox.innerHTML = '<embed id="VideoPlayback" src="' + src + 
				'" style="width:100%;height:100%" wmode="transparent" allowFullScreen="true" allowScriptAccess="always"' +
				'type="application/x-shockwave-flash"> </embed>';
	} else if (regexMetaCaf.test(src)) {
		src = src.replace(regexMetaCaf,"http://www.metacafe.com/fplayer/");
		src = src.substring(0,src.length - 1) + ".swf";
		vBox.innerHTML = '<embed src="'+ src +
				'" width="100%" height="100%" wmode="transparent" pluginspage="http://www.macromedia.com/go/getflashplayer" ' +
				'type="application/x-shockwave-flash"> </embed>';
	} else if (regexLiveVideo.test(src)) {
		src = src.replace(regexGoogl, "");
		src = "http://www.livevideo.com/flvplayer/embed/" + src.split("/")[4];
		vBox.innerHTML = '<embed src="' + src + '" type="application/x-shockwave-flash" ' +
				'quality="high" WIDTH="100%" HEIGHT="100%" wmode="transparent">';
	} else {
		linkit(src, false, true);
	}
	setupPlayer("Playing");
	$("pBox").appendChild(vBox);
	return false;
}
// Searches for videos based on what the user is searching for
function menutogglevids(theSearch) {
	get("http://video.google.com/videosearch?q=" + theSearch, showvids, novids);
}
	// End Video Search Functions --------------------------------------------------
	
	// Start Image Search Functions -----------------------------------------------
//Setup the image slideshow
function setupSlds() {
	centDivSld = $create("div");
	centDivSld.id = "slideShow";
	allImgs = $cl("imgLink");
	for (var inm = 0; inm < allImgs.length; inm++) {
		var img = $create("img");
		img.className = "sldImgs removed";
		img.id = "i" + inm;
		img.src = allImgs[inm].href;
		centDivSld.appendChild(img);
	}
	var a = $create("a");
	a.textContent = "Go to this image.";
	a.id = "sldLink";
	centDivSld.appendChild(a);
}
// Loads the next image and skips images that aren't loaded (most of the time)
function nextImg() {
	var bn = parseInt($cl("sldImgs blocked")[0].id.substr(1));
	$("i" + bn).className = "sldImgs removed";
	var next;
	if ($("i" + (bn + 1))) {
		next = $("i" + (bn + 1));
	} else {
		next = $("i0");
	}
	next.className = "sldImgs blocked";
	$("sldLink").href = next.src;
	var dwidth = next.width / 2 + 15;
	var dheight = next.height / 2 + 30;
	$("slideShow").style.marginLeft = "-" + dwidth + "px";
	$("slideShow").style.marginTop = "-" + dheight + "px";
	if (next.complete && next.height <= 0) {
		nextImg();
	}
}
// Starts the slide show
function startslides() {
	if ($cl("imgLink")) {
		$('gsr').appendChild(filler);
		$('gsr').appendChild(centDivSld);
		centDiv = centDivSld;
		var s = $("i0");
		s.className = "sldImgs blocked";
		var dwidth = s.width / 2 + 15;
		var dheight = s.height / 2 + 30;
		$("sldLink").href = s.src;
		$("slideShow").style.marginLeft = "-" + dwidth + "px";
		$("slideShow").style.marginTop = "-" + dheight + "px";
		if (sldTm % 1000 === 0) {
			setInterval(nextImg, sldTm);
		} else {
			setInterval(nextImg, 4000);
		}
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
	
	if (styl == "dock") {
		box.className = "removed";
	}
}
// Show the loaded images
function showimages(response) {
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
		
		if (styl == "dock") {
			var sldSpan = $create("span");
			sldSpan.textContent = "Play SlideShow";
			sldSpan.id = "miniSldLink";
			sldSpan.addEventListener("click", function (event) {
				startslides();
			}, false);
			imgTag.appendChild(sldSpan);
		}
		
		var bck = $create("button");
		bck.textContent = "<<";
		bck.id = "prev";
		bck.disabled = true;
		bck.addEventListener("click", function (event) {
			changeset(-1);
		}, false);
		var fwrd = $create("button");
		fwrd.textContent = ">>";
		fwrd.id = "next";
		fwrd.addEventListener("click", function (event) {
			changeset(1);
		}, false);
		var spn = $create("button");
		spn.textContent = "Play SlideShow";
		spn.id = "plySld";
		spn.addEventListener("click", function (event) {
			startslides();
		}, false);
		realbox.appendChild(bck);
		realbox.appendChild(fwrd);
		realbox.appendChild(spn);
		var listerdiv = $create("div");
		listerdiv.id = "biglist";
		listerdiv.className = "removed";
		if (styl == "dock") {
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
	
	$("mBox").appendChild(realbox);
	$("mBox").appendChild(listerdiv);
	if (imgPgs > pon) {
		menutoggleimages(userInput);
	} else {
		imagesorter(listerdiv);
	}
}
// Sorts the images into sets; Size based on number of images.
function imagesorter(imgHolder) {
	if (imgHolder) {
		var numper;
		if (styl == "dock") {
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
		
		// Divides the images out, and creates a new set as necessary
		for (var ic = 0; imgHolder.childNodes[ic] && ic < imgHolder.childNodes.length; ic++) {
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
			setupSlds();
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
	get("http://images.google.com/images?q=" + theSearch + "&gbv=2&start=" + (21 * pon), showimages, noimages);
	pon++;
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
	var hit;
	
	for (var l = 0; l < paras.length; l++) {
		if (paras[l].parentNode.id == "bodyContent" && paras[l].childNodes[0].id != "coordinates") {
			hit = l;
			break;
		}
	}
	// Adds 7 paragraphs from wikipedia if it is set to dock mode
	if (styl == "dock") {
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
	theHeading.appendChild(headLink);
	defdiv.appendChild(theHeading);
	defdiv.appendChild(paranew);
	if (vids || imgs || exvids) {
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
	if (styl == "dock") {
		defdiv.className = "removed";
		$("wikiDock").className = "";
	} else if (styl == "center") {
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
	
	// Start Core Functions -----------------------------------------------------------
// Redirects user to the scripts homepage
function redirInfo() {
	linkit("http://userscripts.org/scripts/show/33449", true, false);
}
// Checks toggles and calls requested functions
function runThrough() {
	if ($("preload")) {
		resetPg();
	} else {
		var pdiv = $create("div");
		pdiv.id = "preload";
		$("gsr").appendChild(pdiv);
	}
	setupConf();
	clickd();
	allStyles();
	
	// Setup for first loading.
	if (GM_getValue("loadBefore", false)) {
		$('gsr').removeChild(filler);
		$('gsr').removeChild(centDivConf);
	} else {
		GM_setValue("loadBefore", true);
	}
	
	// Visual Fixes
	if (sugges) {
		noSuggestions();
	}
	if (dym) {
		didyoumean();
	}
	if (sideads) {
		removeSideAds();
	} else {
		showSideAds();
	}
	
	// Creates the player if either a video or image search is active
	if (vids || imgs) {
		makePlayer();
	}
	
	// Main features
	// Shows video results
	if (vids) {
		menutogglevids(userInput);
	}
	// Extract the video results from the search and if videos is not enabled, display them seperate
	if (exvids) {
		extractVideos(userInput);
	} else {
		unextractVids();
	}
	
	// Shows image results
	if (imgs) {
		menutoggleimages(userInput);
	}
	// Add Wikipedia link  -- Done last for loading and time reasons
	if (wiki) {
		menutogglewiki(userInput);
	} else {
		nowikilink();
	}
	
	// Multisearch box setup
	if (scuts) {
		multiSearchSetup();
	}
	
	// Checks for script updates
	scriptPage();
}
	// End Core Functions -------------------------------------------------------------
// End Functions --------------------------------------------------------------------

// Menu setup -----------------------------------------------------------------------
// Variable is global and has the value of the toggle (default is TRUE if on, FALSE if off)
var margs = GM_getValue("margs", true);
var sugges = GM_getValue("sugges", true);
var dym = GM_getValue("dym", true);
var sideads = GM_getValue("sideads", true);
var wiki = GM_getValue("wiki", true);
var scuts = GM_getValue("scuts", true);
var tabs = GM_getValue("tabs", false);
var oldSize = GM_getValue("oldSize", true);
var exvids = GM_getValue("exvids", true);
var vids = GM_getValue("vids", false);
var imgs = GM_getValue("imgs", false);
var sldTm = GM_getValue("sldtm", 4000);
var imgPgs = GM_getValue("imgPages", 1);
var styl = GM_getValue("style","classic");
var updateCheck = parseInt(GM_getValue("updtTime",0));
var newversion = parseFloat(GM_getValue("newver", 0.0));

// Global Variables
var filler;
var centDiv;
var centDivConf;
var centDivSld;
var sldTmr;
var dockShow;
var pon = 0;

GM_registerMenuCommand("Configure Script", configurations);
GM_registerMenuCommand("Script Info (Opens in New Tab)",redirInfo);

// Finds and saves what the user looks for  and saves the url-- Currently returns incorrect value if back button is used
var userInput = setupText();
var currUrl = location.href;

// Starts the process
runThrough();