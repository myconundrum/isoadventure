

var DEFAULTSPRITE = "goblin"
var DEFAULTTILE = "chest closed"


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

	constructor() {
		this._loc = new Point(0,0);
		this._tile = 0;
	}

	get loc() 		{return this._loc;}
	set loc(v) 		{this._loc = v;}

	get tile() 		{return this._tile;}
	set tile(v)		{this._tile = v;}
}


class Actor extends GameObject {

	constructor() {
		super();
		this._sprite = new Sprite(gAssets.sprites(DEFAULTSPRITE));
	}

	get sprite() 			{return this._sprite;}
	set sprite(v)			{this._sprite = v;}

	setDirection(dx,dy) {
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

		this.sprite.direction = northsouth+eastwest;
	}

	move(dx,dy) {
		setDirection(dx,dy);
		this._x += dx;
		this._y += dy;
	}

	update() {
		if (gGraphics.doAnimation()) {
			this._sprite.animate();
		}
	}

}