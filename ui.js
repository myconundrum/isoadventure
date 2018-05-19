

class GameUI {

	constructor() {
		this._actionBar 	= new UIGameObject("action bar");
		this._xpFill		= new UIGameObject("xp fill");
		this._xpGloss 		= new UIGameObject("xp gloss");
		this._xpSeparators	= new UIGameObject("xp separators");

		this._abScale = .6;

		this._actionBar.pos.set(
			gGraphics.canvas.width/2 - this._actionBar.sheet.width/2*this._actionBar.sheet.globalScale,
			gGraphics.canvas.height - this._actionBar.sheet.height*this._actionBar.sheet.globalScale);
			

		this._xpFill.pos = this._xpGloss.pos = this._xpSeparators.pos = this._actionBar.pos;
	}

	drawActionBar() {

		this._actionBar.draw();

		//gGraphics.ctx.drawImage(this._actionBar.img,
		//	this._abX,this._abY,this._actionBar.img.width*this._abScale,this._actionBar.img.height*this._abScale);

	}

	drawXP(percent) {

		// adjust xp bar width to current percentage
		var xpWidth = this._xpFill.tile.width;
		this._xpFill.tile.width = xpWidth * percent;
		this._xpGloss.tile.width = xpWidth * percent;

		this._xpFill.draw();
		this._xpGloss.draw();
		this._xpSeparators.draw();

		// restore xp tile width.
		this._xpFill.tile.width = xpWidth;
		this._xpGloss.tile.width = xpWidth;
	
	}

	update() {
		this.drawActionBar();
		this.drawXP(.45);	
	}




}