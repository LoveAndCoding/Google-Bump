// Activate Keyboard Shortcuts for the script
function keycuts() {
	document.addEventListener("keypress", function (event) {
		if(event.ctrlKey && event.shiftKey) {
			if (String.fromCharCode(event.charCode) === 'O') {
				if(conf.is_drawn()) {
					conf.undraw();
					location.reload();
				} else {
					configurations();
				}
			} else if (String.fromCharCode(event.charCode) === 'A') {
				var q = document.evaluate('//input[@name="q"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				q = q.snapshotItem(0);
				q.focus();
			} else if (String.fromCharCode(event.charCode) === 'U' && multiBox) {
				multiBox.expandCollapse();
			} else if (String.fromCharCode(event.charCode) === 'Y') {
				if(stylr && stylr.is_drawn()) {
					stylr.undraw();
					location.reload();
				} else {
					styler();
				}
			} else if (String.fromCharCode(event.charCode) === 'I' && options.sldshw) {
				startslides();
			}
		}
	}, false);
}
