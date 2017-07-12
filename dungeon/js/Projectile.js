const JAVELIN_SPEED = 10;
const JAVELIN_ELEVATION = 5;

const SPELL_SPEED = 2;
const SPELL_ELEVATION = 5;

function projectileClass() {
	this.x;
	this.y;
	this.z;
	this.vX;
	this.vY;
	this.facing;
	this.length;
	this.width;
	this.hurtboxes = [];
	this.isDead = false;
	this.knockBackStrength;
	this.knockBackDuration;
	this.rootDuration;
	this.damage;
	this.playerOwned;
	this.lightsTorches;

	this.launch = function(fromX, fromY, fromZ, angle, speed, length, KBStrength, KBDuration, rootDuration, damage, hurtboxConfig, playerOwned, lightsTorches) {
		this.x = fromX;
		this.y = fromY;
		this.facing = angle;
		this.length = length;
		this.vX = Math.cos(this.facing) * speed;
		this.vY = Math.sin(this.facing) * speed;
		this.z = fromZ;
		this.knockBackStrength = KBStrength;
		this.knockBackDuration = KBDuration;
		this.rootDuration = rootDuration;
		this.damage = damage;
		this.playerOwned = playerOwned;
		this.isDead = false;
		this.hurtboxes = [];
		var boxConfig = hurtboxConfig;
		var box = new hurtboxClass(boxConfig);
		this.hurtboxes = [box];
		this.lightsTorches = lightsTorches || false;
	}

	this.update = function() {
		this.x += this.vX;
		this.y += this.vY;
		this.handleScreenBoundary();
		this.handleHittingTile();

		for(var i = this.hurtboxes.length - 1; i >= 0; i--) {
			this.hurtboxes[i].update(true, this);
			if(this.hurtboxes[i].expired) {
				this.hurtboxes.splice(i, 1);
			}
			this.handleEntityCollision();
		}
	}

	this.handleEntityCollision = function() {
		for(var i = 0; i < this.hurtboxes.length; i++) {
			if(this.playerOwned) {
				for(var j = 0; j < allEnemies.length; j++) {
					if(distanceBetween(this.hurtboxes[i], allEnemies[j]) < this.hurtboxes[i].radius + allEnemies[j].entityCollisionRadius && allEnemies[j].invincibilityFrames == 0) {
						var vX = allEnemies[j].x - this.x;
						var vY = allEnemies[j].y - this.y;
						var knockBackStrength = this.knockBackStrength;

						allEnemies[j].knockedBack = true;
						allEnemies[j].knockBackDuration = this.knockBackDuration;
						allEnemies[j].rooted = true;
						allEnemies[j].rootDuration = this.rootDuration;

						if(Math.abs(vX) > Math.abs(vY)) {
							allEnemies[j].knockBackStrengthX = this.knockBackStrength * Math.sign(vX);
							allEnemies[j].knockBackStrengthY = 0;
						} else {
							allEnemies[j].knockBackStrengthX = 0;
							allEnemies[j].knockBackStrengthY = this.knockBackStrength * Math.sign(vY);
						}
						allEnemies[j].damaged(this.damage);
						this.isDead = true;
					}	
				}
			} else {
				if(distanceBetween(this.hurtboxes[i], playerWarrior) < this.hurtboxes[i].radius + playerWarrior.entityCollisionRadius && playerWarrior.invincibilityFrames == 0) {
					var vX = playerWarrior.x - this.x;
					var vY = playerWarrior.y - this.y;
					var knockBackStrength = this.knockBackStrength;

					playerWarrior.knockedBack = true;
					playerWarrior.knockBackDuration = this.knockBackDuration;
					playerWarrior.rooted = true;
					playerWarrior.rootDuration = this.rootDuration;

					if(Math.abs(vX) > Math.abs(vY)) {
						playerWarrior.knockBackStrengthX = this.knockBackStrength * Math.sign(vX);
						playerWarrior.knockBackStrengthY = 0;
					} else {
						playerWarrior.knockBackStrengthX = 0;
						playerWarrior.knockBackStrengthY = this.knockBackStrength * Math.sign(vY);
					}
					playerWarrior.damaged(this.damage);
					this.isDead = true;
				}
			}
		}
	}

	this.handleScreenBoundary = function() {
		if(this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
			this.isDead = true;
		}
	}

	this.handleHittingTile = function() {
		var impassableTiles = [TILE_WALL, TILE_BOSS_DOOR, TILE_TORCH_DOOR, TILE_ROCK];
		var impassableTilesCompare = impassableTiles.slice();

		var indexHere = getTileIndexAtPixelCoord(this.x, this.y);
		var tileTypeHere = worldGrid[indexHere];

		for(var i = impassableTilesCompare.length - 1; i >= 0; i--) {
			if(impassableTilesCompare[i] == tileTypeHere) {
				impassableTilesCompare.splice(i, 1);
			}
		}

		if(impassableTiles.length != impassableTilesCompare.length) {
			this.isDead = true;
		}

		if(tileTypeHere == TILE_TORCH && this.lightsTorches) {
			var noSpawn = false;
			for(var i = 0; i < allLitTorches.length; i++) {
				var tempIndexHere = getTileIndexAtPixelCoord(allLitTorches[i].x, allLitTorches[i].y);
				if(tempIndexHere == indexHere) {
					noSpawn = true;
					break;
				}
			}
			if(!noSpawn) {
				var litTorch = new worldObjectClass();
				var spawnAtX = TILE_WIDTH * (0.5 + (indexHere % TILE_COLS));
				var spawnAtY = TILE_HEIGHT * (0.5 + Math.floor(indexHere/TILE_COLS));
				litTorch.reset(litTorchFlamePic, spawnAtX, spawnAtY);
				allLitTorches.push(litTorch);
			}
			var numTorches = 0;
			var numLitTorches = 0;
			for(var i = 0; i < worldGrid.length; i++) {
				if(worldGrid[i] == 6) {
					numTorches++;
				}
			}
			for(var i = 0; i < allLitTorches.length; i++) {
				numLitTorches++;
			}
			if(numLitTorches == numTorches && numLitTorches > 0) {
				unlockAllTorchDoors();
			}
		}
	}

	this.draw = function(whichImage, rotates) {
		var rotation;
		if(rotates) {
			rotation = this.facing;
		} else {
			rotation = 0;
		}
		drawBitmapCenteredWithRotation(whichImage, this.x, this.y, rotation);
		//this.drawHurtboxes();
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