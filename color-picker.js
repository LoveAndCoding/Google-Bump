/**
  *	General Purpose Color Picker
  */
function color_picker(color) {
	
	this.clickHandles = [];
	this.color = color;
	this.bwCanvas;
	this.bwCtx;
	this.cbCanvas;
	this.cbCtx;
	this.container;
	
	this.draw = function (attachedNode) {
		this.container = $create('div', {
			'className' : 'colorContainer'
		});
		this.drawBW(this.color);
		this.drawCB(0);
		
		document.body.appendChild(this.container);
	};
	
	this.drawBW = function (tone) {
		if(!tone) {
			tone = '255,0,0';
		}
		
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
		this.bwCanvas.addEventListener('click', function (e) { SR.clickDelegate(e) }, false);
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
	
	this.drawCB = function (yOffset) {
		// Color Bar
		this.cbCanvas = $create('canvas', {
			'className' : 'colorBar'
		});
		this.cbCanvas.width = 40;
		this.cbCanvas.height = 255;
		this.cbCanvas.style.position = 'relative';
		this.container.appendChild(this.cbCanvas);
		this.cbCtx = this.cbCanvas.getContext('2d');
		this.redrawCB(yOffset);
			
		var SR = this;
		this.cbCanvas.addEventListener('click', function (e) { SR.colorPick(e) }, false);
	};
	
	this.redrawCB = function (yOffset) {
		this.cbCtx.clearRect(0,0,255,255);
		var rtr = this.cbCtx.createLinearGradient(0,0,0,255);
		rtr.addColorStop(0, 'rgb(255,0,0)');
		rtr.addColorStop(1/6, 'rgb(255,255,0)');
		rtr.addColorStop(1/3, 'rgb(0,255,0)');
		rtr.addColorStop(1/2, 'rgb(0,255,255)');
		rtr.addColorStop(2/3, 'rgb(0,0,255)');
		rtr.addColorStop(5/6, 'rgb(255,0,255)');
		rtr.addColorStop(1, 'rgb(255,0,0)');
		this.cbCtx.fillStyle = rtr;
		this.cbCtx.fillRect(10,0,20,255);
		
		this.cbCtx.strokeStyle = "rgba(255,255,255,1)";
		this.cbCtx.strokeRect(7,yOffset-2, 26, 5);
		this.cbCtx.strokeStyle = "rgba(0,0,0,1)";
		this.cbCtx.strokeRect(6,yOffset-3,28,7);
	};
	
	this.colorPick = function (e) {
		e.stopPropagation();
		e.preventDefault();
		if(e.layerX >= 10 && e.layerX < 30) {
			var data = this.cbCtx.getImageData(e.layerX, e.layerY, 1, 1).data;
			
			this.redrawCB(e.layerY);
			
			this.color = data[0] + ',' + data[1] + ',' + data[2];
			this.redrawBW(this.color);
		}
	};
	
	this.clickDelegate = function (e) {
		var data = this.bwCtx.getImageData(e.layerX, e.layerY, 1, 1).data;
		var selection = data[0] + ',' + data[1] + ',' + data[2];
		
		for(var cd = 0; cd < this.clickHandles.length; cd++) {
			this.clickHandles[cd](e, selection);
		}
	};
	
	this.registerClick = function (func) {
		this.clickHandles.push(func);
	};
	
	this.unregisterClick = function (func) {
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
}
