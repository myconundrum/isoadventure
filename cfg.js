

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
	"ui" : {
		"action bar" 	: "assets/ui/Main Action Bar/Action Bar Texture/abt_whole.png",
		"xp fill"    	: "assets/ui/Main Action Bar/Action Bar Texture/xp_fill.png",
		"xp gloss"    	: "assets/ui/Main Action Bar/Action Bar Texture/xp_gloss.png",
		"xp separators"	: "assets/ui/Main Action Bar/Action Bar Texture/xp_separators.png",

	},

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
			"name"			: "default chest",
			"path"			: "assets/hero/default_chest.png",
			"tileWidth"		: 128,
			"tileHeight"	: 128,
			"globalScale"	: 1.75,
			"globalSkewX"	: -80,
			"globalSkewY"	: -140,
			"animations"    : {
				"stand" 	: {"start":0,"frames":4,"duration":800},
				"run"		: {"start":4,"frames":8,"duration":533},
				"swing"		: {"start":12,"frames":4,"duration":300},
				"cast"		: {"start":24,"frames":4,"duration":533},
				"shoot"		: {"start":28,"frames":4,"duration":400},
				"block"		: {"start":16,"frames":2,"duration":200},
				"hit"		: {"start":18,"frames":2,"duration":133},
				"die"		: {"start":18,"frames":6,"duration":400},
				
			},
			"directions" : ["west","northwest","north","northeast","east","southeast","south","southwest"]
		},

		{
			"name"			: "default head",
			"path"			: "assets/hero/male_head1.png",
			"tileWidth"		: 128,
			"tileHeight"	: 128,
			"globalScale"	: 1.75,
			"globalSkewX"	: -80,
			"globalSkewY"	: -140,
			"animations"    : {
				"stand" 	: {"start":0,"frames":4,"duration":800},
				"run"		: {"start":4,"frames":8,"duration":533},
				"swing"		: {"start":12,"frames":4,"duration":300},
				"cast"		: {"start":24,"frames":4,"duration":533},
				"shoot"		: {"start":28,"frames":4,"duration":400},
				"block"		: {"start":16,"frames":2,"duration":200},
				"hit"		: {"start":18,"frames":2,"duration":133},
				"die"		: {"start":18,"frames":6,"duration":400},
				
			},
			"directions" : ["west","northwest","north","northeast","east","southeast","south","southwest"]
		},

		{
			"name"			: "default legs",
			"path"			: "assets/hero/default_legs.png",
			"tileWidth"		: 128,
			"tileHeight"	: 128,
			"globalScale"	: 1.75,
			"globalSkewX"	: -80,
			"globalSkewY"	: -140,
			"animations"    : {
				"stand" 	: {"start":0,"frames":4,"duration":800},
				"run"		: {"start":4,"frames":8,"duration":533},
				"swing"		: {"start":12,"frames":4,"duration":300},
				"cast"		: {"start":24,"frames":4,"duration":533},
				"shoot"		: {"start":28,"frames":4,"duration":400},
				"block"		: {"start":16,"frames":2,"duration":200},
				"hit"		: {"start":18,"frames":2,"duration":133},
				"die"		: {"start":18,"frames":6,"duration":400},
				
			},
			"directions" : ["west","northwest","north","northeast","east","southeast","south","southwest"]
		},

		{
			"name"			: "default feet",
			"path"			: "assets/hero/default_feet.png",
			"tileWidth"		: 128,
			"tileHeight"	: 128,
			"globalScale"	: 1.75,
			"globalSkewX"	: -80,
			"globalSkewY"	: -140,
			"animations"    : {
				"stand" 	: {"start":0,"frames":4,"duration":800},
				"run"		: {"start":4,"frames":8,"duration":533},
				"swing"		: {"start":12,"frames":4,"duration":300},
				"cast"		: {"start":24,"frames":4,"duration":533},
				"shoot"		: {"start":28,"frames":4,"duration":400},
				"block"		: {"start":16,"frames":2,"duration":200},
				"hit"		: {"start":18,"frames":2,"duration":133},
				"die"		: {"start":18,"frames":6,"duration":400},
				
			},
			"directions" : ["west","northwest","north","northeast","east","southeast","south","southwest"]
		},

		{
			"name"			: "default hands",
			"path"			: "assets/hero/default_hands.png",
			"tileWidth"		: 128,
			"tileHeight"	: 128,
			"globalScale"	: 1.75,
			"globalSkewX"	: -80,
			"globalSkewY"	: -140,
			"animations"    : {
				"stand" 	: {"start":0,"frames":4,"duration":800},
				"run"		: {"start":4,"frames":8,"duration":533},
				"swing"		: {"start":12,"frames":4,"duration":300},
				"cast"		: {"start":24,"frames":4,"duration":533},
				"shoot"		: {"start":28,"frames":4,"duration":400},
				"block"		: {"start":16,"frames":2,"duration":200},
				"hit"		: {"start":18,"frames":2,"duration":133},
				"die"		: {"start":18,"frames":6,"duration":400},
				
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
			"name"			: "action bar",
			"path"			: "assets/ui/Main Action Bar/Action Bar Texture/abt_whole.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: .6
		},

		{
			"name"			: "action frame",
			"path"			: "assets/ui/Main Action Bar/Potions Type B/p_frame.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: .6,
			"globalSkewX"   : 74,
			"globalSkewY"	: 16
		},

		{
			"name"			: "left mouse",
			"path"			: "assets/ui/Main Action Bar/Mouse Abilities/left_mouse_button.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: .6,
			"globalSkewX"   : 77,
			"globalSkewY"	: 18
		},
		{
			"name"			: "right mouse",
			"path"			: "assets/ui/Main Action Bar/Mouse Abilities/right_mouse_button.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: .6,
			"globalSkewX"   : 77,
			"globalSkewY"	: 18
		},

		{
			"name"			: "xp gloss",
			"path"			: "assets/ui/Main Action Bar/Action Bar Texture/xp_gloss.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: .6,
			"globalSkewX"   : 52,
			"globalSkewY"   : 66
		},

		{
			"name"			: "xp separators",
			"path"			: "assets/ui/Main Action Bar/Action Bar Texture/xp_separators.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: .6,
			"globalSkewX"   : 98,
			"globalSkewY"   : 62
		},
		{
			"name"			: "hp frame",
			"path"			: "assets/ui/Main Action Bar/Health Points/hp_frame.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: .6,
			"globalSkewX"   : -55,
			"globalSkewY"   : -35
		},
		{
			"name"			: "hp gloss",
			"path"			: "assets/ui/Main Action Bar/Health Points/hp_gloss.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: .6,
			"globalSkewX"   : -51.5,
			"globalSkewY"   : -30
		},
		{
			"name"			: "mana frame",
			"path"			: "assets/ui/Main Action Bar/Resource Points (Mana Type)/rp_frame.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: .6,
			"globalSkewX"   : 500,
			"globalSkewY"   : -35
		},
		{
			"name"			: "mana gloss",
			"path"			: "assets/ui/Main Action Bar/Resource Points (Mana Type)/rp_gloss.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: .6,
			"globalSkewX"   : 505.5,
			"globalSkewY"   : -30
		},



		{
			"name"			: "attack cursor",
			"path"			: "assets/ui/Cursors/attack_n.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: 1,
			"globalSkewX"   : 0,
			"globalSkewY"   : 0
		},

		{
			"name"			: "attack cursor invalid",
			"path"			: "assets/ui/Cursors/attack_in.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: 1,
			"globalSkewX"   : 0,
			"globalSkewY"   : 0
		},


		{
			"name"			: "mouse cursor",
			"path"			: "assets/ui/Cursors/mouse_n.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: 1,
			"globalSkewX"   : 0,
			"globalSkewY"   : 0
		},

		{
			"name"			: "mouse cursor invalid",
			"path"			: "assets/ui/Cursors/mouse_in.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: 1,
			"globalSkewX"   : 0,
			"globalSkewY"   : 0
		},

		{
			"name"			: "merchant cursor",
			"path"			: "assets/ui/Cursors/merchant_n.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: 1,
			"globalSkewX"   : 0,
			"globalSkewY"   : 0
		},

		{
			"name"			: "merchant cursor invalid",
			"path"			: "assets/ui/Cursors/merchant_in.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: 1,
			"globalSkewX"   : 0,
			"globalSkewY"   : 0
		},


		{
			"name"			: "portal cursor",
			"path"			: "assets/ui/Cursors/portal_n.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: 1,
			"globalSkewX"   : 0,
			"globalSkewY"   : 0
		},

		{
			"name"			: "portal cursor invalid",
			"path"			: "assets/ui/Cursors/portal_in.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: 1,
			"globalSkewX"   : 0,
			"globalSkewY"   : 0
		},

		{
			"name"			: "talk cursor",
			"path"			: "assets/ui/Cursors/talk_n.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: 1,
			"globalSkewX"   : 0,
			"globalSkewY"   : 0
		},

		{
			"name"			: "talk cursor invalid",
			"path"			: "assets/ui/Cursors/talk_in.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: 1,
			"globalSkewX"   : 0,
			"globalSkewY"   : 0
		},


		{
			"name"			: "medium box bottom frame",
			"path"			: "assets/ui/Box Player Inventory/bottom_box_ornament.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: .5,
			"globalSkewX"   : 0,
			"globalSkewY"   : 0
		},


		{
			"name"			: "medium box top frame",
			"path"			: "assets/ui/Box Player Inventory/texture_big_heading.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: .5,
			"globalSkewX"   : 0,
			"globalSkewY"   : 0
		},


		{
			"name"			: "medium box background",
			"path"			: "assets/ui/Box Player Inventory/player_bg_outer.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: .6,
			"globalSkewX"   : 2,
			"globalSkewY"   : 0
		},


		{
			"name"			: "book",
			"path"			: "assets/ui/Box Player Inventory/player_book_bg.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: .8,
			"globalSkewX"   : 0,
			"globalSkewY"   : 0
		},

		{
			"name"			: "player inventory pic",
			"path"			: "assets/ui/Box Player Inventory/player_character_example.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: .8,
			"globalSkewX"   : 0,
			"globalSkewY"   : 0
		},

		{
			"name"			: "equip slot",
			"path"			: "assets/ui/Box Player Inventory/slot.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: 1,
			"globalSkewX"   : 0,
			"globalSkewY"   : 0
		},


		{
			"name"			: "heading",
			"path"			: "assets/ui/Box Player Inventory/small_heading.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: .5,
			"globalSkewX"   : 0,
			"globalSkewY"   : 0
		},


		{
			"name"			: "big box bottom frame",
			"path"			: "assets/ui/Box Player Inventory/bottom_box_ornament.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: .6,
			"globalSkewX"   : 0,
			"globalSkewY"   : 0
		},


		{
			"name"			: "big box top frame",
			"path"			: "assets/ui/Box Big Map/big_heading.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: .6,
			"globalSkewX"   : 0,
			"globalSkewY"   : 0
		},

		{
			"name"			: "big box background",
			"path"			: "assets/ui/Box Big Map/big_map_outer.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: .6,
			"globalSkewX"   : 2,
			"globalSkewY"   : 0
		},
		{
			"name"			: "legend",
			"path"			: "assets/ui/Box Big Map/legend.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: 1,
			"globalSkewX"   : 2,
			"globalSkewY"   : 0
		},
		
		{
			"name"			: "close button",
			"path"			: "assets/ui/Box Big Map/close_button_a.png",
			"tileWidth"		: -1,
			"tileHeight"	: -1,
			"globalScale" 	: .6,
			"globalSkewX"   : 0,
			"globalSkewY"   : 0
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

