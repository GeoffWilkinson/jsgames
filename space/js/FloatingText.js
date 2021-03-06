var allFloatingText = [];

function floatingTextClass() {
	this.init = function(message, xCoord, yCoord, colour) {
		this.message = message;
		this.x = xCoord;
		this.y = yCoord;
		this.colour = colour;

		// This default configuration will cause the text to slowly float upwards and fade out.
		this.vX = 0;
		this.vY = -2;
		this.opacity = 1;
		this.framesToFade = 60;
		this.isDead = false;
	}

	this.move = function() {
		this.fade();
		this.x += this.vX;
		this.y += this.vY;
	}

	this.fade = function() {
		if(this.opacity > 0) {
			this.opacity -= 1/this.framesToFade;
			if(this.opacity < 0) {
				this.opacity = 0;
			}
		} else {
			this.isDead = true;
		}
	}

	this.draw = function() {
		canvasContext.save();
		canvasContext.globalAlpha = this.opacity;
		colourText(this.message, this.x, this.y, this.colour);
		canvasContext.restore();
	}
}

function declutterText() {
	var occupiedPositions = [];
	for(var i = 0; i < allFloatingText.length; i++) {
		for(var j = 0; j < occupiedPositions.length; j++) {
			if(distanceBetween(allFloatingText[i], occupiedPositions[j]) <= 5) {
				allFloatingText[i].x += Math.sign(Math.random() - 0.5) * (5 + Math.random() * 5);
				allFloatingText[i].y += Math.sign(Math.random() - 0.5) * (5 + Math.random() * 5);
			}
		}
		occupiedPositions.push({x: allFloatingText[i].x, y: allFloatingText[i].y});
	}
}