// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var p1 = new shipClass();
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

function removeAllDeadObjects() {
	removeDeadObjects(playerShots);
	removeDeadObjects(enemyShots);
	removeDeadObjects(allFloatingText);
}

function checkAllCollisions() {
	// Player ship collisions
	p1.checkCollisionWithEntity(asteroid);
	for(var i = 0; i < allUFOs.length; i++) {
		p1.checkCollisionWithEntity(allUFOs[i]);
	}

	// Shot collisions
	for(var i = 0; i < playerShots.length; i++) {
		for(var j = 0; j < allUFOs.length; j++) {
			playerShots[i].detectCollisionWithEntity(allUFOs[j]);
		}
		playerShots[i].detectCollisionWithEntity(asteroid);
	}
	for(var i = 0; i < enemyShots.length; i++) {
		enemyShots[i].detectCollisionWithEntity(p1);
	}
}

function moveAllGroupEntities(entityArray) {
	for(var i = 0; i < entityArray.length; i++) {
		entityArray[i].move();
	}
}

function drawAllGroupEntities(entityArray) {
	for(var i = 0; i < entityArray.length; i++) {
		entityArray[i].draw();
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
	asteroid.init(asteroidPic);
	for(var i = 0; i < NUM_UFOS; i++) {
		var newUFO = new UFOClass();
		newUFO.init(UFOPic);
		allUFOs.push(newUFO);
	}

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
	asteroid.move();

	moveAllGroupEntities(allUFOs);
	moveAllGroupEntities(playerShots);
	moveAllGroupEntities(enemyShots);
	moveAllGroupEntities(allFloatingText);

	checkAllCollisions();
	removeAllDeadObjects();
}

function drawInGame() {
	colourRect(0, 0, canvas.width, canvas.height, 'black');

	drawAllGroupEntities(playerShots);
	drawAllGroupEntities(enemyShots);
	drawAllGroupEntities(allFloatingText);

	p1.draw();
	asteroid.draw();

	drawAllGroupEntities(allUFOs);

	drawUI();
}

function drawUI() {
	drawScore();
}
