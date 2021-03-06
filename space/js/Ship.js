// tuning constants
const SPACESPEED_DECAY_MULT = 0.99;
const THRUST_POWER = 0.15;
const TURN_RATE = 0.03;
const SHIP_COLLISION_RADIUS = 20;

const CANNON_BASE_COOLDOWN = 10;
const SHOCKWAVE_BASE_COOLDOWN = 90;
const MISSILE_BASE_COOLDOWN = 25;
const BEAMCANNON_BASE_COOLDOWN = 120;

const CANNON_BASE_DAMAGE = 10;
const SHOCKWAVE_BASE_DAMAGE = 5;
const MISSILE_BASE_DAMAGE = 20;
const BEAMCANNON_BASE_DAMAGE = 2;

shipClass.prototype = new movingWrapPositionClass(); 

function shipClass() {
	// keyboard hold state variables, to use keys more like buttons
	this.keyHeld_Gas = false;
	this.keyHeld_Reverse = false;
	this.keyHeld_TurnLeft = false;
	this.keyHeld_TurnRight = false;
	this.keyHeld_Weapon1 = false;
	this.keyHeld_Weapon2 = false;
	this.keyHeld_Weapon3 = false;
	this.keyHeld_Weapon4 = false;
	this.keyHeld_Shoot = false;

	// key controls used for this 
	this.setupControls = function(forwardKey, backKey, leftKey, rightKey, key1, key2, key3, key4, spaceBar) {
		this.controlKeyForGas = forwardKey;
		this.controlKeyForReverse = backKey;
		this.controlKeyForTurnLeft = leftKey;
		this.controlKeyForTurnRight = rightKey;
		this.weapon1Key = key1;
		this.weapon2Key = key2;
		this.weapon3Key = key3;
		this.weapon4Key = key4;
		this.shootKey = spaceBar;
	}

	this.superclassInit = this.init;

	this.init = function(whichImage) {
		this.superclassInit();
		this.myBitmap = whichImage;
		this.exhaust = new animatedSprite();
		this.exhaust.init(shipExhaustPic, 3, 3);

		this.baseCollisionRadius = SHIP_COLLISION_RADIUS;
		this.collisionRadius = this.baseCollisionRadius;
		this.mass = 10;

		this.thrustMultiplier = 1;
		this.thrustMultiplierDuration = 0;
		this.damageMultiplier = 1;
		this.damageMultiplierDuration = 0;

		this.cannon = new pulseCannonClass(CANNON_BASE_DAMAGE, CANNON_BASE_COOLDOWN, shotPic, SHOT_SPEED, SHOT_LIFE, SHOT_COLLISION_RADIUS, playerShots);
		this.shockwaveGenerator = new shockwaveGeneratorClass(SHOCKWAVE_BASE_DAMAGE, SHOCKWAVE_BASE_COOLDOWN, SHOCKWAVE_SPEED, SHOCKWAVE_RANGE, SHOCKWAVE_COLOUR, playerShockwaves);
		this.missileLauncher = new missileLauncherClass(MISSILE_BASE_DAMAGE, MISSILE_BASE_COOLDOWN, missilePic, MISSILE_THRUST, MISSILE_TURN_RATE, MISSILE_LIFE, MISSILE_COLLISION_RADIUS, playerMissiles);
		this.beamWeapon = new beamCannonClass(BEAMCANNON_BASE_DAMAGE, BEAMCANNON_BASE_COOLDOWN, BEAM_COLOUR, BEAM_RANGE, BEAM_LIFE, BEAM_WIDTH, playerBeams);

		this.weapons = [this.cannon, this.shockwaveGenerator, this.missileLauncher, this.beamWeapon];
		this.primaryWeapon = this.weapons[0];

		this.inventory = [];
		this.reset();
	}

	this.superclassReset = this.reset;

	this.reset = function() {
		this.superclassReset();

		this.maxhp = 100;
		this.hp = this.maxhp;
		this.shieldmaxhp = 50;
		this.shieldhp = 0;

		this.ang = -0.5 * Math.PI;
		totalScore = 0;
		hitComboReset = true;
		this.keyHeldFor = 0;
		this.exhaustSequence = [0, 1, 2];
		this.exhaust.setAnimationSequence(this.exhaustSequence, "reverse");
	} // end of reset

	this.superclassHandleDeath = this.handleDeath;

	this.handleDeath = function() {
		this.superclassHandleDeath();
	}

	this.superclassMove = this.move;

	this.move = function() {
		// only allow turning while it's moving
		if(this.keyHeld_TurnLeft) {
			this.ang -= TURN_RATE * Math.PI;
		}

		if(this.keyHeld_TurnRight) {
			this.ang += TURN_RATE * Math.PI;
		}

		if(this.keyHeld_Gas) {
			this.vX += Math.cos(this.ang) * THRUST_POWER * this.thrustMultiplier;
			this.vY += Math.sin(this.ang) * THRUST_POWER * this.thrustMultiplier;
			this.keyHeldFor++;
			if(this.keyHeldFor > 45) {
				this.keyHeldFor = 45;
			}
		} else if(this.keyHeld_Reverse) {
			this.vX -= Math.cos(this.ang) * THRUST_POWER * this.thrustMultiplier/2;
			this.vY -= Math.sin(this.ang) * THRUST_POWER * this.thrustMultiplier/2;
			this.keyHeldFor = 0;
		} else {
			this.keyHeldFor--;
			if(this.keyHeldFor < 0) {
				this.keyHeldFor = 0;
			}
		}

		if(this.keyHeldFor <= 5) {
			this.exhaustSequence = [0, 1, 2];
		} else if(this.keyHeldFor <= 30) {
			this.exhaustSequence = [3, 4, 5];
		} else {
			this.exhaustSequence = [6, 7, 8];
		}
		this.exhaust.setAnimationSequence(this.exhaustSequence, "reverse");

		this.superclassMove();
		this.decrementCooldowns();

		this.vX *= SPACESPEED_DECAY_MULT;
		this.vY *= SPACESPEED_DECAY_MULT;

		this.thrustMultiplierDuration--;
		if(this.thrustMultiplierDuration < 0) {
			this.thrustMultiplierDuration = 0;
			this.thrustMultiplier = 1;
		}
		this.damageMultiplierDuration--;
		if(this.damageMultiplierDuration < 0) {
			this.damageMultiplierDuration = 0;
			this.damageMultiplier = 1;
		}
		if(this.shieldhp <= 0) {
			this.collisionRadius = this.baseCollisionRadius;
		}
	}

	this.selectWeapon = function(weaponIndex) {
		this.primaryWeapon = this.weapons[weaponIndex];
	}

	this.fireSelectedWeapon = function() {
		if(this.primaryWeapon.cooldown == 0) {
			this.primaryWeapon.fire(this);
		}
	}

	this.decrementCooldowns = function() {
		for(var i = 0; i < this.weapons.length; i++) {
			this.weapons[i].cooldown--;
			if(this.weapons[i].cooldown < 0) {
				this.weapons[i].cooldown = 0;
			}
		}
	}

	this.detectCollisionWithEntity = function(otherEntity) {
		if(distanceBetween(this, otherEntity) <= this.collisionRadius + otherEntity.collisionRadius) {
			this.handleElasticObjectCollision(otherEntity);

			this.takeDamage(10);
			otherEntity.takeDamage(10);
		}
	}

	this.draw = function() {
		if(this.shieldhp > 0) {
			canvasContext.save();
			canvasContext.globalAlpha = 0.4;
			colourCircle(this.x, this.y, this.collisionRadius, 'cyan');
			canvasContext.restore();
		}
		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.ang);
		this.exhaust.tickAnimation();
		var offsetX = Math.cos(this.ang) * -32;
		var offsetY = Math.sin(this.ang) * -32;
		this.exhaust.draw(this.x + offsetX, this.y + offsetY, this.ang);
	}
} // end of class
