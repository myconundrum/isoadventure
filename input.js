

class Input {
	
	constructor() {
		
		document.addEventListener( 'keydown', doKeyDown, false);
		gGraphics.canvas.addEventListener('mousemove',onMouseMove);
		gGraphics.canvas.addEventListener('mousedown',onMouseDown);
		gGraphics.canvas.addEventListener('mouseup',onMouseUp);
		gGraphics.canvas.addEventListener('mousewheel',onMouseWheel,{passive:true});

		this._target = new AnimatedGameObject("runes");
		this._target.playAnimation("click",true);
		this._targetActive = false;
		this._viewOffset = new Point(800,-100);
		this._viewScale  = 1;
		this._scrollDelta = 0;

		this._mouseDrag = false;
		this._mouseDown = false;
		this._mouseDragPos = new Point(0,0);
	}

	get viewOffset()  		{return this._viewOffset;}				// offset to draw pixels on the screen, used with pan
	get viewScale()			{return this._viewScale;}				// scale to draw, used with zooming.

	set viewOffset(v)		{this._viewOffset = v;}
	set viewScale(v)		{this._viewScale = v;}

	get scrollDelta()		{return this._scrollDelta;}
	set scrollDelta(v)      {this._scrollDelta = v;}
	

	get mouseDown() 		{return this._mouseDown;}
	set mouseDown(v) 		{this._mouseDown = v;}
	get mouseDrag() 		{return this._mouseDrag;}
	set mouseDrag(v)		{this._mouseDrag = v;}
	get mouseDragPos()		{return this._mouseDragPos;}
	set mouseDragPos(v)		{this._mouseDragPos = v;}	
	get mouseDragY()		{return this._mouseDragY;}
	get target()  			{return this._target;}
	get targetEnabled() 	{return this._targetEnabled;}

	set targetEnabled(v) 	{this._targetEnabled = v;}
	
}

var MOUSESCROLLSPEED=20
function onMouseWheel(e) {

	gInput.scrollDelta = e.wheelDelta ? e.wheelDelta/40 : e.detail ? -e.detail/3 : 0;
	gUI.handleMouseScroll()

};

function onMouseDown(e) {gInput.mouseDown = true;}

function centerTileOnPos(tile,pos) {
	
	var p = new Point(pos);
	if (tile) {
		p.sub(tile.width/2,tile.height/2);
	}
	return p;
}

function onMouseUp(e) {

	if (!gInput.mouseDrag) {
		gUI.handleMouseClick();
	}

	// clear mouse button down and mouse dragging.
	gInput.mouseDown = false;
	gInput.mouseDrag = false;
}

function onMouseMove(e) {

	var rect = gGraphics.canvas.getBoundingClientRect();
	var x = (e.clientX - rect.left);
	var y = (e.clientY - rect.top);


	// update cursor position.
	gUI.cursor.pos.set(x,y);


	if (gInput.mouseDown && !gInput.mouseDrag) {
		// start a mouse drag, button is down and we are moving the mouse. 
		gInput.mouseDrag = true;
		gInput.mouseDragPos.set(x,y);

	} else if (gInput.mouseDrag) {
		gUI.handleMouseDrag();
	}

}

function doKeyDown(e) {

	switch(e.keyCode) {

		case 69: gUI.toggleWindow("equipped"); break;

	}
}

