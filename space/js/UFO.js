const UFO_SPEED = 1.9;
const UFO_TIME_BETWEEN_CHANGE_DIR = 85;
const UFO_COLLISION_RADIUS = 16;
const UFO_INACCURACY_DEGREES = 10;

var allUFOs = [];

const UFO_CANNON_BASE_COOLDOWN = 90;
const UFO_CANNON_BASE_DAMAGE = 10;

UFOClass.prototype = new movingWrapPositionClass();

function UFOClass() {
	this.superclassInit = this.init;

	this.init = function(whichImage) {
		this.superclassInit();
		this.myBitmap = whichImage;
		this.idleRotationDegrees = 0;
		this.idleRotation = 0;

		this.collisionRadius = UFO_COLLISION_RADIUS;
		this.maxhp = 20;
		this.hp = this.maxhp;
		this.mass = 8;

		this.ang = -0.5 * Math.PI;
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		this.vX = 0;
		this.vY = 0;
		this.cyclesTilDirectionChange = 0;

		this.cannonCooldown = 0;

		this.cannon = new pulseCannonClass(UFO_CANNON_BASE_DAMAGE, UFO_CANNON_BASE_COOLDOWN, UFOShotPic, SHOT_SPEED, SHOT_LIFE, SHOT_COLLISION_RADIUS, enemyShots);

		this.isDead = false;
	}

	this.superclassMove = this.move;

	this.move = function() {
		this.superclassMove();
		this.decrementCooldowns();

		this.cyclesTilDirectionChange--;
		if(this.cyclesTilDirectionChange < 0) {
			var randAng = Math.random() * Math.PI * 2;
			this.ang = randAng;
			this.vX = Math.cos(this.ang) * UFO_SPEED;
			this.vY = Math.sin(this.ang) * UFO_SPEED;
			this.cyclesTilDirectionChange = UFO_TIME_BETWEEN_CHANGE_DIR;
		}

		this.idleRotationDegrees++;
		if(this.idleRotationDegrees > 360) {
			this.idleRotationDegrees = 1;
		}
		this.idleRotation = Math.PI * this.idleRotationDegrees / 180;

		this.aimAt(p1);
		this.fireCannon();
	}

	this.aimAt = function(otherEntity) {
		var inaccuracy = (UFO_INACCURACY_DEGREES * Math.PI/180) * (Math.random() - 0.5);
		this.ang = Math.atan2(otherEntity.y - this.y, otherEntity.x - this.x);
	}

	this.fireCannon = function() {
		if(this.cannon.cooldown == 0) {
			this.cannon.fire(this);
		}
	}

	this.decrementCooldowns = function() {
		this.cannon.cooldown--;
		if(this.cannon.cooldown < 0) {
			this.cannon.cooldown = 0;
		}
	}

	this.draw = function() {
		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.idleRotation);
	}
} // end of class
