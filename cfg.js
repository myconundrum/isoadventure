

/*
	(required)----------------------------------------------------------
	@name: 				name of the tile sheet
	@path: 				file path
	@tileWidth:			width on the tilesheet of one tile
	@tileHeight:		height on the tilesheet of one tile
	
	(optional)-----------------------------------------------------------
	@baseWidth: 		width of a "floor tile" in background tilesheets 
	@baseHeight: 		height of a "floor tile" in background tilesheets
	@globalScale:    	scale factor for tiles in this tilesheet
	@globalSkewX:       skew x for all tiles in this tilesheet
	@globalSkewY:       skew y for all tiles in this tilesheet 
	
	@animations:		dictionary of animations within the tilesheet in the format: (key names are animation names)
		@start:    		start index of the animation
		@frames: 		number of frames in the animation
		@duration: 		how long the animation loop should last (in milliseconds)

	@directions: 		direction names for sprite sheets with repeated animations by direction orientation. 

	@tiles: 			list of tiles (including variants) within the tilesheet in the format: (key names are tile anmes)
		@ids 			array of ids for this type of tile (to allow for variants)
		@skewX			(optional) X offset for this particular tile. 			
		@skewY			(optional) Y offset for this particular tile.

*/

var gConfig = {

	"tilesheets" : [
		{
			"name"			: "goblin",
			"path"			: "assets/goblin.png",
			"tileWidth"		: 128,
			"tileHeight"	: 128,
			"globalScale"	: 1.75,
			"globalSkewX"	: -80,
			"globalSkewY"	: -140,
			"animations"    : {
				"stand" 	: {"start":0,"frames":4,"duration":800},
				"run"		: {"start":12,"frames":4,"duration":533},
				"swing"		: {"start":20,"frames":3,"duration":300},
				"cast"		: {"start":28,"frames":4,"duration":533},
				"shoot"		: {"start":24,"frames":4,"duration":400},
				"block"		: {"start":32,"frames":2,"duration":200},
				"hit"		: {"start":34,"frames":2,"duration":133},
				"die"		: {"start":34,"frames":6,"duration":400},
				"crit die"	: {"start":40,"frames":8,"duration":800},
			},
			"directions" : ["west","northwest","north","northeast","east","southeast","south","southwest"]
		},

		{
			"name"			: "runes",
			"path"			: "assets/runes.png",
			"tileWidth"		: 64,
			"tileHeight"	: 64,
			"NOglobalSkewX"	: -30,
			"NOglobalSkewY"	: -30,
			"animations"    : {
				"click"		: {"start":0,"frames":4,"duration":600}
			}			
		
		},
		{
			"name"			: "cursor gauntlet",
			"path"			: "assets/cursorGauntlet_grey.png",
			"tileWidth"		: 30,
			"tileHeight"	: 30
		},
		{
			"name"			: "cave",
			"path"			: "assets/cave_tileset.png",
			"tileWidth"		: 64,
			"tileHeight"	: 32,
			"baseWidth"		: 64,
			"baseHeight"	: 32,
			"type"			: "tilesheet"
		},
		{
			"name"			: "dungeon",
			"path"			: "assets/dungeon_tileset.png",
			"tileWidth"		: 64,
			"tileHeight"	: 128,
			"baseWidth"		: 64,
			"baseHeight"	: 32,
			"type"			: "tilesheet",
			"tiles"			: {
				"floor" 			: {"ids":[0,1,2,3]},
				"floor ambience" 	: {"ids":[20,21,22,23,24,25,26,27,28,29,30,31]},
				"tiled floor" 		: {"ids":[16,17,18,19]},
				"ne wall" 			: {"ids":[51],"skewY":12},
				"nw wall" 			: {"ids":[50],"skewY":12},
				"e corner" 			: {"ids":[60],"skewY":12},
				"s corner" 			: {"ids":[61],"skewY":12},
				"w corner" 			: {"ids":[62],"skewY":12},
				"n corner" 			: {"ids":[63],"skewY":12},
				"se wall" 			: {"ids":[48,52],"skewY":12},
				"sw wall" 			: {"ids":[49,53],"skewY":12},
				"se wall ambience" 	: {"ids":[80,82,84,86,88,90,92],"skewY":12},
				"sw wall ambience" 	: {"ids":[81,83,85,87,89,91,93],"skewY":12},
				"chest closed"	   	: {"ids":[128,129]},
				"chest open"	   	: {"ids":[144,145]}

			}
		}
	]
};

