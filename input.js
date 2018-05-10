

class Input {
	constructor() {
		document.addEventListener( 'keydown', doKeyDown, false);
	}
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

