/**
  *	General Purpose Color Picker
  */
function color_picker(color, title) {
	
	this.clickHandles = [];
	this.color = color;
	this.title = title;
	this.bwCanvas;
	this.bwCtx;
	this.cbCanvas;
	this.cbCtx;
	this.container;
	
	this.draw = function (attachedNode) {
		this.container = $create('div', {
			'className' : 'colorContainer'
		});
		
		if (this.title) {
			this.heading = $create('h3', {
				'textContent' : this.title
			});
			this.container.appendChild(this.heading);
		}
		
		var realtone = this.color;
		this.tone = this.getBaseColor(realtone);
		this.drawBW(this.tone, realtone);
		this.drawCB(this.tone);
		this.drawSettings(this.color);
		
		document.body.appendChild(this.container);
	};
	
	this.drawBW = function (tone, realtone) {
		tone = tone || '255,0,0';
		realtone = realtone || '255,255,255';
		
		this.bwCanvas = $create('canvas', {
			'className' : 'colorToneToBlack'
		});
		this.bwCanvas.width = 255;
		this.bwCanvas.height = 255;
		this.bwCanvas.style.position = 'relative';
		this.container.appendChild(this.bwCanvas);
		this.bwCtx = this.bwCanvas.getContext('2d');
		
		this.redrawBW(tone);
		
		var SR = this;
		this.bwCanvas.addEventListener('mousedown', function (e) {
			var cd = function (e) {
				SR.clickDelegate(e);
			};
			cd(e);
			document.body.addEventListener('mousemove', cd, false);
			document.body.addEventListener('mouseup', function() {
				document.body.removeEventListener('mousemove', cd, false);
			}, false);
		}, false);
	};
	
	this.redrawBW = function (tone) {
		var wtc = this.bwCtx.createLinearGradient(0,0,255,0);
		wtc.addColorStop(0, 'rgb(255,255,255)');
		wtc.addColorStop(1, 'rgb(' + tone + ')');
		this.bwCtx.fillStyle = wtc;
		this.bwCtx.fillRect(0,0,255,255);
		var btw = this.bwCtx.createLinearGradient(0,0,0,255);
		btw.addColorStop(0,'rgba(255,255,255,0)');
		btw.addColorStop(1,'rgb(0,0,0)');
		this.bwCtx.fillStyle = btw;
		this.bwCtx.fillRect(0,0,255,255);
	};
	
	this.drawBWDot = function (x,y) {
		this.bwCtx.strokeStyle = "rgba(0,0,0,1)";
		//this.bwCtx.strokeRect(x-4,y-3, 8, 6);
		this.bwCtx.beginPath();
		this.bwCtx.arc(x,y,4,0,Math.PI*2,false);
		this.bwCtx.closePath();
		this.bwCtx.stroke();
		this.bwCtx.strokeStyle = "rgba(255,255,255,1)";
		//this.bwCtx.strokeRect(x-3,y-2, 6,4);
		this.bwCtx.beginPath();
		this.bwCtx.arc(x,y,3,0,Math.PI*2,false);
		this.bwCtx.closePath();
		this.bwCtx.stroke();
	};
	
	this.getBaseColor = function (color) {
		colors = color.split(/,\s?/);
		var maxIndex = 0;
		var minIndex = 0;
		for (var c = 0; c < colors.length; c++) {
			if (parseInt(colors[c]) > colors[maxIndex]) {
				maxIndex = c;
			} else if (parseInt(colors[c]) < colors[minIndex]) {
				minIndex = c;
			}
		}
		if(maxIndex == minIndex)
			return '255,0,0';
		colors[maxIndex] = 255;
		colors[minIndex] = 0;
		return colors.join(',');
	};
	
	this.getCBoffset = function (clr) {
		var base = clr.split(',');
		if(!(base[0] == base[1] && base[1] == base[2]))
			for(var i = 7; i < 262; i++) {
				var data = this.cbCtx.getImageData(15,7+i,1,1).data;
				
				if(Math.abs(data[0] - base[0]) < 10 &&
						Math.abs(data[1] - base[1]) < 10 &&
						Math.abs(data[2] - base[2]) < 10)
					return i;
			}
		return 7;
	};
	
	this.drawCB = function (yOffset) {
		// Color Bar
		this.cbCanvas = $create('canvas', {
			'className' : 'colorBar'
		});
		this.cbCanvas.width = 40;
		this.cbCanvas.height = 269;
		this.cbCanvas.style.position = 'relative';
		this.container.appendChild(this.cbCanvas);
		this.cbCtx = this.cbCanvas.getContext('2d');
		this.redrawCB(yOffset);
			
		var SR = this;
		this.cbCanvas.addEventListener('mousedown', function (e) {
			SR.colorPick(e);
			SR.mousePosX = e.pointerX;
			SR.mousePosY = e.pointerY;
			var colordrag = function (e) {SR.colorDrag(e);};
			document.body.addEventListener('mousemove', colordrag, false);
			document.body.addEventListener('mouseup', function (e) {
				document.body.removeEventListener('mousemove', colordrag, false);
				e.preventDefault();
				e.stopPropagation();
			}, false);
		}, false);
	};
	
	this.redrawCB = function (yOffset) {
		this.cbCtx.clearRect(0,0,255,269);
		var rtr = this.cbCtx.createLinearGradient(0,0,0,255);
		rtr.addColorStop(0, 'rgb(255,0,0)');
		rtr.addColorStop(1/6, 'rgb(255,255,0)');
		rtr.addColorStop(1/3, 'rgb(0,255,0)');
		rtr.addColorStop(1/2, 'rgb(0,255,255)');
		rtr.addColorStop(2/3, 'rgb(0,0,255)');
		rtr.addColorStop(5/6, 'rgb(255,0,255)');
		rtr.addColorStop(1, 'rgb(255,0,0)');
		this.cbCtx.fillStyle = rtr;
		this.cbCtx.fillRect(10,7,20,255);
		
		if (typeof(yOffset) != typeof(1)) yOffset = this.getCBoffset(yOffset);
		this.cbCtx.strokeStyle = "rgba(255,255,255,1)";
		this.cbCtx.strokeRect(7,yOffset-2, 26, 5);
		this.cbCtx.strokeStyle = "rgba(0,0,0,1)";
		this.cbCtx.strokeRect(6,yOffset-3,28,7);
	};
	
	this.drawSettings = function () {
		this.settingsDiv = $create('div', {
			'class' : 'gb_colorSettings'
		});
		
		
		this.previewDiv = $create('div', {
			'class' : 'gb_colorPreview',
			'style' : 'background-color: rgb('+this.color+');'
		});
		this.settingsDiv.appendChild(this.previewDiv);
		
		this.redValueInput = $create('input', {
			'type': 'text',
			'class': 'gb_colorInput',
			'id': 'gb_colorInputRed',
			'pattern' : '^([0-1]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])$',
			'maxlength' : 3,
			'value' : this.color.split(',')[0]
		});
		var label = $create('label', {
			'textContent' : 'Red: ',
			'class': 'gb_rgblabel'
		});
		label.appendChild(this.redValueInput);
		this.settingsDiv.appendChild(label);
		
		this.greenValueInput = $create('input', {
			'type': 'text',
			'class': 'gb_colorInput',
			'id': 'gb_colorInputGreen',
			'pattern' : '^([0-1]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])$',
			'maxlength' : 3,
			'value' : this.color.split(',')[1]
		});
		label = $create('label', {
			'textContent' : 'Green: ',
			'class': 'gb_rgblabel'
		});
		label.appendChild(this.greenValueInput);
		this.settingsDiv.appendChild(label);
		
		this.blueValueInput = $create('input', {
			'type': 'text',
			'class': 'gb_colorInput',
			'id': 'gb_colorInputBlue',
			'pattern' : '^([0-1]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])$',
			'maxlength' : 3,
			'value' : this.color.split(',')[2]
		});
		label = $create('label', {
			'textContent' : 'Blue: ',
			'class': 'gb_rgblabel'
		});
		label.appendChild(this.blueValueInput);
		this.settingsDiv.appendChild(label);
		this.hexValue = $create('input', {
			'type': 'text',
			'class': 'gb_hexInput',
			'pattern' : '^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$',
			'maxlength' : 6,
			'value' : this.getHex(this.color)
		});
		label = $create('label', {
			'textContent' : 'Hex: ',
			'class': 'gb_hexlabel'
		});
		label.appendChild(this.hexValue);
		this.settingsDiv.appendChild(label);
		
		var SR = this;
		var chng = function (e) {
			SR.setColor(([SR.redValueInput.value
					,SR.greenValueInput.value
					,SR.blueValueInput.value])
				.join(','));
		};
		this.redValueInput.addEventListener('change', chng, false);
		this.greenValueInput.addEventListener('change', chng, false);
		this.blueValueInput.addEventListener('change', chng, false);
		this.hexValue.addEventListener('change', function () {
			var clr = SR.getRGB(SR.hexValue.value);
			SR.setColor(clr);
			SR.tone = SR.getBaseColor(SR.color);
			SR.redrawCB(SR.tone);
			SR.redrawBW(SR.tone);
		}, false);
		
		var btnDiv = $create('div', {
			'class' : 'gb_colorBtnContainer'
		});
		this.saveButton = $create('input', {
			'type': 'button',
			'value': 'Save',
			'class': 'gb_colorPickerButton'
		});
		btnDiv.appendChild(this.saveButton);
		this.cancelButton = $create('input', {
			'type': 'button',
			'value': 'Cancel',
			'class': 'gb_colorPickerButton'
		});
		btnDiv.appendChild(this.cancelButton);
		this.settingsDiv.appendChild(btnDiv);
		
		this.cancelButton.addEventListener('click', function () {
			SR.undraw();
		}, false);
		this.saveButton.addEventListener('click', function () {
			SR.callback();
			SR.undraw();
		}, false);
		
		this.container.appendChild(this.settingsDiv);
	};
	
	this.colorPick = function (e) {
		e.stopPropagation();
		e.preventDefault();
		if(e.layerY >= 7 && e.layerY < 261) {
			this.redrawCB(e.layerY);
			var data = this.cbCtx.getImageData(25, e.layerY, 1, 1).data;
			
			this.tone = data[0] + ',' + data[1] + ',' + data[2];
			this.redrawBW(this.tone);
		}
	};
	
	this.setColor = function (rgb) {
		this.color = rgb;
		this.previewDiv.style.backgroundColor = 'rgb('+this.color+')';
		this.redValueInput.value = rgb.split(',')[0];
		this.greenValueInput.value = rgb.split(',')[1];
		this.blueValueInput.value = rgb.split(',')[2];
		this.hexValue.value = this.getHex(rgb);
	};
	
	this.colorDrag = function (e) {
		e.stopPropagation();
		e.preventDefault();
		
		/* Find Common Offsets, and subtract them */
		var ly = e.layerY;
		var minval = 7;
		var maxval = 261;
		if(e.originalTarget != this.cbCanvas) {
			var cby = getOffset(this.cbCanvas);
			ly = e.clientY - cby.y;
		}
		ly = Math.max(minval,Math.min(maxval,ly));
		this.redrawCB(ly - minval + 7);
		var data = this.cbCtx.getImageData(25, ly - minval + 7, 1, 1).data;
		
		this.tone = data[0] + ',' + data[1] + ',' + data[2];
		this.redrawBW(this.tone);
	};
	
	this.clickDelegate = function (e) {
		
		/* Find Common Offsets, and subtract them */
		var ly = e.layerY;
		var lx = e.layerX;
		var minval = 0;
		var maxval = 254;
		this.redrawBW(this.tone);
		if(e.originalTarget != this.bwCanvas) {
			var bw = getOffset(this.bwCanvas);
			ly = e.clientY - bw.y;
			lx = e.clientX - bw.x;
		}
		ly = Math.max(minval,Math.min(maxval,ly));
		lx = Math.max(minval,Math.min(maxval,lx));
		var data = this.bwCtx.getImageData(lx, ly, 1, 1).data;
		var selection = data[0] + ',' + data[1] + ',' + data[2];
		
		this.setColor(selection);
		this.drawBWDot(lx, ly);
	};
	
	this.callback = function () {
		for(var cd = 0; cd < this.clickHandles.length; cd++) {
			this.clickHandles[cd](this.color);
		}
	}
	
	this.registerCallback = function (func) {
		this.clickHandles.push(func);
	};
	
	this.unregisterCallback = function (func) {
		if(func) {
			for(var ch = 0; ch < this.clickHandles.length; ch++) {
				if(func == this.clickHandles[ch]) {
					this.clickHandles.splice(ch, 1);
					break;
				}
			}
		} else {
			this.clickHandles = [];
		}
	};
	
	this.undraw = function () {
		$remove(this.container);
	};
	
	this.getHex = function (clr) {
		var cspl = clr.split(',');
		if(cspl.length == 3) {
			return (
				strlpad(parseInt(cspl[0]).toString(16),'0',2)+ '' +
				strlpad(parseInt(cspl[1]).toString(16),'0',2)+ '' +
				strlpad(parseInt(cspl[2]).toString(16),'0',2)+ '');
		}
		return '';
	};
	
	this.getRGB = function (hex) {
		if(hex.length == 3) {
			hex = 
				hex.substr(0,1)+hex.substr(0,1) +
				hex.substr(1,1)+hex.substr(1,1) +
				hex.substr(2,1)+hex.substr(2,1);
		}
		if (hex.length == 6) {
			return (
				parseInt(hex.substr(0,2),16) + ',' +
				parseInt(hex.substr(2,2),16) + ',' +
				parseInt(hex.substr(4,2),16));
		}
		return '';
	};
}
