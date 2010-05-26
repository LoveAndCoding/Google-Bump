/**
  *	Import Dependencies
  *	
  *	@depends image-search.js
  */
	// Start Image Search Functions ------------------------------------------------
// Starts the slide show
function startslides() {
	if(imgSearch) {
		imgSearch.startSlides();
	}
}
// Searches for images based on what the user is searching for
function menutoggleimages(theSearch) {
	imgSearch = new Image_Search(theSearch);
	imgSearch.draw($("mBox"));
	
	if (options.styl == "dock") {
		imgSearch.div.className = "removed";
		$("imgDock").className = "";
	}
}
	// End Image Search Functions -------------------------------------------------
