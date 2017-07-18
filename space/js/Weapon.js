function pulseCannonClass(damage, cooldown, ammoImage, ammoSpeed, ammoLife, ammoCollisionRadius, shotGroup) {
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
		newShot.shootFrom(fromThis, this.ammoSpeed, this.ammoLife, this.damage * fromThis.damageMultiplier);
		this.shotGroup.push(newShot);
		this.cooldown = this.baseCooldown;
	}
}

function shockwaveGeneratorClass(damage, cooldown, waveSpeed, waveRange, waveColour, shockwaveGroup) {
	this.damage = damage;
	this.cooldown = 0;
	this.baseCooldown = cooldown;

	this.waveColour = waveColour;
	this.waveSpeed = waveSpeed;
	this.waveRange = waveRange;

	this.shockwaveGroup = shockwaveGroup;

	this.fire = function(fromThis) {
		var newShockwave = new shockwaveClass();
		newShockwave.init(this.waveColour);
		newShockwave.shootFrom(fromThis, this.waveSpeed, this.waveRange, this.damage * fromThis.damageMultiplier);
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
		newMissile.shootFrom(fromThis, this.ammoSpeed, this.ammoTurnRate, this.ammoLife, this.damage * fromThis.damageMultiplier);
		this.missileGroup.push(newMissile);
		this.cooldown = this.baseCooldown;
	}
}

function beamCannonClass(damage, cooldown, beamColour, beamRange, beamLife, beamWidth, beamGroup) {
	this.damage = damage;
	this.cooldown = 0;
	this.baseCooldown = cooldown;

	this.beamColour = beamColour;
	this.beamRange = beamRange;
	this.beamLife = beamLife;
	this.beamWidth = beamWidth;

	this.beamGroup = beamGroup;

	this.fire = function(fromThis) {
		var newBeam = new beamClass();
		newBeam.init(this.beamColour);
		newBeam.shootFrom(fromThis, this.beamWidth, this.beamRange, this.beamLife, this.damage * fromThis.damageMultiplier);
		this.beamGroup.push(newBeam);
		this.cooldown = this.baseCooldown;
	}
}
