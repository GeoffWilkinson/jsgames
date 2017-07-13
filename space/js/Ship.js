// tuning constants
const SPACESPEED_DECAY_MULT = 0.99;
const THRUST_POWER = 0.15;
const TURN_RATE = 0.03;
const CANNON_BASE_COOLDOWN = 10;
const SHIP_COLLISION_RADIUS = 20;

shipClass.prototype = new movingWrapPositionClass(); 

function shipClass() {
	// keyboard hold state variables, to use keys more like buttons
	this.keyHeld_Gas = false;
	this.keyHeld_Reverse = false;
	this.keyHeld_TurnLeft = false;
	this.keyHeld_TurnRight = false;

	// key controls used for this 
	this.setupControls = function(forwardKey, backKey, leftKey, rightKey, spaceBar) {
		this.controlKeyForGas = forwardKey;
		this.controlKeyForReverse = backKey;
		this.controlKeyForTurnLeft = leftKey;
		this.controlKeyForTurnRight = rightKey;
		this.shotKey = spaceBar;
	}

	this.init = function(whichGraphic) {
		this.myBitmap = whichGraphic;
		this.exhaust = new animatedSprite();
		this.exhaust.init(shipExhaustPic, 3, 3);
		this.collisionRadius = SHIP_COLLISION_RADIUS;
		this.reset();
	}

	this.superclassReset = this.reset;

	this.reset = function() {
		this.superclassReset();
		this.ang = -0.5 * Math.PI;
		this.cannonCooldown = 0;
		totalScore = 0;
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
			this.vX += Math.cos(this.ang) * THRUST_POWER;
			this.vY += Math.sin(this.ang) * THRUST_POWER;
			this.keyHeldFor++;
			if(this.keyHeldFor > 45) {
				this.keyHeldFor = 45;
			}
		} else if(this.keyHeld_Reverse) {
			this.vX -= Math.cos(this.ang) * THRUST_POWER/2;
			this.vY -= Math.sin(this.ang) * THRUST_POWER/2;
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
	}

	this.cannonFire = function() {
		if(this.cannonCooldown == 0) {
			var newShot = new shotClass();
			newShot.init(shotPic, SHOT_COLLISION_RADIUS);
			newShot.shootFrom(this, SHOT_SPEED);
			playerShots.push(newShot);
			this.cannonCooldown = CANNON_BASE_COOLDOWN;
		}
	}

	this.decrementCooldowns = function() {
		if(this.cannonCooldown > 0) {
			this.cannonCooldown--;
		}
	}

	this.isOverlappingPoint = function(entity) {
		var distX = Math.abs(this.x - entity.x);
		var distY = Math.abs(this.y - entity.y);
		var dist = Math.sqrt(distX * distX + distY * distY);
		return (dist <= this.collisionRadius + entity.collisionRadius);
	}

	this.checkCollisionWithEntity = function(otherEntity) {
		if(this.isOverlappingPoint(otherEntity)) {
			this.isDead = true;
			document.getElementById("debugText").innerHTML = "Player Crashed!";
		}
	}

	this.draw = function() {
		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.ang);
		this.exhaust.tickAnimation();
		var offsetX = Math.cos(this.ang) * (-32);
		var offsetY = Math.sin(this.ang) * (-32);
		this.exhaust.draw(this.x + offsetX, this.y + offsetY, this.ang);
	}
} // end of class
