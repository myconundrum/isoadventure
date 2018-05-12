




var gConfig = {

	"tilesheets" : [
		{
			"name"			: "goblin",
			"path"			: "assets/goblin.png",
			"tileWidth"		: 128,
			"tileHeight"	: 128,
			"type"			: "sprite",
			"animations"    : {
				"actions" : [["stand",4],["jump",8],["charge",8],["attack",4],["throw",6],["block",2],["hit",2],["die",6],["crit die",8]],
				"directions" : ["west","northwest","north","northeast","east","southeast","south","southwest"]
			}			
		
		},
		{
			"name"			: "runes",
			"path"			: "assets/runes.png",
			"tileWidth"		: 64,
			"tileHeight"	: 64,
			"type"			: "sprite",
			"animations"    : {
				"actions" : [["click",4]],
				"directions" : ["none"]
			}			
		
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
				"floor" : [0,1,2,3],
				"floor ambience" : [20,21,22,23,24,25,26,27,28,29,30,31],
				"tiled floor" : [16,17,18,19],
				"se wall" : [48,52],
				"sw wall" : [49,53],
				"se wall ambience" : [80,82,84,86,88,90,92],
				"sw wall ambience" : [81,83,85,87,89,91,93],
				"chest closed"	   : [128,129],
				"chest open"	   : [144,145]


			}
		}
	]
};

