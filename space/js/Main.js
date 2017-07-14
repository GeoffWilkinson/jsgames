// QoL TO DO:

// 1. make the playing field bigger.
// 2. minimap/HUD to track off screen entities.
// 3. alternate control schemes...
// 4. spawn exclusion zone around player for asteroids and UFOs
// 5. game over screen when player dies
// 6. stats page upon game over (therefore stat tracking in game)

// save the canvas for dimensions, and its 2d context for drawing to it
var canvas;
var canvasContext;

var p1 = new shipClass();

// 0: title screen
// 1: in game
var gameMode = [true, false];
var nextGameMode = 0;
var prevGameMode = 0;

var transitionActive = false;
var transitionTimer = 0;
var initialTransitionTimer = 1;

function distanceBetween(entity1, entity2) {
	var distX = Math.abs(entity1.x - entity2.x);
	var distY = Math.abs(entity1.y - entity2.y);
	var dist = Math.sqrt(distX * distX + distY * distY);
	return dist;
}

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

function handleAllDeadObjects() {
	removeDeadObjects(playerShots);
	removeDeadObjects(enemyShots);
	removeDeadObjects(asteroidFragments);
	removeDeadObjects(allFloatingText);
	if(p1.isDead) {
		p1.handleDeath();
	}
	for(var i = 0; i < allUFOs.length; i++) {
		if(allUFOs[i].isDead) {
			allUFOs[i].handleDeath();
		}
	}
	for(var i = 0; i < allAsteroids.length; i++) {
		if(allAsteroids[i].isDead) {
			allAsteroids[i].handleDeath();
		}
	}
}

function checkAllCollisions() {
	// Player ship collisions
	for(var i = 0; i < allUFOs.length; i++) {
		p1.checkCollisionWithEntity(allUFOs[i]);
	}
	for(var i = 0; i < allAsteroids.length; i++) {
		p1.checkCollisionWithEntity(allAsteroids[i]);
	}

	// Shot collisions
	for(var i = 0; i < playerShots.length; i++) {
		for(var j = 0; j < allUFOs.length; j++) {
			playerShots[i].detectCollisionWithEntity(allUFOs[j]);
		}
		for(var j = 0; j < allAsteroids.length; j++) {
			playerShots[i].detectCollisionWithEntity(allAsteroids[j]);
		}
	}
	for(var i = 0; i < enemyShots.length; i++) {
		enemyShots[i].detectCollisionWithEntity(p1);
	}

	// Asteroid fragment collisions
	for(var i = 0; i < asteroidFragments.length; i++) {
		asteroidFragments[i].detectCollisionWithEntity(p1);
		for(var j = 0; j < allUFOs.length; j++) {
			asteroidFragments[i].detectCollisionWithEntity(allUFOs[j]);
		}
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

	// Initialise player
	p1.init(playerPic);
	// Initialise all UFOs
	for(var i = 0; i < NUM_UFOS; i++) {
		var newUFO = new UFOClass();
		newUFO.init(UFOPic);
		allUFOs.push(newUFO);
	}
	// Initialise all asteroids
	for(var i = 0; i < NUM_ASTEROIDS; i++) {
		var newAsteroid = new asteroidClass();
		newAsteroid.init(asteroidPic);
		allAsteroids.push(newAsteroid);
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

	moveAllGroupEntities(allUFOs);
	moveAllGroupEntities(allAsteroids);

	moveAllGroupEntities(playerShots);
	moveAllGroupEntities(enemyShots);
	moveAllGroupEntities(asteroidFragments);

	moveAllGroupEntities(allFloatingText);

	checkAllCollisions();
	handleAllDeadObjects();
}

function drawInGame() {
	colourRect(0, 0, canvas.width, canvas.height, 'black');

	drawAllGroupEntities(playerShots);
	drawAllGroupEntities(enemyShots);
	drawAllGroupEntities(asteroidFragments);

	p1.draw();

	drawAllGroupEntities(allAsteroids);
	drawAllGroupEntities(allUFOs);

	drawUI();
	drawAllGroupEntities(allFloatingText);
}

function drawUI() {
	drawScore();
}
