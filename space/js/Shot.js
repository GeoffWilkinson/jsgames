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
		this.maxhp = 1;
		this.hp = this.maxhp;

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

	this.shootFrom = function(shipFiring, shotSpeed, shotLife, shotDamage) {
		this.x = shipFiring.x;
		this.y = shipFiring.y;
		this.ang = shipFiring.ang;

		this.vX = Math.cos(shipFiring.ang) * shotSpeed + shipFiring.vX;
		this.vY = Math.sin(shipFiring.ang) * shotSpeed + shipFiring.vY;

		this.shotLife = shotLife;
		this.shotDamage = shotDamage;
	}

	this.detectCollisionWithEntity = function(otherEntity, givesScore) {
		if(distanceBetween(this, otherEntity) <= this.collisionRadius + otherEntity.collisionRadius) {
			otherEntity.hp -= this.shotDamage;

			var damageDone = new floatingTextClass();
			damageDone.init(this.shotDamage, otherEntity.x, otherEntity.y, 'red');
			allFloatingText.push(damageDone);

			if(otherEntity.hp <= 0) {
				otherEntity.hp = 0;
				if(givesScore) {
					awardScore(otherEntity);
				}
				otherEntity.isDead = true;
			}
			this.isDead = true;
		}
	}

	this.draw = function() {
		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.ang);
	}
} // end of class
