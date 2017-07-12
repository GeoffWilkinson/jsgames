var canvas, canvasContext;
var playerWarrior = new warriorClass();
var allBats = [];
var allBosses = [];
var allGhosts = [];
var allEnemies = [];
var allLitTorches = [];
var allItems = [];
var framesPerSecond = 60;
var deadEntitiesToClear = false;

var transition = false;
var transitionX = 0;
var transitionY = 0;
var transitionZ = 0;

var titleScreen = true;
var gameOverScreen = false;

var button1X;
var button1Width;
var button1Y;
var button1Height;
var mouseOnButton1;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	colourRect(0, 0, canvas.width, canvas.height, 'black');
	colourText("LOADING", canvas.width/2, canvas.height/2, 'white');

	loadImages();
}

function imageLoadingDoneSoStartGame() {
	setInterval(updateAll, 1000/framesPerSecond);
	setUpInput();
	setUpTitleMenu();

	loadLevels();
}

function setUpTitleMenu() {
	button1X = canvas.width/2 - 60;
	button1Width = 120;
	button1Y = canvas.height/2 + 50;
	button1Height = 40;
	mouseOnButton1 = false;
}

function loadLevels() {
	loadedLevels = [];
	loadedEntities = [];
	var floorLevels = [];
	var floorEntities = [];
	for(var i = 0; i < allLevels.length; i++) {
		floorLevels = [];
		floorEntities = [];
		for(var j = 0; j < allLevels[i].length; j++) {
			floorLevels.push(allLevels[i][j].slice());
			floorEntities.push({bats: [], ghosts: [], enemies: [], litTorches: [], items: [], bosses: []});
		}
		loadedLevels.push(floorLevels.slice());
		loadedEntities.push(floorEntities.slice());
	}
	for(var i = 0; i < allLevels.length; i++) {
		for(var j = 0; j < allLevels[i].length; j++) {
			for(var k = 0; k < allLevels[i][j].length; k++) {
				if(allLevels[i][j][k] == 2) {
					thisFloorIndex = i;
					thisLevelIndex = j;
					switchLevel(i, j);
					break;
				}
			}
		}
	}
	if(!editorMode) {
		playerWarrior.reset(warriorPic, "Beefy");
	}
}

function switchLevel(whichFloor, whichLevel) {
	if(!editorMode) {
		if(whichFloor != thisFloorIndex) {
			transition = true;
			transitionZ = 1000;
		}
		if(whichLevel == thisLevelIndex + 1) {
			transition = true;
			transitionX = canvas.width;
			transitionY = 0;
		} else if(whichLevel == thisLevelIndex - 1) {
			transition = true;
			transitionX = -canvas.width;
			transitionY = 0;
		} else if(whichLevel == thisLevelIndex - WORLD_COLS) {
			transition = true;
			transitionX = 0;
			transitionY = -canvas.height;
		} else if(whichLevel == thisLevelIndex + WORLD_COLS) {
			transition = true;
			transitionX = 0;
			transitionY = canvas.height;
		}
		oldWorldGrid = loadedLevels[thisFloorIndex][thisLevelIndex];
	}
	thisFloorIndex = whichFloor;
	thisLevelIndex = whichLevel;
	worldGrid = loadedLevels[whichFloor][whichLevel];
	if(!editorMode) {
		loadLevelObjects(whichFloor, whichLevel);
	}
}

function loadLevelObjects(whichFloor, whichLevel) {
	allBosses = loadedEntities[whichFloor][whichLevel].bosses;
	allBats = loadedEntities[whichFloor][whichLevel].bats;
	allGhosts = loadedEntities[whichFloor][whichLevel].ghosts;
	allEnemies = loadedEntities[whichFloor][whichLevel].enemies;
	allLitTorches = loadedEntities[whichFloor][whichLevel].litTorches;
	allItems = loadedEntities[whichFloor][whichLevel].items;
	for(var i = 0; i < worldGrid.length; i++) {
		if(worldGrid[i] == TILE_ENEMY_START) {
			var newEnemy = new enemyClass();
			if(allBats.length <= allGhosts.length) {
				newEnemy.reset(batPic, "Bat" + i);
				newEnemy.setBat();
				allBats.push(newEnemy);
			} else {
				newEnemy.reset(ghostPic, "Ghost" + i);
				newEnemy.setGhost();
				allGhosts.push(newEnemy);
			}
			allEnemies.push(newEnemy);
		} else if(worldGrid[i] == TILE_BOSS_START) {
			var newBoss = new bossClass();
			newBoss.reset(bossPic, "Boss");
			allBosses.push(newBoss);
			allEnemies.push(newBoss);
		}
	}
}

