	// Start Visual Functions ----------------------------------------------------------
// Adds a little more margin for appearance
function addMargins() {
	// To Be Decided
}
// Removes all of the side ads on the page, if they exist
function removeSideAds() {
	var sideAds = $("mbEnd");
	if (sideAds !== null) {
		sideAds.className = "removed";
	}
	sideAds = $("tads");
	if (sideAds !== null) {
		sideAds.className = "removed";
	}
}
// Unhides side ad content... dunno why you'd want it
function showSideAds() {
	if ($("mbEnd") !== null) {
		var theAds = $("mbEnd").childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes;
		for (var ad = 0; ad < theAds.length; ad++) {
			theAds[ad].className = "toLI";
		}
		$("mbEnd").className = "reAddAd";
	}
	if ($("tads") !== null) {
		var theTAds = $cl("tas");
		for (var ad = 0; ad < theTAds.length; ad++) {
			theTAds[ad].className = "toLI";
		}
		$("tads").className = "reAddAd";
	}
}
// Removes everything except the search results (Removes Suggestions)
function noSuggestions() {
	var lis = $cl("g");
	for (var k = 0; k < lis.length; k++) {
		if (lis[k].className.indexOf("videobox") >= 0 || lis[k].id == "imagebox") {
			lis[k].className = lis[k].className + " removed";
		} else {
			// var found = false;
			// for(var cn = (lis[k].childNodes.length - 1); cn > 0;cn--) {
				// if (lis[k].childNodes[cn].className && lis[k].childNodes[cn].className.indexOf("s") >= 0) {
					// found = true;
				// }
			// }
			// if (!found) {
				// lis[k].className = lis[k].className + " removed";
			// }
		}
	}
	if ($('trev') !== null) {
		$('trev').className = "removed";
	}
	if ($('brs') !== null) {
		$('brs').className = "removed";
	}
}
// Moves the "Did you mean text" to a different position
function didyoumean() {
	var dym = $cl('spell');
	if (dym.length == 4) {
		var p1 = dym[0].parentNode;
		var p2 = dym[2].parentNode;
		var thebar = $('leftnav');
		p2.className = "removed";
		p1.id = "dymTxt";
		thebar.insertBefore(p1, thebar.childNodes[0]);
		var anon = function () {
				var thebar = $('leftnav');
				p2.className = "removed";
				p1.id = "dymTxt";
				thebar.insertBefore(p1, thebar.childNodes[0]);
			};
		if($('leftnav')) {
			anon();
		} else {
			var inter = setInterval(function () { if($('leftnav')) { anon(); clearInterval(inter); } },options.delay);
		}
	}
}
// Moves top content to a new position
function topContentMove() {
	if (options.styl == 'center') {
		return;
	}
	
	var topHolder;
	if($('topstuff')) {
		topHolder = $('topstuff');
		topHolder.className = "topHolder";
	} else {
		topHolder = $create('div', {
			id : 'topstuff',
			className : 'topHolder'
		});
		var resnodes = $('res').childNodes;
		for(var i = 0; i < resnodes.length; i++) {
			if(resnodes[i].className != 'hd' &&
					resnodes[i].id != 'ires' &&
					resnodes[i].id != 'search') {
				topHolder.appendChild(resnodes[i]);
			} else {
				break;
			}
		}
	}
	
	$('sfcnt').appendChild(topHolder);
}
	// End Visual Functions ------------------------------------------------------------
