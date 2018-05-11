var FRAMEMINZ = -1;

//
// graphics subsytem.
//
class GameGraphics {

	constructor() {

		this._canvas 	= document.getElementById("game");
		this._ctx   	= this._canvas.getContext('2d');
		this._frames 	= [];

		//
		// animation metronome, too simplistic.
		//
		this._timer = 0;
		this._screen = this.createFrame("background",0,0,this._canvas.width,this._canvas.height,FRAMEMINZ);
		this._screen.update = screenUpdate;
		this._screen.enabled = true;
	}
	
	//
	// management functions
	//
	doAnimation() {return this._timer % 10 == 0;}

	update() {
		
		this._timer++;
		for (var i = 0; i < this._frames.length; i++) {
			if (this._frames[i].enabled && (this._frames[i].parent == null || this._frames[i].parent.enabled)) {
				this._frames[i].update(this._frames[i]);
			}
		}
	}

	//
	// drawing functions
	//
	toScreenX(frame,x) {
		
		var sx = x + frame.x;

		//
		// handle relative positioning
		// 
		var p = frame.parent;
		while (p) {
			sx += p.x;
			p = p.parent;
		}
		return sx;
	}

	toScreenY(frame,y) {

		var sy = y + frame.y;

		//
		// handle relative positioning
		// 
		var p = frame.parent;
		while (p) {
			sy += p.y;
			p = p.parent;
		}

		return sy;
	}


	clear(frame) {
		
		var sx = this.toScreenX(frame,0);
		var sy = this.toScreenY(frame,0);

		this._ctx.fillStyle = frame.bgColor;
		this._ctx.fillRect(sx,sy,frame.width,frame.height);
	}

	text(frame,x,y,str) {
		
		var sx = this.toScreenX(frame,x);
		var sy = this.toScreenY(frame,y);
		this._ctx.font = frame.font;
		this._ctx.fillStyle = frame.fontColor;
		this._ctx.fillText(str,sx,sy);
	}

	drawTile(frame,x,y,tile) {

		var dx = this.toScreenX(frame,x);
		var dy = this.toScreenY(frame,y);
		this._ctx.drawImage(tile.image,tile.x,tile.y,tile.width,tile.height,dx,dy,tile.width,tile.height);
	}

	drawTileEx(frame,x,y,tile,w,h) {

		y = y - (h - tile.height);

		var dx = this.toScreenX(frame,x);
		var dy = this.toScreenY(frame,y);
		this._ctx.drawImage(tile.image,tile.x,tile.y,w,h,dx,dy,w,h);
	}

	drawSprite(frame,x,y,sprite) {
		var index = sprite.frame + 
			(sprite.spriteSheet.directions.indexOf(sprite.direction) * sprite.spriteSheet.tilesPerLine);
		
		this.drawTile(frame,x,y,sprite.spriteSheet.getTile(index));
	}

	getScreenWidth() 						{return this._screen.width;}
	getScreenHeight() 						{return this._screen.height;}
	
	createFrame(name,x,y,width,height,zOrder) {

		var p 			= new frame();
		p.name 			= name;
		p.x 			= x;
		p.y 			= y;
		p.width 		= width;
		p.height 		= height;

		p.zOrder = zOrder < FRAMEMINZ ? FRAMEMINZ : zOrder;

		console.log("[GFX] New frame created with name " + p.name + ".");

		var i = 0;
		while (i < this._frames.length && this._frames[i].zOrder <= p.zOrder) {
			i++;
		}
		this._frames.splice(i,0,p);

		return p;
	}

	
}

function screenUpdate(frame) {

	gGraphics.clear(frame);
	gGraphics.text(frame,100,100,"Hello World!");
}


//
// frames are subsections of the main canvas.
//
class frame {	

	constructor() {
		//
		// position and width within the overall canvas
		//
		this._x 			= 0;
		this._y 			= 0;
		this._width 		= 0;
		this._height 	= 0;
		this._name		= "unnamed frame";

		this._parent 	= null;

		//
		// background color is waht is used to clear the frame screen.
		//
		this._bgColor 	= "black";

		//
		// frames are rendered in zorder the higher the zorder, the closer to the viewer in the stack.
		//
		this._zOrder 	= -1;

		//
		// only enabled windows can take input and have their update functions called.
		//
		this._enabled 	= false;

		//
		// font and font color
		//
		this._font 		= "16px Courier";
		this._fontColor 	= "white";
		//
		// these hold the functions which are called to update and when mouse is indicated.
		//
		this._update		= function() {/*do nothing*/};
		this._onClick	= function() {/*do nothing*/};
	}

	get x() 			{return this._x;}
	get y() 			{return this._y;}
	get width() 		{return this._width;}
	get	height() 		{return this._height;}
	get	name() 			{return this._name;}
	get	parent() 		{return this._parent;}
	get	bgColor() 		{return this._bgColor;}
	get	zOrder() 		{return this._zOrder;}
	get	enabled() 		{return this._enabled;}
	get	font() 			{return this._font;}
	get	fontColor() 	{return this._fontColor;}
	get	update() 		{return this._update;}
	get	onClick() 		{return this._onclick;}

