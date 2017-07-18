function movingWrapPositionClass() {
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
		var thisVSpeed = Math.sqrt(this.vX * this.vX + this.vY * this.vY);
		var otherVSpeed = Math.sqrt(otherEntity.vX * otherEntity.vX + otherEntity.vY * otherEntity.vY);

		this.vX = (thisVSpeed * Math.cos(this.ang - contactAngle) * (this.mass - otherEntity.mass) + (2 * otherEntity.mass * otherVSpeed * Math.cos(otherEntity.ang - contactAngle))) * Math.cos(contactAngle) / (this.mass + otherEntity.mass) + (thisVSpeed * Math.sin(this.ang - contactAngle) * Math.cos(contactAngle + Math.PI/2));
		this.vY = (thisVSpeed * Math.cos(this.ang - contactAngle) * (this.mass - otherEntity.mass) + (2 * otherEntity.mass * otherVSpeed * Math.cos(otherEntity.ang - contactAngle))) * Math.sin(contactAngle) / (this.mass + otherEntity.mass) + (thisVSpeed * Math.sin(this.ang - contactAngle) * Math.sin(contactAngle + Math.PI/2));

		otherEntity.vX = (otherVSpeed * Math.cos(otherEntity.ang - contactAngle) * (otherEntity.mass - this.mass) + (2 * this.mass * thisVSpeed * Math.cos(this.ang - contactAngle))) * Math.cos(contactAngle) / (otherEntity.mass + this.mass) + (otherVSpeed * Math.sin(otherEntity.ang - contactAngle) * Math.cos(contactAngle + Math.PI/2));
		otherEntity.vY = (otherVSpeed * Math.cos(otherEntity.ang - contactAngle) * (otherEntity.mass - this.mass) + (2 * this.mass * thisVSpeed * Math.cos(this.ang - contactAngle))) * Math.sin(contactAngle) / (otherEntity.mass + this.mass) + (otherVSpeed * Math.sin(otherEntity.ang - contactAngle) * Math.sin(contactAngle + Math.PI/2));
	}

} // end of class
