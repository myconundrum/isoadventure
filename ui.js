

class UIResourceGlobe {

	constructor(pos,frame,gloss,color1,color2) {

		this._frame = new UIGameObject(frame);
		this._gloss = new UIGameObject(gloss);

		this._frame.pos = pos.clone();
		this._gloss.pos = pos.clone();

		this._clipX = pos.x + this._frame.tile.sheet.globalSkewX;
		this._clipY = pos.y + this._frame.tile.sheet.globalSkewY;
		this._radius = this._frame.tile.width * this._frame.tile.sheet.globalScale / 2;
		this._clipWidth = this._radius * 2;
		this._centerX = this._clipX + this._radius;
		this._centerY = this._clipY + this._radius;
		this._gradient = gGraphics.ctx.createRadialGradient(
			this._centerX+this._radius/2,this._centerY-this._radius/3,this._radius/4,
			this._centerX+this._radius/2,this._centerY-this._radius/3,this._radius);
		this._gradient.addColorStop(0,color1);
		this._gradient.addColorStop(1,color2);       
		this._radius -= 4; // make circle slightly smaller so that it does not cover the frame.
		this._percent = .67;
	}

	draw() {
		// draw the resource inside the frame rendered

		// clip so only the remaining percentage of the circle will be rendered.
		gGraphics.ctx.save();
		gGraphics.ctx.rect(
			this._clipX,this._clipY + (1-this._percent) * this._clipWidth,this._clipWidth,this._clipWidth);
		gGraphics.ctx.clip();

		// draw the circle
		gGraphics.ctx.beginPath();
		gGraphics.ctx.arc(this._centerX,this._centerY,this._radius,0,2*Math.PI,false);
		
		// fill with the gradient created in the constructor
		gGraphics.ctx.fillStyle = this._gradient;
		gGraphics.ctx.fill();
		gGraphics.ctx.stroke();

		// restore the ctx (remove the clipping region)
		gGraphics.ctx.restore();
		gGraphics.ctx.beginPath();

		// draw the rest of the graphical elements.
		this._frame.draw();
		this._gloss.draw();
	}
}

class UIResourceLine {

	constructor(pos,color) {
		this._gloss 			= new UIGameObject("xp gloss");
		this._separators 		= new UIGameObject("xp separators");
		this._gloss.pos 		= pos.clone();
		this._separators.pos 	= pos.clone();
		this._color 			= color;
		this._percent 			= .75;
	}

	draw() {

		gGraphics.ctx.fillStyle = this._color;
		gGraphics.ctx.fillRect (
			this._gloss.pos.x + this._gloss.tile.sheet.globalSkewX,
			this._gloss.pos.y + this._gloss.tile.sheet.globalSkewY,
			this._gloss.tile.width * this._gloss.tile.sheet.globalScale * this._percent,
			this._gloss.tile.height * this._gloss.tile.sheet.globalScale);
			
		this._gloss.draw();
		this._separators.draw();
	}
}

class UIHotkeyItem {

	constructor(pos,key) {
		
		this._frame 	= new UIGameObject("action frame");
		this._frame.pos = pos.clone();
	
		switch (key) {
			case "left": 
				this._key = new UIGameObject("left mouse");
				this._key.pos = pos.clone();
				break;
			case "right": 
				this._key = new UIGameObject("right mouse");
				this._key.pos = pos.clone();
				break;
			default: 
				this._key 		= key;
				this._tx 		= pos.x + this._frame.tile.sheet.globalSkewX + 5;
				this._ty 		= pos.y + this._frame.tile.sheet.globalSkewY + 11;
				break;
		}
		
	}

	get width() {return this._frame.tile.width * this._frame.tile.sheet.globalScale;}

	draw() {
		this._frame.draw();
		if (this._key instanceof UIGameObject) {
			this._key.draw();
		} else { 
			gGraphics.text(this._tx, this._ty, this._key);
		}
	}
}

class UIActionBar {
	constructor() {
		this._bar = new UIGameObject("action bar");
		this._bar.pos.set(
			gGraphics.canvas.width/2 - this._bar.sheet.width/2*this._bar.sheet.globalScale,
			gGraphics.canvas.height - this._bar.sheet.height*this._bar.sheet.globalScale);

		this._hotkeys = [];
		var p = this._bar.pos.clone();
		// position hotkeys on the actionbar...
		for (var i = 0; i < 9; i++) {
			var key;
			switch(i) {
				case 0: key = "left";  break;
				case 1: key = "right"; break;
				default: key = (i-2).toString(); 
			}
			this._hotkeys[i] = new UIHotkeyItem(p,key);
			p.add(this._hotkeys[i].width -2  + (i==1 || i==3? 11 : 0),0);	
		}
	}

	get pos() {return this._bar.pos;}

	draw() {
		this._bar.draw();
		for (var hk of this._hotkeys) {
			hk.draw();
		}
	}
}


class GameUI {

	constructor() {
		this._bar 	= new UIActionBar();
		this._hp	= new UIResourceGlobe(this._bar.pos,"hp frame","hp gloss",'#AD2121','#7A0505');
		this._mp	= new UIResourceGlobe(this._bar.pos,"mana frame","mana gloss",'#403DDB','#0A08AE');
		this._xp 	= new UIResourceLine(this._bar.pos,"green");
	}

	update() {
		this._bar.draw();		
		this._hp.draw();
		this._mp.draw();
		this._xp.draw();
	}
}