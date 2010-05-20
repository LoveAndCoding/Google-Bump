/**
  *	Import Dependencies
  *	
  *	@depends multisearch.js
  */
	// Start Text / Input Based Functions ------------------------------------------

// Script for the auto redirection
function redirgo(theList, tablast) {
	if (theList.length < 2) {
		return "";
	} else {
		var putintabs = (theList.length !== 2);
		for (var x = 0; x < theList.length; x += 2) {
			if (x == theList.length - 2) {
				putintabs = false || tablast;
			}	
			if (theList[x] == "quote") {
				linkit("http://en.wikiquote.org/wiki/Special:Search?go=Go&search=" + theList[x + 1], putintabs, false);
			} else if (theList[x] == "howto") {
				linkit("http://www.wikihow.com/Special:LSearch?fulltext=Search&search=" + theList[x + 1], putintabs, false);
			} else if (theList[x] == "defin") {
				linkit("http://en.wiktionary.org/wiki/Special:Search?go=Go&search=" + theList[x + 1], putintabs, false);
			} else if (theList[x] == "anidb") {
				linkit("http://anidb.net/perl-bin/animedb.pl?show=animelist&do.search=Search&adb.search=" + theList[x + 1], putintabs, false);
			} else if (theList[x] == "imdb") {
				linkit("http://www.imdb.com/find?s=all&x=22&y=12&q=" + theList[x + 1], putintabs, false);
			} else if (theList[x] == "gamefaq") {
				linkit("http://www.gamefaqs.com/search/index.html?platform=0&game=" + theList[x + 1], putintabs, false);
			} else if (theList[x] == "diggs") {
				linkit("http://digg.com/search?section=all&s=" + theList[x + 1], putintabs, false);
			} else if (theList[x] == "utube") {
				linkit("http://www.youtube.com/results?search_type=&aq=f&search_query=" + theList[x + 1], putintabs, false);
			} else if (theList[x] == "wikipda") {
				linkit("http://en.wikipedia.org/wiki/Special:Search?go=Go&search=" + theList[x + 1], putintabs, false);
			} else if (theList[x] == "googl") {
				linkit("http://google.com/search?q=" + theList[x + 1], putintabs, false);
			} else if (theList[x] == "flckr") {
				linkit("http://www.flickr.com/search/?q=" + theList[x + 1], putintabs, false);
			} else if (theList[x] == "cnns") {
				linkit("http://search.cnn.com/search.jsp?type=web&sortBy=date&intl=false&query=" + theList[x + 1], putintabs, false);
			} else if (theList[x] == "opnsrc") {
				linkit("http://sourceforge.net/search/?type_of_search=soft&words=" + theList[x + 1], putintabs, false);
			} else if (theList[x] == "eby") {
				linkit("http://shop.ebay.com/items/?_nkw=" + theList[x + 1], putintabs, false);
			} else if (theList[x] == "espns") {
				linkit("http://search.espn.go.com/" + theList[x + 1].split(" ").join("-"), putintabs, false);
			}
		}
	}
}
// Gets what the user is searching for, capitalizes first letters, and filters out search syntax
function setupText(preset) {
	var search;
	var params;
	if (!location.href.match("/search?[^#]*q=")) {
		params = location.hash.split("&").join("#").split("#");
	} else {
		/*
		// Finds then breaks on the search box, saving its value
		for (var i = 0; i < theInput.length; i++) {
			if (theInput[i].getAttribute("type") == "text") {
				search = theInput[i].value;
				break;
			}
		}
		*/
		// Extracts the search value from the URL
		params = location.search.split("&").join("?").split("?");
	}
	for (var p = params.length - 1; p >= 0; p--) {
		if(params[p].indexOf("q=") === 0) {
			search = unescape(params[p].substr(2).split("+").join(" "));
			break;
		}
	}
	
	if(search == undefined) { return; }
	// Checks for google specific syntax
	var checkforcolon = search.split(":");
	var regexColon = new RegExp("^(site|filetype|allintitle|allinbody|allinurl)$");
	var listredirs = new Array();
	var counter = 0;
	for (var k = 0; k < checkforcolon.length; k += 2) {
		var indiv = checkforcolon[k].split(" ");
		var checker = indiv[indiv.length - 1];
		// Finds google search sytnax and removes it (when it is properly formatted)
		if (regexColon.test(checker)) {
			indiv = indiv.slice(0,indiv.length - 1);
			checkforcolon[k + 1] = checkforcolon[k + 1].split(" ").slice(1,checkforcolon[k + 1].length).join(" ");
			checkforcolon[k] = indiv.join(" ");
		}
	}
	if (listredirs.length > 0) {
		redirgo(listredirs);
	}
	search = checkforcolon.join(" ");
	search = search.split(" ");
	// Capitalizes the first letter in each word
	for (var i = 0; i < search.length; i++) {
		search[i] = search[i].charAt(0).toUpperCase() + search[i].substr(1).toLowerCase();
	}
	return search.join(" ");
}
// Setup the expanded multisearch search box
function multiSearchSetup() {
	multiBox = new multisearcher();
	multiBox.draw();
}
// Creates the list of options for the multisearch
function optionList(id) {
	var sel = $create("select");
	sel.id = "searchList" + id;
	sel.className = "siteSelector";
	// quote|howto|defin|anidb|imdb|gamefaq|diggs|utube|wikipda|googl|flckr|cnns|opnsrc|eby|espns
	var valList = ["quote", "howto", "defin", "anidb", "imdb", "gamefaq", "diggs", "utube", "wikipda", "flckr", "cnns", "opnsrc", "eby", "espns", "googl"];
	var showList = ["WikiQuote", "Wiki How to", "Wiktionary", "AnimeDB", "IMDB", "GameFAQs", "Digg", "Youtube", "Wikipedia", "Flickr", "CNN", "Source Forge", "Ebay", "ESPN", "Google"];
	for (var i = showList.length - 1; i >= 0;i--) {
		var opt = $create("option");
		opt.value = valList[i];
		opt.textContent = showList[i];
		sel.appendChild(opt);
	}
	return sel;
}
// Removes one of the multisearch boxes and saves the new number of boxes
function removeSB(event) {
	GM_setValue("numMulti", $cl("SBoxes").length - 1);
	var numTo = this.id.substr(8);
	$("wrapperSB" + numTo).parentNode.removeChild($("wrapperSB" + numTo));
}
// Creates a new multisearch box
function newSB(nm, parent) {
	var wrapper = $create("div");
	wrapper.className = "SBoxes";
	wrapper.id = "wrapperSB" + nm;
	
	wrapper.appendChild(optionList(nm));
	
	var textLine = $create("input");
	textLine.type = "text";
	textLine.className = "searchBoxes";
	textLine.id = "searchText" + nm;
	wrapper.appendChild(textLine);
	
	var close = $create("p");
	close.className = "closeBtn";
	close.id = "closebtn" + nm;
	close.textContent = "X";
	wrapper.appendChild(close);
	
	close.addEventListener("click", removeSB, false);
	
	wrapper.appendChild($create("br"));
	parent.appendChild(wrapper);
}
	// End Text / Input Based Functions --------------------------------------------
