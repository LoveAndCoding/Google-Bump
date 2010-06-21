/**
  *	Import Dependencies
  *	
  *	@depends video-search.js
  */
	// Start Video Search Functions ------------------------------------------------
// Handles errors and no video results
function novids(response) {
	var box = rightBox("videoList");
	box.textContent = "No Videos Found";
	if ($("imageList")) {
		$("mBox").insertBefore(box, $("imageList"));
	} else {
		$("mBox").appendChild(box);
	}
	if (options.styl == "dock") {
		box.className = "removed";
	}
}
// Show the loaded videos
function showvids(response) {
	var code = stringtohtml(response.responseText);
	
	// Sorts through the video results and puts them in a list
	var box = rightBox("videoList");
	
	var rlitems = code.getElementsByClassName("rl-item");
	var rlress = code.getElementsByClassName("rl-res");
	var thbs = code.getElementsByClassName("thumbnail-img");
	var vts = code.getElementsByClassName("rl-title");
	if (rlitems.length > 0) {
		var proc = 0;
		var limit = 5;
		if (!options.imgs && options.styl == "media") {
			limit = -1;
		} else if (options.styl == "center") {
			limit = 3;
		}
		
		while((proc < limit || limit == -1) && proc < rlress.length) {
			if (rlitems[proc].className.indexOf('playlist-res') < 0) {
				var vid_src = getAttribute(rlress[proc], "srcurl");
				var img_src = thbs[proc].src;
				var vid_title = vts[proc].textContent.trim();
				var vid_domain = vid_src.replace(/http:\/\/\w*\./,'').replace(/\..*/,'');
				
				var new_vid = new indiv_video_result(img_src, vid_src, vid_domain, vid_title);
				new_vid.draw(box);
				
				proc++;
			} else {
				$remove(rlitems[proc]);
			}
		}
		
		if ($("imageList")) {
			$("mBox").insertBefore(box, $("imageList"));
		} else {
			$("mBox").appendChild(box);
		}
		
		if (options.styl == "dock") {
			box.className = "removed";
			$("vidDock").className = "";
		}
		
	} else {
		novids();
	}
}
// Handles Youtube Searches
function youtubeSearched(response) {
	eval("var nv = " + response.responseText.substr(1));
	var results = nv.feed.entry;
	
	var box = rightBox("videoList");
	
	if(results.length > 0) {
		for(var v = 0; v < results.length; v++) {
			var new_vid = new indiv_video_result(results[v].media$group.media$thumbnail[0].url, results[v].link[0].href.match(/.*watch\?v=[^&]*/)[0], "youtube", results[v].title.$t);
			new_vid.draw(box);
		}
		
		if ($("imageList")) {
			$("mBox").insertBefore(box, $("imageList"));
		} else {
			$("mBox").appendChild(box);
		}
		
		if (options.styl == "dock") {
			box.className = "removed";
			$("vidDock").className = "";
		}
	} else {
		novids();
	}
}
// Searches for videos based on what the user is searching for
function menutogglevids(theSearch) {
	if(options.vdsrchr == "youtube") {
		get("http://gdata.youtube.com/feeds/api/videos?alt=json-in-script&callback=y&max-results=5&format=5&q=" + encodeURIComponent(theSearch), youtubeSearched, novids);
	} else {
		get("http://video.google.com/videosearch?q=" + encodeURIComponent(theSearch), showvids, novids);
	}
}
	// End Video Search Functions --------------------------------------------------
