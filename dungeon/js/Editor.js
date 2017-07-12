var tileHeld = 0;
var cycleToLevel = 0;
var cycleToFloor = 0;
var editorMode = false;
const HIGHEST_TILE_INDEX = 24;

function cycleTileHeld(direction) {
	if(direction == "left") {
		tileHeld++;
		if(tileHeld > HIGHEST_TILE_INDEX) {
			tileHeld = 0;
		}
	} else if(direction == "right") {
		tileHeld--;
		if(tileHeld < 0) {
			tileHeld = HIGHEST_TILE_INDEX;
		}
	}
}

function cycleRoom(direction) {
	if(direction == "west") {
		if(thisLevelIndex == 0) {
			cycleToLevel = 0;
		} else {
			cycleToLevel = thisLevelIndex - 1;
		}
	} else if(direction == "east") {
		if(thisLevelIndex + 1 >= loadedLevels[thisFloorIndex].length) {
			cycleToLevel = thisLevelIndex;
		} else {
			cycleToLevel = thisLevelIndex + 1;
		}
	} else if(direction == "north") {
		if(thisLevelIndex - WORLD_COLS < 0) {
			cycleToLevel = thisLevelIndex;
		} else {
			cycleToLevel = thisLevelIndex - WORLD_COLS;
		}
	} else if(direction == "south") {
		if(thisLevelIndex + 1 + WORLD_COLS >= loadedLevels[thisFloorIndex].length) {
			cycleToLevel = thisLevelIndex;
		} else {
			cycleToLevel = thisLevelIndex + WORLD_COLS;
		}
	} else if(direction == "up") {
		if(thisFloorIndex + 1 >= loadedLevels.length) {
			cycleToFloor = thisFloorIndex;
		} else {
			cycleToFloor = thisFloorIndex + 1;
		}
	} else if(direction == "down") {
		if(thisFloorIndex - 1 < 0) {
			cycleToFloor = thisFloorIndex;
		} else {
			cycleToFloor = thisFloorIndex - 1;
		}
	}
	switchLevel(cycleToFloor, cycleToLevel);
	console.log("Floor: " + cycleToFloor + ", Level: " + cycleToLevel);
}

function placeTile(pixelX, pixelY) {
	var replaceThis = getTileIndexAtPixelCoord(pixelX, pixelY);
	worldGrid[replaceThis] = tileHeld;
}

function drawHighlightedTile(pixelX, pixelY) {
	var highlightThisX = Math.floor(pixelX / TILE_WIDTH) * TILE_WIDTH;
	var highlightThisY = Math.floor(pixelY / TILE_HEIGHT) * TILE_HEIGHT;
	//draw the tile
	drawBitmapPositionedByTopLeftCorner(worldPics[tileHeld], highlightThisX, highlightThisY)
	canvasContext.globalAlpha = 0.25;
	colourRect(highlightThisX, highlightThisY, TILE_WIDTH, TILE_HEIGHT, 'black');
	canvasContext.globalAlpha = 1;
	//draw the highlight box
	hollowRect(highlightThisX, highlightThisY, TILE_WIDTH, TILE_HEIGHT, 'green', 4);
}

