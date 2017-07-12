const AI_WANDER_DURATION = 100;

enemyClass.prototype = new movingEntityClass();

function enemyClass() {
	this.moveSpeed;
	this.targetPlayer = false;
	this.spells = [];
	this.spellCooldown;
	this.aggroRange;
	this.isCaster;

	this.setBat = function() {
		this.flying = true;
		this.maxhp = 2;
		this.hp = 2;
		this.moveSpeed = 1.5;
		this.isCaster = false;
		this.maxInvincibilityFrames = 60;
	}

	this.setGhost = function() {
		this.flying = true;
		this.maxhp = 4;
		this.hp = 4;
		this.moveSpeed = 1;
		this.isCaster = true;
		this.maxInvincibilityFrames = 60;
	}

	this.reset = function(whichImage, enemyName) {
		this.name = enemyName;
		this.vX = 0;
		this.vY = 0;

		this.isDead = false;
		this.invincibilityFrames = 0;
		this.spellCooldown = 0;
		this.aggroRange = 300;

		this.cyclesTilDirectionChange = AI_WANDER_DURATION;

		for(var eachRow = 0; eachRow < TILE_ROWS; eachRow++) {
			for(var eachCol = 0; eachCol < TILE_COLS; eachCol++) {
				var arrayIndex = TILE_COLS * eachRow + eachCol;
				if(worldGrid[arrayIndex] == TILE_ENEMY_START) {
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
					this.hurtboxes = [];

					return;
				}
			}
		}
	}

	this.AIMovement = function() {
		this.cyclesTilDirectionChange--;

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
				this.rooted = false;
			}
			this.vX = 0;
			this.vY = 0;
		} else if(this.targetPlayer) {
			this.vX = 0;
			this.vY = 0;
		} else {
			if(this.cyclesTilDirectionChange <= 0) {
				if(Math.random() < 0.2) {
					this.vX = 0;
					this.vY = this.moveSpeed;
					this.walker.orientationIndex = 0;
					this.facing = Math.PI/2;
				} else if(Math.random() < 0.4) {
					this.vX = -this.moveSpeed;
					this.vY = 0;
					this.walker.orientationIndex = 1;
					this.facing = Math.PI;
				} else if(Math.random() < 0.6) {
					this.vX = this.moveSpeed;
					this.vY = 0;
					this.walker.orientationIndex = 2;
					this.facing = 0;
				} else if(Math.random() < 0.8) {
					this.vX = 0;
					this.vY = -this.moveSpeed;
					this.walker.orientationIndex = 3;
					this.facing = -Math.PI/2;
				} else {
					this.vX = 0;
					this.vY = 0;
				}
				this.cyclesTilDirectionChange = Math.floor(AI_WANDER_DURATION * Math.random() + 0.5);
			}			
		}
	}

	this.AIAgression = function() {
		this.targetPlayer = false;
		if(this.isCaster) {
			if(distanceBetween(this, playerWarrior) < this.aggroRange) {
				if(Math.abs(playerWarrior.x - this.x) <= 15) {
					if(playerWarrior.y > this.y) {
						if(this.walker.orientationIndex == 0) {
							this.targetPlayer = true;
						} else if(this.walker.orientationIndex < 3) {
							this.walker.orientationIndex = 0;
							this.facing = Math.PI/2;
							this.targetPlayer = true;
						} else {
							this.targetPlayer = false;
						}
					} else {
						if(this.walker.orientationIndex == 0) {
							this.targetPlayer = false;
						} else if(this.walker.orientationIndex < 3) {
							this.walker.orientationIndex = 3;
							this.facing = -Math.PI/2;
							this.targetPlayer = true;
						} else {
							this.targetPlayer = true;
						}
					}
				} else if(Math.abs(playerWarrior.y - this.y) <= 15) {
					if(playerWarrior.x < this.x) {
						if(this.orientationIndex == 0) {
							this.orientationIndex = 1
							this.facing = Math.PI;
							this.targetPlayer = true;
						} else if(this.orientationIndex == 1) {
							this.targetPlayer = true;
						} else if(this.orientationIndex == 2) {
							this.targetPlayer = false;
						} else {
							this.walker.orientationIndex = 1
							this.facing = Math.PI;
							this.targetPlayer = true;
						}
					} else {
						if(this.walker.orientationIndex == 0) {
							this.walker.orientationIndex = 2
							this.facing = 0;
							this.targetPlayer = true;
						} else if(this.walker.orientationIndex == 1) {
							this.targetPlayer = false;
						} else if(this.walker.orientationIndex == 2) {
							this.targetPlayer = true;
						} else {
							this.walker.orientationIndex = 2
							this.facing = 0;
							this.targetPlayer = true;
						}
					}
				}
			}
			if(this.targetPlayer && this.spellCooldown == 0) {
				this.castSpell(0, 0, 0, 2, 150);
			}
		}
	}

	this.useAbilities = function() {
		if(this.spells.length > 0) {
			for(var i = this.spells.length - 1; i >= 0; i--) {
				this.spells[i].update();
				if(this.spells[i].isDead) {
					this.spells.splice(i, 1);
				}
			}
		}
		this.decrementCooldowns();
	}

	this.decrementCooldowns = function() {
		this.spellCooldown--;
		if(this.spellCooldown < 0) {
			this.spellCooldown = 0;
		}
	}

	this.move = function() {
		this.nextX = this.x;
		this.nextY = this.y;
		this.invincibilityFrames--;
		if(this.invincibilityFrames < 0) {
			this.invincibilityFrames = 0;
		}

		this.AIAgression();
		this.useAbilities();
		this.AIMovement();
		this.nextX += this.vX;
		this.nextY += this.vY;

		this.hitBoxLeftX = this.x - this.walker.width/2;
		this.hitBoxRightX = this.x + this.walker.width/2;
		this.hitBoxTopY = this.y - this.walker.height/2;
		this.hitBoxBottomY = this.y + this.walker.height/2;;

		this.handleScreenBoundary();
		this.handleWalkOnTile();

		this.walker.x = this.x;
		this.walker.y = this.y;
	}

	this.castSpell = function(KBStrength, KBDuration, rootDuration, damage, cooldown) {
		var newSpell = new projectileClass();
		var config = {
			offsetX: 0,
			offsetY: 0,
			radius: 18,
			rotation: 0,
			duration: framesPerSecond * 200,
			startFrame: 0
		};
		newSpell.launch(this.x, this.y, SPELL_ELEVATION, this.facing, SPELL_SPEED, 0, KBStrength, KBDuration, rootDuration, damage, config, false);
		this.spells.push(newSpell);
		this.spellCooldown = cooldown;
	}
}