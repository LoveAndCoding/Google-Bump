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
			className : 'gbump_btn',
			value : 'More Options',
			title : 'More Options',
			id : 'gbump_moreOptsBtn'
		});
		
		this.origOptionBox = new multisearchbox(null).getOptBox();
		this.origOptionBox.className += " removed";
		
		theirButton.parentNode.parentNode.insertBefore(this.origOptionBox, theirButton.parentNode);
		theirButton.parentNode.parentNode.appendChild(this.myButton);
		
		this.newSearchWrapper = findrightnode($cl("lst-td")[0], "sftab").parentNode.parentNode || $cl("lst-td")[0].parentNode.parentNode.parentNode;
		
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
			var msb = new multisearchbox(this, (this.boxes.length + 1) % options.searchengines.length);
			msb.draw(this.newSearchWrapper);
			msb.hide();
			this.boxes.push(msb);
		}
		
		var rs1 = $create('div', {
			className : ''
		});
		
		var adder = $create("button", {
			textContent : "Add More",
			className : "gbump_btn gbump_multiBtn"
		});
		rs1.appendChild(adder);
		
		var srchAll = $create("button", {
			textContent : "Search All",
			className : "gbump_btn gbump_multiBtn"
		});
		rs1.appendChild(srchAll);
		
		var srchNew = $create("button", {
			textContent : "Search New",
			className : "gbump_btn gbump_multiBtn"
		});
		rs1.appendChild(srchNew);
		
		var fillOutAll = $create('button', {
			textContent : 'Fill All',
			className : "gbump_btn gbump_multiBtn"
		});
		rs1.appendChild(fillOutAll);
		this.multiwrapper.appendChild(rs1);
		
		adder.addEventListener("click", function (event) {
			event.stopPropagation();
			event.preventDefault();
			SR.addBox();
		}, false);
		
		theirButton.parentNode.addEventListener("click", function (event) {
			if (SR.expanded) {
				event.stopPropagation();
				event.preventDefault();
				redirgo([SR.origOptionBox.value, $('lst-ib').value], false);
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
			var val = $('lst-ib').value;
			for (sb in sbs) {
				sbs[sb].setValue(val);
			}
		}, false);
		
		this.newSearchWrapper.appendChild(this.wrapper);
		
	};
	
	this.addBox = function () {
		var msb = new multisearchbox(this, (this.boxes.length + 1) % options.searchengines.length);
		msb.draw(this.newSearchWrapper);
		this.boxes.push(msb);
		GM_setValue("numMulti", parseInt(GM_getValue("numMulti", 2)) + 1);
		this.newSearchWrapper.appendChild(this.wrapper);
		this.recalcHeight();
	};
	
	this.expandCollapse = function () {
		if (!this.expanded) {
			this.wrapper.appendChild(this.multiwrapper);
			this.myButton.value = "Less Options";
			this.myButton.title = "Less Options";
			this.myButton.classList.add("opened");
			this.origOptionBox.className = this.origOptionBox.className.replace(" removed", "");
			for (var b = 0; b < this.boxes.length; b++) {
				this.boxes[b].reveal();
			}
		} else {
			this.wrapper.removeChild(this.multiwrapper);
			this.myButton.value = "More Options";
			this.myButton.title = "More Options";
			this.myButton.classList.remove("opened");
			this.origOptionBox.className += " removed";
			for (var b = 0; b < this.boxes.length; b++) {
				this.boxes[b].hide();
			}
		}
		this.expanded = !this.expanded;
		this.recalcHeight();
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
	
	this.recalcHeight = function () {
		var addHeight = 0;
		if (this.expanded) {
			addHeight = (this.boxes.length * 40) + 35;
		}
		GM_addStyle(".sfbgg { padding-top: "+addHeight+"px; } \
						#mBox, #newVer { top: "+ (101+addHeight) +"px; } \
						#subform_ctrl, .ksfccl { margin-top: "+ addHeight +"px !important; } ");
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
function multisearchbox (parentObj, listNum) {
	
	this.parentObj = parentObj;
	this.listNum = listNum;
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
			className : "gbump_multiSearchBar"
		});
		
		var sbTd = $create("td", {
			className : "fullWidthTD"
		});
		
		var btnTd = $create("td");
		
		this.wrapping.appendChild(sbTd);
		this.wrapping.appendChild(btnTd);
		
		var ruse = $create('div', {
			style : 'position: relative'
		});
		this.srchBox = $create("input", {
			type : "text",
			className : "gbump_searchBoxes"
		});
		this.fillBtn = $create('input', {
			type : 'button',
			className : 'gbump_multiExp gbump_multiFill',
			value : 'Fill'
		});
		this.clearBtn = $create('input', {
			type : 'button',
			className : 'gbump_multiExp gbump_multiClear',
			value : 'X'
		});
		ruse.appendChild(this.srchBox);
		ruse.appendChild(this.fillBtn);
		ruse.appendChild(this.clearBtn);
		sbTd.appendChild(ruse);
		
		var wrp = $create('div', {
			className : 'gbump_msBar'
		});
		ruse = $create('div', {
			className : 'gbmp'
		});
		
		this.srchBtn = $create('input', {
			type : 'button',
			className : 'gbump_multiSrchBtn',
			value : 'Search',
		});
		this.removeBtn = $create('input', {
			type : 'button',
			className : 'gbump_btn gbump_multiRemove',
			value : 'X'
		});
		
		ruse.appendChild(this.getOptBox(this.listNum));
		ruse.appendChild(this.srchBtn);
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
		this.clearBtn.addEventListener("click", function () {
			SR.setValue('');
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
		this.wrapping.className = "gbump_multiSearchBar";
	};
	
	this.hide = function () {
		this.wrapping.className = "removed";
	};
	
	this.getOptBox = function (_show) {
		if (!this.optionBox) {
			this.optionBox = $create("select", {
				className : "gbump_siteSelector"
			});
			for (var i = 0; i < options.searchengines.length; i++) {
				var opt = $create("option", {
					value : i,
					textContent : options.searchengines[i].Name
				});
				if ((_show && _show == i) || (!_show && i == 0)) {
					opt.selected = true;
				}
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
