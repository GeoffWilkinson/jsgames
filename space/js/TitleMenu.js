var titleMenuBoxX = 293;
var titleMenuBoxY = 304;
var titleMenuBoxWidth = 214;
var titleMenuBoxHeight = 192;

var buttonTitleX = [293, 293, 293, 293];
var buttonTitleY = [304, 352, 400, 448];
var buttonTitleWidth = [214, 214, 214, 214];
var buttonTitleHeight = [48, 48, 48, 48];

// we do not need to track anything except for Y values
var buttonHighlightTitleY = 0;
var buttonHighlightTitleHeight = 48;
var cursorVisible = false;

function checkButtonHoverTitle() {
	cursorVisible = false;
	for(i = 0; i < buttonTitleX.length; i++) {
		if(mouseX > buttonTitleX[i] && mouseX < buttonTitleX[i] + buttonTitleWidth[i] && mouseY > buttonTitleY[i] && mouseY < buttonTitleY[i] + buttonTitleHeight[i]) {
			cursorVisible = true;
			buttonHighlightTitleY = buttonTitleY[i];
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

function drawTitleScreen() {
	// black background
	colourRect(0, 0, canvas.width, canvas.height, 'black');
	// box to hold menu
	canvasContext.save();
	canvasContext.globalAlpha = 1;
	colourRect(titleMenuBoxX, titleMenuBoxY, titleMenuBoxWidth, titleMenuBoxHeight, 'black');
	canvasContext.globalAlpha = 0.15;
	colourRect(titleMenuBoxX, titleMenuBoxY, titleMenuBoxWidth, titleMenuBoxHeight, 'white');
	canvasContext.restore();
	hollowRect(titleMenuBoxX, titleMenuBoxY, titleMenuBoxWidth, titleMenuBoxHeight, 'grey', 1);
	// buttons and logo images
	drawBitmapPositionedByTopLeftCorner(inertiaLogoPic, 232, 48);
	drawBitmapCenteredAtLocation(playButtonPic, buttonTitleX[0] + buttonTitleWidth[0]/2, buttonTitleY[0] + buttonTitleHeight[0]/2);
	drawBitmapCenteredAtLocation(controlsButtonPic, buttonTitleX[1] + buttonTitleWidth[1]/2, buttonTitleY[1] + buttonTitleHeight[1]/2);
	drawBitmapCenteredAtLocation(settingsButtonPic, buttonTitleX[2] + buttonTitleWidth[2]/2, buttonTitleY[2] + buttonTitleHeight[2]/2);
	drawBitmapCenteredAtLocation(creditsButtonPic, buttonTitleX[3] + buttonTitleWidth[3]/2, buttonTitleY[3] + buttonTitleHeight[3]/2);

	if(cursorVisible == true) {
		canvasContext.save();
		canvasContext.globalAlpha = 0.3;
		colourRect(titleMenuBoxX, buttonHighlightTitleY, titleMenuBoxWidth, buttonHighlightTitleHeight, 'white');
		canvasContext.restore();
		hollowRect(titleMenuBoxX, buttonHighlightTitleY, titleMenuBoxWidth, buttonHighlightTitleHeight, 'grey', 1);
	}
}