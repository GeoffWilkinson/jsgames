const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

const KEY_SPACE = 32;
const KEY_RETURN = 13;

var mouseX = 0;
var mouseY = 0;

function setUpInput() {
	canvas.addEventListener('mousemove', updateMousePos);
	canvas.addEventListener('mouseup', handleMouseup);
	//canvas.addEventListener('mousedown', handleMousedown);

	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);

	blueCar.setUpInput(KEY_W, KEY_D, KEY_S, KEY_A, KEY_SPACE);
	greenCar.setUpInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_RETURN);
}

function handleMouseup(evt) {
	if(showingTitleScreen) {
		if(mouseOnButton1) {
			multiplayer = false;
			showingTitleScreen = !showingTitleScreen;
			goToNextTrack();
		} else if(mouseOnButton2) {
			multiplayer = true;
			showingTitleScreen = !showingTitleScreen;
			goToNextTrack();
		}
	} else if(editorMode) {
		placeTrack(mouseX - cameraPanX, mouseY - cameraPanY);
		if(editorMode) {
			trackHeld++;
			if(trackHeld > 100) {
				trackHeld = 50;
			}
		}
	}
}

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	if(mouseX > button1X && mouseX < button1X + button1Width && mouseY > button1Y && mouseY < button1Y + button1Height) {
		mouseOnButton1 = true;
		mouseOnButton2 = false;
	} else if(mouseX > button2X && mouseX < button2X + button2Width && mouseY > button2Y && mouseY < button2Y + button2Height) {
		mouseOnButton1 = false;
		mouseOnButton2 = true;
	} else {
		mouseOnButton1 = false;
		mouseOnButton2 = false;
	}
}

function keySet(keyEvent, whichCar, setTo) {

	if(!editorMode && !showingTitleScreen) {
		// Car controls
		if(whichCar.isAIControlled == false) {
			if(keyEvent.keyCode == whichCar.controlKeyLeft) {
				whichCar.keyHeldLeft = setTo;
			}
			if(keyEvent.keyCode == whichCar.controlKeyRight) {
				whichCar.keyHeldRight = setTo;
			}
			if(keyEvent.keyCode == whichCar.controlKeyUp) {
				whichCar.keyHeldGas = setTo;
			}
			if(keyEvent.keyCode == whichCar.controlKeyDown) {
				whichCar.keyHeldReverse = setTo;
			}
			if(keyEvent.keyCode == whichCar.controlKeyNitro) {
				whichCar.keyHeldNitro = setTo;
			}
		}

		// AI control switcher
		// if(keyEvent.keyCode == 188 && whichCar == blueCar && setTo) {
		// 	blueCar.isAIControlled = !blueCar.isAIControlled;
		// 	if(!blueCar.isAIControlled) {
		// 		blueCar.AIStop();
		// 	}
		// }
		// if(keyEvent.keyCode == 190 && whichCar == blueCar && setTo) {
		// 	greenCar.isAIControlled = !greenCar.isAIControlled;
		// 	if(!greenCar.isAIControlled) {
		// 		greenCar.AIStop();
		// 	}
		// }
	} else if(editorMode) {
		if(!waypointEditor) {
			if(keyEvent.keyCode >= 48 && keyEvent.keyCode <= 57 && setTo) {
				trackHeld = keyEvent.keyCode - 48;
			} else if(keyEvent.keyCode >= 65 && keyEvent.keyCode <= 68 && setTo) {
				trackHeld = keyEvent.keyCode - 55;
			}
		} else {
			if(keyEvent.keyCode == 188 && setTo) {
				waypointGridValue--;
				if(waypointGridValue < 50) {
					waypointGridValue = 100;
				}
				trackHeld = waypointGridValue;
			} else if(keyEvent.keyCode == 190 && setTo) {
				waypointGridValue++;
				if(waypointGridValue > 100) {
					waypointGridValue = 50;
				}
				trackHeld = waypointGridValue;
			}
		}

		if(keyEvent.keyCode == KEY_LEFT_ARROW && setTo) {
			cameraPanX += TRACK_WIDTH;
		}
		if(keyEvent.keyCode == KEY_UP_ARROW && setTo) {
			cameraPanY += TRACK_HEIGHT;
		}
		if(keyEvent.keyCode == KEY_RIGHT_ARROW && setTo) {
			cameraPanX -= TRACK_WIDTH;
		}
		if(keyEvent.keyCode == KEY_DOWN_ARROW && setTo) {
			cameraPanY -= TRACK_HEIGHT;
		}
		if(keyEvent.keyCode == 189 && setTo) {
			cameraZoom *= 3/4;
		}
		if(keyEvent.keyCode == 187 && setTo) {
			cameraZoom *= 4/3;
		}
		if(keyEvent.keyCode == KEY_W && setTo) {
			waypointEditor = !waypointEditor;
			if(waypointEditor) {
				trackHeld = waypointGridValue;
			} else {
				trackHeld = TRACK_WALL;
			}
		}
		// Output track array
		if(keyEvent.keyCode == 32 && setTo) {
			var trackGridString = "[";
			for(var i = 0; i < trackGrid.length; i++) {
				trackGridString = trackGridString + trackGrid[i];
				if(i != trackGrid.length - 1) {
					trackGridString = trackGridString + ", ";
				}
			}
			trackGridString = trackGridString + "];"
			console.log(trackGridString);
		}
	} 
	// Track theme switcher
	// if(keyEvent.keyCode == 219 && whichCar == blueCar && setTo) {
	// 	trackTheme++;
	// 	if(trackTheme > numThemes - 1) {
	// 		trackTheme = 0;
	// 	}
	// }
	// if(keyEvent.keyCode == 221 && whichCar == blueCar && setTo) {
	// 	trackTheme--;
	// 	if(trackTheme < 0) {
	// 		trackTheme = numThemes - 1;
	// 	}
	// }
}

function keyPressed(evt) {
	if(!editorMode && !showingTitleScreen) {
		keySet(evt, blueCar, true);
		keySet(evt, greenCar, true);
	} else {
		keySet(evt, blueCar, true);
	}
}

function keyReleased(evt) {
	if(!editorMode && !showingTitleScreen) {
		keySet(evt, blueCar, false);
		keySet(evt, greenCar, false);
	} else {
		keySet(evt, blueCar, false);
	}
}
