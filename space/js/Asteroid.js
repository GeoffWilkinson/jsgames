const ASTEROID_COLLISION_RADIUS = 46;
const ASTEROID_SPEED = 1.2;
const FRAGMENTATION_AMOUNT = 8;

const NUM_ASTEROIDS = 2;
var allAsteroids = [];

asteroidClass.prototype = new movingWrapPositionClass();

function asteroidClass() {
	this.init = function(whichGraphic) {
		this.myBitmap = whichGraphic;
		this.idleRotationDegrees = 0;
		this.idleRotation = 0;
		this.collisionRadius = ASTEROID_COLLISION_RADIUS;
		this.reset();
	}

	this.superclassReset = this.reset;

	this.reset = function() {
		this.superclassReset();
		this.ang = -0.5 * Math.PI;

		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;

		var randAng = Math.random() * Math.PI * 2;
		this.vX = Math.cos(randAng) * ASTEROID_SPEED;
		this.vY = Math.sin(randAng) * ASTEROID_SPEED;
	} // end of reset

	this.superclassHandleDeath = this.handleDeath;

	this.handleDeath = function() {
		this.fragment();
		this.superclassHandleDeath();
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

	this.fragment = function() {
		var origX = this.x;
		var origY = this.y;
		for(var i = 0; i < FRAGMENTATION_AMOUNT; i++) {
			// Change the spawn point a bit
			this.x += (ASTEROID_COLLISION_RADIUS/2) * (Math.random() - 0.5);
			this.y += (ASTEROID_COLLISION_RADIUS/2) * (Math.random() - 0.5);
			// Change the spawn angle so we end up fragmenting evenly
			this.ang += 2 * Math.PI / FRAGMENTATION_AMOUNT;
			var newShot = new shotClass();
			newShot.init(rockFragmentPic, FRAGMENT_COLLISION_RADIUS);
			newShot.shootFrom(this, FRAGMENT_SPEED, FRAGMENT_LIFE);
			asteroidFragments.push(newShot);
			// reset the centre of the asteroid so we draw it properly
			this.x = origX;
			this.y = origY;
		}
	}

	this.draw = function() {
		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.idleRotation);
	}
} // end of class
