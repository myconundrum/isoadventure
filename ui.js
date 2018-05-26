


class UIElement {

	constructor() {
		this._width = 0;
		this._height = 0;
		this._pos = new Point(0,0);
		this._mouseHovering = false;

	}

	get width() 	{return this._width;}
	get height() 	{return this._height;}
	get pos() 		{return this._pos;}

	set width(v) 	{this._width = v;}
	set height(v) 	{this._height = v;}
	set pos(v) 		{this._pos = v;}

	isMouseOver() {
		return gUI.cursor.pos.x > this._pos.x && gUI.cursor.pos.x < this._pos.x + this._width && 
		gUI.cursor.pos.y > this._pos.y && gUI.cursor.pos.y < this._pos.y + this._height;
	}

	handleMouseDrag() 			{return false;}
	handleMouseClick() 			{return false;}
	handleMouseHover()  		{return false;}
	handleMouseScroll() 		{return false;}
	handleMouseHoverStart() 	{return false;}
	handleMouseHoverEnd()		{return false;}
}

class UICloseButton extends UIElement {

	constructor(name) {
		super();
		this._button 	= new UIGameObject("close button");
		this._closeName = name;
		this.pos = this._button.pos;
		this.width = this._button.tile.width;
		this.height = this._button.tile.height;
		this._offX = 35;
		this._offY = 8;
	}

	draw(p) {
		this._button.pos.set(p.x+this._offX,p.y+this._offY);
		this._button.draw();
	}

	handleMouseClick() {

		var handled = false;
		if (this.isMouseOver()) {
			gUI.deactivateWindow(this._closeName);
			handled = true;
		}

		return handled;
	}
}

class UIResourceGlobe extends UIElement {

	constructor(pos,frame,gloss,color1,color2) {

		super();
		

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

		// for input events
		this._pos.set(this._clipX,this._clipY);
		this._width = this._clipWidth;
		this._height = this._clipWidth;

		this._gradient = gGraphics.ctx.createRadialGradient(
			this._centerX+this._radius/2,this._centerY-this._radius/3,this._radius/4,
			this._centerX+this._radius/2,this._centerY-this._radius/3,this._radius);
		this._gradient.addColorStop(0,color1);
		this._gradient.addColorStop(1,color2);       
		this._radius -= 4; // make circle slightly smaller so that it does not cover the frame.
		this._percent = .67;

		this._overlay = null;
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


		if (this._overlay != null) {
			this._overlay.draw();
		}
	}

	handleMouseHoverStart() {
		var handled = false;
		if (this.isMouseOver()) {
			console.log("globe: started hovering! " + this._pos.toString());
			this._overlay = new UITextElement(new Point(gUI.cursor.pos.x + 8,gUI.cursor.pos.y-8),"FOO");
			handled = true;
		}

		return handled;
	}

	handleMouseHoverEnd() {
		var handled = false;
		if (this.isMouseOver()) {
			console.log("globe : ended hovering! " + this._pos.toString());
			this._overlay = null;
			handled = true;
		}
		
		return handled;
	}
}

class UITextElement {

	constructor(pos,text) {
		this._pos = pos.clone();
		this._text = text;
		
		var m  = gGraphics.ctx.measureText(this._text);

		this._textWidth = m.width + 20;
		this._textHeight = 20;

		this._gradient = gGraphics.ctx.createLinearGradient(0,0,this._textWidth + 40,0);
		this._gradient.addColorStop(0.000, 'rgba(0, 0, 0, 1.000)');
      	this._gradient.addColorStop(.485, 'rgba(0, 0, 0, 0.000)');

	}

	draw() {

		gGraphics.ctx.save();
		gGraphics.ctx.translate(this._pos.x - 5, this._pos.y -14);
		gGraphics.ctx.fillStyle = this._gradient;
		gGraphics.ctx.fillRect(0,0,this._textWidth,this._textHeight);
		gGraphics.ctx.stroke();
		gGraphics.text(5,12,this._text);
		gGraphics.ctx.restore();
	}
}

class UIResourceLine extends UIElement {

