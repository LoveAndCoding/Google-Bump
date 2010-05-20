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
	this.genbgclr = parseInt(GM_getValue("genbgclr", this.DEFAULT_GENBGCLR));
}
