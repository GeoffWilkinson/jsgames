function cannonClass(damage, cooldown, ammoImage, ammoSpeed, ammoLife, ammoCollisionRadius) {
	this.damage = damage;
	this.cooldown = 0;
	this.baseCooldown = cooldown;

	this.ammoImage = ammoImage;
	this.ammoSpeed = ammoSpeed;
	this.ammoLife = ammoLife;
	this.ammoCollisionRadius = ammoCollisionRadius;

	this.fire = function(fromThis, shotGroup) {
		var newShot = new shotClass();
		newShot.init(this.ammoImage, this.ammoCollisionRadius);
		newShot.shootFrom(fromThis, this.ammoSpeed, this.ammoLife);
		shotGroup.push(newShot);
		this.cooldown = this.baseCooldown;
	}
}

function shockwaveGeneratorClass(damage, cooldown, speed, range, colour) {
	this.damage = damage;
	this.cooldown = 0;
	this.baseCooldown = cooldown;

	this.colour = colour;
	this.speed = speed;
	this.range = range;

	this.fire = function(fromThis, shockwaveGroup) {
		var newShockwave = new shockwaveClass();
		newShockwave.init(this.colour);
		newShockwave.shootFrom(fromThis, this.speed, this.range);
		shockwaveGroup.push(newShockwave);
		this.cooldown = this.baseCooldown;
	}
}