	set x(v) 			{this._x=v;}
	set y(v) 			{this._y=v;}
	set width(v) 		{this._width=v;}
	set	height(v) 		{this._height=v;}
	set	name(v) 		{this._name=v;}
	set	parent(v) 		{this._parent=v;}
	set	bgColor(v) 		{this._bgColor=v;}
	set	zOrder(v) 		{this._zOrder=v;}
	set	enabled(v) 		{this._enabled=v;}
	set	font(v) 		{this._font=v;}
	set	fontColor(v) 	{this._fontColor=v;}
	set	update(v) 		{this._update=v;}
	set	onClick(v) 		{this._onclick=v;}
}


//
// Sprite is an individual sprite which keeps track of current animation through the
// associated spritesheet.
//
class Sprite {

	constructor(spriteSheet) {

		this._spriteSheet 	= spriteSheet;
		this._direction 	= "north";
		this._defaultAction = "stand";
		this._curAction 	= "stand";
		this._curFrame		= 0;
		this._looping		= false;

	}

	get spriteSheet() 		{return this._spriteSheet;}
	get direction() 		{return this._direction;}
	get looping()			{return this._looping;}
	get action() 			{return this._curAction;}
	get defaultAction() 	{return this._defaultAction;}
	get frame() 			{return this._curFrame;}


	set spriteSheet(v) 		{this._spriteSheet = v;}
	set direction(v) 		{this._direction = v;}
	set looping(v)			{this._looping = v;}
	set action(v) 			{this._curAction = v;}
	set defaultAction(v) 	{this._defaultAction = v;}
	set frame(v)			{this._curFrame = v;}

	animate() {

		this._curFrame++;
		if (this._curFrame > this.spriteSheet.actions[this._curAction].stop) {
			if (!this._looping) {
				this._curAction = this._defaultAction;
			}
			else {
				this._curFrame = this.spriteSheet.actions[this._curAction].start;
			}
		}
	}
}

class Tile {

	constructor(image,x,y,width,height) {
		this._x 			= x;
		this._y 			= y;
		this._img 			= image;
		this._width 		= width;
		this._height 		= height;
	}

	get x() 				{return this._x;}
	get y() 				{return this._y;}
	get width() 			{return this._width;}
	get height() 			{return this._height;}
	get image() 			{return this._img;}

	set x(v) 				{this._x = v;}
	set y(v) 				{this._y = v;}
	set width(v) 			{this._width = v;}
	set height(v) 			{this._height = v;}
	set image(v) 			{this._img = v;}
	
}


/*
	Tilesheet class deals with PNGs of mulitple graphics.
*/

class TileSheet {

	constructor(path,width,height,baseWidth,baseHeight) {
		
		//
		// private class variables
		//
		this._path 				= path;
		this._tileWidth 		= width;
		this._tileHeight 		= height;
		this._baseWidth 		= baseWidth;
		this._baseHeight		= baseHeight;
		this._img 				= new Image();
	
		//
		// deferred image load
		//
		var thisref = this;
		this._img.onload = function() {

			console.log("Loaded TileSheet from " + path + ".");
			console.log("(w,h): (",thisref._img.naturalWidth.toString() + "," + thisref._img.naturalHeight.toString() +").");

			thisref._tilesPerLine 	= thisref._img.naturalWidth/thisref._tileWidth;
			thisref._numLines 		= thisref._img.naturalHeight/thisref._tileHeight;
			thisref._maxIndex 		= thisref._tilesPerLine * thisref._numLines - 1;

			console.log("   " + (thisref._tilesPerLine * thisref._numLines).toString() + " " + thisref._tileWidth.toString() + "X" + 
				thisref._tileHeight.toString() + " tiles loaded.");

		};

		this._img.src = this._path;
	}

	get image() 		{return this._img;}
	get tilesPerLine() 	{return this._tilesPerLine;}
	get numLines() 		{return this._numLines;}
	get maxIndex()		{return this._maxIndex;}
	get tileWidth()		{return this._tileWidth;}				// the width in pixels of each tile in the sheet.
	get tileHeight() 	{return this._tileHeight;}				// the height in pixels of each tile in the sheet.
	get baseWidth()		{return this._baseWidth;}				// the width of a floor tile
	get baseHeight() 	{return this._baseHeight;}				// the height of a floor tile.


	tileX(index) {return parseInt(index%this._tilesPerLine) * this._tileWidth;}
	tileY(index) {return parseInt(index/this._tilesPerLine) * this._tileHeight;}

	getTile(index) {
		return new Tile(this.image,this.tileX(index),this.tileY(index),this.tileWidth,this.tileHeight);
	}
}



class Animation {

	constructor (name,start,stop) {
		this._name = name;
		this._start = start;
		this._stop = stop;
	}

	get name() 			{return this._name;}
	get start() 		{return this._start;}
	get stop() 			{return this._stop;}

	set name(v) 		{this._name=v;}
	set start(v) 		{this._start=v;}
	set stop(v) 		{this._stop=v;}
}

class SpriteSheet extends TileSheet {

	constructor (path,width,height,baseWidth,baseHeight,name,directions,actions) {
		
		super(path,width,height,baseWidth,baseHeight);

		this._name 			= name;
		this._actions 		= {};
		this._directions 	= directions;

		var start = 0;
		var stop = 0;

		for (var i = 0; i < actions.length; i++) {
			stop = start + actions[i][1] - 1;
			var anim = new Animation(actions[i][0],start,stop);
			this._actions[anim.name] = anim; 
			start = stop+1;	
		}
	}


	get name() 			{return this._name;}
	get directions() 	{return this._directions;}
	get actions() 		{return this._actions;}
}



