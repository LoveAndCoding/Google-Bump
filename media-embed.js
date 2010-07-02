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
			id : "hidePly"
		});
		hidePlayer.appendChild($create("img",{
			src : image_store.media_close,
			alt : "Close"
		}));
		var SR = this;
		hidePlayer.addEventListener("click", function (event) {
			SR.clearEmbed();
		}, false);
		this.player.appendChild(hidePlayer);
		
		parentNode.appendChild(this.player);
	};
	
	this.addImageEmbed = function (img) {
		this.imgRes = img;
		var title = img.title;
		var url = img.link;
		
		this.clearEmbed(title);
		
		if(options.imgCtrl) {
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
	
	this.addVideoEmbed = function (vid, embed) {
		this.vidRes = vid;
		this.clearEmbed(vid.name);
		
		if(options.vidCtrl) {
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
		
		icn = new Control_Icon(image_store.image_new_tab, "Open in New Tab", function () {
			GM_openInTab(SR.imgRes.link);
		});
		icn.draw(this.controlsArea);
		
		icn = new Control_Icon(image_store.image_slideshow, "Play Slideshow from here", function () {
			imgSearch.startSlides(SR.imgRes.locNum);
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
