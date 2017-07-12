const BRICK_WIDTH = 80;
const BRICK_HEIGHT = 20;
const BRICK_GAP = 2;

const BRICK_COLS = 10;
var brickRows = 13;

var levelOne   = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				  1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

var levelTwo   = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				  2, 1, 1, 1, 0, 0, 1, 1, 1, 2,
				  2, 1, 1, 1, 1, 1, 1, 1, 1, 2,
				  2, 1, 1, 1, 1, 1, 1, 1, 1, 2,
				  2, 1, 1, 1, 1, 1, 1, 1, 1, 2,
				  2, 2, 2, 2, 1, 1, 2, 2, 2, 2,
				  3, 3, 3, 3, 1, 1, 3, 3, 3, 3,
				  2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
				  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				  1, 1, 1, 1, 0, 0, 1, 1, 1, 1];

var levelThree = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				  0, 3, 1, 1, 1, 1, 1, 1, 3, 0,
				  0, 3, 1, 1, 1, 1, 1, 1, 3, 0,
				  0, 3, 2, 1, 1, 1, 1, 2, 3, 0,
				  0, 3, 3, 2, 2, 2, 2, 3, 3, 0,
				  0, 3, 3, 3, 3, 3, 3, 3, 3, 0,
				  0, 3, 3, 2, 2, 2, 2, 3, 3, 0,
				  0, 3, 2, 1, 1, 1, 1, 2, 3, 0,
				  0, 3, 2, 1, 1, 1, 1, 2, 3, 0,
				  0, 3, 1, 1, 1, 1, 1, 1, 3, 0,
				  0, 3, 1, 1, 1, 1, 1, 1, 3, 0];

var levelFour  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				  9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
				  1, 2, 3, 1, 1, 1, 1, 3, 2, 1,
				  2, 3, 1, 1, 1, 1, 1, 1, 3, 2,
				  3, 1, 1, 0, 1, 1, 0, 1, 1, 3,
				  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				  1, 1, 0, 1, 1, 1, 1, 0, 1, 1,
				  1, 1, 1, 0, 1, 1, 0, 1, 1, 1,
				  2, 1, 1, 1, 0, 0, 1, 1, 1, 2,
				  0, 2, 1, 1, 1, 1, 1, 1, 2, 0];

var levelFive  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				  0, 9, 9, 9, 9, 9, 9, 9, 9, 0,
				  0, 9, 3, 2, 1, 1, 2, 3, 9, 0,
				  0, 9, 2, 2, 2, 2, 2, 2, 9, 0,
				  0, 9, 1, 2, 3, 3, 2, 1, 9, 0,
				  0, 9, 1, 2, 3, 3, 2, 1, 9, 0,
				  0, 9, 0, 2, 2, 2, 2, 0, 9, 0,
				  0, 9, 0, 0, 0, 0, 0, 0, 9, 0,
				  0, 9, 9, 9, 1, 1, 9, 9, 9, 0,
				  0, 1, 1, 1, 1, 1, 1, 1, 1, 0];

var testLevel  = [];

var levelList = [levelOne, levelTwo, levelThree, levelFour, levelFive];
var nextLevel = -1;

var brickGrid = levelOne;

const INVULN_BRICK = 9;
const DEFAULT_BRICK = 1;
const DOUBLE_BRICK = 2;
const TRIPLE_BRICK = 3;

var bricksLeft = 0;
var deepestRow = 0;
var prevDeepestRow = 0;
var brickIndexHitThisFrame = 0;

var brickSound = new soundOverlapsClass("audio/brick_break");
var startSound = new soundOverlapsClass("audio/start");

function rowColToArrayIndex(col, row) {
	return (col + (BRICK_COLS * row));
}

function pixelToArrayIndex(pixelX, pixelY) {
	var brickCol = Math.floor(pixelX / BRICK_WIDTH);
	var brickRow = Math.floor(pixelY / BRICK_HEIGHT);

	return rowColToArrayIndex(brickCol, brickRow);
}

function arrayIndexToRow(brickIndex) {
	return (1 + brickRows - Math.ceil(brickIndex/BRICK_COLS));
}
function arrayIndexToCol(brickIndex) {
	return (brickIndex % BRICK_COLS);
}

function loadLevel(whichLevel) {
	brickGrid = whichLevel.slice();
	brickRows = brickGrid.length/BRICK_COLS;
}

function brickReset() {
	nextLevel++
	if(nextLevel > levelList.length) {
		showingTitleScreen = true;
		victoryMessage = true;
		resetGame();
	}
	bricksLeft = 0;
	prevDeepestRow = deepestRow;
	if(showingTitleScreen == false) {
		startSound.play();
	}

	loadLevel(levelList[nextLevel]);

	for(var i = 0; i < brickGrid.length; i++) {
		if(brickGrid[i] > 0 && brickGrid[i] < 9) {
			bricksLeft++;
		}
	}
}

function isBrickAtPixel(pixelX, pixelY) {
	var brickCol = Math.floor(pixelX / BRICK_WIDTH);
	var brickRow = Math.floor(pixelY / BRICK_HEIGHT);

	if (brickCol >= 0 && brickCol < BRICK_COLS &&
		brickRow >= 0 && brickRow < brickRows) {
		var brickIndex = rowColToArrayIndex(brickCol, brickRow);

		return (brickGrid[brickIndex]);
	} else {
		return false;
	}
}

function degradeBrick(brickIndex, destroy) {
	if(brickIndexHitThisFrame != brickIndex) {
		if(brickGrid[brickIndex] == INVULN_BRICK) {
			paddleSound.play();
		} else if(brickGrid[brickIndex] > 0) {
			if(destroy) {
				brickGrid[brickIndex] = 0;
			} else {
				brickGrid[brickIndex]--;
			}
			var brickRow = arrayIndexToRow(brickIndex);
			deepestRow = Math.max(deepestRow, brickRow + prevDeepestRow);

			if(brickGrid[brickIndex] == 0) {
				bricksLeft--;
			}
			score += 100 * brickRow;
			lastScore = score;
			brickSound.play();
			spawnPowerup(brickIndex);
		}
	}
	brickIndexHitThisFrame = brickIndex;
}

function drawBricks() {
	var arrayIndex = 0;
	var drawBrickX = 0;
	var drawBrickY = 0;

	for (var eachRow = 0; eachRow < brickRows; eachRow++) {
		for (var eachCol = 0; eachCol < BRICK_COLS; eachCol++) {
			var brickHere = brickGrid[arrayIndex];
			if(brickHere == 0) {
				drawBrickX += BRICK_WIDTH;
				arrayIndex++;
			} else {
				if(brickHere == -1) {
					brickHere = 0;
				}
				var useImage = brickPics[brickHere];

				drawBitmapPositionedByTopLeftCorner(useImage, drawBrickX, drawBrickY);
				drawBrickX += BRICK_WIDTH;
				arrayIndex++;
			}
		}
		drawBrickY += BRICK_HEIGHT;
		drawBrickX = 0;
	}
}