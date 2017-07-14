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
} // end of class
