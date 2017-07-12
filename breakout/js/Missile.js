const MISSILE_TOP_SPEED = 10;
const MISSILE_ACCELERATION = 1;

var launchSound = new soundOverlapsClass("audio/missile_launch");
var explodeSound = new soundOverlapsClass("audio/explosion");

var missileClass = function() {
	this.x = 0;
	this.y = 0;
	this.speedY = 0;
	this.isDead = false;
	this.heldX = -PADDLE_WIDTH/2;
	this.isLaunched = false;
	this.isExploding = false;
	this.explosionTimer = 0;
	this.startDetonation = false;

	this.move = function() {
		if(this.isLaunched && this.speedY < MISSILE_TOP_SPEED) {
			this.accelerate();
		}
		this.y += this.speedY;

		this.tipCenterY = this.y - 10;

		this.tipCenterLeftX = this.x - 2;
		this.tipCenterLeftY = this.y - 8;

		this.tipCenterRightX = this.x + 2;
		this.tipCenterRightY = this.y - 8;

		if(this.isLaunched) {
			this.brickHandling();
		}
	}

	this.accelerate = function() {
		this.speedY -= MISSILE_ACCELERATION;
		if(this.speedY < -MISSILE_TOP_SPEED) {
			this.speedY = -MISSILE_TOP_SPEED;
		}
	}

	this.brickHandling = function() {
		var collisionPoints = [{x: this.x, y: this.tipCenterY},{x: this.tipCenterLeftX, y: this.tipCenterLeftY},{x: this.tipCenterRightX, y: this.tipCenterRightY}];
		for(var i = 0; i < collisionPoints.length; i++) {
			if(isBrickAtPixel(collisionPoints[i].x, collisionPoints[i].y + this.speedY)) {
				this.epicenterY = BRICK_HEIGHT * Math.floor(collisionPoints[i].y / BRICK_HEIGHT);
				this.epicenterX = this.x;
				this.isLaunched = false;
				this.isExploding = true;
				this.startDetonation = true;
				this.explosionTimer = 0;
				break;
			}
		}
	}

	this.detonation = function(epicenterX, epicenterY, effectFrame) {
		var arcX;
		var arcY;

		this.startDetonation = false;

		explodeSound.play();
		if(effectFrame >= 0 && effectFrame < 2) {
			//circle 1
			for(var i = 0; i < 16; i++) {
				arcX = Math.round(epicenterX + Math.cos(OFFSET + SEPARATION * (i + 2)) * 10);
				arcY = Math.round(epicenterY + Math.sin(OFFSET + SEPARATION * (i + 2)) * 10);
				if(isBrickAtPixel(arcX, arcY)) {
					degradeBrick(pixelToArrayIndex(arcX, arcY), true);
				}
			}
		} else if(effectFrame >= 2 && effectFrame < 4) {
			//circle 2
			for(var i = 0; i < 16; i++) {
				arcX = Math.round(epicenterX + Math.cos(OFFSET + SEPARATION * (i + 2)) * 18);
				arcY = Math.round(epicenterY + Math.sin(OFFSET + SEPARATION * (i + 2)) * 18);
				if(isBrickAtPixel(arcX, arcY)) {
					degradeBrick(pixelToArrayIndex(arcX, arcY), true);
				}
			}
		} else if(effectFrame >= 4 && effectFrame < 6) {
			//circle 3
			for(var i = 0; i < 16; i++) {
				arcX = Math.round(epicenterX + Math.cos(OFFSET + SEPARATION * (i + 2)) * 24);
				arcY = Math.round(epicenterY + Math.sin(OFFSET + SEPARATION * (i + 2)) * 24);
				if(isBrickAtPixel(arcX, arcY)) {
					degradeBrick(pixelToArrayIndex(arcX, arcY), true);
				}
			}
		} else if(effectFrame >= 6) {
			this.isExploding = false;
			deadMissilesToClear = true;
			this.isDead = true;
		}
	}

	this.drawExplosion = function(epicenterX, epicenterY, animationFrame) {
		if(animationFrame >= 0 && animationFrame < 3) {
			//circle 1
			colourCircle(epicenterX, epicenterY, 10, 'yellow');
			colourCircle(epicenterX, epicenterY, 8, 'orange');
			colourCircle(epicenterX, epicenterY, 4, 'red');
		} else if(animationFrame >= 3 && animationFrame < 6) {
			//circle 2
			colourCircle(epicenterX, epicenterY, 18, 'yellow');
			colourCircle(epicenterX, epicenterY, 14, 'orange');
			colourCircle(epicenterX, epicenterY, 6, 'red');
		} else if(animationFrame >= 6 && animationFrame < 9) {
			//circle 3
			colourCircle(epicenterX, epicenterY, 24, 'yellow');
			colourCircle(epicenterX, epicenterY, 18, 'orange');
			colourCircle(epicenterX, epicenterY, 10, 'red');
		}
	}

	this.draw = function() {
		drawBitmapCenteredAtLocation(missilePic, this.x, this.y);
		//colourRect(this.tipCenterLeftX, this.tipCenterY, 4, 20, 'white');
	}
}
