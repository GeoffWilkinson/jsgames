const WRECK_COLLISION_RADIUS = 16;

var allWrecks = [];

wreckClass.prototype = new movingWrapPositionClass();

function wreckClass() {
	this.superclassInit = this.init;

	this.init = function(whichImage, spawnedBy) {
		this.superclassInit();
		this.myBitmap = whichImage;
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

		this.inventory = spawnInventory();
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

	this.pickup = function(finder) {
		for(var i = 0; i < this.inventory.length; i++) {
			finder.inventory.push(this.inventory[i]);
		}
		this.inventory = [];
		this.isDead = true;
	}

	this.detectCollisionWithEntity = function(otherEntity) {
		if(distanceBetween(this, otherEntity) <= this.collisionRadius + otherEntity.collisionRadius) {
			this.pickup(otherEntity);
			document.getElementById("debugText").innerHTML = readInventory(p1.inventory);
		}
	}

	this.draw = function() {
		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.idleRotation);
	}
} // end of class

function spawnWreck(whichImage, spawnedBy) {
	newWreck = new wreckClass();
	newWreck.init(whichImage, spawnedBy);
	allWrecks.push(newWreck);
}