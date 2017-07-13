function drawBitmapPositionedByTopLeftCorner(graphic, atX, atY) {
	canvasContext.drawImage(graphic, atX, atY, graphic.width, graphic.height);
}

function drawBitmapCenteredAtLocation(graphic, atX, atY) {
	canvasContext.drawImage(graphic, atX - graphic.width/2, atY - graphic.height/2, graphic.width, graphic.height);
}

function drawBitmapCenteredWithRotation(graphic, atX, atY, withAngle) {
	canvasContext.save(); // allows us to undo translate movement and rotate spin
	canvasContext.translate(atX,atY); // sets the point where our graphic will go
	canvasContext.rotate(withAngle); // sets the rotation
	canvasContext.drawImage(graphic, -graphic.width/2, -graphic.height/2, graphic.width, graphic.height); // center, draw
	canvasContext.restore(); // undo the translation movement and rotation since save()
}

function colourRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColour) {
	canvasContext.fillStyle = fillColour;
	canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function hollowRect(topLeftX, topLeftY, boxWidth, boxHeight, strokeColour, lineThickness) {
	canvasContext.strokeStyle = strokeColour;
	canvasContext.lineWidth = lineThickness;
	canvasContext.strokeRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colourCircle(centerX, centerY, radius, fillColour) {
	canvasContext.fillStyle = fillColour;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	canvasContext.fill();
}

function colourText(showWords, textX, textY, fillColour) {
	canvasContext.fillStyle = fillColour;
	canvasContext.fillText(showWords, textX, textY);
}

function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY, withAngle) {
	canvasContext.save(); // allows us to undo translate movement and rotate spin
	canvasContext.translate(atX, atY); // sets the point where our graphic will go
	canvasContext.rotate(withAngle); // sets the rotation
	canvasContext.drawImage(graphic, -graphic.width/2, -graphic.height/2); // center, draw
	canvasContext.restore(); // undo the translation movement and rotation since save()
}

function animatedSprite() {
	this.init = function(whichImage, horizontalFrames, verticalFrames) {
		this.image = whichImage;
		this.hFrames = horizontalFrames;
		this.vFrames = verticalFrames;

		this.frameWidth = this.image.width / this.hFrames;
		this.frameHeight = this.image.height / this.vFrames;
		this.numFrames = this.hFrames * this.vFrames;

		this.sequenceNumber = 0;
		this.currentFrame = 0;
		this.currentHFrame = 0;
		this.currentVFrame = 0;
		this.cycleByThis = 0;
	}

	this.setAnimationSequence = function(animationFrames, cycleBehaviour) {
		this.animationFrames = animationFrames;
		this.cycleBehaviour = cycleBehaviour;
		this.cycleByThis = this.cycleByThis || 1;
	}

	this.tickAnimation = function() {
		this.sequenceNumber += this.cycleByThis;
		if(this.sequenceNumber > this.animationFrames.length - 1) {
			if(this.cycleBehaviour == "loop") {
				this.sequenceNumber = 0;
			} else if(this.cycleBehaviour == "reverse") {
				this.cycleByThis = -this.cycleByThis;
				this.sequenceNumber += this.cycleByThis;
			}
		} else if(this.sequenceNumber < 0) {
			if(this.cycleBehaviour == "loop") {
				this.sequenceNumber = this.animationFrames.length - 1;
			} else if(this.cycleBehaviour == "reverse") {
				this.cycleByThis = -this.cycleByThis;
				this.sequenceNumber += this.cycleByThis;
			}

		}
		this.currentFrame = this.animationFrames[this.sequenceNumber];
		this.currentHFrame = this.currentFrame % this.hFrames;
		this.currentVFrame = Math.floor(this.currentFrame / this.vFrames);
	}

	this.draw = function(atX, atY, withAngle) {
		canvasContext.save();
		canvasContext.translate(atX, atY);
		canvasContext.rotate(withAngle);
		canvasContext.drawImage(this.image, this.currentHFrame * this.frameWidth, this.currentVFrame * this.frameHeight, this.frameWidth, this.frameHeight, -this.frameWidth/2, -this.frameHeight/2, this.frameWidth, this.frameHeight);
		canvasContext.restore();
	}
}