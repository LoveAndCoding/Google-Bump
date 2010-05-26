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
	// End Configuration Functions ----------------------------------------------------
