const UFO_SPEED = 1.9;
const UFO_TIME_BETWEEN_CHANGE_DIR = 85;
const UFO_COLLISION_RADIUS = 16;

UFOClass.prototype = new movingWrapPositionClass();

function UFOClass() {
	this.init = function(whichGraphic) {
		this.myBitmap = whichGraphic;
		this.idleRotationDegrees = 0;
		this.idleRotation = 0;
		this.collisionRadius = UFO_COLLISION_RADIUS;
		this.reset();
	}

	this.superclassReset = this.reset;

	this.reset = function() {
		this.superclassReset();
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		this.cyclesTilDirectionChange = 0;

		this.cannonCooldown = 0;
		this.myShots = [];
	} // end of reset

	this.superclassMove = this.move;

	this.move = function() {
		this.superclassMove();
		this.decrementCooldowns();

		this.cyclesTilDirectionChange--;
		if(this.cyclesTilDirectionChange < 0) {
			var randAng = Math.random() * Math.PI * 2;
			this.vX = Math.cos(randAng) * UFO_SPEED;
			this.vY = Math.sin(randAng) * UFO_SPEED;
			this.cyclesTilDirectionChange = UFO_TIME_BETWEEN_CHANGE_DIR;
		}

		this.idleRotationDegrees++;
		if(this.idleRotationDegrees > 360) {
			this.idleRotationDegrees = 1;
		}
		this.idleRotation = Math.PI * this.idleRotationDegrees / 180;

		this.moveMyObjects(this.myShots);
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

	this.checkMyShotCollisionAgainst = function(otherEntity) {
		for(var i = this.myShots.length - 1; i >= 0; i--) {
			if(this.myShots[i].isOverlappingPoint(otherEntity)) {
				otherEntity.reset();
				this.myShots.splice(i, 1);
				document.getElementById("debugText").innerHTML = "Player Blasted!";
			}
		}
	}

	this.removeMyDeadObjects = function() {
		removeDeadObjects(this.myShots);
		removeDeadObjects(this.myFloatingTexts);
	}

	this.draw = function() {
		this.drawMyObjects(this.myShots);
		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.idleRotation);
	}
} // end of class
