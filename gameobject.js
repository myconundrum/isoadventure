

class GameObject {

	constructor() {
		this._x = 0;
		this._y = 0;
	}

	get x() {return this._x;}
	get y() {return this._y;}
	
	set x(v) {return this._x = v;}
	set y(v) {return this._y = v;}
}