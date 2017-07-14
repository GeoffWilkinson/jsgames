const SHOT_SPEED = 6;
const SHOT_LIFE = 60;
const SHOT_COLLISION_RADIUS = 2;

const FRAGMENT_SPEED = 2;
const FRAGMENT_LIFE = 45;
const FRAGMENT_COLLISION_RADIUS = 4;

var playerShots = [];
var enemyShots = [];
var asteroidFragments = [];

shotClass.prototype = new movingWrapPositionClass();

function shotClass() {
	this.init = function(whichGraphic, collisionRadius) {
		this.myBitmap = whichGraphic;
		this.collisionRadius = collisionRadius;
		this.isDead = false;
	}

	this.superclassMove = this.move;

	this.move = function() {
		if(this.shotLife > 0) {
			this.shotLife--;
			this.superclassMove();
		} else {
			this.isDead = true;
		}
	}

	this.shootFrom = function(shipFiring, shotSpeed, shotLife) {
		this.x = shipFiring.x;
		this.y = shipFiring.y;
		this.ang = shipFiring.ang;

		this.vX = Math.cos(shipFiring.ang) * shotSpeed + shipFiring.vX;
		this.vY = Math.sin(shipFiring.ang) * shotSpeed + shipFiring.vY;

		this.shotLife = shotLife;
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
