/** 
  *	Import Dependencies
  *	
  *	@depends header.js
  *	@depends image-store.js
  *	@depends options-store.js
  *	@depends helper-functions.js
  *	@depends styles/style-functions.js
  *	@depends update.js
  *	@depends dialogs/dialog-functions.js
  *	@depends shortcuts.js
  *	@depends text-functions.js
  *	@depends styles/visual-functions.js
  *	@depends search/video-functions.js
  *	@depends search/image-functions.js
  *	@depends search/wiki-functions.js
  */
	// Start Core Functions -----------------------------------------------------------
// Redirects user to the scripts homepage
function redirInfo() {
	linkit("http://userscripts.org/scripts/show/33449", true, false);
}
// Checks toggles and calls requested functions
function runThrough() {
	if (!initialized) {
		// Checks for script updates
		scriptPage();
		setInstant();
		
		var q = document.evaluate('//*[@name="q"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		queryBox = q.snapshotItem(0);
		
		if ($("preload")) {
			resetPg();
		} else {
			var pdiv = $create("div", {
				id : "preload"
			});
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
		if (options.sideads || options.styl != 'classic') {
			removeSideAds();
		} else {
			showSideAds();
		}
		if(options.moveTop) {
			topContentMove();
		}
		
		// Creates the player if either a video or image search is active
		if (options.vids || options.imgs) {
			
			mBox = rightBox("mBox");
			// if ($$(statId, dynaId).childNodes) {
				// $$(statId, dynaId).insertBefore(mBox, $$(statId, dynaId).childNodes[0]);
			// } else {
				// $$(statId, dynaId).appendChild(mBox);
			// }
			document.body.appendChild(mBox);
			
			if (options.imgPlyr || options.embd) {
				makePlayer();
			}
		}
		
		if (options.scuts && !$('allSearches')) {
			multiSearchSetup();
		}
		
		var settings = $create('span', {
			className : 'gbump_btn',
			id : 'gbump_settings'
		});
		settings.addEventListener('click', function (e) {
			conf.draw();
		}, false);
		var theirButton = $('sblsbb');
		theirButton.parentNode.appendChild(document.createTextNode(' '));
		theirButton.parentNode.appendChild(settings);
		
		// New google search code doesn't reload page. This checks for changes and redoes all actions
		var checkpage = setInterval(checknonreload, options.delay);
		initialized = true;
	}
	
	// Main features
	// Shows video results
	if (options.vids) {
		menutogglevids(userInput);
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
var ssStore;
// Finds and saves what the user looks for  and saves the url-- Currently returns incorrect value if back button is used
var userInput = setupText();
var currUrl = location.href;
var delayed = false;

var dynaId = 'search';
var statId = 'ires';
var mBox;
var initialized = false;

// Starts the process
if($$(statId, dynaId) && $$(statId, dynaId).children.length > 0 && extractPage() == 'web') {
	ssStore = new stylesheet_store();
	runThrough();
} else {
	delayed = true;
	var inval = setTimeout(waitingForPage, options.delay);
}

function waitingForPage() {
	if($$(statId, dynaId) && $$(statId, dynaId).children.length > 0 && extractPage() == 'web') {
		userInput = setupText();
		currUrl = location.href;
		ssStore = new stylesheet_store();
		runThrough();
	} else {
		setTimeout(waitingForPage, options.delay);
	}
}