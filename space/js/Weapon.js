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

function shockwaveGeneratorClass(damage, cooldown, waveSpeed, waveRange, waveColour, shockwaveGroup) {
	this.damage = damage;
	this.cooldown = 0;
	this.baseCooldown = cooldown;

	this.colour = waveColour;
	this.speed = waveSpeed;
	this.range = waveRange;

	this.shockwaveGroup = shockwaveGroup;

	this.fire = function(fromThis) {
		var newShockwave = new shockwaveClass();
		newShockwave.init(this.colour);
		newShockwave.shootFrom(fromThis, this.speed, this.range);
		this.shockwaveGroup.push(newShockwave);
		this.cooldown = this.baseCooldown;
	}
}


function missileLauncherClass(damage, cooldown, ammoImage, ammoSpeed, ammoTurnRate, ammoLife, ammoCollisionRadius, missileGroup) {
	this.damage = damage;
	this.cooldown = 0;
	this.baseCooldown = cooldown;

	this.ammoImage = ammoImage;
	this.ammoSpeed = ammoSpeed;
	this.ammoTurnRate = ammoTurnRate;
	this.ammoLife = ammoLife;
	this.ammoCollisionRadius = ammoCollisionRadius;

	this.missileGroup = missileGroup;

	this.fire = function(fromThis) {
		var newMissile = new missileClass();
		newMissile.init(this.ammoImage, this.ammoCollisionRadius);
		newMissile.shootFrom(fromThis, this.ammoSpeed, this.ammoTurnRate, this.ammoLife);
		this.missileGroup.push(newMissile);
		this.cooldown = this.baseCooldown;
	}
}
