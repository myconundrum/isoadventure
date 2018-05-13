


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

	var flavors;
	var o;

	for (var x = 0; x < this.data.length;x++) {
		for (var y = 0; y < this.data[0].length;y++) {

			o = new GameObject("dungeon");

			switch(this.data[x][y]) {
			case 0:
				o.tile = (randInt(0,10)>= 1) ? o.sheet.getTileByName("floor",true) : o.sheet.getTileByName("floor ambience",true)
			break;
			case 1:
				o.tile = o.sheet.getTileByName("tiled floor",true);
			break;
			case 48:
				o.tile = (randInt(0,6) >= 1) ? o.sheet.getTileByName("se wall",true) : o.sheet.getTileByName("se wall ambience",true);
			break;
			case 49:
				o.tile = (randInt(0,6) >= 1) ? o.sheet.getTileByName("sw wall",true) : o.sheet.getTileByName("sw wall ambience",true);
			break;
			case 51: 
				o.tile = o.sheet.getTileByName("ne wall",false);
			break;
			case 50: 
				o.tile = o.sheet.getTileByName("nw wall",false);
			break;
			case 60: 
				o.tile = o.sheet.getTileByName("e corner",false);
			break;
			case 61: 
				o.tile = o.sheet.getTileByName("s corner",false);
			break;
			case 62: 
				o.tile = o.sheet.getTileByName("w corner",false);
			break;
			case 63: 
				o.tile = o.sheet.getTileByName("n corner",false);
			break;
			}
			this.data[x][y] = o;
		}
	}


	console.log("Map updated.");	
}


