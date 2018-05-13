


class Map {

	constructor() {

		this._data = [
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

		for (var x = 0; x < this._data.length;x++) {
			for (var y = 0; y < this._data[0].length;y++) {

				o = new GameObject("dungeon");

				switch(this._data[x][y]) {
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
				this._data[x][y] = o;
			}
		}
	}

	get data() {return this._data;}

	update() {

		var sx,sy,o;
	
		gGraphics.clear();

		for (var x = 0; x < this._data.length; x++) {
			for (var y = 0; y < this._data[0].length; y++) {
				o = this._data[x][y];

				sx = (x - y) * (o.tile.sheet.baseWidth / 2)  + 500;
				sy = (x + y) * (o.tile.sheet.baseHeight / 2) + 100;
				gGraphics.drawTile(sx,sy,o.tile);
			}
		}

		gGraphics.drawTile(gPlayer.loc.x,gPlayer.loc.y,gPlayer.tile);
		//gGraphics.drawObject(frame,gPlayer);
		
		if (gInput.targetEnabled) {
			gGraphics.drawTile(gInput.targetX,gInput.targetY,gInput.target.tile);
		}
		gGraphics.drawTile(gInput.cursor.loc.x,gInput.cursor.loc.y,gInput.cursor.tile);

		gGraphics.text(10,20,"cursor:" + gInput.cursorX + "," + gInput.cursorY);
		gGraphics.text(10,40,"target: " + gInput.targetX +","+gInput.targetY);
		gGraphics.text(10,60,"dest: " + gPlayer.destination.x +","+gPlayer.destination.y);
		gGraphics.text(10,80,"loc:" + gPlayer.loc.x+","+gPlayer.loc.y);
	}
}


