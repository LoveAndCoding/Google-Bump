/**	=================================================================
  *	Image Search
  *	=================================================================
  */

function indiv_img_result(src, link, title) {
	
	this.src = src;
	this.link = link;
	this.title = title;
	
	this.draw = function (parentNode) {
		var link = $create("a", {
			href : this.link,
			className : 'imgLink'
		});
		link.href = this.link;
		link.className = "imgLink";
		var img = $create("img", {
			src : this.src,
			alt : this.title,
			title : this.title
		});
		link.appendChild(img);
		parentNode.appendChild(link);
		
		var SR = this;
		link.addEventListener('click', function (e) { SR.clicked(e); }, false);
	};
	
	this.clicked = function (event) {
		event.stopPropagation();
		event.preventDefault();
		
		alert(this.title);
	};
	
	this.buildImage = function () {
		return $create("img", {
			src : this.src,
			alt : this.title,
			title : this.title
		});
	};
	
}

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
		this.slideBtn = new button('Play', function () { SR.startSlides(); });
		this.nextBtn = new button('>', function () { SR.next(); });
		
		this.prevBtn.draw(this.div);
		this.slideBtn.draw(this.div);
		this.nextBtn.draw(this.div);
		
		this.prevBtn.btn.disabled = true;
		this.slideBtn.btn.disabled = true;
		this.nextBtn.btn.disabled = true;
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
	
	this.clickImage = function () {
		
	};
	
	this.startSlides = function () {
		if (!this.slideshow.is_drawn()) {
			popupManager.closeAll();
			this.slideshow.draw();
		} else if (this.slideshow && this.slideshow.is_drawn()) {
			this.slideshow.undraw();
		}
	};
	
	this.buildSets = function () {
		for(var setCreator = 0; setCreator < this.imgs.length; setCreator++) {
			if(setCreator % 7 == 0) {
				this.sets.push(new img_set());
			}
			this.sets[Math.floor(setCreator / 7)].addImg(this.imgs[setCreator]);
		}
	};
	
	this.processPage = function (response) {
		var na;
		eval("na = new Array" + response.responseText.match(/dyn\.setResults\(\[\[[^]*]\);/)[0].substring(14));
		
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
			for(var nao = 0; nao < na[0].length; nao++) {
				var img = new indiv_img_result(na[0][nao][14] + "?q=tbn:" + na[0][nao][2] + na[0][nao][3], na[0][nao][3], na[0][nao][6]);
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
		get("http://images.google.com/images?q=" + this.query + "&gbv=2&start=" + (21 * this.pages), function (r) { SR.processPage(r) }, function (r) { SR.errorPage(r) });
		this.pages++;
	};
	
}

/**	=================================================================
  *	End Image Search
  *	=================================================================
  */