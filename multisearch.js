/**	=================================================================
  *	Multisearch
  *	=================================================================
  */

/**	multisearcher
  *	Multisearch Object
  *	
  *	Functions
  *		draw
  *			Draw the multisearch option
  *	
  *		addBox
  *			Add a new search box
  *	
  *		expandCollapse
  *			Expand or collapse the multisearch boxes
  *	
  *		searchAll
  *			Search all boxes
  *	
  *		searchNew
  *			Search only added boxes
  *	
  *		getAllVals
  *			<= Return Array => Get an array of all the values and their search location
  *	
  *		getNewVals
  *			<= Return Array => Get an array of only the new boxes values and their search location
  *	
  */
function multisearcher() {
	
	this.original = document.evaluate('//input[@name="q"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	this.boxes = [];
	this.expanded = false;
	this.wrapper;
	this.multiwrapper;
	this.newSearchWrapper;
	this.origOptionBox;
	
	this.draw = function () {
		
		var theirButton = $cl('lsb')[0];
		this.myButton = $create('input', {
			type : 'button',
			className : 'lsb multiExp',
			value : 'More Options',
		});
		
		this.origOptionBox = new multisearchbox(null).getOptBox();
		this.origOptionBox.className += " removed";
		
		theirButton.parentNode.insertBefore(this.origOptionBox, theirButton);
		theirButton.parentNode.appendChild(this.myButton);
		
		this.newSearchWrapper = $cl("lst-td")[0].parentNode.parentNode;
		
		var SR = this;
		this.myButton.addEventListener('click', function (e) {
			SR.expandCollapse();
		}, false);
		
		this.wrapper = $create("tr", {
			id : "allSearches"
		});
		// this.wrapper = this.newSearchWrapper;
		
		this.multiwrapper = $create("td", {
			id : "expandedMulti",
			colSpan : 2
		});
		
		for (var nm = GM_getValue("numMulti", 2); nm > 0 ; nm--) {
			var msb = new multisearchbox(this);
			msb.draw(this.newSearchWrapper);
			msb.hide();
			this.boxes.push(msb);
		}
		
		var rs1 = $create('div', {
			className : 'ds'
		});
		var rs2 = $create('div', {
			className : 'lsbb'
		});
		
		var adder = $create("button", {
			textContent : "Add More",
			className : "lsb multiBtn"
		});
		rs2.appendChild(adder);
		
		var srchAll = $create("button", {
			textContent : "Search All",
			className : "lsb multiBtn"
		});
		rs2.appendChild(srchAll);
		
		var srchNew = $create("button", {
			textContent : "Search New",
			className : "lsb multiBtn"
		});
		rs2.appendChild(srchNew);
		
		var fillOutAll = $create('button', {
			textContent : 'Fill All',
			className : "lsb multiBtn"
		});
		rs2.appendChild(fillOutAll);
		rs1.appendChild(rs2);
		this.multiwrapper.appendChild(rs1);
		
		adder.addEventListener("click", function (event) {
			SR.addBox();
		}, false);
		
		$("tsf").addEventListener("submit", function (event) {
			if (SR.expanded) {
				event.stopPropagation();
				event.preventDefault();
				redirgo([this.origOptionBox.value, $cl('lst')[0].value], false);
			}
		}, false);
		
		srchAll.addEventListener("click", function (event) {
			event.stopPropagation();
			event.preventDefault();
			SR.searchAll();
		}, false);
		
		srchNew.addEventListener("click", function (event) {
			event.stopPropagation();
			event.preventDefault();
			SR.searchNew();
		}, false);
		
		fillOutAll.addEventListener("click", function (event) {
			event.stopPropagation();
			event.preventDefault();
			var sbs = SR.boxes;
			var val = $cl('lst')[0].value;
			for (sb in sbs) {
				sbs[sb].setValue(val);
			}
		}, false);
		
		this.newSearchWrapper.appendChild(this.wrapper);
		
	};
	
	this.addBox = function () {
		var msb = new multisearchbox(this);
		msb.draw(this.newSearchWrapper);
		this.boxes.push(msb);
		GM_setValue("numMulti", parseInt(GM_getValue("numMulti", 2)) + 1);
		this.newSearchWrapper.appendChild(this.wrapper);
	};
	
	this.expandCollapse = function () {
		if (!this.expanded) {
			this.wrapper.appendChild(this.multiwrapper);
			this.myButton.value = "Less Options";
			this.origOptionBox.className = this.origOptionBox.className.replace(" removed", "");
			for (var b = 0; b < this.boxes.length; b++) {
				this.boxes[b].reveal();
			}
		} else {
			this.wrapper.removeChild(this.multiwrapper);
			this.myButton.value = "More Options";
			this.origOptionBox.className += " removed";
			for (var b = 0; b < this.boxes.length; b++) {
				this.boxes[b].hide();
			}
		}
		this.expanded = !this.expanded;
	};
	
	this.searchAll = function () {
		var tablist = this.getAllVals();
		redirgo(tablist, false);
	};
	
	this.searchNew = function () {
		var tablist = this.getNewVals();
		redirgo(tablist, true);
	};
	
	this.getAllVals = function () {
		var newVals = this.getNewVals();
		return newVals.concat([this.origOptionBox.value, $cl('lst')[0].value]);
	};
	
	this.getNewVals = function () {
		var tablist = [];
		for (var i = 0, len = this.boxes.length; i < len; i++) {
			this.boxes[i].addCode(tablist);
		}
		return tablist;
	};
	
}

/**	multisearchbox
  *	Multisearch Box Object
  *	
  *	Construction Parameters
  *		parentObj		The multisearch object that it was created from
  *	
  *	Functions
  *		draw
  *			Draw the multisearch box
  *	
  *		undraw
  *			Undraw the multisearch box
  *	
  *		getOptBox
  *			<= Return HTML Object => Returns select box with the options
  *	
  *		addCode
  *			Add the code for this box to the given array for multisearching
  *	
  *		setValue
  *			Set the value for the box
  *	
  *		search
  *			If it is active, search for it
  *	
  */
function multisearchbox (parentObj) {
	
	this.parentObj = parentObj;
	this.wrapping;
	this.srchBox;
	this.srchBtn;
	this.fillBtn;
	this.removeBtn;
	this.optionBox;
	this.goBtn;
	this.undoBtn;
	this.active = false;
	
	// quote|howto|defin|anidb|imdb|gamefaq|diggs|utube|wikipda|googl|flckr|cnns|opnsrc|eby|espns
	this.valList = ["quote", "howto", "defin", "anidb", "imdb", "gamefaq", "diggs", "utube", "wikipda", "flckr", "cnns", "opnsrc", "eby", "espns", "googl"];
	this.showList = ["WikiQuote", "Wiki How to", "Wiktionary", "AnimeDB", "IMDB", "GameFAQs", "Digg", "Youtube", "Wikipedia", "Flickr", "CNN", "Source Forge", "Ebay", "ESPN", "Google"];
		
	this.draw = function (parentNode) {
		this.active = true;
		
		this.wrapping = $create("tr", {
			className : "SBoxes"
		});
		
		var sbTd = $create("td", {
			className : "lst-td fullWidthTD"
		});
		
		var btnTd = $create("td");
		
		this.wrapping.appendChild(sbTd);
		this.wrapping.appendChild(btnTd);
		
		var ruse = $create('div', {
			style : 'position: relative'
		});
		this.srchBox = $create("input", {
			type : "text",
			className : "lst searchBoxes"
		});
		ruse.appendChild(this.srchBox);
		sbTd.appendChild(ruse);
		
		var wrp = $create('div', {
			className : 'ds'
		});
		ruse = $create('div', {
			className : 'lsbb'
		});
		
		this.srchBtn = $create('input', {
			type : 'button',
			className : 'lsb',
			value : 'Search',
		});
		this.fillBtn = $create('input', {
			type : 'button',
			className : 'lsb multiExp',
			value : 'Fill',
		});
		this.removeBtn = $create('input', {
			type : 'button',
			className : 'lsb multiExp',
			value : 'Remove',
		});
		
		ruse.appendChild(this.getOptBox());
		ruse.appendChild(this.srchBtn);
		ruse.appendChild(this.fillBtn);
		ruse.appendChild(this.removeBtn);
		wrp.appendChild(ruse);
		btnTd.appendChild(wrp);
		
		var SR = this;
		this.removeBtn.addEventListener("click", function () {
			SR.undraw();
			GM_setValue("numMulti", parseInt(GM_getValue("numMulti", 2)) - 1);
		}, false);
		
		this.fillBtn.addEventListener("click", function () {
			SR.setValue(SR.parentObj.original.value);
		}, false);
		
		this.srchBtn.addEventListener("click", function () {
			SR.search();
		}, false);
		
		parentNode.appendChild(this.wrapping);
	};
	
	this.undraw = function () {
		this.active = false;
		$remove(this.wrapping);
	};
	
	this.reveal = function () {
		this.wrapping.className = "SBoxes";
	};
	
	this.hide = function () {
		this.wrapping.className = "removed";
	};
	
	this.getOptBox = function () {
		if (!this.optionBox) {
			this.optionBox = $create("select", {
				className : "siteSelector lsb"
			});
			for (var i = this.showList.length - 1; i >= 0;i--) {
				var opt = $create("option", {
					value : this.valList[i],
					textContent : this.showList[i]
				});
				this.optionBox.appendChild(opt);
			}
		}
		return this.optionBox;
	};
	
	this.addCode = function (arr) {
		if (this.active) {
			arr.push(this.optionBox.value);
			arr.push(this.srchBox.value);
		}
	};
	
	this.setValue = function (value) {
		this.srchBox.value = value;
		// TODO: Setup undo ability
	};
	
	this.search = function () {
		if (this.active) {
			var code = [];
			this.addCode(code);
			redirgo(code, true);
		}
	};
	
}

/**	=================================================================
  *	End Multisearch
  *	=================================================================
  */
