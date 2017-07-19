const WRECK_COLLISION_RADIUS = 16;

var allWrecks = [];

wreckClass.prototype = new movingWrapPositionClass();

function wreckClass() {
	this.superclassInit = this.init;

	this.init = function(whichGraphic, spawnedBy) {
		this.superclassInit();
		this.myBitmap = whichGraphic;
		this.idleRotationDegrees = 0;
		this.idleRotation = 0;

		this.x = spawnedBy.x;
		this.y = spawnedBy.y;

		this.vX = spawnedBy.vX/10;
		this.vY = spawnedBy.vY/10;

		this.collisionRadius = WRECK_COLLISION_RADIUS;
		this.maxhp = 5;
		this.hp = this.maxhp;
		this.mass = 4;
		this.isDead = false;
	}

	this.superclassMove = this.move;

	this.move = function() {
		this.superclassMove();

		this.idleRotationDegrees++;
		if(this.idleRotationDegrees > 360) {
			this.idleRotationDegrees = 1;
		}
		this.idleRotation = Math.PI * this.idleRotationDegrees / 180;
	}

	this.draw = function() {
		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.idleRotation);
	}
} // end of class

function spawnWreck(whichGraphic, spawnedBy) {
	newWreck = new wreckClass();
	newWreck.init(whichGraphic, spawnedBy);
	allWrecks.push(newWreck);
}