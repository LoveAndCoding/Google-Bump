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
		// var mediaSS = "a, img { border-style: none; } " +
						// "#res { /*background: #1e68ef url(http://uwdcb.doesntexist.com/gbback.jpg) repeat-x scroll top left; */padding-top: 7px; } " +
						// "#resOL { position: absolute; right: 0px; top: 7px;";
		// if (options.vids && options.imgs) {
			// mediaSS += "height: 300px;";
		// } else if (options.imgs) {
			// mediaSS += "height: 500px; } #imageList img { margin: 4px !important; padding: 4px !important; } #imageList { margin-top: 1% !important; width: 100% !important; height: 150px !important; position: static !important; } #resOL {";
		// } else {
			// mediaSS += "height: 500px; } #videoList { width: 100% !important; } #resOL {";
		// }
		// mediaSS += " width: 44%; overflow: auto; border: 1px solid black; background-color: #FFFFFF; } "+
						// "#videoList { border: 1px solid black; overflow: auto; width: 55%; height: auto; margin-top: 1%; } "+
						// "#videoList p { margin-top: 0px; margin-bottom: 5px; text-decoration: underline; } " +
						// "#imageList { border: 1px solid black; overflow: auto; width: 44%; height: auto; position: absolute; top: 312px; right: 0px; } "+
						// "#imageList img { margin: 1.4%; } " +
						// "#pBox { border: 1px solid black; height: 500px; text-align: center; width: 55%; }" +
						// "#pBox img { max-width: 95%; max-height: 95%; margin-top: 1%;} " +
						// "#hidePly { display: none !important; } " +
						// "#wikLink { float: left; } " +
						// ".removed, .rl-details, .rl-snippet, .rl-short-snippet, .rl-snippet-grid-view, .rl-watch-on, .rl-special, .rl-cannot-play-here { display: none; } " +
						// "#wikiHeader { font-size: 115%; background-color: #D8E2F5; padding-left: .2em; }" +
						// "#wikiDesc { font-size: 75%; margin: 0px; padding: .2em; text-indent: 3em; border: 2px solid #D8E2F5; background-color: #FFFFFF; }" +
						// "#wikiDiv { width: 100%; margin-bottom: .5em; margin-top: 1%; } " +
						// "#res { padding-right: 0px; position: relative; } " +
						// ".vid_result, .rl-res { width: 102px; margin-left: 2%; margin-right: 2%; display: inline-table; height: auto; text-align: center; } " +
						// ".thumbnail-img { width: 100px; height: 80px; } " +
						// ".rl-metadata, .rl-thumbnail { display: block; font-size: small; } " +
						// "#sldLink { text-align: center; display: block;}" +
						// "#slideShow { position: fixed; text-align: center; padding: 15px; top: 50%; left: 50%; z-index: 9998; background-color: white; border: 1px solid black; } " +
						// ".sldImgs { max-width: " + maxwidth + "px; max-height: " + maxheight + "px; } " +
						// "#greyOut { background-color: black; opacity: .6; width: 100%; height: 100%; z-index: 1000; position: fixed; top: 0px; left: 0px; } " +
						// "#pBox, #imageList, #videoList { background-color: #D8E2F5; } " +
						// ".rl-res, #imageList img { padding: 1%; background-color: #FFFFFF; border: 1px solid black; } ";
		
		GM_addStyle(ssStore.media_stylesheet);
		$("resOL").parentNode.className = "resBox";
		$("resOL").parentNode.appendChild($("nav"));
		
	} else if (options.styl == "dock") {
		// var dockSS = "body { margin-bottom: 50px; } " +
						// "a img { border-style: none; } " +
						// ".closed { display: none; } " +
						// "#dock { position: fixed; height: 40px; width: 260px; border: 1px solid #000000; border-bottom-style: none; bottom: 0px; right: 50%; margin-right: -130px; text-align: center; background-color: #F0F7F9; } " +
						// ".dockLink { padding: 1em 1.25em; display: inline; cursor: pointer; float: left; } " +
						// "#wikiHeader { font-size: 18pt; padding-left: .5em; } " +
						// ".wiki_p { text-indent: 1.5em; } " +
						// "#playerTag { text-align: center; margin-top: 0px; } " +
						// "#pBox { position: relative; } " +
						// "#pBox, #videoList, .imgLink img, #imageList { border: 1px solid #000000; } " +
						// "#playerTag, #vidTag, #imageTag { background-color: #000000; color: #FFFFFF; text-shadow: -1px 0px #888888; } " +
						// "#videoList .rl-item { display: -moz-stack; width: 16%; margin: 1px 2%; text-align: center; } " +
						// "#vBox { height: 480px; } " +
						// "#vidTag { border-bottom: 1px solid #000000; } " +
						// "#videoList, #imageList { border-top-style: none; } " +
						// ".rl-domain { display: block; } " +
						// "#miniSldLink { cursor: pointer; float: right; font-size: small; padding: 2px 4px; margin-top: 1px; text-shadow: -1px 1px #666666; } " +
						// "#miniSldLink:hover { background-color: #FFFFFF; color: #000000; text-shadow: -1px 1px #CCCCCC } " +
						// "#imageList button, .rl-cannot-play-here, .rl-domain-below, .rl-watch-on, .rl-special, .rl-snippet { display: none; } " +
						// ".imgShowing { text-align: center; } " +
						// ".imgLink { display: inline-block;  margin: 1%; width: 9%; vertical-align: middle; } " +
						// ".imgLink img { height: auto; padding: 2px; background-color: #555555; } " +
						// ".aset { display: inline !important; } ";
		GM_addStyle(ssStore.dock_stylesheet);
		
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
		// var centerssheet = "body { width: 760px; margin: 0px auto !important; padding-top: 3px; border: 1px solid #000000; border-top-style: none; } " +
							// "html { background-color: #DDDDFF; } " +
							// "#tsf { position: relative; } " +
							// ".gbh { left: auto !important; right: auto !important; width: 760px; } " +
							// "#ssb { margin-bottom: 0px; padding-bottom: 0px; } " +
							// "#mBox { position: relative; width: 600px; height: 220px; margin-left: -16px; overflow: hidden; border-bottom: 1px solid #6B90DA; border-top: 1px solid #6B90DA; } " +
							// "#wikiDiv { min-height: 122px; z-index: 1003; border-bottom: 1px solid #000000; border-right: 1px solid #000000; position: absolute; top: 0px; left: 0px; background-color: #FFFFFF; width: 200px; } " +
							// "#wikiHeader { font-size: 100%; text-align: center; border-bottom: 1px solid #000000; } " +
							// "#wikiHeader a, #wikiHeader a:active { color: #0077CC; text-decoration: none; } " +
							// "#wikiDesc { margin: 0px; padding: 5px 2px 2px 2px; font-size: 85%; } " +
							// "#wikiExp { min-height: 120px; z-index: 1002; text-align: center; font-size: 75%; position: absolute; top: 0px; left: 0px; background-color: #FFFFFF; border-right: 1px solid #000000; border-bottom: 1px solid #000000; cursor: pointer; color: #0077CC; padding: 1px 4px; } " +
							// "#pBox { width: 380px; text-align: center; height: 220px; background-color: #FFFFFF; } " +
							// "#videoList { float: left; height: 220px; width: 299px; overflow-y: auto; overflow-x: hidden; border-right: 1px solid #6B90DA; } " + 
							// "#vidTag, #imageTag, #playerTag { text-align: center; margin: 0px; padding: 0px 8px; background-color: #F0F7F9; border-bottom: 1px solid #6B90DA; } " +
							// ".rl-item { max-width: 100px; float: left; padding: 5px 10px; } " +
							// ".rl-thumbnail img { max-width: 100px; } " +
							// ".rl-domain-below { overflow-x: hidden; width: 100px; } " +
							// ".rl-details, .rl-snippet, .rl-snippet-grid-view, .rl-watch-on, .rl-cannot-play-here, .rl-special { display: none; } " +
							// "#imageList { text-align: center; height: 220px; width: 299px; float: right; z-index: 1001; overflow-y: auto; overflow-x: hidden; } " +
							// "#imageList img { max-width: 100px; } " +
							// ".playing { display: block !important; z-index: 1004 !important; } " +
							// ".imgShowing { display: block !important; z-index: 1004 !important; } " +
							// ".imgShowing img { max-height: 190px; max-width: 380px; margin-top: 2px; } " +
							// ".sldImgs { display: block; } " +
							// "#vBox { background-color: #FFFFFF; } " +
							// "#resOL { padding-left: 4px; } " +
							// "#res { margin: 0px !important; } " +
							// ".gac_m { left: 142px !important; margin: -25px 0px -100% 1px !important; float: left; } " +
							// "#ssb { margin: 0px !important; } ";
		// if (options.vids && options.imgs) {
			// centerssheet += "#pBox { position: absolute; top: 0px; right: 0px; display: none; z-index: 1002; } .imgShowing { position: absolute; left: 0px; border-right: 1px solid #6B90DA; width: 379px; } .playing { position: absolute; right: 0px; } ";
		// } else if (options.vids) {
			// centerssheet += "#pBox { float: right; } ";
		// } else {
			// centerssheet += "#pBox { float: left; border-right: 1px solid #6B90DA; } ";
		// }
		GM_addStyle(ssStore.center_stylesheet);
		
		//var wikiExp = $create("div");
		//documnet.body.appendChild(wikiExp);
	} else {
		// var ssheet = "#center_col { margin-right: 0px; } " +
					// "#mBox { background-color: white; width: 400px; } #pBox { vertical-align: middle; overflow: hidden; width: 400px; } .playing, .imgShowing { position: relative; } " +
					// ".playing #embedArea { height: 340px; } #foot { clear: both; } " +
					// ".rBox { float: right; background-color: #F0F7F9; text-align: center; } .wBBord { border-bottom: 1px solid #6B90DA; } " +
					// "#setShow, .blocked, .imgLink { display: block; } #vidTag, #imageTag { margin: 0px; } " +
					// "#playerTag { background-color: #F0F7F9; height: 20px; } #vBox { height: 305px; } " +
					// ".playimg { max-width: 400px; max-height: 345px; border-style: none; } " + 
					// "#videoList { width: 180px; } #imageList { width: 220px; } #wikLink { float: left; display: inline; } #ssb { position: relative; height: 25px; } " +
					// "#resStat { display: inline; position: absolute; top: 1px; right: 0px; } " + 
					// "#resOL { margin: 0px 2% 0px .1em; } .toLI { display: list-item; } .reAddAd { width: 100px; } .g { margin-top: 0px; min-width: 540px; } " +
					// "#ssb { position: relative; height: 25px; } #rsStats { display: inline; float: right; } " + 
					// "#prs { display: inline; } .vidRes { width: 145px; display: block; } .vidRes .g { margin: 0px;  min-width: 0px;  margin-left: 1em; } " + 
					// ".vidRes img { width: 137px; height: 97px; } .vrTitle { margin-bottom: 30px; } #exvidlist { width: 170px; } " + 
					// ".vid_thumb { width: 140px; height: 100px; padding: 0px 10px; border-style: none; border-bottom: 1px solid #000000; background-color: #000000; } " +
					// ".vid_result { font-size: 11pt; border: 1px solid #000000; margin: 9px; } .vid_result a { text-decoration: none; } " +
					// "#ssb { margin-bottom: 0px; padding-bottom: 0px; } " +
					// "#hidePly { display: none; } " +
					// "#slideShow { position: fixed; text-align: center; padding: 15px; top: 50%; left: 50%; z-index: 9998; background-color: white; " + 
					// "border: 1px solid black; } .sldImgs { max-width: " + maxwidth + "px; max-height: " + maxheight + "px; } " +
					// "#sldLink { text-align: center; } #next{ float: right; } #prev { float: left; } #res { padding-right: 0px; margin-top: 0px; }" + 
					// "#wikiHeader { font-size: 115%; background-color: #F0F7F9; padding-left: .2em; }" +
					// "#wikiDesc { font-size: 75%; margin: 0px; padding: .2em; text-indent: 3em; border: 2px solid #F0F7F9; }" +
					// "#wikiDiv { width: 580px; margin-top: -1px; margin-bottom: .5em; } " +
					// ".ts td { padding: 0px 0px 0px 17px; } ";
		GM_addStyle(ssStore.classic_stylesheet);
	}
	
	// Applies css that is constant across all styles
	// var genSS = "#greyOut { background-color: black; opacity: .6; width: 100%; height: 100%; z-index: 1000; position: fixed; top: 0px; left: 0px; } " + 
					// "#gbLoader { position: absolute; top: 25px; right: 3px; } " +
					// ".confLbl { font-size: small; display: inline; } .opli { display: inline; } .confTab { margin: 0px; padding: 2px 4px; border: 1px solid black; } " +
					// "#confWel, #styleWel { border-bottom: 1px solid black; font-size: 22pt; font-family: \"Times New Roman\", serif; text-align: center; background-color: #F0F7F9; -moz-border-radius-topleft: 5px; -moz-border-radius-topright: 5px;} " +
					// "#slideShow { position: fixed; text-align: center; padding: 15px; top: 50%; left: 50%; z-index: 9998; background-color: white; border: 1px solid black; } " +
					// ".config_section_head { margin: 6px 0px; border-bottom: 1px solid grey; } #confWrap { height: 427px; border-bottom: 1px solid black; margin-bottom: 2px; } " +
					// ".sldImgs { display: block; } .embeddable { background-color: #FFFFFF; } .keycuts { width: 100%; } .keycuts em { text-decoration: underline; font-weight: bold; } " +
					// ".conf_Tab, #confTabs { background-color: #F0F7F9; } #t_AbtConf { background-color: #F0F7F9 !important; } " +
					// "#hidePly { background-color: #FFFFFF; color: #FF0000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 50%; position: absolute; top: 0px; right: 0px; width: 1.1em; height: 1.1em; cursor: pointer; } " +
					// "#confTabs { height: 19px; border-bottom: 1px solid #000000; position: relative; margin-bottom: 3px; } .conf_Tab { padding: 0px 0.5em .25em .5em; " + 
					// "margin-top: 4px; border-bottom: 1px solid black; border-right: 1px solid black; display: inline; z-index: 10001; cursor: pointer; line-height: 16px; } " +
					// ".selected_tab { border-bottom-color: #FFFFFF; background-color: #FFFFFF; } .confTabOn { margin: .7em; } .confTabOn label { margin: .2em 0px; } .confTabOn button { margin: .5em 0px; } " + 
					// "#t_AbtConf { border-color: #000000 !important; display: block; position: absolute; top: -4px; right: 0px; text-align: right; border-right-style: none; z-index: 10000; } " +
					// "#AbtConf p { margin-top: 0px; } #deapallFault, #sNc { margin-left: .2em; } " +
					// "#newVer { width: 200px; height: 1.3em; margin: -1.8em 0px 0px 8px; text-align: center; font-size: 85%; background-color: #CCCCFF; padding: 1px; } " +
					// ".GB_dialog_popup { position: fixed; left: 50%; top: 50%; width: 500px; height: 520px; margin-left: -250px; margin-top: -260px; z-index: 9999; background-color: white; border: 1px solid black; -moz-border-radius: 5px; } " +
					// "#res { margin: 0px 8px; } #cnt { max-width: 100%; } " +
					// "#ssb { height: auto; overflow: hidden; } " +
					// "#wikLink { float: left; } .conf_subsect { margin-bottom: 10px; } " +
					// ".error { color:#FF0000; } " +
					// ".controlIcon { cursor: pointer; } " +
					// "#dymTxt, #wikiLink { margin: 5px; } ";
	// if (options.oldSize) {
		// genSS += "#sff .lst, #sff .lsb { font-size: small; height: auto; } ";
	// }
	// if (options.margs) {
		// genSS += "#gbar { padding-left: 8px; } .e, ";
	// }
	// if (options.sideads || options.sugges) {
		// genSS += "#rhs, ";
	// }
	// genSS += ".removed, #preload { display: none !important; }";
	
	GM_addStyle(ssStore.gen_stylesheet);
	
	// var msSS = "#currentSearch { margin-top: 0px !important; } " + 
				// ".lsbb { white-space: nowrap; } " +
				// "#allSearches { border: 1px solid #0077CC; margin-top: 10px; background-color: #FFFFFF; z-index: 1000; float: left; } " +
				// "#expand, #collapse { cursor: pointer; font-family: sans-serif; float: right; color: #0077CC; margin-right: 3px; margin-bottom: 2px; } " +
				// "#collapse { font-size: 60%; padding-left: .3em; padding-right: .35em; } " +
				// "#expand { font-size: 50%; padding-left: .2em; padding-right: .25em;  } " +
				// ".TabHead { font-size: 75%; color: #555555; margin: 0px; margin-left: 1em; display: inline; } " +
				// ".siteSelector { display: inline; margin-left: 1em; margin-bottom: 1em; } " +
				// ".searchBoxes { display: inline; margin-left: 1em; width: 50%; } " +
				// ".closeBtn { color: red; display: inline; margin: 0px; cursor: pointer; font-size: 50%; vertical-align: top; margin-left: .8em; } " +
				// "#expandedMulti hr { margin: 1px; } " +
				// "#adding { margin-left: 3em; cursor: pointer; font-size: 85%; color: blue; margin-top: -1em; } " +
				// "#searchAll { font-size: normal; } " +
				// "#otherSearchContent { margin-bottom: 44px; } " +
				// ".gac_m { z-index: 1500 !important; border: 1px solid #D0D0D0 !important; border-top-style: none !important; } " +
				// ".ts td { padding-left: 4px !important; } ";
	
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
//
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
//
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
		pix[i+3] = 255 - Math.min(pix[i],Math.min(pix[i+1],pix[i+2]));
	}
	ctx.putImageData(imgd, 0, 0);
	
	removeAllChildren($('logo'));
	$('logo').appendChild(canvas);
}
	// End Display Functions -----------------------------------------------------------
