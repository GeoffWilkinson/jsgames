var trackHeld = TRACK_WALL;
var editorMode = false;
var waypointEditor = false;
var waypointGridValue = 50;

function placeTrack(pixelX, pixelY) {
	var replaceThis = pixelToArrayIndex(pixelX, pixelY);
	if(waypointEditor) {
		for(var i = 0; i < trackGrid.length; i++) {
			if(trackGrid[i] == trackHeld) {
				trackGrid[i] = 0;
			}
		}
	}
	trackGrid[replaceThis] = trackHeld;
}

function drawWaypoints() {
	var gridX;
	var gridY;
	for(var i = 0; i < trackGrid.length; i++) {
		if(trackGrid[i] >= 50 && trackGrid[i] <= 100) {
			gridX = TRACK_WIDTH * (0.5 + (i % trackCols));
			gridY = TRACK_HEIGHT * (0.5 + Math.floor(i/trackCols));
			colourText(trackGrid[i], gridX, gridY, 'white');
		}
	}
}

function drawHeldTrack() {
	var drawThis;
	if(trackHeld >= 50 && trackHeld <= 100) {
		drawThis = TRACK_FLAG;
		colourText(trackHeld, mouseX + TRACK_WIDTH, mouseY, 'white');
	} else {
		drawThis = trackHeld;
	}
	drawBitmapCenteredAtLocation(trackThemes[trackTheme][drawThis], mouseX, mouseY);
}
