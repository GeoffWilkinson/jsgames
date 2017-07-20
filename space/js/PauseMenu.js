var buttonPauseX = [328, 340, 352];
var buttonPauseY = [252, 300, 348];
var buttonPauseWidth = [144, 120, 96];
var buttonPauseHeight = [24, 24, 24];

var cursorX = [0, 0];
var cursorY = [0, 0];
var cursorVisible = false;
var cursorRotationDegrees = 0;
var cursorRotation = 0;
var cursorImage = UFOPic;

function checkButtonHoverPause() {
	for(i = 0; i < buttonPauseX.length; i++) {
		if(mouseX > buttonPauseX[i] && mouseX < buttonPauseX[i] + buttonPauseWidth[i]) {
			if(mouseY > buttonPauseY[i] && mouseY < buttonPauseY[i] + buttonPauseHeight[i]) {
				cursorVisible = true;
				cursorX[0] = buttonPauseX[i] - (cursorImage.width);
				cursorY[0] = buttonPauseY[i] + buttonPauseHeight[i]/2;
				cursorX[1] = buttonPauseX[i] + buttonPauseWidth[i] + (cursorImage.width) - 4; 
				cursorY[1] = buttonPauseY[i] + buttonPauseHeight[i]/2;
			}
		} else {
			cursorVisible = false;
		}
	}
}

function handleButtonClickPause() {
	for(i = 0; i < buttonPauseX.length; i++) {
		if(mouseX > buttonPauseX[i] && mouseX < buttonPauseX[i] + buttonPauseWidth[i]) {
			if(mouseY > buttonPauseY[i] && mouseY < buttonPauseY[i] + buttonPauseHeight[i]) {
				if(i == 0) {
					switchMode(1, 1);
				} else if(i == 1) {
					switchMode(4, 10);
				} else if(i == 2) {
					switchMode(0, 90);
				}
			}
		}
	}
}

function movePauseScreen() {
	// so the rotation variable stays a reasonably small number...
	cursorRotationDegrees++;
	if(cursorRotationDegrees > 360) {
		cursorRotationDegrees = 1;
	}
	cursorRotation = Math.PI * cursorRotationDegrees / 180;
}

function drawPauseScreen() {
	drawInGame();
	// fade rest of screen
	canvasContext.save();
	canvasContext.globalAlpha = 0.5;
	colourRect(0, 0, canvas.width, canvas.height, 'black');
	canvasContext.restore();
	// buttons
	drawBitmapPositionedByTopLeftCorner(resumeButtonPic, buttonPauseX[0], buttonPauseY[0]);
	drawBitmapPositionedByTopLeftCorner(equipButtonPic, buttonPauseX[1], buttonPauseY[1]);
	drawBitmapPositionedByTopLeftCorner(quitButtonPic, buttonPauseX[2], buttonPauseY[2]);

	if(cursorVisible == true) {
	    drawBitmapCenteredWithRotation(cursorImage, cursorX[0], cursorY[0], cursorRotation);
	    drawBitmapCenteredWithRotation(cursorImage, cursorX[1], cursorY[1], -cursorRotation);
	}
}