function clearDeadEntities(fromArray) {
	for(var i = fromArray.length - 1; i >= 0; i--) {
		if(fromArray[i].isDead) {
			fromArray.splice(i, 1);
		}
	}
}

function screenTransition() {
	var prevTransitionX = transitionX;
	var prevTransitionY = transitionY;
	var prevTransitionZ = transitionZ;

	if(transitionX != 0) {
		transitionX -= Math.sign(transitionX) * 10;
	}
	if(transitionY != 0) {
		transitionY -= Math.sign(transitionY) * 10;
	}
	if(transitionZ != 0) {
		transitionZ -= Math.sign(transitionZ) * 10;
	}

	if(Math.sign(prevTransitionX) != Math.sign(transitionX)) {
		transitionX = 0;
	}
	if(Math.sign(prevTransitionY) != Math.sign(transitionY)) {
		transitionY = 0;
	}
	if(Math.sign(prevTransitionZ) != Math.sign(transitionZ)) {
		transitionZ = 0;
	}

	if(transitionX == 0 && transitionY == 0 && transitionZ == 0) {
		transition = false;
	}
}

function updateAll() {
	if(!editorMode && !inventoryOpen && !gameOverScreen && !titleScreen) {
		if(!transition) {
			moveAll();
		} else {
			screenTransition();
		}
	}
	drawAll();
}

function moveAll() {
	playerWarrior.move();
	for(var i = 0; i < allEnemies.length; i++) {
		allEnemies[i].move();
	}
	for(var i = 0; i < allBosses.length; i++) {
		allBosses[i].move();
	}
	if(deadEntitiesToClear) {
		clearDeadEntities(allEnemies);
		clearDeadEntities(allBats);
		clearDeadEntities(allItems);
		clearDeadEntities(allBosses);
	}
}

function drawUI() {
	var qX = 0 * TILE_WIDTH;
	var qY = 11 * TILE_HEIGHT;
	var sX = 1 * TILE_WIDTH;
	var sY = 11 * TILE_HEIGHT;
	var eX = 2 * TILE_WIDTH;
	var eY = 11 * TILE_HEIGHT;

	drawBitmapPositionedByTopLeftCorner(barQPic, qX, qY);
	drawBitmapPositionedByTopLeftCorner(barSpacePic, sX, sY);
	drawBitmapPositionedByTopLeftCorner(barEPic, eX, eY);

	canvasContext.save();

	var scale = 0.75;
	qX += 0.125 * TILE_WIDTH;
	qY += 0.25 * TILE_HEIGHT;
	sX += 0.125 * TILE_WIDTH;
	sY += 0.25 * TILE_HEIGHT;
	eX += 0.125 * TILE_WIDTH;
	eY += 0.25 * TILE_HEIGHT;

	qX *= 1/scale;
	qY *= 1/scale;
	sX *= 1/scale;
	sY *= 1/scale;
	eX *= 1/scale;
	eY *= 1/scale;

	canvasContext.scale(scale, scale);
	if(playerWarrior.usingJavelin) {
		drawBitmapPositionedByTopLeftCorner(javelinPic, qX, qY);
	} else if(playerWarrior.usingFlame) {
		drawBitmapPositionedByTopLeftCorner(flamePic, qX, qY);
	}

	if(playerWarrior.usingSword) {
		drawBitmapPositionedByTopLeftCorner(swordPic, sX, sY);
	} else if(playerWarrior.usingPickaxe) {
		drawBitmapPositionedByTopLeftCorner(pickAxePic, sX, sY);
	}

	if(worldGrid[getTileIndexAtPixelCoord(playerWarrior.x, playerWarrior.y)] >= TILE_JUMP_PAD_U && worldGrid[getTileIndexAtPixelCoord(playerWarrior.x, playerWarrior.y)] <= TILE_JUMP_PAD_L) {
		if(playerWarrior.powerStoneFound) {
			drawBitmapPositionedByTopLeftCorner(powerStonePic, eX, eY);
		} else {
			// show ?
		}
	} else if(worldGrid[playerWarrior.interactionTile] == TILE_TORCH || worldGrid[getTileIndexAtPixelCoord(playerWarrior.x, playerWarrior.y)] == TILE_TORCH) {
		if(playerWarrior.flameLearned) {
			drawBitmapPositionedByTopLeftCorner(flamePic, eX, eY);
		} else {
			// show ?
		}
	} else if(worldGrid[playerWarrior.interactionTile] == TILE_ROCK) {
		if(playerWarrior.pickAxeFound) {
			drawBitmapPositionedByTopLeftCorner(pickAxePic, eX, eY);
		} else {
			// show ?
		}
	} else if(worldGrid[playerWarrior.interactionTile] == TILE_BOSS_DOOR) {
		if(playerWarrior.hasBossKey) {
			drawBitmapPositionedByTopLeftCorner(bossKeyPic, eX, eY);
		} else {
			// show ?
		}
	} else {
		// show USE
	}
	canvasContext.restore();

}

