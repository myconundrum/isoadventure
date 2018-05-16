

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
		this._height 		= mapInitData.length;
		this._width 		= mapInitData[0].length;
		this._viewOffset   	= new Point(800,-100);
		this._viewScale 	= 1.0;


		var flavors;
		var o;

		this._data = new Array(this._height);
		for (var y = 0; y < this._data.length;y++) {
			this._data[y] = new Array(this._width);
			for (var x = 0; x < this._data[0].length;x++) {

				o = new GameObject(this._tileSheetName);

				switch(mapInitData[y][x]) {
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
				o.pos.set(y,x);
				this._data[y][x] = o;

			}
		}
	}

	get tileSheet() 			{return this._tileSheet};				// tilesheet associated with the background tiles
	get tileSheetName() 		{return this._tileSheetName;}			// name of the tilesheet
	get width()					{return this._width;}					// number of cells wide
	get height() 				{return this._height;}					// number of cells high
	get cellWidth()				{return this._tileSheet.baseWidth;}		// cell width in pixels
	get cellHeight()			{return this._tileSheet.baseHeight;}    // cell height in pixels
	get viewOffset()  			{return this._viewOffset;}				// offset to draw pixels on the screen, used with pan
	get viewScale()				{return this._viewScale;}				// scale to draw, used with zooming.


	set viewOffset(v)			{this._viewOffset = v;}
	set viewScale(v)			{this._viewScale = v;}
	
	get data() {return this._data;}

	mapToScreenX(x,y) 		{return (x-y) * (this.cellWidth/2)}
	mapToScreenY(x,y) 		{return (x+y) * (this.cellHeight/2)}
	screenToMapY (x,y) 		{return y/this.cellHeight - x/this.cellWidth;}
	screenToMapX (x,y) 		{return x/this.cellWidth + y/this.cellHeight;}

	update() {

		var sx,sy,o;
	

		// clear screen, scale to current zoom, and translate to current pan parameters.
		gGraphics.clear();


		//
		// use the transformed offset and scale
		//
		gGraphics.setTransform(this._viewOffset.x,this._viewOffset.y,this._viewScale);
	
		//
		// now draw the visible map and objects.
		//
		for (var y = 0; y < this._height; y++) {
			for (var x = 0; x < this._width; x++) {
				this._data[y][x].draw();
			}
		}


		//
		// draw destination target if one is currently active.
		//
		if (gInput.targetEnabled) {
			gInput.target.draw();
			
		}



		gPlayer.draw();

		//
		// reset the zoom and pan parameters to the identity matrix, and then draw HUD elements.
		//
		gGraphics.resetTransform();

		gInput.cursor.drawNoConversion();
		


		gGraphics.text(10,20,"cursor: " + gInput.cursor.pos.toString());
		gGraphics.text(10,40,"cursor as map: " + new Point(gInput.cursor.pos).toMap().toString());
		gGraphics.text(10,60,"untransformed: " + gGraphics.untransformPoint(gInput.cursor.pos).toMap().toString());
		gGraphics.text(10,80,"target: " + gInput.target.pos.toString());
		gGraphics.text(10,100,"dest: " + gPlayer.dest.toString());
		gGraphics.text(10,120,"loc: " + gPlayer.pos.toString());
		gGraphics.text(10,140,"scale: " + this.viewScale.toString());
	}
}


