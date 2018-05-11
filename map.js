



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
					gConfig["tilesheets"][index]["path"],
					gConfig["tilesheets"][index]["tileWidth"],
					gConfig["tilesheets"][index]["tileHeight"],
					gConfig["tilesheets"][index]["baseWidth"],
					gConfig["tilesheets"][index]["baseHeight"],
					gConfig["tilesheets"][index]["name"],
					gConfig["tilesheets"][index]["animations"]["directions"],
					gConfig["tilesheets"][index]["animations"]["actions"] 
					)
				
				this._spriteSheets[gConfig["tilesheets"][index]["name"]] = s;

			} else {
		
				var t = new TileSheet(
					gConfig["tilesheets"][index]["path"],
					gConfig["tilesheets"][index]["tileWidth"],
					gConfig["tilesheets"][index]["tileHeight"],
					gConfig["tilesheets"][index]["baseWidth"],
					gConfig["tilesheets"][index]["baseHeight"]
					);

				this._tileSheets[gConfig["tilesheets"][index]["name"]] = t;

			}
		}
	}
	

	tiles(name) 		{return this._tileSheets[name];}
	sprites(name) 		{return this._spriteSheets[name];}

		
}

//
// just for testing.
//
var FLOOR = 1;
var WALL = 2;

function Map() {

	this.data = [
		[61,48,48,48,48,48,48,48,48,60],
		[49,0,0,0,0,0,0,0,0,51],
		[49,0,0,0,0,0,0,0,0,51],
		[49,0,0,0,0,0,0,0,0,51],
		[49,0,0,0,0,0,0,0,0,51],
		[49,0,0,0,0,0,0,0,0,51],
		[49,0,0,0,0,0,0,0,0,51],
		[49,0,0,0,0,0,0,0,0,51],
		[49,0,0,0,0,0,0,0,0,51],
		[62,50,50,50,50,50,50,50,50,63]
		
		]

		/*

	this.data = new Array();
	for (var x = 0; x < 10; x++) {
		this.data[x] = new Array();
		for (var y = 0; y < 10; y++) {
			if (y == 0 && x == 0) { 
				this.data[x][y] = 61;
			} else if (y == 0 && x == 9) {
				this.data[x][y] = 62;
			} else if (y == 0) {
				this.data[x][y] = 49;
			
			} else if (x == 0 && y == 9) {
				this.data[x][y] = 60
			}
			else if (x == 0) {
				this.data[x][y] = 48;
			} else {
				this.data[x][y] = 0;
			}
		}
	}
	*/
	console.log(this.data);
}


