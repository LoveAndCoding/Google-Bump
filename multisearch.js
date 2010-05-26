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
			className : 'lsb',
			value : 'More Options',
			style : 'border-left: 1px solid #CCCCCC;'
		});
		
		theirButton.parentNode.appendChild(this.myButton);
		
		var SR = this;
		this.myButton.addEventListener('click', function (e) {
			SR.expandCollapse();
		}, false);
		
		this.wrapper = $create("div", {
			id : "allSearches"
		});
		
		this.multiwrapper = $create("div");
		this.multiwrapper.id = "expandedMulti";
		var tabhead1 = $create("h3");
		tabhead1.textContent = "Current Tab";
		tabhead1.className = "TabHead";
		var tabhead2 = $create("h3");
		tabhead2.textContent = "New Tab(s)";
		tabhead2.className = "TabHead";
		
		this.origOptionBox = new multisearchbox(null).getOptBox();
		
		this.multiwrapper.appendChild(tabhead1);
		this.multiwrapper.appendChild(this.origOptionBox);
		this.multiwrapper.appendChild(tabhead2);
		this.multiwrapper.appendChild($create("br"));
		
		this.newSearchWrapper = $create("div", {
			id : 'newSearchBoxes'
		});
		
		for (var nm = GM_getValue("numMulti", 2); nm > 0 ; nm--) {
			var msb = new multisearchbox(this);
			msb.draw(this.newSearchWrapper);
			this.boxes.push(msb);
		}
		
		this.multiwrapper.appendChild(this.newSearchWrapper);
		
		var adder = $create("div");
		adder.id = "adding";
		adder.textContent = "Add more...";
		this.multiwrapper.appendChild(adder);
		
		var srchAll = $create("button", {
			textContent : "Search All",
			id : "searchAll"
		});
		this.multiwrapper.appendChild(srchAll);
		
		var srchNew = $create("button", {
			textContent : "Search New",
			id : "searchNew"
		});
		this.multiwrapper.appendChild(srchNew);
		
		var fillOutAll = $create('button', {
			textContent : 'Set All from Original',
			id : 'setBoxes'
		});
		this.multiwrapper.appendChild(fillOutAll);
		
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
		
		$cl('tsf-p')[0].appendChild(this.wrapper);
		
	};
	
	this.addBox = function () {
		var msb = new multisearchbox(this);
		msb.draw(this.newSearchWrapper);
		this.boxes.push(msb);
		GM_setValue("numMulti", parseInt(GM_getValue("numMulti", 2)) + 1);
	};
	
	this.expandCollapse = function () {
		if (!this.expanded) {
			this.wrapper.appendChild(this.multiwrapper);
			this.myButton.value = "Less Options";
		} else {
			this.wrapper.removeChild(this.multiwrapper);
			this.myButton.value = "More Options";
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
		
		this.wrapping = $create("div", {
			className : "SBoxes"
		});
		
		this.wrapping.appendChild(this.getOptBox());
		
		this.srchBox = $create("input", {
			type : "text",
			className : "searchBoxes"
		});
		this.wrapping.appendChild(this.srchBox);
		
		this.removeBtn = $create("p", {
			className : "closeBtn",
			textContent : "X"
		});
		this.wrapping.appendChild(this.removeBtn);
		
		var SR = this;
		this.removeBtn.addEventListener("click", function () {
			SR.undraw();
			GM_setValue("numMulti", parseInt(GM_getValue("numMulti", 2)) - 1);
		}, false);
		
		parentNode.appendChild(this.wrapping);
	};
	
	this.undraw = function () {
		this.active = false;
		$remove(this.wrapping);
	};
	
	this.getOptBox = function () {
		if (!this.optionBox) {
			this.optionBox = $create("select", {
				className : "siteSelector"
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
			var code = new array();
			this.addCode(code);
			redirgo(code, true);
		}
	};
	
}

/**	=================================================================
  *	End Multisearch
  *	=================================================================
  */
