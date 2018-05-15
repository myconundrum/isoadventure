

class Input {
	
	constructor() {
		
		document.addEventListener( 'keydown', doKeyDown, false);
		gGraphics.canvas.addEventListener('mousemove',onMouseMove);
		gGraphics.canvas.addEventListener('mousedown',onMouseDown);
		gGraphics.canvas.addEventListener('mouseup',onMouseUp);

		this._cursor = new GameObject("cursor gauntlet");
		this._cursor.tile = this._cursor.sheet.getTileByIndex(0);
		this._target = new AnimatedGameObject("runes");
		this._target.playAnimation("click",true);
		this._targetActive = false;

		this._mouseDrag = false;
		this._mouseDown = false;
		this._mouseDragPos = new Point(0,0);
	}

	get cursor()  			{return this._cursor;}
	get mouseDown() 		{return this._mouseDown;}
	set mouseDown(v) 		{this._mouseDown = v;}
	get mouseDrag() 		{return this._mouseDrag;}
	set mouseDrag(v)		{this._mouseDrag = v;}
	get mouseDragPos()		{return this._mouseDragPos;}
	set mouseDragPos(v)		{this._mouseDragPos = v;}	
	get mouseDragY()		{return this._mouseDragY;}
	get target()  			{return this._target;}
	get targetEnabled() 	{return this._targetEnabled;}

	set targetEnabled(v) 	{this._targetEnabled = v;}
	
}


function onMouseDown(e) {
	gInput.mouseDown = true;
}

function onMouseUp(e) {

	gInput.mouseDown = false;
	
	if (!gInput.mouseDrag) {

		gInput.target.pos = gInput.cursor.pos.toMap();
		gInput.targetEnabled = true;
		var x = gInput.cursor.pos.x - gPlayer.tile.width * gPlayer.sheet.globalScale / 2;
		var y = gInput.cursor.pos.y - gPlayer.tile.height * gPlayer.sheet.globalScale/ 2 - 50;
		var p = new Point(x,y);
		gPlayer.dest = p.toMap();
		gPlayer.moveDist = gPlayer.dest.distance(gPlayer.pos);
		gPlayer.moveLastTime = gTime.now;

		gPlayer.playAnimation("run",true);
	}

	gInput.mouseDrag = false;
}

function onMouseMove(e) {

	var rect = gGraphics.canvas.getBoundingClientRect();
	var x = e.clientX - rect.left;
	var y = e.clientY - rect.top;

	if (gInput.mouseDown && !gInput.mouseDrag) {
		gInput.mouseDrag = true;
		gInput.mouseDragPos.set(x,y);

	} else if (gInput.mouseDrag) {

		var diffX = gInput.mouseDragPos.x-x;
		var diffY = gInput.mouseDragPos.y-y;
		
		gMap.viewOffset.sub(diffX,diffY);
		gInput.mouseDragPos.set(x,y);
	}

	gInput.cursor.pos.set(x,y);
}

function doKeyDown(e) {

	switch(e.keyCode) {

	}
}

