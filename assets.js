class Assets {

	constructor() {
		
		this._tileSheets = {};

		this._loadedTileSheets = 0;

		for (var i in gConfig.tilesheets) {

			var cur = gConfig.tilesheets[i];
			var t = new TileSheet(cur.name,cur.path,cur.tileWidth,cur.tileHeight);

			if (cur.hasOwnProperty("globalScale")) {
				t.globalScale = cur.globalScale;
			}

			if (cur.hasOwnProperty("baseWidth")) {
				t.baseWidth = cur.baseWidth;
			}

			if (cur.hasOwnProperty("baseHeight")) {
				t.baseHeight = cur.baseHeight;
			}

			if (cur.hasOwnProperty("animations")) {
				for (var anim in cur.animations) {
					t.animations[anim] = new Animation(
						cur.animations[anim].start,
						cur.animations[anim].frames,
						cur.animations[anim].duration
						);
				}
			}

			if (cur.hasOwnProperty("directions")) {
				t.directions = cur.directions;
				t.useDirections = true;
			}

			if (cur.hasOwnProperty("tiles")) {
				for (var tile in cur.tiles) {
					var ids = cur.tiles[tile].ids;
					var skewX = cur.tiles[tile].hasOwnProperty("skewX") ? cur.tiles[tile].skewX : 0;
					var skewY = cur.tiles[tile].hasOwnProperty("skewY") ? cur.tiles[tile].skewY : 0;;
					t.tiles[tile] = new NamedTile(ids,skewX,skewY);
				}
			}
			this._tileSheets[cur.name] = t;
		}

		
	}

	get loadedTileSheets() 	{return this._loadedTileSheets;}
	set loadedTileSheets(v)	{this._loadedTileSheets = v;}

	get tileSheets() {return this._tileSheets;}

	loaded() {return this._loadedTileSheets == gConfig.tilesheets.length}
}

class Tile {

	constructor(sheet,x,y,width,height,skewX,skewY,scale) {
		this._x 			= x;
		this._y 			= y;
		this._sheet 		= sheet;
		this._width 		= width;
		this._height 		= height;
		this._skewX			= skewX;
		this._skewY 		= skewY;
	}

	get x() 				{return this._x;}
	get y() 				{return this._y;}
	get width() 			{return this._width;}
	get height() 			{return this._height;}
	get sheet() 			{return this._sheet;}
	get skewY() 			{return this._skewY;}
	get skewX() 			{return this._skewX;}
}


class Animation {

	constructor(start,frames,duration) {
		this._start 		= start;
		this._frames 		= frames;
		this._duration 		= duration;
	}
	get start() 		{return this._start;}
	get frames() 		{return this._frames;}
	get duration() 		{return this._duration;}
}

class NamedTile {

	constructor(ids,skewX,skewY) {
		this._ids = ids;
		this._skewX = skewX;
		this._skewY = skewY;
	}
	get ids() 	{return this._ids;}
	get skewX()	{return this._skewX;}
	get skewY() {return this._skewY;}
}

class TileSheet {

	constructor(name,path,width,height) {

		this._img 			= new Image();
		this._name	 		= name;
		this._path 			= path;
		this._width 		= width;
		this._height 		= height;
		this._baseWidth 	= width;
		this._baseHeight 	= height;
		this._globalScale   = 1;
		this._tiles 		= {};
		this._animations 	= {};
		this._directions    = [];
		this._useDirections = false;

		//
		// deferred image load
		//
		var thisref = this;
		this._img.onload = function() {

			console.log("Loaded TileSheet from " + path + ".");
			console.log("(w,h): (",thisref._img.naturalWidth.toString() + "," + thisref._img.naturalHeight.toString() +").");

			thisref._tilesPerLine 	= thisref._img.naturalWidth/thisref._width;
			thisref._numLines 		= thisref._img.naturalHeight/thisref._height;
			thisref._maxIndex 		= thisref._tilesPerLine * thisref._numLines - 1;

			console.log("   " + (thisref._tilesPerLine * thisref._numLines).toString() + " " + thisref._width.toString() + "X" + 
				thisref._height.toString() + " tiles loaded.");

			gAssets.loadedTileSheets++;
		};
		this._img.src = this._path;
	}

	get image() 				{return this._img;}
	get name() 					{return this._name;}
	get path() 					{return this._path;}
	get width() 				{return this._width;}
	get height() 				{return this._height;}
	get baseWidth() 			{return this._baseWidth;}
	get baseHeight() 			{return this._baseHeight;}
	get globalScale() 			{return this._globalScale;}
	get tiles()					{return this._tiles;}
	get animations() 			{return this._animations;}
	get directions() 			{return this._directions;}
	get useDirections()   		{return this._useDirections;}

	get tilesPerLine() 	{return this._tilesPerLine;}
	get numLines() 		{return this._numLines;}
	get maxIndex()		{return this._maxIndex;}
	
	set image(v)				{this._img = v;}
	set name(v) 				{this._name = v;}
	set path(v) 				{this._path = v;}
	set width(v) 				{this._width = v;}
	set height(v) 				{this._height = v;}
	set baseWidth(v) 			{this._baseWidth = v;}
	set baseHeight(v) 			{this._baseHeight = v;}
	set globalScale(v) 			{this._globalScale = v;}
	set directions(v) 			{this._directions = v;}
	set useDirections(v)   		{this._useDirections = v;}

