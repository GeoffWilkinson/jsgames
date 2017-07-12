// tuning constants
const SHOT_SPEED = 6.0;
const SHOT_LIFE = 60;
const SHOT_DISPLAY_RADIUS = 2.0;

shotClass.prototype = new movingWrapPositionClass();

function shotClass() {
	this.superclassReset = this.reset;

	this.reset = function() {
		this.superclassReset();
		this.shotLife = 0;
	} // end of reset

	this.superclassMove = this.move;

	this.move = function() {
		if(this.shotLife > 0) {
			this.shotLife--;
			this.superclassMove();
		} else {
			this.isDead = true;
		}
	}

	this.shootFrom = function(shipFiring) {
		this.x = shipFiring.x;
		this.y = shipFiring.y;

		this.vX = Math.cos(shipFiring.ang) * SHOT_SPEED + shipFiring.vX;
		this.vY = Math.sin(shipFiring.ang) * SHOT_SPEED + shipFiring.vY;

		this.shotLife = SHOT_LIFE;
	}

	this.hitTest = function(thisEnemy) {
		return thisEnemy.isOverlappingPoint(this.x,this.y);
	}

	this.draw = function() {
		colourCircle(this.x, this.y, SHOT_DISPLAY_RADIUS, 'white');
	}
} // end of class
