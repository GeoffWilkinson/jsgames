//This might seem odd...
worldObjectClass.prototype = new movingEntityClass();

function worldObjectClass() {
	this.reset = function(whichImage, whereX, whereY) {
		this.isDead = false;
		this.invincibilityFrames = 0;
		this.facing = 0;
		this.x = whereX;
		this.y = whereY;

		this.walker = sprite({
			context: canvas.getContext("2d"),
			width: 144,
			height: 48,
			x: this.x,
			y: this.y,
			image: whichImage,
			numberOfFramesH: 3,
			numberOfFramesV: 1,
			ticksPerFrame: framesPerSecond/5
		});
		this.walker.x = whereX;
		this.walker.y = whereY;
	}
}