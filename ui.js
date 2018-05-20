

class UIResourceGlobe {

	constructor(pos,frame,gloss,color1,color2) {

		this._frame = new UIGameObject(frame);
		this._gloss = new UIGameObject(gloss);

		this._frame.pos = pos.clone();
		this._gloss.pos = pos.clone();

		this._clipX = pos.x + this._frame.tile.sheet.globalSkewX;
		this._clipY = pos.y + this._frame.tile.sheet.globalSkewY;
		this._radius = this._frame.tile.width * this._frame.tile.sheet.globalScale / 2;
		this._clipWidth = this._radius * 2;
		this._centerX = this._clipX + this._radius;
		this._centerY = this._clipY + this._radius;
		this._gradient = gGraphics.ctx.createRadialGradient(
			this._centerX+this._radius/2,this._centerY-this._radius/3,this._radius/4,
			this._centerX+this._radius/2,this._centerY-this._radius/3,this._radius);
		this._gradient.addColorStop(0,color1);
		this._gradient.addColorStop(1,color2);       
		this._radius -= 4; // make circle slightly smaller so that it does not cover the frame.
		this._percent = .67;
	}

	draw() {
		// draw the resource inside the frame rendered

		// clip so only the remaining percentage of the circle will be rendered.
		gGraphics.ctx.save();
		gGraphics.ctx.rect(
			this._clipX,this._clipY + (1-this._percent) * this._clipWidth,this._clipWidth,this._clipWidth);
		gGraphics.ctx.clip();

		// draw the circle
		gGraphics.ctx.beginPath();
		gGraphics.ctx.arc(this._centerX,this._centerY,this._radius,0,2*Math.PI,false);
		
		// fill with the gradient created in the constructor
		gGraphics.ctx.fillStyle = this._gradient;
		gGraphics.ctx.fill();
		gGraphics.ctx.stroke();

		// restore the ctx (remove the clipping region)
		gGraphics.ctx.restore();
		gGraphics.ctx.beginPath();

		// draw the rest of the graphical elements.
		this._frame.draw();
		this._gloss.draw();
	}
}

class UIResourceLine {

	constructor(pos,color) {
		this._gloss 			= new UIGameObject("xp gloss");
		this._separators 		= new UIGameObject("xp separators");
		this._gloss.pos 		= pos.clone();
		this._separators.pos 	= pos.clone();
		this._color 			= color;
		this._percent 			= .75;
	}

	draw() {

		gGraphics.ctx.fillStyle = this._color;
		gGraphics.ctx.fillRect (
			this._gloss.pos.x + this._gloss.tile.sheet.globalSkewX,
			this._gloss.pos.y + this._gloss.tile.sheet.globalSkewY,
			this._gloss.tile.width * this._gloss.tile.sheet.globalScale * this._percent,
			this._gloss.tile.height * this._gloss.tile.sheet.globalScale);
			
		this._gloss.draw();
		this._separators.draw();
	}
}

class UIHotkeyItem {

	constructor(pos,key) {
		
		this._frame 	= new UIGameObject("action frame");
		this._frame.pos = pos.clone();
	
		switch (key) {
			case "left": 
				this._key = new UIGameObject("left mouse");
				this._key.pos = pos.clone();
				break;
			case "right": 
				this._key = new UIGameObject("right mouse");
				this._key.pos = pos.clone();
				break;
			default: 
				this._key 		= key;
				this._tx 		= pos.x + this._frame.tile.sheet.globalSkewX + 5;
				this._ty 		= pos.y + this._frame.tile.sheet.globalSkewY + 11;
				break;
		}
		
	}

	get width() {return this._frame.tile.width * this._frame.tile.sheet.globalScale;}

	draw() {
		this._frame.draw();
		if (this._key instanceof UIGameObject) {
			this._key.draw();
		} else { 
			gGraphics.text(this._tx, this._ty, this._key);
		}
	}
}

