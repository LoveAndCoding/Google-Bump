function config_tab(title, id, on) {
	
	this.title = title;
	this.id = id;
	this.tab;
	this.siblings = on && on.siblings.push(this) ? on.siblings : new Array(this);
	this.on = on ? on : this;
	
	this.draw = function (parentNode) {
		
		this.tab = $create("div", {
			className : this.on == this ? "conf_Tab selected_tab" : "conf_Tab",
			id : this.id,
			textContent : this.title
		});
		
		var self = this;
		this.tab.addEventListener("click", function (event) {
			self.goTo();
		}, false);
		
		parentNode.appendChild(this.tab);
	};
	
	this.goTo = function () {
		$(this.on.tab.id.substr(2)).className = "removed";
		this.on.tab.className = "conf_Tab";
		
		$(this.tab.id.substr(2)).className = "confTabOn";
		this.tab.className = "conf_Tab selected_tab";
		
		for (i = this.siblings.length - 1; i >= 0; i--) {
			this.siblings[i].on = this;
		}
	};
}

function config_window(tab, id) {
	
	this.tab = tab;
	this.id = id;
	this.window;
	this.sections = new Array();
	
	this.draw = function (parentNode) {
		this.window = $create("div", {
			className : this.tab.on == this.tab ? "confTabOn" : "removed",
			id : this.id
		});
		var ckcount = 0;
		for (var so = 0; so < this.sections.length; so++) {
			this.sections[so].draw(this.window);
			ckcount+= this.sections[so].checkboxes;
		}
		
		if (ckcount >= 2) {
			var SR = this;
			var select = new button("Select All", function () { SR.SelectAll(); });
			select.draw(this.window);
			var deselect = new button("Deselect All", function () { SR.DeselectAll(); });
			deselect.draw(this.window);
		}
			
		parentNode.appendChild(this.window);
	};
	
	this.SelectAll = function () {
		for (var so = 0; so < this.sections.length; so++) {
			this.sections[so].SelectAll();
		}
	};
	
	this.DeselectAll = function () {
		for (var so = 0; so < this.sections.length; so++) {
			this.sections[so].DeselectAll();
		}
	};
	
	this.setDefaults = function () {
		for (var so = 0; so < this.sections.length; so++) {
			this.sections[so].setDefaults();
		}
	};
}

function config_section(title) {
	
	this.title = title ? title : "";
	this.sectionOptions = new Array();
	this.checkboxes = 0;
	this.selectboxes = 0;
	
	this.draw = function (parentNode) {
		var sect = $create("div", {
			className : "conf_subsect"
		});
		if(this.title != "") {
			var hdng = $create("h3", {
				textContent : this.title,
				className : "config_section_head"
			});
			sect.appendChild(hdng);
		}
		for (var soo = 0; soo < this.sectionOptions.length; soo++) {
			this.sectionOptions[soo].draw(sect);
			if(this.sectionOptions[soo].box) {
				this.checkboxes++;
			} else {
				this.selectboxes++;
			}
		}
		parentNode.appendChild(sect);
	};
	
	this.SelectAll = function () {
		for (var so = 0; so < this.sectionOptions.length; so++) {
			if(this.sectionOptions[so].box) {
				this.sectionOptions[so].box.checked = true;
			}
		}
	};
	
	this.DeselectAll = function () {
		for (var so = 0; so < this.sectionOptions.length; so++) {
			if(this.sectionOptions[so].box) {
				this.sectionOptions[so].box.checked = false;
			}
		}
	};
	
	this.setDefaults = function () {
		for (var so = 0; so < this.sectionOptions.length; so++) {
			this.sectionOptions[so].setDefault();
		}
	};
}
	
function config_desc_section(title, content) {
	
	this.title = title ? title : "";
	this.content = typeof content == "string" ? $create('p', { textContent : content }) : content;
	
	this.draw = function (parentNode) {
		var sect = $create("div", {
			className : "conf_subsect"
		});
		if(this.title != "") {
			var hdng = $create("h3", {
				textContent : this.title,
				className : "config_section_head"
			});
			sect.appendChild(hdng);
		}
		sect.appendChild(this.content);
		parentNode.appendChild(sect);
	};
	
	this.SelectAll = function () {
		return;
	};
	
	this.DeselectAll = function () {
		return;
	};
	
	this.setDefaults = function () {
		return;
	};
}

function config_checkBox(label, id, dflt) {
	
	this.label = label;
	this.id = id;
	this.value = GM_getValue(id, dflt);
	this.defaultVal = dflt;
	this.box;
	
	this.draw = function (parentNode) {
		var lbl = $create("label", {
			textContent : this.label + ": ",
			"for" : this.id
		});
		this.box = $create("input",{
			type : "checkbox",
			name : this.id,
			id : this.id
		});
		if (this.value) {
			this.box.checked = true;
		}
		this.box.addEventListener("change", function(event) {
			GM_setValue(event.target.id, event.target.checked); 
		}, true);
		
		parentNode.appendChild(lbl);
		parentNode.appendChild(this.box);
		parentNode.appendChild($create("br"));
	};
	
	this.setDefault = function () {
		if (this.box) {
			this.box.checked = this.defaultVal;
			GM_setValue(this.id, this.defaultVal);
		}
	};
}

function config_selectionBox(label, id, op_labels, op_values, dflt) {
	
	this.label = label;
	this.id = id;
	this.currentValue = GM_getValue(id, dflt);
	this.defaultVal = dflt;
	this.options = op_labels;
	this.values = op_values;
	this.list;
	
	this.draw = function (parentNode) {
		var disp = $create("p", {
			textContent : this.label + ": ",
			className : "confLbl"
		});
		this.list = $create("select", {
			name : this.id,
			className : "opli"
		});
		var SR = this;
		this.list.addEventListener("change", function(event) { 
			GM_setValue(SR.list.name, SR.list.value);
		}, true);
		// Creates the desired Options with the given  values and ids
		for (var lo = 0; lo < this.options.length; lo++) {
			var op = $create("option", {
				textContent : this.options[lo],
				value : this.values[lo],
				id : this.id + "_" + lo
			});
			if (this.values[lo] == this.currentValue) {
				op.selected = true;
			}
			this.list.appendChild(op);
		}
		
		parentNode.appendChild(disp);
		parentNode.appendChild(this.list);
		parentNode.appendChild($create("br"));
	};
	
	this.setDefault = function () {
		if (this.list) {
			this.list.value = this.defaultVal;
			GM_setValue(this.id, this.defaultVal);
		}
	};
}

function config_description(label, id, dflt) {
	
}

function button(value, action) {
	
	this.val = value;
	this.btn;
	this.action = action;
	
	this.draw = function (parentNode) {
		this.btn = $create("input", {
			type : 'button',
			value : this.val
		});
		
		//this.action = action;
		
		var SR = this;
		this.btn.addEventListener("click", function () {
			SR.action();
		}, false);
		
		parentNode.appendChild(this.btn);
	}
	
	this.undraw = function () {
		$remove(this.btn);
		this.btn = SET_UNDEFINED;
	}
}
