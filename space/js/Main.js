// QoL TO DO:

// 1. make the playing field bigger.
// 2. minimap/HUD to track off screen entities.
// 3. alternate control schemes...
// 4. spawn exclusion zone around player for asteroids and UFOs.
// 6. stats page upon game over (therefore stat tracking in game).

// QoL IN PROGRESS:

// 5. game over screen when player dies.

// 7. ship inventory with equippable items.
// 8. post-level ship configuration.

// 13. countdown between waves.
// 14. inventory/equipment window.
// 15. pause menu.

// QoL DONE:

// 9. temporary powerups.
// 10. entity properties more complex, e.g. damage/hp
// 11. spread out floating combat text.
// 12. better collisions.

// save the canvas for dimensions, and its 2d context for drawing to it
var canvas;
var canvasContext;

var p1 = new shipClass();

// 0: title screen
// 1: in game
// 2: game over screen
// 3: pause menu
// 4: inventory/equipment menu
var gameMode = [true, false, false, false, false];
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
	removeDeadObjects(playerShockwaves);
	removeDeadObjects(playerMissiles);
	removeDeadObjects(playerBeams);
	removeDeadObjects(enemyShots);
	removeDeadObjects(asteroidFragments);
	removeDeadObjects(allFloatingText);
	removeDeadObjects(allPowerups);
	removeDeadObjects(allWrecks);

	// Special case: if a missile was targetting a dead UFO, we clear its target.
	for(var i = 0; i < allUFOs.length; i++) {
		if(allUFOs[i].isDead) {
			for(var j = 0; j < playerMissiles.length; j++) {
				if(playerMissiles[j].target == allUFOs[i]) {
					playerMissiles[j].target = undefined;
				}
			}
			// Also, UFOs spwan wrecks when they die
			spawnWreck(UFOWreckPic, allUFOs[i]);
		}
	}
	removeDeadObjects(allUFOs);

	// Special case: asteroids fragment and drop powerups
	for(var i = 0; i < allAsteroids.length; i++) {
		if(allAsteroids[i].isDead) {
			allAsteroids[i].fragment();
			spawnPowerup(Math.floor(Math.random() * POWERUP_TYPES.length), allAsteroids[i].x, allAsteroids[i].y);
		}
	}
	removeDeadObjects(allAsteroids);

	// Special case: player resets instead of being removed
	if(p1.isDead) {
		p1.reset();
	}
}

