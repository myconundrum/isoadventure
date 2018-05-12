



class Assets {
	

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

function Map() {

	this.data = [
		[61,48,48,48,48,48,48,48,48,48,48,48,60],
		[49,0,0,0,0,0,1,0,0,0,0,0,51],
		[49,0,0,0,0,0,1,0,0,0,0,0,51],
		[49,0,0,0,0,0,1,0,0,0,0,0,51],
		[49,0,0,0,0,0,1,0,0,0,0,0,51],
		[49,0,0,0,0,0,1,0,0,0,0,0,51],
		[49,0,0,0,0,0,1,0,0,0,0,0,51],
		[49,0,0,0,0,0,1,0,0,0,0,0,51],
		[49,0,0,0,0,0,1,0,0,0,0,0,51],
		[49,0,0,0,0,0,1,0,0,0,0,0,51],
		[49,0,0,0,0,0,1,0,0,0,0,0,51],
		[49,0,0,0,0,0,1,0,0,0,0,0,51],
		[62,50,50,50,50,50,50,50,50,50,50,50,63]
		];

	var tiles = gAssets.tiles("dungeon");
	var flavors = tiles.getFlavorsOfType("chest closed");

	this.chest = new GameObject();
	this.chest.tile = flavors[randInt(0,flavors.length)];

	for (var x = 0; x < this.data.length;x++) {
		for (var y = 0; y < this.data[0].length;y++) {

			switch(this.data[x][y]) {
			case 0:
				if (randInt(0,10) >= 1) {
					flavors = tiles.getFlavorsOfType("floor");	
				}
				else {
					flavors = tiles.getFlavorsOfType("floor ambience");
				} 
				this.data[x][y] = flavors[randInt(0,flavors.length)];
			break;
			case 1:
				var flavors = tiles.getFlavorsOfType("tiled floor");
				this.data[x][y] = flavors[randInt(0,flavors.length)];
			break;
			case 48:
				if (randInt(0,6) >= 1) {
					flavors = tiles.getFlavorsOfType("se wall");	
				}
				else {
					flavors = tiles.getFlavorsOfType("se wall ambience");
				} 
				this.data[x][y] = flavors[randInt(0,flavors.length)];
			break;
			case 49:
				if (randInt(0,6) >= 1) {
					flavors = tiles.getFlavorsOfType("sw wall");	
				}
				else {
					flavors = tiles.getFlavorsOfType("sw wall ambience");
				} 
				this.data[x][y] = flavors[randInt(0,flavors.length)];
			break;

			}
		}
	}

	console.log(this.data);
}


