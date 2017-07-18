const MISSILE_INITIAL_SPEED = 5;
const MISSILE_THRUST = 0.15;
const MISSILE_TURN_RATE = 0.03;
const MISSILE_LIFE = 120;
const MISSILE_COLLISION_RADIUS = 3;

var playerMissiles = [];

missileClass.prototype = new movingWrapPositionClass();

function missileClass() {
	this.init = function(whichGraphic, collisionRadius) {
		this.myBitmap = whichGraphic;
		this.collisionRadius = collisionRadius;
		this.isDead = false;
		this.exhaust = new animatedSprite();
		this.exhaust.init(missileExhaustPic, 3, 1);
		this.exhaustSequence = [0, 1, 2];
		this.exhaust.setAnimationSequence(this.exhaustSequence, "reverse");
	}

	this.superclassMove = this.move;

	this.move = function() {
		if(this.missileLife > 0) {
			this.missileLife--;
			this.vX += Math.cos(this.ang) * this.thrust;
			this.vY += Math.sin(this.ang) * this.thrust;
			if(this.target != undefined) {
				this.pointAtTarget();
			}
			this.superclassMove();

			this.vX *= SPACESPEED_DECAY_MULT;
			this.vY *= SPACESPEED_DECAY_MULT;
		} else {
			this.isDead = true;
		}
	}

	this.selectTarget = function(shipFiring) {
		this.target = undefined;
		if(shipFiring != p1) {
			var missileFacingVector = {x: Math.cos(this.ang), y: Math.sin(this.ang)};
			var vectorToTarget = {x: p1.x - this.x, y: p1.y - this.y};
			var angleToFaceTarget = Math.atan2(missileFacingVector.x * vectorToTarget.y - missileFacingVector.y * vectorToTarget.x, missileFacingVector.x * vectorToTarget.x + missileFacingVector.y * vectorToTarget.y);
			if(angleToFaceTarget >= -Math.PI/3 && angleToFaceTarget <= Math.PI/3) {
				this.target = p1;
			}
		} else {
			var minDistance;
			for(var i = 0; i < allUFOs.length; i++) {
				var missileFacingVector = {x: Math.cos(this.ang), y: Math.sin(this.ang)};
				var vectorToTarget = {x: allUFOs[i].x - this.x, y: allUFOs[i].y - this.y};
				var angleToFaceTarget = Math.atan2(missileFacingVector.x * vectorToTarget.y - missileFacingVector.y * vectorToTarget.x, missileFacingVector.x * vectorToTarget.x + missileFacingVector.y * vectorToTarget.y);

				if(angleToFaceTarget >= -Math.PI/3 && angleToFaceTarget <= Math.PI/3) {
					var distance = distanceBetween(this, allUFOs[i]);
					if(minDistance == undefined || distance < minDistance) {
						this.target = allUFOs[i];
						minDistance = distance;
					}
				}
			}
		}
	}

	this.pointAtTarget = function() {
		var missileFacingVector = {x: Math.cos(this.ang), y: Math.sin(this.ang)};
		var missileVector = {x: this.vX, y: this.vY};
		var vectorToTarget = {x: this.target.x - this.x, y: this.target.y - this.y};
		var angleToTarget = Math.atan2(missileVector.x * vectorToTarget.y - missileVector.y * vectorToTarget.x, missileVector.x * vectorToTarget.x + missileVector.y * vectorToTarget.y);
		var angleToFaceTarget = Math.atan2(missileFacingVector.x * vectorToTarget.y - missileFacingVector.y * vectorToTarget.x, missileFacingVector.x * vectorToTarget.x + missileFacingVector.y * vectorToTarget.y);
		if(angleToTarget < -Math.PI/64 && angleToFaceTarget >= -Math.PI/2) {
			this.ang -= this.turnRate * Math.PI;
		} else if(angleToTarget > Math.PI/64 && angleToFaceTarget <= Math.PI/2) {
			this.ang += this.turnRate * Math.PI;
		}
	}

	this.shootFrom = function(shipFiring, missileThrust, missileTurnRate, missileLife, missileDamage) {
		this.x = shipFiring.x;
		this.y = shipFiring.y;

		this.thrust = missileThrust;
		this.turnRate = missileTurnRate;
		this.ang = shipFiring.ang;

		this.vX = Math.cos(this.ang);
		this.vY = Math.sin(this.ang);

		this.missileLife = missileLife;
		this.missileDamage = missileDamage;
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
		this.exhaust.tickAnimation();
		var offsetX = Math.cos(this.ang) * -8;
		var offsetY = Math.sin(this.ang) * -8;
		this.exhaust.draw(this.x + offsetX, this.y + offsetY, this.ang);
	}
} // end of class
