const TRACK_WIDTH = 40;
const TRACK_HEIGHT = 40;
const TRACK_GAP = 2;

var trackCols = 30;
var trackRows = 20;

var levelZero = [];

for(var i = 0; i < trackCols * trackRows; i++) {
	levelZero.push(0);
}

var levelOne = [4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 0, 0, 0, 0, 52, 0, 0, 0, 0, 0, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 4, 4, 4, 4, 1, 1, 0, 0, 51, 0, 0, 0, 0, 0, 0, 0, 53, 0, 10, 0, 0, 0, 0, 0, 0, 0, 54, 0, 0, 1, 1, 4, 4, 1, 1, 6, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 10, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 4, 1, 6, 6, 50, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 6, 1, 4, 1, 6, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 4, 4, 4, 4, 4, 1, 0, 61, 0, 0, 0, 1, 1, 0, 55, 6, 1, 4, 1, 0, 0, 0, 0, 1, 0, 0, 66, 0, 0, 1, 1, 4, 4, 4, 4, 1, 0, 0, 6, 0, 60, 1, 1, 0, 0, 6, 1, 4, 1, 0, 0, 0, 0, 1, 12, 12, 5, 0, 65, 0, 1, 1, 4, 4, 1, 1, 62, 0, 5, 11, 11, 1, 1, 0, 0, 6, 1, 4, 1, 0, 0, 79, 0, 1, 67, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 6, 1, 4, 5, 3, 3, 3, 3, 5, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 59, 1, 1, 0, 0, 6, 1, 4, 1, 0, 8, 8, 0, 1, 0, 0, 1, 1, 1, 0, 64, 0, 0, 0, 0, 63, 0, 1, 1, 0, 0, 6, 6, 56, 0, 1, 1, 4, 1, 0, 2, 2, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 58, 57, 0, 0, 1, 4, 4, 1, 0, 0, 0, 0, 1, 0, 68, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 0, 0, 0, 1, 1, 4, 4, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 4, 4, 4, 6, 6, 6, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 0, 0, 0, 6, 1, 1, 0, 0, 69, 0, 0, 0, 9, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 72, 0, 0, 1, 1, 4, 1, 0, 0, 78, 6, 6, 1, 1, 0, 0, 0, 0, 0, 0, 0, 70, 0, 9, 6, 0, 0, 71, 0, 0, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 6, 73, 0, 1, 4, 1, 1, 0, 0, 77, 0, 0, 0, 0, 0, 0, 4, 9, 0, 0, 0, 0, 0, 0, 4, 9, 0, 0, 0, 13, 0, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 76, 0, 0, 0, 0, 4, 9, 0, 0, 75, 0, 0, 0, 4, 9, 0, 0, 74, 13, 0, 0, 1, 1, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

var levelTwo = [4, 4, 6, 6, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 6, 6, 6, 4, 4, 4, 4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 6, 6, 4, 4, 4, 4, 4, 6, 4, 4, 6, 4, 4, 1, 0, 0, 63, 0, 0, 0, 62, 0, 11, 0, 0, 0, 0, 61, 0, 0, 0, 6, 6, 4, 4, 4, 4, 4, 4, 4, 6, 6, 4, 1, 0, 0, 6, 1, 1, 1, 1, 1, 1, 6, 6, 6, 6, 6, 0, 0, 0, 0, 6, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 64, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 6, 0, 60, 0, 6, 6, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 0, 0, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 6, 0, 0, 0, 6, 1, 4, 1, 1, 1, 1, 1, 1, 1, 5, 9, 9, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 6, 1, 1, 1, 0, 0, 0, 73, 0, 0, 9, 4, 4, 0, 0, 74, 2, 8, 3, 75, 0, 0, 0, 0, 0, 1, 1, 0, 59, 0, 6, 1, 1, 0, 0, 0, 0, 0, 0, 0, 9, 4, 4, 0, 0, 0, 2, 8, 3, 0, 0, 0, 0, 50, 0, 0, 1, 0, 0, 0, 6, 1, 1, 0, 72, 6, 1, 1, 1, 1, 5, 0, 0, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 51, 0, 1, 6, 7, 7, 6, 1, 1, 13, 13, 1, 1, 4, 4, 4, 1, 0, 0, 1, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 0, 1, 4, 0, 0, 0, 1, 1, 0, 0, 1, 4, 4, 4, 4, 1, 0, 65, 1, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 0, 0, 1, 4, 0, 58, 0, 1, 1, 71, 0, 1, 4, 4, 4, 4, 1, 0, 0, 1, 4, 4, 4, 4, 4, 4, 1, 1, 0, 0, 52, 0, 1, 4, 6, 0, 0, 1, 1, 0, 0, 1, 4, 4, 4, 4, 1, 0, 0, 1, 4, 4, 6, 4, 4, 1, 1, 0, 0, 0, 0, 1, 1, 6, 6, 0, 0, 1, 1, 0, 0, 1, 4, 4, 4, 4, 1, 0, 66, 1, 4, 6, 6, 4, 1, 1, 0, 53, 0, 0, 1, 1, 6, 6, 6, 0, 0, 1, 1, 70, 0, 1, 1, 4, 4, 1, 1, 12, 12, 1, 4, 6, 6, 6, 1, 0, 0, 0, 7, 1, 1, 6, 6, 6, 0, 57, 0, 1, 1, 0, 0, 6, 1, 1, 1, 1, 6, 0, 0, 1, 4, 6, 6, 6, 1, 0, 54, 6, 5, 1, 6, 6, 6, 0, 0, 0, 0, 1, 1, 0, 69, 0, 0, 0, 0, 0, 0, 67, 0, 1, 4, 4, 6, 4, 1, 0, 0, 0, 10, 0, 0, 0, 0, 56, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 68, 0, 0, 0, 1, 1, 4, 4, 4, 4, 1, 1, 0, 0, 10, 55, 0, 0, 0, 0, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4];

var trackGrid = [];
var levels = [levelZero, levelOne, levelTwo];

var thisLevel;
var nextTrack;

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYER_START = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;
const TRACK_GRASS = 6;
const TRACK_OIL = 7;
const TRACK_PLAYER_ORIENT = 8;
const TRACK_RAMP = 9;

const CHECKPOINT_A = 10;
const CHECKPOINT_B = 11;
const CHECKPOINT_C = 12;
const CHECKPOINT_D = 13;

const DAY_THEME = 0;
const NIGHT_THEME = 1;

var trackTheme;
var numThemes = 2;

const RAMP_POWER = 0.75;

var numCheckpoints = 0;
var numLaps = 3;

function returnTileTypeAtColRow(col, row) {
	if(col >= 0 && col < trackCols &&
		row >= 0 && row < trackRows) {
		var trackIndexUnderCoord = rowColToArrayIndex(col, row);

		return trackGrid[trackIndexUnderCoord];
	} else {
		return TRACK_WALL;
	}
}

function orientationBlockAngle(carAtIndex) {
	//up, right, down, left
	var adjIndices = [carAtIndex - trackCols, carAtIndex + 1, carAtIndex + trackCols, carAtIndex - 1];

	if(trackGrid[adjIndices[0]] == TRACK_PLAYER_ORIENT) {
		return {angle: -Math.PI/2, index: adjIndices[0]};
	} else if(trackGrid[adjIndices[1]] == TRACK_PLAYER_ORIENT) {
		return {angle: 0, index: adjIndices[1]};
	} else if(trackGrid[adjIndices[2]] == TRACK_PLAYER_ORIENT) {
		return {angle: Math.PI/2, index: adjIndices[2]};
	} else if(trackGrid[adjIndices[3]] == TRACK_PLAYER_ORIENT) {
		return {angle: Math.PI, index: adjIndices[3]};
	}
}

function howManyCheckpoints(trackArray) {
	var uniqueGridVals = Array.from(new Set(trackArray));
	for(var i = 0; i < uniqueGridVals.length; i++) {
		if(uniqueGridVals[i] >= 10 && uniqueGridVals[i] <= 13) {
			numCheckpoints++;
		}
	}
}

function carTrackHandling(whichCar) {
	var carTrackCol = Math.floor(whichCar.x / TRACK_WIDTH);
	var carTrackRow = Math.floor(whichCar.y / TRACK_HEIGHT);

	var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

	var frontTrackCol = Math.floor(whichCar.carEdgePoints[0].x / TRACK_WIDTH);
	var frontTrackRow = Math.floor(whichCar.carEdgePoints[0].y / TRACK_HEIGHT);

	var trackIndexUnderFront = rowColToArrayIndex(frontTrackCol, frontTrackRow);

	// Car handling modifiers
	whichCar.speedDecayMultiplier = GROUNDSPEED_DECAY_MULT;
	whichCar.turnRate = BASE_TURN_RATE;

	if(carTrackCol >= 0 && carTrackCol < trackCols &&
	    carTrackRow >= 0 && carTrackRow < trackRows) {
		var tileHere = returnTileTypeAtColRow(carTrackCol, carTrackRow);
		var tileAtFront = returnTileTypeAtColRow(frontTrackCol, frontTrackRow);

		if(tileAtFront == TRACK_GOAL) {
			whichCar.inTheWall = 0;
			whichCar.nextWaypoint = 50;
			if(whichCar.checkpointsPassed == numCheckpoints) {
				whichCar.checkpointsPassed = 0;
				whichCar.lapsCompleted++;
				whichCar.nitroUses++;
				if(whichCar.lapsCompleted == numLaps) {
					console.log(whichCar.name + " WINS!")
					goToNextTrack();
				}
			}
		} else if(tileHere == TRACK_RAMP) {
			if(whichCar.z == 0) {
				whichCar.speed += 1;
				whichCar.speedZ += whichCar.speed * RAMP_POWER;
				whichCar.inTheWall = 0;
			}
		} else if(whichCar.z == 0) {
			if(tileHere == TRACK_GRASS) {
				whichCar.inTheWall = 0;
				if(!whichCar.nitroOn) {
					whichCar.speedDecayMultiplier *= 0.9;
				}
			} else if(tileHere == TRACK_OIL) {
				whichCar.turnRate = 0;
				whichCar.inTheWall = 0;
			} else if(tileAtFront == CHECKPOINT_A) {
				whichCar.inTheWall = 0;
				if(whichCar.checkpointsPassed == 0) {
					whichCar.checkpointsPassed++;
				}
			} else if(tileAtFront == CHECKPOINT_B) {
				whichCar.inTheWall = 0;
				if(whichCar.checkpointsPassed == 1) {
					whichCar.checkpointsPassed++;
				}
			} else if(tileAtFront == CHECKPOINT_C) {
				whichCar.inTheWall = 0;
				if(whichCar.checkpointsPassed == 2) {
					whichCar.checkpointsPassed++;
				}
			} else if(tileAtFront == CHECKPOINT_D) {
				whichCar.inTheWall = 0;
				if(whichCar.checkpointsPassed == 3) {
					whichCar.checkpointsPassed++;
				}
			} else if(tileHere >= 50 && tileHere <= 100) {
				whichCar.inTheWall = 0;
				if(whichCar.nextWaypoint == tileHere) {
					whichCar.nextWaypoint = tileHere + 1;
				}
				if(whichCar.nextWaypoint > 100) {
					whichCar.nextWaypoint = 50;
				}
			} else if(tileHere != TRACK_ROAD) {
				whichCar.inTheWall++;
				if(whichCar.inTheWall > framesPerSecond) {
					whichCar.reset(whichCar.playerIndex, whichCar.name);
				}
			}
			whichCar.carToWallCollisions();
		}
	}
}

function rowColToArrayIndex(col, row) {
	return col + trackCols * row;
}

function pixelToArrayIndex(pixelX, pixelY) {
	var trackCol = Math.floor(pixelX / TRACK_WIDTH);
	var trackRow = Math.floor(pixelY / TRACK_HEIGHT);

	return rowColToArrayIndex(trackCol, trackRow);
}

function arrayIndexToCentrePixel(index) {
	var indexX = ((index % trackCols) + 0.5) * TRACK_WIDTH;
	var indexY = (Math.floor(index/trackCols) + 0.5) * TRACK_HEIGHT;
	return {x: indexX, y: indexY};
}

function seekWaypointArrayIndex(waypointValue) {
	for(var i = 0; i < trackGrid.length; i++) {
		if(trackGrid[i] == waypointValue) {
			return i;
		}
	}
}

function drawTracks() {
	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;

	var arrayIndex = 0;

	var camLeftCol = Math.floor(-cameraPanX / (cameraZoom * TRACK_WIDTH));
	var camTopRow = Math.floor(-cameraPanY / (cameraZoom * TRACK_HEIGHT));

	var colsOnScreen = Math.floor(canvas.width / cameraZoom * TRACK_WIDTH);
	var rowsOnScreen = Math.floor(canvas.height / cameraZoom * TRACK_HEIGHT);

	var camRightCol = camLeftCol + colsOnScreen;
	var camBottomRow = camTopRow + rowsOnScreen;

	for(var eachRow = 0; eachRow < trackRows; eachRow++) {
		for(var eachCol = 0; eachCol < trackCols; eachCol++) {
			if(eachCol >= camLeftCol && eachCol <= camRightCol && eachRow >= camTopRow && eachRow <= camBottomRow) {
				var tileKindHere = trackGrid[arrayIndex];
				if(!editorMode && tileKindHere > 9) {
					tileKindHere = 0;
				} else if(editorMode && tileKindHere >= 50) {
					tileKindHere = 0;
				}
				var useImage = trackThemes[trackTheme][tileKindHere];

				canvasContext.drawImage(useImage, drawTileX, drawTileY);
			}

			drawTileX += TRACK_WIDTH;
			arrayIndex++;
		}
		drawTileY += TRACK_HEIGHT;
		drawTileX = 0;
	}
}
