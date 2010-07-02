	// Start Update Script ---------------------------------------------------------------
// Fetches script homepage to check for updates
function scriptPage() {
	var dt = new Date();
	if (options.newversion > parseFloat(version) && options.newversion != 0.0) {
		verNotice();
	} else if (Date.now() - options.updateCheck >= 86400000 || options.updateCheck === 0) {
		GM_setValue("updtTime", Date.now().toString());
		get("http://userscripts.org/scripts/source/33449.meta.js", chckAgainst, unable);
	}
}
//Dummy function for errors
function unable(response) {}
// Checks the version number on the script homepage against this version number and informs if a newer version is available
function chckAgainst(response) {
	var newest = parseFloat(/\/\/ @version.+/.exec(response.responseText)[0].replace(/\/\/ @version\s+/, ''));
	// Creates an install link if a newer version is available
	if (newest > version) {
		GM_setValue("newver", "" + newest);
		verNotice();
	}
}
// Displays a notification about a new update
function verNotice() {
	var divHolder = $create('div', {
		id : "newVer"
	});
	
	divHolder.appendChild($create("span", {
		textContent : "A newer version of Google Bump is available.",
		className : "newVerAvailable"
	}));
	
	var uplink = $create("a", {
		href : "http://userscripts.org/scripts/source/33449.user.js",
		textContent : "Update Google Bump"
	});
	divHolder.appendChild(uplink);
	
	uplink = $create("a", {
		href : "http://userscripts.org/scripts/show/33449#full_description",
		textContent : "Change Log"
	});
	divHolder.appendChild(uplink);
	
	$("leftnav").insertBefore(divHolder, $('leftnav').childNodes[0]);
}
	// End Update Script -----------------------------------------------------------------
