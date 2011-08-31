/**
  *	Import Dependencies
  *	
  *	@depends ../search/media-embed.js
  *	@depends stylesheet-store.js
  */
  // Start Display Functions ---------------------------------------------------------
// Restyles the page
function restylePage() {
	logoToTrans();
	
	allStyles();
}
// Adds all the styles for the page.
function allStyles () {
	var maxwidth = window.innerWidth - 50;
	var maxheight = window.innerHeight - 100;
	
	if(document.getElementsByClassName("g")[0]) {
		var lists = document.getElementsByClassName("g")[0].parentNode;
		lists.id = "resOL";
		dockShow = lists;
	}
	
	GM_addStyle(ssStore.gen_stylesheet);
	
	GM_addStyle(ssStore.multisearch_stylesheet);
	
	GM_addStyle(ssStore.clrpicker_stylesheet);
	
	if (options.styl == "media" && (options.imgs || options.vids) && false) {
		GM_addStyle(ssStore.media_stylesheet);
		$("resOL").parentNode.className = "resBox";
		$("resOL").parentNode.appendChild($("nav"));
		
	} else if (options.styl == "dock" && false) {
		GM_addStyle(ssStore.dock_stylesheet);
		
		var dock = $create("div", {
			id : 'dock'
		});
		
		var icon = $create("div", {
			className : "dockLink"
		});
		var alink = $create("a", {
			href : "#ssb",
			id : "searchDock"
		});
		
		if (options.docknavstl == 'icon' || options.docknavstl == 'both') {
			alink.appendChild($create('img', {
				src : image_store.dock_web_icon,
				alt : 'Web'
			}));
		}
		if(options.docknavstl == 'text' || options.docknavstl == 'both') {
			alink.innerHTML += "Web";
		}
		
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
				className : "removed"
			});
			
			if (options.docknavstl == 'icon' || options.docknavstl == 'both') {
				alink.appendChild($create('img', {
					src : image_store.dock_wiki_icon,
					alt : 'Wikipedia'
				}));
			}
			if(options.docknavstl == 'text' || options.docknavstl == 'both') {
				alink.innerHTML += "Wiki";
			}
			
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
				className : "removed"
			});
			
			if (options.docknavstl == 'icon' || options.docknavstl == 'both') {
				alink.appendChild($create('img', {
					src : image_store.dock_video_icon,
					alt : 'Videos'
				}));
			}
			if(options.docknavstl == 'text' || options.docknavstl == 'both') {
				alink.innerHTML += "Video";
			}
			
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
				className : "removed"
			});
			
			if (options.docknavstl == 'icon' || options.docknavstl == 'both') {
				alink.appendChild($create('img', {
					src : image_store.dock_image_icon,
					alt : 'Images'
				}));
			}
			if(options.docknavstl == 'text' || options.docknavstl == 'both') {
				alink.innerHTML += "Image";
			}
			
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
		
		$('center_col').parentNode.insertBefore(dock, $('center_col'));
	} else if (options.styl == "center") {
		GM_addStyle(ssStore.center_stylesheet);
	} else {
		GM_addStyle(ssStore.classic_stylesheet);
	}
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
// Creates a player div used by both the video and image searchs
function makePlayer() {
	embedder = new Media_Embed();
	embedder.draw($('mBox'));
}
// Change the icon sheet from Google to be transparent
function iconSheetTrans() {
	var img = new Image();
	img.src = unsafeWindow.getComputedStyle($cl('csb')[0], null).backgroundImage.replace(/^url\("/,'').replace(/"\)$/,'');
	try {
		var canvas = $create('canvas', {
			id : 'transLogo',
			width: img.width,
			height: img.height
		});
		var ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0,img.width,img.height);
		
		var imgd = ctx.getImageData(0, 0,img.width,img.height);
		var pix = imgd.data;
		for (var i = 0, n = pix.length; i < n; i += 4) {
			if(pix[i+3] != 0 && (Math.abs(pix[i] - pix[i+1]) < 75 && Math.abs(pix[i+1] - pix[i+2]) < 75) ) {
				pix[i+3] = Math.sqrt(255) * Math.sqrt(255 - Math.min(pix[i],Math.min(pix[i+1],pix[i+2])));
			}
		}
		ctx.putImageData(imgd, 0, 0);
		
		return canvas.toDataURL("image/png");
	} catch (_ex) {
		return img.src;
	}
}
	// End Display Functions -----------------------------------------------------------
