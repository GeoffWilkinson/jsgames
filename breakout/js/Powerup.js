const POINTS_POWERUP = 1;
const MULTI_BALL_POWERUP = 2;
const AP_BALL_POWERUP = 3;
const SLOW_BALL_POWERUP = 4;
const STICKY_BALL_POWERUP = 5;
const MISSLE_POWERUP = 6;

var displayPointsPU = 0;
var pointTextLoc;
var displayMultiPU = 0;
var multiTextLoc;
var displayPenetrationPU = 0;
var penMultiLoc;
var displayStickyPU = 0;
var stickyTextLoc;
var displayMissilesPU = 0;
var missileTextLoc;

// 0.1
const POWERUP_PROBABILITY = 0.075;

function spawnPowerup(brickIndex) {
	if(Math.random() <= POWERUP_PROBABILITY) {
		var pickAPowerup = Math.ceil(Math.random() * 6);
		//var pickAPowerup = 5;
		if(pickAPowerup == 1) {
			givePoints(10000);
			displayPointsPU = framesPerSecond;
			pointTextLoc = {x: 100 + Math.random() * (canvas.width - 200), y: brickRows * BRICK_HEIGHT + 100};
		} else if(pickAPowerup == 2) {
			multiBall();
			displayMultiPU = framesPerSecond;
			multiTextLoc = {x: 100 + Math.random() * (canvas.width - 200), y: brickRows * BRICK_HEIGHT + 100};
		} else if(pickAPowerup == 3) {
			penetratingBall();
			displayPenetrationPU = framesPerSecond;
			penMultiLoc = {x: 100 + Math.random() * (canvas.width - 200), y: brickRows * BRICK_HEIGHT + 100};
		} else if(pickAPowerup == 4) {
			stickyBall();
			displayStickyPU = framesPerSecond;
			stickyTextLoc = {x: 100 + Math.random() * (canvas.width - 200), y: brickRows * BRICK_HEIGHT + 100};
		} else if(pickAPowerup == 5) {
			giveMissiles();
			displayMissilesPU = framesPerSecond;
			missileTextLoc = {x: 100 + Math.random() * (canvas.width - 200), y: brickRows * BRICK_HEIGHT + 100};
		}
	}
}

function givePoints(numPoints) {
	score += numPoints;
}

function multiBall() {

	spawnBallAtCoord(paddleX + PADDLE_WIDTH/2, canvas.height - PADDLE_DIST_FROM_EDGE, -1, -5, false);
	spawnBallAtCoord(paddleX + PADDLE_WIDTH/2, canvas.height - PADDLE_DIST_FROM_EDGE, 1, -5, false);
}

function penetratingBall() {
	for(var i = 0; i < ballList.length; i++) {
		ballList[i].ballBouncesOffBricks = false;
	}
}

function slowBall() {
	for(var i = 0; i < ballList.length; i++) {
		var speedY = ballList[i].ballSpeedY;
		speedY = (speedY/Math.abs(speedY)) * INITIAL_BALL_SPEED_Y;
		ballList[i].ballSpeedY = speedY;
		deepestRow = 0;
	}
}

function stickyBall() {
	for(var i = 0; i < ballList.length; i++) {
		ballList[i].ballStickyTurns = 5;
	}
}

function giveMissiles() {
	reloadMissiles();
}

function drawPowerupText() {
	if(displayPointsPU > 0) {
		colourText("+10000 POINTS!", pointTextLoc.x, pointTextLoc.y - displayPointsPU, 'yellow');
		displayPointsPU--;
	}
	if(displayMultiPU > 0) {
		colourText("MULTIBALL!", multiTextLoc.x, multiTextLoc.y - displayMultiPU, 'yellow');
		displayMultiPU--;
	}
	if(displayPenetrationPU > 0) {
		colourText("PENETRATING SHOT!", penMultiLoc.x, penMultiLoc.y - displayPenetrationPU, 'yellow');
		displayPenetrationPU--;
	}
	if(displayStickyPU > 0) {
		colourText("STICKY BALL!", stickyTextLoc.x, stickyTextLoc.y - displayStickyPU, 'yellow');
		displayStickyPU--;
	}
	if(displayMissilesPU > 0) {
		colourText("MISSILES!", missileTextLoc.x, missileTextLoc.y - displayMissilesPU, 'yellow');
		displayMissilesPU--;
	}
}
