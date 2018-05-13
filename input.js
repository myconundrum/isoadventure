

class Input {
	
	constructor() {
		
		document.addEventListener( 'keydown', doKeyDown, false);
		gGraphics.canvas.addEventListener('mousemove',onMouseMove);
		gGraphics.canvas.addEventListener('mousedown',onMouseDown);

		this._cursor = new GameObject("cursor gauntlet");
		this._cursor.tile = this._cursor.sheet.getTileByIndex(0);
		this._target = new AnimatedGameObject("runes");
		this._target.playAnimation("click",true);
		this._targetActive = false;

	}

	get cursorX() 			{return this._cursor.loc.x;}
	get cursorY() 			{return this._cursor.loc.y;}
	get cursor()  			{return this._cursor;}

	get targetX() 			{return this._target.loc.x;}
	get targetY() 			{return this._target.loc.y;}
	get target()  			{return this._target;}
	get targetEnabled() 	{return this._targetEnabled;}

	set targetEnabled(v) 	{this._targetEnabled = v;}
	set targetX(v)			{this._target.loc.x = v;}
	set targetY(v) 			{this._target.loc.y = v;}

}


function onMouseDown(e) {

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


function onMouseMove(e) {

		var rect = gGraphics.canvas.getBoundingClientRect();

		gInput.cursor.loc.x = e.clientX - rect.left;
		gInput.cursor.loc.y = e.clientY - rect.top;
}

function doKeyDown(e) {

	switch(e.keyCode) {

	}
}

