/**
  *	Import dependencies
  *	
  *	@depends color-picker.js
  */

/**
  *	Configuration tab
  */
function config_tab(title, id, on) {
	
	this.title = title;
	this.id = id;
	this.tab;
	this.siblings = on && on.siblings.push(this) ? on.siblings : new Array(this);
	this.on = on ? on : this;
	
	this.draw = function (parentNode) {
		
		this.tab = $create("div", {
			className : this.on == this ? "conf_Tab selected_tab" : "conf_Tab",
			id : this.id
		});
		if (typeof this.title == 'string') {
			this.tab.textContent = this.title;
		} else {
			this.tab.appendChild(this.title);
		}
		
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

/**
  *	Configuration window
  */
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

/**
  *	Configuration section
  */
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
			if(this.sectionOptions[soo].cbox) {
				this.checkboxes++;
			} else {
				this.selectboxes++;
			}
		}
		parentNode.appendChild(sect);
	};
	
	this.SelectAll = function () {
		for (var so = 0; so < this.sectionOptions.length; so++) {
			if(this.sectionOptions[so].cbox) {
				this.sectionOptions[so].cbox.checked = true;
			}
		}
	};
	
	this.DeselectAll = function () {
		for (var so = 0; so < this.sectionOptions.length; so++) {
			if(this.sectionOptions[so].cbox) {
				this.sectionOptions[so].cbox.checked = false;
			}
		}
	};
	
	this.setDefaults = function () {
		for (var so = 0; so < this.sectionOptions.length; so++) {
			this.sectionOptions[so].setDefault();
		}
	};
}

/**
  *	Configuration descriptoin area
  */  
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
	
	this.setDefault = function () {
		return;
	};
}

/**
  *	Configuration boolean check box
  */
function config_checkBox(label, id, dflt) {
	
	this.label = label;
	this.id = id;
	this.value = GM_getValue(id, dflt);
	this.defaultVal = dflt;
	this.cbox;
	
	this.draw = function (parentNode) {
		var lbl = $create("label", {
			textContent : this.label + ": ",
			"for" : this.id
		});
		this.cbox = $create("input",{
			type : "checkbox",
			name : this.id,
			id : this.id
		});
		if (this.value) {
			this.cbox.checked = true;
		}
		this.cbox.addEventListener("change", function(event) {
			GM_setValue(event.target.id, event.target.checked); 
		}, true);
		
		var hldr = $create('div', {
			className : 'config_option'
		});
		
		hldr.appendChild(lbl);
		hldr.appendChild(this.cbox);
		parentNode.appendChild(hldr);
	};
	
	this.setDefault = function () {
		if (this.cbox) {
			this.cbox.checked = this.defaultVal;
			GM_setValue(this.id, this.defaultVal);
		}
	};
}

/**
  *	Configuration list selection box
  */
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
		
		var hldr = $create('div', {
			className : 'config_option'
		});
		
		hldr.appendChild(disp);
		hldr.appendChild(this.list);
		parentNode.appendChild(hldr);
	};
	
	this.setDefault = function () {
		if (this.list) {
			this.list.value = this.defaultVal;
			GM_setValue(this.id, this.defaultVal);
		}
	};
}

/**
  *	Configuration color selector
  */
function config_colorBox(label, id, dflt) {
	
	this.label = label;
	this.id = id;
	this.currentValue = GM_getValue(id, dflt);
	this.defaultVal = dflt;
	this.box;
	this.popout;
	
	this.draw = function (parentNode) {
		var disp = $create("p", {
			textContent : this.label + ": ",
			className : "confLbl"
		});
		this.box = $create("input", {
			type : 'text',
			name : this.id,
			className : "configColorBox"
		});
		this.box.style.backgroundColor = 'rgb(' + this.currentValue + ')';
		
		this.popout = popupManager.newColor(this.currentValue);
		
		var SR = this;
		this.box.addEventListener("click", function(event) { 
			this.blur();
			
			offLeft = 0;
			offTop = 0;
			var node = this;
			while(node != document.body) {
				offLeft += node.offsetLeft + 1;
				offTop += node.offsetTop + 1;
				node = node.offsetParent;
			}
			
			popupManager.closeColor();
			SR.popout.draw(SR.box);
			SR.popout.container.style.top = Math.min(window.innerHeight - 276, (offTop - 1)) + "px";
			SR.popout.container.style.left = Math.min(window.innerWidth - 313, (offLeft - 1)) + "px";
			
			document.addEventListener('click', function (e) {
				if(e.target.className != 'colorContainer' && (e.target.parentNode && e.target.parentNode.className != 'colorContainer')) {
					//popupManager.closeColor();
					document.removeEventListener('click', arguments.callee, false);
				} else {
					e.stopPropagation();
				}
			}, false);
			event.stopPropagation();
		}, true);
		this.popout.registerClick(function(e, clr) {
			SR.box.style.backgroundColor = "rgb(" + clr + ")";
			GM_setValue(id, clr);
			popupManager.closeColor();
		});
		
		var hldr = $create('div', {
			className : 'config_option'
		});
		
		hldr.appendChild(disp);
		hldr.appendChild(this.box);
		parentNode.appendChild(hldr);
	};
	
	this.setDefault = function () {
		if (this.box) {
			this.box.style.backgroundColor = 'rgb(' + this.defaultVal + ')';
			GM_setValue(this.id, this.defaultVal);
		}
	};
}

