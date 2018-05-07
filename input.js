

function Input() {

	document.addEventListener( 'keydown', doKeyDown, false);
}




function doKeyDown(e) {


	switch(e.keyCode) {

		// t
		case 84:
			test = true;
			gGraphics.setFrameEnabled(fr2,true);
		break;
	}
}

