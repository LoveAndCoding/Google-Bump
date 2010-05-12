function Media_Embed () {
	
	this.draw = function (parentNode) {
		var bigBox = rightBox("mBox");
		var player = rightBox("pBox");
		// Sets the proper display text for an empty player
		if (options.styl == "center" && options.vids) {
			player.innerHTML = "<div id=\"playerTag\">Player</div>";
		} else if (options.styl == "center") {
			player.innerHTML = "<div id=\"playerTag\">Image</div>";
		} else {
			player.textContent = "Select an item Below to view it here.";
		}
		bigBox.appendChild(player);
		if ($("res").childNodes) {
			$("res").insertBefore(bigBox, $("res").childNodes[0]);
		} else {
			$("res").appendChild(bigBox);
		}
		
		if (options.styl == "dock") {
			player.className = "removed";
		} else if (options.styl == "center" && options.imgs && options.vids) {
			var hidePlayer = $create("div", {
				id : "hidePly",
				textContent : "X"
			});
			hidePlayer.addEventListener("click", function (event) {
				removeAllChildren(player);
				player.className = "rBox closed";
			}, false);
			player.appendChild(hidePlayer);
		}
	};
}