class UIActionBar {
	constructor() {
		this._bar = new UIGameObject("action bar");
		this._bar.pos.set(
			gGraphics.canvas.width/2 - this._bar.sheet.width/2*this._bar.sheet.globalScale,
			gGraphics.canvas.height - this._bar.sheet.height*this._bar.sheet.globalScale);

		this._hotkeys = [];
		var p = this._bar.pos.clone();
		// position hotkeys on the actionbar...
		for (var i = 0; i < 9; i++) {
			var key;
			switch(i) {
				case 0: key = "left";  break;
				case 1: key = "right"; break;
				default: key = (i-2).toString(); 
			}
			this._hotkeys[i] = new UIHotkeyItem(p,key);
			p.add(this._hotkeys[i].width -2  + (i==1 || i==3? 11 : 0),0);	
		}
	}

	get pos() {return this._bar.pos;}

	draw() {
		this._bar.draw();
		for (var hk of this._hotkeys) {
			hk.draw();
		}
	}
}

class UIMap {

	constructor() {

	}

	draw() {
		
		var sx,sy,o;
		// use the transformed offset and scale
		gGraphics.setTransform(gInput.viewOffset.x,gInput.viewOffset.y,gInput.viewScale);
	
		// now draw the visible map and objects.
		for (var y = 0; y < gMap._height; y++) {
			for (var x = 0; x < gMap._width; x++) {
				gMap._data[y][x].draw();
			}
		}

		// draw destination target if one is currently active.
		if (gInput.targetEnabled) {
			gInput.target.draw();			
		}

		gPlayer.draw();

		// reset the zoom and pan parameters to the identity matrix, and then draw HUD elements.
		gGraphics.resetTransform();

		gGraphics.text(10,20,"cursor: " + gUI.cursor.pos.toString());
		gGraphics.text(10,40,"cursor as map: " + new Point(gUI.cursor.pos).toMap().toString());
		gGraphics.text(10,60,"untransformed: " + gGraphics.untransformPoint(gUI.cursor.pos).toMap().toString());
		gGraphics.text(10,80,"target: " + gInput.target.pos.toString());
		gGraphics.text(10,100,"dest: " + gPlayer.dest.toString());
		gGraphics.text(10,120,"loc: " + gPlayer.pos.toString());
		gGraphics.text(10,140,"scale: " + gInput.viewScale.toString());




	}
}

// UIEquipSlots expect to be on an UIInventory Page. They don't keep independent position.
class UIEquipSlot {
	constructor(x,y) {
		this._offX = x;
		this._offY = y;
		this._slot = new UIGameObject("equip slot");
	}

	draw(p) {
		this._slot.pos.set(p.x + this._offX,p.y + this._offY);
		this._slot.draw();		
	}
}

// Headings don't expect to be on their own. They don't keep independent positions.
class UIHeading {

	constructor (x,y,string) {
		this._offX = x;
		this._offY = y;
		this._heading = new UIGameObject("heading");
		this._string = string;
		this._textOffX = x + this._heading.tile.width*this._heading.tile.sheet.globalScale / 2 - 
			gGraphics.ctx.measureText(this._string).width/2;

		this._textOffY = y + this._heading.tile.height / 3.5;
	}

	get string() 	{return this._string;}
	set string(v) 	{this._string = v;}

	draw(p) {

		this._heading.pos.set(p.x + this._offX,p.y + this._offY);
		this._heading.draw();	

		gGraphics.text(p.x + this._textOffX, p.y+ this._textOffY,this._string);
	}
}

class UIEquipped {

	constructor() {
		this._background = new UIGameObject("legend");
		this._heading 	 = new UIHeading(75,-20,"Equipped");

		this._playerPic  = new UIGameObject("player inventory pic");

		this._slots = {
			"head" 			:  			new UIEquipSlot(136,50),
			"chest" 		: 			new UIEquipSlot(136,110),
			"legs" 			:  			new UIEquipSlot(136,170),
			"feet" 			:  			new UIEquipSlot(136,230),
			"hands" 		: 			new UIEquipSlot(85,90),
			"waist" 		: 			new UIEquipSlot(190,140),
			"right weapon" 	:  			new UIEquipSlot(25,90),
			"left weapon" 	:  			new UIEquipSlot(250,90),		
			"left ring" 	:  			new UIEquipSlot(25,150),	
			"right ring" 	: 			new UIEquipSlot(250,150)
		};
		this._pos = new Point(500,100);
	}
	draw() {

		gGraphics.drawTile(this._pos.x,this._pos.y,this._background.tile);
		this._heading.draw(this._pos);
	
		gGraphics.drawTile(this._pos.x + 80,this._pos.y + 45,this._playerPic.tile);
		
		for (var key in this._slots) {
			this._slots[key].draw(this._pos);
		}
	}
}

