var raining = false;
var numRainDrops = 1000;

const RAIN_ANGLE = Math.PI*5/9;
const FALL_SPEED = 30;
const TRAIL_LENGTH = 75;

var rainDrops = [];

function simulateRain() {
	if(raining) {
		spawnRain();
		moveRainDrops();
	}
	deSpawnRain();
}

function spawnRain() {
	var dropsSpawnedAtOnce = numRainDrops/10;
	for(var i = 0; i < dropsSpawnedAtOnce; i++) {
		var startX = Math.random() * (10 + trackCols) * TRACK_WIDTH;
		var startY = -10 * TRACK_HEIGHT;
		var dropFallDistance = Math.random() * (20 + trackRows) * TRACK_HEIGHT;
		var endX = startX + Math.cos(RAIN_ANGLE) * dropFallDistance;
		var endY = startY + Math.sin(RAIN_ANGLE) * dropFallDistance;
		if(rainDrops.length < numRainDrops) {
			rainDrops.push({x: startX, y: startY, eX: endX, eY: endY});
		}
	}
}

function moveRainDrops() {
	for(var i = 0; i < rainDrops.length; i++) {
		rainDrops[i].x += Math.cos(RAIN_ANGLE) * FALL_SPEED;
		rainDrops[i].y += Math.sin(RAIN_ANGLE) * FALL_SPEED;
	}
}

function deSpawnRain() {
	for(var i = rainDrops.length - 1; i >= 0; i--) {
		if(rainDrops[i].y > rainDrops[i].eY || !raining) {
			rainDrops.splice(i, 1);
		}
	}
}

function drawRain() {
	for(var i = 0; i < rainDrops.length; i++) {
		var trailEnd = {x: rainDrops[i].x + Math.cos(RAIN_ANGLE) * TRAIL_LENGTH, y: rainDrops[i].y + Math.sin(RAIN_ANGLE) * TRAIL_LENGTH};
		canvasContext.strokeStyle = 'white';
		canvasContext.beginPath();
		canvasContext.moveTo(rainDrops[i].x, rainDrops[i].y);
		canvasContext.lineTo(trailEnd.x, trailEnd.y);
		canvasContext.lineWidth = 1;
		canvasContext.stroke();
	}

	canvasContext.globalAlpha = 0.3;
	colourRect(0, 0, trackCols * TRACK_WIDTH, trackRows * TRACK_HEIGHT, 'black');
	canvasContext.globalAlpha = 1.0;
}