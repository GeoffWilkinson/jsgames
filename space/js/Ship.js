// tuning constants
const SPACESPEED_DECAY_MULT = 0.99;
const THRUST_POWER = 0.15;
const TURN_RATE = 0.03;
const CANNON_BASE_COOLDOWN = 10;

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
		this.reset();
	}

	this.superclassReset = this.reset;

	this.reset = function() {
		this.superclassReset();
		this.ang = -0.5 * Math.PI;
		this.cannonCooldown = 0;
		this.myShots = [];
	} // end of reset

	this.superclassMove = this.move;

	this.move = function() {
		// only allow turning while it's moving
		if(this.keyHeld_TurnLeft) {
			this.ang -= TURN_RATE*Math.PI;
		}

		if(this.keyHeld_TurnRight) {
			this.ang += TURN_RATE*Math.PI;
		}

		if(this.keyHeld_Gas) {
			this.xv += Math.cos(this.ang) * THRUST_POWER;
			this.yv += Math.sin(this.ang) * THRUST_POWER;
		}

		this.superclassMove();
		this.decrementCooldowns();

		this.xv *= SPACESPEED_DECAY_MULT;
		this.yv *= SPACESPEED_DECAY_MULT;

		for(var i = 0; i < this.myShots.length; i++) {
			this.myShots[i].move();
		}
	}

	this.cannonFire = function() {
		if(this.cannonCooldown == 0) {
			var newShot = new shotClass();
			newShot.shootFrom(this);
			this.myShots.push(newShot);
			this.cannonCooldown = CANNON_BASE_COOLDOWN;
		}
	}

	this.decrementCooldowns = function() {
		if(this.cannonCooldown > 0) {
			this.cannonCooldown--;
		}
	}

	this.checkMyShipAndShotCollisionAgainst = function(thisEnemy) {
		if(thisEnemy.isOverlappingPoint(this.x,this.y)) {
			this.reset();
			document.getElementById("debugText").innerHTML = "Player Crashed!";
		}
		for(var i = this.myShots.length - 1; i >= 0; i--) {
			if(this.myShots[i].hitTest(thisEnemy)) {
				thisEnemy.reset();
				this.myShots.splice(i, 1);
				document.getElementById("debugText").innerHTML = "Enemy Blasted!";
			}
		}
	}

	this.draw = function() {
		for(var i = 0; i < this.myShots.length; i++) {
			this.myShots[i].draw();
		}
		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.ang);
	}
} // end of class
