var FRAMEMINZ = -1;

//
// graphics subsytem.
//
function GameGraphics() {
	
	this.canvas 	= document.getElementById("game");
	this.ctx   		= this.canvas.getContext('2d');
	this.frames 	= [];


	//
	// animation metronome, too simplistic.
	//
	this.timer = 0;
	this.doAnimation = function() {return this.timer % 10 == 0;}

	//
	// management functions
	//
	this.update = function() {
		this.timer++;
		for (i = 0; i < this.frames.length; i++) {
			if (this.frames[i].enabled && (this.frames[i].parent == null || this.frames[i].parent.enabled)) {
				this.frames[i].update(this.frames[i]);
			}
		}
	}

	//
	// drawing functions
	//
	this.toScreenX = function(frame,x) {
		
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

	this.toScreenY = function(frame,y) {

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


	this.clear = function(frame) {
		var sx = this.toScreenX(frame,0);
		var sy = this.toScreenY(frame,0);

		this.ctx.fillStyle = frame.bgColor;
		this.ctx.fillRect(sx,sy,frame.width,frame.height);
	}

	this.text = function(frame,x,y,str) {
		
		var sx = this.toScreenX(frame,x);
		var sy = this.toScreenY(frame,y);
		this.ctx.font = frame.font;
		this.ctx.fillStyle = frame.fontColor;
		this.ctx.fillText(str,sx,sy);
	}

	this.drawTile = function(frame,x,y,tile) {

		var dx = this.toScreenX(frame,x);
		var dy = this.toScreenY(frame,y);
		this.ctx.drawImage(tile.image,tile.x,tile.y,tile.width,tile.height,dx,dy,tile.width*2,tile.height*2);
	}

	this.drawSprite = function(frame,x,y,sprite,action,direction,index) {

		var start = this.spriteSheets[sprite].actions[action].start;
		
		start += index;
		start += (this.spriteSheets[sprite].directions.indexOf(direction) * this.sprites[sprite].tileSheet.getTilesPerLine());


		this.spriteSheets[sprite].tileSheet.drawTile(frame,x,y,start);

	}
	this.spriteActionStart = function(sprite,action) {return this.sprites[sprite].actions[action].start;}
	this.spriteActionStop = function(sprite,action) {return this.sprites[sprite].actions[action].stop;}

	//
	// frame management functions
	//
	this.setFrameEnabled 	= function(frame,enable) 		{frame.enabled = enable;}
	this.setFrameUpdateFn 	= function(frame,update) 		{frame.update = update;}
	this.setFrameOnClickFn 	= function(frame,onClick) 		{frame.onClick = onClick;}
	this.setFrameBgColor 	= function(frame,color) 		{frame.bgColor = color;}
	this.setFramePosition 	= function(frame,x,y) 			{frame.x = x;frame.y = y;}
	this.setFrameSize 		= function(frame,width,height) 	{frame.width = width;frame.height = height;}
	this.setFrameFont 		= function(frame,font,color) 	{frame.font = font;frame.fontColor = color;}
	this.setFrameParent 	= function(frame,parent) 		{frame.parent = parent;}
	this.getFrameWidth 		= function(frame) 				{return frame.width;}
	this.getFrameHeight 	= function(frame) 				{return frame.height;}
	this.getFrameX 			= function(frame) 				{return frame.x;}
	this.getFrameY 			= function(frame) 				{return frame.y;}

	this.getScreenWidth 	= function() 					{return this.screen.width;}
	this.getScreenHeight 	= function() 					{return this.screen.height;}
	

	this.createFrame = function(name,x,y,width,height,zOrder) {

		var p 			= new frame();
		p.name 			= name;
		p.x 			= x;
		p.y 			= y;
		p.width 		= width;
		p.height 		= height;

		p.zOrder = zOrder < FRAMEMINZ ? FRAMEMINZ : zOrder;

		console.log("[GFX] New frame created with name " + p.name + ".");

		var i = 0;
		while (i < this.frames.length && this.frames[i].zOrder <= p.zOrder) {
			i++;
		}
		this.frames.splice(i,0,p);

		return p;
	}

	this.screen = this.createFrame("background",0,0,this.canvas.width,this.canvas.height,FRAMEMINZ);
	this.setFrameUpdateFn(this.screen,screenUpdate);
	this.setFrameEnabled(this.screen,true);

}

function screenUpdate(frame) {

	gGraphics.clear(frame);
	gGraphics.text(frame,100,100,"Hello World!");
}


//
// frames are subsections of the main canvas.
//
function frame() {	

	//
	// position and width within the overall canvas
	//
	this.x 			= 0;
	this.y 			= 0;
	this.width 		= 0;
	this.height 	= 0;

	this.name		= "unnamed frame";

	this.parent 	= null;

	//
	// background color is waht is used to clear the frame screen.
	//
	this.bgColor 	= "black";

	//
	// frames are rendered in zorder the higher the zorder, the closer to the viewer in the stack.
	//
	this.zOrder 	= -1;

	//
	// only enabled windows can take input and have their update functions called.
	//
	this.enabled 	= false;

	//
	// font and font color
	//
	this.font 		= "16px Courier";
	this.fontColor 	= "white";
	//
	// these hold the functions which are called to update and when mouse is indicated.
	//
	this.update		= function() {/*do nothing*/};
	this.onClick	= function() {/*do nothing*/};
}




function Sprite(name) {

	this.facing 			= "north";
	this.action 			= "stand";
	this.template 			= template;
	this.animIndex 			= 0;
	this.nextactions		=[];

	this.play = function(action,loop) {
		this.action = action;
	}
}


function Animation(name,start,stop) {

	this.name = name;
	this.start = start;
	this.stop = stop;

}








/*
	The Tile class holds a subsection of an image, typically returned from spritesheet 
	or tilesheet class calls.

*/

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

	constructor(path,width,height) {
		
		//
		// private class variables
		//
		this._path 				= path;
		this._tileWidth 		= width;
		this._tileHeight 		= height;
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
	get tileWidth()		{return this._tileWidth;}
	get tileHeight() 	{return this._tileHeight;}

	tileX(index) {return parseInt(index%this._tilesPerLine) * this._tileWidth;}
	tileY(index) {return parseInt(index/this._tilesPerLine) * this._tileHeight;}

	getTile(index) {
		return new Tile(this.image,this.tileX(index),this.tileY(index),this.tileWidth,this.tileHeight);
	}
}

class SpriteSheet extends TileSheet {

	constructor (path,width,height,name,directions,actions) {
		super(path,width,height);

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

	get name() {return this._name;}
}



