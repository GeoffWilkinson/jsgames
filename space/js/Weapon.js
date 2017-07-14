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