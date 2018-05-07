


//
// game subsystem variables
//
var gGraphics;
var gInput;


var test = false;
var fr1;
var fr2;
var fr3;


function init() {

	gGraphics 	= new GameGraphics();
	gInput 		= new Input();

	gGraphics.init();


	fr1 = gGraphics.createFrame("test1",0,0,gGraphics.getScreenWidth(),gGraphics.getScreenHeight(),0);
	gGraphics.setFrameBgColor(fr1,"blue");
	gGraphics.setFrameUpdateFn(fr1,testUpdate1);
	gGraphics.setFrameEnabled(fr1,true);

	fr2 = gGraphics.createFrame("test2",0,0,0,gGraphics.getScreenHeight(),0);
	gGraphics.setFrameBgColor(fr2,"yellow");
	gGraphics.setFrameUpdateFn(fr2,testUpdate2);

	fr3 = gGraphics.createFrame("test3",100,100,100,100,0);
	gGraphics.setFrameBgColor(fr3,"red");
	gGraphics.setFrameUpdateFn(fr3,testUpdate1);
	gGraphics.setFrameEnabled(fr3,true);
	gGraphics.setFrameParent(fr3,fr1);


	window.requestAnimationFrame(update);
}


function update() {

	gGraphics.update();
	
	window.requestAnimationFrame(update);
}

function testUpdate1(frame) {gGraphics.clear(frame);}


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

