


//
// game subsystem variables
//
var gGraphics;
var gInput;


var fr1;
var fr2;

var tileSheet = new TileSheet("assets/goblin.png",128,128);

function init() {

	gGraphics 	= new GameGraphics();
	gInput 		= new Input();

	gGraphics.init();


	fr1 = gGraphics.createFrame("test1",0,0,gGraphics.getScreenWidth(),gGraphics.getScreenHeight(),0);
	gGraphics.setFrameBgColor(fr1,"green");
	gGraphics.setFrameUpdateFn(fr1,testUpdate1);
	gGraphics.setFrameEnabled(fr1,true);

	fr2 = gGraphics.createFrame("test2",0,0,0,gGraphics.getScreenHeight(),0);
	gGraphics.setFrameBgColor(fr2,"yellow");
	gGraphics.setFrameUpdateFn(fr2,testUpdate2);




	window.requestAnimationFrame(update);
}


function update() {

	gGraphics.update();
	
	window.requestAnimationFrame(update);
}


var curFrame = 0;
function testUpdate1(frame) {
	gGraphics.clear(frame);
	if (gGraphics.doAnimation()) {
		curFrame++;
	}

	tileSheet.drawTile(frame,10,10,curFrame % 48);

	gGraphics.text(frame,100,100,(curFrame % 48).toString());

}


var widthMax = 200;

function testUpdate2(frame) {

	var w = gGraphics.getFrameWidth(frame);

	if (w < widthMax) {
		gGraphics.setFrameSize(frame,w+3,gGraphics.getFrameHeight(frame));
		gGraphics.setFramePosition(fr1,gGraphics.getFrameX(fr1)+3,gGraphics.getFrameY(fr1));
		gGraphics.setFrameSize(fr1,gGraphics.getFrameWidth(fr1)-3,gGraphics.getFrameHeight(fr1));
	}
	
	gGraphics.clear(frame);
}

