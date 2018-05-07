


//
// game subsystem variables
//
var gGraphics;
var gInput;

var fr1;
var fr2;


function init() {


	gGraphics 	= new GameGraphics();
	gInput 		= new Input();

	gGraphics.init();

	fr1 = gGraphics.createFrame("test1",100,100,300,300,0);
	gGraphics.setFrameBgColor(fr1,"blue");
	gGraphics.setFrameUpdateFn(fr1,testUpdate1);
	gGraphics.setFrameEnabled(fr1,true);

	fr2 = gGraphics.createFrame("test2",10,10,30,30,0);
	gGraphics.setFrameBgColor(fr2,"yellow");
	gGraphics.setFrameUpdateFn(fr2,testUpdate2);
	gGraphics.setFrameEnabled(fr2,true);
	gGraphics.setFrameParent(fr2,fr1);

	window.requestAnimationFrame(update);
}


function update() {

	gGraphics.update();
	
	window.requestAnimationFrame(update);
}

function testUpdate1() {gGraphics.clear(fr1);}
function testUpdate2() {gGraphics.clear(fr2);}

