


//
// game subsystem variables
//
var gGraphics; 	// graphics subsystem
var gInput;		// input subsystem
var gFrames;	// global game windows
var gMap;		// global current map
var gAssets;	// all A/V files for the game.


class Debug {
	constructor() {
		this._curTile = 0;
		this._showTile = false;
		this._debugMode = false;
	}

	get curTile() 		{return this._curTile;}
	get showTile() 		{return this._showTile;}
	get debugMode() 	{return this._debugMode;}

	set curTile(v) 		{this._curTile = v;}
	set showTile(v) 	{this._showTile = v;}
	set debugMode(v) 	{this._debugMode = v;}
}

function init() {

	gAssets 	= new Assets();
	gDebug		= new Debug();
	gGraphics 	= new GameGraphics();
	gInput 		= new Input();
	gFrames 	= new GameFrames();
	gMap 		= new Map();




	window.requestAnimationFrame(update);
}


function update() {

	gGraphics.update();
	
	window.requestAnimationFrame(update);
}


