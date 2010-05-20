/**	=================================================================
  *	Video Search
  *	=================================================================
  */

/**	indiv_video_result
  *	Individual Video Result Ojbect
  *	
  *	Construction Parameters
  *		src		Source of the screenshot image
  *		link	Url to video
  *		domain	Domain of origin
  *		name	Name of the Video
  *	
  *	Functions
  *		draw
  *			( HtmlNode parentNode )		Node to draw in
  *			Draw the video result
  *		
  *		clicked	
  *			( Event event )		click event
  *			( indiv_video_result res )		The result object clicked (for self-reference)
  *			Handles click event for embedabble videos
  *		
  *		youtubeEmbed
  *			( String link )		Link to the video for parsing
  *			Handles logic for youtube embeds including extra options
  *			<= Return String =>		Url for the embed
  *		
  *		googleEmbed
  *			( String link )		Link to the video for parsing
  *			Handles logic for google embeds including extra options
  *			<= Return String =>		Url for the embed
  *		
  *		metacafeEmbed
  *			( String link )		Link to the video for parsing
  *			Handles logic for metacafe embeds including extra options
  *			<= Return String =>		Url for the embed
  *		
  *		livevideoEmbed
  *			( String link )		Link to the video for parsing
  *			Handles logic for livevideo embeds including extra options
  *			<= Return String =>		Url for the embed
  *	
  */
function indiv_video_result(src, link, domain, name) {
	
	// Thumbnail Source
	this.src = src;
	// Link to video
	this.link = link;
	// Domain
	this.domain = domain;
	// Name of video
	this.name = name;
	// Embeddable on page
	this.embeddable = (domain == 'youtube' || domain == 'google' || domain == 'metacafe' || domain == 'livevideo');
	
	// Draw the video result
	this.draw = function (parentNode) {
		var img = $create("img", {
			src : this.src,
			alt : this.name,
			title : "\"" + this.name.replace(/\s\.{3}$/,"") + "\" from " + this.domain,
			className : 'vid_thumb'
		});
		var ancr_t = $create("a", {
			href : this.link,
			textContent : this.name
		});
		var ancr_i = $create("a", {
			href : this.link
		});
		var hldr = $create("div", {
			className : 'vid_result' + (this.embeddable ? ' embeddable' : '')
		});
		
		ancr_i.appendChild(img);
		hldr.appendChild(ancr_i);
		hldr.appendChild(ancr_t);
		parentNode.appendChild(hldr);
		
		if(options.embd && this.embeddable) {
			var SR = this;
			hldr.addEventListener("click", function (e) {
				SR.clicked(e, SR);
			}, true);
		}
	};
	
	// Handles click event for embedabble videos
	this.clicked = function (event, res) {
		event.stopPropagation();
		event.preventDefault();
		
		// Embeds the video
		var src;
		if (res.domain == "youtube") {
			src = this.youtubeEmbed(res.link);
		} else if (res.domain == "google") {
			src = this.googleEmbed(res.link);
		} else if (res.domain == "metacafe") {
			src = this.metacafeEmbed(res.link);
		} else {
			src = this.livevideoEmbed(res.link);
		}
		
		// New embed code options
		var object = $create("object", { 
				width : '100%',
				height : '100%'
			} );
		
		// Movie param
		var movie = $create("param", {
				name : 'movie',
				value : src
			});
		object.appendChild(movie);
		
		// Fullscreen param
		var param = $create("param", {
				name : 'allowFullScreen',
				value : options.fsvd
			});
		object.appendChild(param);
		
		// Script Access param
		param = $create("param", {
				name : 'allowScriptAccess',
				value : 'always'
			});
		object.appendChild(param);
		
		// Embed
		var embed = $create("embed", {
				'src' : src,
				type : 'application/x-shockwave-flash',
				wmode : 'transparent',
				width : '100%',
				height : '100%',
				allowfullscreen : true,
				allowScriptAccess : 'always',
				id : 'embdPlyr'
			});
		// Special flashVars for metacafe
		if(res.domain == "metacafe") {
			embed.setAttribute('flashVars', "playerVars=autoPlay=" + (options.apvd ? 'yes' : 'no'));
		}
		object.appendChild(embed);
		
		embedder.addVideoEmbed(name, true, object)
	};
	
	// Handles logic for youtube embeds including extra options
	this.youtubeEmbed = function(link) {
		var regexUtube = new RegExp("^http:\/\/w{3}\.youtube\.com\/watch");
		var src = link.replace(regexUtube, "");
		src = "http://www.youtube" + (options.pmvd ? "-nocookie" : "") + ".com/v/" + src.substr(3) +
				"?fs=" + Number(options.fsvd) +
				"&hd=" + Number(options.hdvd) + 
				"&autoplay=" + Number(options.apvd) +
				"&loop=" + Number(options.lpvd) +
				"&iv_load_policy=" + (options.ivvd ? 1 : 3) +
				"&cc_load_policy=" + Number(options.ccvd) +
				"&enablejsapi=1" +
				(!options.pmvd && !options.lpvd ? "&version=3" : "");
		return src;
	};
	
	// Handles logic for google embeds including extra options
	this.googleEmbed = function(link) {
		var regexGoogl = new RegExp("^http:\/\/video\.google\.com\/videoplay");
		var src = link.replace(regexGoogl, "");
		src = "http://video.google.com/googleplayer.swf?hl=en&" + src.substr(1) +
				"&fs=" + options.fsvd +
				"&autoplay=" + options.apvd +
				"&loop=" + options.lpvd;
		return src;
	};
	
	// Handles logic for metacafe embeds including extra options
	this.metacafeEmbed = function(link) {
		var regexMetaCaf = new RegExp("^http:\/\/w{3}\.metacafe\.com\/watch\/");
		var src = link.replace(regexMetaCaf,"http://www.metacafe.com/fplayer/");
		src = src.substring(0,src.length - 1) + ".swf?";
		return src;
	};
	
	// Handles logic for livevideo embeds including extra options
	this.livevideoEmbed = function(link) {
		var regexLiveVideo = new RegExp("^http:\/\/w{3}\.livevideo\.com\/video\/");
		var src = link.replace(regexLiveVideo, "");
		src = "http://www.livevideo.com/flvplayer/embed/" + src.split("/")[0] + "?autostart=" + Number(options.apvd);
		return src;
	};
}

/**	=================================================================
  *	End Video Search
  *	=================================================================
  */