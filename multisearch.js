/**	multisearcher
  *	Multisearch Object
  *	
  *	Functions
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
	
	// Images
	this.downArrow = "iVBORw0KGgoAAAANSUhEUgAAAA0AAAAICA" +
					"YAAAAiJnXPAAAAGXRFWHRTb2Z0d2FyZQBBZ" +
					"G9iZSBJbWFnZVJlYWR5ccllPAAAAOJJREFU" +
					"eNpiZGBg4AJiAwbiwQUWkAbZ9FnN%2F%2F%" +
					"2F8Yvr%2F6yfz%2F39%2FGP%2F%2F%2FcXE" +
					"8B8owwhEzGz%2FGJlY%2FjOysf9lZGH793h" +
					"mWi0jzCb57IWNPJq2lkBF3ECNDAz%2FgboY" +
					"GRmAGhiAhnz9cv3w8YdT4%2BtBNjH%2BB0o" +
					"yMjKCNSoXrWzg0nayZGLl5GGAWvXv9%2Fcv" +
					"367uO363L7wBpAGo%2FhsTyJEgBkgAJMH58" +
					"OhpfqYfX%2Fk5mBlANIiPrIEBqgGOoU61cu" +
					"%2Fccch79buvIBrEB4mjqEPmIGv06d15BJs" +
					"GrJqQNWLTAMIAAQYAJLynOOE%2FN%2BkAAA" +
					"AASUVORK5CYII%3D";
	this.upArrow = "iVBORw0KGgoAAAANSUhEUgAAAA0AAAAICAYA" +
					"AAAiJnXPAAAAGXRFWHRTb2Z0d2FyZQBBZG9" +
					"iZSBJbWFnZVJlYWR5ccllPAAAAOJJREFUeN" +
					"pi%2BP%2F%2FPwM6BgIuILYC0VjlcWmQCG0" +
					"4hksjdg1hjUdVG%2FZ%2FBdHYNDJCFTMwMj" +
					"KCNBhIx%2FZ08GjZGTOxcXH9%2B%2FXt25d" +
					"rh84%2BXVxSAZS7AFT7DawWrBOqQTZ1eguv" +
					"tqMZEwcvN1AQ5AyGfz8%2Bf%2F18df%2Bpx" +
					"7Mza2AaGaFOMpDPWdjIq%2B9mwczOy8PExM" +
					"gAkgC54d%2B%2F%2Fwx%2Ff37%2B8vnirhM" +
					"Pp8TXgzSC5KxUilc2sDEzM7KzMjNxADErCx" +
					"MjM9D6v0Bjf%2F%2F59%2F%2FH77%2F%2Ff" +
					"gLxr79%2F%2F9%2FpDW%2BA28RAPLgAEGAA" +
					"Y5%2Bk2Ib1C%2BEAAAAASUVORK5CYII%3D";
	
	this.draw = function () {
		this.wrapper = $create("div", {
			id : "allSearches"
		});
		
		var fullorig = findrightnode(this.original, "ts");
		
		var topHat = $('sff');
		var newHolder = $create("div", {
			id : "otherSearchContent"
		});
		for (var ci = 0; ci < topHat.childNodes.length;) {
			newHolder.appendChild(topHat.childNodes[ci]);
		}
		topHat.appendChild(newHolder);
		
		topHat.insertBefore(this.wrapper, topHat.childNodes[0]);
		this.wrapper.appendChild(fullorig);
		fullorig.id = "currentSearch";
		
		var expand = $create("img", {
			src : 'data:image/png;base64,' + this.downArrow,
			id : 'expand',
			alt : 'expand'
		});
		this.wrapper.appendChild(expand);
		
		this.multiwrapper = $create("div");
		this.multiwrapper.id = "expandedMulti";
		var tabhead1 = $create("h3");
		tabhead1.textContent = "Current Tab";
		tabhead1.className = "TabHead";
		var tabhead2 = $create("h3");
		tabhead2.textContent = "New Tab(s)";
		tabhead2.className = "TabHead";
		
		this.multiwrapper.appendChild(tabhead1);
		this.multiwrapper.appendChild(new multisearchbox(null).optionList("Orig"));
		this.multiwrapper.appendChild($create("hr"));
		this.multiwrapper.appendChild(tabhead2);
		this.multiwrapper.appendChild($create("br"));
		
		this.newSearchWrapper = $create("div", {
			id : 'newSearchBoxes'
		});
		
		for (var nm = GM_getValue("numMulti",2); nm > 0 ; nm--) {
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
		
		var SR = this;
		adder.addEventListener("click", function (event) {
			// var newl = $cl("SBoxes").length;
			// GM_setValue("numMulti",newl + 1);
			// newSB(newl, multi);
			// multi.removeChild(adder);
			// multi.removeChild(srchAll);
			// multi.removeChild(srchNew);
			// multi.appendChild(adder);
			// multi.appendChild(srchAll);
			// multi.appendChild(srchNew);
			SR.addBox();
		}, false);
		
		expand.addEventListener("click", function (event) {
			SR.expandCollapse();
		}, false);
		
		$("tsf").addEventListener("submit", function (event) {
			if (SR.expanded) {
				event.stopPropagation();
				event.preventDefault();
				var siteto = $("searchListOrig").value;
				var srchval;
				var inputs = $tag("input");
				for (var i = 0; i < inputs.length; i++) {
					if(inputs[i].name == "q") {
						srchval = inputs[i].value;
						break;
					}
				}
				redirgo([siteto, srchval], false);
			}
		}, false);
		
		srchAll.addEventListener("click", function (event) {
			event.stopPropagation();
			event.preventDefault();
			var curtabThis;
			var inputs = $tag("input");
			for (var i = 0; i < inputs.length; i++) {
				if(inputs[i].name == "q") {
					curtabThis = inputs[i].value;
					break;
				}
			}
			var tablist = [];
			for (i = $cl("SBoxes").length - 1; i >= 0; i--) {
				tablist.push($("searchList" + i).value);
				tablist.push($("searchText" + i).value);
			}
			tablist.push($("searchListOrig").value);
			tablist.push(curtabThis);
			redirgo(tablist, false);
		}, false);
		
		srchNew.addEventListener("click", function (event) {
			event.stopPropagation();
			event.preventDefault();
			var tablist = [];
			for (i = $cl("SBoxes").length - 1; i >= 0; i--) {
				tablist.push($("searchList" + i).value);
				tablist.push($("searchText" + i).value);
			}
			redirgo(tablist, true);
		}, false);
		
		fillOutAll.addEventListener("click", function (event) {
			event.stopPropagation();
			event.preventDefault();
			var sbs = $cl('searchBoxes');
			for (sb in sbs) {
				sbs[sb].value = queryBox.value;
			}
		}, false);
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
		} else {
			this.wrapper.removeChild(this.multiwrapper);
		}
		$('expand').src = "data:image/png;base64," + (this.expanded ? this.downArrow : this.upArrow);
		this.expanded = !this.expanded;
	};
	
	this.searchAll = function () {
		
	};
	
	this.searchNew = function () {
		
	};
	
	this.getAllVals = function () {
		var newVals = this.getNewVals();
		
	};
	
	this.getNewVals = function () {
		var tablist = new array();
		for (i = this.boxes.length - 1; i >= 0; i--) {
			this.boxes[i].addCode(tablist);
		}
		return tablist;
	};
	
}

/**	multisearchbox
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
	this.closeImg = "";
	this.undoImg = "";
	
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
		
		//this.wrapping.appendChild($create("br"));
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
		this.srchBox = value;
		// TODO: Setup undo ability
	};
	
	this.search = function () {
		if (this.active) {
			var code = new array();
			this.addCode(code);
			redirgo(code, true);
		}
	};
	
	this.optionList = function (id) {
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
}