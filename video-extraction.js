	// Start Video Extraction Functions --------------------------------------------
// Finds videos within the results and sets them aside... literally
function extractVideos(userSearch) {
	// Get all elements with the j class, the defining class for videos
	var vidsr = $cl("ts");
	if (vidsr.length > 0) {
		if (!options.vids && !options.imgs) {
			// Begin base item creation -------------------------------------------------
			var box = rightBox("exvidlist");
			var theList = $create("ol");
			var header = $create("h3");
			var videosLink = $create("a");
			videosLink.href = "http://video.google.com/videosearch?q=" + userSearch + "#";
			videosLink.textContent = "Videos";
			header.appendChild(videosLink);
			box.appendChild(header);
			// End base item creation ----------------------------------------------------
			var originalLength = vidsr.length;
			for (var i = 0; i < vidsr.length; i++) {
				if (vidsr[i].parentNode.childNodes.length == 3 && vidsr[i].parentNode.childNodes[0] == vidsr[i]) { // Tests that it is, in fact, a video result
					// Get the entire result (the j class is just a <td> and not the whole result)
					var videoresult = vidsr[i].parentNode;
					if (videoresult.className.indexOf("g") >= 0) {
						videoresult.className = "vidRes";
						
						// Locates the description of the link and erases it
						var text = vidsr[i].childNodes[0].childNodes[0].childNodes[1];
						text.className = "removed";
						var vidtitle = text.childNodes[1].childNodes[0];
						vidtitle.className = "vrTitle";
						
						// Appends items
						theList.appendChild(videoresult);
						theList.appendChild(vidtitle);
					}
				} else {
					vidsr[i].parentNode.parentNode.parentNode.parentNode.parentNode.className = "blocked";
				}
				if (vidsr.length < originalLength) {
					i--;
					originalLength--;
				}
			}
			box.appendChild(theList);
			if(theList.childNodes.length < 1) {
				box.className = "removed";
			}
			$('ires').insertBefore(box, $('ires').childNodes[0]);
		} else {
			//
		}
	}
}
// Goes through and reveals the videos that are automatically hidden with all non-result content
function unextractVids() {
	var vidss = $cl("ts");
	if (vidss.length > 0) {
		for (var rvl = 0; rvl < vidss.length; rvl++) {
			if (vidss[rvl].parentNode.childNodes.length == 3 && vidss[rvl].parentNode.childNodes[0] == vidss[rvl]) {
				vidss[rvl].parentNode.className = "g";
			}
		}
	}
}
	// End Video Extraction Functions ----------------------------------------------
