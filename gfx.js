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
	this.init = function() {

		this.screen = this.createFrame("background",0,0,this.canvas.width,this.canvas.height,FRAMEMINZ);
		this.setFrameUpdateFn(this.screen,screenUpdate);
		this.setFrameEnabled(this.screen,true);
	}

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



//
// TileShets are for reading and manipulating a tilesheet.
//
function TileSheet(path,width,height) {

	this.path = path;
	this.tileWidth = width;
	this.tileHeight = height;
	
	this.img = new Image();
	var thisref = this;

	
	this.img.onload = function() {

		console.log("Loaded TileSheet from " + path + ".");

		console.log("(w,h): (",thisref.img.naturalWidth.toString() + "," + thisref.img.naturalHeight.toString() +").");

		thisref.tilesPerLine 	= thisref.img.naturalWidth/thisref.tileWidth;
		thisref.numLines 		= thisref.img.naturalHeight/thisref.tileHeight;
		thisref.maxIndex 		= thisref.tilesPerLine * thisref.numLines - 1;


		console.log("   " + (thisref.tilesPerLine * thisref.numLines).toString() + " " + thisref.tileWidth.toString() + "X" + 
			thisref.tileHeight.toString() + " tiles loaded.");

	};

	this.img.src = this.path;

	this.getTileX 			= function(index) 	{return parseInt(index%this.tilesPerLine) * this.tileWidth;}
	this.getTileY 			= function(index) 	{return parseInt(index/this.tilesPerLine) * this.tileHeight;}
	this.getTilesPerLine 	= function() 		{return this.tilesPerLine;}
	this.getMaxIndex		= function()		{return this.maxIndex;}
	this.getTileWidth		= function()		{return this.tileWidth;}
	this.getTileHeight		= function() 		{return this.tileHeight;}

	this.drawTile			= function(frame,x,y,index) {
		var dx = gGraphics.toScreenX(frame,x);
		var dy = gGraphics.toScreenY(frame,y);
		gGraphics.ctx.drawImage(
			this.img,
			this.getTileX(index),this.getTileY(index),this.tileWidth,this.tileHeight,
			dx,dy,this.tileWidth,this.tileHeight);
	}
}



