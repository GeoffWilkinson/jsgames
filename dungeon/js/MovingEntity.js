function movingEntityClass() {
	this.name;
	this.walker;
	this.isPlayer;
	this.isBoss;

	this.flying;
	this.cyclesTilDirectionChange;

	this.maxhp;
	this.hp;
	this.isDead;
	this.invincibilityFrames;
	this.maxInvincibilityFrames;

	this.rooted = false;
	this.rootDuration = 0;
	this.knockedBack = false;
	this.knockBackDuration = 0;
	this.knockBackStrengthX = 0;
	this.knockBackStrengthY = 0;
	this.hurtboxes = [];

	this.x;
	this.y;
	this.nextX;
	this.nextY;
	this.vX;
	this.vY;
	this.feetY;
	this.facing;

	// Assuming square sprite
	this.floorCollisionRadius;
	this.entityCollisionRadius;
	this.numCircleCollisionPoints;
	this.collisionPoints = [];

	this.getCollisionPoints = function(init) {
		// Start at a "corner"
		var nextAngle = Math.PI/4;
		if(init) {
			this.collisionPoints = [];
		}
		for(var i = 0; i < this.numCircleCollisionPoints; i++) {
			if(init) {
				this.collisionPoints.push({x: 0, y: 0});
			}
			this.collisionPoints[i].x = this.x + this.floorCollisionRadius * Math.cos(nextAngle);
			this.collisionPoints[i].y = this.y + this.feetYOffset + this.floorCollisionRadius * Math.sin(nextAngle);
			this.collisionPoints[i].indexHere = 0;
			this.collisionPoints[i].tileTypeHere = 0;
			nextAngle += 2 * Math.PI / this.numCircleCollisionPoints;
		}
	}

	this.jumpTo = function(jumpDirection) {
		var speedX;
		var speedY;
		var speed = Math.min(this.jumpDistance, 5);
		if(this.jumping) {
			if(jumpDirection == 3) {
				speedX = 0;
				speedY = -speed;
			} else if(jumpDirection == 2) {
				speedX = speed;
				speedY = 0;
			} else if(jumpDirection == 0) {
				speedX = 0;
				speedY = speed;
			} else if(jumpDirection == 1) {
				speedX = -speed;
				speedY = 0;
			}
			this.nextX += speedX;
			this.nextY += speedY;
			this.jumpDistance -= speed;
			if(this.jumpDistance <= 0) {
				this.jumping = false;
				this.jumpDistance = 0;
			}
		}
	}

	this.handleScreenBoundary = function() {
		if(this.nextX < 0) {
			if(this.isPlayer) {
				this.nextX = canvas.width
				switchLevel(thisFloorIndex, thisLevelIndex - 1);
			} else {
				this.nextX = 0;
				this.cyclesTilDirectionChange = 0;
			}
		}
		if(this.nextX > canvas.width) {
			if(this.isPlayer) {
				this.nextX = 0;
				switchLevel(thisFloorIndex, thisLevelIndex + 1);
			} else {
				this.nextX = canvas.width;
				this.cyclesTilDirectionChange = 0;
			}
		}
		if(this.nextY < 0) {
			if(this.isPlayer) {
				this.nextY = canvas.height;
				switchLevel(thisFloorIndex, thisLevelIndex - WORLD_COLS);
			} else {
				this.nextY = 0;
				this.cyclesTilDirectionChange = 0;
			}
		}
		if(this.nextY > canvas.height) {
			if(this.isPlayer) {
				this.nextY = 0;
				switchLevel(thisFloorIndex, thisLevelIndex + WORLD_COLS);
			} else {
				this.nextY = canvas.height;
				this.cyclesTilDirectionChange = 0;
			}
		}
	}

	this.handleWalkOnTile = function() {
		var impassableTiles = [TILE_WALL, TILE_BOSS_DOOR, TILE_ROCK, TILE_TORCH_DOOR];
		if(!this.flying && !this.jumping) {
			impassableTiles.push(TILE_ABYSS);
		}
		var impassableTilesCompare = impassableTiles.slice();

		this.getCollisionPoints(false);
		for(var i = 0; i < this.collisionPoints.length; i++) {
			this.collisionPoints[i].indexHere = getTileIndexAtPixelCoord(this.collisionPoints[i].x + (this.nextX - this.x), this.collisionPoints[i].y + (this.nextY - this.y));
			this.collisionPoints[i].tileTypeHere = worldGrid[this.collisionPoints[i].indexHere];
		}
		var uniqueTileTypesHit = Array.from(new Set(this.collisionPoints.map(item => item.tileTypeHere)));

		for(var i = impassableTilesCompare.length - 1; i >= 0; i--) {
			for(var j = 0; j < uniqueTileTypesHit.length; j++) {
				if(impassableTilesCompare[i] == uniqueTileTypesHit[j]) {
					impassableTilesCompare.splice(i, 1);
				}
			}
		}

		if(impassableTiles.length == impassableTilesCompare.length) {
			this.x = this.nextX;
			this.y = this.nextY;
		} else {
			this.cyclesTilDirectionChange = 0;
		}
		for(var i = 0; i < this.collisionPoints.length; i++) {
			if(this.isPlayer) {
				if(this.collisionPoints[i].tileTypeHere == SPAWN_LEARN_FLAME) {
					this.flameLearned = true;
					worldGrid[this.collisionPoints[i].indexHere] = TILE_FLOOR;
				}
				if(this.collisionPoints[i].tileTypeHere == SPAWN_PICKAXE) {
					this.pickAxeFound = true;
					worldGrid[this.collisionPoints[i].indexHere] = TILE_FLOOR;
				}
				if(this.collisionPoints[i].tileTypeHere == SPAWN_POWER_STONE) {
					this.powerStoneFound = true;
					worldGrid[this.collisionPoints[i].indexHere] = TILE_FLOOR;
				}
				if(this.collisionPoints[i].tileTypeHere == SPAWN_BOSS_KEY) {
					this.hasBossKey = true;
					worldGrid[this.collisionPoints[i].indexHere] = TILE_FLOOR;
				}
			}
			if(this.collisionPoints[i].tileTypeHere == TILE_SPIKES) {
				if(!this.flying && !this.jumping) {
					this.damaged(1);
				}
			}
		}
	}

	this.damaged = function(damagePoints) {
		if(this.invincibilityFrames == 0) {
			this.hp -= damagePoints;
			if(this.hp <= 0) {
				this.hp = 0;
				this.invincibilityFrames = 0;
				this.handleDeath();
			} else {
				this.invincibilityFrames = this.maxInvincibilityFrames;
				if(this.isPlayer) {
					playerPainSound.play();
				} else {
					enemyPainSound.play();
				}
			}
		}
	}

	this.handleDeath = function() {
		this.isDead = true;
		if(this.isPlayer) {
			gameOverScreen = true;
		} else if(this.isBoss) {
			gameOverScreen = true;
		} else {
			if(this.isCaster) {
				for(var i = 0; i < this.spells.length; i++) {
					this.spells[i].isDead = true;
				}
			}
			deadEntitiesToClear = true;
			batDeathSound.play();
			spawnRandomItem(this.x, this.y);
		}
	}

	this.draw = function() {
		if(this.invincibilityFrames % 5 == 0) {
			if(!inventoryOpen) {
				this.walker.update();
			}
			this.walker.render();
		}
		if(this.hp > 0) {
			this.drawHP();
		}
		//this.drawHurtboxes();
	}

	this.drawHP = function() {
		var hpBarOffsetX = this.maxhp * 5/2;
		var hpBarOffsetY = this.walker.frameHeight/2 * 5/4;
		colourRect(this.x - hpBarOffsetX - 1, this.y - hpBarOffsetY - 1, this.maxhp * 5 + 2, 7, 'white');
		colourRect(this.x - hpBarOffsetX, this.y - hpBarOffsetY, this.maxhp * 5, 5, 'black');
		colourRect(this.x - hpBarOffsetX, this.y - hpBarOffsetY, this.hp * 5, 5, 'green');
	}

	this.drawResource = function(resourceAmount) {
		for(var i = 0; i < resourceAmount; i++) {
			var hpBarOffsetX = (this.maxhp * 5/2) - (i * 6);
			var hpBarOffsetY = this.walker.frameHeight/2 * 3/2;
			colourRect(this.x - hpBarOffsetX, this.y - hpBarOffsetY, 4, 4, 'white');
		}
	}

	this.drawHurtboxes = function() {
		// Hilariously, these boxes are circles
		for(var i = 0; i < this.hurtboxes.length; i++) {
			var box = this.hurtboxes[i];
			canvasContext.globalAlpha = 0.5;
			colourCircle(this.hurtboxes[i].x, this.hurtboxes[i].y, this.hurtboxes[i].radius, 'red');
			canvasContext.globalAlpha = 1;
		}
	}
}

function distanceBetween(entity1, entity2) {
	var xDist = Math.abs(entity1.x - entity2.x);
	var yDist = Math.abs(entity1.y - entity2.y);
	return Math.sqrt(xDist * xDist + yDist * yDist);
}
