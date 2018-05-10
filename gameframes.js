

var DEBUGFRAMEWIDTH = 200

var testSprite;

class GameFrames {

	constructor() {

		this._game = gGraphics.createFrame("game",0,0,gGraphics.getScreenWidth(),gGraphics.getScreenHeight(),0);
		this._game.bgColor 	= "black";
		this._game.update 	= gameFrameUpdate;
		this._game.enabled 	= true;

		this._debug = gGraphics.createFrame("debug",0,0,200,gGraphics.getScreenHeight(),0);
		this._debug.bgColor = "gray";
		this._debug.update = debugFrameUpdate;
	}	

	get game() 		{return this._game;}
	get debug() 	{return this._debug;}

	set game(v) 	{this._game = v;}
	set debug(v) 	{this._debug = v;}
	
}




function gameFrameUpdate(frame) {
	
	gGraphics.clear(frame);



	var sx,sy;
	var tiles = gAssets.tiles("dungeon");


	for (var x = 0; x < 10; x++) {
		for (var y = 0; y < 10; y++) {
			sx = (x - y) * (tiles.tileWidth / 2) + 400;
			sy = (x + y) * (tiles.tileHeight / 2) + 300;
			if (gMap.data[x][y] == 2) {
				gGraphics.drawTileEx(frame,sx,sy,tiles.getTile(193),64,128);
			}
			else {
				gGraphics.drawTile(frame,sx,sy,tiles.getTile(48));
			}
		}
	}

	gGraphics.drawSprite(frame,450,320,gPlayer.sprite);
	
}

function debugFrameUpdate(frame) {

	gGraphics.clear(frame);

	if (gDebug.showTile) {
		gGraphics.text(frame,10,20,"Tile Index: " + gDebug.curTile.toString());
		gGraphics.drawTile(frame,0,300,gDebug.tileSheet.getTile(gDebug.curTile));
	}
}
