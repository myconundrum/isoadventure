

var DEBUGFRAMEWIDTH = 200

var testSprite;

class GameFrames {

	constructor() {

		this._game = gGraphics.createFrame("game",0,0,gGraphics.getScreenWidth(),gGraphics.getScreenHeight(),0);
		this._game.bgColor 	= "gray";
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
	var tile = 0;
	var offset = 18;


	for (var x = 0; x < 10; x++) {
		for (var y = 0; y < 10; y++) {
			sx = (x - y) * (tiles.baseWidth / 2)  + 400;
			sy = (x + y) * (tiles.baseHeight / 2)   + 300;
			if (gMap.data[x][y] > 0) {
				sy += 12;
			}
			/*
			switch (gMap.data[x][y]) {
				case 0: tile = 0; break;
				case 1: 
					
					tile = 49; 
					
					sy += 12;
				break;
				case 2:
					tile = 48;
					sy += 12;
				break;
				case 3: 
					tile = 61;
					sy += 12;
					break;

			}
			*/
			gGraphics.drawTile(frame,sx,sy,tiles.getTile(gMap.data[x][y]));
/*
			if (gMap.data[x][y] == 1) {

				//var xOffset = tiles.tileWidth - tiles.baseWidth / 2;
				//var yOffset = xOffset * tiles.baseHeight / tiles.baseWidth;
				//var wallHeight = tiles.tileHeight  - tiles.baseHeight / tiles.baseWidth;
				//sx = x * tiles.baseWidth / 2;
				//sy = y * wallHeight - x * tiles.baseHeight / 2;
				//sx += 400;
				//sy += 300;


				sy += 8;
				sx -= 18;
				
				gGraphics.drawTile(frame,sx,sy,tiles.getTile(49));
			} 
			else {
				gGraphics.drawTile(frame,sx,sy,tiles.getTile(0));
			}
		
	*/
		}
	}




	gGraphics.drawSprite(frame,450,420,gPlayer.sprite);
	
}

function debugFrameUpdate(frame) {

	gGraphics.clear(frame);

	if (gDebug.showTile) {
		gGraphics.text(frame,10,20,"Tile Index: " + gDebug.curTile.toString());
		gGraphics.drawTile(frame,0,300,gDebug.tileSheet.getTile(gDebug.curTile));
	}
}
