// keyboard keycode constants, determined by printing out evt.keyCode from a key handler  
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_LETTER_W = 87;
const KEY_LETTER_A = 65;
const KEY_LETTER_D = 68;
const KEY_LETTER_S = 83;

const KEY_SPACEBAR = 32;

const KEY_1 = 49;
const KEY_2 = 50;
const KEY_3 = 51;
const KEY_4 = 52;

function initInput() {
	enableInput();
	p1.setupControls(KEY_LETTER_W, KEY_LETTER_S, KEY_LETTER_A, KEY_LETTER_D, KEY_1, KEY_2, KEY_3, KEY_4, KEY_SPACEBAR);
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

	if(thisKey == thisShip.weapon1Key) {
		thisShip.keyHeld_Weapon1 = setTo;
		p1.selectWeapon(0);
	} else if(thisKey == thisShip.weapon2Key) {
		thisShip.keyHeld_Weapon2 = setTo;
		p1.selectWeapon(1);
	} else if(thisKey == thisShip.weapon3Key) {
		thisShip.keyHeld_Weapon3 = setTo;
		p1.selectWeapon(2);
	} else if(thisKey == thisShip.weapon4Key) {
		thisShip.keyHeld_Weapon4 = setTo;
		p1.selectWeapon(3);
	}

	if(thisKey == thisShip.shootKey) {
		thisShip.keyHeld_Shoot = setTo;
		p1.fireSelectedWeapon();
	}
}

function mouseMoved(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
	if(gameMode[0]) {
		checkButtonHoverTitle();
	}
}

function mouseReleased(evt) {
	if(gameMode[0]) {
		handleButtonClickTitle();
	}
}

function keyPressed(evt) {
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
