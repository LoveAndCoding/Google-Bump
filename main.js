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
		if ($('ires').childNodes) {
			$('ires').insertBefore(mBox, $('ires').childNodes[0]);
		} else {
			$('ires').appendChild(mBox);
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

// Starts the process
if($('ires') && $('ires').children.length > 0) {
	runThrough();
} else {
	delayed = true;
	var inval = setTimeout(waitingForPage, options.delay);
}

function waitingForPage() {
	if($('ires') && $('ires').children.length > 0) {
		userInput = setupText();
		currUrl = location.href;
		runThrough();
	} else {
		setTimeout(waitingForPage, options.delay);
	}
}