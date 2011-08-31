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
	var vrs;
	eval("vrs = " + response.responseText);
	
	var vrl = vrs.responseData.results;
	// Sorts through the video results and puts them in a list
	var box = rightBox("videoList");
	
	if (vrl.length > 0) {
		var proc = 0;
		var limit = 5;
		if (!options.imgs && options.styl == "media") {
			limit = -1;
		} else if (options.styl == "center") {
			limit = 3;
		}
		
		while((proc < limit || limit == -1) && proc < vrl.length) {
			var vid_src = vrl[proc].url.replace(/[^q]+q=/, '').replace(/&.+/, '');
			var emb_src = vrl[proc].playUrl;
			var img_src = vrl[proc].tbUrl;
			var vid_title = vrl[proc].title;
			var vid_domain = vrl[proc].videoType;
			
			var new_vid = new indiv_video_result(img_src, vid_src, emb_src, vid_domain, vid_title);
			new_vid.draw(box);
			
			proc++;
		}
		
		if ($("imageList") && (options.clctoprht == 'videos' && options.styl == 'classic')) {
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
	eval("var nv = " + response.responseText);
	var results = nv.feed.entry;
	
	var box = rightBox("videoList");
	
	if(results && results.length > 0) {
		for(var v = 0; v < results.length; v++) {
			var vid_src = results[v].link[0].href.match(/^.+watch\?v=[^&]+/)[0];
			var emb_src = vid_src.replace(/watch\?v=/, 'v/') + '?1=1';
			var img_src = results[v].media$group.media$thumbnail[0].url;
			var vid_title = results[v].title.$t;
			var new_vid = new indiv_video_result(img_src, vid_src, emb_src, "YouTube", vid_title);
			new_vid.draw(box);
		}
		
		if ($("imageList") && (options.clctoprht == 'videos' && options.styl == 'classic')) {
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
	if($('videoList')) $('videoList').parentNode.removeChild($('videoList'));
	if(options.vdsrchr == "youtube") {
		get("http://gdata.youtube.com/feeds/api/videos?alt=json&max-results=5&format=5&q=" + encodeURIComponent(theSearch), youtubeSearched, novids);
	} else {
		get("http://ajax.googleapis.com/ajax/services/search/video?v=1.0&gbv=2&rsz=5&start=0&q=" + encodeURIComponent(theSearch), showvids, novids);
	}
}
	// End Video Search Functions --------------------------------------------------
