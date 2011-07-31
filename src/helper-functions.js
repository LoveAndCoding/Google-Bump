	// Start Helper Functions ----------------------------------------------------------
// Trim for strings
function _trim(b) {
	return b.replace(/^\s*/, "").replace(/\s*$/, "");
}
// Shortcut for document.getElementById
function $(id) {
	return document.getElementById(id);
}
// Shortcut for either Id
function $$(first, second) {
	return $(first) || $(second);
}
// Shortcut for document.getElementsByClassName
function $cl(cname) {
	var classlist = document.evaluate('//*[contains(concat(" ", @class, " "), " ' + cname + ' ")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var items = [];
	for(var ci = 0, cl = classlist.snapshotLength; ci < cl; ci++) {
		items.push(classlist.snapshotItem(ci));
	}
	return items;
}
// Shortcut for document.createElement
function $create(type, attributes) {
	var node;
	if(type == 'textNode') {
		node = document.createTextNode(attributes);
	} else {
		node = document.createElement(type);
		if(typeof attributes == 'string') {
			node.textContent = attributes;
		} else {
			for (var attr in attributes){
				if(attr == "textContent") {
					node.textContent = attributes[attr];
				} else if (attr == "className") {
					node.className = attributes[attr];
				} else if (attr == "innerHTML") {
					node.innerHTML = attributes[attr];
				} else if (attributes.hasOwnProperty(attr)) {
					node.setAttribute(attr, html_entity_decode(attributes[attr]));
				}
			}
		}
	}
	return node;
}
// Shortcut to remove an element
function $remove(node) {
	if (typeof node == "string") {
		node = $(node);
	}
	
	if (node && node.parentNode) {
		return node.parentNode.removeChild(node);
	} else {
		return false;
	}
}
// Shortcut for document.getElementsByTagName
function $tag(type) {
	return document.getElementsByTagName(type);
}
		// Start Grease Monkey Code Snippets ----------------------------------------------------------
// Simple xmlhttpRequest GET shortcut
function get(url, cb, err) {
	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onload: function(xhr) { cb(xhr); },
		onerror: function(xvr) { err(xvr); }
	});
}
// Simple xmlhttpRequest POST shortcut
function post(url, data, cb) {
	GM_xmlhttpRequest({
		method: "POST",
		url: url,
		headers:{'Content-type':'application/x-www-form-urlencoded'},
		data:encodeURI(data),
		onload: function(xhr) { cb(xhr.responseText); }
	});
}
		// End Grease Monkey Code Snippets ------------------------------------------------------------
//	Decoed HTML Entities
function html_entity_decode(str) {
	//jd-tech.net
	var tarea = $create('textarea');
	tarea.innerHTML = str;
	return tarea.value;
}
// Converts an html string into a working html tag
function stringtohtml(htmlstring) {
	var toHTML = $create("html", {
		innerHTML : htmlstring
	});
	return toHTML;
}
// Shortcut for redirecting the page and opening new tabs
function linkit(theLink, tabit, under) {
	if (tabit || (options.tabs && under)) {
		GM_openInTab(theLink);
	} else {
		location.href = theLink;
	}
}
// Goes up until if finds the proper node, and then returns the given attribute
function findrightnode(target, idname, att) {
	var checkClass = target;
	// Loop up and break on finding correct info
	while (checkClass.parentNode) {
		if (checkClass.id == idname) {
			if(att) {
				return checkClass.getAttribute(att);
			} else {
				return checkClass;
			}
		} else  {
			checkClass = checkClass.parentNode;
		}
	}
}
// Helper function to check if the clicked item is a child of a given class
function checkallparentsforit(el, clname) {
	var onn = el;
	// Loop up and returns if value is found
	while (typeof(onn) != "undefined" && onn !== null) {
		if (onn.className == clname || onn.id == clname) {
			return true;
		}
		onn = onn.parentNode || null;
	}
	return false;
}
// Get an attribute from a node
function getAttribute(node, attName) {
	var atts = node.attributes;
	for (var i = 0; i < atts.length; i++) {
		if(atts[i].name == attName) {
			return atts[i].value;
		}
	}
}
// Checks if a new search has occured without a full reload
function checknonreload() {
	// Check that original page is still the page that is loaded
	if(currUrl != location.href) {
		if($$(statId, dynaId)) {
			// Restart process if it is not
			resetPg();
			if(extractPage() == 'web') {
				userInput = setupText();
				runThrough();
			} else {
				location.reload();
			}
		}
		currUrl = location.href;
	}
}
// Reset a page to its original state
function resetPg() {
	var wdiv = $("wikiDiv");
	if (wdiv) {
		wdiv.parentNode.removeChild(wdiv);
	}
	// var mdiv = $("mBox");
	// if (mdiv) {
		// mdiv.parentNode.removeChild(mdiv);
	// }
	// var gset = $('gbump_settings');
	// if (gset) {
		// gset.parentNode.removeChild(gset);
	// }
	// var xdiv = $("exvidlist");
	// if (xdiv) {
		// xdiv.parentNode.removeChild(xdiv);
	// }
	// var wldiv = $("wikiLink");
	// if (wldiv) {
		// wldiv.parentNode.removeChild(wldiv);
	// }
	var gup = $("greyOut");
	if (gup) {
		closeEx();
	}
	if ($('dock')) {
		$remove('dock');
	}
}
// Removes all the children of the given element using recursion
function removeAllChildren(node) {
	var count = node.childNodes.length;
	for (var nc = 0; nc < count; nc++) {
		node.removeChild(node.childNodes[0]);
	}
}
// Closes all features that display on top with a grey background
function closeEx() {
	popupManager.closeAll();
}
// Gets the page on from the URL
function extractPage() {
	var queryarr = ((location.hash && location.hash.indexOf('q=') >= 0) ? location.hash : location.search).substr(1).split('&');
	var qobj = [];
	for(var i = queryarr.length - 1; i >= 0; i--)
		qobj[queryarr[i].split('=')[0]] = queryarr[i].split('=')[1];
	return qobj['tbm'] || 'web';
}
	// End Helper Functions ------------------------------------------------------------
