/**
  *	Import dependencies
  *	
  *	@depends dialogs.js
  */
	// Start Configuration Functions --------------------------------------------------
// Setup the configuration for the script
function setupConf() {
	conf = popupManager.newConfig();
	conf.draw();
}
// Opens the configuration page
function configurations() {
	if(!conf.is_drawn()) {
		popupManager.closeAll();
		conf.draw();
	} else {
		conf.undraw();
	}
}
// Opens the style configuration page
function styler() {
	if (!stylr) {
		stylr = popupManager.newStyler();
	}
	if(!stylr.is_drawn()) {
		popupManager.closeAll();
		stylr.draw();
	} else {
		stylr.undraw();
	}
}
// Get a random string for searching
function randSearch() {
	// Variable length to lower collision rate further
	var v = "";
	for(var i = 0; i < 14; i++) {
		var n1 = Math.random();
		var n2 = Math.random();
		if(n1 * 1.5 > 1) {
			v += String.fromCharCode(Math.round(Math.random() * 9) + 48);
		} else if (n2 * 1.5 > 1) {
			v += String.fromCharCode(Math.round(Math.random() * 25) + 65);
		} else {
			v += String.fromCharCode(Math.round(Math.random() * 25) + 97);
		}
	}
	return v;
}
	// End Configuration Functions ----------------------------------------------------
