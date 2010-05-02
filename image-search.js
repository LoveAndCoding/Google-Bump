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
	};
	
	this.clicked = function (event) {
	
	};
	
}

function img_set() {
	
	this.imgs = [];
	this.div;
	
	this.draw = function (parentNode) {
		var setdiv = $create("div", {
			className : 'aset'
		});
		for (var i = 0; i < this.imgs.length; i++) {
			this.imgs[i].draw(setdiv);
		}
		parentNode.append(setdiv);
	};
	
	this.undraw = function () {
		if(this.div) {
			$remove(this.div);
			this.div = null;
		}
	};
	
	this.addImg = function (src, link, title) {
		this.imgs.push(new indiv_img_result(src, link, title));
	};
}

function img_search() {
	
	this.imgs = [];
	this.setOn = 0;
	this.pages = 0;
	this.prevBtn;
	this.nextBtn;
	this.slideBtn;
	this.div;
	
	this.draw = function (parentNode) {
		
	};
	
	this.next = function () {
		
	};
	
	this.prev = function () {
		
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
				this.imgs.push(new indiv_img_result(na[0][nao][14] + "?q=tbn:" + na[0][nao][2] + na[0][nao][3], na[0][nao][3], na[0][nao][6]));
			}
			
			if(this.pages < options.imgPgs) {
				this.getPage();
			}
		}
		
	};
	
	this.errorPage = function (response) {
	
	};
	
	this.getPage = function () {
		var SR = this;
		get("http://images.google.com/images?q=" + theSearch + "&gbv=2&start=" + (21 * this.pages), SR.processPage, SR.errorPage);
		this.pages++;
	};
	
}

/**	=================================================================
  *	End Image Search
  *	=================================================================
  */