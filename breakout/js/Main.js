var canvas, canvasContext;

var framesPerSecond = 60;

var score = 0;
var lastScore = 0;
var FIRST_SCORE_REWARD_AMOUNT = 25000;
var timesRewarded = 0;
var nextScoreReward = FIRST_SCORE_REWARD_AMOUNT;

const MAX_LIVES = 5;
const INITIAL_LIVES = 3;
var livesLeft = 0;

var ballList = [];
var ballsInPlay = 0;
var missedBallsToClear = false;
var waitForBallsToClearGrid = false;
var displayHeldText = true;

var missileInventory = 2;
var missileList = [];
var deadMissilesToClear = false;
var colourIndex = 0;

var showingTitleScreen = true;
var victoryText = false;
var colourCycle = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

var backgroundMusic = new backgroundMusicClass();
var rewardSound = new soundOverlapsClass("audio/reward");

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	canvasContext.font = "10px Arial";
	canvasContext.textAlign = "left"; 

	loadImages();
	backgroundMusic.loopSong("audio/Voltaic");
}

function spawnBallAtCoord(spawnX, spawnY, spawnSpeedX, spawnSpeedY, isHeld) {
	var spawnBall = new ballClass();
	spawnBall.ballX = spawnX;
	spawnBall.ballY = spawnY;
	spawnBall.ballSpeedX = spawnSpeedX;
	spawnBall.ballSpeedY = spawnSpeedY;
	spawnBall.ballHeld = isHeld;
	ballList.push(spawnBall);
	ballsInPlay++;
}

function despawnMissedBalls() {
	if(missedBallsToClear) {
		for(var i = ballList.length - 1; i >= 0; i--) {
			if(ballList[i].isMissed) {
				ballList.splice(i, 1);
			}
		}
		missedBallsToClear = false;
	}
}

function reloadMissiles() {
	for(var i = missileList.length - 1; i >= 0; i--) {
		if(missileList[i].isLaunched == false && missileList[i].isExploding == false) {
			missileList.splice(i, 1);
		}
	}
	var spawnLocation = 0;
	for(var i = 0; i < missileInventory; i++) {
		var spawnMissile = new missileClass();
		if(spawnLocation == 0) {
			spawnMissile.x = paddleX;
			spawnMissile.heldX = 0;
		} else if(spawnLocation == 1) {
			spawnMissile.x = paddleX + PADDLE_WIDTH;
			spawnMissile.heldX = PADDLE_WIDTH;
		}
		spawnMissile.y = canvas.height - PADDLE_DIST_FROM_EDGE + 5;
		missileList.push(spawnMissile);
		spawnLocation++;
	}
}

function despawnDeadMissiles() {
	if(deadMissilesToClear) {
		for(var i = missileList.length - 1; i >= 0; i--) {
			if(missileList[i].isDead) {
				missileList.splice(i, 1);
			}
		}
		deadMissilesToClear = false;
	}
}

function loadingDoneSoStartGame() {
	setInterval(updateAll, 1000/framesPerSecond);
	setUpEventListeners();
	resetGame();
}

function resetGame() {
	nextLevel = -1;
	livesLeft = INITIAL_LIVES;
	score = 0;
	deepestRow = 0;
	brickReset();
	missileList = [];
	ballList = [];
	ballsInPlay = 0;
	spawnBallAtCoord(canvas.width/2, canvas.height/2, 0, Math.min(MAX_BALL_SPEED_Y,INITIAL_BALL_SPEED_Y + deepestRow * 0.5), true);
}

function rewardScore() {
	if(score >= nextScoreReward) {
		livesLeft++;
		timesRewarded++;
		rewardSound.play();
		if(livesLeft > MAX_LIVES) {
			livesLeft = MAX_LIVES;
		}
		nextScoreReward += timesRewarded * FIRST_SCORE_REWARD_AMOUNT;
	}
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	if(showingTitleScreen) {
		return;
	}

	despawnMissedBalls();
	if(ballsInPlay == 0) {
		livesLeft--;
		spawnBallAtCoord(canvas.width/2, canvas.height/2, 0, Math.min(MAX_BALL_SPEED_Y,INITIAL_BALL_SPEED_Y + deepestRow * 0.5), true);
	}
	if(livesLeft == 0) {
		showingTitleScreen = true;
		resetGame();
	}
	for(var i = 0; i < ballList.length; i++) {
		ballList[i].ballMove();
	}

	despawnDeadMissiles();
	for(var i = 0; i < missileList.length; i++) {
		missileList[i].move();
	}
	for(var i = 0; i < missileList.length; i++) {
		if(missileList[i].isExploding) {
			var missile = missileList[i];
			if(missile.startDetonation) {
				missile.detonation(missile.epicenterX, missile.epicenterY, missile.explosionTimer);
			}
			missile.explosionTimer++;
		}
	}

	rewardScore();

	if(bricksLeft == 0) {
		waitForBallsToClearGrid = false;
		for(var i = 0; i < ballList.length; i++) {
			if(ballList[i].ballY < (brickRows + 1) * BRICK_HEIGHT) {
				waitForBallsToClearGrid = true;
			}
		}

		if(waitForBallsToClearGrid == false) {
			brickReset();
		}
	}
}

function drawAll() {
	if(showingTitleScreen) {
		drawBitmapPositionedByTopLeftCorner(titlePic, 0, 0);
		colourText("Previous round's score: " + lastScore, 50, 550, 'white');
		if(victoryText) {
			canvasContext.font = "60px Impact";
			canvasContext.textAlign = "center"; 
			colourText("YOU WIN!", canvas.width/2, canvas.height/2, colourCycle[Math.floor(colourIndex)]);
			canvasContext.font = "10px Arial";
			canvasContext.textAlign = "left"; 
			colourIndex += 0.2;
			if(colourIndex > colourCycle.length) {
				colourIndex = 0;
			}
		}
	} else {
		drawBitmapPositionedByTopLeftCorner(backgroundPic, 0, 0);

		drawPaddle();
		drawBricks();

		for(var i = 0; i < ballList.length; i++) {
			ballList[i].drawBall();
		}
		for(var i = 0; i < missileList.length; i++) {
			if(missileList[i].isDead == false && missileList[i].isExploding == false) {
				missileList[i].draw();
			}
		}
		for(var i = 0; i < missileList.length; i++) {
			if(missileList[i].isExploding) {
				var missile = missileList[i];
				missileList[i].drawExplosion(missile.epicenterX, missile.epicenterY, missile.explosionTimer);
			}
		}

		colourText("SCORE: " + score, 15, canvas.height - 15, 'yellow');

		for(var i = 0; i < livesLeft; i++) {
			drawBitmapCenteredAtLocation(lifePic, canvas.width - ((i + 2) * lifePic.width), canvas.height - lifePic.height - 10);
		}
		displayHeldText = false;
		for(var i = 0; i < ballList.length; i++) {
			if(ballList[i].ballHeld) {
				displayHeldText = true;
			}
		}
		if(displayHeldText) {
			colourText("CLICK TO RELEASE BALL", mouseX, mouseY, 'yellow');
		}
		drawPowerupText();
	}
}