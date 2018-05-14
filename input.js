

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
		this._mouseDragX = 0;
		this._mouseDragY = 0;

	}

	get cursorX() 			{return this._cursor.loc.x;}
	get cursorY() 			{return this._cursor.loc.y;}
	get cursor()  			{return this._cursor;}
	get mouseDown() 		{return this._mouseDown;}
	set mouseDown(v) 		{this._mouseDown = v;}
	get mouseDrag() 		{return this._mouseDrag;}
	set mouseDrag(v)		{this._mouseDrag = v;}
	get mouseDragX()		{return this._mouseDragX;}
	set mouseDragX(v)		{this._mouseDragX = v;}	
	get mouseDragY()		{return this._mouseDragY;}
	set mouseDragY(v)		{this._mouseDragY = v;}

	get targetX() 			{return this._target.loc.x;}
	get targetY() 			{return this._target.loc.y;}
	get target()  			{return this._target;}
	get targetEnabled() 	{return this._targetEnabled;}



	set targetEnabled(v) 	{this._targetEnabled = v;}
	set targetX(v)			{this._target.loc.x = v;}
	set targetY(v) 			{this._target.loc.y = v;}

}


function onMouseDown(e) {

	gInput.mouseDown = true;
	console.log("mouse down" + gInput.mouseDrag.toString())

}

function onMouseUp(e) {

	gInput.mouseDown = false;
	console.log("mouse up" + gInput.mouseDrag.toString());

	if (!gInput.mouseDrag) {

		gInput.targetX = gInput.cursorX;
		gInput.targetY = gInput.cursorY;
		gInput.targetEnabled = true;

		gPlayer.destination.x = gInput.targetX - gPlayer.tile.width * gPlayer.sheet.globalScale / 2;
		//
		// BUG: Not sure why this 50 pixels is needed. bottom justified sprites?
		//
		gPlayer.destination.y = gInput.targetY - gPlayer.tile.height * gPlayer.sheet.globalScale/ 2 - 50;

		gPlayer.playAnimation("run",true);
	}

	gInput.mouseDrag = false;
}

function onMouseMove(e) {

	console.log("move"+gInput.mouseDrag.toString());
	var rect = gGraphics.canvas.getBoundingClientRect();
	var x = e.clientX - rect.left;
	var y = e.clientY - rect.top;

	if (gInput.mouseDown && !gInput.mouseDrag) {
		gInput.mouseDrag = true;
		gInput.mouseDragX = x;
		gInput.mouseDragY = y;
		
	} else if (gInput.mouseDrag) {

		var diffX = gInput.mouseDragX-x;
		var diffY = gInput.mouseDragY-y;
		
		gMap.viewOffsetX -= diffX;
		gMap.viewOffsetY -= diffY;

		gInput.mouseDragX = x;
		gInput.mouseDragY = y;
	}

	gInput.cursor.loc.x = x;
	gInput.cursor.loc.y = y;


}

function doKeyDown(e) {

	switch(e.keyCode) {

	}
}

