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
		if(this.radius < this.range) {
			this.radius += this.speed;
		} else {
			this.isDead = true;
		}
	}

	this.shootFrom = function(shipFiring, shockwaveSpeed, shockwaveRange) {
		this.x = shipFiring.x;
		this.y = shipFiring.y;
		this.speed = shockwaveSpeed;

		this.range = shockwaveRange;
	}

	this.detectCollisionWithEntity = function(otherEntity) {
		var distanceFromOrigin = distanceBetween(this, otherEntity);
		if(distanceFromOrigin <= this.radius + otherEntity.collisionRadius && distanceFromOrigin >= this.radius + otherEntity.collisionRadius - this.speed) {
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
