const MISSILE_THRUST = 6;
const MISSILE_TURN_RATE = 1;
const MISSILE_LIFE = 60;
const MISSILE_COLLISION_RADIUS = 2;

var playerMissiles = [];

missileClass.prototype = new movingWrapPositionClass();

function missileClass() {
	this.init = function(whichGraphic, collisionRadius) {
		this.myBitmap = whichGraphic;
		this.collisionRadius = collisionRadius;
		this.isDead = false;
	}

	this.superclassMove = this.move;

	this.move = function() {
		if(this.missileLife > 0) {
			this.missileLife--;
			this.vX += Math.cos(this.ang) * THRUST_POWER;
			this.vY += Math.sin(this.ang) * THRUST_POWER;
			this.pointAtTarget();
			this.superclassMove();
		} else {
			this.isDead = true;
		}
	}

	this.selectTarget = function(shipFiring) {
		if(shipFiring != p1) {
			this.target = p1;
		} else {
			var minDistance;
			for(var i = 0; i < allUFOs.length; i++) {
				var distance = distanceBetween(this, ullUFOs[i]);
				if(minDistance == undefined || distance < minDistance) {
					this.target = ullUFOs[i];
					minDistance = distance;
				}
			}
		}
	}

	this.pointAtTarget = function() {

	}

	this.shootFrom = function(shipFiring, shotSpeed, missileLife) {
		this.x = shipFiring.x;
		this.y = shipFiring.y;
		this.ang = shipFiring.ang;

		this.vX = Math.cos(shipFiring.ang) * shotSpeed + shipFiring.vX;
		this.vY = Math.sin(shipFiring.ang) * shotSpeed + shipFiring.vY;

		this.missileLife = missileLife;
		this.selectTarget(shipFiring);
	}

	this.detectCollisionWithEntity = function(otherEntity, givesScore) {
		if(distanceBetween(this, otherEntity) <= this.collisionRadius + otherEntity.collisionRadius) {
			if(givesScore) {
				awardScore(otherEntity);
			}
			otherEntity.isDead = true;
			this.isDead = true;
		}
	}

	this.draw = function() {
		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.ang);
	}
} // end of class
