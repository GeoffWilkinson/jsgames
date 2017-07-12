const MAX_BOSS_COUNTER = 6000;
const FLAME_WALL_DAMAGE = 2;
const SWORD_DAMAGE = 4;

bossClass.prototype = new movingEntityClass();

function bossClass() {

	this.reset = function(whichImage, bossName) {
		this.name = bossName;
		this.vX = 0;
		this.vY = 0;

		this.moveSpeed;
		this.targetPlayer = false;
		this.flying = true;
		this.moveSpeed = 1;
		this.isBoss = true;

		this.maxhp = 100;
		this.hp = 100;
		this.isDead = false;
		this.invincibilityFrames = 0;
		this.maxInvincibilityFrames = 120;

		this.bossCounter = 0;

		this.flameWall = [];
		this.flameWallOpacity = 0;

		this.swords = [];
		this.swordCooldown = 1;

		for(var eachRow = 0; eachRow < TILE_ROWS; eachRow++) {
			for(var eachCol = 0; eachCol < TILE_COLS; eachCol++) {
				var arrayIndex = TILE_COLS * eachRow + eachCol;
				if(worldGrid[arrayIndex] == TILE_BOSS_START) {
					worldGrid[arrayIndex] = TILE_FLOOR;
					this.x = eachCol * TILE_WIDTH;
					this.y = eachRow * TILE_HEIGHT;
					this.facing = Math.PI/2;

					this.walker = sprite({
						context: canvas.getContext("2d"),
						width: 288,
						height: 96,
						x: this.x,
						y: this.y,
						image: whichImage,
						numberOfFramesH: 3,
						numberOfFramesV: 1,
						ticksPerFrame: framesPerSecond/5
					});

					this.floorCollisionRadius = this.walker.frameWidth/4;
					this.entityCollisionRadius = this.walker.frameWidth/4;
					this.feetYOffset = this.walker.frameHeight/4;
					// Circular collision with squares with no rotation = only need to check a few places!
					this.numCircleCollisionPoints = 16;
					this.getCollisionPoints(true);

					this.rooted = false;
					this.rootDuration = 0;
					this.knockedBack = false;
					this.knockBackDuration = 0;
					this.knockBackStrengthX = 0;
					this.knockBackStrengthY = 0;
					this.attacking = false;
					this.hurtboxes = [];

					this.spawnFlameWalls();

					return;
				}
			}
		}
	}

	this.incrementAbilityCounters = function() {
		// single counter increment and reset at certain value
		this.bossCounter += 1;
		if(this.bossCounter > MAX_BOSS_COUNTER) {
			this.bossCounter = 0;
		}

	}

	this.useAbilities = function() {
		this.incrementAbilityCounters();

		if(this.bossCounter <= MAX_BOSS_COUNTER/4 && this.flameWallOpacity < 1) {
			this.activateFlameWalls();
		} else if(this.bossCounter >= MAX_BOSS_COUNTER*3/4 && this.flameWallOpacity > 0) {
			this.deactivateFlameWalls();
		}

		for(var i = 0; i < this.flameWall.length; i++) {
			this.flameWall[i].updateFlameWall(this.x, this.y, this.flameWallOpacity);
		}
		for(var i = 0; i < this.swords.length; i++) {
			this.swords[i].updateSword(this.x, this.y);
		}

		this.swordCircluarSwing();
		this.decrementCooldowns();
	}

	this.decrementCooldowns = function() {
		// sword swing cooldown goes here
		if(this.swordCooldown < 0) {
			this.swordCooldown = 0;
		} else if(this.hp < this.maxhp*4/5) {
			this.swordCooldown--;
		}

	}

	this.spawnFlameWalls = function() {
		// 3 flame walls surrounding boss covering roughly the entire room
		// hitboxes are only active when fully opaque, visually indicated by a hue change
		var numFlameWalls = 3;
		var flameWallAngle = 0;
		var numComponentsPerWall = 20;
		var componentSeparation = 24;
		for(var i = 0; i < numFlameWalls; i++) {
			flameWallAngle += -Math.PI*2/numFlameWalls;
			for(var j = 0; j < numComponentsPerWall; j++) {
				var newFlameWallComponent = new bossProjectileClass();
				var config = {
					offsetX: 0,
					offsetY: 0,
					radius: 18,
					rotation: 0,
					duration: framesPerSecond * 20000,
					startFrame: 0
				};
				newFlameWallComponent.setFlameWallComponent(this.x, this.y, flameWallAngle, Math.PI/1800, j + 3, componentSeparation, config, FLAME_WALL_DAMAGE);
				this.flameWall.push(newFlameWallComponent);
			}
		}
	}

	this.activateFlameWalls = function() {
		// set fade to opaque from invisible over time
		this.flameWallOpacity += 12/MAX_BOSS_COUNTER;
		if(this.flameWallOpacity > 1) {
			this.flameWallOpacity = 1;
		}
	}

	this.deactivateFlameWalls = function() {
		// set fade to invisible from opaque over time
		this.flameWallOpacity -= 12/MAX_BOSS_COUNTER;
		if(this.flameWallOpacity < 0) {
			this.flameWallOpacity = 0;
		}
	}

	this.swordCircluarSwing = function() {
		// sequence will fade in opposite to the player at a random range (from a set)
		// once faded in, will rapidly circle the boss and fade out once it has completed 2 PI radians
		var radialIndex = Math.ceil(Math.random() * 2);
		if(this.swordCooldown == 0) {
			var newSword = new bossProjectileClass();
			var config = {
				offsetX: 0,
				offsetY: 0,
				radius: 18,
				rotation: 0,
				duration: framesPerSecond * 20000,
				startFrame: 0
			};
			var angleToPlayer = Math.atan2(this.y - playerWarrior.y, this.x - playerWarrior.x);
			var initialAngle = angleToPlayer;
			newSword.setSword(this.x, this.y, initialAngle, -Math.PI/30, radialIndex, 100, config, SWORD_DAMAGE);
			this.swords.push(newSword);
			this.swordCooldown = 1000 * this.hp/this.maxhp;
		}
		if(this.swords.length > 0) {
			for(var i = this.swords.length - 1; i >= 0; i--) {
				if(this.swords[i].isDead) {
					this.swords.splice(i, 1);
				}
			}
		}
	}

	this.circularMotion = function() {
		var distanceFromScreenCentre = Math.sqrt((this.x - canvas.width/2) * (this.x - canvas.width/2) + (this.y - canvas.height/2) * (this.y - canvas.height/2));
		var angleFromScreenCentre = Math.atan2(this.y - canvas.height/2, this.x - canvas.width/2);
		var angularVelocity = Math.PI/3000;

		this.nextX = canvas.width/2 + Math.cos(angleFromScreenCentre + angularVelocity) * distanceFromScreenCentre;
		this.nextY = canvas.height/2 + Math.sin(angleFromScreenCentre + angularVelocity) * distanceFromScreenCentre;
		//console.log(this.nextX + "," + this.nextY);

		this.x = this.nextX;
		this.y = this.nextY;
	}

	this.move = function() {
		this.invincibilityFrames--;
		if(this.invincibilityFrames < 0) {
			this.invincibilityFrames = 0;
		}

		this.useAbilities();
		this.circularMotion();

		this.hitBoxLeftX = this.x - this.walker.width/2;
		this.hitBoxRightX = this.x + this.walker.width/2;
		this.hitBoxTopY = this.y - this.walker.height/2;
		this.hitBoxBottomY = this.y + this.walker.height/2;;

		//this.handleScreenBoundary();

		this.walker.x = this.x;
		this.walker.y = this.y;
	}
}