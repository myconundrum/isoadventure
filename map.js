


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

	var tiles = gAssets.tileSheets["dungeon"];
	var flavors;
	var o;

	for (var x = 0; x < this.data.length;x++) {
		for (var y = 0; y < this.data[0].length;y++) {

			o = new GameObject();

			switch(this.data[x][y]) {
			case 0:
				o.tile = (randInt(0,10)>= 1) ? tiles.getTileByName("floor",true) : tiles.getTileByName("floor ambience",true)
			break;
			case 1:
				o.tile = tiles.getTileByName("tiled floor",true);
			break;
			case 48:
				o.tile = (randInt(0,6) >= 1) ? tiles.getTileByName("se wall",true) : tiles.getTileByName("se wall ambience",true);
			break;
			case 49:
				o.tile = (randInt(0,6) >= 1) ? tiles.getTileByName("sw wall",true) : tiles.getTileByName("sw wall ambience",true);
			break;
			case 51: 
				o.tile = tiles.getTileByName("ne wall",false);
			break;
			case 50: 
				o.tile = tiles.getTileByName("nw wall",false);
			break;
			case 60: 
				o.tile = tiles.getTileByName("e corner",false);
			break;
			case 61: 
				o.tile = tiles.getTileByName("s corner",false);
			break;
			case 62: 
				o.tile = tiles.getTileByName("w corner",false);
			break;
			case 63: 
				o.tile = tiles.getTileByName("n corner",false);
			break;
			}
			this.data[x][y] = o;
		}
	}


	console.log("Map updated.");	
}