/**
  *	Key Value Table
  */
function config_keyvalTable(label, id, keys, vals, dflt) {
	
	this.label = label;
	this.id = id;
	this.currentValue = GM_getValue(id, dflt);
	this.defaultVal = dflt;
	this.keys = keys;
	this.values = vals;
	this.divwrap;
	this.tbl;
	this.hlgtrow;
	
	this.draw = function (parentNode) {
		this.divwrap = $create('div', {
			className : 'confKeyVal'
		});
		
		this.tbl = $create('table', {
			className : 'confKeyValTbl'
		});
		
		for(var kv = 0, len = this.keys.length; kv < len; kv++) {
			var tr = $create('tr', {
				className : 'confKeyValPair'
			});
			var keytd = $create('td', {
				className : 'confKey',
				textContent : this.keys[kv]
			});
			var valtd = $create('td', {
				className : 'confVal',
				innerHTML : this.values[kv].replace(/\*\*(\w+)\*\*/g,'<span class="confValHighlight">$1</span>')
			});
			tr.appendChild(keytd);
			tr.appendChild(valtd);
			this.tbl.appendChild(tr);
		}
		
		this.divwrap.appendChild(this.tbl);
		parentNode.appendChild(this.divwrap);
		
		// Commented out.....########################################
		return;
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
		
		var hldr = $create('div', {
			className : 'config_option'
		});
		
		hldr.appendChild(disp);
		hldr.appendChild(this.list);
		parentNode.appendChild(hldr);
	};
	
	this.setDefault = function () {
		if (this.list) {
			this.list.value = this.defaultVal;
			GM_setValue(this.id, this.defaultVal);
		}
	};
	
	this.addKeyVal = function (_k, _v) {
		this.keys.push(_k);
		this.values.push(_v);
	};
	
	this.removeKeyVal = function (_i) {
		
	};
	
	this.getKeyValPairs = function (_op) {
		if (!_op) {
			_op = function (k,v) { return "{\"key\" : " + k + "\",\"value\":\"" + v + "\"}"; };
		}
		var strStore = "[";
		for(var kv = 0, len = this.keys.length; kv < len; kv++) {
			strStore += _op(this.keys[kv], this.values[kv]);
			if(kv < len - 1) {
				strStore += ",";
			}
		}
		return strStore + "]";
	};
	
	this.highlightrow = function (e) {
		e.target.className += 'confKeyValHighlightedRow';
	};
}

/**
  *	Configuration unvalidated text field
  */
function config_textField(label, id, dflt) {
	
	this.label = label;
	this.id = id;
	this.value = GM_getValue(id, dflt);
	this.defaultVal = dflt;
	this.tbox;
	
	this.draw = function (parentNode) {
		var lbl = $create("label", {
			textContent : this.label + ": ",
			"for" : this.id
		});
		this.tbox = $create("textarea",{
			name : this.id,
			id : this.id,
			className : "config_textField",
			textContent : this.value
		});
		this.tbox.addEventListener("change", function(event) {
			GM_setValue(event.target.id, event.target.value); 
		}, true);
		
		var hldr = $create('div', {
			className : 'config_option'
		});
		
		hldr.appendChild(lbl);
		hldr.appendChild(this.tbox);
		parentNode.appendChild(hldr);
	};
	
	this.setDefault = function () {
		if (this.tbox) {
			this.tbox.value = this.defaultVal;
			GM_setValue(this.id, this.defaultVal);
		}
	};
}

/**
  *	Configuration unvalidated text field
  */
function config_intField(label, id, dflt) {
	
	this.label = label;
	this.id = id;
	this.value = GM_getValue(id, dflt);
	this.defaultVal = dflt;
	this.tbox;
	
	this.draw = function (parentNode) {
		var lbl = $create("label", {
			textContent : this.label + ": ",
			"for" : this.id
		});
		this.tbox = $create("input",{
			name : this.id,
			id : this.id,
			className : "config_intField",
			value : this.value
		});
		this.tbox.addEventListener("change", function(event) {
			if(parseInt(event.target.value) == event.target.value) {
				GM_setValue(event.target.id, event.target.value);
			} else {
				event.target.value = GM_getValue(id, dflt);
			}
		}, true);
		
		var hldr = $create('div', {
			className : 'config_option'
		});
		
		hldr.appendChild(lbl);
		hldr.appendChild(this.tbox);
		parentNode.appendChild(hldr);
	};
	
	this.setDefault = function () {
		if (this.tbox) {
			this.tbox.value = this.defaultVal;
			GM_setValue(this.id, this.defaultVal);
		}
	};
}

/**
  *	General purpose button object
  */
function button(value, action) {
	
	this.val = value;
	this.btn;
	this.action = action;
	
	this.draw = function (parentNode) {
		this.btn = $create("input", {
			type : 'button',
			value : this.val
		});
		
		var SR = this;
		this.btn.addEventListener("click", function () {
			SR.action();
		}, false);
		
		parentNode.appendChild(this.btn);
	}
	
	this.undraw = function () {
		$remove(this.btn);
		this.btn = undefined;
	}
}