function checkAllCollisions() {
	// Player ship collisions
	for(var i = 0; i < allUFOs.length; i++) {
		p1.detectCollisionWithEntity(allUFOs[i], false);
	}
	for(var i = 0; i < allAsteroids.length; i++) {
		p1.detectCollisionWithEntity(allAsteroids[i], false);
	}

	// Shot collisions
	for(var i = 0; i < playerShots.length; i++) {
		for(var j = 0; j < allUFOs.length; j++) {
			playerShots[i].detectCollisionWithEntity(allUFOs[j], true);
		}
		for(var j = 0; j < allAsteroids.length; j++) {
			playerShots[i].detectCollisionWithEntity(allAsteroids[j], false);
		}
	}
	for(var i = 0; i < enemyShots.length; i++) {
		enemyShots[i].detectCollisionWithEntity(p1, false);
	}

	// Missile collisions
	for(var i = 0; i < playerMissiles.length; i++) {
		for(var j = 0; j < allUFOs.length; j++) {
			playerMissiles[i].detectCollisionWithEntity(allUFOs[j], true);
		}
		for(var j = 0; j < allAsteroids.length; j++) {
			playerMissiles[i].detectCollisionWithEntity(allAsteroids[j], false);
		}
	}

	// Shockwave collisions
	for(var i = 0; i < playerShockwaves.length; i++) {
		for(var j = 0; j < allUFOs.length; j++) {
			playerShockwaves[i].detectCollisionWithEntity(allUFOs[j], true);
		}
		for(var j = 0; j < allAsteroids.length; j++) {
			playerShockwaves[i].detectCollisionWithEntity(allAsteroids[j], false);
		}
		for(var j = 0; j < enemyShots.length; j++) {
			playerShockwaves[i].detectCollisionWithEntity(enemyShots[j], false);
		}
		for(var j = 0; j < asteroidFragments.length; j++) {
			playerShockwaves[i].detectCollisionWithEntity(asteroidFragments[j], false);
		}
	}

	// Beam pre-collisions
	for(var i = 0; i < playerBeams.length; i++) {
		for(var j = 0; j < allUFOs.length; j++) {
			playerBeams[i].markEntityForDeath(allUFOs[j]);
		}
		for(var j = 0; j < allAsteroids.length; j++) {
			playerBeams[i].markEntityForDeath(allAsteroids[j]);
		}
		for(var j = 0; j < enemyShots.length; j++) {
			playerBeams[i].markEntityForDeath(enemyShots[j]);
		}
		for(var j = 0; j < asteroidFragments.length; j++) {
			playerBeams[i].markEntityForDeath(asteroidFragments[j]);
		}
	}

	// Beam collisions
	for(var i = 0; i < playerBeams.length; i++) {
		for(var j = 0; j < allUFOs.length; j++) {
			playerBeams[i].detectCollisionWithEntity(allUFOs[j], true);
		}
		for(var j = 0; j < allAsteroids.length; j++) {
			playerBeams[i].detectCollisionWithEntity(allAsteroids[j], false);
		}
		for(var j = 0; j < enemyShots.length; j++) {
			playerBeams[i].detectCollisionWithEntity(enemyShots[j], false);
		}
		for(var j = 0; j < asteroidFragments.length; j++) {
			playerBeams[i].detectCollisionWithEntity(asteroidFragments[j], false);
		}
	}

	// Asteroid fragment collisions
	for(var i = 0; i < asteroidFragments.length; i++) {
		asteroidFragments[i].detectCollisionWithEntity(p1, false);
		for(var j = 0; j < allUFOs.length; j++) {
			asteroidFragments[i].detectCollisionWithEntity(allUFOs[j], true);
		}
	}

	// Item collisions (pickups)
	for(var i = 0; i < allPowerups.length; i++) {
		allPowerups[i].detectCollisionWithEntity(p1);
	}

	// Wreck collisions (pickups)
	for(var i = 0; i < allWrecks.length; i++) {
		allWrecks[i].detectCollisionWithEntity(p1);
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

	initInput(); 
}

function resetGame() {
	allPowerups.length = 0;
	playerShots.length = 0;
	playerShockwaves.length = 0;
	playerMissiles.length = 0;
	playerBeams.length = 0;
	enemyShots.length = 0;
	asteroidFragments.length = 0;
	allWrecks.length = 0;
	allAsteroids.length = 0;
	allUFOs.length = 0;
	allFloatingText.length = 0;
	loadLevel(0);
	p1.reset();
}

function gameLoop() {
	// move everything
	if(gameMode[0]) {
		moveTitleScreen();
	} else if(gameMode[1]) {
		if(!transitionActive) {
			moveInGame();
		}
	} else if(gameMode[3]) {
		movePauseScreen();
	}

	// draw everything
	if(gameMode[0]) {
		drawTitleScreen();
	} else if(gameMode[1]) {
		drawInGame();
	} else if(gameMode[3]) {
		drawPauseScreen();
	}

	// draw UI
	if(gameMode[1]) {
		drawUI();
	} else if(gameMode[3]) {
		drawUI();
	}

	// move and draw transitions
	if(transitionActive) {
		modeTransition();
		if(initialTransitionTimer > 0) {
			drawFadeTransition();
		}
	}
}

function moveInGame() {
	incrementCounters();

	p1.move();

	moveAllGroupEntities(allUFOs);
	moveAllGroupEntities(allAsteroids);

	moveAllGroupEntities(playerShots);
	moveAllGroupEntities(playerShockwaves);
	moveAllGroupEntities(playerMissiles);
	moveAllGroupEntities(playerBeams);
	moveAllGroupEntities(enemyShots);
	moveAllGroupEntities(asteroidFragments);
	moveAllGroupEntities(allWrecks);

	moveAllGroupEntities(allFloatingText);

	checkAllCollisions();
	handleAllDeadObjects();

	if(allUFOs.length == 0) {
		var nextWave = thisWave + 1;
		var nextLevel = thisLevel;
		if(nextWave > maxWave) {
			nextWave = 0;
			nextLevel = thisLevel + 1;
			if(nextLevel > maxLevel) {
				nextLevel = 0;
			}
		}
		loadWave(nextLevel, nextWave);
	}
}

function drawInGame() {
	colourRect(0, 0, canvas.width, canvas.height, 'black');

	drawAllGroupEntities(allPowerups);
	drawAllGroupEntities(playerShots);
	drawAllGroupEntities(playerShockwaves);
	drawAllGroupEntities(playerMissiles);
	drawAllGroupEntities(playerBeams);
	drawAllGroupEntities(enemyShots);
	drawAllGroupEntities(asteroidFragments);
	drawAllGroupEntities(allWrecks);

	p1.draw();

	drawAllGroupEntities(allAsteroids);
	drawAllGroupEntities(allUFOs);

	// Before we draw the floating text we should spread it out a bit.
	declutterText();
	drawAllGroupEntities(allFloatingText);
}

function drawUI() {
	drawScore();
}
