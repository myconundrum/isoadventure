
//
// graphics subsytem.
//
class GameGraphics {

	constructor() {

		this._canvas 	= document.getElementById("game");
		this._ctx   	= this._canvas.getContext('2d');
		this._bgColor   = "gray";
		this._fontColor = "white"; 
	}

	get canvas() 		{return this._canvas;}
	get ctx() 	 		{return this._ctx;}

	get font() 		   	{return this._ctx.font;}
	set font(v)			{this._ctx.font = v;}

	get bgColor()		{return this._bgColor;}
	set bgColor(v) 		{this._bgColor = v;}

	get fontColor()		{return this._fontColor;}
	set fontColor(v)	{this._fontColor = v;}

	clear() {
		this._ctx.fillStyle = this._bgColor;
		this._ctx.fillRect(0,0,this._canvas.width,this._canvas.height);
	}

	text(x,y,str) {
		this._ctx.fillStyle = this._fontColor;
		this._ctx.fillText(str,x,y);
		this._ctx.fillStyle = this._bgColor;
	}

	drawObject(object) {

		var dx = this.toScreenX(frame,object.loc.x + object.tile.skewX + object.sheet.globalSkewX);
		var dy = this.toScreenY(frame,object.loc.y + object.tile.skewY + object.sheet.globalSkewY);

		this._ctx.drawImage(
			object.sheet.image,
			object.loc.x,
			object.loc.y,
			object.tile.width,
			object.tile.height,
			dx,dy,
			object.tile.width*object.sheet.globalScale,
			object.tile.height*object.sheet.globalScale
			);
	}

	drawTile(x,y,tile) {

		x += tile.skewX;
		y += tile.skewY;
		x += tile.sheet.globalSkewX;
		y += tile.sheet.globalSkewY;

		this._ctx.drawImage(tile.sheet.image,tile.x,tile.y,tile.width,tile.height,
			x,y,tile.width*tile.sheet.globalScale,tile.height*tile.sheet.globalScale);
	}
}
