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
	
	// Creates a Temporary box with the other pages data so I can use DOM functions on it
	// var boxTemp = $create("table");
	// boxTemp.className = "removed";
	// var viddivs = code.getElementsByTagName("div");
	// for (var vdn = 0; viddivs && vdn < viddivs.length; vdn++) {
		// if (viddivs[vdn].id == "search-results") {
			// boxTemp.innerHTML = viddivs[vdn].innerHTML;
		// }
	// }
	// $("gsr").appendChild(boxTemp);
	
	// Sorts through the video results and puts them in a list
	var box = rightBox("videoList");
	var littlep = $create("p");
	littlep.textContent = "Videos";
	littlep.id = "vidTag";
	box.appendChild(littlep);
	
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
		
		// 
		// while((proc < limit || limit == -1) && rlitems.length > 0) {
			// proc++;
			// vidclicksetup(rlitems[0]);
			// box.appendChild(rlitems[0]);
		// }
		
		// var thbs = code.getElementsByClassName("thumbnail-img");
		// alert(thbs[0].parentNode.href);
		// for (var tmbo = 0; tmbo < thbs.length; tmbo++) {
			// var sorc = thbs[0].src;
			// var pnt = thbs[0].parentNode;
			// pnt.removeChild(thbs[0]);
			// pnt.appendChild($create("img", {
					// className : 'thumbnail-img',
					// src : sorc
				// }));
		// }
		/*
		for (var vi = rlitems.length - 1; vi >= 0; vi--) {
			vidclicksetup(rlitems[vi]);
			box.appendChild(rlitems[vi]);
			//alert(rlitems[vi].id);
		}
		*/
		if ($("imageList")) {
			$("mBox").insertBefore(box, $("imageList"));
		} else {
			$("mBox").appendChild(box);
		}
		
		if (options.styl == "dock") {
			box.className = "removed";
			$("vidDock").className = "";
		}
		
		/*
		var thumbs = $cl("rl-thumbnail-inner");
		for (var vt = 0; vt < thumbs.length && vt < 4; vt++) {
			thumbs[vt].childNodes[0].href = "#mBox";
		}
		thumbs = $cl("rl-thumbnail");
		for (var vt = 0; vt < thumbs.length && vt < 4; vt++) {
			thumbs[vt].childNodes[0].href = "#mBox";
		}
		var titles = $cl("rl-title");
		for (var vl = 0; vl < thumbs.length && vl < 4; vl++) {
			titles[vl].childNodes[0].href = titles[vl].parentNode.parentNode.getAttribute('srcurl');
		}*/
	} else {
		novids();
	}
	// Removes the Temporary Dom Box
	//$("gsr").removeChild(boxTemp);
	
	/*
	
	if (vids && checkallparentsforit(event, "rl-item")) {
		event.stopPropagation();
		event.preventDefault();
		$("pBox").className += " playing";
		var src = findrightnode(event, "rl-res", "srcurl");
		// Finds if video is hosted on supported site, and takes the appropriate action
		var regexUtube = new RegExp("^http:\/\/w{3}\.youtube\.com\/watch");
		var regexGoogl = new RegExp("^http:\/\/video\.google\.com\/videoplay");
		var regexMetaCaf = new RegExp("^http:\/\/w{3}\.metacafe\.com\/watch\/");
		var regexLiveVideo = new RegExp("^http:\/\/w{3}\.livevideo\.com\/video\/");
		if (regexUtube.test(src)) {
			src = src.replace(regexUtube, "");
			src = "http://www.youtube.com/v/" + src.substr(3);
			$("pBox").innerHTML = '<object width="100%" height="100%"><param name="movie" value="' + src + 
					'&ap=%2526fmt%3D18"></param><param name="allowFullScreen" value="true"></param><embed src="' + src + 
					'&ap=%2526fmt%3D18" type="application/x-shockwave-flash" allowfullscreen="true" width="100%" height="100%"></embed></object>';
		} else if (regexGoogl.test(src)) {
			src = src.replace(regexGoogl, "");
			src = "http://video.google.com/googleplayer.swf?hl=en&fs=true&" + src.substr(1);
			$("pBox").innerHTML = '<embed id="VideoPlayback" src="' + src + 
					'" style="width:100%;height:100%" allowFullScreen="true" allowScriptAccess="always"' +
					'type="application/x-shockwave-flash"> </embed>';
		} else if (regexMetaCaf.test(src)) {
			src = src.replace(regexMetaCaf,"http://www.metacafe.com/fplayer/");
			src = src.substring(0,src.length - 1) + ".swf";
			$("pBox").innerHTML = '<embed src="'+ src +
					'" width="100%" height="100%" wmode="transparent" pluginspage="http://www.macromedia.com/go/getflashplayer" ' +
					'type="application/x-shockwave-flash"> </embed>';
		} else if (regexLiveVideo.test(src)) {
			src = src.replace(regexGoogl, "");
			src = "http://www.livevideo.com/flvplayer/embed/" + src.split("/")[4];
			$("pBox").innerHTML = '<embed src="' + src + '" type="application/x-shockwave-flash" ' +
					'quality="high" WIDTH="100%" HEIGHT="100%" wmode="transparent">';
		} else {
			linkit(src);
		}
		
	*/
}
// Searches for videos based on what the user is searching for
function menutogglevids(theSearch) {
	get("http://video.google.com/videosearch?q=" + encodeURIComponent(theSearch), showvids, novids);
}
	// End Video Search Functions --------------------------------------------------