function drawAll() {
	if(titleScreen) {
		drawBitmapPositionedByTopLeftCorner(titlePic, 0, 0);
		drawBitmapPositionedByTopLeftCorner(startGamePic, button1X, button1Y);
		if(mouseOnButton1) {
			drawBitmapPositionedByTopLeftCorner(cursorPic, button1X + button1Width + 20, button1Y);
		}
	} else if(gameOverScreen) {
		drawBitmapPositionedByTopLeftCorner(gameOverPic, 0, 0);
		drawBitmapPositionedByTopLeftCorner(returnToTitlePic, button1X, button1Y);
		if(mouseOnButton1) {
			drawBitmapPositionedByTopLeftCorner(cursorPic, button1X + button1Width + 20, button1Y);
		}
	} else {
		if(transition) {
			drawOldWorld();
			canvasContext.save();
			canvasContext.translate(transitionX, transitionY);
		}
		if(transitionZ < 500) {
			drawWorld();
			if(!editorMode) {
				for(var i = 0; i < allItems.length; i++) {
					allItems[i].draw();
				}
				for(var i = 0; i < allEnemies.length; i++) {
					allEnemies[i].draw();
				}
				for(var i = 0; i < allBosses.length; i++) {
					for(var j = 0; j < allBosses[i].flameWall.length; j++) {
						allBosses[i].flameWall[j].draw(spellPic, false, allBosses[i].flameWall[j].opacity);
					}
					for(var j = 0; j < allBosses[i].swords.length; j++) {
						allBosses[i].swords[j].draw(bossSwordPic, true, allBosses[i].swords[j].opacity);
					}
				}
				for(var i = 0; i < allBosses.length; i++) {
					allBosses[i].draw();
				}
				for(var i = 0; i < allLitTorches.length; i++) {
					allLitTorches[i].draw();
				}
				playerWarrior.draw();
				if(playerWarrior.playerJavelins.length > 0) {
					for(var i = playerWarrior.playerJavelins.length - 1; i >= 0; i--) {
						playerWarrior.playerJavelins[i].draw(javelinPic, true);
					}
				}
				if(playerWarrior.playerFlames.length > 0) {
					for(var i = playerWarrior.playerFlames.length - 1; i >= 0; i--) {
						playerWarrior.playerFlames[i].draw(flamePic, true);
					}
				}
				if(playerWarrior.playerBombs.length > 0) {
					for(var i = playerWarrior.playerBombs.length - 1; i >= 0; i--) {
						playerWarrior.playerBombs[i].draw(pickAxePic, true);
					}
				}
				for(var i = 0; i < allGhosts.length; i++) {
					if(allGhosts[i].spells.length > 0) {
						for(var j = allGhosts[i].spells.length - 1; j >= 0; j--) {
							allGhosts[i].spells[j].draw(spellPic, false);
						}
					}
				}
				if(playerWarrior.attacking) {
					playerWarrior.drawSwing();
				}
				if(playerWarrior.PAattacking) {
					playerWarrior.drawPASwing();
				}
				if(playerWarrior.javelinAmmo > 0) {
					playerWarrior.drawResource(playerWarrior.javelinAmmo);
				}
				if(inventoryOpen) {
					drawInventory();
				}
			} else {
				drawHighlightedTile(mouseX, mouseY);
			}
		} else {
			playerWarrior.draw();
		}

		if(transition) {
			if(transitionZ != 0) {
				canvasContext.globalAlpha = 1 - (Math.abs(transitionZ - 500)/500);
				colourRect(0, 0, canvas.width, canvas.height, 'black');
			}
			canvasContext.restore();
		}
		drawUI();
	}
}
