




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
			"name"			: "cave",
			"path"			: "assets/cave_tileset.png",
			"tileWidth"		: 64,
			"tileHeight"	: 32,
			"type"			: "tilesheet"
		},
		{
			"name"			: "dungeon",
			"path"			: "assets/dungeon_tileset.png",
			"tileWidth"		: 64,
			"tileHeight"	: 32,
			"type"			: "tilesheet"
		}
	]
};

