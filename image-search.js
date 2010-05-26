/**	=================================================================
  *	Image Search
  *	=================================================================
  */

/**	Image_Search
  *	Image Search Object
  *	
  *	Construction Parameters
  *		src			The src for the image
  *		link		The link to the image
  *		title		The title of the image
  *		sizeInfo	Information string on the size
  *		type		Type of the image
  *		num			The number of the image in the results
  *	
  *	Functions
  *		draw
  *			Draw the image
  *	
  *		clicked
  *			Handles actions if an image is clicked
  *	
  *		buildImage
  *			<= Return Image => Builds the image HTML Ojbect for the given settings
  *	
  */
function indiv_img_result(src, link, title, sizeInfo, type, num) {
	
	this.src = src;
	this.link = decodeURI(link);
	this.title = title;
	this.locNum = num;
	this.size = sizeInfo;
	this.frmt = type;
	
	this.draw = function (parentNode) {
		var link = $create("a", {
			href : this.link,
			className : 'imgLink'
		});
		if(options.imgSize == "title") {
			
			link.innerHTML = this.title;
			link.className += " titleOnly";
			
		} else if(options.imgSize == "details") {
			
			if(options.styl == 'dock') {
				var img = $create("img", {
					src : this.src,
					alt : this.title,
					title : this.title,
					className : 'imgSizemedium'
				});
				link.appendChild(img);
			} else {
				link.innerHTML = this.title;
			}
			link.className += " imgDetails";
			var info = $create("span", {
				innerHTML : this.size + ' ' + this.frmt,
				className : 'detailedImgInfo'
			});
			link.appendChild(info);
			
		} else {
			
			var img = $create("img", {
				src : this.src,
				alt : this.title,
				title : this.title,
				className : 'imgSize' + options.imgSize
			});
			link.appendChild(img);
			
		}
		parentNode.appendChild(link);
		
		var SR = this;
		link.addEventListener('click', function (e) { SR.clicked(e); }, false);
	};
	
	this.clicked = function (event) {
		if(options.imgPlyr) {
			if(event) {
				event.stopPropagation();
				event.preventDefault();
			}
			
			embedder.addImageEmbed(this, true);
		}
	};
	
	this.buildImage = function () {
		return $create("img", {
			src : this.src,
			alt : this.title,
			title : this.title
		});
	};
	
}

/**	img_set
  *	Image Set Object
  *	
  *	Functions
  *		draw
  *			Draw the set
  *	
  *		undraw
  *			Undraw the set
  *	
  *		addImg
  *			Add an image to the set
  *	
  */
function img_set() {
	
	this.imgs = [];
	this.div;
	
	this.draw = function (parentNode) {
		if(!this.div) {
			this.div = $create("div", {
				className : 'aset'
			});
			for (var i = 0; i < this.imgs.length; i++) {
				this.imgs[i].draw(this.div);
			}
		}
		parentNode.appendChild(this.div);
	};
	
	this.undraw = function () {
		if(this.div) {
			$remove(this.div);
		}
	};
	
	this.addImg = function (img) {
		this.imgs.push(img);
	};
}

/**	Image_Search
  *	Image Search Object
  *	
  *	Construction Parameters
  *		query		The search query
  *	
  *	Functions
  *		draw
  *			Draw and perform intiate search
  *	
  *		next
  *			Show the next set
  *	
  *		prev
  *			Show the previous set
  *	
  *		clickImage
  *			Simulate clicking on an image
  *	
  *		startSlides
  *			Start the slideshow
  *	
  *		buildSets
  *			Build the sets of images
  *	
  *		processPage
  *			Add the images from a given page
  *	
  *		errorPage
  *			Handles error pages (dummy function at the moment)
  *	
  *		search
  *			Perform a search
  *	
  */
