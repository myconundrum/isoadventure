


//
// game subsystem variables
//
var gGraphics; 	// graphics subsystem
var gInput;		// input subsystem
var gFlags;		// global flags
var gFrames;	// global game windows
var gMap;		// global current map
var gAssets;	// all A/V files for the game.


function Debug() {

	this.curTile = 0;
	this.showTile = false;
	this.debugMode = false;
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


