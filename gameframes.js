

var DEBUGFRAMEWIDTH = 200

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
	
	var sx,sy,o;
	
	gGraphics.clear(frame);

	for (var x = 0; x < gMap.data.length; x++) {
		for (var y = 0; y < gMap.data[0].length; y++) {
			o = gMap.data[x][y];

			sx = (x - y) * (o.tile.sheet.baseWidth / 2)  + 400;
			sy = (x + y) * (o.tile.sheet.baseHeight / 2)   + 200;
			gGraphics.drawTile(frame,sx,sy,o.tile);
		}
	}

	gGraphics.drawTile(frame,gPlayer.loc.x,gPlayer.loc.y,gPlayer.tile);
	
	if (gInput.targetEnabled) {
		gGraphics.drawTile(frame,gInput.targetX,gInput.targetY,gInput.target.tile);
	}
	gGraphics.drawTile(frame,gInput.cursor.loc.x,gInput.cursor.loc.y,gInput.cursor.tile);


	gGraphics.text(frame,10,20,"cursor:" + gInput.cursorX + "," + gInput.cursorY);
	gGraphics.text(frame,10,40,"target: " + gInput.targetX +","+gInput.targetY);
	gGraphics.text(frame,10,60,"dest: " + gPlayer.destination.x +","+gPlayer.destination.y);
	gGraphics.text(frame,10,80,"loc:" + gPlayer.loc.x+","+gPlayer.loc.y);

}

function debugFrameUpdate(frame) {

	gGraphics.clear(frame);

	if (gDebug.showTile) {
		gGraphics.text(frame,10,20,"Tile Index: " + gDebug.curTile.toString());
		gGraphics.drawTile(frame,0,300,gDebug.tileSheet.getTileByIndex(gDebug.curTile));
	}

	gGraphics.text(frame,10,40,"mouse x: " + gInput.cursorX);
	gGraphics.text(frame,10,60,"mouse y: " + gInput.cursorY);
	gGraphics.text(frame,10,120,"frame "+gPlayer._frame.toString());
	gGraphics.text(frame,10,140,"elapsed time:" + gTime.sinceStart.toString());
	
}
