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
		this.myFloatingTexts = [];
		this.exhaust = new animatedSprite();
		this.exhaust.init(shipExhaustPic, 3, 3);
		this.reset();
	}

	this.superclassReset = this.reset;

	this.reset = function() {
		this.superclassReset();
		this.ang = -0.5 * Math.PI;
		this.cannonCooldown = 0;
		this.myShots = [];
		totalScore = 0;
		this.exhaust.setAnimationSequence([0,1,2], "reverse");
	} // end of reset

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
		}

		this.superclassMove();
		this.decrementCooldowns();

		this.vX *= SPACESPEED_DECAY_MULT;
		this.vY *= SPACESPEED_DECAY_MULT;

		this.moveMyObjects(this.myShots);
		this.moveMyObjects(this.myFloatingTexts);
	}

	this.cannonFire = function() {
		// Since I spawn new objects by shooting, I will remove old ones here too.
		this.removeMyDeadObjects();
		if(this.cannonCooldown == 0) {
			var newShot = new shotClass();
			newShot.init(shotPic);
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
				var scoreGained = calculateHitScore();
				addScoreToTotal(scoreGained);

				var hitScore = new floatingTextClass();
				hitScore.init(scoreGained, thisEnemy.x, thisEnemy.y, 'yellow');
				this.myFloatingTexts.push(hitScore);

				var combo = new floatingTextClass();
				combo.init(hitCombo + "x combo", this.x, this.y, 'yellow');
				this.myFloatingTexts.push(combo);

				thisEnemy.reset();
				this.myShots.splice(i, 1);
				document.getElementById("debugText").innerHTML = "Enemy Blasted!";
			}
		}
	}

	this.removeMyDeadObjects = function() {
		removeDeadObjects(this.myShots);
		removeDeadObjects(this.myFloatingTexts);
	}

	this.moveMyObjects = function(myArray) {
		for(var i = 0; i < myArray.length; i++) {
			if(!myArray[i].isDead) {
				myArray[i].move();
			}
		}
	}

	this.drawMyObjects = function(myArray) {
		for(var i = 0; i < myArray.length; i++) {
			if(!myArray[i].isDead) {
				myArray[i].draw();
			}
		}
	}

	this.draw = function() {
		this.drawMyObjects(this.myShots);
		this.drawMyObjects(this.myFloatingTexts);
		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.ang);
		this.exhaust.tickAnimation();
		var offsetX = Math.cos(this.ang) * (-32);
		var offsetY = Math.sin(this.ang) * (-32);
		this.exhaust.draw(this.x + offsetX, this.y + offsetY, this.ang);
	}
} // end of class
