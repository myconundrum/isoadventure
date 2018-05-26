//
// game subsystem variables
//
var gDebug; 	// debug information
var gGraphics; 	// graphics subsystem
var gInput;		// input subsystem
var gMap;		// global current map
var gAssets;	// all A/V files for the game.
var gPlayer;	// the player.
var gTime;		// game time.


function deferredInit() {

	if (!gAssets.loaded()) {
		window.requestAnimationFrame(deferredInit);
		return;
	}

	console.log("Asset load completed.");

	gUI 		= new GameUI();
	gDebug		= new Debug();
	gInput 		= new Input();
	gMap 		= new Map();
	gPlayer 	= new Player();

	window.requestAnimationFrame(update);
}

function init() {

	gTime 		= new GameTimer();
	gAssets 	= new Assets();
	gGraphics 	= new GameGraphics();
	
	window.requestAnimationFrame(deferredInit);
}


function update() {

	gTime.update(); 

	gPlayer.update();

	// Most input events are handled asynchronously, but some (like mouse hover) are checked as part 
	// of the game loop.
	gInput.update();

	gUI.update();

	window.requestAnimationFrame(update);
}


