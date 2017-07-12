function movingWrapPositionClass() {
	this.reset = function() {
		this.xv = 0;
		this.yv = 0;

		this.x = canvas.width/2;
		this.y = canvas.height/2;
	} // end of reset

	this.move = function() {
		this.x += this.xv;
		this.y += this.yv;

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