	tileX(index) {return parseInt(index%this._tilesPerLine) * this._width;}
	tileY(index) {return parseInt(index/this._tilesPerLine) * this._height;}

	getTileByIndex(index) {
		return new Tile(this,this.tileX(index),this.tileY(index),this._width,this._height,0,0);
	}

	getTileByName(name,getFlavor) {

		var nTile = this.tiles[name];
		var id = getFlavor ? nTile.ids[randInt(0,nTile.ids.length)] : nTile.ids[0];
		return new Tile(this,this.tileX(id),this.tileY(id),this.width,this.height,nTile.skewX,nTile.skewY);
	}
}



class oldAssets {
	

	//
	// all of the graphics items in the game.
	//

	constructor() {

		this._tileSheets = {};
		this._spriteSheets   = {};

		for (var index in gConfig["tilesheets"]) {
		
			if (gConfig["tilesheets"][index]["type"]=="sprite") {
				
				var s = new SpriteSheet(
					gConfig.tilesheets[index].path,
					gConfig.tilesheets[index].tileWidth,
					gConfig.tilesheets[index].tileHeight,
					gConfig.tilesheets[index].baseWidth,
					gConfig.tilesheets[index].baseHeight,
					gConfig.tilesheets[index].tiles,
					gConfig.tilesheets[index].name,
					gConfig.tilesheets[index].animations.directions,
					gConfig.tilesheets[index].animations.actions 
					)
				
				this._spriteSheets[gConfig["tilesheets"][index]["name"]] = s;

			} else {
		
				var t = new TileSheet(
					gConfig.tilesheets[index].path,
					gConfig.tilesheets[index].tileWidth,
					gConfig.tilesheets[index].tileHeight,
					gConfig.tilesheets[index].baseWidth,
					gConfig.tilesheets[index].baseHeight,
					gConfig.tilesheets[index].tiles
					);

				this._tileSheets[gConfig["tilesheets"][index]["name"]] = t;

			}
		}
	}
	

	tiles(name) 		{return this._tileSheets[name];}
	sprites(name) 		{return this._spriteSheets[name];}

		
}





/*
	OLD Tilesheet class deals with PNGs of mulitple graphics.
*/

class oldTileSheet {

	constructor(path,width,height,baseWidth,baseHeight,tiles) {
		
		//
		// private class variables
		//
		this._path 				= path;
		this._tileWidth 		= width;
		this._tileHeight 		= height;
		this._baseWidth 		= baseWidth;
		this._baseHeight		= baseHeight;
		this._img 				= new Image();
		this._tiles 			= tiles;
	
		//
		// deferred image load
		//
		var thisref = this;
		this._img.onload = function() {

			console.log("Loaded TileSheet from " + path + ".");
			console.log("(w,h): (",thisref._img.naturalWidth.toString() + "," + thisref._img.naturalHeight.toString() +").");

			thisref._tilesPerLine 	= thisref._img.naturalWidth/thisref._width;
			thisref._numLines 		= thisref._img.naturalHeight/thisref._height;
			thisref._maxIndex 		= thisref._tilesPerLine * thisref._numLines - 1;

			console.log("   " + (thisref._tilesPerLine * thisref._numLines).toString() + " " + thisref._width.toString() + "X" + 
				thisref._height.toString() + " tiles loaded.");

		};

		this._img.src = this._path;
	}

	get image() 		{return this._img;}
	get tilesPerLine() 	{return this._tilesPerLine;}
	get numLines() 		{return this._numLines;}
	get maxIndex()		{return this._maxIndex;}
	get tileWidth()		{return this._tileWidth;}				// the width in pixels of each tile in the sheet.
	get tileHeight() 	{return this._tileHeight;}				// the height in pixels of each tile in the sheet.
	get baseWidth()		{return this._baseWidth;}				// the width of a floor tile
	get baseHeight() 	{return this._baseHeight;}				// the height of a floor tile.


	tileX(index) {return parseInt(index%this._tilesPerLine) * this._tileWidth;}
	tileY(index) {return parseInt(index/this._tilesPerLine) * this._tileHeight;}

	getTile(index) {
		return new Tile(this.image,this.tileX(index),this.tileY(index),this.tileWidth,this.tileHeight);
	}

	getFlavorsOfType(type) {
		return this._tiles[type];
	}
}



class oldAnimation {

	constructor (name,start,stop) {
		this._name = name;
		this._start = start;
		this._stop = stop;
	}

	get name() 			{return this._name;}
	get start() 		{return this._start;}
	get stop() 			{return this._stop;}

	set name(v) 		{this._name=v;}
	set start(v) 		{this._start=v;}
	set stop(v) 		{this._stop=v;}
}

class oldSpriteSheet extends TileSheet {

	constructor (path,width,height,baseWidth,baseHeight,tiles,name,directions,actions) {
		
		super(path,width,height,baseWidth,baseHeight);

		this._name 			= name;
		this._actions 		= {};
		this._directions 	= directions;

		var start = 0;
		var stop = 0;

		for (var i = 0; i < actions.length; i++) {
			stop = start + actions[i][1] - 1;
			var anim = new Animation(actions[i][0],start,stop);
			this._actions[anim.name] = anim; 
			start = stop+1;	
		}
	}


	get name() 			{return this._name;}
	get directions() 	{return this._directions;}
	get actions() 		{return this._actions;}
}

