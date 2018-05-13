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

		x += tile.skewX;
		y += tile.skewY;

		var dx = this.toScreenX(frame,x);
		var dy = this.toScreenY(frame,y);
		this._ctx.drawImage(tile.sheet.image,tile.x,tile.y,tile.width,tile.height,dx,dy,tile.width,tile.height);
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

	get canvas() {return this._canvas;}
	
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
				this._curFrame = this.spriteSheet.actions[this._curAction].start;
			}
			else {
				this._curFrame = this.spriteSheet.actions[this._curAction].start;
			}
		}
	}
}


