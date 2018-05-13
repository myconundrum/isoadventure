//
// game subsystem variables
//
var gDebug; 	// debug information
var gGraphics; 	// graphics subsystem
var gInput;		// input subsystem
var gFrames;	// global game windows
var gMap;		// global current map
var gAssets;	// all A/V files for the game.
var gPlayer;	// the player.
var gTime;		// game time.

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

class GameTimer {

	constructor() {
		this._startTime 		= new Date();
		this._lastTime			= new Date();
		this._curTime 			= new Date();
		this._elapsedSinceStart = this._curTime - this._startTime;
		this._elapsedSinceLast 	= this._curTime - this._lastTime;
	}

	update() {
		var nTime = new Date();
		this._elapsedSinceLast 	= nTime - this._lastTime;
		this._elapsedSinceStart = nTime - this._startTime;
		this._lastTime 			= this._curTime;
		this._curTime 			= nTime; 
	}

	get start() 				{return this._startTime;}
	get now()  					{return this._curTime;}
	get last() 					{return this._lastTime;}
	get sinceStart() 			{return this._elapsedSinceStart;}
	get sinceLast() 			{return this._elapsedSinceLast;}

}


class Debug {

	constructor() {
		this._curTile = 0;
		this._showTile = false;
		this._debugMode = false;
		this._tileSheet = gAssets.tileSheets["runes"];
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

function deferredInit() {

	if (!gAssets.loaded()) {
		window.requestAnimationFrame(deferredInit);
		return;
	}

	
	console.log("Asset load completed.");

	gDebug		= new Debug();
	gInput 		= new Input();
	gFrames 	= new GameFrames();
	gMap 		= new Map();
	//gPlayer 	= new Player();

	//gPlayer.loc = new Point(300,420);

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
	gGraphics.update();
	//gPlayer.update();
	gInput.update();

	window.requestAnimationFrame(update);
}


