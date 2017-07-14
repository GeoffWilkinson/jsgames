// keyboard keycode constants, determined by printing out evt.keyCode from a key handler  
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_LETTER_W = 87;
const KEY_LETTER_A = 65;
const KEY_LETTER_S = 83;
const KEY_LETTER_D = 68;
const KEY_SPACEBAR = 32;

function initInput() {
	enableInput();
	p1.setupControls(KEY_UP_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_RIGHT_ARROW, KEY_SPACEBAR);
}

function setKeyHoldState(thisKey, thisShip, setTo) {
	if(thisKey == thisShip.controlKeyForTurnLeft) {
		thisShip.keyHeld_TurnLeft = setTo;
	}
	if(thisKey == thisShip.controlKeyForTurnRight) {
		thisShip.keyHeld_TurnRight = setTo;
	}
	if(thisKey == thisShip.controlKeyForGas) {
		thisShip.keyHeld_Gas = setTo;
	}
	if(thisKey == thisShip.controlKeyForReverse) {
		thisShip.keyHeld_Reverse = setTo;
	}
}

function mouseMoved(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
	if(gameMode[0]) {
		checkButtonHover();
	}
}

function mouseReleased(evt) {
	if(gameMode[0]) {
		handleButtonClick();
	}
}

function keyPressed(evt) {
	if(evt.keyCode == KEY_SPACEBAR) {
		p1.fireSelectedWeapon();
	}
	setKeyHoldState(evt.keyCode, p1, true);
	evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {
	setKeyHoldState(evt.keyCode, p1, false);
}

function enableInput() {
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
	document.addEventListener("mousemove", mouseMoved);
	document.addEventListener("mouseup", mouseReleased);
}

function disableInput() {
	document.removeEventListener("keydown", keyPressed);
	document.removeEventListener("keyup", keyReleased);
	document.removeEventListener("mousemove", mouseMoved);
	document.removeEventListener("mouseup", mouseReleased);
}
