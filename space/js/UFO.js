// tuning constants
const UFO_SPEED = 1.9;
const UFO_TIME_BETWEEN_CHANGE_DIR = 85;
const UFO_COLLISION_RADIUS = 13;

UFOClass.prototype = new movingWrapPositionClass(); 

function UFOClass() {
	this.init = function(whichGraphic) {
		this.myBitmap = whichGraphic;
		this.reset();
	}

	this.superclassReset = this.reset;

	this.reset = function() {
		this.superclassReset();

		this.x = Math.random()*canvas.width;
		this.y = Math.random()*canvas.height;

		this.cyclesTilDirectionChange = 0;
	} // end of reset

	this.superclassMove = this.move;

	this.move = function() {
		this.superclassMove();
		this.cyclesTilDirectionChange--;
		if(this.cyclesTilDirectionChange < 0) {
			var randAng = Math.random()*Math.PI*2;
			this.vX = Math.cos(randAng) * UFO_SPEED;
			this.vY = Math.sin(randAng) * UFO_SPEED;
			this.cyclesTilDirectionChange = UFO_TIME_BETWEEN_CHANGE_DIR;
		}
	}

	this.isOverlappingPoint = function(testX, testY) {
		var deltaX = testX-this.x;
		var deltaY = testY-this.y;
		var dist = Math.sqrt( (deltaX*deltaX) + (deltaY*deltaY) );
		return (dist <= UFO_COLLISION_RADIUS);
	}

	this.draw = function() {
		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, 0);
	}
} // end of class
