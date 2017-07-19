const EQUIPMENT_SLOT_TYPES = ["weapon"];

function movingWrapPositionClass() {
	this.init = function() {
		this.maxhp = 0;
		this.maxshieldhp = 0;
		this.hp = 0;
		this.shieldhp = 0;
	}

	this.reset = function() {
		this.vX = 0;
		this.vY = 0;

		this.x = canvas.width/2;
		this.y = canvas.height/2;

		this.isDead = false;
	} // end of reset

	this.move = function() {
		this.x += this.vX;
		this.y += this.vY;

		this.handleScreenWrap();
	}

	this.handleScreenWrap = function() {
		if(this.x < 0) {
			this.x = canvas.width;
		}
		if(this.x > canvas.width) {
			this.x = 0;
		}
		if(this.y < 0) {
			this.y = canvas.height;
		}
		if(this.y > canvas.height) {
			this.y = 0;
		}
	}

	this.handleElasticObjectCollision = function(otherEntity) {
		var contactAngle = Math.atan2(otherEntity.y - this.y, otherEntity.x - this.x);
		var thisVAngle = Math.atan2(this.vY, this.vX);
		var thisVSpeed = Math.sqrt(this.vX * this.vX + this.vY * this.vY);
		var otherVAngle = Math.atan2(otherEntity.vY, otherEntity.vX);
		var otherVSpeed = Math.sqrt(otherEntity.vX * otherEntity.vX + otherEntity.vY * otherEntity.vY);

		this.vX = (thisVSpeed * Math.cos(thisVAngle - contactAngle) * (this.mass - otherEntity.mass) + (2 * otherEntity.mass * otherVSpeed * Math.cos(otherVAngle - contactAngle))) * Math.cos(contactAngle) / (this.mass + otherEntity.mass) + (thisVSpeed * Math.sin(thisVAngle - contactAngle) * Math.cos(contactAngle + Math.PI/2));
		this.vY = (thisVSpeed * Math.cos(thisVAngle - contactAngle) * (this.mass - otherEntity.mass) + (2 * otherEntity.mass * otherVSpeed * Math.cos(otherVAngle - contactAngle))) * Math.sin(contactAngle) / (this.mass + otherEntity.mass) + (thisVSpeed * Math.sin(thisVAngle - contactAngle) * Math.sin(contactAngle + Math.PI/2));

		otherEntity.vX = (otherVSpeed * Math.cos(otherVAngle - contactAngle) * (otherEntity.mass - this.mass) + (2 * this.mass * thisVSpeed * Math.cos(thisVAngle - contactAngle))) * Math.cos(contactAngle) / (otherEntity.mass + this.mass) + (otherVSpeed * Math.sin(otherVAngle - contactAngle) * Math.cos(contactAngle + Math.PI/2));
		otherEntity.vY = (otherVSpeed * Math.cos(otherVAngle - contactAngle) * (otherEntity.mass - this.mass) + (2 * this.mass * thisVSpeed * Math.cos(thisVAngle - contactAngle))) * Math.sin(contactAngle) / (otherEntity.mass + this.mass) + (otherVSpeed * Math.sin(otherVAngle - contactAngle) * Math.sin(contactAngle + Math.PI/2));
	}

	this.takeDamage = function(incomingDamage) {
		var shieldDamage = 0;
		var hullDamage = 0;
		if(this.shieldhp < incomingDamage) {
			shieldDamage = this.shieldhp;
			hullDamage = incomingDamage - this.shieldhp;
		} else {
			shieldDamage = incomingDamage;
		}

		this.shieldhp -= shieldDamage;
		this.hp -= hullDamage;
		if(this.hp <= 0) {
			this.hp = 0;
			this.isDead = true;
		}

		if(shieldDamage > 0) {
			var shieldDamageTaken = new floatingTextClass();
			shieldDamageTaken.init(shieldDamage, this.x, this.y, 'blue');
			allFloatingText.push(shieldDamageTaken);
		}

		if(hullDamage > 0) {
			var hullDamageTaken = new floatingTextClass();
			hullDamageTaken.init(hullDamage, this.x, this.y, 'red');
			allFloatingText.push(hullDamageTaken);
		}
	}
} // end of class
