// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var p1 = new shipClass();
var enemy = new UFOClass();
var asteroid = new asteroidClass();

// 0: title screen
// 1: in game
var gameMode = [true, false];
var nextGameMode = 0;
var prevGameMode = 0;

var transitionActive = false;
var transitionTimer = 0;
var initialTransitionTimer = 1;

function incrementCounters() {
	timeSinceLastHit++;
	if(timeSinceLastHit >= COMBO_TIMEOUT) {
		hitComboReset = true;
	} else {
		hitComboReset = false;
	}
}

function removeDeadObjects(myArray) {
	for(var i = myArray.length - 1; i >= 0; i--) {
		if(myArray[i].isDead) {
			myArray.splice(i, 1);
		}
	}
}

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	loadImages();
}

function loadingDoneSoStartGame() {
	// these next few lines set up our game logic and render to happen 30 times per second
	var framesPerSecond = 30;
	setInterval(gameLoop, 1000/framesPerSecond);

	p1.init(playerPic);
	enemy.init(UFOPic);
	asteroid.init(asteroidPic);

	initInput(); 
}

function gameLoop() {
	// move everything
	if(gameMode[0]) {
		moveTitleScreen();
	} else if(gameMode[1]) {
		if(!transitionActive) {
			moveInGame();
		}
	}

	// draw everything
	if(gameMode[0]) {
		drawTitleScreen();
	} else if(gameMode[1]) {
		drawInGame();
	}

	// move and draw transitions
	if(transitionActive) {
		modeTransition();
		drawFadeTransition();
	}
}

function drawAll() {
	if(gameMode[0]) {
		drawTitleScreen();
	} else if(gameMode[1]) {
		drawInGame();
	}
	if(transitionActive) {
		drawFadeTransition();
	}
}

function moveInGame() {
	incrementCounters();

	p1.move();
	enemy.move();
	asteroid.move();

	p1.checkMyShipAndShotCollisionAgainst(enemy);
	p1.checkMyShipAndShotCollisionAgainst(asteroid);
}

function drawInGame() {
	colourRect(0, 0, canvas.width, canvas.height, 'black');

	p1.draw();
	asteroid.draw();
	enemy.draw();

	drawUI();
}

function drawUI() {
	drawScore();
}
