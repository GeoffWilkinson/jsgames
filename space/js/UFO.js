const UFO_SPEED = 1.9;
const UFO_TIME_BETWEEN_CHANGE_DIR = 85;
const UFO_COLLISION_RADIUS = 16;
const UFO_CANNON_BASE_COOLDOWN = 45;

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
		this.ang = -0.5 * Math.PI;
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		this.cyclesTilDirectionChange = 0;

		this.cannonCooldown = 0;
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

		this.aimAt(p1);
		this.cannonFire();
	}

	this.aimAt = function(otherEntity) {
		var inaccuracy = (5 * Math.PI/180) * (Math.random() - 0.5);
		this.ang = Math.atan2(otherEntity.y - this.y, otherEntity.x - this.x);
	}

	this.cannonFire = function() {
		if(this.cannonCooldown == 0) {
			var newShot = new shotClass();
			newShot.init(shotPic);
			newShot.shootFrom(this);
			enemyShots.push(newShot);
			this.cannonCooldown = UFO_CANNON_BASE_COOLDOWN;
		}
	}

	this.decrementCooldowns = function() {
		if(this.cannonCooldown > 0) {
			this.cannonCooldown--;
		}
	}

	this.draw = function() {
		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.idleRotation);
	}
} // end of class