function Image_Search(query) {
	
	this.query = query;
	this.imgs = [];
	this.sets = [];
	this.setOn = 0;
	this.pages = 0;
	this.prevBtn;
	this.nextBtn;
	this.slideBtn;
	this.slideshow = popupManager.newSlideShow();
	this.div;
	
	this.draw = function (parentNode) {
		
		this.div = $create('div', {
			'id' : 'imageList',
			'className' : 'rBox'
		});
		
		var SR = this;
		this.prevBtn = new button('<', function () { SR.prev(); });
		this.prevBtn.draw(this.div);
		this.prevBtn.btn.disabled = true;
		
		if(options.sldshw) {
			this.slideBtn = new button('Play', function () { SR.startSlides(); this.btn.blur(); });
			this.slideBtn.draw(this.div);
			this.slideBtn.btn.disabled = true;
		}
		
		this.nextBtn = new button('>', function () { SR.next(); });
		this.nextBtn.draw(this.div);
		this.nextBtn.btn.disabled = true;
		
		if(options.styl == 'dock') {
			this.nextBtn.undraw();
			this.prevBtn.undraw();
		}
		
		parentNode.appendChild(this.div);
		
		this.search();
	};
	
	this.next = function () {
		if(this.setOn < this.sets.length - 1) {
			if(this.setOn == 0) {
				this.prevBtn.btn.disabled = false;
			}
			
			this.sets[this.setOn].undraw();
			this.sets[++this.setOn].draw(this.div);
			
			if (this.setOn == this.sets.length - 1) {
				this.nextBtn.btn.disabled = true;
			}
		}
	};
	
	this.prev = function () {
		if(this.setOn > 0) {
			if(this.setOn == this.sets.length - 1) {
				this.nextBtn.btn.disabled = false;
			}
			
			this.sets[this.setOn].undraw();
			this.sets[--this.setOn].draw(this.div);
			
			if (this.setOn == 0) {
				this.prevBtn.btn.disabled = true;
			}
		}
	};
	
	this.clickImage = function (indx) {
		if(indx < 0) {
			indx = this.imgs.length - 1;
		} else if (indx >= this.imgs.length) {
			indx = 0;
		}
		this.imgs[indx].clicked();
	};
	
	this.startSlides = function (startOn) {
		if (!this.slideshow.is_drawn()) {
			popupManager.closeAll();
			this.slideshow.draw(startOn);
		} else if (this.slideshow && this.slideshow.is_drawn()) {
			this.slideshow.undraw();
		}
	};
	
	this.buildSets = function () {
		var perSet;
		if (options.imgSize == 'large') {
			perSet = 7;
		} else if (options.imgSize == 'medium') {
			perSet = 14;
		} else if (options.imgSize == 'small') {
			perSet = 28;
		} else if (options.imgSize == 'title') {
			perSet = 21;
		} else { // Details
			perSet = 14;
		}
		for(var setCreator = 0; setCreator < this.imgs.length; setCreator++) {
			if((setCreator % perSet == 0 && options.styl != 'dock') || setCreator == 0) {
				this.sets.push(new img_set());
			}
			var dockWorker = options.styl == 'dock' ? 0 : Math.floor(setCreator / perSet);
			this.sets[dockWorker].addImg(this.imgs[setCreator]);
		}
	};
	
	this.processPage = function (response) {
		var na;
		eval("na = " + response.responseText.match(/dyn\.setResults\(\[\[[^]*]\);/)[0].substring(14));
		
		/*
			var link = $create("a");
			link.href = na[0][i][3];
			link.className = "imgLink";
			
			var img = $create("img");
			img.src = na[0][i][14] + "?q=tbn:" + na[0][i][2] + na[0][i][3];
			img.alt = na[0][i][6];
			img.title = na[0][i][6];
		*/
		
		if(na[0]) {
			for(var nao = 0; nao < na.length; nao++) {
				var img = new indiv_img_result(na[nao][14] + "?q=tbn:" + na[nao][2] + na[nao][3], na[nao][3], na[nao][6], na[nao][9], na[nao][10], this.imgs.length);
				this.imgs.push(img);
				this.slideshow.dialog.add_image(img);
			}
			
			if(this.pages < options.imgPgs) {
				this.search();
			} else {
				this.buildSets();
				this.sets[0].draw(this.div);
				this.slideBtn.btn.disabled = false;
				
				if(this.sets.length > 1) {
					this.nextBtn.btn.disabled = false;
				}
			}
		}
		
	};
	
	this.errorPage = function (response) {
		
	};
	
	this.search = function () {
		var SR = this;
		get("http://images.google.com/images?q=" + encodeURIComponent(this.query) + "&gbv=2&start=" + (21 * this.pages), function (r) { SR.processPage(r) }, function (r) { SR.errorPage(r) });
		this.pages++;
	};
	
}

/**	=================================================================
  *	End Image Search
  *	=================================================================
  */
