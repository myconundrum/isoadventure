


//
// game subsystem variables
//
var gGraphics; 	// graphics subsystem
var gInput;		// input subsystem
var gFrames;	// global game windows
var gMap;		// global current map
var gAssets;	// all A/V files for the game.
var gPlayer;	// the player.

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}


class Debug {
	constructor() {
		this._curTile = 0;
		this._showTile = false;
		this._debugMode = false;
		this._tileSheet = gAssets.sprites("runes");
	}

	get curTile() 		{return this._curTile;}
	get showTile() 		{return this._showTile;}
	get debugMode() 	{return this._debugMode;}
	get tileSheet() 	{return this._tileSheet;}

	set curTile(v) 		{this._curTile = v;}
	set showTile(v) 	{this._showTile = v;}
	set debugMode(v) 	{this._debugMode = v;}
	set tileSheet(v) 	{this._tileSheet = v;}
}

function init() {

	gAssets 	= new Assets();
	gDebug		= new Debug();
	gGraphics 	= new GameGraphics();
	gInput 		= new Input();
	gFrames 	= new GameFrames();
	gMap 		= new Map();
	gPlayer 	= new Player();

	gPlayer.loc = new Point(300,420);

	window.requestAnimationFrame(update);
}


function update() {

	gGraphics.update();
	gPlayer.update();
	gInput.update();
	
	window.requestAnimationFrame(update);
}


