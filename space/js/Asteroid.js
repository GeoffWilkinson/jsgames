const ASTEROID_SPEED = 1.2;
const MAX_ASTEROIDS_ON_SCREEN = 1;
const ASTEROID_COLLISION_RADIUS = 46;

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

		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;

		var randAng = Math.random() * Math.PI*2;
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

	this.draw = function() {
		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.idleRotation);
	}
} // end of class
