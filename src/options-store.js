/**
  *	Options object to hold both default and user configured options.
  */
function optionlist() {
	
		// Visual defaults
	this.DEFAULT_MARGS = true;
	this.DEFAULT_SUGGES = true;
	this.DEFAULT_DYM = true;
	this.DEFAULT_SIDEADS = true;
	this.DEFAULT_MOVETOP = false;
		// Wiki default
	this.DEFAULT_WIKI = true;
		// Shortcut defaults
	this.DEFAULT_SCUTS = true;
	this.DEFAULT_KEYD = true;
	this.DEFAULT_TABS = false;
		// Video defaults
	this.DEFAULT_VIDS = false;
	this.DEFAULT_VDSRCHR = "google";
		// Embed defaults
	this.DEFAULT_EMBD = true;
	this.DEFAULT_VIDCTRL = true;
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
	this.DEFAULT_IMGCTRL = true;
	this.DEFAULT_IMGSIZE = "large";
	this.DEFAULT_SLDSHW = true;
	this.DEFAULT_SLDKEY = true;
	this.DEFAULT_IMGLOAD = true;
	this.DEFAULT_SKIPERR = true;
	this.DEFAULT_SLDTM = 4000;
	this.DEFAULT_IMGPGS = 21;
		// Style defaults
	this.DEFAULT_STYL = "classic";
	this.DEFAULT_SOOT = false;
	this.DEFAULT_OLDSIZE = true;
		// Advanced defaults
	this.DEFAULT_DELAY = 400;
		// Classic Style defaults
	this.DEFAULT_CLCVRTHRZ = 'horizontal';
	this.DEFAULT_CLCTOPRHT = 'videos';
	this.DEFAULT_CLCBORDER = false;
	this.DEFAULT_CLCBDRCLR = "193,211,232";
		// Dock Style defaults
	this.DEFAULT_DOCKNAVSTL = 'icon';
	this.DEFAULT_DOCKBORDER = true;
	this.DEFAULT_DOCKBDRCLR = "193,211,232";
	this.DEFAULT_DOCKBGCLR = "240,247,249";
		// Media Style defaults
	this.DEFAULT_MDAIMGNUM = 14;
	this.DEFAULT_MDAEMDPOS = "left";
		// Color Defaults
			// Background Colors
	this.DEFAULT_GENBGCLR = '255,255,255';
	this.DEFAULT_SCHBGCLR = '245,245,245';
	this.DEFAULT_RESLTCLR = '255,255,255';
	this.DEFAULT_GLBARCLR = '45,45,45';
	this.DEFAULT_ADDEDCLR = '240,247,249';
	this.DEFAULT_PLYBLCLR = '255,255,255';
	this.DEFAULT_OVRLYCLR = '0,0,0';
			// Text Colors
	this.DEFAULT_RESTXTCLR = '0,0,0';
	this.DEFAULT_GBRTXTCLR = '204,204,204';
	this.DEFAULT_GBOTXTCLR = '255,255,255';
	this.DEFAULT_LNKTXTCLR = '17,17,204';
	this.DEFAULT_URLTXTCLR = '34,136,34';
	this.DEFAULT_SIMTXTCLR = '66,114,219';
	this.DEFAULT_MDATXTCLR = '0,0,0';
	this.DEFAULT_PLYTXTCLR = '0,0,0';
	this.DEFAULT_PBLTXTCLR = '0,0,0';
	
		// Search Default Object
	this.DEFAULT_SEARCHENGINES = " \
[ \
	{ \
		\"Name\" : \"Google\", \
		\"url_before\" : \"http://google.com/search?q=\", \
		\"url_after\" : \"\" \
	}, \
	{ \
		\"Name\" : \"ESPN\", \
		\"url_before\" : \"http://search.espn.go.com/\", \
		\"url_after\" : \"\" \
	}, \
	{ \
		\"Name\" : \"eBay\", \
		\"url_before\" : \"http://shop.ebay.com/items/?_nkw=\", \
		\"url_after\" : \"\" \
	}, \
	{ \
		\"Name\" : \"Source Forge\", \
		\"url_before\" : \"http://sourceforge.net/search/?type_of_search=soft&words=\", \
		\"url_after\" : \"\" \
	}, \
	{ \
		\"Name\" : \"CNN\", \
		\"url_before\" : \"http://search.cnn.com/search.jsp?type=web&sortBy=date&intl=false&query=\", \
		\"url_after\" : \"\" \
	}, \
	{ \
		\"Name\" : \"Flickr\", \
		\"url_before\" : \"http://www.flickr.com/search/?q=\", \
		\"url_after\" : \"\" \
	}, \
	{ \
		\"Name\" : \"Wikipedia\", \
		\"url_before\" : \"http://en.wikipedia.org/wiki/Special:Search?go=Go&search=\", \
		\"url_after\" : \"\" \
	}, \
	{ \
		\"Name\" : \"Youtube\", \
		\"url_before\" : \"http://www.youtube.com/results?search_type=&aq=f&search_query=\", \
		\"url_after\" : \"\" \
	}, \
	{ \
		\"Name\" : \"Digg\", \
		\"url_before\" : \"http://digg.com/search?section=all&s=\", \
		\"url_after\" : \"\" \
	}, \
	{ \
		\"Name\" : \"GameFAQs\", \
		\"url_before\" : \"http://www.gamefaqs.com/search/index.html?platform=0&game=\", \
		\"url_after\" : \"\" \
	}, \
	{ \
		\"Name\" : \"IMDB\", \
		\"url_before\" : \"http://www.imdb.com/find?s=all&x=22&y=12&q=\", \
		\"url_after\" : \"\" \
	}, \
	{ \
		\"Name\" : \"AnimeDB\", \
		\"url_before\" : \"http://anidb.net/perl-bin/animedb.pl?show=animelist&do.search=Search&adb.search=\", \
		\"url_after\" : \"\" \
	}, \
	{ \
		\"Name\" : \"Wiktionary\", \
		\"url_before\" : \"http://en.wiktionary.org/wiki/Special:Search?go=Go&search=\", \
		\"url_after\" : \"\" \
	}, \
	{ \
		\"Name\" : \"Wiki How To\", \
		\"url_before\" : \"http://www.wikihow.com/Special:LSearch?fulltext=Search&search=\", \
		\"url_after\" : \"\" \
	}, \
	{ \
		\"Name\" : \"Wiki Quote\", \
		\"url_before\" : \"http://en.wikiquote.org/wiki/Special:Search?go=Go&search=\", \
		\"url_after\" : \"\" \
	} \
] \
";
	
		// Visual vars
	this.margs = GM_getValue("margs", this.DEFAULT_MARGS);
	this.sugges = GM_getValue("sugges", this.DEFAULT_SUGGES);
	this.dym = GM_getValue("dym", this.DEFAULT_DYM);
	this.sideads = GM_getValue("sideads", this.DEFAULT_SIDEADS);
	this.moveTop = GM_getValue("moveTop", this.DEFAULT_MOVETOP);
		// Wiki var
	this.wiki = GM_getValue("wiki", this.DEFAULT_WIKI);
		// Shortcut vars
	this.scuts = GM_getValue("scuts", this.DEFAULT_SCUTS);
	this.keyd = GM_getValue("keyd", this.DEFAULT_KEYD);
	this.tabs = GM_getValue("tabs", this.DEFAULT_TABS);
		// Video vars
	this.vids = GM_getValue("vids", this.DEFAULT_VIDS);
	this.vdsrchr = GM_getValue("vdsrchr", this.DEFAULT_VDSRCHR);
		// Embed vars
	this.embd = GM_getValue("embd", this.DEFAULT_EMBD);
	this.vidCtrl = GM_getValue("vidCtrl", this.DEFAULT_VIDCTRL);
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
	this.imgCtrl = GM_getValue("imgCtrl", this.DEFAULT_IMGCTRL);
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
	this.schbgclr = GM_getValue("schbgclr", this.DEFAULT_SCHBGCLR);
	this.resltclr = GM_getValue("resltclr", this.DEFAULT_RESLTCLR);
	this.glbarclr = GM_getValue("glbarclr", this.DEFAULT_GLBARCLR);
	this.addedclr = GM_getValue("addedclr", this.DEFAULT_ADDEDCLR);
	this.plyblclr = GM_getValue("plyblclr", this.DEFAULT_PLYBLCLR);
	this.ovrlyclr = GM_getValue("ovrlyclr", this.DEFAULT_OVRLYCLR);
		// Text Color vars
	this.restxtclr = GM_getValue("restxtclr", this.DEFAULT_RESTXTCLR);
	this.gbrtxtclr = GM_getValue("gbrtxtclr", this.DEFAULT_GBRTXTCLR);
	this.gbotxtclr = GM_getValue("gbotxtclr", this.DEFAULT_GBOTXTCLR);
	this.lnktxtclr = GM_getValue("lnktxtclr", this.DEFAULT_LNKTXTCLR);
	this.urltxtclr = GM_getValue("urltxtclr", this.DEFAULT_URLTXTCLR);
	this.simtxtclr = GM_getValue("simtxtclr", this.DEFAULT_SIMTXTCLR);
	this.mdatxtclr = GM_getValue("mdatxtclr", this.DEFAULT_MDATXTCLR);
	this.plytxtclr = GM_getValue("plytxtclr", this.DEFAULT_PLYTXTCLR);
	this.pbltxtclr = GM_getValue("pbltxtclr", this.DEFAULT_PBLTXTCLR);
	
		// Classic Style vars
	this.clcvrthrz = GM_getValue("clcvrthrz", this.DEFAULT_CLCVRTHRZ);
	this.clctoprht = GM_getValue("clctoprht", this.DEFAULT_CLCTOPRHT);
	this.clcborder = GM_getValue("clcborder", this.DEFAULT_CLCBORDER);
	this.clcbdrclr = GM_getValue("clcbdrclr", this.DEFAULT_CLCBDRCLR);
		// Dock Style vars
	this.docknavstl = GM_getValue("docknavstl", this.DEFAULT_DOCKNAVSTL);
	this.dockborder = GM_getValue("dockborder", this.DEFAULT_DOCKBORDER);
	this.dockbdrclr = GM_getValue("dockbdrclr", this.DEFAULT_DOCKBDRCLR);
	this.dockbgclr = GM_getValue("dockbgclr", this.DEFAULT_DOCKBGCLR);
		// Media Style vars
	this.mdaimgnum = GM_getValue("mdaimgnum", this.DEFAULT_MDAIMGNUM);
	this.mdaemdpos = GM_getValue("mdaemdpos", this.DEFAULT_MDAEMDPOS);
	
		// Search Engines
	this.searchengines = eval(GM_getValue("searchengines", this.DEFAULT_SEARCHENGINES));
}

var options = new optionlist();
