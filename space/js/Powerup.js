const POWERUP_TYPES = ["repair", "shield", "speed", "damage"];
const POWERUP_COLLISION_RADIUS = 6;

var allPowerups = [];

function powerupClass() {
	this.init = function(powerupType, spawnX, spawnY) {
		this.powerupType = powerupType;
		if(this.powerupType == 0) {
			this.image = PURepairPic;
		} else if(this.powerupType == 1) {
			this.image = PUShieldPic;
		} else if(this.powerupType == 2) {
			this.image = PUSpeedPic;
		} else if(this.powerupType == 3) {
			this.image = PUDamagePic;
		}

		this.x = spawnX;
		this.y = spawnY;
		this.ang = 0;

		this.collisionRadius = POWERUP_COLLISION_RADIUS;

		this.sprite = new animatedSprite();
		this.sprite.init(this.image, 3, 1);
		this.spriteSequence = [0, 1, 2];
		this.sprite.setAnimationSequence(this.spriteSequence, "reverse");

		this.isDead = false;
	}

	this.pickup = function(finder) {
		if(this.powerupType == 0) {
			var healingDone = new floatingTextClass();
			healingDone.init(finder.maxhp - finder.hp, finder.x, finder.y, 'green');
			allFloatingText.push(healingDone);

			finder.hp = finder.maxhp;
		} else if(this.powerupType == 1) {

		} else if(this.powerupType == 2) {
			var healingDone = new floatingTextClass();
			healingDone.init("SPEED UP!", finder.x, finder.y, 'orange');
			allFloatingText.push(healingDone);

			finder.thrustMultiplier = 1.5;
			finder.thrustMultiplierDuration = 200;
		} else if(this.powerupType == 3) {
			
		}
		this.isDead = true;
	}

	this.detectCollisionWithEntity = function(otherEntity) {
		if(distanceBetween(this, otherEntity) <= this.collisionRadius + otherEntity.collisionRadius) {
			this.pickup(otherEntity);
			document.getElementById("debugText").innerHTML = "Player picked up " + POWERUP_TYPES[this.powerupType] + " powerup!";
		}
	}

	this.draw = function() {
		this.sprite.tickAnimation();
		this.sprite.draw(this.x, this.y, this.ang);
	}
}

function spawnPowerup(powerupType, spawnX, spawnY) {
	var newPowerup = new powerupClass();
	newPowerup.init(powerupType, spawnX, spawnY);
	allPowerups.push(newPowerup);
}
