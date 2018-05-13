

class Input {
	
	constructor() {
		
		document.addEventListener( 'keydown', doKeyDown, false);
		gGraphics.canvas.addEventListener('mousemove',onMouseMove);
		gGraphics.canvas.addEventListener('mousedown',onMouseDown);

		this._mouseClicked = false;

		this._mouseX = 0;
		this._mouseY = 0;

		//this._mouseSprite = new Actor();
		//this._mouseSprite.sprite = new Sprite(gAssets.sprites("runes"));
		//this._mouseSprite.sprite.direction = "none";
		//this._mouseSprite.sprite.action = "click"
		//this._mouseSprite.sprite.defaultAction = "click";
		//this._mouseSprite.looping = true;


	}


	registerClick() {this._mouseClicked = true;}

	get mouseX() 		{return this._mouseX;}
	get mouseY() 		{return this._mouseY;}
	get mouseSprite() 	{return this._mouseSprite;}


	set mouseX(v) 	{this._mouseX = v;}
	set mouseY(v) 	{this._mouseY = v;}



	update() {

		if (this._mouseClicked) {
			this._mouseSprite.sprite.animate();
		}
	}

}


function onMouseDown(e) {

	gInput.mouseSprite.loc = new Point(gInput.mouseX,gInput.mouseY);
	gInput.registerClick();

}


function onMouseMove(e) {

		var rect = gGraphics.canvas.getBoundingClientRect();
		gInput.mouseX = e.clientX - rect.left;
		gInput.mouseY = e.clientY - rect.top;
}

function doKeyDown(e) {

	switch(e.keyCode) {

		// t
		case 84:
			gDebug.showTile = !gDebug.showTile;
			console.log("[Debug] showTile is " + gDebug.showTile.toString() + ".");
			break;
		case 68:
			gDebug.debugMode = !gDebug.debugMode;
			console.log("[Debug] Debug Mode is " + gDebug.debugMode.toString() + ".");
			if (!gDebug.debugMode) {
				gFrames.debug.enabled = false;
				gFrames.game.width = gGraphics.getScreenWidth();
				gFrames.game.x = 0;
			}
			else {
				gFrames.debug.enabled = true;
				gFrames.game.width = gGraphics.getScreenWidth() - gFrames.debug.width;
				gFrames.game.x = gFrames.debug.width;
			}
			break;
		
		case 37:
			if (gDebug.showTile){
				gDebug.curTile--;
			}
			break;

		case 39:
			if (gDebug.showTile){
				gDebug.curTile++;
			}
			break;

		case 38:
			if (gDebug.showTile){
				gDebug.curTile -= gDebug.tileSheet.tilesPerLine;
			}
			break;
		case 40:
			if (gDebug.showTile){
				gDebug.curTile += gDebug.tileSheet.tilesPerLine;
			}
			break;



	}
}

