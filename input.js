

function Input() {

	document.addEventListener( 'keydown', doKeyDown, false);
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
				gGraphics.setFrameEnabled(gFrames.debug,false);
				gGraphics.setFrameSize(gFrames.game,gGraphics.getScreenWidth(),gGraphics.getScreenHeight())
				gGraphics.setFramePosition(gFrames.game,0,0);
			}
			else {
				gGraphics.setFrameEnabled(gFrames.debug,true);
				gGraphics.setFrameSize(gFrames.game,gGraphics.getScreenWidth()-DEBUGFRAMEWIDTH,gGraphics.getScreenHeight())
				gGraphics.setFramePosition(gFrames.game,DEBUGFRAMEWIDTH,0);
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
				gDebug.curTile -= tileSheet.getTilesPerLine();
			}
			break;
		case 40:
			if (gDebug.showTile){
				gDebug.curTile += tileSheet.getTilesPerLine();
			}
			break;



	}
}


/*

function doKeyDown(e) {

	switch(e.keyCode) {

		// t
		case 84:
			game.flags["showTile"] = !game.flags["showTile"];
			console.log("[Debug] showTile is " + game.flags["showTile"].toString() + ".");
			break;


		case 37:
			if (game.flags["showTile"]) {
				game.debug.tileIndex--;
				if (game.debug.tileIndex < 0 ) {
					game.debug.tileIndex = game.renderer.tiles.maxIndex - 1;
				}
				console.log("[Debug] tileIndex is " + game.debug.tileIndex.toString() + ".");
			}
			else {
				game.player.sprite.curAnimation = "walk west";
				game.player.move(0,-1);
			}
			
			break;

		case 39:
			if (game.flags["showTile"]) {
				game.debug.tileIndex++;
				if (game.debug.tileIndex >= game.renderer.tiles.maxIndex) {
					game.debug.tileIndex = 0;
				}
				console.log("[Debug] tileIndex is " + game.debug.tileIndex.toString() + ".");
			}
			else {
				
				game.player.sprite.curAnimation = "walk east";
				game.player.move(0,1);
			}
			
			
			break;

		case 38:
			if (game.flags["showTile"]) {
				game.debug.tileIndex -= game.renderer.tiles.tilesPerLine;
				if (game.debug.tileIndex < 0 ) {
					game.debug.tileIndex = game.renderer.tiles.maxIndex - 1;
				}
				console.log("[Debug] tileIndex is " + game.debug.tileIndex.toString() + ".");
			}
			else {
				

				game.player.sprite.curAnimation = "walk north";
				game.player.move(-1,0);
			}
			break;

		case 40:
			if (game.flags["showTile"]) {
				game.debug.tileIndex += game.renderer.tiles.tilesPerLine;
				if (game.debug.tileIndex >= game.renderer.tiles.maxIndex) {
					game.debug.tileIndex = 0;
				}
				
			}
			else {
				

				game.player.sprite.curAnimation = "walk south";
				game.player.move(1,0);
			}
			break;

	}
	
}

*/