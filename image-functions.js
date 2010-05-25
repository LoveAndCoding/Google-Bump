/**
  *	Import Dependencies
  *	
  *	@depends image-search.js
  */
	// Start Image Search Functions ------------------------------------------------
// Starts the slide show
function startslides() {
	// if (!$("plySld").disabled && !sldObj.is_drawn()) {
		// if(conf.is_drawn()) {
			// conf.undraw();
		// }
		// if(stylr && stylr.is_drawn()) {
			// stylr.undraw();
		// }
		// sldObj.draw();
	// } else if (sldObj && sldObj.is_drawn()) {
		// sldObj.undraw();
	// }
	if(imgSearch) {
		imgSearch.startSlides();
	}
}
// Change the displayed set of images in the mediabox.
function changeset(changeby) {
	var sets = $cl("aset blocked");
	var so = parseInt(sets[0].id.substr(6));
	if (sets[0]) {
		sets[0].className = "aset removed";
		$("imgset" + (so + changeby)).className = "aset blocked";
		if (changeby > 0) {
			if (so === 0) {
				$("prev").disabled = false;
			}
			if (so == $cl("aset removed").length - 1 || $("imgset" + (so + 2)).childNodes.length === 0) {
				$("next").disabled = true;
			}
		} else if (changeby < 0) {
			if (so == 1) {
				$("prev").disabled = true;
			}
			if (so == $cl("aset removed").length || $("imgset" + (so + 1)).childNodes.length === 0) {
				$("next").disabled = false;
			}
		}
	}
}
// Displays a message that no images where found
function noimages(response) {
	var box = rightBox("imageList");
	box.textContent = "No Images Found";
	$("mBox").appendChild(box);
	
	if (options.styl == "dock") {
		box.className = "removed";
	}
}
// Show the loaded images
function showimages(response) {
	/*
		http://tbn3.google.com/images?q=tbn:dBk3GpW1jNJbZM:http://1.bp.blogspot.com/_sUpF830t0gU/SWbJrRPrsaI/AAAAAAAAAJI/VjT3kh6cNEI/s320/Blah_Blah_Blah.jpg
		14 + ?q=tbn: + 2 + 3 
		6
	*/
	var na;
	eval("na = new Array" + response.responseText.match(/dyn\.setResults\(\[\[[^]*]\);/)[0].substring(14));
	
	var done = !$("imageList");
	var listdiv;
	// If this is the first call to showimages, the imagelist will be setup
	if (done) {
		var realbox = rightBox("imageList");
		var imgTag = $create("p");
		imgTag.id = "imageTag";
		imgTag.textContent = "Images";
		realbox.appendChild(imgTag);
		
		if (options.styl == "dock") {
			var sldSpan = $create("span");
			sldSpan.textContent = "Play SlideShow";
			sldSpan.id = "miniSldLink";
			sldSpan.addEventListener("click", function (event) {
				startslides();
			}, false);
			imgTag.appendChild(sldSpan);
		}
		
		var bck = $create("button", {
			textContent : "<<",
			id : "prev",
			disabled : true
		});
		bck.addEventListener("click", function (event) {
			changeset(-1);
		}, false);
		
		var fwrd = $create("button", {
			textContent : ">>",
			id : "next"
		});
		fwrd.addEventListener("click", function (event) {
			changeset(1);
		}, false);
		realbox.appendChild(bck);
		realbox.appendChild(fwrd);
		
		if (options.sldshw) {
			var plyBtn = $create("button", {
				textContent : "Play SlideShow",
				id : "plySld",
				disabled : true
			});
			plyBtn.addEventListener("click", function (event) {
				startslides();
			}, false);
			realbox.appendChild(plyBtn);
		}
		
		var ldng = $create('div', {
			textContent : 'Loading images...',
			id : 'imgLdTxt'
		});
		realbox.appendChild(ldng);
		
		var listerdiv = $create("div", {
			id : "biglist",
			className : "removed"
		});
		if (options.styl == "dock") {
			realbox.className = "removed";
		}
	} else {
		realbox = $("imageList");
		listerdiv = $("biglist");
	}
	
	if (na[0]) {
		for (var i = 0; i < na[0].length; i++) {
			var link = $create("a");
			link.href = na[0][i][3];
			link.className = "imgLink";
			
			var img = $create("img");
			img.src = na[0][i][14] + "?q=tbn:" + na[0][i][2] + na[0][i][3];
			img.alt = na[0][i][6];
			img.title = na[0][i][6];
			
			link.appendChild(img);
			listerdiv.appendChild(link);
		}
	} else {
		realbox.textContent = "No Images Found";
	}
	//$('ires').removeChild(tempbox);
	$("mBox").appendChild(realbox);
	$("mBox").appendChild(listerdiv);
	if (options.imgPgs > pon) {
		menutoggleimages(userInput);
	} else {
		imagesorter(listerdiv);
		$remove('imgLdTxt');
		if (options.sldshw) {
			$('plySld').disabled = false;
		}
	}
}
// Sorts the images into sets; Size based on number of images.
function imagesorter(imgHolder) {
	if (imgHolder) {
		var numper;
		if (options.styl == "dock") {
			$("imgDock").className = "";
			numper = 21;
		} else if (imgHolder.childNodes.length % 6 === 0) {
			numper = 6;
		} else if (imgHolder.childNodes.length % 7 === 0) {
			numper = 7;
		} else {
			numper = 5;
		}
		var seton = 0;
		var ion = 0;
		var imgdiv = setcreator(seton);
		if(options.sldshw) {
			sldObj = new popup_dialog(3);
			sldObj.init();
		}
		
		// Divides the images out, and creates a new set as necessary
		for (var ic = 0; imgHolder.childNodes[ic] && ic < imgHolder.childNodes.length; ic++) {
			//imgHolder.childNodes[ic].childNodes[0].childNodes[0].title = html_entity_decode(imgHolder.childNodes[ic].childNodes[0].childNodes[0].title);
			if(options.sldshw) {
				sldObj.dialog.add_image(imgHolder.childNodes[ic]);
			}
			imgdiv.appendChild(imgHolder.childNodes[ic]);
			ic--;
			if (!imgHolder.childNodes[ic + 1] || (ion + 1) % numper === 0) {
				seton++;
				$("imageList").appendChild(imgdiv);
				imgdiv = setcreator(seton);
			}
			ion++;
		}
		$("mBox").removeChild(imgHolder);
		
		// Sets up the default state
		if($("imgset0")) {
			$("imgset0").className = "aset blocked";
			if (!$('imgset1') || $('imgset1').childNodes.length === 0) {
				$("next").disabled = true;
			}
		} else {
			$("mBox").removeChild($("imageList"));
			noimages("");
		}
	}
}
// Creates a set for the images to be put in with the given set number
function setcreator(seton) {
	var setdiv = $create("div");
	setdiv.id = "imgset" + (seton);
	setdiv.className = "aset removed";
	return setdiv;
}
// Searches for images based on what the user is searching for
function menutoggleimages(theSearch) {
	// get("http://images.google.com/images?q=" + theSearch + "&gbv=2&start=" + (21 * pon), showimages, noimages);
	// pon++;
	imgSearch = new Image_Search(theSearch);
	imgSearch.draw($("mBox"));
	
	if (options.styl == "dock") {
		imgSearch.div.className = "removed";
		$("imgDock").className = "";
	}
}
	// End Image Search Functions -------------------------------------------------
