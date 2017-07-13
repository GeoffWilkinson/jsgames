const SHOT_SPEED = 6;
const SHOT_LIFE = 60;
const SHOT_COLLISION_RADIUS = 2;

var playerShots = [];
var enemyShots = [];

shotClass.prototype = new movingWrapPositionClass();

function shotClass() {
	this.init = function(whichGraphic) {
		this.myBitmap = whichGraphic;
		this.collisionRadius = SHOT_COLLISION_RADIUS;
		this.isDead = false;
		this.reset();
	}

	this.superclassReset = this.reset;

	this.reset = function() {
		this.superclassReset();
		this.shotLife = 0;
		this.ang = 0;
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
		this.ang = shipFiring.ang;

		this.vX = Math.cos(shipFiring.ang) * SHOT_SPEED + shipFiring.vX;
		this.vY = Math.sin(shipFiring.ang) * SHOT_SPEED + shipFiring.vY;

		this.shotLife = SHOT_LIFE;
	}

	this.isOverlappingPoint = function(entity) {
		var distX = Math.abs(this.x - entity.x);
		var distY = Math.abs(this.y - entity.y);
		var dist = Math.sqrt(distX * distX + distY * distY);
		return (dist <= this.collisionRadius + entity.collisionRadius);
	}

	this.detectCollisionWithEntity = function(otherEntity) {
		if(this.isOverlappingPoint(otherEntity)) {
			// If anything is hit by a shot that is non player then it must have been because of the player:
			// Asteroids can only be shot by the player.
			// Enemies can be shot by the player.
			// Enemies can be hit by rock fragments as the result of an asteroid being shot by the player.
			if(otherEntity != p1) {
				var scoreGained = calculateHitScore();
				addScoreToTotal(scoreGained);

				var hitScore = new floatingTextClass();
				hitScore.init(scoreGained, otherEntity.x, otherEntity.y, 'yellow');
				allFloatingText.push(hitScore);

				var combo = new floatingTextClass();
				combo.init(hitCombo + "x combo", p1.x, p1.y, 'yellow');
				allFloatingText.push(combo);
			}
			otherEntity.isDead = true;
			this.isDead = true;
		}
	}

	this.draw = function() {
		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.ang);
	}
} // end of class
