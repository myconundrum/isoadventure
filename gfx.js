class GameGraphics {

	constructor() {

		this._canvas 	= document.getElementById("game");
		this._ctx   	= this._canvas.getContext('2d');
		this._bgColor   = "gray";
		this._fontColor = "white"; 


		// transform and inverse transform used to scale graphics with zoom and pan, and 
		// then convert back.
		this._transform = [1,0,0,1,0,0];
		this._inverseTransform = [1,0,0,1];


	}

	get canvas() 		{return this._canvas;}
	get ctx() 	 		{return this._ctx;}

	get font() 		   	{return this._ctx.font;}
	set font(v)			{this._ctx.font = v;}

	get bgColor()		{return this._bgColor;}
	set bgColor(v) 		{this._bgColor = v;}

	get fontColor()		{return this._fontColor;}
	set fontColor(v)	{this._fontColor = v;}

	// reset the display (reset transform and clear screen)
	clear() {
		this.resetTransform();
		this._ctx.fillStyle = this._bgColor;
		this._ctx.fillRect(0,0,this._canvas.width,this._canvas.height);
	}


	text(x,y,str) {
		this._ctx.fillStyle = this._fontColor;
		this._ctx.fillText(str,x,y);
		this._ctx.fillStyle = this._bgColor;
	}

	resetTransform() {this._ctx.resetTransform();}

	// taken from stack overflow. Nice solution.
	setTransform(offsetX,offsetY,scale) {

		var m; 				// just to make it easier to type and read
		var im; 			// just to make it easier to type and read
		var cross;

		this.resetTransform();

		this._transform = [1,0,0,1,0,0];
		this._inverseTransform = [1,0,0,1];

		m = this._transform;
		im = this._inverseTransform;

		// create the rotation and scale parts of the matrix (we assume zero rotation)
		m[3] =   m[0] = Math.cos(0) * scale;
		m[2] = -(m[1] = Math.sin(0) * scale);

		// add the translation
		m[4] = offsetX;
		m[5] = offsetY;

		// calculate the inverse transformation

		// first get the cross product of x axis and y axis
		cross = m[0] * m[3] - m[1] * m[2];

		// now get the inverted axis
		im[0] =  m[3] / cross;
		im[1] = -m[1] / cross;
		im[2] = -m[2] / cross;
		im[3] =  m[0] / cross;

		this._ctx.setTransform(
			this._transform[0],
			this._transform[1],
			this._transform[2],
			this._transform[3],
			this._transform[4],
			this._transform[5]);
	}

	untransformPoint(p) {

		var rp = new Point(p.x - this._transform[4],p.y - this._transform[5]);
		
		rp.x = rp.x * this._inverseTransform[0] + rp.y * this._inverseTransform[2];
		rp.y = rp.x * this._inverseTransform[1] + rp.y * this._inverseTransform[3];

		return rp;
	}

	
	drawTile(x,y,tile) {

		x = x + tile.skewX + tile.sheet.globalSkewX;
		y = y + tile.skewY + tile.sheet.globalSkewY;

		this._ctx.drawImage(tile.sheet.image,
			tile.x,tile.y,tile.width,tile.height,
			x,y,tile.width*tile.sheet.globalScale,tile.height*tile.sheet.globalScale);
	}
}
