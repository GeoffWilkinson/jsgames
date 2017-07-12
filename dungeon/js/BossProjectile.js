const SWORD_TRAIL_LENGTH = 5;

function bossProjectileClass() {
	this.x;
	this.y;
	this.vX;
	this.vY;
	this.facing;
	this.length;
	this.width;
	this.hurtboxes = [];
	this.isDead;
	this.damage;
	this.opacity;
	this.opaque;
	this.angularDistance;
	this.trail = [];

	this.setFlameWallComponent = function(originX, originY, angleFromOrigin, angularVelocity, radialIndex, separation, hurtboxConfig, damage) {
		this.x = originX + radialIndex * separation * Math.cos(angleFromOrigin);
		this.y = originY + radialIndex * separation * Math.cos(angleFromOrigin);
		this.damage = damage;
		var boxConfig = hurtboxConfig;
		var box = new hurtboxClass(boxConfig);
		this.hurtboxes = [box];
		this.radialIndex = radialIndex;
		this.separation = separation;
		this.angularVelocity = angularVelocity;
		this.angleFromOrigin = angleFromOrigin;

		this.opacity = 0;
		this.opaque = false;
		this.isDead = false;
	}

	this.setSword = function(originX, originY, angleFromOrigin, angularVelocity, radialIndex, separation, hurtboxConfig, damage) {
		this.x = originX + radialIndex * separation * Math.cos(angleFromOrigin);
		this.y = originY + radialIndex * separation * Math.cos(angleFromOrigin);

		this.damage = damage;
		for(var i = 0; i < 2; i ++) {
			var boxConfig = hurtboxConfig;
			boxConfig.offsetY = -i * 24;
			var box = new hurtboxClass(boxConfig);
			this.hurtboxes.push(box);
		}

		this.radialIndex = radialIndex;
		this.separation = separation;
		this.angularVelocity = angularVelocity;
		this.angleFromOrigin = angleFromOrigin;
		this.angularDistance = 0;

		this.facing = angleFromOrigin + Math.PI/2;

		this.opacity = 0;
		this.opaque = false;
		this.isDead = false;

		this.trail = [];
		for(i = 0; i < SWORD_TRAIL_LENGTH; i++) {
			this.trail.push({x: this.x, y: this.y, angle: this.facing});
		}
	}

	this.updateSword = function(originX, originY) {
		this.x = originX + this.radialIndex * this.separation * Math.cos(this.angleFromOrigin);
		this.y = originY + this.radialIndex * this.separation * Math.sin(this.angleFromOrigin);

		if(this.opacity > 1) {
			this.opacity = 1;
		} else {
			this.opacity += 24/MAX_BOSS_COUNTER;
		}

		if(this.opacity == 1) {
			this.opaque = true;
			this.facing += this.angularVelocity;
			this.angleFromOrigin += this.angularVelocity;
			this.angularDistance += this.angularVelocity;
		} else {
			this.opaque = false;
		}

		if(Math.abs(this.angularDistance) > Math.PI*2) {
			this.isDead = true;
		}

		for(var i = this.hurtboxes.length - 1; i >= 0; i--) {
			this.hurtboxes[i].update(true, this);
			this.handlePlayerCollision();
		}

		this.trail.pop();
		this.trail.unshift({x: this.x, y: this.y, angle: this.facing});
	}

	this.updateFlameWall = function(originX, originY, opacity) {
		this.angleFromOrigin += this.angularVelocity;
		this.x = originX + this.radialIndex * this.separation * Math.cos(this.angleFromOrigin);
		this.y = originY + this.radialIndex * this.separation * Math.sin(this.angleFromOrigin);

		this.opacity = opacity;

		if(opacity == 1) {
			this.opaque = true;
		} else {
			this.opaque = false;
		}

		for(var i = this.hurtboxes.length - 1; i >= 0; i--) {
			this.hurtboxes[i].update(true, this);
			this.handlePlayerCollision();
		}
	}

	this.handlePlayerCollision = function() {
		for(var i = 0; i < this.hurtboxes.length; i++) {
			if(distanceBetween(this.hurtboxes[i], playerWarrior) < this.hurtboxes[i].radius + playerWarrior.entityCollisionRadius && playerWarrior.invincibilityFrames == 0 && this.opaque) {
				playerWarrior.damaged(this.damage);
			}
		}
	}

	this.draw = function(whichImage, rotates, opacity) {
		var rotation;
		if(rotates) {
			rotation = this.facing;
		} else {
			rotation = 0;
		}
		canvasContext.globalAlpha = opacity;
		drawBitmapCenteredWithRotation(whichImage, this.x, this.y, rotation);
		canvasContext.globalAlpha = 1;
		//this.drawHurtboxes();
	}

	this.drawHurtboxes = function() {
		// Hilariously, these boxes are circles
		for(var i = 0; i < this.hurtboxes.length; i++) {
			var box = this.hurtboxes[i];
			canvasContext.globalAlpha = 0.5;
			colourCircle(this.hurtboxes[i].x, this.hurtboxes[i].y, this.hurtboxes[i].radius, 'red');
			canvasContext.globalAlpha = 1;
		}
	}
}