var buttonTitleX = [352, 304, 304, 316];
var buttonTitleY = [300, 348, 396, 444];
var buttonTitleWidth = [96, 192, 192, 168];
var buttonTitleHeight = [24, 24, 24, 24];

var cursorX = [0, 0];
var cursorY = [0, 0];
var cursorVisible = false;
var cursorRotationDegrees = 0;
var cursorRotation = 0;
var cursorImage = UFOPic;

function checkButtonHoverTitle() {
	for(i = 0; i < buttonTitleX.length; i++) {
		if(mouseX > buttonTitleX[i] && mouseX < buttonTitleX[i] + buttonTitleWidth[i]) {
			if(mouseY > buttonTitleY[i] && mouseY < buttonTitleY[i] + buttonTitleHeight[i]) {
				cursorVisible = true;
				cursorX[0] = buttonTitleX[i] - (cursorImage.width);
				cursorY[0] = buttonTitleY[i] + buttonTitleHeight[i]/2;
				cursorX[1] = buttonTitleX[i] + buttonTitleWidth[i] + (cursorImage.width) - 4; 
				cursorY[1] = buttonTitleY[i] + buttonTitleHeight[i]/2;
			}
		} else {
			cursorVisible = false;
		}
	}
}

function handleButtonClickTitle() {
	for(i = 0; i < buttonTitleX.length; i++) {
		if(mouseX > buttonTitleX[i] && mouseX < buttonTitleX[i] + buttonTitleWidth[i]) {
			if(mouseY > buttonTitleY[i] && mouseY < buttonTitleY[i] + buttonTitleHeight[i]) {
				if(i == 0) {
					switchMode(1, 90);
					resetGame();
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
	drawBitmapPositionedByTopLeftCorner(playButtonPic, buttonTitleX[0], buttonTitleY[0]);
	drawBitmapPositionedByTopLeftCorner(controlsButtonPic, buttonTitleX[1], buttonTitleY[1]);
	drawBitmapPositionedByTopLeftCorner(settingsButtonPic, buttonTitleX[2], buttonTitleY[2]);
	drawBitmapPositionedByTopLeftCorner(creditsButtonPic, buttonTitleX[3], buttonTitleY[3]);

	if(cursorVisible == true) {
	    drawBitmapCenteredWithRotation(cursorImage, cursorX[0], cursorY[0], cursorRotation);
	    drawBitmapCenteredWithRotation(cursorImage, cursorX[1], cursorY[1], -cursorRotation);
	}
}