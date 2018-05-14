

class Point {

	constructor(x,y) {
		this._x = x;
		this._y = y;
	}

	get x() 		{return this._x;}
	get y() 		{return this._y;}
	set x(v) 		{this._x = v;}
	set y(v) 		{this._y = v;}

	// returns a new point that is the isometric projection of the cartesian point.
	toIsometric() {return new Point(this._x - this._y,(this._x + this._y)/2);}

	// returns a new point that is the cartesian projection of an isometric point.
	toCartesian() {return new Point ((2*this._y + this.x)/2,(2*this._y - this.x)/2);}
}

class GameObject {

	constructor(sheet) {
		this._loc 	= new Point(0,0);
		this._tile 	= null;
		this._sheet = gAssets.tileSheets[sheet];
	}

	get sheet() 	{return this._sheet;}
	set sheet(v) 	{this._sheet = v;}

	get loc() 		{return this._loc;}
	set loc(v) 		{this._loc = v;}

	get tile() 		{return this._tile;}
	set tile(v)		{this._tile = v;}

	draw() {

	}
}


class EmptyGameObject extends GameObject {

	constructor(sheet) {
		super(sheet);
	}

	draw() {};
}

class AnimatedGameObject extends GameObject {

	constructor(sheet) {
		super(sheet);

		this._frame = 0;
		this._animation = null;
		this._direction = "";
		this._looping = false;
		this._start = gTime.now;
		this._playing = false;
	}

	get frame() 		{return this._frame;}
	get animation() 	{return this._animation;}
	get direction() 	{return this._direction;}
	get looping() 		{return this._looping;}
	get start()			{return this._time;}
	get playing()		{return this._playing;}

	set frame(v) 		{this._frame = v;}
	set animation(v) 	{this._animation = v;}
	set direction(v) 	{this._direction = v;}
	set looping(v) 		{this._looping = v;}
	set start(v)		{this._time = v;}
	set playing(v)		{this._playing = v}

	playAnimation(name,loop) {
		this._animation = this.sheet.animations[name];
		if (this._animation == undefined) {
			console.log("No animation found named " + name + ".");
		}

		this._frame 	= this._animation.start;
		this._start 	= gTime.now;
		this._looping 	= loop;
		this._playing 	= true;
	}

	get tile() {

		this._frame = parseInt(((gTime.now - this._start) / this._animation.duration) * (this._animation.frames)); 
		if (this._frame >= this._animation.start + this._animation.frames) {
			if (this._looping) {
				this._start = gTime.now;
				this._frame = 0;
			}
			else {
				this._playing = false;
			}
		}

		if (this._direction != "") {
			this._frame = this._frame + (this._sheet.directions.indexOf(this._direction) * this._sheet.tilesPerLine);
		}

		return this._sheet.getTileByIndex(this._animation.start + this._frame);

	}
}


function getNamedDirection(dx,dy) {

	var northsouth = ""
	var eastwest = ""

	if (dy < 0) {
		northsouth = "north";
	} else if (dy >0) {
		northsouth = "south"
	}

	if (dx < 0) {
		eastwest = "west";
	} else if (dx >0) {
		eastwest = "east"
	}

	return northsouth + eastwest;
}
