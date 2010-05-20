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
	
	this.setDefaults = function () {
		for (var wo = 0; wo < this.windows.length; wo++) {
			this.windows[wo].setDefaults();
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
		app_set_window.sections.push(new config_desc_section("Styles", "Styles can now be configured in the style menu. If keyboard shortcuts are enabled, you can use CTRL + SHIFT + Y to access, otherwise you can get to it the same way you access this menu."));
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
