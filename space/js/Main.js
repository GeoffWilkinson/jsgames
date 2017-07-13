// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var p1 = new shipClass();
var enemy = new UFOClass();

var titleScreen = true;
var inGame = false;

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
	initInput(); 
}

function gameLoop() {
	if(titleScreen) {
		moveTitleScreen();
		drawTitleScreen();
	} else if(inGame) {
		moveInGame();
		drawInGame();
	}
}

function moveInGame() {
	incrementCounters();

	p1.move();
	enemy.move();
	p1.checkMyShipAndShotCollisionAgainst(enemy);
}

function drawInGame() {
	colourRect(0, 0, canvas.width, canvas.height, 'black');

	p1.draw();
	enemy.draw();

	drawUI();
}

function drawUI() {
	drawScore();
}
