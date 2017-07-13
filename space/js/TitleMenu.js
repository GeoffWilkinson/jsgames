var buttonX = [352, 304, 304, 316];
var buttonY = [300, 348, 396, 444];
var buttonWidth = [96, 192, 192, 168];
var buttonHeight = [24, 24, 24, 24];

var cursorX = [0, 0];
var cursorY = [0, 0];
var cursorVisible = false;
var cursorRotationDegrees = 0;
var cursorRotation = 0;
var cursorImage = UFOPic;

function checkButtonHover() {
	for(i = 0; i < buttonX.length; i++) {
		if(mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]) {
			if(mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight[i]) {
				cursorVisible = true;
				cursorX[0] = buttonX[i] - (cursorImage.width);
				cursorY[0] = buttonY[i] + buttonHeight[i]/2;
				cursorX[1] = buttonX[i] + buttonWidth[i] + (cursorImage.width) - 4; 
				cursorY[1] = buttonY[i] + buttonHeight[i]/2;
			}
		} else {
			cursorVisible = false;
		}
	}
}

function handleButtonClick() {
	for(i = 0; i < buttonX.length; i++) {
		if(mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]) {
			if(mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight[i]) {
				if(i == 0) {
					switchMode(1, 90);
				} else {
					switchMode(0, 90);
				}
			}
		}
	}
}

function moveTitleScreen() {
	// so the rotation variable stays a reasonably small number...
	cursorRotationDegrees++;
	if(cursorRotationDegrees > 360) {
		cursorRotationDegrees = 1;
	}
	cursorRotation = Math.PI * cursorRotationDegrees / 180;
}

function drawTitleScreen() {
	// black background
	colourRect(0, 0, canvas.width, canvas.height, 'black');
	// buttons and logo images
	drawBitmapPositionedByTopLeftCorner(inertiaLogoPic, 232, 48);
	drawBitmapPositionedByTopLeftCorner(playButtonPic, buttonX[0], buttonY[0]);
	drawBitmapPositionedByTopLeftCorner(controlsButtonPic, buttonX[1], buttonY[1]);
	drawBitmapPositionedByTopLeftCorner(settingsButtonPic, buttonX[2], buttonY[2]);
	drawBitmapPositionedByTopLeftCorner(creditsButtonPic, buttonX[3], buttonY[3]);

	if(cursorVisible == true) {
	    drawBitmapCenteredWithRotation(cursorImage, cursorX[0], cursorY[0], cursorRotation);
	    drawBitmapCenteredWithRotation(cursorImage, cursorX[1], cursorY[1], -cursorRotation);
	}
}