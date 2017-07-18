const SHOCKWAVE_SPEED = 10;
const SHOCKWAVE_RANGE = 120;
const SHOCKWAVE_COLOUR = 'cyan';

var playerShockwaves = [];

function shockwaveClass() {
	this.init = function(colour) {
		this.colour = colour;
		this.radius = 0;
		this.isDead = false;
	}

	this.move = function() {
		if(origin.isDead) {
			this.isDead = true;
		}

		this.x = this.origin.x;
		this.y = this.origin.y;

		if(this.radius < this.shockwaveRange) {
			this.radius += this.shockwaveSpeed;
		} else {
			this.isDead = true;
		}
	}

	this.shootFrom = function(shipFiring, shockwaveSpeed, shockwaveRange, shockwaveDamage) {
		this.origin = shipFiring
		this.x = this.origin.x;
		this.y = this.origin.y;
		this.shockwaveSpeed = shockwaveSpeed;

		this.shockwaveRange = shockwaveRange;
		this.shockwaveDamage = shockwaveDamage;
	}

	this.detectCollisionWithEntity = function(otherEntity, givesScore) {
		var distanceFromOrigin = distanceBetween(this, otherEntity);
		if(distanceFromOrigin <= this.radius + otherEntity.collisionRadius) {
			otherEntity.hp -= this.shockwaveDamage;

			var damageDone = new floatingTextClass();
			damageDone.init(this.shockwaveDamage, otherEntity.x, otherEntity.y, 'red');
			allFloatingText.push(damageDone);

			if(otherEntity.hp <= 0) {
				otherEntity.hp = 0;
				if(givesScore) {
					awardScore(otherEntity);
				}
				otherEntity.isDead = true;
			}
		}
	}

	this.draw = function() {
		canvasContext.save();
		for(var i = 0; i < 5; i++) {
			hollowCircle(this.x, this.y, Math.max(this.radius - (i * 3), 0), this.colour, 5);
			canvasContext.globalAlpha -= 0.2;
		}
		canvasContext.restore();
	}
} // end of class
