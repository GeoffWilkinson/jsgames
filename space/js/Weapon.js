function cannonClass(damage, cooldown, ammoImage, ammoSpeed, ammoLife, ammoCollisionRadius, shotGroup) {
	this.damage = damage;
	this.cooldown = 0;
	this.baseCooldown = cooldown;

	this.ammoImage = ammoImage;
	this.ammoSpeed = ammoSpeed;
	this.ammoLife = ammoLife;
	this.ammoCollisionRadius = ammoCollisionRadius;

	this.shotGroup = shotGroup;

	this.fire = function(fromThis) {
		var newShot = new shotClass();
		newShot.init(this.ammoImage, this.ammoCollisionRadius);
		newShot.shootFrom(fromThis, this.ammoSpeed, this.ammoLife);
		this.shotGroup.push(newShot);
		this.cooldown = this.baseCooldown;
	}
}

function shockwaveGeneratorClass(damage, cooldown, speed, range, colour, shockwaveGroup) {
	this.damage = damage;
	this.cooldown = 0;
	this.baseCooldown = cooldown;

	this.colour = colour;
	this.speed = speed;
	this.range = range;

	this.shockwaveGroup = shockwaveGroup;

	this.fire = function(fromThis) {
		var newShockwave = new shockwaveClass();
		newShockwave.init(this.colour);
		newShockwave.shootFrom(fromThis, this.speed, this.range);
		this.shockwaveGroup.push(newShockwave);
		this.cooldown = this.baseCooldown;
	}
}
