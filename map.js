

var mapInitData = [
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,61,48,48,48,48,48,48,48,48,48,48,48,60, 0, 0, 0, 0, 0, 0, 0],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,49, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2,51, 0, 0, 0, 0, 0, 0, 0],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,49, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2,51, 0, 0, 0, 0, 0, 0, 0],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,49, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2,51, 0, 0, 0, 0, 0, 0, 0],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,49, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2,51, 0, 0, 0, 0, 0, 0, 0],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,49, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2,51, 0, 0, 0, 0, 0, 0, 0],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,49, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2,51, 0, 0, 0, 0, 0, 0, 0],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,49, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2,51, 0, 0, 0, 0, 0, 0, 0],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,49, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2,51, 0, 0, 0, 0, 0, 0, 0],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,49, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2,51, 0, 0, 0, 0, 0, 0, 0],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,49, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2,51, 0, 0, 0, 0, 0, 0, 0],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,49, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2,51, 0, 0, 0, 0, 0, 0, 0],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,62,50,50,50,50, 2, 2,50,50,50,50,50,63, 0, 0, 0, 0, 0, 0, 0],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,49, 2, 2,51, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,49, 2, 2,51, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,63, 2, 2,51, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2,51, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2,51, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

	];

class Map {

	constructor() {

		this._tileSheetName = "dungeon";
		this._tileSheet 	= gAssets.tileSheets[this._tileSheetName];
		this._width 		= mapInitData.length;
		this._height 		= mapInitData[0].length;
		this._viewOffset   	= new Point(800,-100);


		var flavors;
		var o;

		this._data = new Array(this._width);
		for (var x = 0; x < this._data.length;x++) {
			this._data[x] = new Array(this._height);
			for (var y = 0; y < this._data[0].length;y++) {

				o = new GameObject(this._tileSheetName);

				switch(mapInitData[x][y]) {
				case 0: o = new EmptyGameObject(this._tileSheetName);
					break;
				case 2:
					o.tile = (randInt(0,10)>= 1) ? this._tileSheet.getTileByName("floor",true) : this._tileSheet.getTileByName("floor ambience",true)
				break;
				case 1:
					o.tile = this._tileSheet.getTileByName("tiled floor",true);
				break;
				case 48:
					o.tile = (randInt(0,6) >= 1) ? this._tileSheet.getTileByName("se wall",true) : this._tileSheet.getTileByName("se wall ambience",true);
				break;
				case 49:
					o.tile = (randInt(0,6) >= 1) ? this._tileSheet.getTileByName("sw wall",true) : this._tileSheet.getTileByName("sw wall ambience",true);
				break;
				case 51: 
					o.tile = this._tileSheet.getTileByName("ne wall",false);
				break;
				case 50: 
					o.tile = this._tileSheet.getTileByName("nw wall",false);
				break;
				case 60: 
					o.tile = this._tileSheet.getTileByName("e corner",false);
				break;
				case 61: 
					o.tile = this._tileSheet.getTileByName("s corner",false);
				break;
				case 62: 
					o.tile = this._tileSheet.getTileByName("w corner",false);
				break;
				case 63: 
					o.tile = this._tileSheet.getTileByName("n corner",false);
				break;
				}
				o.pos.set(x,y);
				this._data[x][y] = o;

			}
		}
	}

	get tileSheet() 			{return this._tileSheet};				// tilesheet associated with the background tiles
	get tileSheetName() 		{return this._tileSheetName;}			// name of the tilesheet
	get width()					{return this._width;}					// number of cells wide
	get height() 				{return this._height;}					// number of cells high
	get cellWidth()				{return this._tileSheet.baseWidth;}		// cell width in pixels
	get cellHeight()			{return this._tileSheet.baseHeight;}    // cell height in pixels
	get viewOffset()  			{return this._viewOffset;}

	set viewOffset(v)			{this._viewOffset = v;}
	
	get data() {return this._data;}

	mapToScreenX(x,y) {return (x-y) * (this.cellWidth/2) + this._viewOffset.x;}

	mapToScreenY(x,y) {return (x+y) * (this.cellHeight/2) + this._viewOffset.y;}

	screenToMapX(x,y) {
		var dx = x - this._viewOffset.x;
		var dy = y - this._viewOffset.y;
	
		return dx / this.cellWidth + dy / this.cellHeight;
	}

	screenToMapY(x,y) {
		var dx = x - this._viewOffset.x;
		var dy = y - this._viewOffset.y;
	
		return dy / this.cellHeight - dx/this.cellWidth;  
	}

	update() {

		var sx,sy,o;
	
		gGraphics.clear();

		for (var x = 0; x < this._data.length; x++) {
			for (var y = 0; y < this._data[0].length; y++) {
				this._data[x][y].draw();
			}
		}

		if (gInput.targetEnabled) {
			gInput.target.draw();
			
		}

		gPlayer.draw();
		gInput.cursor.drawNoConversion();
		

		gGraphics.text(10,20,"cursor: " + gInput.cursor.pos.toString());
		gGraphics.text(10,40,"target: " + gInput.target.pos.toString());
		gGraphics.text(10,60,"dest: " + gPlayer.dest.toString());
		gGraphics.text(10,80,"loc: " + gPlayer.pos.toString());
	}
}


