const PLAYER_MOVE_SPEED = 2.5;

warriorClass.prototype = new movingEntityClass();

function warriorClass() {
	this.flameLearned = false;
	this.pickAxeFound = false;
	this.powerStoneFound = false;
	this.hasBossKey = false;

	this.usingSword = true;
	this.usingPickAxe = false;
	this.usingJavelin = true;
	this.usingFlame = false;

	this.attacking = false;
	this.PAattacking = false;

	this.swingCooldown = 0;
	this.PAswingCooldown = 0;
	this.javelinCooldown = 0;
	this.flameCooldown = 0;
	this.maxJavelinAmmo = 5;
	this.javelinAmmo = 3;
	this.playerJavelins = [];
	this.playerFlames = [];
	this.playerBombs = [];

	this.interactionTile;
	this.jumping = false;
	this.jumpDirection;
	this.jumpDistance;

	this.keyHeldNorth = false;
	this.keyHeldEast = false;
	this.keyHeldWest = false;
	this.keyHeldSouth = false;
	this.keyHeldAttack = false;
	this.keyHeldThrow = false;
	this.keyHeldInteract = false;

	this.controlKeyUp;
	this.controlKeyLeft;
	this.controlKeyRight;
	this.controlKeyDown;
	this.controlKeyAttack;
	this.controlKeyThrow;
	this.controlKeyInteract;

	this.setUpInput = function(upKey, leftKey, rightKey, downKey, spaceKey, throwKey, interactKey) {
		this.controlKeyUp = upKey;
		this.controlKeyLeft = leftKey;
		this.controlKeyRight = rightKey;
		this.controlKeyDown = downKey;
		this.controlKeyAttack = spaceKey;
		this.controlKeyThrow = throwKey;
		this.controlKeyInteract = interactKey;
	}

	this.reset = function(whichImage, warriorName) {
		this.name = warriorName;
		this.isPlayer = true;

		this.maxhp = 4;
		this.hp = 4;
		this.isDead = false;
		this.invincibilityFrames = 0;
		this.maxInvincibilityFrames = 90;

		this.flameLearned = false;
		this.pickAxeFound = false;
		this.powerStoneFound = false;
		this.hasBossKey = false;

		this.usingSword = true;
		this.usingPickAxe = false;
		this.usingJavelin = true;
		this.usingFlame = false;

		this.swingCooldown = 0;
		this.PAswingCooldown = 0;
		this.javelinCooldown = 0;
		this.flameCooldown = 0;
		this.maxJavelinAmmo = 5;
		this.javelinAmmo = 3;
		for(var eachRow = 0; eachRow < TILE_ROWS; eachRow++) {
			for(var eachCol = 0; eachCol < TILE_COLS; eachCol++) {
				var arrayIndex = TILE_COLS * eachRow + eachCol;
				if(worldGrid[arrayIndex] == TILE_PLAYER_START) {
					worldGrid[arrayIndex] = TILE_FLOOR;
					this.x = (eachCol + 0.5) * TILE_WIDTH;
					this.y = (eachRow + 0.5) * TILE_HEIGHT;
					this.facing = Math.PI/2;

					this.walker = sprite({
						context: canvas.getContext("2d"),
						width: 144,
						height: 192,
						x: this.x,
						y: this.y,
						image: whichImage,
						numberOfFramesH: 3,
						numberOfFramesV: 4,
						ticksPerFrame: framesPerSecond/5
					});
					this.walker.orientationIndex = 0;

					this.floorCollisionRadius = this.walker.frameWidth/4;
					this.entityCollisionRadius = this.walker.frameWidth/3;
					this.feetYOffset = this.walker.frameHeight/4;
					// Circular collision with squares with no rotation = only need to check a few places!
					this.numCircleCollisionPoints = 8;
					this.getCollisionPoints(true);

					this.rooted = false;
					this.rootDuration = 0;
					this.knockedBack = false;
					this.knockBackDuration = 0;
					this.knockBackStrengthX = 0;
					this.knockBackStrengthY = 0;
					this.attacking = false;
					this.PAattacking = false;
					this.jumping = false;
					this.hurtboxes = [];

					return;
				}
			}
		}
	}

	this.move = function() {
		this.nextX = this.x;
		this.nextY = this.y;
		this.invincibilityFrames--;
		if(this.invincibilityFrames < 0) {
			this.invincibilityFrames = 0;
		}

		if(this.knockedBack) {
			this.knockBackDuration--;
			if(this.knockBackDuration < 0) {
				this.knockBackDuration = 0;
				this.knockedBack = false;
			}
			if(this.knockedBack) {
				this.vX = this.knockBackStrengthX;
				this.vY = this.knockBackStrengthY;
			}
		} else if(this.rooted) {
			this.rootDuration--;
			if(this.rootDuration < 0) {
				this.rootDuration = 0;
				this.rooted = false;
			}
			this.vX = 0;
			this.vY = 0;
		} else if(this.jumping) {
			this.jumpTo(this.jumpDirection);
		} else {
			if(this.keyHeldSouth) {
				this.nextY += PLAYER_MOVE_SPEED;
				this.walker.orientationIndex = 0;
				this.facing = Math.PI/2;
				this.interactionTile = getTileIndexAtPixelCoord(this.x, this.y) + TILE_COLS;
			} else if(this.keyHeldWest) {
				this.nextX -= PLAYER_MOVE_SPEED;
				this.walker.orientationIndex = 1;
				this.facing = Math.PI;
				this.interactionTile = getTileIndexAtPixelCoord(this.x, this.y) - 1;
			} else if(this.keyHeldEast) {
				this.nextX += PLAYER_MOVE_SPEED;
				this.walker.orientationIndex = 2;
				this.facing = 0;
				this.interactionTile = getTileIndexAtPixelCoord(this.x, this.y) + 1;
			} else if(this.keyHeldNorth) {
				this.nextY -= PLAYER_MOVE_SPEED;
				this.walker.orientationIndex = 3;
				this.facing = -Math.PI/2;
				this.interactionTile = getTileIndexAtPixelCoord(this.x, this.y) - TILE_COLS;
			}
		}
		this.hitBoxLeftX = this.x - this.walker.width/2;
		this.hitBoxRightX = this.x + this.walker.width/2;
		this.hitBoxTopY = this.y - this.walker.height/2;
		this.hitBoxBottomY = this.y + this.walker.height/2;;

		this.handleScreenBoundary();
		this.handleWalkOnTile();
		this.useAbilities();
		this.handleEnemyCollisions();
		this.handleItemPickup();

		this.walker.x = this.x;
		this.walker.y = this.y;
	}

	this.useAbilities = function() {
		if(this.keyHeldAttack) {
			if(this.usingSword && !this.attacking && this.swingCooldown == 0) {
				this.startSwing();
			} else if(this.usingPickAxe && !this.PAattacking && this.PAswingCooldown == 0) {
				this.startPASwing();
			}
		}
		if(this.keyHeldThrow) {
			if(this.usingJavelin && this.javelinAmmo > 0 && this.javelinCooldown == 0) {
				this.throwJavelin(4, 0, 0, 5, 20);
			} else if(this.usingFlame && this.flameCooldown == 0) {
				this.fireFlame(2, 0, 0, 5, 120);
			}
		}
		if(this.attacking) {
			this.swing(3, 5, 10, 15, 40);
		}
		if(this.PAattacking) {
			this.PAswing(1, 5, 10, 15, 20);
		}
		if(this.playerJavelins.length > 0) {
			for(var i = this.playerJavelins.length - 1; i >= 0; i--) {
				this.playerJavelins[i].update();
				if(this.playerJavelins[i].isDead) {
					this.playerJavelins.splice(i, 1);
				}
			}
		}
		if(this.playerFlames.length > 0) {
			for(var i = this.playerFlames.length - 1; i >= 0; i--) {
				this.playerFlames[i].update();
				if(this.playerFlames[i].isDead) {
					this.playerFlames.splice(i, 1);
				}
			}
		}
		this.decrementCooldowns();
		if(this.keyHeldInteract) {
			this.interactWithTile(getTileIndexAtPixelCoord(this.x, this.y));
			this.interactWithTile(this.interactionTile);
		}
	}

	this.interactWithTile = function(tileIndex) {
		if(this.flameLearned && worldGrid[tileIndex] == TILE_TORCH && this.playerFlames.length < 1) {
			this.fireFlame(1, 0, 0, 5, 100);
		}
		if(this.pickAxeFound && worldGrid[tileIndex] == TILE_ROCK) {
			this.startPASwing();
			worldGrid[tileIndex] = TILE_RUBBLE;
			var spawnWhere = getPixelCoordAtTileIndex(tileIndex);
			spawnRandomItem(spawnWhere.x, spawnWhere.y);
		}
		var distanceOffset = 0;
		if(this.powerStoneFound && tileIndex == getTileIndexAtPixelCoord(this.x, this.y) && !this.jumping) {
			if(worldGrid[tileIndex] == TILE_JUMP_PAD_U) {
				distanceOffset = (this.y % TILE_HEIGHT) - TILE_HEIGHT/2;
				this.jumping = true;
				this.jumpDistance = 2 * TILE_HEIGHT + distanceOffset;
				this.jumpDirection = 3;
			} else if(worldGrid[tileIndex] == TILE_JUMP_PAD_R) {
				distanceOffset = TILE_WIDTH/2 - (this.x % TILE_WIDTH);
				this.jumping = true;
				this.jumpDistance = 2 * TILE_WIDTH + distanceOffset;
				this.jumpDirection = 2;
			} else if(worldGrid[tileIndex] == TILE_JUMP_PAD_D) {
				distanceOffset = TILE_HEIGHT/2 - (this.y % TILE_HEIGHT);
				this.jumping = true;
				this.jumpDistance = 2 * TILE_HEIGHT + distanceOffset;
				this.jumpDirection = 0;
			} else if(worldGrid[tileIndex] == TILE_JUMP_PAD_L) {
				distanceOffset = (this.x % TILE_WIDTH) - TILE_WIDTH/2;
				this.jumping = true;
				this.jumpDistance = 2 * TILE_WIDTH + distanceOffset;
				this.jumpDirection = 1;
			}
		}
		if(tileIndex == getTileIndexAtPixelCoord(this.x, this.y)) {
			if(worldGrid[tileIndex] == TILE_STAIRS_UP) {
				switchLevel(thisFloorIndex + 1, thisLevelIndex);
			} else if(worldGrid[tileIndex] == TILE_STAIRS_DOWN) {
				switchLevel(thisFloorIndex - 1, thisLevelIndex);
			}
		}
		if(this.hasBossKey && worldGrid[tileIndex] == TILE_BOSS_DOOR) {
			worldGrid[tileIndex] = TILE_BOSS_DOOR_OPEN;
		}
	}

	this.decrementCooldowns = function() {
		this.swingCooldown--;
		if(this.swingCooldown < 0) {
			this.swingCooldown = 0;
		}
		this.javelinCooldown--;
		if(this.javelinCooldown < 0) {
			this.javelinCooldown = 0;
		}
		this.PAswingCooldown--;
		if(this.PAswingCooldown < 0) {
			this.PAswingCooldown = 0;
		}
		this.flameCooldown--;
		if(this.flameCooldown < 0) {
			this.flameCooldown = 0;
		}
	}

	this.handleEnemyCollisions = function() {
		for(var i = 0; i < allEnemies.length; i++) {
			if(distanceBetween(this, allEnemies[i]) < this.entityCollisionRadius + allEnemies[i].entityCollisionRadius) {
				this.damaged(1);
			}
		}
	}

	this.handleItemPickup = function() {
		for(var i = 0; i < allItems.length; i++) {
			if(distanceBetween(this, allItems[i]) < this.entityCollisionRadius * 2) {
				allItems[i].pickup(this);
			}
		}
	}

	this.startSwing = function() {
		this.hurtboxes = [];
		var boxConfig = {
			offsetX: 24,
			offsetY: 0,
			radius: 24,
			rotation: this.facing,
			duration: framesPerSecond/5,
			startFrame: 0
		};
		var box = new hurtboxClass(boxConfig);
		this.hurtboxes = [box];
		this.attacking = true;
		this.rooted = true;
		this.rootDuration += box.duration;
		swordSwingSound.play();
	}

	this.swing = function(damage, KBStrength, KBDuration, rootDuration, cooldown) {
		for(var i = 0; i < this.hurtboxes.length; i++) {
			this.hurtboxes[i].update(true, this);
			if(this.hurtboxes[i].expired) {
				this.hurtboxes.splice(i, 1);
			}
			if(this.hurtboxes.length == 0) {
				this.attacking = false;
				this.swingCooldown = cooldown;
			} else {
				for(var j = 0; j < allEnemies.length; j++) {
					if(distanceBetween(this.hurtboxes[i], allEnemies[j]) < this.hurtboxes[i].radius + allEnemies[j].entityCollisionRadius && allEnemies[j].invincibilityFrames == 0) {
						var vX = allEnemies[j].x - this.x;
						var vY = allEnemies[j].y - this.y;
						var knockBackStrength = KBStrength;

						allEnemies[j].knockedBack = true;
						allEnemies[j].knockBackDuration = KBDuration;
						allEnemies[j].rooted = true;
						allEnemies[j].rootDuration = rootDuration;

						if(Math.abs(vX) > Math.abs(vY)) {
							allEnemies[j].knockBackStrengthX = knockBackStrength * Math.sign(vX);
							allEnemies[j].knockBackStrengthY = 0;
						} else {
							allEnemies[j].knockBackStrengthX = 0;
							allEnemies[j].knockBackStrengthY = knockBackStrength * Math.sign(vY);
						}

						allEnemies[j].damaged(damage);
						enemyPainSound.play();
					}
				}
			}
		}
	}

	this.drawSwing = function() {
		var angledOffsetX = 0;
		var angledOffsetY = 0;
		if(this.facing == 0) {
			angledOffsetX = 24;
			angledOffsetY = 10;	
		} else if(this.facing == Math.PI) {
			angledOffsetX = -24;
			angledOffsetY = 10;
		} else if (this.facing == -Math.PI/2) {
			angledOffsetX = 10;
			angledOffsetY = -24;
		} else if (this.facing == Math.PI/2) {
			angledOffsetX = -10;
			angledOffsetY = 24;
		}
		drawBitmapCenteredWithRotation(swordPic, this.x + angledOffsetX, this.y + angledOffsetY, this.facing);
	}

	this.startPASwing = function() {
		this.hurtboxes = [];
		var boxConfig = {
			offsetX: 24,
			offsetY: 0,
			radius: 24,
			rotation: this.facing,
			duration: framesPerSecond/5,
			startFrame: 0
		};
		var box = new hurtboxClass(boxConfig);
		this.hurtboxes = [box];
		this.PAattacking = true;
		this.rooted = true;
		this.rootDuration += framesPerSecond/5;
		swordSwingSound.play();
	}

	this.PAswing = function(damage, KBStrength, KBDuration, rootDuration, cooldown) {
		for(var i = 0; i < this.hurtboxes.length; i++) {
			this.hurtboxes[i].update(true, this);
			if(this.hurtboxes[i].expired) {
				this.hurtboxes.splice(i, 1);
			}
			if(this.hurtboxes.length == 0) {
				this.PAattacking = false;
				this.PAswingCooldown = cooldown;
			} else {
				for(var j = 0; j < allEnemies.length; j++) {
					if(distanceBetween(this.hurtboxes[i], allEnemies[j]) < this.hurtboxes[i].radius + allEnemies[j].entityCollisionRadius && allEnemies[j].invincibilityFrames == 0) {
						var vX = allEnemies[j].x - this.x;
						var vY = allEnemies[j].y - this.y;
						var knockBackStrength = KBStrength;

						allEnemies[j].knockedBack = true;
						allEnemies[j].knockBackDuration = KBDuration;
						allEnemies[j].rooted = true;
						allEnemies[j].rootDuration = rootDuration;

						if(Math.abs(vX) > Math.abs(vY)) {
							allEnemies[j].knockBackStrengthX = knockBackStrength * Math.sign(vX);
							allEnemies[j].knockBackStrengthY = 0;
						} else {
							allEnemies[j].knockBackStrengthX = 0;
							allEnemies[j].knockBackStrengthY = knockBackStrength * Math.sign(vY);
						}

						allEnemies[j].damaged(damage);
						enemyPainSound.play();
					}
				}
			}
		}
	}

	this.drawPASwing = function() {
		var angledOffsetX = 0;
		var angledOffsetY = 0;
		if(this.facing == 0) {
			angledOffsetX = 24;
			angledOffsetY = 10;	
		} else if(this.facing == Math.PI) {
			angledOffsetX = -24;
			angledOffsetY = 10;
		} else if (this.facing == -Math.PI/2) {
			angledOffsetX = 10;
			angledOffsetY = -24;
		} else if (this.facing == Math.PI/2) {
			angledOffsetX = -10;
			angledOffsetY = 24;
		}
		drawBitmapCenteredWithRotation(pickAxePic, this.x + angledOffsetX, this.y + angledOffsetY, this.facing);
	}

	this.throwJavelin = function(damage, KBStrength, KBDuration, rootDuration, cooldown) {
		javelinThrowSound.play();
		var javelin = new projectileClass();
		var config = {
			offsetX: 10,
			offsetY: 0,
			radius: 12,
			rotation: this.facing,
			duration: framesPerSecond * 200,
			startFrame: 0
		};
		javelin.launch(this.x, this.y, JAVELIN_ELEVATION, this.facing, JAVELIN_SPEED, 20, KBStrength, KBDuration, rootDuration, damage, config, true);
		this.playerJavelins.push(javelin);
		this.javelinCooldown = cooldown;
		this.javelinAmmo--;
	}

	this.fireFlame = function(damage, KBStrength, KBDuration, rootDuration, cooldown) {
		var flame = new projectileClass();
		var config = {
			offsetX: 0,
			offsetY: 0,
			radius: 0,
			rotation: this.facing,
			duration: framesPerSecond * 200,
			startFrame: 0
		};
		flame.launch(this.x, this.y, 0, this.facing, 5, 20, KBStrength, KBDuration, rootDuration, damage, config, true, true);
		this.playerFlames.push(flame);
		this.flameCooldown = cooldown;
	}
}