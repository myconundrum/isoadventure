
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}


//
// global timer 
//
class GameTimer {

	constructor() {
		this._startTime 		= new Date();
		this._lastTime			= new Date();
		this._curTime 			= new Date();
		this._elapsedSinceStart = this._curTime - this._startTime;
		this._elapsedSinceLast 	= this._curTime - this._lastTime;
	}

	update() {
		var nTime = new Date();
		this._elapsedSinceLast 	= nTime - this._lastTime;
		this._elapsedSinceStart = nTime - this._startTime;
		this._lastTime 			= this._curTime;
		this._curTime 			= nTime; 
	}

	get start() 				{return this._startTime;}
	get now()  					{return this._curTime;}
	get last() 					{return this._lastTime;}
	get deltaStart() 			{return this._elapsedSinceStart;}
	get deltaTime() 			{return this._elapsedSinceLast;}

}

class Debug {

	constructor() {
		this._curTile = 0;
		this._showTile = false;
		this._debugMode = false;
		this._tileSheet = gAssets.tileSheets["goblin"];
	}

	get curTile() 		{return this._curTile;}
	get showTile() 		{return this._showTile;}
	get debugMode() 	{return this._debugMode;}
	get tileSheet() 	{return this._tileSheet;}

	set curTile(v) 		{this._curTile = v;}
	set showTile(v) 	{this._showTile = v;}
	set debugMode(v) 	{this._debugMode = v;}
	set tileSheet(v) 	{this._tileSheet = v;}
}

// Simple point class including common operations for the game.
class Point {

	constructor(x,y) 	{this.set(x,y);}
	clone() 			{return new Point(this._x,this._y);}
	get x() 			{return this._x;}
	get y() 			{return this._y;}
	set x(v) 			{this._x = v;}
	set y(v) 			{this._y = v;}

	// return converted new points.
	toScreen() 	{return new Point(gMap.mapToScreenX(this._x,this._y),gMap.mapToScreenY(this._x,this._y));}
	toMap() 	{return new Point(gMap.screenToMapX(this._x,this._y),gMap.screenToMapY(this._x,this._y));}
	toString() 	{return "("+this._x.toFixed(3)+","+this._y.toFixed(3)+")";}

	equal(x,y) {	

		if (x instanceof Point) {
			return x._x == this._x && x._y == this._y;
		}
		return this._x == x && this._y == y;
	}

	set (x,y) {

		if (x instanceof Point) {
			this._x = x.x;
			this._y = x.y;

		} else {
			this._x = x;
			this._y = y;
		}
	}

	distance(x,y) {

		if (x instanceof Point) {
			return Math.sqrt((this._x-x._x)*(this._x-x._x) + (this._y - x._y)*(this._y-x._y));	
		}

		return  Math.sqrt((this._x-x)*(this._x-x) + (this._y - y)*(this._y-y));	
	}

	add(x,y) {

		if (x instanceof Point) {
			this._x += x._x ;
			this._y += x._y;
		}
		else {
			this._x += x;
			this._y += y;
		}
	}

	sub(x,y) {

		if (x instanceof Point) {
			this._x -= x._x ;
			this._y -= x._y;
		}
		else {
			this._x -= x;
			this._y -= y;
		}
	}
}