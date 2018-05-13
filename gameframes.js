

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

	//gGraphics.drawSprite(frame,gPlayer.loc.x,gPlayer.loc.y,gPlayer.sprite);
	//gGraphics.drawSprite(frame,gInput.mouseSprite.loc.x,gInput.mouseSprite.loc.y,gInput.mouseSprite.sprite);
	
}

function debugFrameUpdate(frame) {

	gGraphics.clear(frame);

	if (gDebug.showTile) {
		gGraphics.text(frame,10,20,"Tile Index: " + gDebug.curTile.toString());
		gGraphics.drawTile(frame,0,300,gDebug.tileSheet.getTile(gDebug.curTile));
	}

	gGraphics.text(frame,10,40,"mouse x: " + gInput.mouseX);
	gGraphics.text(frame,10,60,"mouse y: " + gInput.mouseY);
	gGraphics.text(frame,10,80,"mouseClick x: " + gInput.mouseSprite.loc.x);
	gGraphics.text(frame,10,100,"mouseClick y: " + gInput.mouseSprite.loc.y);
	gGraphics.text(frame,10,120,"frame: " + gInput.mouseSprite.sprite.frame);
	gGraphics.text(frame,10,140,"elapsed time:" + gTime.sinceStart.toString());




	
}
