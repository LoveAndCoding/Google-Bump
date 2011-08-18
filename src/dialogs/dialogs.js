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
			textContent : "Google Bump",
			id : "styleWel"
		});
		
		// Wrappers for the content
		var tabHead = $create("div", {
			id : "confTabs"
		});
		var selectHead = $create("div", {
			id : "confBoxSel"
		});
		var wrapper = $create("div", {
			id : "confWrap"
		});
		var btnwrap = $create("div", {
			id : "confBtnWrap"
		});
		
		// For selecting which options to use
		var optSelBox = $create("div", {
			className : "selBox",
			textContent : "Options"
		});
		var stlSelBox = $create("div", {
			className : "selBox selBoxOn",
			textContent : "Styles"
		});
		optSelBox.addEventListener('click', function (e) {
			configurations();
		}, false);
		
		selectHead.appendChild(optSelBox);
		selectHead.appendChild(stlSelBox);
		
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
		bgc_section.sectionOptions.push(new config_colorBox('Main Area', 'resltclr', options.DEFAULT_RESLTCLR));
		bgc_section.sectionOptions.push(new config_colorBox('Google Bar', 'glbarclr', options.DEFAULT_GLBARCLR));
		bgc_section.sectionOptions.push(new config_colorBox('Search Area', 'schbgclr', options.DEFAULT_SCHBGCLR));
		bgc_section.sectionOptions.push(new config_colorBox('Added Items', 'addedclr', options.DEFAULT_ADDEDCLR));
		bgc_section.sectionOptions.push(new config_colorBox('Embedable Videos', 'plyblclr', options.DEFAULT_PLYBLCLR));
		bgc_section.sectionOptions.push(new config_colorBox('Overlay', 'ovrlyclr', options.DEFAULT_OVRLYCLR));
		bgc_set_window.sections.push(bgc_section);
		
		// Font Settings
		var txc_set_window = new config_window(txcTab, 'TxColrs');
			// Colors
		var txc_section = new config_section("Text Colors");
		txc_section.sectionOptions.push(new config_colorBox('General', 'restxtclr', options.DEFAULT_RESTXTCLR));
		txc_section.sectionOptions.push(new config_colorBox('Google Bar Links', 'gbrtxtclr', options.DEFAULT_GBRTXTCLR));
		txc_section.sectionOptions.push(new config_colorBox('Google Bar Selected', 'gbotxtclr', options.DEFAULT_GBOTXTCLR));
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
		var classic_section = new config_section("General");
		classic_section.sectionOptions.push(new config_checkBox("Hide Sidebar Ads", "sideads", options.DEFAULT_SIDEADS));
		//classic_section.sectionOptions.push(new config_desc_section('Coming Soon', 'This section is still under construction. Please excuse our mess.'));
		classic_set_window.sections.push(classic_section);
			// Media Content Settings
		var classic_media_section = new config_section("Media Content");
		classic_media_section.sectionOptions.push(new config_selectionBox("Orientation", "clcvrthrz", ["Horizontally", "Vertically"], ["horizontal", "vertical"], options.DEFAULT_CLCVRTHRZ));
		classic_media_section.sectionOptions.push(new config_selectionBox("Right/Top", "clctoprht", ["Images", "Videos"], ["images", "videos"], options.DEFAULT_CLCTOPRHT));
		classic_media_section.sectionOptions.push(new config_checkBox("Border", "clcborder", options.DEFAULT_CLCBORDER));
		classic_media_section.sectionOptions.push(new config_colorBox('Border Color', 'clcbdrclr', options.DEFAULT_CLCBDRCLR));
		classic_set_window.sections.push(classic_media_section);
		
		
		// Media Settings
		var media_set_window = new config_window(mdaTab, "MdaStyl");
			// General Settings
		var media_section = new config_section("General");
		media_section.sectionOptions.push(new config_intField("Images per set", "mdaimgnum", options.DEFAULT_MDAIMGNUM));
		media_section.sectionOptions.push(new config_selectionBox("Embed area", "mdaemdpos", ["Left", "Right", "Overlay"], ["left", "right", "over"], options.DEFAULT_MDAEMDPOS));
		media_set_window.sections.push(media_section);
		
		// Dock Settings
		var dock_set_window = new config_window(dckTab, "DockStyl");
			// Navigation Settings
		var dock_section = new config_section("Navigation");
		dock_section.sectionOptions.push(new config_selectionBox("Display", "docknavstl", ["Text", "Icons", "Both"], ["text", "icon", "both"], options.DEFAULT_DOCKNAVSTL));
		dock_section.sectionOptions.push(new config_checkBox("Border", "dockborder", options.DEFAULT_DOCKBORDER));
		dock_section.sectionOptions.push(new config_colorBox('Border Color', 'dockbdrclr', options.DEFAULT_DOCKBDRCLR));
		dock_section.sectionOptions.push(new config_colorBox('Background Color', 'dockbgclr', options.DEFAULT_DOCKBGCLR));
		dock_set_window.sections.push(dock_section);
		
		// Center Settings
		var center_set_window = new config_window(cntTab, "CentStyl");
			// General Settings
		var center_section = new config_section();
		center_section.sectionOptions.push(new config_colorBox('Background', 'genbgclr', options.DEFAULT_GENBGCLR));
		center_set_window.sections.push(center_section);
		
		// General Settings
		var gen_set_window = new config_window(genTab, "GenStyl");
			// Styles
		var gen_section = new config_section("Style");
		gen_section.sectionOptions.push(new config_selectionBox("Layout Style", "style", ["Classic", "Media (Disabled)", "Dock (Disabled)",/* "Columns",*/ "Centered"], ["classic", "media", "dock",/* "column",*/ "center"], options.DEFAULT_STYL));
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
		var savebtn = new button("Close", function () { SR.popup.undraw(); location.reload(); });
		var defbtn = new button("Defaults", function () { SR.setDefaults(); });
		savebtn.draw(btnwrap);
		defbtn.draw(btnwrap);
		
		// Appending of all the configurations
		centDivStyl.appendChild(welcome);
		centDivStyl.appendChild(selectHead);
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
			textContent : "Google Bump",
			id : "confWel"
		});
		
		// Wrappers for the content
		var tabHead = $create("div", {
			id : "confTabs"
		});
		var selectHead = $create("div", {
			id : "confBoxSel"
		});
		var wrapper = $create("div", {
			id : "confWrap"
		});
		var btnwrap = $create("div", {
			id : "confBtnWrap"
		});
		
		// For selecting which options to use
		var optSelBox = $create("div", {
			className : "selBox selBoxOn",
			textContent : "Options"
		});
		var stlSelBox = $create("div", {
			className : "selBox",
			textContent : "Styles"
		});
		stlSelBox.addEventListener('click', function (e) {
			styler();
		}, false);
		
		selectHead.appendChild(optSelBox);
		selectHead.appendChild(stlSelBox);
		
		var keyslist = [];
		var valslist = [];
		for (var se = 0; se < options.searchengines.length; se++){
			keyslist.push(options.searchengines[se]['Name']);
			valslist.push(options.searchengines[se]['url_before'] + '**Search**' + options.searchengines[se]['url_after']);
		}
		
		// Creates and appends the navigation tabs
		var genTab = new config_tab("General", "t_GenConf");
		var abtTab = new config_tab("License", "t_AbtConf", genTab);
		var imgTab = new config_tab("Images", "t_ImgConf", genTab);
		var vidTab = new config_tab("Videos", "t_VidConf", genTab);
		var mltTab = new config_tab("MultiSearch", "t_MltConf", genTab);
		var otrTab = new config_tab("Advanced", "t_OtrConf", genTab);
		
		abtTab.draw(tabHead);
		genTab.draw(tabHead);
		imgTab.draw(tabHead);
		vidTab.draw(tabHead);
		mltTab.draw(tabHead);
		otrTab.draw(tabHead);
		
		// About Us Section
		var fieldsabt = $create("div");
		fieldsabt.id = "AbtConf";
		fieldsabt.className = "removed";
		var nwp = $create("p");
		nwp.textContent = "Copyright (c) 2011 Andrew Hushbeck (KTaShes)\n\n" +

				"Permission is hereby granted, free of charge, to any person obtaining a copy " +
				"of this software and associated documentation files (the \"Software\"), to deal " +
				"in the Software without restriction, including without limitation the rights " +
				"to use, copy, modify, merge, publish, distribute, sublicense, and/or sell " +
				"copies of the Software, and to permit persons to whom the Software is " +
				"furnished to do so, subject to the following conditions:\n\n" +

				"The above copyright notice and this permission notice shall be included in " +
				"all copies or substantial portions of the Software.\n\n" +

				"THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR " +
				"IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, " +
				"FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE " +
				"AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER " +
				"LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, " +
				"OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN " +
				"THE SOFTWARE.\n\n" +
				
				"The source code for this script can always be found ";
		fieldsabt.appendChild(nwp);
		var linkToScript = $create("a");
		linkToScript.textContent = "here.";
		linkToScript.href = "http://userscripts.org/scripts/review/33449";
		nwp.appendChild(linkToScript);
		var sig = $create("p");
		sig.textContent = "ktash";
		fieldsabt.appendChild(sig);
		var abtver = $create("p");
		abtver.textContent = "Version : " + version;
		fieldsabt.appendChild(abtver);
		
		// Image Search Settings
		var img_set_window = new config_window(imgTab, "ImgConf");
			// Genearl Settings
		var img_section = new config_section("Sidebar Options");
		img_section.sectionOptions.push(new config_checkBox("Search For Images", "imgs", options.DEFAULT_IMGS));
		img_section.sectionOptions.push(new config_selectionBox("Open in", "imgPlyr", ["This Window", "Player", "Slideshow", "Slideshow (Paused)"], [false, true, "slideshow", "soot"], options.DEFAULT_IMGPLYR));
		img_section.sectionOptions.push(new config_checkBox("Show Control Bar", "imgCtrl", options.DEFAULT_IMGCTRL));
		img_section.sectionOptions.push(new config_intField("Number of images to load", "imgPages", options.DEFAULT_IMGPGS));
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
		vid_section.sectionOptions.push(new config_selectionBox("Search using", "vdsrchr", ["Google","Youtube"], ["google", "youtube"], options.DEFAULT_VDSRCHR));
		vid_set_window.sections.push(vid_section);
			// Embed Settings
		var emd_section = new config_section("Embed Options");
		emd_section.sectionOptions.push(new config_checkBox("Show Extra Controls", "vidCtrl", options.DEFAULT_VIDCTRL));
		emd_section.sectionOptions.push(new config_checkBox("Embed videos (when available)", "embd", options.DEFAULT_EMBD));
		emd_section.sectionOptions.push(new config_checkBox("Play in HD (when available)", "hdvd", options.DEFAULT_HDVD));
		emd_section.sectionOptions.push(new config_checkBox("Enable Fullscreen (when available)", "fsvd", options.DEFAULT_FSVD));
		emd_section.sectionOptions.push(new config_checkBox("Autoplay (when available)", "apvd", options.DEFAULT_APVD));
		emd_section.sectionOptions.push(new config_checkBox("Loop Videos (when available)", "lpvd", options.DEFAULT_LPVD));
		emd_section.sectionOptions.push(new config_checkBox("Closed Captions (when available)", "ccvd", options.DEFAULT_CCVD));
		emd_section.sectionOptions.push(new config_checkBox("Enable Privacy Mode (when available)", "pmvd", options.DEFAULT_PMVD));
		emd_section.sectionOptions.push(new config_checkBox("Youtube Annotations", "ivvd", options.DEFAULT_IVVD));
		vid_set_window.sections.push(emd_section);
		
		// Multisearch Settings
		var multi_set_window = new config_window(mltTab, "MltConf");
			// SearchEngines
		var mlt_section = new config_section("Search Engines");
		mlt_section.sectionOptions.push(new config_keyvalTable("Search Engines", "searchengines", keyslist, valslist, options.DEFAULT_SEARCHENGINES));
		multi_set_window.sections.push(mlt_section);
		
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
		gen_section.sectionOptions.push(new config_checkBox("Enable Google Instant (Requires Refresh)", "inst", options.DEFAULT_INST));
		gen_set_window.sections.push(gen_section);
			// Clutter
		var app_section = new config_section("Clutter");
		app_section.sectionOptions.push(new config_checkBox("Remove Suggestions", "sugges", options.DEFAULT_SUGGES));
		app_section.sectionOptions.push(new config_checkBox("Move \"Did you mean\" text", "dym", options.DEFAULT_DYM));
		app_section.sectionOptions.push(new config_checkBox("Move Top Content (Calculator, Showtimes, Etc.)", "moveTop", options.DEFAULT_MOVETOP));
		gen_set_window.sections.push(app_section);
			// Keyboard Shortcut list
		var kydv = $create('div', {
			textContent : 'Keyboard shortcuts:'
		});
		var kytbl = $create('table', { className : 'keycuts' } );
		var skeys = {
			'_O_ptions' : 'CTRL + SHIFT + O',
			'St_y_ler' : 'CTRL + SHIFT + Y',
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
		img_set_window.draw(wrapper);
		vid_set_window.draw(wrapper);
		multi_set_window.draw(wrapper);
		other_set_window.draw(wrapper);
		gen_set_window.draw(wrapper);
		
		// Push them to the windows array
		this.windows.push(img_set_window);
		this.windows.push(vid_set_window);
		this.windows.push(multi_set_window);
		this.windows.push(other_set_window);
		this.windows.push(gen_set_window);
		
		// Save and default buttons
		var SR = this;
		var savebtn = new button("Close", function () { SR.popup.undraw(); location.reload(); });
		var defbtn = new button("Defaults", function () { SR.setDefaults(); });
		savebtn.draw(btnwrap);
		defbtn.draw(btnwrap);
		
		// Appending of all the configurations
		centDivConf.appendChild(welcome);
		centDivConf.appendChild(selectHead);
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
