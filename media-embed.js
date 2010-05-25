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

function Image_Toolbar (img) {
	this.res = img;
	
	this.draw = function (parentNode) {
		
	};
}

function Video_Toolbar (vid) {
	this.res = vid;
	
	this.draw = function (parentNode) {
		
	};
}

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
			removeAllChildren(SR.player);
			SR.player.className = "rBox closed";
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
		this.labelArea.innerHTML = label;
		
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
