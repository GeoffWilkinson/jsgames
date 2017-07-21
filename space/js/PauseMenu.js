var pauseMenuBoxX = 316;
var pauseMenuBoxY = 228;
var pauseMenuBoxWidth = 168;
var pauseMenuBoxHeight = 144;

var buttonPauseX = [316, 316, 316];
var buttonPauseY = [228, 276, 324];
var buttonPauseWidth = [168, 168, 168];
var buttonPauseHeight = [48, 48, 48];

// we do not need to track anything except for Y values
var buttonHighlightPauseY = 0;
var buttonHighlightPauseHeight = 48;
// cursorVisible is reused for this menu.

function checkButtonHoverPause() {
	cursorVisible = false;
	for(i = 0; i < buttonPauseX.length; i++) {
		if(mouseX > buttonPauseX[i] && mouseX < buttonPauseX[i] + buttonPauseWidth[i] && mouseY > buttonPauseY[i] && mouseY < buttonPauseY[i] + buttonPauseHeight[i]) {
			cursorVisible = true;
			buttonHighlightPauseY = buttonPauseY[i];
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

function drawPauseScreen() {
	// to produce a faded effect
	drawInGame();
	canvasContext.save();
	canvasContext.globalAlpha = 0.5;
	colourRect(0, 0, canvas.width, canvas.height, 'black');
	// box to hold menu
	canvasContext.globalAlpha = 1;
	colourRect(pauseMenuBoxX, pauseMenuBoxY, pauseMenuBoxWidth, pauseMenuBoxHeight, 'black');
	canvasContext.globalAlpha = 0.15;
	colourRect(pauseMenuBoxX, pauseMenuBoxY, pauseMenuBoxWidth, pauseMenuBoxHeight, 'white');
	canvasContext.restore();
	hollowRect(pauseMenuBoxX, pauseMenuBoxY, pauseMenuBoxWidth, pauseMenuBoxHeight, 'grey', 1);
	// buttons
	drawBitmapCenteredAtLocation(resumeButtonPic, buttonPauseX[0] + buttonPauseWidth[0]/2, buttonPauseY[0] + buttonPauseHeight[0]/2);
	drawBitmapCenteredAtLocation(equipButtonPic, buttonPauseX[1] + buttonPauseWidth[1]/2, buttonPauseY[1] + buttonPauseHeight[1]/2);
	drawBitmapCenteredAtLocation(quitButtonPic, buttonPauseX[2] + buttonPauseWidth[2]/2, buttonPauseY[2] + buttonPauseHeight[2]/2);

	// highlight on mouseover
	if(cursorVisible == true) {
		canvasContext.save();
		canvasContext.globalAlpha = 0.3;
		colourRect(pauseMenuBoxX, buttonHighlightPauseY, pauseMenuBoxWidth, buttonHighlightPauseHeight, 'white');
		canvasContext.restore();
		hollowRect(pauseMenuBoxX, buttonHighlightPauseY, pauseMenuBoxWidth, buttonHighlightPauseHeight, 'grey', 1);
	}
}