class UIInventory {

	constructor() {
		this._topFrame = new UIGameObject("big box top frame");
		this._background = new UIGameObject("big box background");
		this._book = new UIGameObject("legend");
		this._charPic = new UIGameObject("player inventory pic");

		this._topFrame.pos = new Point(500,100);
		this._background.pos = new Point(500,130);
		this._book.pos = new Point(500,130);
		this._charPic.pos = new Point(600,200);
	}

	draw() {


		this._background.draw();
		this._topFrame.draw();
		this._book.draw();
		this._charPic.draw();
	}

}

class UICursor {

	constructor() {

		this._pos = new Point(0,0);

		this._cursors = {};

		this._cursors["attack cursor"] 				= new UIGameObject("attack cursor");
		this._cursors["attack cursor invalid"] 		= new UIGameObject("attack cursor invalid");
		this._cursors["mouse cursor"] 				= new UIGameObject("mouse cursor");
		this._cursors["mouse cursor invalid"] 		= new UIGameObject("mouse cursor invalid");	
		this._cursors["merchant cursor"] 			= new UIGameObject("merchant cursor");
		this._cursors["merchant cursor invalid"] 	= new UIGameObject("merchant cursor invalid");
		this._cursors["portal cursor"] 				= new UIGameObject("portal cursor");
		this._cursors["portal cursor invalid"] 		= new UIGameObject("portal cursor invalid");	
		this._cursors["talk cursor"] 				= new UIGameObject("talk cursor");
		this._cursors["talk cursor invalid"] 		= new UIGameObject("talk cursor invalid");	

		for (var key in this._cursors) {
			this._cursors[key].pos = this._pos;
		}

		this._cur  = "talk cursor";

	}

	get cursor() 		{return this._cur;}
	set cursor(v) 		{this._cur = v;}
	get pos() 			{return this._pos;}

	draw() {
		this._cursors[this._cur].draw();
	}
}


class GameUI {

	constructor() {
		this._bar 			= new UIActionBar();
		this._hp			= new UIResourceGlobe(this._bar.pos,"hp frame","hp gloss",'#AD2121','#7A0505');
		this._mp			= new UIResourceGlobe(this._bar.pos,"mana frame","mana gloss",'#403DDB','#0A08AE');
		this._xp 			= new UIResourceLine(this._bar.pos,"green");
		this._cursor 		= new UICursor();
		this._equipped 		= new UIEquipped();
		this._map			= new UIMap();
	}

	get cursor() {return this._cursor;}
	
	update() {

		// clear screen, scale to current zoom, and translate to current pan parameters.
		gGraphics.clear();

		this._map.draw();

		this._bar.draw();		
		this._hp.draw();
		this._mp.draw();
		this._xp.draw();
		this._cursor.draw();
		this._equipped.draw();


		gGraphics.text(10,20,"cursor: " + gUI.cursor.pos.toString());
		gGraphics.text(10,40,"cursor as map: " + new Point(gUI.cursor.pos).toMap().toString());
		gGraphics.text(10,60,"untransformed: " + gGraphics.untransformPoint(gUI.cursor.pos).toMap().toString());
		gGraphics.text(10,80,"target: " + gInput.target.pos.toString());
		gGraphics.text(10,100,"dest: " + gPlayer.dest.toString());
		gGraphics.text(10,120,"loc: " + gPlayer.pos.toString());
		gGraphics.text(10,140,"scale: " + gInput.viewScale.toString());
	}
}