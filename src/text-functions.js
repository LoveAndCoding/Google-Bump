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
				putintabs = tablast || false;
			}
			linkit(options.searchengines[theList[x]].url_before + theList[x + 1] + options.searchengines[theList[x]].url_after, putintabs);
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
// Handles clicks for opening links in new tabs
function clickd() {
	document.addEventListener("click", function(event) {
		// Makes sure it is a left click
		if (event.button === 0 && !event.ctrlKey && !event.altKey && !event.shiftKey && options.tabs) {
			// Opens all links that are external links in tabs if the tab feature is turned on
			if (checkallparentsforit(event.target, "resOL")) {
				if (event.target.href) {
					event.stopPropagation();
					event.preventDefault();
					linkit(event.target.href, false, true);
				} else if (event.target.parentNode.href) {
					event.stopPropagation();
					event.preventDefault();
					linkit(event.target.parentNode.href, false, true);
				}
			}
		}
	}, false);
}
	// End Text / Input Based Functions --------------------------------------------