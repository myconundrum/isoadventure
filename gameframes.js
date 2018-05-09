

var DEBUGFRAMEWIDTH = 200

var curFrame;

function GameFrames() {

	this.game = gGraphics.createFrame("game",0,0,gGraphics.getScreenWidth(),gGraphics.getScreenHeight(),0);
	this.game.bgColor 	= "black";
	this.game.update 	= gameFrameUpdate;
	this.game.enabled 	= true;

	this.debug = gGraphics.createFrame("debug",0,0,200,gGraphics.getScreenHeight(),0);
	this.debug.bgColor = "gray";
	this.debug.update = debugFrameUpdate;
	//
	// testing only.
	//
	//curFrame = gGraphics.spriteActionStart("goblin","throw");
}




function gameFrameUpdate(frame) {
	
	gGraphics.clear(frame);

	/*
	if (gGraphics.doAnimation()) {
		curFrame++;
		if (curFrame > gGraphics.spriteActionStop("goblin","throw")) {
			curFrame = gGraphics.spriteActionStart("goblin","throw");
		}
	}
*/
	var sx,sy;
	var tiles = gAssets.tiles("cave");

	for (var x = 0; x < 10; x++) {
		for (var y = 0; y < 10; y++) {
			sx = (x - y) * (tiles.tileWidth / 2) + 400;
			sy = (x + y) * (tiles.tileHeight / 2) + 300;
			gGraphics.drawTile(frame,sx,sy,tiles.getTile(gMap.data[x][y]));
		}
	}

	//gGraphics.drawSprite(frame,450,320,"goblin","throw","south",curFrame);

	
}

function debugFrameUpdate(frame) {

	gGraphics.clear(frame);

	if (gDebug.showTile) {
		gGraphics.text(frame,10,20,"Tile Index: " + gDebug.curTile.toString());
		tileSheet.drawTile(frame,0,100,gDebug.curTile);
	}
}
