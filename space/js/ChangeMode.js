function switchMode(gameModeIndex, transitionLength) {
	transitionActive = true;
	disableInput();
	initialTransitionTimer = transitionLength;
	transitionTimer = initialTransitionTimer;
	// Set next game mode
	nextGameMode = gameModeIndex;
	// Get previous game mode
	for(var i = 0; i < gameMode.length; i++) {
		if(gameMode[i]) {
			prevGameMode = i;
		}
	}
}

function modeTransition() {
	transitionTimer--;
	if(transitionTimer < 0) {
		transitionTimer = 0;
		transitionActive = false;
		enableInput();
	} else if(transitionTimer < initialTransitionTimer/2) {
		gameMode[prevGameMode] = false;
		gameMode[nextGameMode] = true;
		cursorVisible = false;
	}
}

function drawFadeTransition() {
	var transitionAlpha = Math.abs(transitionTimer - initialTransitionTimer/2) / (initialTransitionTimer/2);
	canvasContext.save();
	canvasContext.globalAlpha = 1 - transitionAlpha;
	colourRect(0, 0, canvas.width, canvas.height, 'black');
	canvasContext.restore();
}