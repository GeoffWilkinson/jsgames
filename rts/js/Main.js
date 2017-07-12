var canvas;
var canvasContext;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	var framesPerSecond = 30;

	setInterval(function() {
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);

	canvas.addEventListener('mousemove', mousemoveHandler);

	canvas.addEventListener('mousedown', mousedownHandler);

	canvas.addEventListener('mouseup', mouseupHandler);

	populateTeam(playerUnits, PLAYER_START_UNITS, true);
	populateTeam(enemyUnits, ENEMY_START_UNITS, false);

} // end of window.onload function

function moveEverything() {
	for(var i = 0; i < allUnits.length; i++) {
		allUnits[i].move();
	}
	removeDeadUnits();
	checkAndHandleVictory();
} // end of moveEverything function

function drawEverything() {
	// Draws black screen
	colourRect(0, 0, canvas.width, canvas.height, 'black');

	for(var i = 0; i < allUnits.length; i++) {
		allUnits[i].draw();
	}

	for(var i = 0; i < selectedUnits.length; i++) {
		selectedUnits[i].drawSelectionBox();
	}

	if(isMouseDragging) {
		colouredOutlineRectCornerToCorner(lassoX1, lassoY1, lassoX2, lassoY2, 'yellow');
	}

} // end of drawEverything function