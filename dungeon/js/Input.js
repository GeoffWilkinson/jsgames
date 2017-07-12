const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_EQUALS = 61;
const KEY_MINUS = 173;

const KEY_W = 87;
const KEY_A = 65;
const KEY_D = 68;
const KEY_S = 83;

const KEY_SPACE = 32;
const KEY_Q = 81;
const KEY_E = 69;

const KEY_I = 73;
const KEY_O = 79;

var mouseX;
var mouseY;

function setUpInput() {
	document.addEventListener('mousemove', mouseMoved);
	document.addEventListener('mouseup', mouseReleased);
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
	playerWarrior.setUpInput(KEY_W, KEY_A, KEY_D, KEY_S, KEY_SPACE, KEY_Q, KEY_E);
}

function mouseMoved(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	if(titleScreen || gameOverScreen) {
		if(mouseX > button1X && mouseX < button1X + button1Width && mouseY > button1Y && mouseY < button1Y + button1Height) {
			mouseOnButton1 = true;
		} else {
			mouseOnButton1 = false;
		}
	}
}

function mouseReleased(evt) {
	if(titleScreen && mouseOnButton1) {
		loadLevels();
		titleScreen = false;
	} else if(gameOverScreen && mouseOnButton1) {
		titleScreen = true;
		gameOverScreen = false;
	} else if(editorMode) {
		placeTile(mouseX, mouseY);
	} else if(inventoryOpen) {
		selectInventoryItem();
	}
}

function keySet(keyEvent, whichWarrior, setTo) {
	if(keyEvent.keyCode == whichWarrior.controlKeyUp) {
		whichWarrior.keyHeldNorth = setTo;
	}
	if(keyEvent.keyCode == whichWarrior.controlKeyLeft) {
		whichWarrior.keyHeldWest = setTo;
	}
	if(keyEvent.keyCode == whichWarrior.controlKeyRight) {
		whichWarrior.keyHeldEast = setTo;
	}
	if(keyEvent.keyCode == whichWarrior.controlKeyDown) {
		whichWarrior.keyHeldSouth = setTo;
	}
	if(keyEvent.keyCode == whichWarrior.controlKeyAttack) {
		whichWarrior.keyHeldAttack = setTo;
	}
	if(keyEvent.keyCode == whichWarrior.controlKeyThrow) {
		whichWarrior.keyHeldThrow = setTo;
	}
	if(keyEvent.keyCode == whichWarrior.controlKeyInteract) {
		whichWarrior.keyHeldInteract = setTo;
	}
}

function keyPressed(evt) {
	if(!editorMode && !inventoryOpen) {
		keySet(evt, playerWarrior, true);
	}
}

function keyReleased(evt) {
	if(inventoryOpen) {
		if(evt.keyCode == KEY_I) {
			inventoryOpen = false;
		}
	} else if(editorMode) {
		if(evt.keyCode == KEY_LEFT_ARROW) {
			cycleRoom("west");
		} else if(evt.keyCode == KEY_RIGHT_ARROW) {
			cycleRoom("east");
		} else if(evt.keyCode == KEY_UP_ARROW) {
			cycleRoom("north");
		} else if(evt.keyCode == KEY_DOWN_ARROW) {
			cycleRoom("south");
		} else if(evt.keyCode == KEY_EQUALS) {
			cycleRoom("up");
		} else if(evt.keyCode == KEY_MINUS) {
			cycleRoom("down");
		}

		if(evt.keyCode == KEY_Q) {
			cycleTileHeld("left");
		} else if(evt.keyCode == KEY_E) {
			cycleTileHeld("right");
		}

		if(evt.keyCode == KEY_SPACE) {
			var worldGridString = "[";
			for(var i = 0; i < worldGrid.length; i++) {
				worldGridString = worldGridString + worldGrid[i];
				if(i != worldGrid.length - 1) {
					worldGridString = worldGridString + ", ";
				}
			}
			worldGridString = worldGridString + "];"
			console.log(worldGridString);
		}

		if(evt.keyCode == KEY_O) {
			editorMode = false;
			loadLevels();
		}
	} else {
		if(evt.keyCode == KEY_I) {
			inventoryOpen = true;
		} else if(evt.keyCode == KEY_O) {
			editorMode = true;
			loadLevels();
		}
		keySet(evt, playerWarrior, false);
	}
}