	constructor(pos,color) {
		super();
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

class UIHotkeyItem  extends UIElement {

	constructor(pos,key) {
		super();
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

class UIMainHud  extends UIElement  {
	constructor() {

		super();
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

		this._hp			= new UIResourceGlobe(this._bar.pos,"hp frame","hp gloss",'#AD2121','#7A0505');
		this._mp			= new UIResourceGlobe(this._bar.pos,"mana frame","mana gloss",'#403DDB','#0A08AE');
		this._xp 			= new UIResourceLine(this._bar.pos,"green");
	}

	get pos() {return this._bar.pos;}

	draw() {
		this._bar.draw();
		this._hp.draw();
		this._xp.draw();
		this._mp.draw();
		for (var hk of this._hotkeys) {
			hk.draw();
		}
	}

	handleMouseHoverStart() {
		return this._hp.handleMouseHoverStart() || this._mp.handleMouseHoverStart();
	}

	handleMouseHoverEnd() {
		return this._hp.handleMouseHoverEnd() || this._mp.handleMouseHoverEnd();
	}
}

class UIMap  extends UIElement {

	constructor() {super();}

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

	handleMouseScroll() {

  		gInput.viewScale += gInput.scrollDelta/MOUSESCROLLSPEED;
  		return true;
	}

	handleMouseClick() {

		// get the location of the cursor in world coordinates, and set it as the player destination.
		gInput.target.pos = centerTileOnPos(gInput.target.tile,gGraphics.untransformPoint(gUI.cursor.pos)).toMap();

		gPlayer.dest = gInput.target.pos.clone();

		// enable the display of the target animation.
		gInput.targetEnabled = true;
		
		gPlayer.moveDist = gPlayer.dest.distance(gPlayer.pos);
		gPlayer.moveLastTime = gTime.now;

		// the player will start walking towards the destination.
		gPlayer.playAnimation("run",true);
		return true;

	}


	handleMouseDrag() {

		// if we are currently doing a mouse drag, update our viewoffset for panning.
		var diffX = gInput.mouseDragPos.x-gUI.cursor.pos.x;
		var diffY = gInput.mouseDragPos.y-gUI.cursor.pos.y;
		gInput.viewOffset.sub(diffX,diffY);
		gInput.mouseDragPos.set(gUI.cursor.pos.x,gUI.cursor.pos.y);

		return true;
	}
}

// UIEquipSlots expect to be on an UIInventory Page. They don't keep independent position.
class UIEquipSlot  extends UIElement {
	constructor(x,y) {
		super();
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
class UIHeading  extends UIElement {

	constructor (x,y,string) {
		super();
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

class UIEquipped  extends UIElement {

	constructor() {
		super();
		this._background = new UIGameObject("legend");
		this._heading 	 = new UIHeading(75,-20,"Equipped");
		this._close 	 = new UICloseButton("equipped");
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

		this.pos = new Point(500,100);
		this.width = this._background.tile.width * this._background.tile.sheet.globalScale;
		this.height = this._background.tile.height * this._background.tile.sheet.globalScale;
	}

	

	draw() {

		gGraphics.drawTile(this.pos.x,this.pos.y,this._background.tile);
		this._heading.draw(this.pos);
		this._close.draw(this.pos);
	
		gGraphics.drawTile(this.pos.x + 80,this.pos.y + 45,this._playerPic.tile);
		for (var key in this._slots) {
			this._slots[key].draw(this.pos);
		}
	}


	handleMouseClick() {
		var handled = false;

		handled = this._close.handleMouseClick();

		return handled;
	}

	handleMouseDrag() {
		var handled = false;

		if (this.isMouseOver()) {
			handled = true;
			var diffX = gInput.mouseDragPos.x-gUI.cursor.pos.x;
			var diffY = gInput.mouseDragPos.y-gUI.cursor.pos.y;
			this.pos.sub(diffX,diffY);
			gInput.mouseDragPos.set(gUI.cursor.pos.x,gUI.cursor.pos.y);
		}

		return handled;
	}
}


class UICursor  extends UIElement {

	constructor() {
		super();
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

		this._cur  = "mouse cursor";

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
		this._hud 			= new UIMainHud(); 		// action bar, hotkeys, mana, xp, hp
		this._cursor 		= new UICursor();		// active cursor
		this._map			= new UIMap();			// map

		this._windows = {
			"equipped" : new UIEquipped()
		}
		this._active = [];
		this._mouseEvents = {"drag"			:"handleMouseDrag",
							 "hover start"	:"handleMouseHoverStart",
							 "hover end"	:"handleMouseHoverEnd",
							 "scroll"		:"handleMouseScroll",
							 "click"		:"handleMouseClick"
							};
	}

	toggleWindow(name) {this._active.indexOf(name) == -1 ? this.activateWindow(name) : this.deactivateWindow(name);}

	activateWindow(name) {

		var i = this._active.indexOf(name);

		if (i != -1) {
			this._active.splice(i,1);
		}
		this._active.push(name); // add to end of list (last to be drawn, highest z order).
	}

	deactivateWindow(name) {
		var i = this._active.indexOf(name);
		if (i != -1) {
			this._active.splice(i,1);
		}
	}

	get cursor() {return this._cursor;}


	// see which UI element responds to the mouse  events.
	handleMouseEvent(event) {

		if (this._hud[this._mouseEvents[event]]()) {return;}
		for (var name of this._active) {
			if (this._windows[name][this._mouseEvents[event]]()) {return;}
		}

		this._map[this._mouseEvents[event]]();
	}

	// update draws all of the UI for the game. 
	update() {

		// clear screen, scale to current zoom, and translate to current pan parameters.
		gGraphics.clear();

		// draw order should always be:
		// (1) Map (lowest z order)
		// (2) Any other active screens with dynamic z order between map and HUD
		// (3) HUD
		// (4) cursor (highest z order)

		this._map.draw();
		for (var name of this._active) {
			this._windows[name].draw();
		}
		this._hud.draw();	
		this._cursor.draw();

		gGraphics.text(10,20,"cursor: " + gUI.cursor.pos.toString());
		gGraphics.text(10,40,"cursor as map: " + new Point(gUI.cursor.pos).toMap().toString());
		gGraphics.text(10,60,"untransformed: " + gGraphics.untransformPoint(gUI.cursor.pos).toMap().toString());
		gGraphics.text(10,80,"target: " + gInput.target.pos.toString());
		gGraphics.text(10,100,"dest: " + gPlayer.dest.toString());
		gGraphics.text(10,120,"loc: " + gPlayer.pos.toString());
		gGraphics.text(10,140,"scale: " + gInput.viewScale.toString());
	}
}