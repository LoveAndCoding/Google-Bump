	// Start Wiki Based Functions --------------------------------------------------
// Handles the case of a wikipedia page being found
function foundwikilink(response) {
	var defdiv = $create("div");
	var code = stringtohtml(response.responseText);
	var theHeading = code.getElementsByClassName("firstHeading")[0];
	var headLink = $create("a");
	headLink.textContent = "Wikipedia Article for " + theHeading.textContent;
	headLink.href = response.finalUrl;
	theHeading.textContent = "";
	var paras = code.getElementsByTagName("p");
	var paranew = $create("p");
	var hit = 0;
	
	for (var l = 0; l < paras.length; l++) {
		if (paras[l].parentNode.id == "bodyContent" && paras[l].childNodes[0].id != "coordinates") {
			hit = l;
			break;
		}
	}
	if(paras.length != 0) {
		// Adds 7 paragraphs from wikipedia if it is set to dock mode
		if (options.styl == "dock") {
			paranew = $create("div");
			var pcount = 0;
			while (hit < paras.length && paras[hit].parentNode.id == "bodyContent" && pcount < 7){
				paras[hit].className = "wiki_p";
				paranew.appendChild(paras[hit]);
				pcount++;
			}
		// Finds and cuts down the wikipedia description if the style is not set to dock mode
		} else {
			var cut = paras[hit].textContent.split(".");
			paranew.textContent = cut.slice(0,Math.min(3,cut.length - 1)).join(".") + ".";
			if (paranew.textContent.length < 2) {
				paranew.textContent = "This item has multiple possible definitions. Please visit wikipedia to specify a specific one.";
			}
		}
	} else {
		paranew.textContent = "No summary could be created for this page.";
	}
	theHeading.appendChild(headLink);
	defdiv.appendChild(theHeading);
	defdiv.appendChild(paranew);
	if (options.vids || options.imgs || options.exvids) {
		$("res").insertBefore(defdiv,$("res").childNodes[1]);
	} else {
		$("res").insertBefore(defdiv,$("res").childNodes[0]);
	}
	
	// Reassignment of links to link to the right page
	wikiLinks = paranew.getElementsByTagName("a");
	usableUrl = currUrl.split("#")[0];
	for (var lnum = 0; lnum < wikiLinks.length; lnum++) {
		if (wikiLinks[lnum].href.indexOf(usableUrl) < 0) {
			wikiLinks[lnum].href = "http://en.wikipedia.com" + wikiLinks[lnum].href.substr(21);
		} else {
			wikiLinks[lnum].href = wikiLinks[lnum].href.replace(usableUrl, headLink.href);
		}
	}
	
	// ID assignments for Wikipedia entry
	theHeading.id = "wikiHeader";
	paranew.id = "wikiDesc";
	defdiv.id = "wikiDiv";
	if (options.styl == "dock") {
		defdiv.className = "removed";
		$("wikiDock").className = "";
	} else if (options.styl == "center") {
		var wikiExp = $create("div");
		wikiExp.id = "wikiExp";
		defdiv.className = "removed";
		wikiExp.innerHTML = "E<br />x<br />p<br />a<br />n<br />d<br />&raquo;";
		wikiExp.addEventListener("click", function (event) {
			$("wikiDiv").className = ($("wikiDiv").className == "removed") ? "" : "removed";
			wikiExp.innerHTML = (wikiExp.style.left == "0px" || wikiExp.style.left == "") ? "C<br />o<br />l<br />l<br />a<br />p<br />s<br />e<br />&laquo;" : "E<br />x<br />p<br />a<br />n<br />d<br />&raquo;";
			wikiExp.style.left = (wikiExp.style.left == "200px") ? "0px" : "200px";
		}, false);
		document.body.appendChild(wikiExp);
	}
}
// Handles case when there is no imediate available wikipedia page
function nowikilink(response) {
	lookup(userInput);
}
// Checks whether a wikipedia page for the search was found and calls the appropriate function
function checkwikistate(response) {
	if(response.status != 200 || response.status != 302) {
		var srchregex = new RegExp("^http:\/\/en\.wikipedia\.org\/wiki\/Special:Search\?");
		if (srchregex.test(response.finalUrl)) {
			nowikilink(response);
		} else {
			foundwikilink(response);
		}
	} else {
		nowikilink(response);
	}
}
// Searches wikipedia based on what the user is searching for
function menutogglewiki(theSearch) {
	get("http://en.wikipedia.org/wiki/Special:Search?go=Go&search=" + theSearch, checkwikistate, nowikilink);
}
	// End Wiki Based Functions ----------------------------------------------------