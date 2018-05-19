

class GameUI {

	constructor() {

		this._actionBar 	= new UIGameObject("action bar");
		this._xpGloss 		= new UIGameObject("xp gloss");
		this._xpSeparators	= new UIGameObject("xp separators");
		this._actions = [
			new UIGameObject("action frame"),
			new UIGameObject("action frame"),
			new UIGameObject("action frame"),
			new UIGameObject("action frame"),
			new UIGameObject("action frame"),
			new UIGameObject("action frame"),
			new UIGameObject("action frame")
			];

		this._hpFrame 		= new UIGameObject("hp frame");	 
		this._hpGloss 		= new UIGameObject("hp gloss");	 
		this._mpFrame 		= new UIGameObject("mana frame");	 
		this._mpGloss 		= new UIGameObject("mana gloss");	 
	
		
		this._actionBar.pos.set(
			gGraphics.canvas.width/2 - this._actionBar.sheet.width/2*this._actionBar.sheet.globalScale,
			gGraphics.canvas.height - this._actionBar.sheet.height*this._actionBar.sheet.globalScale);

		var p = this._actionBar.pos.clone();

		for (var i = 0; i < this._actions.length; i++) {

			this._actions[i].pos = p.clone();
			p.add(this._actions[i].tile.width*this._actions[i].sheet.globalScale,0);
			if (i==1) {
				p.add(95,0);
			}

		}

		// actionbar elements are all relative to the actionbar. Control positioning with skewx,skewy in the 
		// config file.
		this._xpGloss.pos 		= this._actionBar.pos.clone();
		this._xpSeparators.pos 	= this._actionBar.pos.clone();
		this._hpFrame.pos	 	= this._actionBar.pos.clone();
		this._hpGloss.pos 		= this._actionBar.pos.clone();
		this._mpFrame.pos	 	= this._actionBar.pos.clone();
		this._mpGloss.pos 		= this._actionBar.pos.clone();
		
	}

	drawActionBar() {

		this._actionBar.draw();

	}

	drawActions() {
		for (var i = 0; i < this._actions.length;i++) {
			this._actions[i].draw();
		}
	}

	drawEllipse(x,y,rx,ry) {

			gGraphics.ctx.beginPath() ;

			gGraphics.ctx.fillStyle = "#FFFFFF";

    		var rotation      = 0;           // The rotation of the ellipse (in radians)
    		var start         = 0;           // The start angle (in radians)
    		var end           = 2 * Math.PI; // The end angle (in radians)
    		var anticlockwise = false;       // Whether the ellipse is drawn in a clockwise direction or
                                     // anti-clockwise direction
    
    		gGraphics.ctx.ellipse(x, y, rx, ry, rotation, start, end, anticlockwise);
			gGraphics.ctx.stroke() ;
			gGraphics.ctx.fill();
	}


	drawResourceCircle(x,y,r,percent,c1,c2) {

		var w = r * 2;

		gGraphics.ctx.save();

		gGraphics.ctx.rect(x,y + (1-percent) * w,w,w);
		gGraphics.ctx.clip();

		x += r;
		y += r;

		// hack to draw inside frame.
		r -= 4;

		//draw circle
		gGraphics.ctx.beginPath();
		gGraphics.ctx.arc(x,y,r,0,2*Math.PI,false);

		var gradient = gGraphics.ctx.createRadialGradient(x+r/2,y-r/3,r/4,x+r/2,y-r/3,r);
		gradient.addColorStop(0,c1);
		gradient.addColorStop(1,c2);       
		gGraphics.ctx.fillStyle = gradient;
		gGraphics.ctx.fill();
		gGraphics.ctx.stroke();


		gGraphics.ctx.restore();
		gGraphics.ctx.beginPath();

	}

	drawHP(percent) {

		this.drawResourceCircle(
			this._hpFrame.pos.x + this._hpFrame.tile.sheet.globalSkewX,
			this._hpFrame.pos.y + this._hpFrame.tile.sheet.globalSkewY,
			this._hpFrame.tile.width  * this._hpFrame.tile.sheet.globalScale / 2,
			percent,'#AD2121','#7A0505');		
		
		this._hpFrame.draw();
		this._hpGloss.draw();

	}


	drawMP(percent) {

		this.drawResourceCircle(
			this._mpFrame.pos.x + this._mpFrame.tile.sheet.globalSkewX,
			this._mpFrame.pos.y + this._mpFrame.tile.sheet.globalSkewY,
			this._mpFrame.tile.width  * this._mpFrame.tile.sheet.globalScale / 2,
			percent,'#403DDB','#0A08AE');		
		
		this._mpFrame.draw();
		this._mpGloss.draw();

	}

	drawResourceLine(x,y,width,height,percent,color) {
		gGraphics.ctx.fillStyle = color;
		gGraphics.ctx.fillRect(x,y,width*percent,height);
	}

	drawXP(percent) {

		// adjust xp bar width to current percentage
		//var xpWidth = this._xpFill.tile.width;
		//this._xpGloss.tile.width = xpWidth * percent;

		this.drawResourceLine(
			this._xpGloss.pos.x + this._xpGloss.tile.sheet.globalSkewX,
			this._xpGloss.pos.y + this._xpGloss.tile.sheet.globalSkewY,
			this._xpGloss.tile.width * this._xpGloss.tile.sheet.globalScale,
			this._xpGloss.tile.height * this._xpGloss.tile.sheet.globalScale,
			percent, 'green');

		this._xpGloss.draw();
		this._xpSeparators.draw();

		// restore xp tile width.
		//this._xpFill.tile.width = xpWidth;
		//this._xpGloss.tile.width = xpWidth;
	
	}

	update() {
		this.drawActionBar();
		this.drawXP(.5);
		this.drawHP(.75);	
		this.drawMP(.33);
		this.drawActions();

		//this.drawEllipse();
	}




}